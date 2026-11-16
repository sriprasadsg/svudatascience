import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.0";
import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { onlineRegistrationSchema } from "../_shared/registration-schema.ts";
import { processRegistration, REGISTRATION_NOTIFICATION_EMAIL } from "../_shared/registration-submission.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
  if (Number(req.headers.get("content-length")) > 12000) return jsonResponse({ error: "Submission is too large." }, 413);
  let raw: unknown;
  try {
    const body = await req.text();
    if (body.length > 12000) return jsonResponse({ error: "Submission is too large." }, 413);
    raw = JSON.parse(body);
  } catch { return jsonResponse({ error: "Invalid submission." }, 400); }
  const result = onlineRegistrationSchema.safeParse(raw);
  if (!result.success) return jsonResponse({ error: "Please check the required fields." }, 400);
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return jsonResponse({ error: "Registration is temporarily unavailable." }, 503);
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  const outcome = await processRegistration(result.data, {
    save: async (data) => {
      const { data: row, error } = await client.from("registration_submissions").insert(data).select("id, created_at").single();
      return error || !row ? null : row;
    },
    notify: (saved, data) => sendTemplateEmail("registration-notification", REGISTRATION_NOTIFICATION_EMAIL, {
      templateData: {
        reference: saved.id,
        submittedAt: saved.created_at,
        fullName: data.full_name,
        phone: data.phone,
        email: data.email,
        courses: data.courses,
        gender: data.gender,
        occupation: data.occupation,
        college: data.college,
        educationQualification: data.education_qualification,
        passedOutYear: data.passed_out_year,
        location: data.location,
        address: data.address,
      },
      replyTo: data.email,
      idempotencyKey: `registration-notification-${saved.id}`,
    }),
    logError: (message, meta) => console.error(message, meta),
  });
  return jsonResponse(outcome.body, outcome.status);
});
