import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "How to Evaluate a Wheel Supplier", description: "A practical supplier evaluation framework for aftermarket wheel buyers and distributors." };

const criteria = [
 ["PRODUCT TRACEABILITY","Can the supplier identify the exact model, size, batch and production revision supplied?"],
 ["TECHNICAL DOCUMENTATION","Are load ratings, test reports and destination-market requirements documented for the exact product?"],
 ["SAMPLE APPROVAL","Can the buyer review physical samples, finish references and packaging before committing to a production order?"],
 ["COMMERCIAL CLARITY","Are MOQ, lead time, payment milestones, Incoterms®, claims process and warranty terms stated in writing?"],
 ["AFTER-SALES PROCESS","Is there a defined process for transit damage, quality claims, replacement parts and technical questions?"],
];

export default function SupplierInsightPage(){
 return <article><section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 lg:py-24"><Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] text-white/60 hover:text-white"><ArrowLeft size={14}/> BACK TO INSIGHTS</Link><p className="mt-10 text-[10px] font-bold tracking-[.2em] text-white/50">SOURCING / BUYER GUIDE</p><h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">HOW TO EVALUATE<br/>A WHEEL SUPPLIER.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A supplier comparison should go beyond a unit price. Review product evidence, sample approval, commercial terms and the process that supports the goods after shipment.</p></div></section><section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 lg:py-20"><p className="text-base font-light leading-8 text-body">For importers and distributors, a wheel is both a technical component and a commercial product. A low initial quote may not include the same specification, documentation, packaging or service scope as another offer. Compare like with like.</p><div className="mt-10 border-t border-line">{criteria.map(([title,body],i)=><section key={title} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[64px_1fr_1.5fr]"><span className="text-xs font-bold tracking-[.15em] text-brand">0{i+1}</span><h2 className="text-base font-bold">{title}</h2><p className="text-sm font-light leading-7 text-muted">{body}</p></section>)}</div><h2 className="mt-12 text-2xl font-bold">BUILD A COMPARABLE RFQ.</h2><p className="mt-4 text-sm font-light leading-7 text-muted">Send each supplier the same product schedule, target quantity, destination, packaging requirement and requested documentation. Ask them to identify any exclusions or substitutions explicitly.</p><Link href="/request-quote" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">PREPARE A TRADE BRIEF <ArrowUpRight size={15}/></Link></section></article>;
}
