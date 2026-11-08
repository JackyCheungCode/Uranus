import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Wheel Configurator" };

export default function ConfiguratorPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted">YOUR SETUP, YOUR SPEC</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">BUILD YOUR WHEEL SETUP.</h1>
      <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-muted">The configurator will guide you through wheel design, diameter, width, offset, finish, and vehicle compatibility. This route is reserved for the dedicated configuration experience.</p>
      <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
        {["01 / SELECT VEHICLE", "02 / CHOOSE WHEEL", "03 / CONFIRM SPEC"].map((step) => (
          <div key={step} className="bg-surface p-8"><p className="text-xs font-bold tracking-[0.12em]">{step}</p><div className="mt-10 h-1 w-12 bg-brand" /></div>
        ))}
      </div>
      <Link href="/vehicle-fitment" className="mt-8 inline-block"><Button>START WITH YOUR VEHICLE <ArrowRight size={15} /></Button></Link>
    </section>
  );
}
