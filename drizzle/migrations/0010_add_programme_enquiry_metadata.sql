ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS programme_id text;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS preferred_spell text;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS consent boolean;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS educational_qualification text;

DO $migration$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.enquiries'::regclass AND conname = 'enquiries_educational_qualification_length_check') THEN
    ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_educational_qualification_length_check CHECK (educational_qualification IS NULL OR length(educational_qualification) <= 200) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.enquiries'::regclass AND conname = 'enquiries_programme_id_check') THEN
    ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_programme_id_check CHECK (programme_id IS NULL OR programme_id IN ('ms-quantum-computing', 'ms-data-science', 'pg-diploma-data-science', 'diploma-python-ai-ml-generative-ai', 'diploma-data-visualization', 'diploma-cloud-technologies')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.enquiries'::regclass AND conname = 'enquiries_preferred_spell_check') THEN
    ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_preferred_spell_check CHECK (preferred_spell IS NULL OR preferred_spell IN ('January', 'July')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.enquiries'::regclass AND conname = 'enquiries_consent_check') THEN
    ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_consent_check CHECK (consent IS NULL OR consent = true) NOT VALID;
  END IF;
END
$migration$;

COMMENT ON COLUMN public.enquiries.programme_id IS 'Stable programme identifier supplied by the validated programme-enquiry handler.';
COMMENT ON COLUMN public.enquiries.preferred_spell IS 'January or July for diploma enquiries; null for M.S. programmes.';
COMMENT ON COLUMN public.enquiries.consent IS 'Contact consent captured by the programme-enquiry form; historical rows remain null.';
COMMENT ON COLUMN public.enquiries.educational_qualification IS 'Optional current or completed qualification; no programme eligibility inferred. Historical rows remain null.';