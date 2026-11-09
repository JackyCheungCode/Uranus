"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/wheels", label: "WHEELS", detail: "PRODUCT COLLECTION" },
  { href: "/vehicle-fitment", label: "FITMENT", detail: "VEHICLE APPLICATION" },
  { href: "/technology", label: "ENGINEERING", detail: "TECHNOLOGY & QUALITY" },
  { href: "/markets", label: "GLOBAL TRADE", detail: "EXPORT MARKETS" },
  { href: "/advice", label: "ADVICE", detail: "TECHNICAL GUIDES" },
  { href: "/about", label: "ABOUT", detail: "THE URANUS APPROACH" },
];

const moreItems = [
  { href: "/finishes", label: "FINISH STUDIO" },
  { href: "/quality-assurance", label: "QUALITY & DOCUMENTATION" },
  { href: "/fitment-checklist", label: "FITMENT CHECKLIST" },
  { href: "/wheel-care", label: "WHEEL CARE" },
  { href: "/trade-process", label: "INTERNATIONAL ORDER PROCESS" },
  { href: "/dealers", label: "WHOLESALE & DISTRIBUTION" },
  { href: "/private-label", label: "PRIVATE LABEL & CUSTOM" },
  { href: "/insights", label: "JOURNAL & INSIGHTS" },
  { href: "/faq", label: "FAQ & SUPPORT" },
  { href: "/shipping-returns", label: "SHIPPING & RETURNS" },
  { href: "/warranty", label: "WARRANTY" },
  { href: "/contact", label: "CONTACT" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link href="/" onClick={() => setMobileOpen(false)} className="group flex shrink-0 items-center gap-3 text-ink" aria-label="URANUS home">
          <span className="flex h-9 w-9 items-center justify-center border border-ink text-[11px] font-bold tracking-[-0.08em] transition-colors group-hover:bg-ink group-hover:text-white">U.</span>
          <span className="flex flex-col leading-none">
            <span className="text-[18px] font-bold tracking-[0.16em]">URANUS</span>
            <span className="mt-[5px] text-[8px] font-bold tracking-[0.2em] text-muted">PERFORMANCE WHEELS</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden h-full items-center gap-4 xl:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`group relative flex h-full flex-col justify-center gap-1 border-b-2 pt-[2px] transition-colors ${active ? "border-brand text-ink" : "border-transparent text-ink hover:border-line-strong"}`}>
              <span className="text-[10px] font-bold tracking-[0.11em]">{item.label}</span>
              <span className="text-[8px] font-light tracking-[0.08em] text-muted">{item.detail}</span>
            </Link>;
          })}
          <div className="group relative flex h-full items-center">
            <button type="button" className="flex h-full flex-col justify-center gap-1 border-b-2 border-transparent text-left text-ink hover:border-line-strong" aria-haspopup="true">
              <span className="text-[10px] font-bold tracking-[0.11em]">MORE</span><span className="text-[8px] font-light tracking-[0.08em] text-muted">ALL DESTINATIONS</span>
            </button>
            <div className="invisible absolute right-0 top-full max-h-[calc(100vh-90px)] w-72 overflow-y-auto border border-line bg-white opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {moreItems.map((item) => <Link key={item.href} href={item.href} className={`flex min-h-12 items-center justify-between border-b border-line px-4 text-[10px] font-bold tracking-[0.1em] last:border-0 hover:bg-surface hover:text-brand ${isActive(pathname,item.href) ? "text-brand" : "text-ink"}`}>{item.label}<ArrowUpRight size={13}/></Link>)}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link href="/request-quote"><Button size="compact" className="gap-2 text-[10px] tracking-[0.1em]">REQUEST A QUOTE <ArrowUpRight size={14}/></Button></Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/request-quote" className="hidden sm:block"><Button size="compact" className="gap-2 text-[10px] tracking-[0.1em]">GET A QUOTE <ArrowUpRight size={13}/></Button></Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:bg-surface">
            {mobileOpen ? <X size={19}/> : <Menu size={19}/>}
          </button>
        </div>
      </div>

      {mobileOpen && <div id="mobile-navigation" className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-72px)] overflow-y-auto border-b border-line bg-white xl:hidden">
        <nav aria-label="Mobile navigation" className="mx-auto max-w-[1440px] px-5 pb-5 sm:px-8">
          {[...navItems,...moreItems].map((item,index) => {
            const active = isActive(pathname,item.href);
            return <Link key={item.href} href={item.href} onClick={()=>setMobileOpen(false)} aria-current={active?"page":undefined} className={`flex min-h-14 items-center justify-between border-b border-line py-3 ${active?"text-brand":"text-body"}`}>
              <span className="text-[11px] font-bold tracking-[0.12em]">{item.label}</span><span className="text-[10px] font-light text-muted">{String(index+1).padStart(2,"0")}</span>
            </Link>;
          })}
          <Link href="/request-quote" onClick={()=>setMobileOpen(false)} className="mt-5 flex min-h-12 items-center justify-between bg-brand px-4 text-[10px] font-bold tracking-[0.13em] text-white">REQUEST A QUOTE <ArrowUpRight size={15}/></Link>
        </nav>
      </div>}
    </header>
  );
}
