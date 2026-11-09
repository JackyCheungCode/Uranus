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
    <footer className="bg-surface text-body">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-10 lg:pb-12 lg:pt-16">
        <div className="grid gap-10 border-b border-line-strong pb-12 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-ink text-[11px] font-bold tracking-[-0.08em]">U.</span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-[0.18em] text-ink">URANUS</span>
                <span className="mt-[6px] text-[8px] font-bold tracking-[0.22em] text-muted">PERFORMANCE WHEELS</span>
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm font-light leading-7 text-muted">
              Precision wheel design. Considered proportions. Vehicle-first fitment information to help you make a more informed choice.
            </p>
            <Link href="/wheels" className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink pb-2 text-[10px] font-bold tracking-[0.14em] text-ink transition-colors hover:text-brand hover:border-brand">
              EXPLORE THE COLLECTION <ArrowRight size={14} />
            </Link>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-muted">01 / EXPLORE</p>
            <nav aria-label="Explore links" className="mt-5 flex flex-col items-start gap-4">
              {exploreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="min-h-6 text-[11px] font-bold tracking-[0.1em] text-ink transition-colors hover:text-brand">{link.label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-muted">02 / COMPANY</p>
            <nav aria-label="Company links" className="mt-5 flex flex-col items-start gap-4">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="min-h-6 text-[11px] font-bold tracking-[0.1em] text-ink transition-colors hover:text-brand">{link.label}</Link>
              ))}
            </nav>
            <Link href="/vehicle-fitment" className="mt-7 flex min-h-12 items-center justify-between gap-4 bg-brand px-4 text-[10px] font-bold tracking-[0.12em] text-white transition-colors hover:bg-[#0653b6]">
              FIND YOUR FITMENT <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] font-light leading-5 tracking-[0.06em] text-muted md:flex-row md:items-end">
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
