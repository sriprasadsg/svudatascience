import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown, IconMenu2, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import navigation from "@/data/svu-navigation.json";
import banner from "@/assets/svu-official-header.jpg.asset.json";

type UniversityLink = { label: string; href: string | null; children: UniversityLink[] };

type ProgrammeNavItem = { label: string; to?: string; href?: string; official?: string };

// Destinations copied from svudatascience.in: programmes #courses, international students
// #internationStudents, the official enquiry form and the official registration form.
const programmeNav: ProgrammeNavItem[] = [
  { label: "Home", to: "/", official: "https://svudatascience.in/" },
  { label: "Programmes", href: "/#programmes", official: "https://svudatascience.in/#courses" },
  { label: "Industry Collaboration", href: "/#collaboration" },
  { label: "Admissions", to: "/admissions" },
  { label: "International Students", to: "/international-students", official: "https://svudatascience.in/#internationStudents" },
  { label: "Contact", href: "/#contact", official: "https://svudatascience.in/enquiry.html" },
  { label: "Register Interest", href: "/#register", official: "https://svudatascience.in/register.html" },
];

function MenuItems({ items }: { items: UniversityLink[] }) {
  return <>{items.map((item, index) => item.children.length ? (
    <DropdownMenuSub key={`${item.label}-${index}`}>
      <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
      <DropdownMenuPortal><DropdownMenuSubContent className="svu-header-dropdown">
        {item.href && <DropdownMenuItem asChild><a href={item.href}>{item.label}</a></DropdownMenuItem>}
        <MenuItems items={item.children} />
      </DropdownMenuSubContent></DropdownMenuPortal>
    </DropdownMenuSub>
  ) : item.href ? <DropdownMenuItem key={`${item.label}-${index}`} asChild><a href={item.href}>{item.label}</a></DropdownMenuItem> : <DropdownMenuItem key={`${item.label}-${index}`} disabled>{item.label}</DropdownMenuItem>)}</>;
}

function MobileItems({ items }: { items: UniversityLink[] }) {
  return <>{items.map((item, index) => item.children.length ? <details key={`${item.label}-${index}`}>
    <summary>{item.label}</summary>
    {item.href && <a href={item.href}>{item.label}</a>}
    <MobileItems items={item.children} />
  </details> : item.href ? <a key={`${item.label}-${index}`} href={item.href}>{item.label}</a> : <span key={`${item.label}-${index}`} aria-disabled="true">{item.label}</span>)}</>;
}

export function SvuHeader() {
  useEffect(() => {
    if (document.getElementById("svu-header-font")) return;
    const font = document.createElement("link");
    font.id = "svu-header-font";
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap";
    document.head.appendChild(font);
  }, []);
  return <>
    <header className="svu-official-header">
      <div className="svu-header-inner">
        <a className="svu-header-brand" href="https://svuniversity.edu.in/">
          <img src={banner.url} alt="Sri Venkateswara University — Accredited by NAAC with A+ Grade" width={557} height={186} />
        </a>
        <nav className="svu-header-nav" aria-label="Official university navigation">
          {[[0,10],[10,21],[21,27]].map(([a,b]) => <div className="svu-header-row" key={a}>{navigation.slice(a,b).map((item) => item.children.length ? <div key={item.label}>
            {item.href && <a href={item.href}>{item.label}</a>}
            <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" aria-label={item.href ? `Open ${item.label} sublinks` : undefined}>{!item.href && item.label}<IconChevronDown size={14} /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="svu-header-dropdown">
              {item.href && <DropdownMenuItem asChild><a href={item.href}>{item.label}</a></DropdownMenuItem>}
              <MenuItems items={item.children} />
            </DropdownMenuContent>
          </DropdownMenu></div> : <a key={item.label} href={item.href ?? undefined}>{item.label.includes("(New)") ? <>Diploma Fees <span className="svu-header-new">(New)</span></> : item.label}</a>)}</div>)}
        </nav>
        <div className="svu-header-mobile"><Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open university menu" title="University menu"><IconMenu2 size={22} /></Button></SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetTitle>University navigation</SheetTitle>
            <SheetDescription className="sr-only">Official Sri Venkateswara University links</SheetDescription>
            <nav className="svu-mobile-links" aria-label="Official university mobile navigation"><MobileItems items={navigation} /></nav>
          </SheetContent>
        </Sheet></div>
      </div>
    </header>
    <nav className="svu-page-nav" aria-label="Data science programme navigation"><div className="svu-page-nav-inner">
      {programmeNav.map((item) => <span key={item.label} className="svu-page-nav-item">
        {item.to ? <Link to={item.to}>{item.label}</Link> : <a href={item.href}>{item.label}</a>}
        {item.official && <a className="svu-page-nav-official" href={item.official} target="_blank" rel="noopener noreferrer" title={`Official SVU site: ${item.official}`} aria-label={`Open the official SVU page for ${item.label} in a new tab`}><IconExternalLink size={11} stroke={2} /></a>}
      </span>)}
      <span className="svu-page-nav-note">Marked links open the official SVU site</span>
    </div></nav>
  </>;
}