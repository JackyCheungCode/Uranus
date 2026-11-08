import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/wheels", label: "WHEELS" },
  { href: "/vehicle-fitment", label: "VEHICLE FITMENT" },
  { href: "/configurator", label: "CONFIGURATOR" },
  { href: "/about", label: "ABOUT" },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label={mobile ? "Mobile navigation" : "Main navigation"}
      className={mobile ? "flex flex-col border-t border-line bg-white px-5 py-4 lg:hidden" : "hidden items-center gap-8 lg:flex"}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={mobile
            ? "border-b border-line py-4 text-xs font-bold tracking-[0.08em] text-ink last:border-0"
            : "text-[11px] font-bold tracking-[0.08em] text-ink transition-opacity hover:opacity-60"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex flex-col leading-none text-ink" aria-label="Uranus home">
          <span className="text-xl font-bold tracking-[0.16em]">URANUS</span>
          <span className="mt-1 text-[9px] font-normal tracking-[0.24em] text-muted">WHEEL ENGINEERING</span>
        </Link>
        <NavigationLinks />
        <div className="flex items-center gap-3">
          <Link href="/vehicle-fitment" className="hidden sm:block">
            <Button size="compact">FIND YOUR FITMENT <ArrowUpRight size={14} /></Button>
          </Link>
          <details className="relative lg:hidden">
            <summary className="list-none border border-line p-3 [&::-webkit-details-marker]:hidden" aria-label="Toggle navigation">
              <Menu size={18} />
            </summary>
            <div className="absolute right-0 top-full z-20 mt-px w-[min(88vw,360px)] border border-line bg-white">
              <NavigationLinks mobile />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
