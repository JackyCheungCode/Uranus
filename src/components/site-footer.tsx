import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const columns = [
  { title: "01 / PRODUCTS", links: [{href:"/wheels",label:"Wheel Collection"},{href:"/finishes",label:"Finish Studio"},{href:"/configurator",label:"Wheel Configurator"},{href:"/vehicle-fitment",label:"Vehicle Fitment"}] },
  { title: "02 / EXPLORE", links: [{href:"/technology",label:"Engineering & Quality"},{href:"/advice",label:"Fitment Advice"},{href:"/insights",label:"Journal & Insights"},{href:"/faq",label:"FAQ & Support"}] },
  { title: "03 / COMPANY", links: [{href:"/about",label:"About URANUS"},{href:"/dealers",label:"Wholesale & Distribution"},{href:"/contact",label:"Contact"},{href:"/request-quote",label:"Request a Quote"}] },
];

export function SiteFooter() {
  return <footer className="bg-surface text-body">
    <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 sm:px-8 lg:px-10 lg:pb-12 lg:pt-16">
      <div className="grid gap-10 border-b border-line-strong pb-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-ink text-[11px] font-bold tracking-[-0.08em]">U.</span>
            <span className="flex flex-col leading-none"><span className="text-xl font-bold tracking-[0.18em] text-ink">URANUS</span><span className="mt-[6px] text-[8px] font-bold tracking-[0.22em] text-muted">PERFORMANCE WHEELS</span></span>
          </Link>
          <p className="mt-6 max-w-md text-sm font-light leading-7 text-muted">Performance wheel design, vehicle-first specification and international trade enquiries. Independent aftermarket wheel brand.</p>
          <Link href="/request-quote" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-brand px-5 text-[10px] font-bold tracking-[0.13em] text-white transition-colors hover:bg-[#0653b6]">START A TRADE ENQUIRY <ArrowUpRight size={15}/></Link>
        </div>
        <div className="grid gap-9 sm:grid-cols-3">
          {columns.map((column)=><div key={column.title}><p className="text-[10px] font-bold tracking-[0.18em] text-muted">{column.title}</p><nav aria-label={column.title} className="mt-5 flex flex-col items-start gap-4">{column.links.map(link=><Link key={link.href} href={link.href} className="min-h-6 text-[11px] font-light text-ink transition-colors hover:text-brand">{link.label}</Link>)}</nav></div>)}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] font-light leading-5 tracking-[0.06em] text-muted md:flex-row md:items-end">
        <div className="flex flex-col gap-1"><span>© {new Date().getFullYear()} URANUS. ALL RIGHTS RESERVED.</span><span>INDEPENDENT AFTERMARKET WHEEL BRAND.</span></div>
        <div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/shipping-returns" className="hover:text-brand">SHIPPING & RETURNS</Link><Link href="/warranty" className="hover:text-brand">WARRANTY</Link><Link href="/legal/privacy" className="hover:text-brand">PRIVACY</Link><Link href="/legal/terms" className="hover:text-brand">TERMS</Link></div>
      </div>
      <p className="mt-5 max-w-3xl text-[9px] font-light leading-5 text-muted">Vehicle names are used for fitment reference only. URANUS is not affiliated with or endorsed by BMW AG. Product specifications, availability, certification and commercial terms are subject to written confirmation.</p>
    </div>
  </footer>;
}
