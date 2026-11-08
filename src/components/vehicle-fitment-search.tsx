"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Command } from "cmdk";
import { VehicleFitmentResults } from "@/components/vehicle-fitment-results";
import { ArrowRight, CarFront, Check, ChevronDown, LoaderCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";


type CatalogOption = { value: string; label: string; detail?: string };
type VehicleCandidate = {
  model: string | null;
  modelLabel: string | null;
  year: string | null;
  generation: string | null;
  modification: string | null;
  region: string | null;
  confidence: "high" | "medium" | "low";
  clarification: string | null;
  notes: string | null;
};

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
  return { value, label, detail };
}

function SelectField({
  label, value, options, placeholder, disabled, loading, onChange,
}: {
  label: string; value: string; options: CatalogOption[]; placeholder: string;
  disabled?: boolean; loading?: boolean; onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    function closeOnOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

  return (
    <div className="grid gap-2">
      <span className="text-[12px] font-bold tracking-[0.16em] text-muted">{label}</span>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={label}
          disabled={disabled || loading}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
            if (event.key === "Escape") setOpen(false);
          }}
          className="flex h-12 w-full items-center justify-between border border-line-strong bg-white px-4 text-left text-sm font-light text-ink outline-none transition-colors hover:border-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink disabled:bg-surface disabled:text-muted"
        >
          <span className={selected ? "text-ink" : "text-muted"}>
            {loading ? "LOADING OPTIONS..." : selected ? `${selected.label}${selected.detail ? ` · ${selected.detail}` : ""}` : placeholder}
          </span>
          {loading ? <LoaderCircle className="animate-spin text-muted" size={15} /> : <ChevronDown className="text-muted" size={15} />}
        </button>
        {open && !disabled && !loading && (
          <div className="absolute z-40 mt-px w-full border border-line-strong bg-white">
            <Command loop className="w-full" label={`${label} options`}>
              <div className="border-b border-line px-3">
                <Command.Input
                  autoFocus
                  placeholder={`SEARCH ${label}...`}
                  className="h-11 w-full bg-transparent text-sm font-light text-ink outline-none placeholder:text-muted"
                />
              </div>
              <Command.List className="max-h-64 overflow-y-auto p-1">
                <Command.Empty className="px-3 py-4 text-xs font-light text-muted">NO MATCHING OPTIONS</Command.Empty>
                {options.map((option) => (
                  <Command.Item
                    key={option.value}
                    value={`${option.label} ${option.detail ?? ""} ${option.value}`}
                    onSelect={() => { onChange(option.value); setOpen(false); }}
                    className={`flex min-h-11 cursor-pointer items-center justify-between px-3 py-2 text-sm font-light aria-selected:bg-surface ${option.value === value ? "font-bold text-ink" : "text-body"}`}
                  >
                    <span>{option.label}{option.detail ? ` · ${option.detail}` : ""}</span>
                    {option.value === value && <Check size={14} />}
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}
export function VehicleFitmentSearch() {
  const [activeVehicle, setActiveVehicle] = useState<{ model: string; year: string; generation?: string; modification?: string; region: string; requestId: number } | null>(null);
  const [searchSequence, setSearchSequence] = useState(0);
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
  const [aiDescription, setAiDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiCandidate, setAiCandidate] = useState<VehicleCandidate | null>(null);

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
    setYears([]); setGenerations([]); setModifications([]); setError(""); setAiCandidate(null); setAiError("");
    setActiveVehicle(null); setSubmitting(false);
  }

  function startFitmentSearch(vehicle: Omit<NonNullable<typeof activeVehicle>, "requestId">) {
    const requestId = searchSequence + 1;
    setSearchSequence(requestId);
    setSubmitting(true);
    setActiveVehicle({ ...vehicle, requestId });
  }

  const handleSearchStateChange = useCallback((isLoading: boolean) => {
    setSubmitting(isLoading);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!model || !year) {
      setError("Select a BMW model and year to continue.");
      return;
    }
    setError("");
    startFitmentSearch({ model, year, generation: generation || undefined, modification: modification || undefined, region });
  }

  async function identifyVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAiLoading(true);
    setAiError("");
    setAiCandidate(null);
    try {
      const response = await fetch("/api/vehicle-fitment/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: aiDescription, region, models: models.map(({ value, label }) => ({ value, label })) }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Vehicle identification failed.");
      setAiCandidate(payload.candidate as VehicleCandidate);
    } catch (cause) {
      setAiError(cause instanceof Error ? cause.message : "Vehicle identification failed.");
    } finally {
      setAiLoading(false);
    }
  }

  function confirmAiCandidate() {
    if (!aiCandidate?.model || !aiCandidate.year) return;
    setModel(aiCandidate.model);
    setYear(aiCandidate.year);
    setGeneration(aiCandidate.generation || "");
    setModification(aiCandidate.modification || "");
    setRegion(aiCandidate.region || region);
    startFitmentSearch({ model: aiCandidate.model, year: aiCandidate.year, generation: aiCandidate.generation || undefined, modification: aiCandidate.modification || undefined, region: aiCandidate.region || region });
  }

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-10">
      <div className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_18%_0%,#ffffff_0%,#f7f7f7_52%,#ebebeb_100%)] px-6 py-10 md:px-12 md:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-20 h-[420px] w-[420px] opacity-25">
          <svg viewBox="0 0 420 420" className="h-full w-full" fill="none">
            <circle cx="210" cy="210" r="178" stroke="#6b6b6b" strokeWidth="1"/>
            <circle cx="210" cy="210" r="154" stroke="#9a9a9a" strokeWidth="1"/>
            <circle cx="210" cy="210" r="112" stroke="#6b6b6b" strokeWidth="2"/>
            <circle cx="210" cy="210" r="44" stroke="#6b6b6b" strokeWidth="2"/>
            {Array.from({ length: 10 }, (_, index) => <line key={index} x1="210" y1="58" x2="210" y2="166" stroke="#6b6b6b" strokeWidth="2" transform={`rotate(${index * 36} 210 210)`} />)}
          </svg>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_15%_0%,#ffffff_0%,transparent_70%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)] lg:items-end">
          <div>
            <p className="text-[12px] font-bold tracking-[0.2em] text-muted">BMW WHEEL FITMENT / ENGINEERED FOR YOUR BMW</p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-[1.02] text-ink sm:text-5xl lg:text-6xl">FIND THE RIGHT WHEELS FOR YOUR BMW.</h1>
            <p className="mt-6 max-w-2xl text-sm font-light leading-7 text-body">
              Precision fitment data for your exact BMW model, generation and regional specification. Compare factory dimensions, aftermarket options and sizing alternatives.
            </p>
          </div>
          <div className="border-l border-line-strong pl-5">
            <p className="text-[12px] font-bold tracking-[0.16em] text-muted">FITMENT STARTS WITH THE DETAILS</p>
            <p className="mt-2 text-sm font-light leading-6 text-body">The same BMW model can use different wheels across model years, chassis generations, engines and regional specifications.</p>
          </div>
        </div>
        <div className="relative mt-8 flex items-center gap-3 border-t border-line-strong pt-4">
          <span className="h-1 w-16 bg-brand" />
          <span className="text-[11px] font-bold tracking-[0.18em] text-muted">BMW FITMENT ENGINEERING / GLOBAL MARKET DATA</span>
        </div>
      </div>
          <p className="text-[12px] font-bold tracking-[0.16em] text-muted">FITMENT STARTS WITH THE DETAILS</p>
          <p className="mt-2 text-sm font-light leading-6 text-body">The same BMW model can use different wheels across model years, chassis generations, engines and regional specifications.</p>
        </div>
      </div>

      <div className="mt-12 grid border-y border-line lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <section className="min-w-0 bg-white">
          <div className="border-b border-line bg-surface px-6 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center bg-ink text-white"><CarFront size={17} /></span>
              <div>
                <p className="text-[12px] font-bold tracking-[0.16em] text-muted">01 / VEHICLE DETAILS</p>
                <h2 className="mt-1 text-lg">SELECT YOUR BMW</h2>
              </div>
            </div>
          </div>
          <div className="px-6 py-7 md:px-8 md:py-8">
            <form onSubmit={submit}>
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-[12px] font-bold tracking-[0.16em] text-muted">MAKE</span>
                  <span className="flex h-12 items-center justify-between border border-line bg-surface px-4 text-sm font-bold text-ink">
                    BMW <Check size={15} className="text-ink" />
                  </span>
                </label>
                <SelectField label="MODEL" value={model} options={models} placeholder="SELECT MODEL" loading={loading.models} onChange={(value) => { setModel(value); setError(""); setActiveVehicle(null); }} />
                <SelectField label="MODEL YEAR" value={year} options={years} placeholder="SELECT YEAR" disabled={!model} loading={loading.years} onChange={(value) => { setYear(value); setError(""); setActiveVehicle(null); }} />
                <SelectField label="GENERATION / CHASSIS" value={generation} options={generations} placeholder="SELECT GENERATION" disabled={!model} loading={loading.generations} onChange={(value) => { setGeneration(value); setError(""); setActiveVehicle(null); }} />
                <div className="sm:col-span-2">
                  <SelectField label="MODIFICATION / TRIM" value={modification} options={modifications} placeholder="SELECT ENGINE / TRIM (OPTIONAL)" disabled={!model || !year} loading={loading.modifications} onChange={(value) => { setModification(value); setError(""); setActiveVehicle(null); }} />
                </div>
                <SelectField label="MARKET / REGION" value={region} options={[
                  { value: "usdm", label: "USA+ (USDM)" },
                  { value: "cdm", label: "CANADA (CDM)" },
                  { value: "mxndm", label: "MEXICO (MXNDM)" },
                  { value: "ladm", label: "CENTRAL & SOUTH AMERICA (LADM)" },
                  { value: "eudm", label: "EUROPE (EUDM)" },
                  { value: "rus", label: "RUSSIA+ (RUS)" },
                  { value: "jdm", label: "JAPAN (JDM)" },
                  { value: "chdm", label: "CHINA / HONG KONG / MACAO (CHDM)" },
                  { value: "skdm", label: "SOUTH KOREA (SKDM)" },
                  { value: "sam", label: "SOUTHEAST ASIA (SAM)" },
                  { value: "medm", label: "MIDDLE EAST (MEDM)" },
                  { value: "nadm", label: "NORTH AFRICA (NADM)" },
                  { value: "sadm", label: "SOUTH AFRICA (SADM)" },
                  { value: "audm", label: "OCEANIA (AUDM)" },
                ]} placeholder="SELECT MARKET" onChange={(value) => { setRegion(value); resetVehicle(); setAiCandidate(null); setAiError(""); }} />
              </div>
              {error && <p role="alert" className="mt-5 border-l-2 border-ink bg-surface px-4 py-3 text-xs font-light text-ink">{error}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                <Button type="submit" disabled={!model || !year || submitting}>
                  {submitting ? <LoaderCircle className="animate-spin" size={15} /> : <Search size={15} />}
                  {submitting ? "SEARCHING WHEEL-SIZE..." : "FIND WHEEL SPECIFICATIONS"} <ArrowRight size={15} />
                </Button>
                <button type="button" onClick={resetVehicle} className="text-[12px] font-bold tracking-[0.12em] text-muted underline underline-offset-4 hover:text-ink">RESET VEHICLE</button>
              </div>
            </form>
          </div>
        </section>

        <div className="flex flex-col bg-surface-dark p-6 text-white md:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-white/30 text-white"><Sparkles size={17} /></span>
            <div>
              <p className="text-[12px] font-bold tracking-[0.16em] text-white/50">02 / ALTERNATIVE SEARCH</p>
              <h2 className="mt-1 text-lg text-white">AI VEHICLE MATCH</h2>
            </div>
          </div>
          <p className="mt-6 text-sm font-light leading-7 text-white/70">Describe your BMW in your own words. AI extracts the likely model, year, chassis and trim. Review the candidate before requesting real fitment data.</p>
          <form onSubmit={identifyVehicle} className="mt-6 grid gap-3">
            <label htmlFor="ai-vehicle-description" className="text-[12px] font-bold tracking-[0.14em] text-white/60">DESCRIBE YOUR VEHICLE</label>
            <textarea
              id="ai-vehicle-description"
              value={aiDescription}
              onChange={(event) => { setAiDescription(event.target.value); setAiCandidate(null); }}
              placeholder="Example: 2022 BMW M3 Competition xDrive, G80, US specification."
              rows={4}
              maxLength={500}
              className="w-full resize-y border border-white/25 bg-white/5 px-4 py-3 text-sm font-light leading-6 text-white outline-none placeholder:text-white/35 focus:border-white/70"
            />
            <Button type="submit" disabled={aiLoading || aiDescription.trim().length < 5} className="w-full">
              {aiLoading ? <LoaderCircle className="animate-spin" size={15} /> : <Sparkles size={15} />}
              IDENTIFY MY BMW <ArrowRight size={15} />
            </Button>
          </form>
          {aiError && <p role="alert" className="mt-4 border-l-2 border-white bg-white/10 px-3 py-3 text-xs font-light text-white">{aiError}</p>}
          {aiCandidate && (
            <div className="mt-5 border border-white/25 bg-white/5 p-4">
              <p className="text-[12px] font-bold tracking-[0.14em] text-white/55">AI VEHICLE CANDIDATE · {aiCandidate.confidence.toUpperCase()} CONFIDENCE</p>
              {aiCandidate.clarification ? (
                <p className="mt-3 text-sm font-light leading-6 text-white">{aiCandidate.clarification}</p>
              ) : (
                <>
                  <p className="mt-3 text-base font-bold text-white">{[aiCandidate.year, "BMW", aiCandidate.modelLabel || aiCandidate.model, aiCandidate.generation, aiCandidate.modification].filter(Boolean).join(" · ")}</p>
                  <p className="mt-2 text-xs font-light text-white/55">MARKET: {(aiCandidate.region || region).toUpperCase()}</p>
                  {aiCandidate.notes && <p className="mt-2 text-xs font-light leading-5 text-white/65">{aiCandidate.notes}</p>}
                  <Button type="button" onClick={confirmAiCandidate} disabled={!aiCandidate.model || !aiCandidate.year} className="mt-4 w-full">
                    CONFIRM VEHICLE & FIND FITMENT <ArrowRight size={15} />
                  </Button>
                </>
              )}
            </div>
          )}
          <p className="mt-auto pt-6 text-[12px] font-light leading-5 text-white/45">AI identifies a candidate only. Wheel-Size fitment data is requested after you confirm the vehicle.</p>
        </div>
      </div>
      <div className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
        {[
          ["OEM FACTORY SPECS", "Original wheel and tire dimensions from the selected vehicle."],
          ["AFTERMARKET FITMENT", "Additional wheel and tire combinations for your chassis and trim."],
          ["PLUS / MINUS SIZING", "Diameter-up and winter-down sizing candidates based on the OE setup."],
        ].map(([title, description], index) => (
          <div key={title} className="flex gap-4">
            <span className="text-xs font-bold text-muted">0{index + 1}</span>
            <div><h3 className="text-xs">{title}</h3><p className="mt-2 text-xs font-light leading-6 text-muted">{description}</p></div>
          </div>
        ))}
      </div>
      {activeVehicle && (
        <div className="mt-16 border-t-2 border-ink pt-8" aria-live="polite">
          <VehicleFitmentResults key={activeVehicle.requestId} {...activeVehicle} onSearchStateChange={handleSearchStateChange} />
        </div>
      )}
    </section>
  );
}
