"use client";

import { useMemo, useState } from "react";
import { Check, ClipboardList, Printer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Wheel } from "@/lib/data/wheels";

const finishOptions = [
  { name: "Satin Graphite", note: "Low-gloss metallic", swatch: "#55595e" },
  { name: "Brushed Silver", note: "Directional brushed metal", swatch: "#c4c7ca" },
  { name: "Gloss Black", note: "High-gloss black", swatch: "#151719" },
  { name: "Hyper Silver", note: "Bright metallic", swatch: "#e0e2e4" },
  { name: "Frozen Bronze", note: "Matte bronze effect", swatch: "#77736d" },
  { name: "Custom Finish", note: "Subject to quotation", swatch: "#969696" },
];
const diameters = ["18", "19", "20", "21", "22"];
const widths = ["8.0J", "8.5J", "9.0J", "9.5J", "10.0J", "10.5J", "11.0J", "11.5J", "12.0J"];

type Props = { wheel: Wheel };

export function WheelOrderPanel({ wheel }: Props) {
  const [finish, setFinish] = useState(wheel.finish);
  const [frontDiameter, setFrontDiameter] = useState(wheel.size.match(/(18|19|20|21|22)/)?.[0] ?? "20");
  const [rearDiameter, setRearDiameter] = useState(wheel.size.match(/(18|19|20|21|22)/g)?.[1] ?? wheel.size.match(/(18|19|20|21|22)/)?.[0] ?? "20");
  const [frontWidth, setFrontWidth] = useState(wheel.size.match(/\d+\.\d+\s*$/)?.[0]?.trim() ? wheel.size.match(/\d+\.\d+\s*$/)?.[0]?.trim() + "J" : "9.0J");
  const [rearWidth, setRearWidth] = useState("10.5J");
  const [staggered, setStaggered] = useState(true);
  const [pcd, setPcd] = useState(wheel.fitment);
  const [offsetFront, setOffsetFront] = useState("");
  const [offsetRear, setOffsetRear] = useState("");
  const [centerBore, setCenterBore] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [year, setYear] = useState("");
  const [trim, setTrim] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const unitPrice = Number(wheel.price.replace(/[^0-9.]/g, "")) || 0;
  const total = useMemo(() => unitPrice * Number(quantity), [unitPrice, quantity]);
  const canGenerate = customer.trim() && (email.trim() || phone.trim()) && vehicle.trim() && pcd.trim();

  function generateConfirmation() {
    if (!canGenerate) return;
    const stamp = new Date();
    const reference = `UR-${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setOrderNumber(reference);
    setConfirmation(true);
  }

  const field = "mt-2 h-12 w-full border border-[#c9cdd1] bg-white px-3 text-sm font-light text-ink outline-none focus:border-[#1c69d4]";
  const label = "text-[9px] font-bold tracking-[0.16em] text-muted";

  return (
    <section id="order-builder" className="bg-[#f0f1f2] text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-muted">01 / BUILD YOUR ORDER</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">SPECIFY EVERY DETAIL.</h2>
            <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-muted">Wheel orders are vehicle-specific. Select the finish and dimensions, then provide your vehicle and fitment data so the final specification can be checked before production.</p>

            <div className="mt-10 border-t border-[#c9cdd1] pt-8">
              <div className="flex items-end justify-between gap-4"><div><p className={label}>02 / SURFACE TREATMENT</p><h3 className="mt-2 text-xl font-bold">CHOOSE YOUR FINISH</h3></div><span className="text-[10px] font-light text-muted">6 finish selections</span></div>
              <div className="mt-5 grid grid-cols-2 gap-px bg-[#c9cdd1] sm:grid-cols-3">
                {finishOptions.map((option) => <button type="button" key={option.name} onClick={() => setFinish(option.name)} aria-pressed={finish === option.name} className={`flex min-h-[112px] items-center gap-3 p-4 text-left transition-colors ${finish === option.name ? "bg-white ring-1 ring-inset ring-[#1c69d4]" : "bg-[#e7e9eb] hover:bg-white"}`}>
                  <span className="h-10 w-10 shrink-0 border border-black/15" style={{ backgroundColor: option.swatch }} />
                  <span><span className="block text-[11px] font-bold">{option.name.toUpperCase()}</span><span className="mt-1 block text-[9px] font-light text-muted">{option.note}</span>{finish === option.name && <span className="mt-2 flex items-center gap-1 text-[9px] font-bold text-[#1c69d4]"><Check size={11}/> SELECTED</span>}</span>
                </button>)}
              </div>
            </div>

            <div className="mt-10 border-t border-[#c9cdd1] pt-8">
              <p className={label}>03 / WHEEL DIMENSIONS</p><h3 className="mt-2 text-xl font-bold">FRONT & REAR SPECIFICATION</h3>
              <p className="mt-2 text-xs font-light leading-6 text-muted">Diameter is measured in inches; width is measured in inches (J). A staggered setup allows different front and rear specifications.</p>
              <label className="mt-5 flex items-center gap-3 text-xs font-bold"><input type="checkbox" checked={staggered} onChange={(e) => setStaggered(e.target.checked)} className="h-4 w-4 accent-[#1c69d4]"/> STAGGERED SETUP (FRONT / REAR DIFFERENT)</label>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {(["FRONT AXLE", "REAR AXLE"] as const).map((axle) => {
                  const front = axle === "FRONT AXLE";
                  const diameter = front ? frontDiameter : rearDiameter;
                  const width = front ? frontWidth : rearWidth;
                  return <div key={axle} className={`bg-white p-5 ${!front && !staggered ? "opacity-45" : ""}`}>
                    <p className="text-[10px] font-bold tracking-[0.16em]">{axle}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <label className={label}>DIAMETER<select disabled={!front && !staggered} className={field} value={diameter} onChange={(e) => front ? setFrontDiameter(e.target.value) : setRearDiameter(e.target.value)}>{diameters.map((v) => <option key={v} value={v}>{v} IN</option>)}</select></label>
                      <label className={label}>WIDTH<select disabled={!front && !staggered} className={field} value={width} onChange={(e) => front ? setFrontWidth(e.target.value) : setRearWidth(e.target.value)}>{widths.map((v) => <option key={v}>{v}</option>)}</select></label>
                    </div>
                    <label className={`mt-4 block ${label}`}>OFFSET / ET (MM)<input className={field} placeholder="e.g. +25" value={front ? offsetFront : offsetRear} onChange={(e) => front ? setOffsetFront(e.target.value) : setOffsetRear(e.target.value)} /></label>
                  </div>;
                })}
              </div>
              {!staggered && <p className="mt-3 text-[10px] font-light text-muted">Rear axle will use the same dimensions as the front axle.</p>}
            </div>

            <div className="mt-10 border-t border-[#c9cdd1] pt-8">
              <p className={label}>04 / VEHICLE & FITMENT DATA</p><h3 className="mt-2 text-xl font-bold">TELL US WHAT YOU DRIVE</h3>
              <p className="mt-2 text-xs font-light leading-6 text-muted">These values are customer-supplied and will be verified. Do not assume a wheel is compatible based on PCD alone.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className={label}>VEHICLE / MODEL<input className={field} value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="e.g. BMW M3 Competition" /></label>
                <label className={label}>MODEL YEAR<input className={field} value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024" /></label>
                <label className={label}>CHASSIS / TRIM<input className={field} value={trim} onChange={(e) => setTrim(e.target.value)} placeholder="e.g. G80 / xDrive" /></label>
                <label className={label}>PCD / BOLT PATTERN<input className={field} value={pcd} onChange={(e) => setPcd(e.target.value)} placeholder="e.g. 5 × 112" /></label>
                <label className={label}>CENTER BORE (MM)<input className={field} value={centerBore} onChange={(e) => setCenterBore(e.target.value)} placeholder="e.g. 66.6" /></label>
                <label className={label}>QUANTITY<select className={field} value={quantity} onChange={(e) => setQuantity(e.target.value)}><option value="1">1 SET / 4 WHEELS</option><option value="2">2 SETS / 8 WHEELS</option><option value="3">3 SETS / 12 WHEELS</option><option value="4">4 SETS / 16 WHEELS</option></select></label>
              </div>
            </div>

            <div className="mt-10 border-t border-[#c9cdd1] pt-8">
              <p className={label}>05 / CUSTOMER DETAILS</p><h3 className="mt-2 text-xl font-bold">WHERE SHOULD WE CONTACT YOU?</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className={label}>NAME<input className={field} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Your name" /></label>
                <label className={label}>EMAIL<input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" /></label>
                <label className={label}>PHONE / WHATSAPP<input className={field} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 ..." /></label>
                <label className={label}>COUNTRY / REGION<input className={field} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country or region" /></label>
              </div>
              <label className={`mt-4 block ${label}`}>SPECIAL REQUESTS<textarea className="mt-2 min-h-24 w-full border border-[#c9cdd1] bg-white p-3 text-sm font-light outline-none focus:border-[#1c69d4]" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Brake clearance notes, TPMS, hub rings, custom finish, delivery questions..." /></label>
            </div>
          </div>

          <aside className="h-fit bg-[#111519] p-6 text-white lg:sticky lg:top-28 lg:p-8">
            <p className="text-[10px] font-bold tracking-[0.18em] text-white/45">ORDER SUMMARY / LIVE</p>
            <h3 className="mt-3 text-2xl font-bold">{wheel.name}</h3>
            <p className="mt-1 text-[10px] font-light text-white/50">{wheel.category} CONSTRUCTION</p>
            <div className="mt-7 border-y border-white/15 py-5">
              {[[ "FINISH", finish ],["FRONT", `${frontDiameter} × ${frontWidth} / ET ${offsetFront || "TBC"}`],["REAR", `${staggered ? rearDiameter : frontDiameter} × ${staggered ? rearWidth : frontWidth} / ET ${staggered ? offsetRear || "TBC" : offsetFront || "TBC"}`],["PCD", pcd || "TBC"],["CENTER BORE", centerBore ? `${centerBore} MM` : "TBC"],["QUANTITY", `${quantity} SET(S)`]].map(([k,v]) => <div key={k} className="flex justify-between gap-4 py-2"><span className="text-[9px] font-bold tracking-[0.12em] text-white/45">{k}</span><span className="text-right text-[10px] font-bold">{v}</span></div>)}
            </div>
            <div className="mt-6"><p className="text-[9px] font-bold tracking-[0.16em] text-white/45">INDICATIVE CATALOGUE TOTAL</p><p className="mt-2 text-3xl font-bold tabular-nums">${total.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</p><p className="mt-2 text-[9px] font-light leading-5 text-white/45">Based on the displayed demo price per set. Finish surcharges, taxes, shipping and final production price are not included.</p></div>
            <div className="mt-7 space-y-3 border-t border-white/15 pt-6 text-[10px] font-light leading-5 text-white/65"><p className="flex gap-2"><ShieldCheck size={14} className="shrink-0 text-white/70"/> Fitment and brake clearance require technical verification.</p><p className="flex gap-2"><ClipboardList size={14} className="shrink-0 text-white/70"/> This step creates a specification confirmation, not a payment or stock reservation.</p></div>
            <Button onClick={generateConfirmation} disabled={!canGenerate} className="mt-7 h-12 w-full gap-2 text-[10px] tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-40">GENERATE ORDER CONFIRMATION <Check size={15}/></Button>
            <p className="mt-3 text-[9px] font-light leading-5 text-white/40">Required: customer name, vehicle, PCD, and at least one contact method.</p>
          </aside>
        </div>

        {confirmation && <div className="mt-12 border-2 border-[#1c69d4] bg-white p-6 sm:p-10 print:mt-0 print:border print:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#c9cdd1] pb-6"><div><p className="text-[10px] font-bold tracking-[0.2em] text-muted">URANUS PERFORMANCE WHEELS</p><h3 className="mt-3 text-3xl font-bold">ORDER SPECIFICATION.</h3><p className="mt-2 text-xs font-light text-muted">CUSTOMER CONFIGURATION CONFIRMATION / NOT A TAX INVOICE</p></div><div className="text-left sm:text-right"><p className={label}>REFERENCE NUMBER</p><p className="mt-2 text-lg font-bold">{orderNumber}</p><p className="mt-1 text-[10px] text-muted">{new Date().toLocaleDateString()}</p></div></div>
          <div className="mt-7 grid gap-8 sm:grid-cols-2">
            <div><p className={label}>PRODUCT</p><p className="mt-2 text-lg font-bold">{wheel.name}</p><p className="mt-1 text-xs font-light text-muted">{wheel.category} / {finish}</p></div>
            <div><p className={label}>CUSTOMER</p><p className="mt-2 text-sm font-bold">{customer}</p><p className="mt-1 text-xs font-light text-muted">{email} {phone && `/ ${phone}`}</p><p className="mt-1 text-xs font-light text-muted">{country}</p></div>
            <div><p className={label}>VEHICLE</p><p className="mt-2 text-sm font-bold">{vehicle} {year} {trim}</p><p className="mt-1 text-xs font-light text-muted">PCD {pcd} / Center bore {centerBore || "To be confirmed"} mm</p></div>
            <div><p className={label}>WHEEL SPECIFICATION</p><p className="mt-2 text-sm font-bold">FRONT: {frontDiameter} × {frontWidth} / ET {offsetFront || "TBC"}</p><p className="mt-1 text-sm font-bold">REAR: {staggered ? rearDiameter : frontDiameter} × {staggered ? rearWidth : frontWidth} / ET {staggered ? offsetRear || "TBC" : offsetFront || "TBC"}</p><p className="mt-1 text-xs font-light text-muted">{quantity} set(s) / {Number(quantity) * 4} wheels</p></div>
          </div>
          {notes && <div className="mt-6 border-t border-[#c9cdd1] pt-5"><p className={label}>SPECIAL REQUESTS</p><p className="mt-2 whitespace-pre-wrap text-xs font-light">{notes}</p></div>}
          <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-[#c9cdd1] pt-5"><div><p className={label}>INDICATIVE TOTAL / USD</p><p className="mt-2 text-2xl font-bold">{total.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</p></div><p className="max-w-md text-[10px] font-light leading-5 text-muted">Subject to final fitment verification, production specification, availability, shipping and written quotation. This document does not confirm payment, stock allocation or order acceptance.</p></div>
          <div className="mt-7 flex flex-wrap gap-3 print:hidden"><Button onClick={() => window.print()} className="gap-2"><Printer size={15}/> PRINT / SAVE PDF</Button><Button variant="secondary" onClick={() => setConfirmation(false)}>EDIT SPECIFICATION</Button></div>
        </div>}
      </div>
      <style jsx global>{`@media print { body * { visibility: hidden !important; } #order-builder, #order-builder * { visibility: visible !important; } #order-builder { position: absolute !important; inset: 0 !important; width: 100% !important; background: white !important; } #order-builder > div > div:first-child { display: none !important; } #order-builder aside { display: none !important; } #order-builder .print\\:hidden { display: none !important; } }`}</style>
    </section>
  );
}
