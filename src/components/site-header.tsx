"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/wheels", label: "WHEELS", detail: "THE COLLECTION" },
  { href: "/vehicle-fitment", label: "FITMENT", detail: "FIND YOUR SETUP" },
  { href: "/configurator", label: "CONFIGURATOR", detail: "BUILD YOUR WHEEL" },
  { href: "/about", label: "OUR STORY", detail: "THE URANUS APPROACH" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" onClick={() => setMobileOpen(false)} className="group flex shrink-0 items-center gap-3 text-ink" aria-label="URANUS home">
          <span className="flex h-9 w-9 items-center justify-center border border-ink text-[11px] font-bold tracking-[-0.08em] transition-colors group-hover:bg-ink group-hover:text-white">U.</span>
          <span className="flex flex-col leading-none">
            <span className="text-[18px] font-bold tracking-[0.16em]">URANUS</span>
            <span className="mt-[5px] text-[8px] font-bold tracking-[0.2em] text-muted">PERFORMANCE WHEELS</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden h-full items-center gap-5 lg:flex xl:gap-8">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`group relative flex h-full flex-col justify-center gap-1 border-b-2 pt-[2px] transition-colors ${active ? "border-brand text-ink" : "border-transparent text-ink hover:border-line-strong"}`}>
                <span className="text-[10px] font-bold tracking-[0.12em] xl:text-[11px]">{item.label}</span>
                <span className="text-[8px] font-light tracking-[0.1em] text-muted">{item.detail}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="hidden text-[9px] font-bold tracking-[0.14em] text-muted xl:block">ENGINEERED TO FIT</span>
          <Link href="/vehicle-fitment">
            <Button size="default" className="h-11 gap-2 px-4 text-[10px] tracking-[0.1em]">
              FIND YOUR FITMENT <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/vehicle-fitment" className="hidden sm:block">
            <Button size="compact" className="h-10 gap-2 px-4 text-[10px] tracking-[0.1em]">FIND FITMENT <ArrowUpRight size={13} /></Button>
          </Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:bg-surface">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="absolute left-0 right-0 top-full z-40 border-b border-line bg-white lg:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-[1440px] px-5 pb-5 sm:px-8">
            {navItems.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-current={active ? "page" : undefined} className={`flex min-h-16 items-center justify-between border-b border-line py-4 ${active ? "text-ink" : "text-body"}`}>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.13em]">{item.label}</span>
                    <span className="mt-1 block text-[9px] font-light tracking-[0.12em] text-muted">{item.detail}</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.1em] text-muted">0{index + 1}</span>
                </Link>
              );
            })}
            <Link href="/vehicle-fitment" onClick={() => setMobileOpen(false)} className="mt-5 flex min-h-12 items-center justify-between bg-brand px-4 text-[10px] font-bold tracking-[0.13em] text-white">
              FIND YOUR FITMENT <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
