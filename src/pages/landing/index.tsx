import { useState } from "react";
import { SvuFooter } from "./components/svu-footer";
import svuLogo from "@/assets/svu-logo.png.asset.json";
import exfeduLogo from "@/assets/exfedu-logo.png.asset.json";
import {
  IconArrowRight,
  IconBook2,
  IconBriefcase,
  IconCode,
  IconUsers,
  IconWorld,
  IconBuildingBank,
} from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type Programme = {
  slug: string;
  name: string;
  group: "masters" | "pg" | "diploma";
  duration: string;
  mode: string;
  summary: string;
  selection: string;
  intake: string;
};

const programmes: Programme[] = [
  {
    slug: "ms-data-science",
    name: "M.S. Data Science",
    group: "masters",
    duration: "2 Years",
    mode: "Regular Full-Time (Hybrid)",
    summary:
      "A two-year master's degree for graduates who want a strong grounding in data science, delivered with industry input.",
    selection: "APPGCET, or the SVU Directorate of Admissions online proctored entrance test",
    intake: "120 seats per year (APPGCET 30, DOA 60, International 30)",
  },
  {
    slug: "pg-diploma-data-science",
    name: "PG Diploma in Data Science",
    group: "pg",
    duration: "1 Year",
    mode: "Part-Time (Hybrid)",
    summary:
      "A one-year postgraduate diploma for graduates and working professionals building practical data science skills.",
    selection: "SVU Directorate of Admissions online proctored entrance test",
    intake: "January and July intakes",
  },
  {
    slug: "diploma-python-ai-ml-generative-ai",
    name: "Diploma in Python for AI, ML & Generative AI",
    group: "diploma",
    duration: "6 Months",
    mode: "Part-Time (Hybrid)",
    summary: "Python programming applied to artificial intelligence, machine learning and generative AI.",
    selection: "SVU Directorate of Admissions online proctored entrance test",
    intake: "January and July intakes",
  },
  {
    slug: "diploma-data-visualization",
    name: "Diploma in Data Visualization (Power BI, Tableau & SQL)",
    group: "diploma",
    duration: "6 Months",
    mode: "Part-Time (Hybrid)",
    summary: "Turn data into clear reports and dashboards using Power BI, Tableau and SQL.",
    selection: "SVU Directorate of Admissions online proctored entrance test",
    intake: "January and July intakes",
  },
  {
    slug: "diploma-cloud-technologies",
    name: "Diploma in Cloud Technologies",
    group: "diploma",
    duration: "6 Months",
    mode: "Part-Time (Hybrid)",
    summary: "Core cloud concepts and platforms used to build and run modern data and AI systems.",
    selection: "SVU Directorate of Admissions online proctored entrance test",
    intake: "January and July intakes",
  },
];

const nav = [
  { label: "Home", href: "#top" },
  { label: "Programmes", href: "#programmes" },
  { label: "Industry Collaboration", href: "#collaboration" },
  { label: "Admissions", href: "#admissions" },
  { label: "International Students", href: "#international" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={svuLogo.url} alt="Sri Venkateswara University" className="h-9 w-auto" />
          <span aria-hidden="true" className="h-8 w-px bg-border" />
          <img src={exfeduLogo.url} alt="Exafluence Education" className="h-9 w-auto" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Button asChild>
          <a href="#register">Register Interest</a>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  const [choice, setChoice] = useState<string>("");
  return (
    <section id="top" className="landing relative isolate overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_80%)] bg-[linear-gradient(to_right,theme(colors.foreground/0.02)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.foreground/0.02)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-40 right-1/4 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <img src={svuLogo.url} alt="Sri Venkateswara University, Tirupati" className="h-12 w-auto sm:h-14" />
          <span className="text-sm font-medium text-muted-foreground">in collaboration with</span>
          <img src={exfeduLogo.url} alt="Exafluence Education" className="h-12 w-auto sm:h-14" />
        </div>
        <h1 className="display mb-6">
          Data Science Education
          <br />
          with Industry Experience
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Explore Master's and Diploma Programmes{" "}
          <br className="hidden sm:block" />
          in Data Science, AI, Generative AI,{" "}
          <br className="hidden sm:block" />
          Data Visualization and Cloud Technologies.
        </p>
        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row">
          <Select value={choice} onValueChange={setChoice}>
            <SelectTrigger className="h-14 text-base" aria-label="Choose a programme">
              <SelectValue placeholder="Choose a programme…" />
            </SelectTrigger>
            <SelectContent>
              {programmes.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="h-14 px-6" asChild>
            <a href={choice ? `#prog-${choice}` : "#programmes"}>
              Explore <IconArrowRight className="size-4 icon-nudge" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section id="collaboration" className="landing py-20">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Industry Collaboration</p>
          <h2 className="mt-2 text-balance">Academic Learning with Industry Experience</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8">
            <IconBuildingBank className="mb-4 size-8 icon-anim icon-c1" />
            <h3>Sri Venkateswara University</h3>
            <p className="mt-3 text-muted-foreground">
              Provides academic oversight, manages admissions through the Directorate of Admissions, conducts
              examinations and awards the qualification.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8">
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

function ProgrammeCard({ p, wide }: { p: Programme; wide?: boolean }) {
  return (
    <article id={`prog-${p.slug}`} className={`scroll-mt-24 rounded-xl bg-background p-6 text-foreground ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="text-xl">{p.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{p.duration} · {p.mode}</p>
      <p className="mt-4 text-muted-foreground">{p.summary}</p>
      <a href="#register" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        Register interest <IconArrowRight className="size-4 icon-nudge" />
      </a>
    </article>
  );
}

function Programmes() {
  const groups = [
    { key: "masters", label: "Master's" },
    { key: "pg", label: "PG Diploma" },
    { key: "diploma", label: "Specialist Diplomas" },
  ] as const;
  return (
    <section id="programmes" className="landing bg-primary py-20 text-primary-foreground">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold opacity-80">Programmes</p>
          <h2 className="mt-2 text-balance">Choose the programme that fits your goals</h2>
        </div>
        <Tabs defaultValue="masters">
          <TabsList className="mx-auto mb-8 flex w-fit flex-wrap">
            {groups.map((g) => (
              <TabsTrigger key={g.key} value={g.key}>{g.label}</TabsTrigger>
            ))}
          </TabsList>
          {groups.map((g) => (
            <TabsContent key={g.key} value={g.key} forceMount className="data-[state=inactive]:hidden">
              <div className={`grid gap-6 md:grid-cols-2 ${g.key === "diploma" ? "" : "lg:grid-cols-3"}`}>
                {programmes.filter((p) => p.group === g.key).map((p, i) => (
                  <ProgrammeCard key={p.slug} p={p} wide={g.key === "diploma" && i === 0} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 overflow-x-auto rounded-xl bg-background text-foreground">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Programme comparison</caption>
            <thead className="border-b border-border">
              <tr>
                <th className="p-4 font-semibold">Programme</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold">Mode of delivery</th>
                <th className="p-4 font-semibold">Intake</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => (
                <tr key={p.slug} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 text-muted-foreground">{p.duration}</td>
                  <td className="p-4 text-muted-foreground">{p.mode}</td>
                  <td className="p-4 text-muted-foreground">{p.intake}</td>
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
          <p className="text-sm font-semibold text-primary">Learning experience</p>
          <h2 className="mt-2 text-balance">How you will learn</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <c.icon className={`mb-4 size-7 icon-anim icon-c${(i % 4) + 1}`} />
              <h4 className="font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  const steps = [
    { when: "Register interest", what: "Tell us which programme you are interested in to receive admission updates." },
    { when: "December 2026", what: "Expected entrance test for the January 2027 intake (PG Diploma and specialist diplomas)." },
    { when: "May–June 2027", what: "Expected entrance examination for M.S. Data Science, AY 2027 admissions (APPGCET or SVU DOA test)." },
    { when: "June 2027", what: "Expected entrance test for the July 2027 intake (PG Diploma and specialist diplomas)." },
  ];
  return (
    <section id="admissions" className="landing bg-muted/40 py-20">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">Admissions</p>
          <h2 className="mt-2 text-balance">Admissions timeline</h2>
          <p className="mt-4 text-muted-foreground">
            Dates are expected windows. Exact dates are subject to official university and APPGCET announcements.
          </p>
        </div>
        <ol className="mx-auto max-w-2xl space-y-6 border-l-2 border-primary/30 pl-6">
          {steps.map((s) => (
            <li key={s.when} className="relative">
              <span className="absolute -left-[33px] top-1 size-4 rounded-full border-2 border-primary bg-background" />
              <p className="font-semibold">{s.when}</p>
              <p className="mt-1 text-muted-foreground">{s.what}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h4 className="font-semibold">M.S. Data Science seats per year</h4>
            <dl className="mt-3 space-y-1 text-sm">
              {[["Through APPGCET", "30"], ["Through DOA", "60"], ["International students", "30"], ["Total annual intake", "120"]].map(([k, v]) => (
                <div key={k} className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h4 className="font-semibold">Other programmes</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Selection is through the Common Online Proctored Entrance Test conducted by the Directorate of
              Admissions, Sri Venkateswara University, Tirupati. Intakes run in January and July.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function International() {
  return (
    <section id="international" className="landing py-20">
      <div className="mx-auto grid max-w-page items-center gap-10 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-primary">International Students</p>
          <h2 className="mt-2 text-balance">Studying M.S. Data Science from outside India</h2>
          <p className="mt-4 text-muted-foreground">
            30 seats each year are reserved for international applicants to the M.S. Data Science programme.
          </p>
        </div>
        <ul className="space-y-4">
          {[
            ["Eligibility", "A qualifying degree, subject to the university's recognition or equivalence process."],
            ["Selection and documents", "Selection follows the university's international admissions route; required documents will be listed on the International Students page."],
            ["Examinations", "Learning is hybrid. Semester-end examinations are primarily offline, so travel to India may be required."],
          ].map(([t, d]) => (
            <li key={t} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <IconWorld className="size-6 shrink-0 icon-anim icon-c3" />
              <div>
                <p className="font-semibold">{t}</p>
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
    ["Do the programmes guarantee a job?", "No. Programmes build skills relevant to data and AI roles but do not promise employment or placement."],
  ];
  return (
    <section className="landing bg-muted/40 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-center">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
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
    <section id="register" className="landing py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-balance">Ready to take the next step?</h2>
        <p className="mt-4 text-muted-foreground">
          Register your interest to receive admission notifications and programme updates.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><a href="#contact">Register Interest</a></Button>
          <Button variant="outline" asChild><a href="#programmes">View programmes</a></Button>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Collaboration />
        <Programmes />
        <Learning />
        <Admissions />
        <International />
        <Faqs />
        <Register />
      </main>
      <SvuFooter />
    </>
  );
}
