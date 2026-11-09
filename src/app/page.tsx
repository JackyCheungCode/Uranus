import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gauge, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WheelCard } from "@/components/wheel-card";
import { wheels } from "@/lib/data/wheels";

function WheelHeroVisual() {
  return (
    <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden bg-[#11151a] lg:min-h-[600px]">
      <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(115deg,transparent_0%,rgba(255,255,255,.08)_48%,transparent_49%),repeating-linear-gradient(135deg,transparent_0,transparent_34px,rgba(255,255,255,.06)_35px,transparent_36px)]" />
      <div aria-hidden="true" className="absolute -right-16 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-none border border-white/10 sm:h-[660px] sm:w-[660px]">
        <div className="absolute inset-5 border border-white/10" />
        <div className="absolute inset-12 border border-white/10" />
      </div>
      <svg viewBox="0 0 560 560" className="relative z-10 w-[min(88%,560px)] drop-shadow-none" fill="none" aria-label="Abstract forged performance wheel illustration">
        <defs>
          <radialGradient id="rim-metal" cx="38%" cy="28%" r="72%">
            <stop offset="0" stopColor="#e4e7eb" />
            <stop offset=".28" stopColor="#858d96" />
            <stop offset=".62" stopColor="#262c33" />
            <stop offset=".84" stopColor="#b5bbc1" />
            <stop offset="1" stopColor="#30363d" />
          </radialGradient>
          <radialGradient id="rim-core">
            <stop offset="0" stopColor="#171b20" />
            <stop offset=".8" stopColor="#07090b" />
            <stop offset="1" stopColor="#747b82" />
          </radialGradient>
        </defs>
        <circle cx="280" cy="280" r="245" stroke="#68717b" strokeWidth="3" />
        <circle cx="280" cy="280" r="228" stroke="url(#rim-metal)" strokeWidth="22" />
        <circle cx="280" cy="280" r="196" stroke="#11161b" strokeWidth="7" />
        {Array.from({ length: 10 }, (_, i) => <g key={i} transform={`rotate(${i * 36} 280 280)`}><path d="M270 75 L290 75 L305 250 L285 278 L265 250 Z" fill="url(#rim-metal)" stroke="#20262d" strokeWidth="2" /><path d="M280 94 L286 248" stroke="#f2f4f6" strokeOpacity=".52" strokeWidth="2" /></g>)}
        <circle cx="280" cy="280" r="77" fill="url(#rim-core)" stroke="url(#rim-metal)" strokeWidth="12" />
        <circle cx="280" cy="280" r="28" fill="#0b0e12" stroke="#9ca4ac" strokeWidth="3" />
        {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={280 + Math.cos(i * Math.PI * 2 / 5) * 48} cy={280 + Math.sin(i * Math.PI * 2 / 5) * 48} r="5" fill="#aab1b8" />)}
      </svg>
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-white/55 sm:bottom-8 sm:left-8">
        <Gauge size={15} /> FORGED PERFORMANCE / SERIES 01
      </div>
      <div className="absolute right-6 top-6 z-20 text-right text-[10px] font-bold tracking-[0.18em] text-white/45 sm:right-8 sm:top-8">
        <p>ENGINEERED FORM</p><p className="mt-1">01 — 05 / 2026</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#090c10] text-white">
        <div className="mx-auto grid min-h-[680px] max-w-[1600px] lg:grid-cols-[.82fr_1.18fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 sm:px-10 lg:px-14 xl:px-20">
            <div className="mb-8 flex h-1 w-24 overflow-hidden">
              <span className="w-1/3 bg-[#0066b1]" /><span className="w-1/3 bg-[#1c69d4]" /><span className="w-1/3 bg-[#e22718]" />
            </div>
            <p className="text-[11px] font-bold tracking-[0.24em] text-white/55">URANUS / HIGH PERFORMANCE WHEELS</p>
            <h1 className="mt-7 max-w-2xl text-5xl font-bold leading-[.92] tracking-[-0.045em] text-white sm:text-6xl xl:text-[76px]">BORN TO<br />PERFORM.<br /><span className="text-white/45">BUILT TO FIT.</span></h1>
            <p className="mt-8 max-w-md text-sm font-light leading-7 text-white/65 sm:text-base">Forged design. Precision fitment. A wheel collection engineered around the proportions and performance of your vehicle.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/wheels"><Button>EXPLORE THE COLLECTION <ArrowRight size={15} /></Button></Link>
              <Link href="/vehicle-fitment"><Button variant="inverse">FIND YOUR FITMENT <ArrowUpRight size={15} /></Button></Link>
            </div>
            <div className="mt-16 grid max-w-md grid-cols-3 border-t border-white/20 pt-5">
              {[["01", "FORGED DESIGN"], ["02", "FITMENT DATA"], ["03", "DRIVER FOCUSED"]].map(([n, label]) => <div key={n}><p className="text-[10px] font-bold tracking-[0.15em] text-white/40">{n}</p><p className="mt-2 text-[9px] font-bold tracking-[0.1em] text-white/80">{label}</p></div>)}
            </div>
          </div>
          <WheelHeroVisual />
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 lg:px-14 lg:py-28">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] text-muted">THE URANUS COLLECTION / 2026</p>
            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">DESIGNED FOR<br />THE DRIVE.</h2>
          </div>
          <Link href="/wheels" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-ink hover:text-brand">DISCOVER ALL WHEELS <MoveUpRight size={15} /></Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {wheels.map((wheel) => <WheelCard key={wheel.slug} wheel={wheel} />)}
        </div>
      </section>

      <section className="bg-[#11151a] text-white">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-14 lg:py-28">
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] text-white/45">PERFORMANCE STARTS WITH PRECISION</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">THE PERFECT STANCE IS NEVER AN ACCIDENT.</h2>
          </div>
          <div>
            <p className="max-w-xl text-sm font-light leading-7 text-white/65">Every millimetre matters. Search original equipment specifications, compare aftermarket combinations and understand the fitment details before you choose your next set of wheels.</p>
            <Link href="/vehicle-fitment" className="mt-8 inline-flex items-center gap-3 border-b border-white/50 pb-3 text-xs font-bold tracking-[0.15em] text-white hover:border-white">ENTER FITMENT CENTER <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
