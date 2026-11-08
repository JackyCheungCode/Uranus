"use client";

import { useMemo, useState } from "react";
import { Disc3, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  pcd: string;
  centerBore: string;
  diameter: string;
  width: string;
  offset: string;
};

type DemoWheel = {
  id: string; brand: string; model: string; style: string; finish: string;
  diameter: number; width: number; offset: number; pcd: string; centerBore: number;
  price: number; load: number; imageTone: string;
};

const DEMO_WHEELS: DemoWheel[] = [
  { id: "d1", brand: "NORTHLINE", model: "FORGED F01", style: "MULTI-SPOKE", finish: "SATIN BLACK", diameter: 19, width: 8.5, offset: 35, pcd: "5x112", centerBore: 66.6, price: 890, load: 750, imageTone: "DARK" },
  { id: "d2", brand: "NORTHLINE", model: "FLOW F08", style: "Y-SPOKE", finish: "MACHINED GREY", diameter: 18, width: 8, offset: 35, pcd: "5x112", centerBore: 66.6, price: 620, load: 720, imageTone: "GREY" },
  { id: "d3", brand: "AXIOM", model: "RACE R10", style: "MESH", finish: "GLOSS BLACK", diameter: 19, width: 9, offset: 40, pcd: "5x112", centerBore: 66.6, price: 760, load: 800, imageTone: "DARK" },
  { id: "d4", brand: "AXIOM", model: "CLASSIC C5", style: "5-SPOKE", finish: "SILVER", diameter: 18, width: 8, offset: 30, pcd: "5x120", centerBore: 72.6, price: 540, load: 700, imageTone: "LIGHT" },
  { id: "d5", brand: "VANTA", model: "TRACK T06", style: "SPLIT-SPOKE", finish: "GRAPHITE", diameter: 20, width: 9, offset: 38, pcd: "5x112", centerBore: 66.6, price: 980, load: 850, imageTone: "GREY" },
  { id: "d6", brand: "VANTA", model: "MONO M3", style: "MONOBLOCK", finish: "BRUSHED SILVER", diameter: 19, width: 8.5, offset: 32, pcd: "5x112", centerBore: 66.6, price: 710, load: 760, imageTone: "LIGHT" },
  { id: "d7", brand: "NORTHLINE", model: "FORGED F02", style: "MULTI-SPOKE", finish: "BRONZE", diameter: 18, width: 8.5, offset: 42, pcd: "5x120", centerBore: 72.6, price: 680, load: 780, imageTone: "DARK" },
];

const numeric = (value: string) => {
  const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
};

export function DemoWheelRecommendations({ pcd, centerBore, diameter, width, offset }: Props) {
  const [brand, setBrand] = useState("ALL");
  const [style, setStyle] = useState("ALL");
  const [diameterFilter, setDiameterFilter] = useState("ALL");
  const [widthFilter, setWidthFilter] = useState("ALL");
  const [offsetRange, setOffsetRange] = useState("ALL");
  const [priceMax, setPriceMax] = useState("1500");
  const [keyword, setKeyword] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const targetDiameter = numeric(diameter);
  const targetWidth = numeric(width);
  const targetOffset = numeric(offset);
  const targetBore = numeric(centerBore);
  const normalizedPcd = pcd.toLowerCase().replace(/\s/g, "");
  const products = useMemo(() => DEMO_WHEELS.map((item) => {
    const pcdMatch = !normalizedPcd || item.pcd === normalizedPcd;
    const boreMatch = targetBore === null || item.centerBore >= targetBore;
    const diameterMatch = targetDiameter === null || item.diameter === targetDiameter;
    const widthMatch = targetWidth === null || Math.abs(item.width - targetWidth) <= 0.5;
    const offsetMatch = targetOffset === null || Math.abs(item.offset - targetOffset) <= 8;
    const score = [pcdMatch, boreMatch, diameterMatch, widthMatch, offsetMatch].filter(Boolean).length;
    return { ...item, score, eligible: pcdMatch && boreMatch };
  }), [normalizedPcd, targetBore, targetDiameter, targetWidth, targetOffset]);

  const filtered = products.filter((item) =>
    item.eligible &&
    (brand === "ALL" || item.brand === brand) &&
    (style === "ALL" || item.style === style) &&
    (diameterFilter === "ALL" || item.diameter === Number(diameterFilter)) &&
    (widthFilter === "ALL" || item.width === Number(widthFilter)) &&
    (offsetRange === "ALL" || (offsetRange === "NEAR" ? targetOffset === null || Math.abs(item.offset - targetOffset) <= 5 : Math.abs(item.offset - (targetOffset ?? 35)) <= 10)) &&
    item.price <= (numeric(priceMax) ?? 1500) &&
    `${item.brand} ${item.model} ${item.finish} ${item.style}`.toLowerCase().includes(keyword.toLowerCase())
  ).sort((a, b) => b.score - a.score || a.price - b.price);

  const brands = ["ALL", ...Array.from(new Set(DEMO_WHEELS.map((item) => item.brand)))];
  const styles = ["ALL", ...Array.from(new Set(DEMO_WHEELS.map((item) => item.style)))];
  const diameters = ["ALL", ...Array.from(new Set(DEMO_WHEELS.map((item) => String(item.diameter))))].sort();
  const widths = ["ALL", ...Array.from(new Set(DEMO_WHEELS.map((item) => String(item.width))))].sort();

  return (
    <section className="mt-8 border-t border-line pt-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="text-[12px] font-bold tracking-[0.16em] text-muted">04 / DEMO PRODUCT MATCH</p><h3 className="mt-1 text-xl">RECOMMENDED WHEEL PRODUCTS</h3></div>
        <span className="border border-ink px-2 py-1 text-[10px] font-bold tracking-[0.12em] text-ink">DEMO DATA · NOT LIVE INVENTORY</span>
      </div>
      <div className="mt-4 grid gap-2 bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["PCD", pcd || "NOT PROVIDED"], ["CENTER BORE", centerBore ? centerBore + " MM" : "NOT PROVIDED"],
          ["TARGET DIAMETER", diameter ? diameter + " IN" : "ANY"], ["TARGET WIDTH", width ? width + " J" : "ANY"],
          ["TARGET OFFSET", offset ? "ET" + offset : "ANY"],
        ].map(([label, value]) => <div key={label} className="bg-white px-3 py-2"><p className="text-[9px] font-bold tracking-[0.12em] text-muted">{label}</p><p className="mt-1 text-xs font-bold text-ink">{value}</p></div>)}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-light text-muted">{filtered.length} DEMO PRODUCTS MATCH THE ACTIVE FILTERS · SORTED BY PARAMETER MATCH</p>
        <Button type="button" variant="secondary" onClick={() => setShowFilters((value) => !value)}><SlidersHorizontal size={14} /> {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}</Button>
      </div>
      {showFilters && <div className="mt-3 grid gap-3 border-y border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">KEYWORD</span><Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Brand, model, finish" className="mt-2 bg-white" /></label>
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">BRAND</span><select value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-2 h-10 w-full border border-line bg-white px-3 text-xs">{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">STYLE</span><select value={style} onChange={(e) => setStyle(e.target.value)} className="mt-2 h-10 w-full border border-line bg-white px-3 text-xs">{styles.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">MAX PRICE (DEMO USD)</span><Input inputMode="numeric" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="mt-2 bg-white" /></label>
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">DIAMETER</span><select value={diameterFilter} onChange={(e) => setDiameterFilter(e.target.value)} className="mt-2 h-10 w-full border border-line bg-white px-3 text-xs">{diameters.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">WIDTH</span><select value={widthFilter} onChange={(e) => setWidthFilter(e.target.value)} className="mt-2 h-10 w-full border border-line bg-white px-3 text-xs">{widths.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="block sm:col-span-2"><span className="text-[10px] font-bold tracking-[0.12em] text-muted">OFFSET</span><div className="mt-2 flex flex-wrap gap-2">{[["ALL", "ALL"], ["NEAR", "±5 MM"], ["WIDE", "±10 MM"]].map(([value, label]) => <button key={value} type="button" aria-pressed={offsetRange === value} onClick={() => setOffsetRange(value)} className={`border px-3 py-2 text-[11px] font-bold ${offsetRange === value ? "border-ink bg-ink text-white" : "border-line bg-white text-muted"}`}>{label}</button>)}</div></label>
        <div className="flex items-end"><Button type="button" variant="secondary" onClick={() => { setBrand("ALL"); setStyle("ALL"); setDiameterFilter("ALL"); setWidthFilter("ALL"); setOffsetRange("ALL"); setPriceMax("1500"); setKeyword(""); }}>RESET FILTERS</Button></div>
      </div>}
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => <article key={item.id} className="border border-line bg-white">
          <div className="flex min-h-36 items-center justify-center bg-surface"><Disc3 size={76} strokeWidth={1} className="text-muted" /><span className="sr-only">{item.imageTone} demo wheel illustration</span></div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold tracking-[0.14em] text-muted">{item.brand}</p><h4 className="mt-1 text-base font-bold text-ink">{item.model}</h4></div><span className="text-[10px] font-bold text-muted">{item.score}/5 MATCH</span></div>
            <p className="mt-2 text-[11px] font-light text-muted">{item.style} · {item.finish}</p>
            <div className="mt-3 grid grid-cols-2 gap-px bg-line text-xs"><div className="bg-surface p-2"><p className="text-[9px] font-bold text-muted">SIZE</p><p className="mt-1 font-bold text-ink">{item.diameter} × {item.width}J</p></div><div className="bg-surface p-2"><p className="text-[9px] font-bold text-muted">OFFSET</p><p className="mt-1 font-bold text-ink">ET{item.offset}</p></div><div className="bg-surface p-2"><p className="text-[9px] font-bold text-muted">PCD / CB</p><p className="mt-1 font-bold text-ink">{item.pcd} / {item.centerBore}</p></div><div className="bg-surface p-2"><p className="text-[9px] font-bold text-muted">LOAD</p><p className="mt-1 font-bold text-ink">{item.load} KG</p></div></div>
            <div className="mt-3 flex items-center justify-between"><span className="text-xs font-bold text-ink">FROM ${item.price.toLocaleString()}} / WHEEL</span><span className="text-[9px] font-bold tracking-[0.1em] text-muted">SAMPLE PRICE</span></div>
          </div>
        </article>)}
        {!filtered.length && <div className="border-y border-line bg-surface px-5 py-8 text-sm font-light text-muted md:col-span-2 xl:col-span-3">No demo products match all selected conditions. Loosen one or more filters to broaden the sample list.</div>}
      </div>
      <p className="mt-4 text-[11px] font-light leading-5 text-muted">Demo catalog and sample prices are fictional for interaction preview only. Parameter matching is a preliminary geometric filter, not a fitment certification. Verify brake clearance, load rating, hub rings, fasteners and vehicle-specific approvals before sale or installation.</p>
    </section>
  );
}
