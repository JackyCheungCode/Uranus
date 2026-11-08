"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Activity, ArrowRight, CarFront, Check, CircleHelp, Disc3, LoaderCircle, Search, SlidersHorizontal } from "lucide-react";
import { VehicleFitmentSearch } from "@/components/vehicle-fitment-search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Entry = "vehicle" | "rim" | "tire";
type Region = { code: string; label: string };
const REGIONS: Region[] = [
  { code: "usdm", label: "USA+" }, { code: "cdm", label: "CANADA" },
  { code: "mxndm", label: "MEXICO" }, { code: "ladm", label: "CENTRAL & SOUTH AMERICA" },
  { code: "eudm", label: "EUROPE" }, { code: "rus", label: "RUSSIA+" },
  { code: "jdm", label: "JAPAN" }, { code: "chdm", label: "CHINA" },
  { code: "skdm", label: "SOUTH KOREA" }, { code: "sam", label: "SOUTHEAST ASIA" },
  { code: "medm", label: "MIDDLE EAST" }, { code: "nadm", label: "NORTH AFRICA" },
  { code: "sadm", label: "SOUTH AFRICA" }, { code: "audm", label: "OCEANIA" },
];

type SearchResult = { data?: unknown[]; results?: unknown[]; meta?: Record<string, unknown>; [key: string]: unknown };
type AnyRecord = Record<string, unknown>;
const asRecord = (value: unknown): AnyRecord => value && typeof value === "object" && !Array.isArray(value) ? value as AnyRecord : {};
const text = (value: unknown, fallback = "—") => value === null || value === undefined || value === "" ? fallback : String(value);
const listFrom = (value: unknown): AnyRecord[] => {
  const root = asRecord(value);
  const rows = root.data ?? root.results ?? value;
  return Array.isArray(rows) ? rows.map(asRecord) : [];
};
const labelOf = (value: unknown) => {
  const item = asRecord(value);
  return text(item.name ?? item.title ?? item.trim ?? item.slug, typeof value === "string" ? value : "—");
};

function RegionPicker({ selected, onChange }: { selected: string[]; onChange: (value: string[]) => void }) {
  function toggle(code: string) {
    onChange(selected.includes(code) ? selected.filter((item) => item !== code) : [...selected, code]);
  }
  return (
    <fieldset className="mt-5 border-t border-line pt-4">
      <legend className="text-[11px] font-bold tracking-[0.16em] text-muted">MARKET / REGION — SELECT ONE OR MORE</legend>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {REGIONS.map((region) => (
          <label key={region.code} className="flex min-h-11 cursor-pointer items-center gap-2 border border-line bg-white px-3 py-2 text-[11px] font-bold tracking-[0.04em] text-body hover:border-ink">
            <input type="checkbox" checked={selected.includes(region.code)} onChange={() => toggle(region.code)} className="h-4 w-4 accent-[#1c69d4]" />
            {region.label}
          </label>
        ))}
      </div>
      <p className="mt-2 text-[11px] font-light text-muted">Results are restricted to the selected sales markets. No cross-region fallback is applied.</p>
    </fieldset>
  );
}

function ReverseResults({ result, mode }: { result: SearchResult; mode: "rim" | "tire" }) {
  const rows = listFrom(result);
  const meta = asRecord(result.meta);
  const [expanded, setExpanded] = useState<string[]>([]);
  const total = Number(meta.count ?? rows.length);
  const toggle = (key: string) => setExpanded((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  return (
    <section className="mt-10 border-t-2 border-ink pt-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-muted">SEARCH RESULTS / {mode === "rim" ? "BY RIM SPECIFICATION" : "BY TIRE SIZE"}</p>
          <h2 className="mt-2 text-2xl">BMW VEHICLE COMPATIBILITY</h2>
        </div>
        <p className="text-xs font-light text-muted">{total.toLocaleString()} MATCHING RECORDS · {rows.length} SHOWN</p>
      </div>
      {rows.length === 0 ? (
        <div className="mt-5 border-y border-line bg-surface px-5 py-8 text-sm font-light text-muted">No BMW matches were returned for these parameters. Adjust the specification or selected markets and search again.</div>
      ) : (
        <div className="mt-5 divide-y divide-line border-y border-line">
          {rows.map((row, index) => {
            const make = labelOf(row.make ?? row.brand ?? "BMW");
            const model = labelOf(row.model ?? row.name);
            const generationRows = Array.isArray(row.generations) ? row.generations.map(asRecord) : [];
            const key = String(row.slug ?? row.id ?? `${model}-${index}`);
            const isOpen = expanded.includes(key);
            const yearRange = row.year_ranges ?? row.years ?? row.production_years;
            return (
              <article key={key} className="bg-white">
                <button type="button" onClick={() => toggle(key)} aria-expanded={isOpen} className="flex min-h-[76px] w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-surface sm:px-5">
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-surface-strong text-ink"><CarFront size={19} /></span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold tracking-[0.14em] text-muted">{make}</span>
                      <span className="mt-1 block truncate text-base font-bold text-ink">{model}</span>
                      <span className="mt-1 block text-xs font-light text-muted">{text(yearRange, generationRows.length ? `${generationRows.length} GENERATIONS` : "BMW FITMENT MATCH")}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-[11px] font-bold tracking-[0.1em] text-muted">
                    {generationRows.length ? `${generationRows.length} GENERATIONS` : "DETAILS"}
                    <span className="text-lg">{isOpen ? "−" : "+"}</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-line bg-surface px-4 py-4 sm:px-5">
                    {generationRows.length ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        {generationRows.map((generation, generationIndex) => (
                          <div key={String(generation.slug ?? generation.id ?? generationIndex)} className="border-l-2 border-line-strong bg-white px-4 py-3">
                            <p className="text-sm font-bold text-ink">{labelOf(generation)}</p>
                            <p className="mt-1 text-xs font-light text-muted">{text(generation.start_year ?? generation.year_start)} — {text(generation.end_year ?? generation.year_end)}</p>
                            {Array.isArray(generation.modifications) && <p className="mt-2 text-xs font-light text-body">{generation.modifications.length} MODIFICATIONS</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-3 text-xs font-light text-body sm:grid-cols-3">
                        <p>GENERATION: {labelOf(row.generation)}</p>
                        <p>PRODUCTION: {text(row.start_year)} — {text(row.end_year)}</p>
                        <p>TRIM: {text(row.trim ?? row.modification)}</p>
                      </div>
                    )}
                    <p className="mt-4 text-[11px] font-light leading-5 text-muted">Compatibility is based on Wheel-Size database matching. Confirm the exact chassis, brake package, load rating and physical clearances before purchase.</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
      <p className="mt-3 text-[11px] font-light text-muted">Showing the first page returned by Wheel-Size. Pagination controls will be shown when additional result pages are available.</p>
    </section>
  );
}

function ReverseSearch({ mode }: { mode: "rim" | "tire" }) {
  const [regions, setRegions] = useState<string[]>(["usdm"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [page, setPage] = useState(0);
  const [values, setValues] = useState({
    boltPattern: "", diameter: "18", width: "8", offset: "", centerBore: "",
    sectionWidth: "225", aspectRatio: "45", tireDiameter: "18",
    fitment: "both", offsetTolerance: "1", centerBoreTolerance: "0.2",
  });
  const set = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const isRim = mode === "rim";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!regions.length) { setError("Select at least one market region."); return; }
    setLoading(true); setError(""); setResult(null);
    const params = new URLSearchParams({ search_type: mode, offset: "0", limit: "50" });
    for (const region of regions) params.append("region", region);
    if (isRim) {
      if (!values.diameter || !values.width) { setError("Rim diameter and width are required."); setLoading(false); return; }
      if (values.boltPattern) params.set("bolt_pattern", values.boltPattern);
      params.set("rim_diameter", values.diameter);
      params.set("rim_width", values.width);
      if (values.offset) {
        const offset = Number(values.offset);
        const tolerance = Number(values.offsetTolerance || 1);
        params.set("offset_min", String(offset - tolerance));
        params.set("offset_max", String(offset + tolerance));
      }
      if (values.centerBore) {
        const bore = Number(values.centerBore);
        const tolerance = Number(values.centerBoreTolerance || 0.2);
        params.set("cb_min", String(bore - tolerance));
        params.set("cb_max", String(bore + tolerance));
      }
      params.set("mode", values.fitment);
    } else {
      params.set("section_width", values.sectionWidth);
      params.set("aspect_ratio", values.aspectRatio);
      params.set("rim_diameter", values.tireDiameter);
    }
    try {
      const response = await fetch(`/api/vehicle-fitment/reverse?${params.toString()}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Search failed.");
      setResult(payload as SearchResult);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to search compatible BMW vehicles.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="mt-7">
        <div className="grid gap-5 md:grid-cols-2">
          {isRim ? (
            <>
              <Field label="BOLT PATTERN / PCD" value={values.boltPattern} placeholder="E.G. 5X112" onChange={(v) => set("boltPattern", v)} hint="Optional. Use the exact bolt pattern where known." />
              <Field label="RIM DIAMETER (IN)" value={values.diameter} placeholder="18" onChange={(v) => set("diameter", v)} required />
              <Field label="RIM WIDTH (IN)" value={values.width} placeholder="8.0" onChange={(v) => set("width", v)} required />
              <Field label="OFFSET / ET (MM)" value={values.offset} placeholder="E.G. 35" onChange={(v) => set("offset", v)} hint="Optional. A tolerance range is applied." />
              <Field label="CENTER BORE (MM)" value={values.centerBore} placeholder="E.G. 66.6" onChange={(v) => set("centerBore", v)} hint="Optional. A tolerance range is applied." />
              <div>
                <label className="text-[11px] font-bold tracking-[0.14em] text-muted">AXLE POSITION</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {[["both", "BOTH"], ["front", "FRONT"], ["rear", "REAR"]].map(([v, label]) => <button key={v} type="button" aria-pressed={values.fitment === v} onClick={() => set("fitment", v)} className={`min-h-12 border px-3 text-xs font-bold ${values.fitment === v ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-muted"}`}>{label}</button>)}
                </div>
              </div>
            </>
          ) : (
            <>
              <Field label="TIRE SECTION WIDTH (MM)" value={values.sectionWidth} placeholder="225" onChange={(v) => set("sectionWidth", v)} required />
              <Field label="ASPECT RATIO" value={values.aspectRatio} placeholder="45" onChange={(v) => set("aspectRatio", v)} required />
              <Field label="RIM DIAMETER (IN)" value={values.tireDiameter} placeholder="18" onChange={(v) => set("tireDiameter", v)} required />
              <div className="flex items-start gap-3 border-l-2 border-line-strong bg-surface px-4 py-3">
                <CircleHelp size={17} className="mt-0.5 shrink-0 text-muted" />
                <p className="text-xs font-light leading-5 text-muted">Enter a metric tire size such as 225/45R18. This search finds BMW generations with matching original or supported tire fitments.</p>
              </div>
            </>
          )}
        </div>
        <RegionPicker selected={regions} onChange={setRegions} />
        {error && <p role="alert" className="mt-5 border-l-2 border-ink bg-surface px-4 py-3 text-xs font-light text-ink">{error}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={loading || !regions.length}>
            {loading ? <LoaderCircle size={15} className="animate-spin" /> : <Search size={15} />}
            {loading ? "SEARCHING BMW FITMENTS..." : isRim ? "FIND BMW VEHICLES" : "FIND BMW VEHICLES"}
            <ArrowRight size={15} />
          </Button>
          <button type="button" onClick={() => { setResult(null); setError(""); setPage(0); }} className="text-[11px] font-bold tracking-[0.1em] text-muted underline underline-offset-4">CLEAR RESULTS</button>
        </div>
      </form>
      {result && <ReverseResults result={result} mode={mode} />}
    </>
  );
}

function Field({ label, value, placeholder, onChange, hint, required }: { label: string; value: string; placeholder: string; onChange: (value: string) => void; hint?: string; required?: boolean }) {
  return <label className="block"><span className="text-[11px] font-bold tracking-[0.14em] text-muted">{label}{required ? " *" : ""}</span><Input inputMode="decimal" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} required={required} className="mt-2" />{hint && <span className="mt-1 block text-[11px] font-light text-muted">{hint}</span>}</label>;
}

export function VehicleFitmentHub() {
  const [entry, setEntry] = useState<Entry>("vehicle");
  const heading = useMemo(() => entry === "vehicle" ? "SEARCH BY VEHICLE" : entry === "rim" ? "SEARCH BY RIM SPECIFICATION" : "SEARCH BY TIRE SIZE", [entry]);
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-10">
      <section className="bg-surface px-6 py-9 md:px-10 md:py-12">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-muted">BMW WHEEL FITMENT DATABASE / 14 GLOBAL MARKETS</p>
            <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">FIND YOUR BMW WHEEL FITMENT.</h1>
            <p className="mt-5 max-w-2xl text-sm font-light leading-7 text-body">Search original equipment and aftermarket specifications by vehicle, or discover compatible BMW vehicles from a wheel or tire size.</p>
          </div>
          <div className="flex items-center gap-3 border-l border-line-strong pl-5 text-xs font-light text-muted"><Activity size={18} /> WHEEL-SIZE DATA / HUMAN-INITIATED SEARCH</div>
        </div>
      </section>
      <section className="mt-8">
        <div className="grid grid-cols-1 border-b border-ink sm:grid-cols-3" role="tablist" aria-label="Fitment search type">
          {([
            ["vehicle", "BY VEHICLE", CarFront, "BMW model / year / trim"],
            ["rim", "BY RIM", Disc3, "Diameter / width / PCD / ET"],
            ["tire", "BY TIRE", SlidersHorizontal, "Section / ratio / diameter"],
          ] as const).map(([value, label, Icon, description]) => (
            <button key={value} type="button" role="tab" aria-selected={entry === value} onClick={() => setEntry(value)} className={`flex min-h-[76px] items-center gap-4 border-b-2 px-4 py-4 text-left transition-colors sm:px-6 ${entry === value ? "border-brand bg-surface text-ink" : "border-transparent bg-white text-muted hover:bg-surface"}`}>
              <Icon size={21} />
              <span><span className="block text-sm font-bold tracking-[0.12em]">{label}</span><span className="mt-1 block text-[11px] font-light">{description}</span></span>
              {entry === value && <Check className="ml-auto text-brand" size={17} />}
            </button>
          ))}
        </div>
        <section className="border-b border-line px-0 py-7 md:px-2">
          <p className="text-[11px] font-bold tracking-[0.16em] text-muted">01 / {heading}</p>
          {entry === "vehicle" ? <VehicleFitmentSearch /> : <ReverseSearch key={entry} mode={entry} />}
        </section>
      </section>
      <section className="mt-12 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
        {[
          ["01", "OE FACTORY DATA", "Original wheel, tire and technical specifications for the selected BMW."],
          ["02", "AFTERMARKET COMPATIBILITY", "Find BMW applications matching your wheel and tire dimensions."],
          ["03", "ALTERNATIVE DIAMETERS", "Plus and minus sizing candidates remain available from OE tire baselines."],
        ].map(([number, title, description]) => <div key={number} className="flex gap-4"><span className="text-xs font-bold text-muted">{number}</span><div><h2 className="text-xs">{title}</h2><p className="mt-2 text-xs font-light leading-6 text-muted">{description}</p></div></div>)}
      </section>
    </main>
  );
}
