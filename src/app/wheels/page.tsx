import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WheelCard } from "@/components/wheel-card";
import { wheels } from "@/lib/data/wheels";

export const metadata: Metadata = { title: "Wheel Collection" };

export default function WheelsPage() {
  return <>
    <section className="bg-[#1a2129] px-5 py-16 text-white sm:px-10 lg:px-14 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="text-[10px] font-bold tracking-[.22em] text-white/45">URANUS PERFORMANCE / WHEEL COLLECTION</p><h1 className="mt-5 text-5xl font-bold leading-[.94] tracking-normal text-white sm:text-6xl lg:text-7xl">FORM FOLLOWS<br/>PERFORMANCE.</h1><p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/60">Forged, flow-formed and cast designs. Explore the collection and discover the specification behind every silhouette.</p></div>
        <div className="border-l border-white/25 pl-5 text-[10px] font-bold tracking-[.16em] text-white/55"><p>{wheels.length.toString().padStart(2,"0")} DESIGNS</p><p className="mt-3">THREE CONSTRUCTIONS</p><p className="mt-3">ONE PERFORMANCE MINDSET</p></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
      <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold tracking-[.2em] text-muted">THE COLLECTION / 2026</p><h2 className="mt-3 text-3xl sm:text-4xl">FIND YOUR SIGNATURE.</h2></div><Link href="/configurator" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] hover:text-brand">OPEN CONFIGURATION STUDIO <ArrowUpRight size={15}/></Link></div>
      <div className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">{wheels.map((wheel,index)=><div key={wheel.slug}><div className="mb-3 flex justify-between text-[9px] font-bold tracking-[.15em] text-muted"><span>0{index+1} / {wheel.category}</span><span>2026 SERIES</span></div><WheelCard wheel={wheel}/></div>)}</div>
    </section>
  </>;
}
