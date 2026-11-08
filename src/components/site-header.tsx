import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/wheels", label: "WHEELS" },
  { href: "/vehicle-fitment", label: "VEHICLE FITMENT" },
  { href: "/configurator", label: "CONFIGURATOR" },
  { href: "/about", label: "ABOUT" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex flex-col leading-none text-ink" aria-label="Uranus home">
          <span className="text-xl font-bold tracking-[0.16em]">URANUS</span>
          <span className="mt-1 text-[9px] font-normal tracking-[0.24em] text-muted">WHEEL ENGINEERING</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[11px] font-bold tracking-[0.08em] text-ink transition-colors hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/vehicle-fitment" className="hidden sm:block">
            <Button size="compact">FIND YOUR FITMENT <ArrowUpRight size={14} /></Button>
          </Link>
          <button className="border border-line p-3 lg:hidden" aria-label="Open navigation">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
