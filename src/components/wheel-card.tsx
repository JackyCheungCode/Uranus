import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Wheel } from "@/lib/data/wheels";
import { Card } from "@/components/ui/card";

function WheelRender({ slug }: { slug: string }) {
  const spokeCount = slug.includes("five") ? 5 : slug.includes("mesh") ? 12 : 10;
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full max-w-[320px]" fill="none" role="img" aria-label="Forged alloy wheel product render">
      <defs>
        <radialGradient id={`metal-${slug}`} cx="35%" cy="25%" r="75%">
          <stop offset="0" stopColor="#f4f5f6" />
          <stop offset=".26" stopColor="#aeb4ba" />
          <stop offset=".58" stopColor="#343a41" />
          <stop offset=".82" stopColor="#d1d5d9" />
          <stop offset="1" stopColor="#525960" />
        </radialGradient>
        <radialGradient id={`hub-${slug}`}>
          <stop offset="0" stopColor="#3a4148" />
          <stop offset=".72" stopColor="#101419" />
          <stop offset="1" stopColor="#8e969e" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="180" r="158" fill="#171b20" stroke="#8c949b" strokeWidth="2" />
      <circle cx="180" cy="180" r="146" stroke={`url(#metal-${slug})`} strokeWidth="17" />
      <circle cx="180" cy="180" r="124" stroke="#0d1115" strokeWidth="7" />
      {Array.from({ length: spokeCount }, (_, i) => <g key={i} transform={`rotate(${i * 360 / spokeCount} 180 180)`}>
        <path d="M174 42 L186 42 L199 160 L186 181 L174 181 L161 160 Z" fill={`url(#metal-${slug})`} stroke="#242a30" strokeWidth="2" />
        <path d="M180 52 L184 155" stroke="#fff" strokeOpacity=".62" strokeWidth="2" />
        <path d="M168 155 L180 177 L192 155" stroke="#11161b" strokeWidth="2" />
      </g>)}
      <circle cx="180" cy="180" r="47" fill={`url(#hub-${slug})`} stroke={`url(#metal-${slug})`} strokeWidth="8" />
      <circle cx="180" cy="180" r="19" fill="#090c10" stroke="#aeb4ba" strokeWidth="2" />
      {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={180 + Math.cos(i * Math.PI * 2 / 5) * 33} cy={180 + Math.sin(i * Math.PI * 2 / 5) * 33} r="3.5" fill="#c4c9ce" />)}
    </svg>
  );
}

export function WheelCard({ wheel }: { wheel: Wheel }) {
  return (
    <Card className="group flex h-full flex-col border-0 bg-white">
      <Link href={`/wheels/${wheel.slug}`} className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#eceeef] p-5">
          <div aria-hidden="true" className="absolute inset-0 opacity-50 [background-image:linear-gradient(135deg,transparent_0%,rgba(255,255,255,.8)_50%,transparent_100%)]" />
          <div className="relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"><WheelRender slug={wheel.slug} /></div>
          <span className="absolute bottom-4 left-4 z-20 text-[9px] font-bold tracking-[0.18em] text-[#3c3c3c]/70">URANUS / {wheel.category}</span>
          <span className="absolute right-4 top-4 z-20 text-[9px] font-bold tracking-[0.16em] text-[#3c3c3c]/55">01 / 04</span>
        </div>
        <div className="flex flex-1 flex-col px-1 pb-4 pt-5">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted">{wheel.category} / PERFORMANCE SERIES</p>
          <h3 className="mt-3 text-lg font-bold tracking-[-0.02em]">{wheel.name}</h3>
          <p className="mt-2 text-xs font-light text-muted">{wheel.finish} · {wheel.size}</p>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-bold text-ink">{wheel.price} <span className="text-[9px] font-light tracking-[0.1em] text-muted">/ SET STARTING</span></span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-ink">DISCOVER <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
