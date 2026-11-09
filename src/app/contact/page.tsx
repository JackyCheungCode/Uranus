import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardList, Disc3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description: "Prepare a wheel specification or vehicle fitment enquiry with URANUS.",
};

const enquiryPaths = [
  { number: "01", title: "PRODUCT ENQUIRY", description: "Choose a wheel, select the finish and dimensions, then prepare a printable specification summary.", href: "/wheels", action: "BROWSE WHEELS", icon: Disc3 },
  { number: "02", title: "VEHICLE FITMENT", description: "Search by vehicle, rim or tyre specification and review the available reference data.", href: "/vehicle-fitment", action: "CHECK FITMENT", icon: Search },
  { number: "03", title: "CONFIGURATION", description: "Build a visual wheel setup and review your selected design and finish before continuing.", href: "/configurator", action: "OPEN CONFIGURATOR", icon: ClipboardList },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-surface-dark text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/55">URANUS / CONTACT & ENQUIRIES</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl">LET&apos;S GET YOUR<br />SPECIFICATION RIGHT.</h1>
          <p className="mt-6 max-w-2xl text-sm font-light leading-7 text-white/70">Start with the product or vehicle details you want to discuss. The guided flows below help prepare the information needed for a useful fitment conversation.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-px bg-line md:grid-cols-3">
          {enquiryPaths.map(({ number, title, description, href, action, icon: Icon }) => (
            <article key={number} className="flex min-h-[300px] flex-col bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.16em] text-muted">{number} / ENQUIRY</span>
                <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h2 className="mt-9 text-xl">{title}</h2>
              <p className="mt-4 flex-1 text-sm font-light leading-7 text-muted">{description}</p>
              <Link href={href} className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-ink pb-2 text-[10px] font-bold tracking-[0.14em] text-ink hover:border-brand hover:text-brand">{action} <ArrowUpRight size={15} /></Link>
            </article>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-7">
          <p className="max-w-3xl text-xs font-light leading-6 text-muted">Please note: this site currently prepares local product specifications and fitment reference searches. It does not yet submit a message to a sales inbox, accept payment or confirm stock. A generated specification summary is not an order acceptance or compatibility certification.</p>
          <Link href="/wheels" className="mt-6 inline-flex"><Button>EXPLORE THE COLLECTION <ArrowRight size={15} /></Button></Link>
        </div>
      </section>
    </>
  );
}
