"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CarFront, CircleAlert, LoaderCircle, ShieldCheck } from "lucide-react";

type Props = {
  model?: string;
  year?: string;
  generation?: string;
  modification?: string;
  region?: string;
};

type AnyRecord = Record<string, any>;

function record(value: unknown): AnyRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as AnyRecord : {};
}

function text(value: unknown): string {
  return value === null || value === undefined || value === "" ? "—" : String(value);
}

function listFrom(payload: unknown): AnyRecord[] {
  const root = record(payload);
  const data = root.data ?? root.results ?? payload;
  return Array.isArray(data) ? data.map(record) : data && typeof data === "object" ? [record(data)] : [];
}

function wheelRows(vehicle: AnyRecord): AnyRecord[] {
  const raw = vehicle.wheels ?? vehicle.wheel ?? vehicle.fitments ?? [];
  if (Array.isArray(raw)) return raw.map(record);
  if (raw && typeof raw === "object") return [record(raw)];
  return [];
}

function axisSpec(wheel: AnyRecord, axis: "front" | "rear") {
  const item = record(wheel[axis]);
  return {
    rim: text(item.rim ?? item.rim_full ?? item.rim_size),
    tire: text(item.tire_full ?? item.tire),
    diameter: text(item.rim_diameter),
    width: text(item.rim_width),
    offset: text(item.rim_offset),
  };
}

function WheelSizeUpsteps({ payload }: { payload: unknown }) {
  const rows = listFrom(payload);
  const grouped = new Map<string, AnyRecord[]>();
  for (const option of rows) {
    const step = Number(option.step ?? 0);
    const label = step === 0 ? "OE BASELINE" : step > 0 ? `PLUS ${step}` : `MINUS ${Math.abs(step)}`;
    grouped.set(label, [...(grouped.get(label) ?? []), option]);
  }
  if (!rows.length) return <p className="py-5 text-sm font-light text-muted">No plus/minus candidates were returned for this OEM tire and wheel combination.</p>;
  return (
    <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
      {Array.from(grouped.entries()).map(([label, options]) => (
        <div key={label} className="bg-white p-4">
          <p className="text-[10px] font-bold tracking-[0.14em] text-muted">{label}</p>
          <p className="mt-1 text-xl font-bold text-ink">{options.length} OPTIONS</p>
          <div className="mt-3 space-y-3">
            {options.slice(0, 5).map((option, index) => {
              const rim = record(option.rim);
              const tire = record(option.tire);
              const difference = record(option.difference);
              return (
                <div key={index} className="border-t border-line pt-2">
                  <p className="text-sm font-bold text-ink">{text(rim.designation ?? option.rim_designation)}</p>
                  <p className="mt-1 text-xs font-light text-body">{text(tire.designation ?? option.tire_designation)}</p>
                  <p className="mt-1 text-[10px] font-light text-muted">
                    {difference.od_percent !== undefined ? `OUTER DIAMETER ${text(difference.od_percent)}%` : ""}
                    {option.is_oe ? " · ORIGINAL EQUIPMENT" : ""}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function WheelFitmentCard({ wheel, label }: { wheel: AnyRecord; label: string }) {
  const front = axisSpec(wheel, "front");
  const rear = axisSpec(wheel, "rear");
  const hasRear = rear.rim !== "—" || rear.tire !== "—";
  return (
    <div className="border-t border-line py-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs font-bold tracking-[0.1em] text-ink">{label}</p>
        <span className="text-[10px] font-light text-muted">{wheel.is_runflat_tires ? "RUN-FLAT" : ""}{wheel.is_extra_load_tires ? " · XL" : ""}</span>
      </div>
      <div className={`grid gap-4 ${hasRear ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}>
        <div className="bg-surface p-4">
          <p className="text-[10px] font-bold tracking-[0.14em] text-muted">FRONT</p>
          <p className="mt-2 text-lg font-bold text-ink">{front.rim}</p>
          <p className="mt-1 text-sm font-light text-body">{front.tire}</p>
          <p className="mt-3 text-[10px] font-light text-muted">WIDTH {front.width} · OFFSET ET{front.offset}</p>
        </div>
        {hasRear && <div className="bg-surface p-4">
          <p className="text-[10px] font-bold tracking-[0.14em] text-muted">REAR</p>
          <p className="mt-2 text-lg font-bold text-ink">{rear.rim}</p>
          <p className="mt-1 text-sm font-light text-body">{rear.tire}</p>
          <p className="mt-3 text-[10px] font-light text-muted">WIDTH {rear.width} · OFFSET ET{rear.offset}</p>
        </div>}
      </div>
      {text(wheel.notes) !== "—" && <p className="mt-3 text-xs font-light leading-5 text-muted">{text(wheel.notes)}</p>}
    </div>
  );
}

export function VehicleFitmentResults({ model, year, generation, modification, region = "usdm" }: Props) {
  const [payload, setPayload] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
    fetch(`/api/vehicle-fitment/search?${query}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Fitment search failed.");
        return result;
      })
      .then((result) => { if (active) setPayload(result); })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Unable to load fitment data."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]);

  const vehicles = useMemo(() => listFrom(payload), [payload]);
  const fitments = useMemo(() => vehicles.flatMap((vehicle) => wheelRows(vehicle).map((wheel) => ({ vehicle, wheel }))), [vehicles]);
  const oem = fitments.filter(({ wheel }) => wheel.is_stock === true);
  const aftermarket = fitments.filter(({ wheel }) => wheel.is_stock === false);
  const primaryVehicle = vehicles[0] ?? {};
  const vehicleName = [record(primaryVehicle.make).name, record(primaryVehicle.model).name, record(primaryVehicle.generation).name, primaryVehicle.name ?? primaryVehicle.trim].filter(Boolean).join(" ");
  const technical = record(primaryVehicle.technical);
  const primaryOemTire = oem[0] ? axisSpec(oem[0].wheel, "front").tire : "";

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
      <Link href="/vehicle-fitment" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] text-muted hover:text-ink"><ArrowLeft size={14} /> CHANGE VEHICLE</Link>
      <div className="mt-8 grid gap-px bg-line lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex min-h-[260px] flex-col justify-between bg-ink p-6 text-white md:p-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">VEHICLE IMAGE / PLACEHOLDER</p>
            <div className="mt-5 flex aspect-[16/7] items-center justify-center border border-white/20 bg-white/5">
              <CarFront size={76} strokeWidth={0.8} className="text-white/40" />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-[10px] font-bold tracking-[0.16em] text-white/50">{text(region).toUpperCase()} MARKET · BMW</p>
            <h1 className="mt-2 text-2xl text-white sm:text-3xl">{vehicleName || `BMW ${model || ""}`}</h1>
            <p className="mt-2 text-xs font-light text-white/60">{year} · {generation || "GENERATION NOT SPECIFIED"} · {modification || "ALL MODIFICATIONS"}</p>
          </div>
        </div>
        <div className="bg-white p-6 md:p-8">
          <p className="text-[10px] font-bold tracking-[0.16em] text-muted">VEHICLE MOUNTING DATA</p>
          {loading ? <div className="flex min-h-40 items-center gap-3 text-sm font-light text-muted"><LoaderCircle size={18} className="animate-spin" /> RETRIEVING FACTORY AND AFTERMARKET FITMENT...</div> :
            error ? <div role="alert" className="mt-6 flex gap-3 border-l-2 border-ink bg-surface p-4 text-sm font-light"><CircleAlert size={18} />{error}</div> :
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><p className="text-[10px] font-bold tracking-[0.12em] text-muted">BOLT PATTERN / PCD</p><p className="mt-1 text-xl font-bold text-ink">{text(technical.bolt_pattern ?? technical.pcd)}</p></div>
              <div><p className="text-[10px] font-bold tracking-[0.12em] text-muted">CENTER BORE</p><p className="mt-1 text-xl font-bold text-ink">{text(technical.centre_bore ?? technical.center_bore)}{technical.centre_bore || technical.center_bore ? " mm" : ""}</p></div>
              <div><p className="text-[10px] font-bold tracking-[0.12em] text-muted">WHEEL FASTENER</p><p className="mt-1 text-sm font-light text-ink">{text(technical.wheel_fasteners ?? technical.thread_size)}</p></div>
              <div><p className="text-[10px] font-bold tracking-[0.12em] text-muted">TORQUE</p><p className="mt-1 text-sm font-light text-ink">{text(technical.tightening_torque ?? technical.torque)}{technical.tightening_torque || technical.torque ? " Nm" : ""}</p></div>
            </div>}
        </div>
      </div>

      {!loading && !error && (
        <div className="mt-10 space-y-10">
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
              <div><p className="text-[10px] font-bold tracking-[0.16em] text-muted">01 / ORIGINAL EQUIPMENT</p><h2 className="mt-2 text-2xl">OEM FACTORY SPECS</h2></div>
              <p className="text-xs font-light text-muted">{oem.length} FACTORY FITMENT{ oem.length === 1 ? "" : "S"}</p>
            </div>
            {oem.length ? oem.map(({ wheel }, index) => <WheelFitmentCard key={index} wheel={wheel} label={`FACTORY OPTION ${String(index + 1).padStart(2, "0")}`} />) : <p className="py-6 text-sm font-light text-muted">No OEM wheel records were returned for this exact selection.</p>}
          </section>

          <section>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
              <div><p className="text-[10px] font-bold tracking-[0.16em] text-muted">02 / OPTIONAL & ALTERNATIVE SIZES</p><h2 className="mt-2 text-2xl">AFTERMARKET FITMENT</h2></div>
              <p className="text-xs font-light text-muted">{aftermarket.length} ADDITIONAL FITMENT{aftermarket.length === 1 ? "" : "S"}</p>
            </div>
            {aftermarket.length ? aftermarket.map(({ wheel }, index) => <WheelFitmentCard key={index} wheel={wheel} label={`ALTERNATIVE OPTION ${String(index + 1).padStart(2, "0")}`} />) : <p className="py-6 text-sm font-light text-muted">No additional fitments were returned for this exact vehicle selection.</p>}
          </section>

          <section>
            <div className="border-b border-ink pb-4">
              <p className="text-[10px] font-bold tracking-[0.16em] text-muted">03 / DIAMETER ALTERNATIVES</p>
              <h2 className="mt-2 text-2xl">PLUS / MINUS SIZING</h2>
              <p className="mt-2 max-w-3xl text-xs font-light leading-6 text-muted">Preliminary tire-size candidates calculated from the selected OEM tire diameter. These are geometry screens, not confirmed wheel clearance or safety approvals.</p>
            </div>
            <div className="mt-5">
              {payload && <WheelSizeUpsteps payload={record(payload).upsteps} />}\n              {record(payload).upstepsError && <p className="mt-3 text-xs font-light text-muted">{text(record(payload).upstepsError)}</p>}
            </div>
          </section>

          <section className="grid gap-4 border border-line bg-surface p-5 md:grid-cols-[auto_1fr] md:items-start md:p-6">
            <ShieldCheck size={22} className="text-ink" />
            <div>
              <h3 className="text-sm">FITMENT ENGINEERING CHECK</h3>
              <p className="mt-2 text-xs font-light leading-6 text-muted">Before purchase or installation, each candidate still needs wheel width and ET verification, brake-caliper clearance, suspension and fender clearance, tire outside-diameter comparison, and load / speed-rating validation. Database fitment alone is not a physical clearance guarantee.</p>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
