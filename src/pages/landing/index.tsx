import { useEffect, useState } from "react";
import { SvuFooter } from "./components/svu-footer";
import { SvuHeader } from "./components/svu-header";
import { Link, useLocation } from "react-router-dom";
import { TechStrip } from "./components/tech-strip";
import svuLogo from "@/assets/svu-logo.png.asset.json";
import exfeduLogo from "@/assets/exfedu-logo.png.asset.json";
import {
  IconArrowRight,
  IconBook2,
  IconBriefcase,
  IconCode,
  IconDatabase,
  IconDeviceLaptop,
  IconTarget,
  IconUsers,
  IconWorld,
  IconBuildingBank,
} from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { programmes, programmePath, type Programme } from "./programmes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Hero() {
  const [choice, setChoice] = useState<string>("");
  const selectedProgramme = programmes.find((programme) => programme.slug === choice);
  return (
    <section id="top" className="landing relative isolate overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_80%)]"
      >
        <div aria-hidden="true" className="hero-motif absolute inset-0" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-40 right-1/4 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto mb-6 flex max-w-4xl flex-nowrap items-center justify-center gap-x-5 gap-y-3 px-6">
        <img src={svuLogo.url} alt="Sri Venkateswara University, Tirupati" className="h-9 w-auto min-w-0 shrink sm:h-11" />
        <span className="shrink-0 text-sm font-normal text-muted-foreground">in collaboration with</span>
        <img src={exfeduLogo.url} alt="Exafluence Education" className="h-8 w-auto min-w-0 shrink sm:h-9" />
      </div>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="display mb-6">
          <span className="block sm:whitespace-nowrap">Data Science Education</span>
          <span className="block sm:whitespace-nowrap">with Industry Experience</span>
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Explore Master's and Diploma Programmes{" "}
          <br className="hidden sm:block" />
          in Data Science, AI, Generative AI,{" "}
          <br className="hidden sm:block" />
          Data Visualization and Cloud Technologies.
        </p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row">
          <Select value={choice} onValueChange={setChoice}>
            <SelectTrigger className="h-14 min-w-0 text-base [&>span]:min-w-0 [&>svg]:shrink-0" aria-label="Choose a programme">
              <SelectValue placeholder="Choose a programme…" />
            </SelectTrigger>
            <SelectContent className="w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]">
              {programmes.map((p) => (
                <SelectItem key={p.slug} value={p.slug} className="min-h-11 whitespace-normal">
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="h-14 px-6" asChild>
            {selectedProgramme ? <Link to={programmePath(selectedProgramme)}>
              Explore <IconArrowRight className="size-4 icon-nudge" />
            </Link> : <a href="#programmes">
              Explore <IconArrowRight className="size-4 icon-nudge" />
            </a>}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section id="collaboration" className="landing py-10">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Industry Collaboration</p>
          <h2 className="mt-2 text-balance">Academic Learning with Industry Experience</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="soft-lift rounded-xl border border-border bg-card p-8">
            <IconBuildingBank className="mb-4 size-8 icon-anim icon-c1" />
            <h3>Sri Venkateswara University</h3>
            <p className="mt-3 text-muted-foreground">
              Provides academic oversight, manages admissions through the Directorate of Admissions, conducts
              examinations and awards the qualification.
            </p>
          </div>
          <div className="soft-lift rounded-xl border border-border bg-card p-8">
            <IconBriefcase className="mb-4 size-8 icon-anim icon-c2" />
            <h3>Exafluence Education</h3>
            <p className="mt-3 text-muted-foreground">
              Supports practical learning through industry mentorship, hands-on projects and learning
              resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgrammeCard({ p }: { p: Programme }) {
  return (
    <Link id={`prog-${p.slug}`} to={programmePath(p)} className={`programme-card programme-overview-card ${p.slug === "ms-quantum-computing" ? "programme-overview-card--quantum" : ""} group flex min-w-0 scroll-mt-24 flex-col rounded-lg border border-border bg-background p-6 text-foreground`} aria-label={`View ${p.name}`}>
      <p className="text-xs font-medium uppercase tracking-wider text-primary">{p.duration}</p>
      <h3 className="mt-3 text-xl group-hover:underline group-hover:underline-offset-4">{p.name}</h3>
      <p className="mt-3 text-sm italic text-muted-foreground">{p.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{p.mode}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-primary">
        View programme <IconArrowRight className="size-4 icon-nudge" />
      </span>
    </Link>
  );
}

function Programmes() {
  return (
    <section id="programmes" className="landing programme-overview scroll-mt-4 bg-background py-16 text-foreground">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-9 max-w-4xl text-center">
          <p className="text-sm font-medium text-primary">Programmes</p>
          <h2 className="mt-2 text-balance">Choose the programme that fits your goals</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme) => <ProgrammeCard key={programme.slug} p={programme} />)}
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-border bg-background text-foreground">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Programme comparison</caption>
            <thead className="border-b border-border text-base leading-snug md:text-lg">
              <tr>
                <th className="p-4 font-medium">Programme</th>
                <th className="p-4 font-medium">Duration</th>
                <th className="p-4 font-medium">Mode of delivery</th>
                <th className="p-4 font-medium">Admission</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => (
                <tr key={p.slug} className="border-b border-border last:border-0">
                  <td className="min-w-56 p-4 font-medium"><Link to={programmePath(p)} className="hover:text-primary hover:underline">{p.name}</Link></td>
                  <td className="min-w-32 p-4 text-muted-foreground">{p.duration}</td>
                  <td className="min-w-56 p-4 text-muted-foreground">{p.mode}</td>
                  <td className="min-w-48 p-4 text-muted-foreground">{p.admissionSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  const cards = [
    { icon: IconCode, title: "Practical work", text: "Hands-on exercises with the tools used in data and AI roles." },
    { icon: IconUsers, title: "Mentorship", text: "Guidance from industry practitioners alongside university faculty." },
    { icon: IconBriefcase, title: "Projects", text: "Applied projects that build a portfolio of real problem-solving." },
    { icon: IconBook2, title: "Learning resources", text: "Structured materials and resources to support hybrid study." },
  ];
  return (
    <section className="landing py-20">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Learning experience</p>
          <h2 className="mt-2 text-balance">How you will learn</h2>
        </div>
        <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div key={c.title} className="soft-lift rounded-xl border border-border bg-card p-6">
              <c.icon className={`mb-4 size-7 icon-anim icon-c${(i % 4) + 1}`} />
              <h4 className="font-medium">{c.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
        <div className="learn-highlights mx-auto mb-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: IconTarget, strong: "80%", label: "Practical Learning", c: 1 },
            { icon: IconBook2, strong: "20%", label: "Theoretical Foundation", c: 2 },
            { icon: IconDeviceLaptop, strong: "", label: "Online Sessions", c: 3 },
            { icon: IconUsers, strong: "", label: "Industry Professionals & Mentors", c: 4 },
          ].map((h, i) => (
            <div
              key={h.label}
              className="learn-tile soft-lift rounded-xl border border-border bg-card p-5 text-center"
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <h.icon className={`mx-auto mb-3 size-7 icon-anim icon-c${h.c}`} />
              <p className="text-sm leading-snug">
                {h.strong && <span className="mr-1 text-lg font-medium text-primary">{h.strong}</span>}
                {h.label}
              </p>
            </div>
          ))}
        </div>
        <section aria-labelledby="lms-heading" className="lms-support-band mx-auto mb-12 max-w-4xl border-y border-border px-6 py-8 sm:px-8">
          <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-8">
            <div className="flex items-center gap-4 md:flex-col md:items-start md:justify-center md:border-r md:border-border md:pr-6">
              <IconDatabase aria-hidden="true" className="size-9 shrink-0 icon-anim icon-c1" />
              <h3 id="lms-heading" className="text-xl font-normal">LMS access</h3>
            </div>
            <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {[
                { label: "Course materials", icon: IconBook2 },
                { label: "Lecture videos", icon: IconDeviceLaptop },
                { label: "Real-time projects", icon: IconCode },
                { label: "Case studies", icon: IconBriefcase },
                { label: "Industry mentor support", icon: IconUsers },
              ].map((item, index) => (
                <li key={item.label} className="flex min-w-0 items-center gap-3">
                  <item.icon aria-hidden="true" className={`size-5 shrink-0 icon-anim icon-c${(index % 4) + 1}`} />
                  <span className="text-sm leading-relaxed text-foreground">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="min-w-0 rounded-lg border border-border bg-card px-4 pb-6 sm:px-6">
          <TechStrip />
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  const steps = [
    { when: "Register interest", what: "Tell us which programme you are interested in to receive admission updates." },
    { when: "December 2026", what: "Expected entrance test for the January 2027 intake (PG Diploma and specialist diplomas)." },
    { when: "May–June 2027", what: "Expected entrance examination for M.S. Data Science, AY 2027 admissions (APPGCET or SVU DOA test)." },
    { when: "June 2027", what: "Expected entrance test for the July 2027 intake (PG Diploma and specialist diplomas)." },
  ];
  return (
    <section id="admissions" className="landing bg-muted/40 py-10">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <p className="text-sm font-medium text-primary">Admissions</p>
          <h2 className="mt-2 text-balance">Admissions timeline</h2>
          <p className="mt-4 text-[13px] text-muted-foreground max-sm:whitespace-normal sm:whitespace-nowrap">
            Dates are expected windows. Exact dates are subject to official university and APPGCET announcements.
          </p>
        </div>
        <ol className="svu-timeline mx-auto max-w-2xl space-y-6 border-l-2 border-primary/30 pl-6">
          {steps.map((s) => (
            <li key={s.when} className="relative">
              <span className="svu-dot absolute -left-[33px] top-1 size-4 rounded-full border-2 border-primary bg-background" />
              <p className="font-medium">{s.when}</p>
              <p className="mt-1 text-muted-foreground">{s.what}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-6 max-w-3xl">
          <div className="soft-lift rounded-xl border border-border bg-card p-6">
            <h4 className="font-medium">Other programmes</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Selection is through the Common Online Proctored Entrance Test conducted by the Directorate of
              Admissions, Sri Venkateswara University, Tirupati. Intakes run in January and July.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center"><Button variant="outline" asChild><Link to="/admissions">Admission process & eligibility <IconArrowRight size={16} /></Link></Button></div>
      </div>
    </section>
  );
}

function International() {
  return (
    <section id="international" className="landing py-10">
      <div className="mx-auto grid max-w-page items-center gap-10 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-medium text-primary">International Students</p>
          <h2 className="mt-2 text-balance">Studying M.S. Data Science from outside India</h2>
          <p className="mt-4 text-muted-foreground">
            30 seats each year are reserved for international applicants to the M.S. Data Science programme.
          </p>
          <Button asChild className="mt-5"><Link to="/international-students">International student admissions <IconArrowRight size={16} /></Link></Button>
        </div>
        <ul className="space-y-4">
          {[
            ["Eligibility", "A qualifying degree, subject to the university's recognition or equivalence process."],
            ["Selection and documents", "Selection follows the university's international admissions route; required documents will be listed on the International Students page."],
            ["Examinations", "Learning is hybrid. Semester-end examinations are primarily offline, so travel to India may be required."],
          ].map(([t, d]) => (
            <li key={t} className="soft-lift flex gap-4 rounded-xl border border-border bg-card p-5">
              <IconWorld className="size-6 shrink-0 icon-anim icon-c3" />
              <div>
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faqs() {
  const faqs = [
    ["Who awards the qualification?", "Sri Venkateswara University, Tirupati awards the qualification. Exafluence Education is the industry collaboration partner."],
    ["How are programmes delivered?", "The M.S. is regular full-time in hybrid mode. The PG Diploma and specialist diplomas are part-time in hybrid mode."],
    ["Is the programme fully online?", "No. Semester-end examinations are primarily offline, and attendance in India may be required."],
    ["When are the entrance tests?", "For January 2027 entry, December 2026; for July 2027 entry, June 2027. The M.S. entrance is expected in May, possibly June 2027. Exact dates are subject to official announcement."],
  ];
  return (
    <section className="landing bg-muted/40 py-10">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="faq-heading mb-8 text-center">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left text-[14px] font-normal tracking-normal">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Register() {
  return (
    <section id="register" className="landing py-12">
      <span id="contact" aria-hidden="true" />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-balance">Ready to take the next step?</h2>
          <p className="mt-4 text-sm text-muted-foreground md:whitespace-nowrap">
            Register your interest to receive admission notifications and programme updates.
          </p>
        </div>
        <div className="mt-6 text-center"><Button asChild><Link to="/registration">Registration</Link></Button></div>
      </div>
    </section>
  );
}

export default function Landing() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash !== "#contact") return;
    const frame = requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.key]);
  return (
    <>
      <SvuHeader />
      <main>
        <Hero />
        <Collaboration />
        <Programmes />
        <Learning />
        <Admissions />
        <International />
        <Register />
        <Faqs />
      </main>
      <SvuFooter />
    </>
  );
}
