import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, DraftingCompass, Palette, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Private Label & Custom Programs", description: "Discuss custom wheel design, private label, finishes and export packaging requirements." };

const stages = [
 {n:"01",title:"BRAND & MARKET BRIEF",icon:DraftingCompass,body:"Share your brand positioning, target customer, destination markets, vehicle applications and expected product range."},
 {n:"02",title:"DESIGN & SPECIFICATION",icon:Boxes,body:"Review design references, dimensions, mounting details, material, construction expectations and technical constraints."},
 {n:"03",title:"FINISH & SAMPLE REVIEW",icon:Palette,body:"Agree on colour references, surface texture, gloss level, branding placement and physical sample approval criteria."},
 {n:"04",title:"PACKAGING & COMMERCIAL PLAN",icon:Package,body:"Define packaging artwork, labels, carton requirements, minimum quantities, inspection scope and commercial milestones."},
];

export default function PrivateLabelPage(){
 return <>
  <section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">B2B / CUSTOM PROGRAMS</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">YOUR BRAND.<br/>YOUR SPECIFICATION.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">For distributors and automotive businesses exploring private label, custom finishes, packaging or product development opportunities.</p></div></section>
  <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-[10px] font-bold tracking-[.2em] text-muted">PROGRAM DEVELOPMENT</p><h2 className="mt-4 text-3xl leading-tight sm:text-4xl">FROM CONCEPT<br/>TO APPROVED BRIEF.</h2><p className="mt-6 text-sm font-light leading-7 text-muted">Custom work needs clear inputs and written acceptance at each stage. Feasibility, tooling, sample costs, minimum order quantities and lead times are confirmed individually.</p><Link href="/request-quote" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">DISCUSS A CUSTOM PROGRAM <ArrowUpRight size={15}/></Link></div><div className="grid gap-px bg-line sm:grid-cols-2">{stages.map(({n,title,icon:Icon,body})=><article key={n} className="min-h-[250px] bg-surface p-7"><div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[.16em] text-muted">{n} / STAGE</span><Icon size={22} strokeWidth={1.4}/></div><h3 className="mt-9 text-lg font-bold">{title}</h3><p className="mt-4 text-sm font-light leading-7 text-muted">{body}</p></article>)}</div></div></section>
  <section className="bg-surface"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:px-10"><div><p className="text-[10px] font-bold tracking-[.18em] text-muted">READY TO DISCUSS?</p><h2 className="mt-3 text-2xl">START WITH YOUR TARGET MARKET AND VOLUME.</h2></div><Link href="/request-quote"><Button>SUBMIT A PROGRAM BRIEF <ArrowRight size={15}/></Button></Link></div></section>
 </>;
}
