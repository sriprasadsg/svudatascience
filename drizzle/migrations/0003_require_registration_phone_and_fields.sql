ALTER TABLE public.registrations ADD COLUMN phone text;
CREATE FUNCTION public.validate_registration_fields() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.full_name IS NULL OR length(btrim(NEW.full_name)) NOT BETWEEN 1 AND 100 OR NEW.education_qualification IS NULL OR length(btrim(NEW.education_qualification)) NOT BETWEEN 1 AND 100 OR NEW.location IS NULL OR length(btrim(NEW.location)) NOT BETWEEN 1 AND 100 THEN
  RAISE EXCEPTION 'Name, education qualification and location are required (maximum 100 characters).';
 END IF;
 IF NEW.programme IS NULL OR NEW.programme NOT IN ('M.S. Data Science', 'PG Diploma in Data Science', 'Specialist Diploma – Python for AI, ML & Generative AI', 'Specialist Diploma – Data Visualization', 'Specialist Diploma – Cloud Technologies') OR NEW.occupation IS NULL OR NEW.occupation NOT IN ('Student', 'Working Professional') THEN
  RAISE EXCEPTION 'Select a programme and occupation.';
 END IF;
 IF NEW.phone IS NULL OR length(NEW.phone) > 20 OR NEW.phone !~ '^\+?[0-9 ()-]+$' OR length(regexp_replace(NEW.phone, '[^0-9]', '', 'g')) NOT BETWEEN 7 AND 15 THEN
  RAISE EXCEPTION 'A valid phone number is required.';
 END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER validate_registration_before_insert BEFORE INSERT ON public.registrations FOR EACH ROW EXECUTE FUNCTION public.validate_registration_fields();
COMMENT ON COLUMN public.registrations.phone IS 'Required for new registrations; historical registrations without phone numbers are preserved.';