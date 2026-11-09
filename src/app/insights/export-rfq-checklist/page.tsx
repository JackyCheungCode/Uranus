import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Export Wheel RFQ Checklist", description: "The information to include in an international wheel request for quotation." };

const groups = [
 ["BUYER PROFILE","Legal company name, billing address, contact person, business email, website and destination market."],
 ["PRODUCT SCHEDULE","Model or drawing reference, diameter, width, offset, PCD, centre bore, finish, load rating and front/rear split."],
 ["QUANTITY & PACKAGING","Quantity by SKU, trial order or forecast volume, carton requirements, palletisation, labels and private-label needs."],
 ["DESTINATION & LOGISTICS","Named port or delivery location, postal code, preferred transport mode and requested Incoterms® rule with named place."],
 ["DOCUMENTATION","Requested test reports, certificates, country-of-origin documents, customs information and any local-market requirements."],
 ["TIMING & COMMERCIALS","Target delivery window, quotation currency, payment expectations and any sample or inspection milestones."],
];

export default function ExportRfqInsightPage(){
 return <article><section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 lg:py-24"><Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] text-white/60 hover:text-white"><ArrowLeft size={14}/> BACK TO INSIGHTS</Link><p className="mt-10 text-[10px] font-bold tracking-[.2em] text-white/50">GLOBAL TRADE / RFQ PLAYBOOK</p><h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">THE COMPLETE<br/>EXPORT RFQ.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A structured request helps suppliers quote the same product scope, destination and commercial assumptions.</p></div></section><section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 lg:py-20"><p className="text-sm font-light leading-7 text-muted">A request that says only “20-inch wheels, quote your best price” leaves too many variables open. Use the following information groups to reduce clarification cycles and avoid comparing different assumptions.</p><div className="mt-9 grid gap-px bg-line sm:grid-cols-2">{groups.map(([title,body],i)=><section key={title} className="min-h-[190px] bg-surface p-6"><span className="text-[10px] font-bold tracking-[.16em] text-brand">0{i+1} / INCLUDE</span><h2 className="mt-5 text-lg font-bold">{title}</h2><p className="mt-3 text-sm font-light leading-7 text-muted">{body}</p></section>)}</div><p className="mt-9 text-sm font-light leading-7 text-muted">For multi-SKU programmes, attach a spreadsheet with one line per specification and identify any assumptions that require supplier confirmation. Keep approved revisions with the final purchase documents.</p><Link href="/request-quote" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">OPEN THE RFQ FORM <ArrowUpRight size={15}/></Link></section></article>;
}
