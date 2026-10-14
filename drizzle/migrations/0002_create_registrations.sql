CREATE TABLE public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  education_qualification text not null,
  programme text not null,
  location text not null,
  occupation text not null,
  created_at timestamptz not null default now()
);

GRANT INSERT ON public.registrations TO anon, authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a registration"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);