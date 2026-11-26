"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PButton,
  PHeading,
  PInlineNotification,
  PSelect,
  PSelectOption,
  PSpinner,
  PText,
  type SelectChangeEventDetail,
} from "@porsche-design-system/components-react";

type Vehicle = { year: string; make: string; model: string; trim: string; body: string };
type Props = { initialVehicle: Vehicle | null; onClose: () => void; onSave: (vehicle: Vehicle) => void };
type ApiRecord = Record<string, unknown>;
type ApiResponse = { data?: ApiRecord[]; error?: string; meta?: unknown };

const str = (value: unknown) => typeof value === "string" || typeof value === "number" ? String(value) : "";
const slugOf = (item: ApiRecord) => str(item.slug || item.id || item.code || item.value || item.name);
const labelOf = (item: ApiRecord) => str(item.name || item.title || item.label || item.trim || item.slug || item.year);
const getData = (payload: ApiResponse) => Array.isArray(payload.data) ? payload.data : [];

async function request(resource: string, params: Record<string, string> = {}): Promise<ApiRecord[]> {
  const query = new URLSearchParams({ resource, region: "usdm", ...params });
  const response = await fetch(`/api/vehicle-fitment?${query.toString()}`);
  const payload = await response.json() as ApiResponse;
  if (!response.ok) throw new Error(payload.error || "Unable to load vehicle data.");
  return getData(payload);
}

export function VehicleFitmentPicker({ initialVehicle, onClose, onSave }: Props) {
  const [makes, setMakes] = useState<ApiRecord[]>([]);
  const [models, setModels] = useState<ApiRecord[]>([]);
  const [years, setYears] = useState<ApiRecord[]>([]);
  const [mods, setMods] = useState<ApiRecord[]>([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [modification, setModification] = useState("");
  const [fitment, setFitment] = useState<ApiRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let active = true;
    request("makes").then(data => { if (active) setMakes(data); }).catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!make) { setModels([]); setModel(""); return; }
    let active = true;
    setLoading(true); setError(""); setModel(""); setYear(""); setModification(""); setFitment([]);
    Promise.all([request("models", { make }), request("years", { make })])
      .then(([modelData, yearData]) => { if (active) { setModels(modelData); setYears(yearData); } })
      .catch(e => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [make]);

  useEffect(() => {
    if (!make || !model) { setMods([]); setModification(""); return; }
    let active = true;
    setLoading(true); setError(""); setModification(""); setFitment([]);
    request("years", { make, model })
      .then(yearData => { if (active) setYears(yearData); })
      .catch(e => { if (active) setError(e.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [make, model, year]);

  useEffect(() => {
    if (!make || !model || !year) { setMods([]); setModification(""); return; }
    let active = true;
    request("modifications", { make, model, year })
      .then(data => { if (active) setMods(data); })
      .catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [make, model, year]);

  const selectedMod = useMemo(() => mods.find(item => slugOf(item) === modification), [mods, modification]);
  const fitmentText = (item: ApiRecord) => {
    const technical = item.technical as ApiRecord | undefined;
    const wheels = Array.isArray(item.wheels) ? item.wheels : [];
    return [
      str(technical?.bolt_pattern || technical?.pcd) ? `Bolt pattern: ${str(technical?.bolt_pattern || technical?.pcd)}` : "",
      wheels.length ? `OE wheel records: ${wheels.length}` : "",
      str(item.trim || item.name || item.modification),
    ].filter(Boolean).join(" · ");
  };

  const runFitmentSearch = async () => {
    if (!make || !model || !year) return;
    setLoading(true); setError(""); setSearched(false);
    try {
      const params: Record<string, string> = { make, model, year };
      if (modification) params.modification = modification;
      const data = await request("search", params);
      setFitment(data); setSearched(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Fitment search failed."); }
    finally { setLoading(false); }
  };

  const save = () => {
    const vehicle: Vehicle = {
      year, make: labelOf(makes.find(x => slugOf(x) === make) || { name: make }),
      model: labelOf(models.find(x => slugOf(x) === model) || { name: model }),
      trim: labelOf(selectedMod || { name: "All trims" }),
      body: str(selectedMod?.body || selectedMod?.body_type || "See fitment details"),
    };
    localStorage.setItem("mayhem-vehicle", JSON.stringify(vehicle));
    onSave(vehicle);
    onClose();
  };

  const change = (setter: (value: string) => void) => (event: CustomEvent<SelectChangeEventDetail>) => setter(String(event.detail.value ?? ""));

  return <div className="mw-modal-backdrop" onClick={onClose}>
    <section className="mw-vehicle-modal mw-fitment-modal" role="dialog" aria-modal="true" aria-label="Find your fit" onClick={e => e.stopPropagation()}>
      <button className="mw-modal-close" onClick={onClose} aria-label="Close">×</button>
      <p className="mw-kicker">URANUS / VEHICLE FITMENT</p>
      <PHeading tag="h2" size="large">Find your fit.</PHeading>
      <PText>Choose your exact vehicle to retrieve original equipment wheel and tire specifications from Wheel-Size.</PText>
      {initialVehicle && <PText>Previously saved: {initialVehicle.year} {initialVehicle.make} {initialVehicle.model} / {initialVehicle.trim}</PText>}
      <div className="mw-vehicle-fields">
        <PSelect name="vehicle-make" label="MAKE" value={make} onChange={change(setMake)}>
          {makes.map(item => <PSelectOption key={slugOf(item)} value={slugOf(item)}>{labelOf(item)}</PSelectOption>)}
        </PSelect>
        <PSelect name="vehicle-model" label="MODEL" value={model} disabled={!make || !models.length} onChange={change(setModel)}>
          {models.map(item => <PSelectOption key={slugOf(item)} value={slugOf(item)}>{labelOf(item)}</PSelectOption>)}
        </PSelect>
        <PSelect name="vehicle-year" label="YEAR" value={year} disabled={!model || !years.length} onChange={change(setYear)}>
          {years.map(item => { const value = str(item.year || item.value || item.name || item); return <PSelectOption key={value} value={value}>{value}</PSelectOption>; })}
        </PSelect>
        <PSelect name="vehicle-modification" label="TRIM / MODIFICATION" value={modification} disabled={!year || !mods.length} onChange={change(setModification)}>
          <PSelectOption value="">All available trims</PSelectOption>
          {mods.map(item => <PSelectOption key={slugOf(item)} value={slugOf(item)}>{labelOf(item)}</PSelectOption>)}
        </PSelect>
      </div>
      {loading && <div className="mw-fitment-loading"><PSpinner /> <PText>Loading vehicle data…</PText></div>}
      {error && <PInlineNotification state="error" heading="Fitment service unavailable">{error}</PInlineNotification>}
      <div className="mw-fitment-actions">
        <PButton onClick={runFitmentSearch} disabled={!make || !model || !year || loading}>CHECK VEHICLE FITMENT</PButton>
        <PButton variant="secondary" onClick={save} disabled={!make || !model || !year}>SAVE VEHICLE</PButton>
      </div>
      {searched && <section className="mw-fitment-results">
        <PHeading tag="h3" size="medium">OE fitment results</PHeading>
        {!fitment.length ? <PText>No matching OE fitment records were returned for this vehicle selection.</PText> : fitment.map((item, index) => <article key={str(item.id || item.slug || index)}><strong>{labelOf(item) || `Vehicle result ${index + 1}`}</strong><p>{fitmentText(item) || "Vehicle fitment data returned by Wheel-Size."}</p></article>)}
        <PText>OE specifications are a reference point, not a confirmation that every aftermarket wheel fits. Compare wheel diameter, width, offset, bolt pattern, centre bore, load rating and brake clearance.</PText>
      </section>}
      <p className="mw-modal-note">Fitment data is retrieved live from Wheel-Size API v2. The API credential is kept server-side and is never exposed in the browser.</p>
    </section>
  </div>;
}
