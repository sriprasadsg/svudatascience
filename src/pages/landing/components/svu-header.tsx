import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown, IconMenu2 } from "@tabler/icons-react";
import { Button } from "@/components/base/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import navigation from "@/data/svu-navigation.json";
import banner from "@/assets/svu-official-header.jpg.asset.json";

type UniversityLink = { label: string; href: string | null; children: UniversityLink[] };

function MenuItems({ items }: { items: UniversityLink[] }) {
  return <>{items.map((item, index) => item.children.length ? (
    <DropdownMenuSub key={`${item.label}-${index}`}>
      <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="svu-header-dropdown">
        {item.href && <DropdownMenuItem asChild><a href={item.href}>{item.label}</a></DropdownMenuItem>}
        <MenuItems items={item.children} />
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  ) : <DropdownMenuItem key={`${item.label}-${index}`} asChild><a href={item.href ?? "https://svudatascience.in/"}>{item.label}</a></DropdownMenuItem>)}</>;
}

function MobileItems({ items }: { items: UniversityLink[] }) {
  return <>{items.map((item, index) => item.children.length ? <details key={`${item.label}-${index}`}>
    <summary>{item.label}</summary>
    {item.href && <a href={item.href}>{item.label}</a>}
    <MobileItems items={item.children} />
  </details> : <a key={`${item.label}-${index}`} href={item.href ?? "https://svudatascience.in/"}>{item.label}</a>)}</>;
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
          {[[0,10],[10,21],[21,27]].map(([a,b]) => <div className="svu-header-row" key={a}>{navigation.slice(a,b).map((item) => item.children.length ? <div key={item.label}><DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost">{item.label}<IconChevronDown size={14} /></Button></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="svu-header-dropdown">
              {item.href && <DropdownMenuItem asChild><a href={item.href}>{item.label}</a></DropdownMenuItem>}
              <MenuItems items={item.children} />
            </DropdownMenuContent>
          </DropdownMenu></div> : <a key={item.label} href={item.href ?? "https://svudatascience.in/"}>{item.label.includes("(New)") ? <>Diploma Fees <span className="svu-header-new">(New)</span></> : item.label}</a>)}</div>)}
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
      <Link to="/">Home</Link><a href="/#programmes">Programmes</a><a href="/#collaboration">Industry Collaboration</a>
      <Link to="/admissions">Admissions</Link><Link to="/international-students">International Students</Link>
      <a href="/#contact">Contact</a><a href="/#register">Register Interest</a>
    </div></nav>
  </>;
}