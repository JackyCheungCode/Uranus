import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CarFront, CircleCheck, Ruler, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Vehicle Fitment Checklist", description: "A step-by-step checklist for verifying aftermarket wheel fitment on an exact vehicle." };

const checks = [
 {n:"01",title:"IDENTIFY THE EXACT VEHICLE",detail:"Model year, generation, chassis code, trim, drivetrain, brake package and any factory performance options."},
 {n:"02",title:"MATCH THE MOUNTING INTERFACE",detail:"Bolt count and PCD, centre bore, seat type, thread and approved fastener engagement."},
 {n:"03",title:"COMPARE WHEEL DIMENSIONS",detail:"Diameter, width, offset and inner/outer position. Review front and rear axle specifications separately where staggered."},
 {n:"04",title:"VERIFY TYRE SPECIFICATION",detail:"Tyre size, approved rim-width range, load index, speed rating, rolling circumference and actual section width."},
 {n:"05",title:"CHECK PHYSICAL CLEARANCE",detail:"Brake caliper template, suspension, steering at full lock, inner barrel, fender and bodywork through suspension travel."},
 {n:"06",title:"CONFIRM ROAD & LOAD REQUIREMENTS",detail:"Wheel load capacity, tyre load and speed ratings, local regulations, installation torque and post-installation inspection."},
];

export default function FitmentChecklistPage(){
 return <>
  <section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">TECHNICAL / VEHICLE APPLICATION</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">SIX CHECKS.<br/>NO GUESSWORK.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">Use this checklist before selecting or ordering a wheel setup. A database result is a reference only; it cannot confirm physical clearance on a modified vehicle.</p></div></section>
  <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="mb-9 flex items-center gap-4"><CarFront size={25} strokeWidth={1.4}/><div><p className="text-[10px] font-bold tracking-[.18em] text-muted">APPLICATION REVIEW</p><h2 className="mt-1 text-2xl sm:text-3xl">BEFORE YOU PLACE AN ORDER.</h2></div></div><div className="border-t border-line">{checks.map(({n,title,detail})=><article key={n} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[64px_1fr_1.4fr] sm:items-start sm:gap-6"><span className="text-xs font-bold tracking-[.15em] text-brand">{n}</span><h3 className="text-base font-bold">{title}</h3><p className="text-sm font-light leading-7 text-muted">{detail}</p></article>)}</div><div className="mt-9 grid gap-5 bg-surface p-6 sm:grid-cols-[auto_1fr] sm:p-8"><ShieldAlert size={24} strokeWidth={1.4}/><div><h3 className="text-base font-bold">FITMENT IS NOT A GENERIC GUARANTEE.</h3><p className="mt-3 text-sm font-light leading-7 text-muted">Changes to suspension, brakes, ride height, alignment, tyre model or bodywork can change suitability. Upstep and size-comparison results are geometric references, not safety certification or clearance confirmation. Have the final assembly physically checked by a qualified professional.</p></div></div><div className="mt-9 flex flex-wrap gap-3"><Link href="/vehicle-fitment"><Button>OPEN FITMENT SEARCH <ArrowRight size={15}/></Button></Link><Link href="/advice/wheel-fitment-basics" className="inline-flex min-h-11 items-center gap-2 border-b border-ink text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">LEARN THE DIMENSIONS <Ruler size={15}/></Link></div></section>
 </>;
}
