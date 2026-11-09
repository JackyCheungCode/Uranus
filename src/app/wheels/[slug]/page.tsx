import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { wheels } from "@/lib/data/wheels";
import { WheelOrderPanel } from "@/components/wheel-order-panel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return wheels.map((wheel) => ({ slug: wheel.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wheel = wheels.find((item) => item.slug === slug);
  return { title: wheel?.name ?? "Wheel Detail" };
}

function ProductWheel({ slug }: { slug: string }) {
  const count = slug.includes("five") ? 5 : slug.includes("mesh") ? 12 : 10;
  return <svg viewBox="0 0 560 560" className="w-[min(92%,560px)]" fill="none" role="img" aria-label="Forged alloy wheel product render">
    <defs><radialGradient id="detail-metal" cx="35%" cy="25%" r="75%"><stop stopColor="#f3f5f6"/><stop offset=".28" stopColor="#aeb5bc"/><stop offset=".58" stopColor="#343a41"/><stop offset=".84" stopColor="#d1d5d9"/><stop offset="1" stopColor="#525960"/></radialGradient><radialGradient id="detail-hub"><stop stopColor="#414950"/><stop offset=".75" stopColor="#101419"/><stop offset="1" stopColor="#929aa2"/></radialGradient></defs>
    <circle cx="280" cy="280" r="248" fill="#171b20" stroke="#89929a" strokeWidth="3"/><circle cx="280" cy="280" r="230" stroke="url(#detail-metal)" strokeWidth="24"/><circle cx="280" cy="280" r="198" stroke="#0c1014" strokeWidth="8"/>
    {Array.from({length:count},(_,i)=><g key={i} transform={`rotate(${i*360/count} 280 280)`}><path d="M270 74 L290 74 L307 249 L289 280 L271 249Z" fill="url(#detail-metal)" stroke="#242a30" strokeWidth="2"/><path d="M280 91 L289 244" stroke="#fff" strokeOpacity=".55" strokeWidth="2"/></g>)}
    <circle cx="280" cy="280" r="78" fill="url(#detail-hub)" stroke="url(#detail-metal)" strokeWidth="13"/><circle cx="280" cy="280" r="29" fill="#090c10" stroke="#c0c6cc" strokeWidth="3"/>
    {Array.from({length:5},(_,i)=><circle key={i} cx={280+Math.cos(i*Math.PI*2/5)*51} cy={280+Math.sin(i*Math.PI*2/5)*51} r="5" fill="#c5cbd0"/>)}
  </svg>;
}

export default async function WheelDetailPage({ params }: Props) {
  const { slug } = await params;
  const wheel = wheels.find((item) => item.slug === slug);
  if (!wheel) notFound();

  return <>
    <section className="bg-[#1a2129] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-8 sm:px-10 lg:px-14">
        <Link href="/wheels" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-white/55 hover:text-white"><ArrowLeft size={14}/> BACK TO COLLECTION</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#262e38] sm:min-h-[560px]">
            <div aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_36px,rgba(255,255,255,.1)_37px,transparent_38px)]"/>
            <div className="absolute right-5 top-5 text-[9px] font-bold tracking-[0.18em] text-white/45">PRODUCT STUDY / 01</div>
            <ProductWheel slug={wheel.slug}/>
            <div className="absolute bottom-5 left-5 text-[9px] font-bold tracking-[0.18em] text-white/45">URANUS PERFORMANCE / {wheel.category}</div>
          </div>
          <div className="py-8 lg:pl-8">
            <div className="mb-7 h-1 w-16 bg-brand" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/45">{wheel.category} / PERFORMANCE COLLECTION</p>
            <h1 className="mt-5 text-4xl font-bold leading-[.95] tracking-normal text-white sm:text-6xl">{wheel.name}</h1>
            <p className="mt-7 max-w-lg text-sm font-light leading-7 text-white/65">{wheel.description} Developed around a purposeful spoke profile, precision proportions and a clean performance finish.</p>
            <div className="mt-10 border-y border-white/20 py-6"><p className="text-[9px] font-bold tracking-[.16em] text-white/45">STARTING PRICE / SET</p><p className="mt-2 text-3xl font-bold text-white">{wheel.price}</p></div>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="#order-builder"><Button>START YOUR ORDER <ArrowRight size={15}/></Button></Link><Link href="/vehicle-fitment"><Button variant="inverse">CHECK FITMENT</Button></Link></div>
            <p className="mt-5 text-[10px] font-light leading-5 text-white/40">Product render and pricing are catalogue demonstration content. Confirm production specifications and availability before purchase.</p>
          </div>
        </div>
      </div>
    </section>
    <WheelOrderPanel wheel={wheel} />
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-7 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold tracking-[.2em] text-muted">ENGINEERED DETAILS</p><h2 className="mt-3 text-3xl sm:text-4xl">SPECIFICATION OVERVIEW.</h2></div><p className="max-w-md text-xs font-light leading-6 text-muted">A considered balance of design, construction and fitment parameters. Final specifications depend on the selected vehicle and application.</p></div>
      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[["CONSTRUCTION",wheel.category],["FINISH",wheel.finish],["BOLT PATTERN",wheel.fitment],["AVAILABLE SIZES",wheel.size]].map(([label,value])=><div key={label} className="bg-[#f3f4f5] p-6"><p className="text-[9px] font-bold tracking-[.16em] text-muted">{label}</p><p className="mt-4 text-base font-bold text-ink">{value}</p></div>)}
      </div>
      <Link href="/configurator" className="mt-12 inline-flex items-center gap-3 border-b border-ink pb-3 text-[10px] font-bold tracking-[.16em]">BUILD YOUR CONFIGURATION <MoveUpRight size={15}/></Link>
    </section>
  </>;
}
