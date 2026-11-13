CREATE TABLE public.registration_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 full_name text NOT NULL CHECK (length(btrim(full_name)) BETWEEN 1 AND 100),
 phone text NOT NULL CHECK (length(phone) <= 20 AND phone ~ '^\+?[0-9 ()-]+$' AND length(regexp_replace(phone, '[^0-9]', '', 'g')) BETWEEN 7 AND 15),
 email text NOT NULL CHECK (length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
 courses text[] NOT NULL CHECK (cardinality(courses) BETWEEN 1 AND 5 AND courses <@ ARRAY['M.S. Data Science – 2 Years','PG Diploma in Data Science – 1 Year','Diploma in Python for AI, ML & Generative AI with Internship & Project – 6 Months','Diploma in Data Visualization with Internship & Project – 6 Months','Diploma in Cloud Technologies with Internship & Project – 6 Months']::text[]),
 gender text NOT NULL DEFAULT '' CHECK (gender IN ('','Male','Female','Other','Prefer not to say')),
 occupation text NOT NULL CHECK (occupation IN ('Student','Employed','Self-employed','Unemployed','Other')),
 college text NOT NULL CHECK (length(btrim(college)) BETWEEN 1 AND 200),
 education_qualification text NOT NULL CHECK (education_qualification IN ('Intermediate / 12th','B.Sc','B.Com','BCA','B.Tech / B.E','BBA','B.A','M.Sc','MCA','M.Tech','MBA','Other')),
 passed_out_year text NOT NULL DEFAULT '' CHECK (passed_out_year = '' OR (passed_out_year ~ '^[0-9]{4}$' AND passed_out_year BETWEEN '1980' AND '2027')),
 location text NOT NULL CHECK (length(btrim(location)) BETWEEN 1 AND 100),
 address text NOT NULL DEFAULT '' CHECK (length(address) <= 1000),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.registration_submissions TO service_role;
REVOKE ALL ON public.registration_submissions FROM anon, authenticated;
ALTER TABLE public.registration_submissions ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.registration_submissions IS 'Approved PDF online submissions; server-only access. Owner reviews through managed Database UI.';