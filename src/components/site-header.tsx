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
      <div aria-hidden="true" className="flex h-[3px] w-full">
        <span className="w-1/3 bg-[#0066b1]" />
        <span className="w-1/3 bg-[#1c69d4]" />
        <span className="w-1/3 bg-[#e22718]" />
      </div>
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-14">
        <Link href="/" onClick={() => setMobileOpen(false)} className="group flex shrink-0 items-center gap-3 text-ink" aria-label="URANUS home">
          <span className="flex h-10 w-10 items-center justify-center border border-ink text-[11px] font-bold tracking-[-0.08em] transition-colors group-hover:bg-ink group-hover:text-white">U.</span>
          <span className="flex flex-col leading-none">
            <span className="text-[19px] font-bold tracking-[0.19em]">URANUS</span>
            <span className="mt-[6px] text-[8px] font-bold tracking-[0.23em] text-muted">PERFORMANCE WHEELS</span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden h-full items-center gap-8 xl:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`group relative flex h-full flex-col justify-center gap-1 border-b-2 pt-[2px] transition-colors ${active ? "border-ink text-ink" : "border-transparent text-ink hover:border-ink"}`}>
                <span className="text-[11px] font-bold tracking-[0.13em]">{item.label}</span>
                <span className="text-[8px] font-light tracking-[0.12em] text-muted">{item.detail}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <span className="text-[9px] font-bold tracking-[0.16em] text-muted">ENGINEERED TO FIT</span>
          <Link href="/vehicle-fitment">
            <Button size="default" className="h-11 gap-3 px-5 text-[10px] tracking-[0.12em]">
              FIND YOUR FITMENT <ArrowUpRight size={14} />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <Link href="/vehicle-fitment" className="hidden sm:block">
            <Button size="sm" className="h-10 gap-2 px-4 text-[10px] tracking-[0.1em]">FIND FITMENT <ArrowUpRight size={13} /></Button>
          </Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:bg-surface">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-line bg-white shadow-none xl:hidden">
          <nav aria-label="Mobile navigation" className="mx-auto max-w-[1600px] px-5 pb-5 sm:px-10">
            {navItems.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-center justify-between border-b border-line py-4 ${active ? "text-ink" : "text-body"}`}>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.13em]">{item.label}</span>
                    <span className="mt-1 block text-[9px] font-light tracking-[0.12em] text-muted">{item.detail}</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.1em] text-muted">0{index + 1}</span>
                </Link>
              );
            })}
            <Link href="/vehicle-fitment" onClick={() => setMobileOpen(false)} className="mt-5 flex h-12 items-center justify-between bg-brand px-4 text-[10px] font-bold tracking-[0.13em] text-white">
              FIND YOUR FITMENT <ArrowUpRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
