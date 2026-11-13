-- Phone rule: digits only, 1-15 (^[0-9]{1,15}$). Historical rows preserved (NOT VALID / insert-only checks).
ALTER TABLE public.registration_submissions DROP CONSTRAINT IF EXISTS registration_submissions_phone_check;
ALTER TABLE public.registration_submissions ADD CONSTRAINT registration_submissions_phone_check CHECK (phone ~ '^[0-9]{1,15}$') NOT VALID;

CREATE OR REPLACE FUNCTION public.validate_registration_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
 NEW.email := lower(btrim(coalesce(NEW.email, '')));
 IF NEW.full_name IS NULL OR length(btrim(NEW.full_name)) NOT BETWEEN 1 AND 100 OR NEW.education_qualification IS NULL OR length(btrim(NEW.education_qualification)) NOT BETWEEN 1 AND 100 OR NEW.location IS NULL OR length(btrim(NEW.location)) NOT BETWEEN 1 AND 100 THEN
  RAISE EXCEPTION 'Name, education qualification and location are required (maximum 100 characters).';
 END IF;
 IF length(NEW.email) NOT BETWEEN 3 AND 255 OR NEW.email !~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' THEN
  RAISE EXCEPTION 'A valid email address is required.';
 END IF;
 IF NEW.programme IS NULL OR NEW.programme NOT IN ('M.S. Data Science', 'PG Diploma in Data Science', 'Specialist Diploma – Python for AI, ML & Generative AI', 'Specialist Diploma – Data Visualization', 'Specialist Diploma – Cloud Technologies') OR NEW.occupation IS NULL OR NEW.occupation NOT IN ('Student', 'Working Professional') THEN
  RAISE EXCEPTION 'Select a programme and occupation.';
 END IF;
 IF NEW.phone IS NULL OR NEW.phone !~ '^[0-9]{1,15}$' THEN
  RAISE EXCEPTION 'Phone number must be 1 to 15 digits (0-9 only).';
 END IF;
 RETURN NEW;
END;
$function$;

DROP POLICY IF EXISTS "Anyone can submit a registration" ON public.registrations;
CREATE POLICY "Anyone can submit a registration" ON public.registrations FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 100
  AND length(btrim(education_qualification)) BETWEEN 1 AND 100
  AND length(btrim(programme)) BETWEEN 1 AND 200
  AND length(btrim(location)) BETWEEN 1 AND 100
  AND length(btrim(occupation)) BETWEEN 1 AND 100
  AND phone IS NOT NULL AND phone ~ '^[0-9]{1,15}$'
  AND email IS NOT NULL AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(programme)) BETWEEN 1 AND 200
  AND phone IS NOT NULL AND phone ~ '^[0-9]{1,15}$'
  AND (message IS NULL OR length(message) <= 2000)
);