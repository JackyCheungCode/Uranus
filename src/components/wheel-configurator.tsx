"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wheels } from "@/lib/data/wheels";

const vehicles = ["M2 COUPÉ", "M3 SEDAN", "M4 COUPÉ", "M5 SEDAN", "M8 COUPÉ", "X3 M", "X5 M"];
const finishes = ["SATIN GRAPHITE", "BRUSHED SILVER", "GLOSS BLACK", "FROZEN BRONZE"];
const diameters = ["19 INCH", "20 INCH", "21 INCH"];
const widths = ["9.0J / 10.0J", "9.5J / 10.5J", "10.0J / 11.0J"];

export function WheelConfigurator() {
  const [vehicle, setVehicle] = useState("M3 SEDAN");
  const [wheel, setWheel] = useState(wheels[0].slug);
  const [finish, setFinish] = useState(finishes[0]);
  const [diameter, setDiameter] = useState(diameters[1]);
  const [width, setWidth] = useState(widths[1]);
  const [step, setStep] = useState(0);
  const selectedWheel = useMemo(() => wheels.find((item) => item.slug === wheel) ?? wheels[0], [wheel]);
  const choices = [
    { title: "SELECT YOUR VEHICLE", detail: "Choose your chassis to start the build." },
    { title: "CHOOSE YOUR WHEEL", detail: "Find the design that defines your stance." },
    { title: "SET YOUR SPECIFICATION", detail: "Configure the visual specification." },
  ];

  return (
    <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="bg-[#101419] p-6 text-white sm:p-10 lg:p-14">
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/50">URANUS / CONFIGURATION STUDIO</p>
          <p className="text-[10px] font-bold tracking-[0.16em] text-white/50">BUILD 01 — 03</p>
        </div>
        <div className="mt-8 flex gap-2">
          {choices.map((item, index) => <button key={item.title} onClick={() => setStep(index)} aria-current={step === index ? "step" : undefined} className={`h-1 flex-1 transition-colors ${index <= step ? "bg-[#1c69d4]" : "bg-white/20"}`} />)}
        </div>
        <div className="mt-10">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/45">STEP 0{step + 1}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">{choices[step].title}</h2>
          <p className="mt-3 text-sm font-light text-white/60">{choices[step].detail}</p>
        </div>
        {step === 0 && <div className="mt-10 grid grid-cols-2 gap-px bg-white/15 sm:grid-cols-3">{vehicles.map((item) => <button key={item} onClick={() => setVehicle(item)} className={`min-h-24 px-4 py-5 text-left transition-colors ${vehicle === item ? "bg-white text-ink" : "bg-[#171d24] text-white hover:bg-[#252d36]"}`}><span className="block text-[9px] font-bold tracking-[0.16em] opacity-55">BMW M / 2026</span><span className="mt-3 block text-sm font-bold">{item}</span>{vehicle === item && <Check className="mt-2" size={15} />}</button>)}</div>}
        {step === 1 && <div className="mt-10 grid gap-3 sm:grid-cols-2">{wheels.map((item) => <button key={item.slug} onClick={() => setWheel(item.slug)} className={`border p-5 text-left transition-colors ${wheel === item.slug ? "border-white bg-white text-ink" : "border-white/15 bg-[#171d24] text-white hover:bg-[#252d36]"}`}><span className="text-[9px] font-bold tracking-[0.16em] opacity-55">{item.category}</span><span className="mt-3 block text-lg font-bold">{item.name}</span><span className="mt-2 block text-xs font-light opacity-65">{item.finish} / {item.size}</span>{wheel === item.slug && <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.12em]">SELECTED <Check size={13} /></span>}</button>)}</div>}
        {step === 2 && <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <fieldset><legend className="mb-4 text-[10px] font-bold tracking-[0.16em] text-white/55">FINISH</legend><div className="grid grid-cols-2 gap-2">{finishes.map((item) => <button key={item} onClick={() => setFinish(item)} className={`min-h-14 border px-3 text-[10px] font-bold tracking-[0.08em] ${finish === item ? "border-white bg-white text-ink" : "border-white/20 text-white"}`}>{item}</button>)}</div></fieldset>
          <fieldset><legend className="mb-4 text-[10px] font-bold tracking-[0.16em] text-white/55">DIAMETER</legend><div className="grid grid-cols-3 gap-2">{diameters.map((item) => <button key={item} onClick={() => setDiameter(item)} className={`min-h-14 border px-2 text-[10px] font-bold ${diameter === item ? "border-white bg-white text-ink" : "border-white/20 text-white"}`}>{item}</button>)}</div></fieldset>
          <fieldset className="sm:col-span-2"><legend className="mb-4 text-[10px] font-bold tracking-[0.16em] text-white/55">WIDTH PACKAGE</legend><div className="grid gap-2 sm:grid-cols-3">{widths.map((item) => <button key={item} onClick={() => setWidth(item)} className={`min-h-14 border px-3 text-[10px] font-bold ${width === item ? "border-white bg-white text-ink" : "border-white/20 text-white"}`}>{item}</button>)}</div></fieldset>
        </div>}
        <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-6">
          <button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-white/65 disabled:opacity-25"><ChevronLeft size={15} /> BACK</button>
          {step < 2 ? <Button onClick={() => setStep((value) => Math.min(2, value + 1))}>CONTINUE <ChevronRight size={15} /></Button> : <Link href="/vehicle-fitment"><Button>VERIFY FITMENT <ArrowRight size={15} /></Button></Link>}
        </div>
      </div>
      <aside className="bg-[#e9ebed] p-6 sm:p-10 xl:p-8">
        <p className="text-[10px] font-bold tracking-[0.2em] text-muted">YOUR BUILD / LIVE SUMMARY</p>
        <div className="mt-8 flex aspect-square items-center justify-center bg-[#d9dcdf]">
          <svg viewBox="0 0 360 360" className="w-[88%]" fill="none" aria-label="Configured wheel preview">
            <defs><radialGradient id="config-metal" cx="35%" cy="25%" r="75%"><stop stopColor="#f5f6f7"/><stop offset=".3" stopColor="#aeb4ba"/><stop offset=".68" stopColor="#343a41"/><stop offset="1" stopColor="#858d95"/></radialGradient></defs>
            <circle cx="180" cy="180" r="156" fill="#171b20" stroke="#9299a0" strokeWidth="2"/><circle cx="180" cy="180" r="143" stroke="url(#config-metal)" strokeWidth="18"/>
            {Array.from({length:10},(_,i)=><path key={i} d="M174 38 L186 38 L198 158 L186 180 L174 180 L162 158Z" fill="url(#config-metal)" stroke="#252b31" strokeWidth="2" transform={`rotate(${i*36} 180 180)`}/>)}
            <circle cx="180" cy="180" r="48" fill="#101419" stroke="url(#config-metal)" strokeWidth="8"/><circle cx="180" cy="180" r="18" fill="#080b0f" stroke="#c4c9ce" strokeWidth="2"/>
          </svg>
        </div>
        <div className="mt-8 border-b border-[#c9cdd1] pb-5"><p className="text-[9px] font-bold tracking-[0.16em] text-muted">VEHICLE</p><p className="mt-2 text-xl font-bold text-ink">BMW {vehicle}</p></div>
        <div className="grid grid-cols-2 gap-y-5 border-b border-[#c9cdd1] py-5">
          {[["WHEEL",selectedWheel.name],["FINISH",finish],["DIAMETER",diameter],["WIDTH",width]].map(([label,value])=><div key={label}><p className="text-[9px] font-bold tracking-[0.14em] text-muted">{label}</p><p className="mt-1 text-xs font-bold text-ink">{value}</p></div>)}
        </div>
        <p className="mt-5 text-[10px] font-light leading-5 text-muted">Preview only. Final fitment, offsets, brake clearance and load ratings must be verified against the selected vehicle specification.</p>
        <Link href="/vehicle-fitment" className="mt-6 flex items-center justify-between border-b border-ink pb-3 text-[10px] font-bold tracking-[0.14em] text-ink">OPEN FITMENT CHECK <ArrowRight size={14}/></Link>
      </aside>
    </div>
  );
}
