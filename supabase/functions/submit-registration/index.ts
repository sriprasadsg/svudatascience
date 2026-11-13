import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.0";
import { handleCors, jsonResponse } from "../_shared/cors.ts";
import { onlineRegistrationSchema } from "../_shared/registration-schema.ts";

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
  const { data, error } = await client.from("registration_submissions").insert(result.data).select("id").single();
  if (error || !data) return jsonResponse({ error: "Could not save your registration. Please try again." }, 503);
  return jsonResponse({ id: data.id }, 201);
});