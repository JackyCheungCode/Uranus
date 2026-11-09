import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WheelCollection } from "@/components/wheel-collection";

export const metadata: Metadata = {
  title: "Wheel Collection",
  description: "Explore the URANUS performance wheel collection by construction, finish and dimensions.",
};

export default function WheelsPage() {
  return (
    <>
      <section className="bg-surface-dark px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/55">URANUS PERFORMANCE / WHEEL COLLECTION</p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">FORM FOLLOWS<br />PERFORMANCE.</h1>
            <p className="mt-7 max-w-xl text-sm font-light leading-7 text-white/70">Explore forged, flow-formed and cast wheel designs. Compare the details, then build a specification around your vehicle.</p>
          </div>
          <div className="border-l border-white/25 pl-5 text-[10px] font-bold tracking-[0.16em] text-white/60">
            <p>DESIGN COLLECTION</p><p className="mt-3">THREE CONSTRUCTIONS</p><p className="mt-3">VEHICLE-FIRST FITMENT</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-bold tracking-[0.2em] text-muted">THE COLLECTION</p><h2 className="mt-3 text-3xl sm:text-4xl">FIND YOUR SIGNATURE.</h2></div>
          <Link href="/configurator" className="inline-flex min-h-11 items-center gap-2 text-[10px] font-bold tracking-[0.14em] hover:text-brand">OPEN CONFIGURATION STUDIO <ArrowUpRight size={15} /></Link>
        </div>
        <WheelCollection />
      </section>
    </>
  );
}
