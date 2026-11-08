import type { Metadata } from "next";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Vehicle Fitment" };

export default function VehicleFitmentPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted">FITMENT GUIDE</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">FIND WHEELS FOR YOUR VEHICLE.</h1>
      <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-muted">Choose your vehicle to begin. Fitment data and compatibility validation will be connected to the catalog in a later phase.</p>
      <Card className="mt-12 max-w-3xl">
        <CardHeader><h2 className="text-lg">SELECT YOUR VEHICLE</h2><p className="text-xs font-light text-muted">Start with the basic vehicle details.</p></CardHeader>
        <CardContent>
          <form className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-bold tracking-wide">MAKE<Input placeholder="e.g. BMW" /></label>
            <label className="grid gap-2 text-xs font-bold tracking-wide">MODEL<Input placeholder="e.g. 3 Series" /></label>
            <label className="grid gap-2 text-xs font-bold tracking-wide">YEAR<Input placeholder="e.g. 2024" inputMode="numeric" /></label>
            <label className="grid gap-2 text-xs font-bold tracking-wide">TRIM / GENERATION<Input placeholder="e.g. G20 330i" /></label>
            <div className="sm:col-span-2"><Button type="button"><Search size={15} /> FIND COMPATIBLE WHEELS</Button></div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
