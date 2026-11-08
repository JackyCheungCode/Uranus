import type { Metadata } from "next";
import { WheelCard } from "@/components/wheel-card";
import { wheels } from "@/lib/data/wheels";

export const metadata: Metadata = { title: "Wheel Collection" };

export default function WheelsPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted">DESIGNED TO FIT. BUILT TO LAST.</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">THE WHEEL COLLECTION.</h1>
      <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-muted">Explore forged, flow-formed, and cast wheel designs. Product specifications and live inventory will be connected in the next implementation phase.</p>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <span className="text-xs font-bold tracking-[0.1em]">{wheels.length} DESIGNS</span>
        <span className="text-xs font-light text-muted">FILTERS & SORTING — COMING IN CATALOG PHASE</span>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {wheels.map((wheel) => <WheelCard key={wheel.slug} wheel={wheel} />)}
      </div>
    </section>
  );
}
