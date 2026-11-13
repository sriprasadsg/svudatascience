import { useEffect, useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import universityLogo from "@/assets/svu-logo.png.asset.json";
import educationLogo from "@/assets/exfedu-logo.png.asset.json";
import { courses, qualifications, occupations, genders, years, onlineRegistrationSchema } from "../../../supabase/functions/_shared/registration-schema";

export default function RegistrationPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [reference, setReference] = useState("");
  const [submitError, setSubmitError] = useState("");
  const update = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Registration | SVU Data Science & Exafluence Education";
    return () => { document.title = "SVU Data Science Programmes in Tirupati | Exafluence"; };
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setSubmitError("");
    const parsed = onlineRegistrationSchema.safeParse({ full_name: "", phone: "", email: "", college: "", location: "", ...values, courses: selectedCourses });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-registration", { body: parsed.data });
      if (error || !data?.id) throw new Error("Save failed");
      setReference(data.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch { setSubmitError("Your registration could not be saved. Please try again; your entries are still here."); }
    finally { setBusy(false); }
  }
  function field(key: string, title: string, required = true, options?: readonly string[], type = "text") {
    return <div className="space-y-2" key={key}>
      <Label htmlFor={key} className="font-normal">{title}{required && <span className="text-destructive"> *</span>}</Label>
      {options ? <Select value={values[key] || ""} onValueChange={v => update(key, v)} disabled={busy}>
        <SelectTrigger id={key} aria-required={required} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined}><SelectValue placeholder="Select an option" /></SelectTrigger>
        <SelectContent>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
      </Select> : <Input id={key} name={key} type={type} required={required} value={values[key] || ""} onChange={e => update(key, e.target.value)} maxLength={key === "email" ? 255 : key === "phone" ? 20 : key === "college" ? 200 : 100} disabled={busy} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />}
      {errors[key] && <p id={`${key}-error`} className="text-xs text-destructive">{errors[key]}</p>}
    </div>;
  }
  return <main className="landing min-h-dvh bg-background px-4 py-6 text-foreground sm:py-10">
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-5 border-b border-border pb-5">
        <img src={universityLogo.url} alt="Sri Venkateswara University" className="h-12 w-28 object-contain sm:w-36" />
        <div className="hidden text-center text-xs sm:block"><p>S.V.U College of Commerce, Management & Computer Science</p><p className="mt-1 text-muted-foreground">Department of Computer Science</p></div>
        <img src={educationLogo.url} alt="Exafluence Education" className="h-12 w-28 object-contain sm:w-32" />
      </div>
      <div className="py-6 text-center">
        <h1 className="text-2xl tracking-normal sm:text-3xl">Sri Venkateswara University, Tirupati</h1>
        <p className="mt-2 text-sm text-muted-foreground">Industry Collaborative Programmes & Courses with Exafluence Inc., USA</p>
        <h2 className="mt-4 text-lg tracking-normal">Registration · AY 2027–2028 Admissions</h2>
      </div>
      {reference ? <section className="border-t border-border py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-primary" />
        <h2 className="text-xl tracking-normal">Registration submitted</h2>
        <p className="mt-3 text-muted-foreground">Your registration has been saved successfully.</p>
        <p className="mt-4 break-all text-xs text-muted-foreground">Reference: {reference}</p>
      </section> : <form onSubmit={submit} noValidate className="space-y-5 border-t border-border pt-6">
        {field("full_name", "Name")}
        <div className="grid gap-5 sm:grid-cols-2">{field("phone", "Mobile Number", true, undefined, "tel")}{field("email", "Email ID", true, undefined, "email")}</div>
        <fieldset className="space-y-3"><legend className="mb-3 text-sm">Course Interested <span className="text-destructive">*</span></legend>
          {courses.map((course, i) => <div key={course} className="flex items-start gap-3">
            <Checkbox id={`course-${i}`} className="mt-0.5" disabled={busy} checked={selectedCourses.includes(course)} aria-invalid={Boolean(errors.courses)} aria-describedby={errors.courses ? "courses-error" : undefined} onCheckedChange={checked => { setSelectedCourses(prev => checked === true ? [...prev, course] : prev.filter(v => v !== course)); setErrors(prev => ({ ...prev, courses: "" })); }} />
            <Label htmlFor={`course-${i}`} className="font-normal leading-5">{course}</Label>
          </div>)}
          {errors.courses && <p id="courses-error" className="text-xs text-destructive">{errors.courses}</p>}
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">{field("gender", "Gender", false, genders)}{field("occupation", "Present Occupation", true, occupations)}</div>
        {field("college", "Name of the College")}
        <div className="grid gap-5 sm:grid-cols-2">{field("education_qualification", "Educational Qualification", true, qualifications)}{field("passed_out_year", "Qualifying Examination – Passed out Year", false, years)}</div>
        {field("location", "Location")}
        <div className="space-y-2"><Label htmlFor="address" className="font-normal">Address of Correspondence</Label><Textarea id="address" value={values.address || ""} onChange={e => update("address", e.target.value)} maxLength={1000} disabled={busy} /></div>
        {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">* Mandatory fields</p>
          <Button type="submit" disabled={busy} size="lg" className="font-normal">{busy ? <Loader2 className="animate-spin" /> : <Send />} {busy ? "Submitting…" : "Submit registration"}</Button>
        </div>
      </form>}
    </div>
  </main>;
}