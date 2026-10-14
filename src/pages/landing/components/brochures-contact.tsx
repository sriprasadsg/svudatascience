import { useState } from "react";
import { IconDownload, IconFileTypePpt, IconLock } from "@tabler/icons-react";
import { toast } from "sonner";
import { Button } from "@/components/base/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { programmeOptions } from "./register-interest";
import msBrochure from "@/assets/brochure-MS_Data_Science_Brochure.pptx.asset.json";
import pgBrochure from "@/assets/brochure-PG_Diploma_Data_Science.pptx.asset.json";
import diplomaBrochure from "@/assets/brochure-Specialist_Diplomas.pptx.asset.json";

const brochures = [
  { title: "M.S. Data Science", note: "Two-year Master's programme", file: msBrochure },
  { title: "PG Diploma in Data Science", note: "One-year postgraduate diploma", file: pgBrochure },
  { title: "Specialist Diplomas", note: "Python for AI, ML & Generative AI, Data Visualization, Cloud Technologies", file: diplomaBrochure },
];

export function Brochures({ unlocked }: { unlocked: boolean }) {
  return (
    <section id="brochures" className="landing py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2>Programme brochures</h2>
          <p className="mt-3 text-muted-foreground">
            {unlocked
              ? "Your downloads are unlocked — take any brochure you like."
              : "Fill in the contact form below to unlock the brochure downloads."}
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {brochures.map((b, i) => (
            <div
              key={b.title}
              className={`brochure-card soft-lift flex flex-col rounded-xl border p-6 ${
                i % 2 ? "brochure-card--blue" : "brochure-card--navy"
              }`}
            >
              <IconFileTypePpt className="brochure-icon size-9 icon-float" />
              <h3 className="mt-4 text-lg">{b.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{b.note}</p>
              {unlocked ? (
                <Button asChild variant="outline" className="mt-5">
                  <a href={b.file.url} download={b.file.original_filename}>
                    <IconDownload className="size-4" /> Download brochure
                  </a>
                </Button>
              ) : (
                <Button variant="outline" disabled className="mt-5" title="Fill in the contact form below to unlock downloads">
                  <IconLock className="size-4" /> Download brochure
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const full_name = String(d.get("full_name") ?? "").trim();
    const email = String(d.get("email") ?? "").trim();
    const phone = String(d.get("phone") ?? "").trim();
    const programme = String(d.get("programme") ?? "");
    const message = String(d.get("message") ?? "").trim();
    if (!full_name || !/^\S+@\S+\.\S+$/.test(email) || !programme) {
      toast.error("Please enter your name, a valid email and a programme.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("enquiries").insert({
      full_name, email, programme, phone: phone || null, message: message || null,
    });
    setSending(false);
    if (error) { toast.error("Sorry, your enquiry could not be sent. Please try again."); return; }
    form.reset();
    onSubmitted?.();
    toast.success("Thank you — your downloads are unlocked, and our admissions team will contact you soon.");
  }

  return (
    <section id="contact" className="landing pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <h2>Contact us</h2>
          <p className="mt-3 text-muted-foreground">Send us your details and we will get back to you with admission updates.</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-xl border bg-card p-6 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor="full_name">Full name</Label><Input id="full_name" name="full_name" maxLength={100} required /></div>
          <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" maxLength={255} required /></div>
          <div className="grid gap-2"><Label htmlFor="phone">Phone (optional)</Label><Input id="phone" name="phone" type="tel" maxLength={20} /></div>
          <div className="grid gap-2">
            <Label htmlFor="programme">Programme</Label>
            <select id="programme" name="programme" required defaultValue="" className="h-10 rounded-md border border-input bg-background px-3 text-sm">
              <option value="" disabled>Select a programme</option>
              {programmeOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="grid gap-2 sm:col-span-2"><Label htmlFor="message">Message (optional)</Label><Textarea id="message" name="message" maxLength={1000} rows={4} /></div>
          <div className="sm:col-span-2"><Button type="submit" disabled={sending} className="w-full">{sending ? "Sending…" : "Send enquiry"}</Button></div>
        </form>
      </div>
    </section>
  );
}
