"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Check, LoaderCircle, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  model?: string;
  year?: string;
  generation?: string;
  modification?: string;
  region?: string;
  onSearchStateChange?: (loading: boolean) => void;
};
type AnyRecord = Record<string, any>;
type FitmentRow = { id: string; vehicle: AnyRecord; wheel: AnyRecord; source: "OEM" | "AFTERMARKET"; index: number };

function record(value: unknown): AnyRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as AnyRecord : {};
}
function display(value: unknown): string {
  return value === null || value === undefined || value === "" ? "—" : String(value);
}
function rowsFrom(payload: unknown): AnyRecord[] {
  const root = record(payload);
  const data = root.data ?? root.results ?? payload;
  return Array.isArray(data) ? data.map(record) : data && typeof data === "object" ? [record(data)] : [];
}
function wheelsFrom(vehicle: AnyRecord): AnyRecord[] {
  const raw = vehicle.wheels ?? vehicle.wheel ?? vehicle.fitments ?? [];
  return Array.isArray(raw) ? raw.map(record) : raw && typeof raw === "object" ? [record(raw)] : [];
}
function axis(wheel: AnyRecord, side: "front" | "rear") {
  const item = record(wheel[side]);
  return {
    rim: display(item.rim_full ?? item.rim ?? item.rim_designation ?? item.rim_size),
    tire: display(item.tire_full ?? item.tire ?? item.tire_designation),
    width: display(item.rim_width),
    offset: display(item.rim_offset),
    diameter: display(item.rim_diameter),
  };
}
function sourceLabel(vehicle: AnyRecord, wheel: AnyRecord) {
  return wheel.is_stock === true || vehicle.is_stock === true ? "OEM" : "AFTERMARKET";
}
function sizingRows(payload: unknown) {
  return rowsFrom(payload).map((item, index) => {
    const rim = record(item.rim);
    const tire = record(item.tire);
    const diff = record(item.difference);
    return {
      id: String(item.id ?? index),
      step: Number(item.step ?? 0),
      rim: display(rim.designation ?? item.rim_designation),
      tire: display(tire.designation ?? item.tire_designation),
      diameterDelta: diff.od_percent === undefined ? "—" : `${display(diff.od_percent)}%`,
      raw: item,
    };
  });
}

export function VehicleFitmentResults({ model, year, generation, modification, region = "usdm", onSearchStateChange }: Props) {
  const [payload, setPayload] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [showSizing, setShowSizing] = useState(true);
  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    if (generation) params.set("generation", generation);
    if (modification) params.set("modification", modification);
    params.set("region", region);
    return params.toString();
  }, [model, year, generation, modification, region]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    onSearchStateChange?.(true);
    setError("");
    setPayload(null);
    setSelectedId("");
    fetch(`/api/vehicle-fitment/search?${query}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Fitment search failed.");
        return result;
      })
      .then((result) => { if (active) setPayload(result); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load fitment data."); })
      .finally(() => { if (active) { setLoading(false); onSearchStateChange?.(false); } });
    return () => { active = false; onSearchStateChange?.(false); };
  }, [query, onSearchStateChange]);

  const vehicles = useMemo(() => rowsFrom(payload), [payload]);
  const fitments = useMemo<FitmentRow[]>(() => vehicles.flatMap((vehicle, vehicleIndex) =>
    wheelsFrom(vehicle).map((wheel, wheelIndex) => ({
      id: `${vehicleIndex}-${wheelIndex}`,
      vehicle,
      wheel,
      source: sourceLabel(vehicle, wheel) as FitmentRow["source"],
      index: wheelIndex,
    }))
  ), [vehicles]);
  const oem = fitments.filter((item) => item.source === "OEM");
  const aftermarket = fitments.filter((item) => item.source === "AFTERMARKET");
  const selected = fitments.find((item) => item.id === selectedId) ?? oem[0] ?? aftermarket[0] ?? null;
  const primary = vehicles[0] ?? {};
  const technical = record(primary.technical);
  const vehicleName = [record(primary.make).name, record(primary.model).name, record(primary.generation).name, primary.name ?? primary.trim].filter(Boolean).join(" ");
  const upsteps = useMemo(() => sizingRows(record(payload).upsteps), [payload]);
  const selectedFront = selected ? axis(selected.wheel, "front") : null;
  const selectedRear = selected ? axis(selected.wheel, "rear") : null;
  const hasRear = !!selectedRear && (selectedRear.rim !== "—" || selectedRear.tire !== "—");

  function choose(id: string) {
    setSelectedId(id);
  }

  return (
    <section className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
        <div>
          <p className="text-[12px] font-bold tracking-[0.18em] text-muted">FITMENT DATA / LIVE QUERY</p>
          <h2 className="mt-2 text-2xl md:text-3xl">{vehicleName || `BMW ${model || ""}`} {year}</h2>
          <p className="mt-2 text-xs font-light text-muted">{generation || "GENERATION NOT SPECIFIED"} · {modification || "ALL MODIFICATIONS"} · {region.toUpperCase()} MARKET</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-light text-muted">
          {loading ? <><LoaderCircle size={15} className="animate-spin" /> RETRIEVING WHEEL-SIZE DATA</> : error ? "QUERY NEEDS ATTENTION" : `${fitments.length} FITMENT RECORDS · ${upsteps.length} SIZE CANDIDATES`}
        </div>
      </div>

      {loading && <div className="flex min-h-36 items-center gap-3 py-8 text-sm font-light text-muted"><LoaderCircle size={18} className="animate-spin" /> RETRIEVING OEM, AFTERMARKET AND SIZE ALTERNATIVES...</div>}
      {error && <div role="alert" className="mt-6 flex items-start gap-3 border-l-2 border-ink bg-surface px-4 py-4 text-sm font-light text-ink"><AlertTriangle size={18} />{error}</div>}

      {!loading && !error && (
        <>
          <div className="mt-6 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {[
              ["BOLT PATTERN / PCD", technical.bolt_pattern ?? technical.pcd],
              ["CENTER BORE", technical.centre_bore ?? technical.center_bore, " mm"],
              ["FASTENER", technical.wheel_fasteners ?? technical.thread_size],
              ["TORQUE", technical.tightening_torque ?? technical.torque, " Nm"],
            ].map(([label, value, suffix]) => (
              <div key={String(label)} className="bg-surface px-4 py-3">
                <p className="text-[11px] font-bold tracking-[0.14em] text-muted">{label}</p>
                <p className="mt-1 text-sm font-bold text-ink">{display(value)}{value ? suffix ?? "" : ""}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
            <div>
              <p className="text-[12px] font-bold tracking-[0.16em] text-muted">01 / SPECIFICATION COMPARISON</p>
              <h3 className="mt-1 text-xl">WHEEL & TIRE FITMENT DATA</h3>
            </div>
            <p className="text-[12px] font-light text-muted">SELECT A ROW TO BUILD YOUR PRODUCT MATCH</p>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-surface text-[11px] font-bold tracking-[0.12em] text-muted">
                  <th className="px-3 py-3">TYPE / OPTION</th>
                  <th className="px-3 py-3">FRONT RIM</th>
                  <th className="px-3 py-3">FRONT TIRE</th>
                  <th className="px-3 py-3">FRONT ET</th>
                  <th className="px-3 py-3">REAR RIM</th>
                  <th className="px-3 py-3">REAR TIRE</th>
                  <th className="px-3 py-3">REAR ET</th>
                  <th className="px-3 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {fitments.map((item) => {
                  const front = axis(item.wheel, "front");
                  const rear = axis(item.wheel, "rear");
                  const active = selected?.id === item.id;
                  return (
                    <tr key={item.id} className={`border-b border-line text-xs ${active ? "bg-surface-strong" : "bg-white"}`}>
                      <td className="whitespace-nowrap px-3 py-3">
                        <span className="font-bold text-ink">{item.source}</span>
                        <span className="ml-2 text-[12px] font-light text-muted">{String(item.index + 1).padStart(2, "0")}</span>
                        {item.wheel.is_runflat_tires && <span className="ml-2 text-[11px] text-muted">RFT</span>}
                        {item.wheel.is_extra_load_tires && <span className="ml-1 text-[11px] text-muted">XL</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-bold text-ink">{front.rim}</td>
                      <td className="whitespace-nowrap px-3 py-3 font-light text-body">{front.tire}</td>
                      <td className="px-3 py-3 font-light text-body">{front.offset === "—" ? "—" : `ET${front.offset}`}</td>
                      <td className="whitespace-nowrap px-3 py-3 font-bold text-ink">{rear.rim}</td>
                      <td className="whitespace-nowrap px-3 py-3 font-light text-body">{rear.tire}</td>
                      <td className="px-3 py-3 font-light text-body">{rear.offset === "—" ? "—" : `ET${rear.offset}`}</td>
                      <td className="px-3 py-2">
                        <Button type="button" size="compact" variant={active ? "primary" : "secondary"} onClick={() => choose(item.id)}>
                          {active ? <><Check size={13} /> SELECTED</> : "SELECT"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {!fitments.length && <tr><td colSpan={8} className="px-3 py-8 text-center text-sm font-light text-muted">No fitment records were returned for this exact selection. Try clearing the trim or generation filter, or choose another market / region. The API search uses one region per request.</td></tr>}
              </tbody>
            </table>
          </div>

          <section className="mt-10">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
              <div><p className="text-[12px] font-bold tracking-[0.16em] text-muted">02 / ALTERNATIVE DIAMETERS</p><h3 className="mt-1 text-xl">PLUS / MINUS SIZING</h3></div>
              <button type="button" onClick={() => setShowSizing((value) => !value)} className="flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-muted hover:text-ink"><SlidersHorizontal size={14} /> {showSizing ? "COLLAPSE" : "EXPAND"}</button>
            </div>
            {showSizing && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[580px] border-collapse text-left">
                  <thead><tr className="border-b border-line bg-surface text-[11px] font-bold tracking-[0.12em] text-muted"><th className="px-3 py-3">SIZING STEP</th><th className="px-3 py-3">RIM</th><th className="px-3 py-3">TIRE</th><th className="px-3 py-3">OUTER DIAMETER DELTA</th></tr></thead>
                  <tbody>
                    {upsteps.map((item) => <tr key={item.id} className="border-b border-line text-xs"><td className="px-3 py-3 font-bold text-ink">{item.step === 0 ? "OE BASELINE" : item.step > 0 ? `PLUS ${item.step}` : `MINUS ${Math.abs(item.step)}`}</td><td className="px-3 py-3 font-bold text-ink">{item.rim}</td><td className="px-3 py-3 font-light text-body">{item.tire}</td><td className="px-3 py-3 font-light text-body">{item.diameterDelta}</td></tr>)}
                    {!upsteps.length && <tr><td colSpan={4} className="px-3 py-6 text-sm font-light text-muted">No plus/minus candidates returned for the selected OEM tire.</td></tr>}
                  </tbody>
                </table>
                {record(payload).upstepsError && <p className="mt-3 text-xs font-light text-muted">{display(record(payload).upstepsError)}</p>}
                <p className="mt-3 text-[12px] font-light leading-5 text-muted">SIZE CANDIDATES ARE GEOMETRY REFERENCES ONLY. THEY DO NOT CONFIRM BRAKE, SUSPENSION OR FENDER CLEARANCE.</p>
              </div>
            )}
          </section>

          <section className="mt-10 border-t-2 border-ink pt-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-[12px] font-bold tracking-[0.16em] text-muted">03 / CUSTOMER CONFIGURATION</p><h3 className="mt-1 text-xl">YOUR SELECTED WHEEL SETUP</h3></div>
              {selected && <span className="text-[12px] font-bold tracking-[0.12em] text-muted">{selected.source} OPTION {String(selected.index + 1).padStart(2, "0")}</span>}
            </div>
            {selected && selectedFront && selectedRear ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead><tr className="border-b border-line bg-surface text-[11px] font-bold tracking-[0.12em] text-muted"><th className="px-3 py-3">AXLE</th><th className="px-3 py-3">RIM SIZE</th><th className="px-3 py-3">WIDTH</th><th className="px-3 py-3">OFFSET</th><th className="px-3 py-3">TIRE</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-line text-xs"><td className="px-3 py-3 font-bold text-ink">FRONT</td><td className="px-3 py-3 font-bold text-ink">{selectedFront.rim}</td><td className="px-3 py-3">{selectedFront.width}</td><td className="px-3 py-3">{selectedFront.offset === "—" ? "—" : `ET${selectedFront.offset}`}</td><td className="px-3 py-3">{selectedFront.tire}</td></tr>
                    {hasRear && <tr className="border-b border-line text-xs"><td className="px-3 py-3 font-bold text-ink">REAR</td><td className="px-3 py-3 font-bold text-ink">{selectedRear.rim}</td><td className="px-3 py-3">{selectedRear.width}</td><td className="px-3 py-3">{selectedRear.offset === "—" ? "—" : `ET${selectedRear.offset}`}</td><td className="px-3 py-3">{selectedRear.tire}</td></tr>}
                  </tbody>
                </table>
              </div>
            ) : <p className="mt-4 text-sm font-light text-muted">Select a fitment row above to build a product specification.</p>}
          </section>

          <section className="mt-8 border-t border-line pt-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-[12px] font-bold tracking-[0.16em] text-muted">04 / AUTOMATIC PRODUCT MATCH</p><h3 className="mt-1 text-xl">WHEEL PRODUCT RECOMMENDATIONS</h3></div>
              <span className="text-[11px] font-bold tracking-[0.12em] text-muted">CATALOG INTEGRATION PENDING</span>
            </div>
            <div className="mt-4 grid gap-4 border-y border-line bg-surface px-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-bold text-ink">{selected ? "MATCH SPECIFICATION READY" : "SELECT A FITMENT FIRST"}</p>
                <p className="mt-1 text-xs font-light leading-6 text-muted">
                  {selected ? "The selected front / rear rim width and ET values are now the matching criteria for the product catalog. Product results will appear here when the store wheel inventory is connected." : "Choose an OEM or aftermarket fitment row to define the target wheel size and offset."}
                </p>
              </div>
              <div className="text-[12px] font-bold tracking-[0.1em] text-muted">{selected ? "SIZE + J + ET" : "AWAITING SELECTION"}</div>
            </div>
            <p className="mt-3 text-[12px] font-light leading-5 text-muted">PRODUCT MATCHING WILL USE FRONT / REAR DIAMETER, WIDTH (J), OFFSET (ET), PCD, CENTER BORE AND AVAILABLE LOAD RATING. NO PRODUCT OR STOCK CLAIM IS SHOWN UNTIL THE REAL STORE CATALOG IS CONNECTED.</p>
          </section>

          <section className="mt-8 border-t border-line pt-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <h3 className="text-sm">FITMENT ENGINEERING CHECK</h3>
                <p className="mt-2 text-xs font-light leading-6 text-muted">Before purchase or installation, verify wheel width and ET, brake-caliper clearance, suspension and fender clearance, tire outside diameter, and load / speed ratings. Database fitment and geometric sizing candidates are not physical clearance guarantees or safety certifications.</p>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
