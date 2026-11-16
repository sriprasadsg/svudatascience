import { useEffect, useState } from "react";
import { SvuFooter } from "./components/svu-footer";
import { SvuHeader } from "./components/svu-header";
import { Link, useLocation } from "react-router-dom";
import { TechStrip } from "./components/tech-strip";
import { ProgrammeEnquiryForm } from "./components/programme-enquiry-form";
import svuLogo from "@/assets/svu-logo.png.asset.json";
import exfeduLogo from "@/assets/exfedu-logo.png.asset.json";
import onlineLearningIllustration from "@/assets/svu-online-learning.webp";
import {
  IconArrowRight,
  IconBook2,
  IconBriefcase,
  IconDeviceLaptop,
  IconTarget,
  IconUsers,
  IconWorld,
  IconBuildingBank,
  IconClock,
} from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { programmes, programmePath, programmeAdmissions, type Programme } from "./programmes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function Hero() {
  return (
    <section id="top" className="landing svu-main-hero relative isolate overflow-hidden border-b border-border bg-background">
      <div className="svu-main-hero__content mx-auto max-w-page px-6 lg:px-8">
      <div className="programme-brand-logos mb-7 flex max-w-xl flex-wrap items-center gap-x-5 gap-y-3">
        <img src={svuLogo.url} alt="Sri Venkateswara University, Tirupati" className="h-9 w-auto min-w-0 shrink sm:h-11" />
        <img src={exfeduLogo.url} alt="Exafluence Education" className="h-8 w-auto min-w-0 shrink sm:h-9" />
      </div>
      <div className="svu-main-hero__layout">
      <div className="svu-main-hero__copy min-w-0">
        <h1 className="display mb-6">
          <span className="block">Industry-Integrated</span>{" "}
          <span className="block text-primary">Technology Education</span>
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Connect academic foundations with industry practice through applied learning, projects and expert mentorship.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button className="min-h-11 px-6" asChild><a href="#programmes">Explore Programmes <IconArrowRight className="size-4 icon-nudge" /></a></Button>
          <Button variant="outline" className="min-h-11 px-6" asChild><a href="#programme-enquiry">Enquire Now <IconArrowRight className="size-4" /></a></Button>
        </div>
      </div>
      <img
        className="svu-main-hero__illustration"
        src={onlineLearningIllustration}
        alt="Online learning illustration with a video lesson, graduate, books, graduation cap and course folders"
        width={1536}
        height={1024}
        fetchPriority="high"
      />
      </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section id="collaboration" className="landing svu-main-collaboration border-y border-border py-12">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="py-2 md:border-r md:border-border md:pr-8">
            <IconBuildingBank className="mb-4 size-8 icon-anim icon-c1" />
            <h3>Sri Venkateswara University</h3>
            <p className="mt-3 text-muted-foreground">
              Provides academic oversight, manages admissions through the Directorate of Admissions, conducts
              examinations and awards the qualification.
            </p>
          </div>
          <div className="py-2">
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
    <article id={`prog-${p.slug}`} className={`programme-card programme-overview-card ${p.slug === "ms-quantum-computing" ? "programme-overview-card--quantum" : ""} group relative flex min-w-0 scroll-mt-24 flex-col rounded-lg border border-border bg-background p-6 text-foreground`}>
      <div className="programme-card__content">
        <p className="text-xs font-medium text-primary">{p.admissionType === "diploma" ? "Diploma programme" : "Master’s programme"}</p>
        <h3 className="mt-3 text-xl"><Link to={programmePath(p)} className="programme-card__title-link hover:underline" aria-label={`View ${p.name}`}>{p.name}</Link></h3>
        <p className="mt-3 text-sm italic text-muted-foreground">{p.subtitle}</p>
      </div>
      <dl className="programme-card__facts mt-5 grid gap-3 border-t border-border pt-4 text-sm">
        <div className="flex items-start gap-2"><IconClock className="mt-0.5 size-4 shrink-0 text-primary" /><div><dt className="text-xs text-muted-foreground">Duration</dt><dd className="mt-1">{p.duration}</dd></div></div>
        <div className="flex items-start gap-2"><IconDeviceLaptop className="mt-0.5 size-4 shrink-0 text-primary" /><div><dt className="text-xs text-muted-foreground">Mode</dt><dd className="mt-1 leading-5">{p.mode}</dd></div></div>
      </dl>
      <ul className="programme-card__highlights mt-5 grid gap-2 border-t border-border pt-4 text-sm">
        {p.highlights.slice(0, 2).map((highlight) => <li key={highlight} className="flex items-start gap-2"><IconTarget aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{highlight}</span></li>)}
      </ul>
      <div className="programme-card__actions relative z-10 mt-auto flex flex-wrap gap-3 pt-6">
        <Button asChild className="font-medium"><Link to={programmePath(p)}>View Full Programme Details <IconArrowRight className="size-4" /></Link></Button>
        <Button asChild variant="outline" className="font-medium"><Link to={`/?programme=${p.slug}#programme-enquiry`}>Enquire</Link></Button>
      </div>
    </article>
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
        <nav aria-label="Programme categories" className="programme-category-nav mb-7 flex flex-wrap justify-center gap-2 border-y border-border py-4">
          <Button asChild variant="outline"><a href="#prog-ms-quantum-computing">All programmes</a></Button>
          <Button asChild variant="outline"><a href="#prog-ms-quantum-computing">Master’s programmes</a></Button>
          <Button asChild variant="outline"><a href="#prog-pg-diploma-data-science">Diploma programmes</a></Button>
          <Button asChild variant="ghost"><a href="#programme-enquiry">Enquire <IconArrowRight className="size-4" /></a></Button>
        </nav>
        <div className="programme-catalogue-grid grid gap-5 md:grid-cols-2">
          {programmes.map((programme) => <ProgrammeCard key={programme.slug} p={programme} />)}
        </div>

      </div>
    </section>
  );
}

function ProgrammeEnquiry() {
  const location = useLocation();
  const initialProgrammeId = new URLSearchParams(location.search).get("programme") ?? "";
  return (
    <section id="programme-enquiry" aria-labelledby="programme-enquiry-heading" className="landing scroll-mt-6 border-t border-border px-6 py-9 lg:px-8">
      <h2 id="programme-enquiry-heading">Programme enquiry</h2>
      <ProgrammeEnquiryForm initialProgrammeId={initialProgrammeId} />
    </section>
  );
}

function Learning() {
  const cards = [
    { icon: IconTarget, title: "80% Applied Learning", text: "Develop practical skills through laboratory work, analytical exercises and projects." },
    { icon: IconBook2, title: "20% Theoretical Foundations", text: "Build conceptual understanding to support analysis, problem-solving and practical work." },
    { icon: IconDeviceLaptop, title: "Online Academic Sessions", text: "Engage with structured lectures, subject discussions and guided learning." },
    { icon: IconUsers, title: "Faculty & Industry Mentorship", text: "Receive academic guidance and practical perspectives from faculty and industry professionals." },
  ];
  return (
    <section id="learning" className="landing svu-main-learning py-12">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Learning experience</p>
          <h2 className="mt-2 text-balance">How you will learn</h2>
        </div>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article key={c.title} className="svu-learning-card soft-lift flex min-w-0 flex-col rounded-lg border border-border bg-background p-5">
              <c.icon aria-hidden="true" className="mb-4 size-7 shrink-0 text-primary" />
              <h3>{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </article>
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
  const [activeSlug, setActiveSlug] = useState(programmes[0].slug as Programme["slug"]);
  const active = programmes.find((programme) => programme.slug === activeSlug) ?? programmes[0];
  return (
    <section id="international" className="landing programme-explorer py-10">
      <div className="mx-auto grid max-w-page items-start gap-8 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-medium text-primary">Programmes</p>
          <h2 className="mt-2 text-balance">Master’s and Diploma Programmes</h2>
          <div role="group" aria-label="Programme summaries" className="mt-6 grid gap-2">
            {programmes.map((programme) => (
              <Button key={programme.slug} variant="ghost" aria-pressed={activeSlug === programme.slug} aria-controls="programme-summary-panel" onMouseEnter={() => setActiveSlug(programme.slug)} onFocus={() => setActiveSlug(programme.slug)} onClick={() => setActiveSlug(programme.slug)} className={`programme-explorer__option ${programme.slug === "ms-quantum-computing" ? "programme-explorer__option--quantum" : ""} min-h-12 h-auto w-full justify-between whitespace-normal border border-border px-4 py-3 text-left font-medium`}>
                <span>{programme.name}</span><IconArrowRight aria-hidden="true" className="size-4 shrink-0" />
              </Button>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-5"><Link to="/international-students"><IconWorld size={16} /> International student admissions</Link></Button>
        </div>
        <div id="programme-summary-panel" role="region" aria-label="Selected programme summary" aria-live="polite" className="programme-explorer__panel min-w-0 border-t-2 border-primary pt-5">
          <h3>{active.name}</h3>
          <p className="mt-2 text-sm italic text-muted-foreground">{active.subtitle}</p>
          <dl className="mt-5 grid gap-4 border-y border-border py-4 sm:grid-cols-2">
            <div><dt className="text-xs text-muted-foreground">Duration</dt><dd className="mt-1 text-sm">{active.duration}</dd></div>
            <div><dt className="text-xs text-muted-foreground">Mode</dt><dd className="mt-1 text-sm">{active.mode}</dd></div>
          </dl>
          <h4 className="mt-5 text-base font-medium">Admission</h4>
          <dl className="mt-3 divide-y divide-border text-sm">
            {programmeAdmissions[active.admissionType].rows.map(([label, value]) => (
              <div key={label} className="py-3">
                <dt className="font-medium">{label}</dt>
                <dd className="mt-1 leading-6 text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-sm italic text-muted-foreground">{programmeAdmissions[active.admissionType].footnote}</p>
          {active.slug === "ms-data-science" && <p className="mt-3 text-sm text-muted-foreground">30 seats each year are reserved for international applicants to the M.S. Data Science programme.</p>}
          <div className="mt-6 border-t border-border pt-5">
            <h4 className="text-base font-medium">Enquiry</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button asChild><Link to={`/?programme=${active.slug}#programme-enquiry`}>Enquire <IconArrowRight size={16} /></Link></Button>
              <Button asChild variant="outline"><Link to={programmePath(active)}>View Programme <IconArrowRight size={16} /></Link></Button>
            </div>
          </div>
        </div>
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
        <div className="mt-6 flex flex-wrap justify-center gap-3"><Button asChild><a href="#programme-enquiry">Enquire <IconArrowRight className="size-4" /></a></Button><Button variant="outline" asChild><Link to="/registration">Registration</Link></Button></div>
      </div>
    </section>
  );
}

export default function Landing() {
  const location = useLocation();
  useEffect(() => {
    const formSection = document.getElementById("programme-enquiry");
    if (!formSection) return;
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("programme-enquiry-visible", Boolean(entry?.isIntersecting));
    });
    observer.observe(formSection);
    return () => {
      observer.disconnect();
      document.body.classList.remove("programme-enquiry-visible");
    };
  }, []);
  useEffect(() => {
    if (location.hash !== "#contact" && location.hash !== "#programme-enquiry") return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.key]);
  return (
    <>
      <SvuHeader />
      <main className="svu-main-page bg-background text-foreground">
        <Hero />
        <Collaboration />
        <Learning />
        <Programmes />
        <div className="mx-auto max-w-page px-6 pb-10 lg:px-8"><TechStrip /></div>
        <Admissions />
        <International />
        <Register />
        <ProgrammeEnquiry />
        <Faqs />
      </main>
      <SvuFooter />
    </>
  );
}
