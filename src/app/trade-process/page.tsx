import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck, FileText, PackageCheck, Ship, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "International Trade Process", description: "Understand the steps and information involved in a URANUS international wheel trade enquiry." };

const steps = [
  { n: "01", title: "DEFINE YOUR REQUIREMENT", icon: ClipboardCheck, body: "Identify wheel models, dimensions, finishes, target vehicles, estimated quantities and destination markets. Include drawings or reference samples where relevant." },
  { n: "02", title: "TECHNICAL & COMMERCIAL REVIEW", icon: MessagesSquare, body: "Review the requested specification, application, documentation needs, order volume and destination requirements. Any open technical questions should be resolved before quotation." },
  { n: "03", title: "WRITTEN QUOTATION", icon: FileText, body: "The quotation should identify the exact product configuration, quantity, price basis, validity, payment milestones, named delivery place and agreed Incoterms® rule." },
  { n: "04", title: "ORDER CONFIRMATION", icon: PackageCheck, body: "Proceed only after the final specification, approved samples where applicable, commercial terms and order documents have been accepted in writing." },
  { n: "05", title: "PRODUCTION & SHIPMENT", icon: Ship, body: "Production status, inspection records, packaging, export documents and shipment arrangements are confirmed against the accepted order. Timing is order-specific." },
];

export default function TradeProcessPage() {
  return <>
    <section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">B2B / INTERNATIONAL ORDERING</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">FROM FIRST BRIEF<br/>TO FINAL DELIVERY.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A clear sequence helps both sides review product requirements, technical details and export arrangements before an order is accepted.</p></div></section>
    <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="grid gap-0 lg:grid-cols-[.65fr_1.35fr]"><div className="pb-8 lg:pr-12"><p className="text-[10px] font-bold tracking-[.2em] text-muted">THE ORDER JOURNEY</p><h2 className="mt-4 text-3xl leading-tight sm:text-4xl">FIVE STEPS.<br/>ONE AGREED BRIEF.</h2><p className="mt-6 text-sm font-light leading-7 text-muted">The sequence below is a planning guide. Actual availability, lead time, inspection scope and shipping arrangements are confirmed in writing for each order.</p><Link href="/request-quote" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">PREPARE YOUR RFQ <ArrowUpRight size={15}/></Link></div>
      <div className="border-t border-line">{steps.map(({n,title,icon:Icon,body})=><article key={n} className="grid gap-4 border-b border-line py-7 sm:grid-cols-[72px_1fr_2fr] sm:gap-6"><div className="flex items-center gap-3 sm:block"><span className="text-xs font-bold tracking-[.16em] text-brand">{n}</span><Icon size={19} strokeWidth={1.5} className="sm:mt-5"/></div><h3 className="text-lg font-bold">{title}</h3><p className="text-sm font-light leading-7 text-muted">{body}</p></article>)}</div></div></section>
    <section className="bg-surface"><div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10"><div><p className="text-[10px] font-bold tracking-[.18em] text-muted">BEFORE YOU START</p><h2 className="mt-3 text-2xl">HAVE YOUR COMPANY AND PRODUCT DETAILS READY.</h2><p className="mt-3 max-w-2xl text-sm font-light leading-7 text-muted">Company profile, target market, wheel specification, quantity, destination and preferred trade term are useful starting points.</p></div><Link href="/request-quote"><Button>START A TRADE ENQUIRY <ArrowRight size={15}/></Button></Link></div></section>
  </>;
}
