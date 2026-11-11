import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/base/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { educationOptions, occupationOptions, programmeOptions, registrationSchema } from "./registration-validation";
import { brochureForProgramme } from "./programme-brochures";
import { IconDownload } from "@tabler/icons-react";
export { programmeOptions } from "./registration-validation";

const selectClass =
  "h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm soft-lift";

export function RegisterInterest() {
  const [sending, setSending] = useState(false);
  const [submittedProgramme, setSubmittedProgramme] = useState("");
  const brochure = brochureForProgramme(submittedProgramme);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const result = registrationSchema.safeParse(Object.fromEntries(d));
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please fill in all the fields.");
      return;
    }
    setSending(true);
    const { error } = await supabase
      .from("registrations")
      .insert(result.data);
    setSending(false);
    if (error) {
      toast.error("Sorry, your registration could not be submitted. Please try again.");
      return;
    }
    form.reset();
    setSubmittedProgramme(result.data.programme);
    toast.success("Thank you — your interest has been registered. Your programme brochure is ready to download.");
  }

  return (
    <>
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="reg_full_name">Name *</Label>
        <Input id="reg_full_name" name="full_name" maxLength={100} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_education">Education qualification *</Label>
        <select id="reg_education" name="education_qualification" required defaultValue="" className={selectClass}>
          <option value="" disabled>Select your qualification</option>
          {educationOptions.map((qualification) => <option key={qualification}>{qualification}</option>)}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_programme">Programme interested *</Label>
        <select id="reg_programme" name="programme" required defaultValue="" className={selectClass}>
          <option value="" disabled>Select a programme</option>
          {programmeOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_location">Location *</Label>
        <Input id="reg_location" name="location" placeholder="City, State" maxLength={100} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_occupation">Occupation *</Label>
        <select id="reg_occupation" name="occupation" required defaultValue="" className={selectClass}>
          <option value="" disabled>Select your occupation</option>
          {occupationOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_phone">Phone number *</Label>
        <Input id="reg_phone" name="phone" type="tel" autoComplete="tel" maxLength={20} required />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="reg_email">Email *</Label>
        <Input id="reg_email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" maxLength={255} required />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={sending} className="w-full">
          {sending ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </form>
    {brochure && <div role="status" className="mt-6 text-center">
      <p className="text-foreground">Thank you for registering your interest in {submittedProgramme}.</p>
      <p className="mt-2 text-sm text-muted-foreground">Your selected programme brochure is ready to download.</p>
      <Button asChild className="mt-4">
        <a href={brochure.file.url} download={brochure.file.original_filename}>
          <IconDownload className="size-4" /> Download {brochure.title} brochure
        </a>
      </Button>
    </div>}
    </>
  );
}
