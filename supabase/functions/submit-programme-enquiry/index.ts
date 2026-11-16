import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.0";
import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { programmeEnquirySchema, programmeNames } from "../_shared/programme-enquiry-schema.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const ADMISSIONS_EMAIL = "admissions@svudatascience.in";
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { startedAt: number; count: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    attempts.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  if (attempts.size > 500) {
    for (const [entryKey, value] of attempts) if (now - value.startedAt >= WINDOW_MS) attempts.delete(entryKey);
  }
  return current.count > MAX_ATTEMPTS;
}

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  const clientKey = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(clientKey)) return jsonResponse({ error: "Too many enquiries. Please try again later." }, 429);
  if (Number(req.headers.get("content-length")) > 12000) return jsonResponse({ error: "Submission is too large." }, 413);

  let raw: unknown;
  try {
    const body = await req.text();
    if (body.length > 12000) return jsonResponse({ error: "Submission is too large." }, 413);
    raw = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "Invalid submission." }, 400);
  }

  const result = programmeEnquirySchema.safeParse(raw);
  if (!result.success) return jsonResponse({ error: "Please check the required fields." }, 400);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return jsonResponse({ error: "Enquiries are temporarily unavailable." }, 503);
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const programmeName = programmeNames[result.data.programme_id];
  const { data, error } = await client.from("enquiries").insert({
    full_name: result.data.full_name,
    email: result.data.email,
    phone: result.data.phone,
    programme: programmeName,
    programme_id: result.data.programme_id,
    preferred_spell: result.data.preferred_spell ?? null,
    message: result.data.enquiry,
    consent: result.data.consent,
  }).select("id, created_at").single();
  if (error || !data) return jsonResponse({ error: "Could not save your enquiry. Please try again." }, 503);

  let notificationSent = false;
  try {
    const notification = await sendTemplateEmail("programme-enquiry-notification", ADMISSIONS_EMAIL, {
      templateData: {
        programmeId: result.data.programme_id,
        programmeName,
        submittedAt: data.created_at,
        fullName: result.data.full_name,
        email: result.data.email,
        phone: result.data.phone,
        preferredSpell: result.data.preferred_spell ?? null,
        enquiry: result.data.enquiry,
        reference: data.id,
      },
      replyTo: result.data.email,
      idempotencyKey: `programme-enquiry-notification-${data.id}`,
    });
    notificationSent = notification.sent;
  } catch (error) {
    console.error("Programme enquiry saved but its admissions notification failed", {
      enquiryId: data.id,
      code: error instanceof Error && "code" in error ? String(error.code) : "unknown",
    });
  }

  return jsonResponse({ id: data.id, notificationSent }, 201);
});
