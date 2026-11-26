"use client";
import { useMemo, useState } from "react";
import type { WheelItem } from "@/data/wheels";
import { wheelSpecs } from "@/data/wheel-specs";
export function ProductConfigurator({items}:{items:WheelItem[]}){
 const [activeId,setActiveId]=useState(items[0]?.id||"");
 const current=items.find(x=>x.id===activeId)||items[0];
 const [size,setSize]=useState(current?.sizes.split(" | ")[0]||"");
 const [activeImage,setActiveImage]=useState(items[0]?.image||"");
 const galleryImages=Array.from(new Set(items.flatMap(item=>[item.image,...(item.gallery||[])])));
 const sizes=current?.sizes.split(" | ")||[];
 const specRows=(wheelSpecs[current.slug]||[]).filter(spec=>spec.size===size&&current.lugs.split(/[ /]+/).includes(spec.lugCount));
 const finishes=Array.from(new Set(items.map(x=>x.finish)));
 const variantsByFinish=useMemo(()=>items.filter(x=>x.finish===current.finish),[items,current.finish]);
 const chooseVariant=(item:WheelItem)=>{setActiveId(item.id);setActiveImage(item.image);const next=item.sizes.split(" | ");if(!next.includes(size))setSize(next[0]);};
 const diameter=size.split("x")[0]||"—",width=size.split("x")[1]||"—";
 return <main className="mw-product-page">
  <div className="mw-breadcrumb">HOME / WHEELS / {current.style} {current.name}</div>
  <div className="mw-product-detail">
   <div className="mw-product-gallery">
    <div className="mw-product-main-image"><img src={activeImage||current.image} alt={current.style+" "+current.name+" "+current.finish}/></div>
    <div className="mw-product-gallery-strip">{galleryImages.map((src,i)=><button key={src} className={activeImage===src?"active":""} onClick={()=>setActiveImage(src)}><img src={src} alt={current.style+" "+current.name+" gallery image "+(i+1)}/></button>)}</div>
   </div>
   <section className="mw-product-information">
    <p className="mw-kicker">{current.style} / MAYHEM WHEELS</p><h1>{current.style} {current.name}</h1><p className="mw-finish">{current.finish}</p>
    <span className="mw-winter-tag">✳ WINTER APPROVED / CANADA ONLY</span>
    <hr/><h3>CHOOSE A FINISH</h3>
    <div className="mw-finish-choice">{finishes.map(f=><button key={f} className={current.finish===f?"active":""} onClick={()=>{const item=items.find(x=>x.finish===f)!;chooseVariant(item);}}>{f}</button>)}</div>
    <h3>CHOOSE A LUG CONFIGURATION</h3>
    <div className="mw-size-choice">{variantsByFinish.map(v=><button key={v.id} className={current.id===v.id?"active":""} onClick={()=>chooseVariant(v)}>{v.lugs}</button>)}</div>
    <h3>AVAILABLE SIZES</h3>
    <div className="mw-size-choice">{sizes.map(s=><button key={s} className={size===s?"active":""} onClick={()=>setSize(s)}>{s}</button>)}</div>
    <div className="mw-product-price">{diameter}" DIAMETER <span> / </span> {width}" WIDTH</div>
    <div className="mw-product-buttons"><a href={"/visualizer?style="+encodeURIComponent(current.slug)} className="mw-button mw-button-dark">VIEW ON VEHICLE ↗</a><a href="https://mayhemwheels.com/pages/dealers" target="_blank" rel="noreferrer" className="mw-button mw-button-light">FIND A DEALER ↗</a></div>
    <p className="mw-product-note">This page lists the published style, finish, lug configuration and available sizes. A matching lug count or diameter does not confirm vehicle fitment. Confirm the exact part number, bolt pattern, offset, hub bore, load rating and brake clearance with your dealer before ordering.</p>
   </section>
  </div>
  <section className="mw-product-description"><p className="mw-kicker">MAYHEM / DESIGN & ENGINEERING</p><h2>{current.style} {current.name}</h2><p>Mayhem wheels are designed for truck, Jeep and SUV applications, combining distinctive styling with a broad range of sizes and fitments. Explore the available finishes and configurations, then confirm the exact setup with an authorized retailer.</p></section>
  <section className="mw-spec-table"><div><p className="mw-kicker">CONFIGURATION</p><h2>Selected wheel</h2><p>Published catalog information for the selected finish and lug configuration.</p></div>
   <div className="mw-product-configuration"><div><span>STYLE</span><strong>{current.style} {current.name}</strong></div><div><span>FINISH</span><strong>{current.finish}</strong></div><div><span>LUG CONFIGURATION</span><strong>{current.lugs}</strong></div><div><span>AVAILABLE SIZES</span><strong>{current.sizes}</strong></div></div>
   {specRows.length>0?<div className="mw-table-scroll"><table><thead><tr>{["PART NUMBER","SIZE","BOLT PATTERN","OFFSET","HUB BORE","LOAD RATING","BACKSPACE"].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{specRows.map(row=><tr key={row.partNumber}><td>{row.partNumber}</td><td>{row.size}</td><td>{row.boltPattern}</td><td>{row.offset}</td><td>{row.hubBore}</td><td>{row.loadRating}</td><td>{row.backspace}</td></tr>)}</tbody></table></div>:<p className="mw-product-note">No SKU-level specification rows are published here for this selected size and lug configuration. Request the exact current specification sheet from a Mayhem dealer.</p>}
  </section>
 </main>
}
