import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ClipboardList, FileSearch, Scale, Wrench } from "lucide-react";

export const metadata: Metadata = { title: "Quality & Documentation", description: "A buyer checklist for reviewing wheel specifications, testing and quality documentation." };

const checks = [
  { n:"01", title:"PRODUCT IDENTITY", icon:ClipboardList, items:["Exact model and SKU reference","Diameter, width, offset and PCD","Centre bore, finish and load rating","Revision or production batch identification"] },
  { n:"02", title:"TEST & COMPLIANCE EVIDENCE", icon:BadgeCheck, items:["Applicable test standard and report scope","Report issuer, date and product coverage","Destination-market marking requirements","Any limits or conditions attached to approval"] },
  { n:"03", title:"MATERIAL & PROCESS", icon:Wrench, items:["Material and manufacturing process description","Declared wheel weight by size","Surface treatment and coating specification","Traceability and inspection checkpoints"] },
  { n:"04", title:"COMMERCIAL RECORD", icon:Scale, items:["Written warranty and exclusions","Packaging and shipment inspection requirements","Claims process and notification period","Approved quotation and final product schedule"] },
];

export default function QualityAssurancePage() {
 return <>
  <section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">PRODUCT / QUALITY & DOCUMENTATION</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">ASK FOR THE<br/>EVIDENCE.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A product name or manufacturing label is not a substitute for product-specific evidence. Use this checklist to review the exact wheel configuration and destination market.</p></div></section>
  <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="text-[10px] font-bold tracking-[.2em] text-muted">BUYER REVIEW / CHECKLIST</p><h2 className="mt-3 text-3xl sm:text-4xl">FOUR DOCUMENT GROUPS.</h2></div><FileSearch size={28} strokeWidth={1.3}/></div><div className="grid gap-px bg-line md:grid-cols-2">{checks.map(({n,title,icon:Icon,items})=><article key={n} className="bg-white p-7 sm:p-9"><div className="flex items-center justify-between border-b border-line pb-5"><span className="text-[10px] font-bold tracking-[.16em] text-muted">{n} / REVIEW</span><Icon size={21} strokeWidth={1.4}/></div><h3 className="mt-7 text-xl font-bold">{title}</h3><ul className="mt-6 space-y-4">{items.map(item=><li key={item} className="flex gap-3 text-sm font-light leading-6 text-body"><span className="mt-[9px] h-1 w-1 shrink-0 bg-brand"/>{item}</li>)}</ul></article>)}</div><p className="mt-8 border-l-2 border-brand bg-surface px-5 py-4 text-xs font-light leading-6 text-muted">This is a buyer review checklist, not a claim that every listed document exists for every product. Request the current documents for the exact SKU, size, production batch and destination before purchase.</p><Link href="/request-quote" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">REQUEST PRODUCT DOCUMENTS <ArrowUpRight size={15}/></Link></section>
 </>;
}
