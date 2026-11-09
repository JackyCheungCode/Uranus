import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/wheels", label: "WHEELS" },
  { href: "/vehicle-fitment", label: "FITMENT" },
  { href: "/configurator", label: "CONFIGURATOR" },
  { href: "/about", label: "OUR STORY" },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "flex flex-col border-t border-line bg-white px-5 py-4 lg:hidden" : "hidden items-center gap-9 lg:flex"}>
      {navItems.map((item) => <Link key={item.href} href={item.href} className={mobile ? "border-b border-line py-4 text-xs font-bold tracking-[0.1em] text-ink last:border-0" : "relative py-2 text-[11px] font-bold tracking-[0.12em] text-ink after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all hover:after:w-full"}>{item.label}</Link>)}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-14">
        <Link href="/" className="flex items-center gap-4 text-ink" aria-label="Uranus home">
          <span className="flex h-8 w-8 items-center justify-center border border-ink text-[10px] font-bold tracking-[-0.08em]">U.</span>
          <span className="flex flex-col leading-none"><span className="text-lg font-bold tracking-[0.18em]">URANUS</span><span className="mt-1 text-[8px] font-bold tracking-[0.22em] text-muted">PERFORMANCE WHEELS</span></span>
        </Link>
        <NavigationLinks />
        <div className="flex items-center gap-3">
          <Link href="/vehicle-fitment" className="hidden sm:block"><Button size="compact">FIND YOUR FITMENT <ArrowUpRight size={14} /></Button></Link>
          <details className="relative lg:hidden">
            <summary className="list-none border border-line p-3 [&::-webkit-details-marker]:hidden" aria-label="Toggle navigation"><Menu size={18} /></summary>
            <div className="absolute right-0 top-full z-20 mt-px w-[min(88vw,360px)] border border-line bg-white"><NavigationLinks mobile /></div>
          </details>
        </div>
      </div>
      <div aria-hidden="true" className="flex h-[3px] w-full"><span className="w-1/3 bg-[#0066b1]" /><span className="w-1/3 bg-[#1c69d4]" /><span className="w-1/3 bg-[#e22718]" /></div>
    </header>
  );
}
