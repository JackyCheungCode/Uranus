import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Why Finish Sampling Matters", description: "A practical guide to approving wheel finish samples before a production order." };

const review = [
 ["COLOUR REFERENCE","Record the approved physical sample or colour reference. Screen images and digital swatches are not reliable final colour approvals."],
 ["GLOSS & TEXTURE","Review gloss level, metallic grain, brushing direction and surface texture under consistent lighting."],
 ["EDGE & DETAIL QUALITY","Inspect spoke transitions, inner barrel, mounting pad and difficult-to-coat areas—not only the front face."],
 ["CARE & DURABILITY","Request the coating system details, cleaning guidance and any relevant durability or corrosion test evidence."],
 ["APPROVAL CONTROL","Sign and date the approved sample, record its reference and ensure the production order points to the same revision."],
];

export default function FinishSamplingPage(){
 return <article><section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1000px] px-5 py-16 sm:px-8 lg:py-24"><Link href="/insights" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] text-white/60 hover:text-white"><ArrowLeft size={14}/> BACK TO INSIGHTS</Link><p className="mt-10 text-[10px] font-bold tracking-[.2em] text-white/50">PRODUCT / FINISH APPROVAL</p><h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">A FINISH SHOULD<br/>BE APPROVED IN HAND.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">A digital image is useful for direction, but it cannot fully represent metallic effect, gloss, texture or the way a coating looks across a curved wheel surface.</p></div></section><section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 lg:py-20"><p className="text-sm font-light leading-7 text-muted">For a multi-unit order, finish approval should be treated as part of specification control. Agree on the sample before production and preserve a record that can be checked against the delivered goods.</p><div className="mt-9 border-t border-line">{review.map(([title,body],i)=><section key={title} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[64px_1fr_1.6fr]"><span className="text-xs font-bold tracking-[.15em] text-brand">0{i+1}</span><h2 className="text-base font-bold">{title}</h2><p className="text-sm font-light leading-7 text-muted">{body}</p></section>)}</div><Link href="/finishes" className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">EXPLORE FINISH DIRECTIONS <ArrowUpRight size={15}/></Link></section></article>;
}
