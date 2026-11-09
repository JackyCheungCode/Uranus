import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Fitment Advice & Guides", description: "Technical guides to wheel fitment, offsets, construction and finish selection." };

const guides = [
  { n: "01", tag: "FITMENT BASICS", title: "UNDERSTANDING DIAMETER, WIDTH & OFFSET", body: "Learn how the key wheel dimensions work together and why one measurement cannot be evaluated in isolation.", href: "/advice/wheel-fitment-basics" },
  { n: "02", tag: "CONSTRUCTION", title: "FORGED VS FLOW FORMED VS CAST", body: "Understand the broad differences between common wheel manufacturing methods, without reducing quality to a single label.", href: "/advice/wheel-construction" },
  { n: "03", tag: "FINISH & CARE", title: "CHOOSING A FINISH FOR YOUR USE CASE", body: "Compare appearance, maintenance considerations and the questions to ask before specifying a custom finish.", href: "/finishes" },
  { n: "04", tag: "ORDERING", title: "WHAT TO PREPARE BEFORE REQUESTING A QUOTE", body: "A practical checklist for vehicle information, wheel specifications, quantity and international destination details.", href: "/request-quote" },
];

export default function AdvicePage() {
 return <><section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">URANUS / KNOWLEDGE & ADVICE</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">KNOW THE DETAILS.<br/>CHOOSE WITH CONFIDENCE.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A considered wheel choice starts with the right questions. Explore practical guides to dimensions, construction, finishes and trade enquiries.</p></div></section><section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="grid gap-px bg-line md:grid-cols-2">{guides.map((g)=><Link href={g.href} key={g.n} className="group min-h-[270px] bg-white p-7 sm:p-10"><div className="flex justify-between border-b border-line pb-5 text-[10px] font-bold tracking-[.16em] text-muted"><span>{g.n} / {g.tag}</span><ArrowUpRight size={17} className="text-ink transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"/></div><h2 className="mt-8 max-w-lg text-2xl font-bold leading-tight group-hover:text-brand sm:text-3xl">{g.title}</h2><p className="mt-4 max-w-lg text-sm font-light leading-7 text-muted">{g.body}</p><span className="mt-7 inline-block border-b border-ink pb-2 text-[10px] font-bold tracking-[.14em]">READ THE GUIDE</span></Link>)}</div></section></>;
}
