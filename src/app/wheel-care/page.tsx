import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Droplets, Eye, ShieldCheck, Sun } from "lucide-react";

export const metadata: Metadata = { title: "Wheel Finish Care Guide", description: "Practical care considerations for painted, machined and coated aftermarket wheel finishes." };

const care = [
 {n:"01",title:"ROUTINE CLEANING",icon:Droplets,body:"Allow wheels to cool before cleaning. Use clean water and a pH-neutral wheel-safe shampoo with a soft wash mitt or brush. Rinse thoroughly to remove grit before contact washing."},
 {n:"02",title:"BRAKE DUST & CONTAMINATION",icon:ShieldCheck,body:"Do not allow heavy deposits to remain for extended periods. Use only a cleaner approved for the specific coating and follow its dilution and dwell-time instructions."},
 {n:"03",title:"INSPECTION",icon:Eye,body:"Check the finish regularly for stone chips, corrosion, lifting clear coat or impact damage. Address damage early and ask the finish supplier about compatible repair methods."},
 {n:"04",title:"STORAGE & ENVIRONMENT",icon:Sun,body:"Avoid prolonged exposure to harsh chemicals, road salts and unsuitable cleaning tools. If wheels are stored, clean and dry them fully and protect them from impact and moisture."},
];

export default function WheelCarePage(){
 return <>
  <section className="bg-[#1a2129] text-white"><div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-[10px] font-bold tracking-[.22em] text-white/55">KNOWLEDGE / FINISH & MAINTENANCE</p><h1 className="mt-6 max-w-4xl text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl">KEEP THE FINISH.<br/>RESPECT THE DETAIL.</h1><p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70">Good maintenance starts with the coating manufacturer's care instructions. These general practices help avoid common cleaning mistakes.</p></div></section>
  <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="grid gap-0 md:grid-cols-2">{care.map(({n,title,icon:Icon,body})=><article key={n} className="grid grid-cols-[52px_1fr] gap-4 border-b border-line py-8 md:px-6 md:even:border-l md:even:border-line"><div><span className="text-[10px] font-bold tracking-[.14em] text-brand">{n}</span><Icon size={21} strokeWidth={1.4} className="mt-5"/></div><div><h2 className="text-xl font-bold">{title}</h2><p className="mt-4 text-sm font-light leading-7 text-muted">{body}</p></div></article>)}</div><div className="mt-10 bg-surface p-6 sm:p-8"><p className="text-[10px] font-bold tracking-[.18em] text-muted">IMPORTANT</p><p className="mt-3 max-w-3xl text-sm font-light leading-7 text-body">Different finishes and coatings have different chemical resistance and repair requirements. Always follow the product-specific care sheet. Do not assume that a cleaner suitable for one finish is suitable for another.</p><Link href="/finishes" className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-2 text-[10px] font-bold tracking-[.14em] hover:border-brand hover:text-brand">EXPLORE FINISH OPTIONS <ArrowUpRight size={15}/></Link></div></section>
 </>;
}
