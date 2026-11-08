import Link from "next/link";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WheelCard } from "@/components/wheel-card";
import { wheels } from "@/lib/data/wheels";

export default function HomePage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto grid min-h-[620px] max-w-[1440px] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/60">ENGINEERED FOR YOUR DRIVE</p>
            <h1 className="mt-6 text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl">FORM FOLLOWS<br />PERFORMANCE.</h1>
            <p className="mt-7 max-w-lg text-base font-light leading-8 text-white/70">
              Discover precision-crafted aftermarket wheels, considered proportions, and fitment engineered around your vehicle.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/wheels"><Button>EXPLORE WHEELS <ArrowRight size={15} /></Button></Link>
              <Link href="/vehicle-fitment"><Button variant="inverse">FIND YOUR FITMENT</Button></Link>
            </div>
          </div>
          <div className="relative flex aspect-[5/4] items-center justify-center border border-white/20 bg-[#303030]">
            <div className="flex h-[min(64vw,340px)] w-[min(64vw,340px)] items-center justify-center border-[24px] border-[#888888] outline outline-1 outline-white/50">
              <div className="flex h-1/2 w-1/2 items-center justify-center border-[18px] border-[#555555]">
                <span className="text-xs font-bold tracking-[0.2em] text-white">U / 01</span>
              </div>
            </div>
            <span className="absolute bottom-5 left-5 text-[9px] font-bold tracking-[0.18em] text-white/60">PRODUCT STUDY / 001</span>
            <span className="absolute right-5 top-5 text-[9px] font-bold tracking-[0.18em] text-white/60">DESIGN IN MOTION</span>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-muted">THE COLLECTION</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">WHEELS WITH PURPOSE.</h2>
          </div>
          <Link href="/wheels" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-ink hover:text-brand">VIEW ALL WHEELS <MoveUpRight size={15} /></Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wheels.map((wheel) => <WheelCard key={wheel.slug} wheel={wheel} />)}
        </div>
      </section>
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-muted">FITMENT FIRST</p>
            <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl">THE RIGHT WHEEL STARTS WITH THE RIGHT FIT.</h2>
          </div>
          <div>
            <p className="max-w-xl text-sm font-light leading-7 text-body">Start with your vehicle. We will help narrow down wheel diameter, width, offset, bolt pattern, and the details that make a fitment work.</p>
            <Link href="/vehicle-fitment" className="mt-7 inline-block"><Button>FIND YOUR VEHICLE <ArrowRight size={15} /></Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
