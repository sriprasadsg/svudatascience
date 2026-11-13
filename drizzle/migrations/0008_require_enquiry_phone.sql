DROP POLICY IF EXISTS "Anyone can submit an enquiry" ON public.enquiries;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(full_name)) BETWEEN 1 AND 100
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(programme)) BETWEEN 1 AND 200
  AND phone IS NOT NULL AND length(btrim(phone)) BETWEEN 1 AND 20
  AND (message IS NULL OR length(message) <= 2000)
);