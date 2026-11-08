"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CarFront, Check, ChevronDown, LoaderCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type CatalogOption = { value: string; label: string; detail?: string };

function getRows(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => !!item && typeof item === "object");
  if (!payload || typeof payload !== "object") return [];
  const root = payload as Record<string, unknown>;
  if (Array.isArray(root.data)) return getRows(root.data);
  if (Array.isArray(root.results)) return getRows(root.results);
  return [];
}

function optionFrom(item: Record<string, unknown>, kind: "model" | "year" | "generation" | "modification"): CatalogOption | null {
  const slug = item.slug ?? item.id ?? item.code;
  const rawName = item.name ?? item.title ?? item.trim ?? item.generation ?? item.year ?? slug;
  if (rawName === undefined || rawName === null) return null;
  const value = String(slug ?? rawName);
  const label = String(rawName);
  const start = item.start_year ?? item.production_start_year ?? item.year_start;
  const end = item.end_year ?? item.production_end_year ?? item.year_end;
  const detail = start ? `${start}${end && end !== start ? `–${end}` : ""}` : undefined;
  return { value, label: kind === "year" ? label : label, detail };
}

function SelectField({
  label, value, options, placeholder, disabled, loading, onChange,
}: {
  label: string; value: string; options: CatalogOption[]; placeholder: string;
  disabled?: boolean; loading?: boolean; onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] font-bold tracking-[0.16em] text-muted">{label}</span>
      <span className="relative block">
        <select
          value={value}
          disabled={disabled || loading}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none border border-line-strong bg-white px-4 pr-10 text-sm font-light text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:bg-surface disabled:text-muted"
        >
          <option value="">{loading ? "LOADING..." : placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}{option.detail ? ` · ${option.detail}` : ""}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
          {loading ? <LoaderCircle className="animate-spin" size={15} /> : <ChevronDown size={15} />}
        </span>
      </span>
    </label>
  );
}

export function VehicleFitmentSearch() {
  const router = useRouter();
  const [region, setRegion] = useState("usdm");
  const [models, setModels] = useState<CatalogOption[]>([]);
  const [years, setYears] = useState<CatalogOption[]>([]);
  const [generations, setGenerations] = useState<CatalogOption[]>([]);
  const [modifications, setModifications] = useState<CatalogOption[]>([]);
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [generation, setGeneration] = useState("");
  const [modification, setModification] = useState("");
  const [loading, setLoading] = useState({ models: true, years: false, generations: false, modifications: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function loadCatalog(resource: string, params: Record<string, string>) {
    const query = new URLSearchParams({ resource, ...params });
    const response = await fetch(`/api/vehicle-fitment/catalog?${query.toString()}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Unable to load vehicle options.");
    return getRows(payload);
  }

  useEffect(() => {
    let active = true;
    setLoading((current) => ({ ...current, models: true }));
    loadCatalog("models", { region })
      .then((rows) => { if (active) setModels(rows.map((item) => optionFrom(item, "model")).filter((item): item is CatalogOption => !!item)); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load BMW models."); })
      .finally(() => { if (active) setLoading((current) => ({ ...current, models: false })); });
    return () => { active = false; };
  }, [region]);

  useEffect(() => {
    if (!model) { setYears([]); setGenerations([]); setModifications([]); return; }
    let active = true;
    setLoading((current) => ({ ...current, years: true, generations: true }));
    setYear(""); setGeneration(""); setModification(""); setModifications([]);
    Promise.all([
      loadCatalog("years", { model, region }),
      loadCatalog("generations", { model, region }),
    ]).then(([yearRows, generationRows]) => {
      if (!active) return;
      setYears(yearRows.map((item) => optionFrom(item, "year")).filter((item): item is CatalogOption => !!item));
      setGenerations(generationRows.map((item) => optionFrom(item, "generation")).filter((item): item is CatalogOption => !!item));
    }).catch((cause) => {
      if (active) setError(cause instanceof Error ? cause.message : "Unable to load model years and generations.");
    }).finally(() => {
      if (active) setLoading((current) => ({ ...current, years: false, generations: false }));
    });
    return () => { active = false; };
  }, [model, region]);

  useEffect(() => {
    if (!model || !year) { setModifications([]); setModification(""); return; }
    let active = true;
    setLoading((current) => ({ ...current, modifications: true }));
    setModification("");
    loadCatalog("modifications", { model, year, ...(generation ? { generation } : {}), region })
      .then((rows) => {
        if (active) setModifications(rows.map((item) => optionFrom(item, "modification")).filter((item): item is CatalogOption => !!item));
      })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load trims."); })
      .finally(() => { if (active) setLoading((current) => ({ ...current, modifications: false })); });
    return () => { active = false; };
  }, [model, year, generation, region]);

  function resetVehicle() {
    setModel(""); setYear(""); setGeneration(""); setModification("");
    setYears([]); setGenerations([]); setModifications([]); setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!model || !year) {
      setError("Select a BMW model and year to continue.");
      return;
    }
    setSubmitting(true);
    const query = new URLSearchParams({ model, year, region });
    if (generation) query.set("generation", generation);
    if (modification) query.set("modification", modification);
    router.push(`/vehicle-fitment/results?${query.toString()}`);
  }

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-12 md:px-10 md:pb-28 md:pt-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.72fr)] lg:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-muted">BMW WHEEL FITMENT / VEHICLE SEARCH</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">FIND THE RIGHT WHEELS FOR YOUR BMW.</h1>
          <p className="mt-6 max-w-2xl text-sm font-light leading-7 text-body">
            Start with your exact vehicle. Compare factory wheel specifications, approved and aftermarket fitments, and plus or minus sizing options in one place.
          </p>
        </div>
        <div className="border-l-2 border-brand pl-5">
          <p className="text-[10px] font-bold tracking-[0.16em] text-muted">FITMENT STARTS WITH THE DETAILS</p>
          <p className="mt-2 text-sm font-light leading-6 text-body">The same BMW model can use different wheels across model years, chassis generations, engines and regional specifications.</p>
        </div>
      </div>

      <div className="mt-12 grid gap-px bg-line lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <Card className="border-0">
          <CardHeader className="border-b border-line bg-surface px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-ink text-white"><CarFront size={17} /></span>
              <div>
                <p className="text-[10px] font-bold tracking-[0.16em] text-muted">01 / VEHICLE DETAILS</p>
                <h2 className="mt-1 text-lg">SELECT YOUR BMW</h2>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-7 md:px-8 md:py-8">
            <form onSubmit={submit}>
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-muted">MAKE</span>
                  <span className="flex h-12 items-center justify-between border border-line bg-surface px-4 text-sm font-bold text-ink">
                    BMW <Check size={15} className="text-brand" />
                  </span>
                </label>
                <SelectField label="MODEL" value={model} options={models} placeholder="SELECT MODEL" loading={loading.models} onChange={(value) => { setModel(value); setError(""); }} />
                <SelectField label="MODEL YEAR" value={year} options={years} placeholder="SELECT YEAR" disabled={!model} loading={loading.years} onChange={(value) => { setYear(value); setError(""); }} />
                <SelectField label="GENERATION / CHASSIS" value={generation} options={generations} placeholder="SELECT GENERATION" disabled={!model} loading={loading.generations} onChange={(value) => { setGeneration(value); setError(""); }} />
                <div className="sm:col-span-2">
                  <SelectField label="MODIFICATION / TRIM" value={modification} options={modifications} placeholder="SELECT ENGINE / TRIM (OPTIONAL)" disabled={!model || !year} loading={loading.modifications} onChange={(value) => { setModification(value); setError(""); }} />
                </div>
                <label className="grid gap-2">
                  <span className="text-[10px] font-bold tracking-[0.16em] text-muted">MARKET / REGION</span>
                  <span className="relative block">
                    <select value={region} onChange={(event) => { setRegion(event.target.value); resetVehicle(); }} className="h-12 w-full appearance-none border border-line-strong bg-white px-4 pr-10 text-sm font-light text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand">
                      <option value="usdm">UNITED STATES (USDM)</option>
                      <option value="cdm">CANADA (CDM)</option>
                      <option value="eudm">EUROPE (EUDM)</option>
                      <option value="jdm">JAPAN (JDM)</option>
                      <option value="audm">AUSTRALIA (AUDM)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" size={15} />
                  </span>
                </label>
              </div>
              {error && <p role="alert" className="mt-5 border-l-2 border-ink bg-surface px-4 py-3 text-xs font-light text-ink">{error}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                <Button type="submit" disabled={!model || !year || submitting}>
                  {submitting ? <LoaderCircle className="animate-spin" size={15} /> : <Search size={15} />}
                  FIND WHEEL SPECIFICATIONS <ArrowRight size={15} />
                </Button>
                <button type="button" onClick={resetVehicle} className="text-[10px] font-bold tracking-[0.12em] text-muted underline underline-offset-4 hover:text-ink">RESET VEHICLE</button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex flex-col bg-ink p-6 text-white md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-white/30 text-white"><Sparkles size={17} /></span>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-white/50">02 / ALTERNATIVE SEARCH</p>
              <h2 className="mt-1 text-lg text-white">AI VEHICLE MATCH</h2>
            </div>
          </div>
          <p className="mt-6 text-sm font-light leading-7 text-white/70">Describe your BMW in your own words. AI-assisted vehicle identification will use the same verified BMW fitment database.</p>
          <div className="mt-6 border border-white/20 bg-white/5 p-4">
            <p className="text-xs font-light leading-6 text-white/60">Example: “2022 BMW M3 Competition xDrive, G80, US specification.”</p>
          </div>
          <div className="mt-auto pt-8">
            <p className="text-[10px] font-bold tracking-[0.14em] text-white/50">AI IDENTIFICATION IS THE NEXT INTEGRATION STEP</p>
            <p className="mt-2 text-xs font-light leading-6 text-white/60">No vehicle or fitment data is guessed. Manual lookup is available now; AI matching will be connected to the same confirmation flow.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
        {[
          ["OEM FACTORY SPECS", "Original wheel and tire dimensions from the selected vehicle."],
          ["AFTERMARKET FITMENT", "Additional wheel and tire combinations for your chassis and trim."],
          ["PLUS / MINUS SIZING", "Diameter-up and winter-down sizing candidates based on the OE setup."],
        ].map(([title, description], index) => (
          <div key={title} className="flex gap-4">
            <span className="text-xs font-bold text-brand">0{index + 1}</span>
            <div><h3 className="text-xs">{title}</h3><p className="mt-2 text-xs font-light leading-6 text-muted">{description}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
