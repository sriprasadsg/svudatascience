import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { IconLoader2, IconMail, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { programmeEnquirySchema } from "../../../../supabase/functions/_shared/programme-enquiry-schema";
import { getProgramme, programmes } from "../programmes";

const admissionsEmail = "admissions@svudatascience.in";

type FormValues = {
  full_name: string;
  email: string;
  phone: string;
  educationalQualification: string;
  preferred_spell: "" | "January" | "July";
  enquiry: string;
  consent: boolean;
};

const initialValues: FormValues = {
  full_name: "",
  email: "",
  phone: "",
  educationalQualification: "",
  preferred_spell: "",
  enquiry: "",
  consent: false,
};

export function ProgrammeEnquiryForm({ initialProgrammeId = "" }: { initialProgrammeId?: string }) {
  const [programmeId, setProgrammeId] = useState(() => getProgramme(initialProgrammeId)?.slug ?? "");
  const programme = getProgramme(programmeId);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reference, setReference] = useState("");

  function selectProgramme(id: string) {
    const selected = getProgramme(id);
    setProgrammeId(selected?.slug ?? "");
    setValues((current) => ({ ...current, preferred_spell: selected?.hasPreferredSpell ? current.preferred_spell : "" }));
    setErrors((current) => ({ ...current, programme_id: "", preferred_spell: "" }));
    setSubmitError("");
    setReference("");
  }

  useEffect(() => {
    selectProgramme(initialProgrammeId);
  }, [initialProgrammeId]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmitError("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setSubmitError("");
    const payload = {
      programme_id: programmeId,
      full_name: values.full_name,
      email: values.email,
      phone: values.phone,
      educationalQualification: values.educationalQualification,
      preferred_spell: values.preferred_spell || null,
      enquiry: values.enquiry,
      consent: values.consent,
    };
    const parsed = programmeEnquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      if (!programme) next.programme_id = "Select a programme.";
      setErrors(next);
      requestAnimationFrame(() => document.querySelector<HTMLElement>("#programme-enquiry [aria-invalid='true']")?.focus());
      return;
    }

    setErrors({});
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-programme-enquiry", { body: parsed.data });
      if (error || !data?.id) throw new Error("Enquiry was not accepted");
      setReference(data.id);
    } catch {
      setSubmitError("Your enquiry could not be saved. Your entries are still here. Please try again or use the admissions email below.");
    } finally {
      setBusy(false);
    }
  }

  const mailto = `mailto:${admissionsEmail}?subject=${encodeURIComponent(programme ? `Programme enquiry — ${programme.name}` : "Programme enquiry")}`;

  if (reference) {
    return (
      <div className="programme-enquiry-success rounded-xl border border-border bg-card p-6 text-center" role="status">
        <h3 className="text-xl tracking-normal">Enquiry saved</h3>
        <p className="mt-3 text-muted-foreground">Thank you. Your {programme?.name} enquiry has been saved for the admissions team.</p>
        <p className="mt-4 break-all text-xs text-muted-foreground">Reference: {reference}</p>
      </div>
    );
  }

  return (
    <form id="programme-enquiry-form" onSubmit={submit} noValidate className="programme-enquiry-form mt-6 grid gap-5 rounded-xl border border-border bg-card p-5 sm:grid-cols-2 sm:p-6">
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="programme_id" className="font-normal">Programme <span className="text-destructive">*</span></Label>
        <select id="programme_id" name="programme_id" required value={programmeId} onChange={(event) => selectProgramme(event.target.value)} disabled={busy} aria-invalid={Boolean(errors.programme_id)} aria-describedby={errors.programme_id ? "programme_id-error" : undefined} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm soft-lift">
          <option value="" disabled>Select a programme</option>
          {programmes.map((item) => <option key={item.slug} value={item.slug}>{item.slug === "ms-data-science" ? "MS Data Science" : item.name}</option>)}
        </select>
        {errors.programme_id && <p id="programme_id-error" className="text-xs text-destructive">{errors.programme_id}</p>}
      </div>
      <Field label="Full name" error={errors.full_name} required>
        <Input id="full_name" name="full_name" autoComplete="name" maxLength={100} required value={values.full_name} onChange={(event) => update("full_name", event.target.value)} disabled={busy} aria-invalid={Boolean(errors.full_name)} aria-describedby={errors.full_name ? "full_name-error" : undefined} />
      </Field>
      <Field label="Email" error={errors.email} required>
        <Input id="email" name="email" type="email" autoComplete="email" maxLength={255} required value={values.email} onChange={(event) => update("email", event.target.value)} disabled={busy} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
      </Field>
      <Field label="Phone" error={errors.phone} required>
        <Input id="phone" name="phone" type="tel" inputMode="numeric" pattern="[0-9]{1,15}" maxLength={15} autoComplete="tel" required value={values.phone} onChange={(event) => update("phone", event.target.value)} disabled={busy} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="Digits only" />
      </Field>
      <Field label="Educational Qualification" error={errors.educationalQualification} fullWidth>
        <Input id="educationalQualification" name="educationalQualification" maxLength={200} value={values.educationalQualification} onChange={(event) => update("educationalQualification", event.target.value)} disabled={busy} aria-invalid={Boolean(errors.educationalQualification)} aria-describedby={errors.educationalQualification ? "educationalQualification-error" : undefined} placeholder="e.g., B.Sc. Mathematics, B.Tech. CSE, BCA" />
      </Field>
      {programme?.hasPreferredSpell ? (
        <Field label="Preferred admission spell" error={errors.preferred_spell} required>
          <select id="preferred_spell" name="preferred_spell" required value={values.preferred_spell} onChange={(event) => update("preferred_spell", event.target.value as FormValues["preferred_spell"])} disabled={busy} aria-invalid={Boolean(errors.preferred_spell)} aria-describedby={errors.preferred_spell ? "preferred_spell-error" : undefined} className="h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm soft-lift">
            <option value="" disabled>Select a spell</option>
            <option value="January">January</option>
            <option value="July">July</option>
          </select>
        </Field>
      ) : null}
      <Field label="Enquiry" error={errors.enquiry} required fullWidth>
        <Textarea id="enquiry" name="enquiry" rows={5} maxLength={2000} required value={values.enquiry} onChange={(event) => update("enquiry", event.target.value)} disabled={busy} aria-invalid={Boolean(errors.enquiry)} aria-describedby={errors.enquiry ? "enquiry-error" : undefined} placeholder="How can we help you?" />
      </Field>
      <div className="grid gap-2 sm:col-span-2">
        <div className="flex items-start gap-3">
          <Checkbox id="consent" checked={values.consent} onCheckedChange={(checked) => update("consent", checked === true)} disabled={busy} required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} className="mt-0.5" />
          <Label htmlFor="consent" className="font-normal leading-5">I agree to be contacted by the SVU–Exafluence admissions team regarding this enquiry.</Label>
        </div>
        {errors.consent && <p id="consent-error" className="text-xs text-destructive">{errors.consent}</p>}
      </div>
      {submitError && <p role="alert" className="text-sm text-destructive sm:col-span-2">{submitError}</p>}
      <div className="flex flex-col gap-4 border-t border-border pt-5 sm:col-span-2">
        <Button type="submit" disabled={busy} className="min-h-11 w-full font-medium sm:w-fit">
          {busy ? <IconLoader2 className="size-4 animate-spin" /> : <IconSend className="size-4" />}
          {busy ? "Sending…" : "Send Programme Enquiry"}
        </Button>
        <a href={mailto} className="inline-flex w-fit max-w-full items-center gap-2 break-all text-sm text-primary hover:underline">
          <IconMail className="size-4 shrink-0" /> {admissionsEmail}
        </a>
      </div>
    </form>
  );
}

function Field({ label, error, required = false, fullWidth = false, children }: { label: string; error?: string; required?: boolean; fullWidth?: boolean; children: ReactNode }) {
  const id = label === "Full name" ? "full_name" : label === "Email" ? "email" : label === "Phone" ? "phone" : label === "Educational Qualification" ? "educationalQualification" : label === "Preferred admission spell" ? "preferred_spell" : "enquiry";
  return (
    <div className={`grid content-start gap-2 ${fullWidth ? "sm:col-span-2" : ""}`}>
      <Label htmlFor={id} className="font-normal">{label}{required && <span className="text-destructive"> *</span>}</Label>
      {children}
      {error && <p id={`${id}-error`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
