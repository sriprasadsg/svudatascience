import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft, IconArrowRight, IconCheck, IconClock, IconDeviceLaptop } from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { SvuHeader } from "./components/svu-header";
import { SvuFooter } from "./components/svu-footer";
import { getProgramme, programmes, programmePath, programmeAdmissions } from "./programmes";
import svuLogo from "@/assets/svu-logo.png.asset.json";
import exfeduLogo from "@/assets/exfedu-logo.png.asset.json";

export default function ProgrammePage() {
  const { programmeSlug } = useParams();
  const programme = getProgramme(programmeSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!programme) return;
    document.title = `${programme.name} | SVU & Exafluence Education`;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previous = description?.content;
    if (description) description.content = `${programme.subtitle} Explore duration, study mode, learning highlights and admissions.`;
    return () => {
      document.title = "SVU Data Science Programmes in Tirupati | Exafluence";
      if (description && previous) description.content = previous;
    };
  }, [programme]);

  if (!programme) {
    return <><SvuHeader /><main className="landing programme-page mx-auto max-w-3xl px-6 py-16"><h1>Programme not found</h1><Button asChild className="mt-6"><Link to="/#programmes">Back to programmes</Link></Button></main><SvuFooter /></>;
  }

  const admission = programmeAdmissions[programme.admissionType];
  const enquiryHref = `/?programme=${programme.slug}#programme-enquiry`;

  return (
    <>
      <SvuHeader />
      <main className={`landing programme-page bg-background ${programme.slug === "ms-quantum-computing" ? "programme-page--quantum" : ""}`}>
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/#programmes" className="text-primary hover:underline">Programmes</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="min-w-0 break-words">{programme.name}</span>
          </nav>
          <Link to="/#programmes" className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <IconArrowLeft className="size-4" /> Back to programmes
          </Link>
        </div>

        <section className="programme-hero border-y border-border bg-background">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
            <div className="programme-brand-logos flex items-center gap-5">
              <img src={svuLogo.url} alt="Sri Venkateswara University" className="h-10 w-auto sm:h-12" />
              <span className="text-xs text-muted-foreground">in collaboration with</span>
              <img src={exfeduLogo.url} alt="Exafluence Education" className="h-9 w-auto sm:h-10" />
            </div>
            <div className="mt-7 max-w-4xl">
              <p className="text-sm font-medium text-primary">SVU–Exafluence programme</p>
              <h1 className="programme-page__title mt-2">{programme.name}</h1>
              <p className="programme-page__subtitle mt-3 text-lg text-muted-foreground">{programme.subtitle}</p>
              <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{programme.intro}</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <div className="programme-meta soft-lift"><IconClock className="size-5 shrink-0 text-primary" /><div><span>Duration</span><p>{programme.duration}</p></div></div>
              <div className="programme-meta soft-lift"><IconDeviceLaptop className="size-5 shrink-0 text-primary" /><div><span>Study and delivery mode</span><p>{programme.mode}</p></div></div>
            </div>
            <Button asChild className="mt-7 min-h-11 font-medium"><Link to={enquiryHref}>Send a programme enquiry <IconArrowRight className="size-4" /></Link></Button>
          </div>
        </section>

        <nav aria-label="Programme page sections" className="programme-section-nav border-b border-border bg-background">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 py-3 sm:px-6 lg:px-8">
            <Button asChild variant="ghost"><a href="#learning-focus">Learning focus</a></Button>
            <Button asChild variant="ghost"><a href="#admission-process">Admission process</a></Button>
            <Button asChild variant="outline"><Link to={enquiryHref}>Enquire <IconArrowRight className="size-4" /></Link></Button>
          </div>
        </nav>

        <div className="programme-detail-sections mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-8">
          <section aria-labelledby="learning-focus" className="min-w-0">
            <p className="text-sm font-medium text-primary">Programme overview</p>
            <h2 id="learning-focus" className="mt-2">Learning focus</h2>
            <div className="mt-6 grid gap-0 divide-y divide-border border-y border-border">
              {programme.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3 py-5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><IconCheck className="size-4" /></span>
                  <p className="leading-6 text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="admission-process" className="min-w-0 border-t border-border pt-9 lg:border-t-0 lg:pt-0">
            <p className="text-sm font-medium text-primary">How to apply</p>
            <h2 id="admission-process" className="mt-2">Admission process</h2>
            <div className="programme-admission-table mt-6 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{programme.name} admission process</caption>
                <tbody>
                  {admission.rows.map(([label, value]) => (
                    <tr key={label} className="border-b border-border last:border-0">
                      <th scope="row" className="w-1/3 min-w-40 bg-muted/30 p-4 align-top font-medium">{label}</th>
                      <td className="min-w-64 p-4 leading-6 text-muted-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">{admission.footnote}</p>
            <Button asChild className="mt-6 font-medium"><Link to={enquiryHref}>Send a programme enquiry <IconArrowRight className="size-4" /></Link></Button>
          </section>

        </div>
        <section className="border-t border-border bg-muted/30 py-8" aria-label="Browse programmes">
          <nav className="mx-auto grid max-w-6xl gap-3 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
            {programmes.map((item) => <Link key={item.slug} to={programmePath(item)} aria-current={item.slug === programme.slug ? "page" : undefined} className={`programme-browse-link flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background p-4 text-sm font-medium hover:border-primary ${item.slug === "ms-quantum-computing" ? "programme-browse-link--quantum" : ""}`}><span>{item.name}</span><IconArrowRight className="size-4 shrink-0 text-primary" /></Link>)}
          </nav>
        </section>
      </main>
      <SvuFooter />
    </>
  );
}
