import { useEffect } from "react";
import { SvuFooter } from "./components/svu-footer";
import { SvuHeader } from "./components/svu-header";
import { Link, useLocation } from "react-router-dom";
import { TechStrip } from "./components/tech-strip";
import { ProgrammeEnquiryForm } from "./components/programme-enquiry-form";
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
  IconClock,
} from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { programmes, programmePath, type Programme } from "./programmes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function Hero() {
  return (
    <section id="top" className="landing svu-main-hero border-b border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-page px-6 lg:px-8">
      <div className="programme-brand-logos mb-7 flex max-w-xl flex-wrap items-center gap-x-5 gap-y-3">
        <img src={svuLogo.url} alt="Sri Venkateswara University, Tirupati" className="h-9 w-auto min-w-0 shrink sm:h-11" />
        <span className="shrink-0 text-sm font-normal text-muted-foreground">in collaboration with</span>
        <img src={exfeduLogo.url} alt="Exafluence Education" className="h-8 w-auto min-w-0 shrink sm:h-9" />
      </div>
      <div className="max-w-4xl">
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
        <div className="mt-7 flex flex-wrap gap-3">
          <Button className="min-h-11 px-6" asChild><a href="#programmes">Explore Programmes <IconArrowRight className="size-4 icon-nudge" /></a></Button>
          <Button variant="outline" className="min-h-11 px-6" asChild><a href="#programme-enquiry">Enquire <IconArrowRight className="size-4" /></a></Button>
        </div>
      </div>
      </div>
    </section>
  );
}

function Collaboration() {
  return (
    <section id="collaboration" className="landing svu-main-collaboration border-y border-border py-12">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Industry Collaboration</p>
          <h2 className="mt-2 text-balance">Academic Learning with Industry Experience</h2>
        </div>
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
  const location = useLocation();
  const initialProgrammeId = new URLSearchParams(location.search).get("programme") ?? "";
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

        <div className="mt-10 overflow-x-auto border-y border-border bg-background text-foreground">
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
        <section id="programme-enquiry" aria-labelledby="programme-enquiry-heading" className="mt-10 scroll-mt-6 border-t border-border pt-9">
          <h2 id="programme-enquiry-heading">Programme enquiry</h2>
          <ProgrammeEnquiryForm initialProgrammeId={initialProgrammeId} />
        </section>
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
    <section id="learning" className="landing svu-main-learning py-12">
      <div className="mx-auto max-w-page px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Learning experience</p>
          <h2 className="mt-2 text-balance">How you will learn</h2>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {cards.map((c, i) => (
            <div key={c.title} className="svu-benefit soft-lift flex items-start gap-4 rounded-lg border border-border bg-card p-5">
              <c.icon className={`mb-4 size-7 icon-anim icon-c${(i % 4) + 1}`} />
              <div>
              <h4 className="font-medium">{c.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
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
        <Learning />
        <Collaboration />
        <Programmes />
        <Admissions />
        <International />
        <Register />
        <Faqs />
      </main>
      <SvuFooter />
    </>
  );
}
