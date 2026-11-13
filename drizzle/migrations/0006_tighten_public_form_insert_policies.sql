DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(programme)) BETWEEN 1 AND 200
  AND (phone IS NULL OR length(phone) <= 20)
  AND (message IS NULL OR length(message) <= 2000)
);

DROP POLICY IF EXISTS "Anyone can submit a registration" ON public.registrations;
CREATE POLICY "Anyone can submit a registration" ON public.registrations
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 100
  AND length(btrim(education_qualification)) BETWEEN 1 AND 100
  AND length(btrim(programme)) BETWEEN 1 AND 200
  AND length(btrim(location)) BETWEEN 1 AND 100
  AND length(btrim(occupation)) BETWEEN 1 AND 100
  AND phone IS NOT NULL AND length(btrim(phone)) BETWEEN 1 AND 20
  AND email IS NOT NULL AND length(btrim(email)) BETWEEN 3 AND 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);