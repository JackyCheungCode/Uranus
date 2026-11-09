"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WheelCard } from "@/components/wheel-card";
import { wheels } from "@/lib/data/wheels";

const categories = ["ALL", "FORGED", "FLOW FORMED", "CAST"];

export function WheelCollection() {
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => wheels.filter((wheel) => {
    const matchesCategory = category === "ALL" || wheel.category === category;
    const haystack = [wheel.name, wheel.category, wheel.finish, wheel.size].join(" ").toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <div>
      <div className="grid gap-5 border-b border-line pb-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-muted"><SlidersHorizontal size={14} /> FILTER BY CONSTRUCTION</div>
          <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter wheels by construction">
            {categories.map((item) => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 border px-4 text-[10px] font-bold tracking-[0.12em] transition-colors ${category === item ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink hover:border-ink"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-2 block text-[10px] font-bold tracking-[0.16em] text-muted">SEARCH THE COLLECTION</span>
          <span className="relative block">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, finish or size" className="pl-11" />
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between gap-4 py-5">
        <p className="text-xs font-light text-muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? "DESIGN" : "DESIGNS"} FOUND</p>
        {(category !== "ALL" || query) && <button type="button" onClick={() => { setCategory("ALL"); setQuery(""); }} className="min-h-11 text-[10px] font-bold tracking-[0.12em] text-ink underline underline-offset-4 hover:text-brand">CLEAR FILTERS</button>}
      </div>

      {filtered.length ? (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((wheel, index) => (
            <div key={wheel.slug}>
              <div className="mb-3 flex justify-between text-[9px] font-bold tracking-[0.15em] text-muted"><span>{String(index + 1).padStart(2, "0")} / {wheel.category}</span><span>URANUS SERIES</span></div>
              <WheelCard wheel={wheel} />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-y border-line bg-surface px-6 py-14 text-center">
          <h3 className="text-xl">NO MATCHING WHEELS.</h3>
          <p className="mt-3 text-sm font-light text-muted">Try another name, finish or construction type.</p>
          <button type="button" onClick={() => { setCategory("ALL"); setQuery(""); }} className="mt-5 min-h-11 text-[10px] font-bold tracking-[0.12em] text-brand">RESET SEARCH</button>
        </div>
      )}
    </div>
  );
}
