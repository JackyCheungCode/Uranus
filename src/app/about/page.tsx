import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Ruler, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About URANUS",
  description: "Learn about the URANUS approach to wheel design, specification clarity and vehicle-first fitment.",
};

const principles = [
  { number: "01", title: "DESIGN WITH PURPOSE", description: "A wheel is more than a visual upgrade. Proportion, spoke geometry, construction and finish all contribute to the character of a vehicle." , icon: SlidersHorizontal },
  { number: "02", title: "SPECIFY THE DETAILS", description: "Diameter, width, offset, bolt pattern and centre bore belong in the same conversation. We make those details visible before an enquiry is prepared.", icon: Ruler },
  { number: "03", title: "VERIFY BEFORE YOU BUY", description: "Fitment depends on the exact vehicle, brakes, suspension and intended use. Reference data is a starting point, not a substitute for a final technical check.", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface-dark text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/55">URANUS / OUR APPROACH</p>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">ENGINEERED FORM.<br />INFORMED FITMENT.</h1>
          </div>
          <p className="max-w-xl text-sm font-light leading-7 text-white/70">URANUS is an independent aftermarket wheel concept focused on considered design, clear specifications and vehicle-first fitment guidance. Our aim is to make the details easier to understand before you choose a setup.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted">THE URANUS STANDARD</p>
            <h2 className="mt-4 max-w-lg text-3xl leading-tight sm:text-4xl">A BETTER DECISION STARTS WITH BETTER INFORMATION.</h2>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-3">
            {principles.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-muted">{number}</span>
                  <Icon size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-base font-bold">{title}</h3>
                <p className="mt-4 text-sm font-light leading-7 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted">START WITH YOUR VEHICLE</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">FIND THE RIGHT SPECIFICATION.</h2>
            <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-muted">Explore the collection, compare wheel dimensions and check vehicle fitment data. Final compatibility should always be verified for your exact vehicle configuration.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/vehicle-fitment"><Button>CHECK FITMENT <ArrowRight size={15} /></Button></Link>
            <Link href="/wheels"><Button variant="secondary">VIEW COLLECTION <ArrowUpRight size={15} /></Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
