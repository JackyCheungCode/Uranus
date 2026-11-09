"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initial = { company: "", contact: "", email: "", country: "", product: "", quantity: "4", incoterm: "FOB", destination: "", notes: "" };

export function RequestQuoteForm() {
  const [values, setValues] = useState(initial);
  const [prepared, setPrepared] = useState(false);
  const update = (key: keyof typeof initial, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setPrepared(false);
  };

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
      <form onSubmit={submit} className="space-y-8">
        <section>
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted">01 / COMPANY & CONTACT</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] font-bold tracking-[0.1em]">COMPANY NAME<Input required value={values.company} onChange={(e) => update("company", e.target.value)} placeholder="Company or trading name" className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em]">CONTACT PERSON<Input required value={values.contact} onChange={(e) => update("contact", e.target.value)} placeholder="Full name" className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em]">BUSINESS EMAIL<Input required type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em]">COUNTRY / REGION<Input required value={values.country} onChange={(e) => update("country", e.target.value)} placeholder="Country or region" className="mt-2" /></label>
          </div>
        </section>

        <section className="border-t border-line pt-7">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted">02 / PRODUCT REQUIREMENTS</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] font-bold tracking-[0.1em] sm:col-span-2">PRODUCT / MODEL / SPECIFICATION<Input required value={values.product} onChange={(e) => update("product", e.target.value)} placeholder="Wheel model, diameter, width, PCD, finish…" className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em]">ESTIMATED QUANTITY<Input required type="number" min="1" value={values.quantity} onChange={(e) => update("quantity", e.target.value)} className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em]">TRADE TERM<select value={values.incoterm} onChange={(e) => update("incoterm", e.target.value)} className="mt-2 h-12 w-full border border-line-strong bg-white px-4 text-sm font-light text-ink focus:border-brand focus:outline-none"><option>EXW</option><option>FCA</option><option>FOB</option><option>CFR</option><option>CIF</option><option>DAP</option><option>DPU</option><option>DDP</option><option>TO BE DISCUSSED</option></select></label>
            <label className="text-[10px] font-bold tracking-[0.1em] sm:col-span-2">DESTINATION PORT / CITY<Input value={values.destination} onChange={(e) => update("destination", e.target.value)} placeholder="Port, city and postal code if known" className="mt-2" /></label>
            <label className="text-[10px] font-bold tracking-[0.1em] sm:col-span-2">ADDITIONAL REQUIREMENTS<textarea value={values.notes} onChange={(e) => update("notes", e.target.value)} rows={4} placeholder="Target market, packaging, certification requests, delivery schedule…" className="mt-2 w-full border border-line-strong bg-white px-4 py-3 text-sm font-light text-ink outline-none placeholder:text-muted focus:border-brand" /></label>
          </div>
        </section>
        <Button type="submit">PREPARE RFQ SUMMARY <ArrowRight size={15} /></Button>
      </form>

      <aside className="h-fit bg-[#1a2129] p-6 text-white sm:p-8">
        <p className="text-[10px] font-bold tracking-[0.18em] text-white/50">RFQ / REQUEST FOR QUOTATION</p>
        <h2 className="mt-5 text-2xl font-bold text-white">YOUR TRADE BRIEF.</h2>
        <p className="mt-4 text-xs font-light leading-6 text-white/65">Prepare a structured enquiry with the product, quantity and destination details needed for a quotation discussion.</p>
        {prepared ? (
          <div className="mt-8 border-t border-white/20 pt-6" aria-live="polite">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/50">DRAFT READY</p>
            <dl className="mt-4 space-y-3 text-xs">
              {([["COMPANY", values.company], ["CONTACT", values.contact], ["EMAIL", values.email], ["COUNTRY", values.country], ["PRODUCT", values.product], ["QUANTITY", values.quantity], ["TRADE TERM", values.incoterm], ["DESTINATION", values.destination || "To be confirmed"]] as const).map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-2"><dt className="text-white/45">{label}</dt><dd className="text-right font-light text-white">{value}</dd></div>)}
            </dl>
            <Button type="button" variant="inverse" className="mt-6 w-full" onClick={() => window.print()}><Printer size={15} /> PRINT / SAVE PDF</Button>
          </div>
        ) : (
          <div className="mt-8 border-t border-white/20 pt-6 text-xs font-light leading-6 text-white/55">Complete the form to preview your RFQ summary. You can then print or save the draft as a PDF.</div>
        )}
        <p className="mt-8 border-t border-white/20 pt-5 text-[10px] font-light leading-5 text-white/45">This page prepares a local enquiry draft only. It does not transmit your details or confirm a price, stock, order, shipping schedule or trade agreement.</p>
      </aside>
      <style jsx global>{`@media print { header, footer, form, aside > p, aside > h2, aside > div:not([aria-live]) { display: none !important; } aside { background: white !important; color: black !important; } aside * { color: black !important; } body { background: white !important; } }`}</style>
    </div>
  );
}
