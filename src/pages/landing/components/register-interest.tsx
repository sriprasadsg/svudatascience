import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/base/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const programmeOptions = [
  "M.S. Data Science",
  "PG Diploma in Data Science",
  "Specialist Diploma – Python for AI, ML & Generative AI",
  "Specialist Diploma – Data Visualization",
  "Specialist Diploma – Cloud Technologies",
];

const occupationOptions = ["Student", "Working Professional"];

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm soft-lift";

export function RegisterInterest() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const full_name = String(d.get("full_name") ?? "").trim();
    const education_qualification = String(d.get("education_qualification") ?? "").trim();
    const programme = String(d.get("programme") ?? "");
    const location = String(d.get("location") ?? "").trim();
    const occupation = String(d.get("occupation") ?? "");
    if (!full_name || !education_qualification || !programme || !location || !occupation) {
      toast.error("Please fill in all the fields.");
      return;
    }
    setSending(true);
    const { error } = await supabase
      .from("registrations")
      .insert({ full_name, education_qualification, programme, location, occupation });
    setSending(false);
    if (error) {
      toast.error("Sorry, your registration could not be submitted. Please try again.");
      return;
    }
    form.reset();
    toast.success("Thank you — your interest has been registered. Our admissions team will contact you soon.");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="reg_full_name">Name</Label>
        <Input id="reg_full_name" name="full_name" maxLength={100} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_education">Education qualification</Label>
        <Input
          id="reg_education"
          name="education_qualification"
          placeholder="e.g. B.Sc. Computer Science"
          maxLength={100}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_programme">Programme interested</Label>
        <select id="reg_programme" name="programme" required defaultValue="" className={selectClass}>
          <option value="" disabled>Select a programme</option>
          {programmeOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_location">Location</Label>
        <Input id="reg_location" name="location" placeholder="City, State" maxLength={100} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="reg_occupation">Occupation</Label>
        <select id="reg_occupation" name="occupation" required defaultValue="" className={selectClass}>
          <option value="" disabled>Select your occupation</option>
          {occupationOptions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={sending} className="w-full">
          {sending ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
