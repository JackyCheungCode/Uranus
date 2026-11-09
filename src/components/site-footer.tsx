import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const exploreLinks = [
  { href: "/wheels", label: "WHEEL COLLECTION" },
  { href: "/vehicle-fitment", label: "VEHICLE FITMENT" },
  { href: "/configurator", label: "WHEEL CONFIGURATOR" },
];

const companyLinks = [
  { href: "/about", label: "OUR STORY" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#090c10] text-white">
      <div className="mx-auto max-w-[1600px] px-5 pb-14 pt-16 sm:px-10 lg:px-14 lg:pb-16 lg:pt-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-white/70 text-[11px] font-bold tracking-[-0.08em]">U.</span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-[0.19em]">URANUS</span>
                <span className="mt-[6px] text-[8px] font-bold tracking-[0.23em] text-white/45">PERFORMANCE WHEELS</span>
              </span>
            </div>
            <p className="mt-7 max-w-md text-sm font-light leading-7 text-white/60">
              Precision wheel design. Considered proportions. Fitment information to help you make a more informed choice.
            </p>
            <Link href="/wheels" className="mt-7 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[10px] font-bold tracking-[0.14em] text-white transition-colors hover:border-white">
              EXPLORE THE COLLECTION <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/40">01 / EXPLORE</p>
            <nav aria-label="Explore links" className="mt-6 flex flex-col items-start gap-4">
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-[11px] font-bold tracking-[0.1em] text-white/75 transition-colors hover:text-white">{link.label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/40">02 / COMPANY</p>
            <nav aria-label="Company links" className="mt-6 flex flex-col items-start gap-4">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-[11px] font-bold tracking-[0.1em] text-white/75 transition-colors hover:text-white">{link.label}</Link>
              ))}
            </nav>
            <Link href="/vehicle-fitment" className="mt-9 flex min-h-12 items-center justify-between gap-4 bg-brand px-4 text-[10px] font-bold tracking-[0.12em] text-white transition-colors hover:bg-[#1558b5]">
              FIND YOUR FITMENT <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] font-light leading-5 tracking-[0.08em] text-white/45 md:flex-row md:items-end">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} URANUS. ALL RIGHTS RESERVED.</span>
            <span>INDEPENDENT AFTERMARKET WHEEL BRAND.</span>
          </div>
          <p className="max-w-xl md:text-right">Vehicle names are used for fitment reference only. URANUS is not affiliated with or endorsed by BMW AG.</p>
        </div>
      </div>
    </footer>
  );
}
