"use client";
import { useEffect, useMemo, useState } from "react";
import { wheels, type WheelItem } from "@/data/wheels";
import { wheelSpecs } from "@/data/wheel-specs";
import { PSelect, PSelectOption } from "@porsche-design-system/components-react";

export function ProductConfigurator({items}:{items:WheelItem[]}){
 const initialItem=items.find(x=>x.slug===items[0]?.slug&&x.allWheels===false)||items[0];
 const [activeId,setActiveId]=useState(initialItem?.id||"");
 const current=items.find(x=>x.id===activeId)||items[0];
 const [size,setSize]=useState(current?.sizes.split(" | ")[0]||"");
 const [activeImage,setActiveImage]=useState(initialItem?.image||"");
 const [partNumber,setPartNumber]=useState("");
 const [setupSaved,setSetupSaved]=useState(false);
 const [compareAdded,setCompareAdded]=useState(false);
 const [setupOpen,setSetupOpen]=useState(false);
 const galleryImages=Array.from(new Set(items.flatMap(item=>[item.image,...(item.gallery||[])])));
 const sizes=current?.sizes.split(" | ")||[];
 const specRows=(wheelSpecs[current.slug]||[]).filter(spec=>spec.size===size&&current.lugs.split(/[ /]+/).includes(spec.lugCount));
 const selectedSpec=specRows.find(row=>row.partNumber===partNumber)||specRows[0];
 const finishes=Array.from(new Set(items.map(x=>x.finish)));
 const variantsByFinish=useMemo(()=>{const matches=items.filter(x=>x.finish===current.finish);const exact=matches.filter(x=>x.allWheels===false);return exact.length?exact:matches;},[items,current.finish]);
 const related=wheels.filter(x=>x.allWheels!==false&&x.style!==current.style&&x.category.some(category=>current.category.includes(category))).slice(0,4);
 useEffect(()=>{if(!specRows.length){setPartNumber("");return;}if(!specRows.some(row=>row.partNumber===partNumber))setPartNumber(specRows[0].partNumber);},[current.id,size,specRows,partNumber]);
 const chooseVariant=(item:WheelItem)=>{setActiveId(item.id);setActiveImage(item.image);setSetupSaved(false);setCompareAdded(false);const next=item.sizes.split(" | ");if(!next.includes(size))setSize(next[0]);setPartNumber("");};
 const saveSetup=()=>{let vehicle:null|Record<string,string>=null;const raw=localStorage.getItem("mayhem-vehicle");if(raw){try{vehicle=JSON.parse(raw);}catch{localStorage.removeItem("mayhem-vehicle");}}localStorage.setItem("mayhem-setup",JSON.stringify({vehicle,wheelId:current.id,slug:current.slug,size,partNumber:selectedSpec?.partNumber||partNumber}));setSetupSaved(true);};
 const shareSetup=()=>{const url=new URL(window.location.href);url.searchParams.set("size",size);if(selectedSpec?.partNumber)url.searchParams.set("partNumber",selectedSpec.partNumber);navigator.clipboard?.writeText(url.toString());};
 const addCompare=()=>{let ids:string[]=[];const raw=localStorage.getItem("mayhem-compare");if(raw){try{ids=JSON.parse(raw);}catch{localStorage.removeItem("mayhem-compare");}}if(!ids.includes(current.id))ids.push(current.id);localStorage.setItem("mayhem-compare",JSON.stringify(ids));setCompareAdded(true);};
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
    <div className="mw-size-choice">{sizes.map(s=><button key={s} className={size===s?"active":""} onClick={()=>{setSize(s);setSetupSaved(false);}}>{s}</button>)}</div>
    <div className="mw-product-price">{diameter}" DIAMETER <span> / </span> {width}" WIDTH</div>
    {specRows.length>0&&<div className="mw-product-part-number"><PSelect label="CHOOSE CONFIGURATION" value={selectedSpec?.partNumber||""} onChange={e=>{setPartNumber(e.detail.value);setSetupSaved(false);}}>{specRows.map(row=><PSelectOption key={row.partNumber} value={row.partNumber}>{row.partNumber} / {row.boltPattern}</PSelectOption>)}</PSelect><button onClick={()=>selectedSpec&&navigator.clipboard?.writeText(selectedSpec.partNumber)}>COPY PART NUMBER ↗</button></div>}
    <div className="mw-product-buttons"><a href={"/visualizer?style="+encodeURIComponent(current.slug)+"&size="+encodeURIComponent(size)} className="mw-button mw-button-dark">VIEW ON VEHICLE ↗</a><a href="https://mayhemwheels.com/pages/dealers" target="_blank" rel="noreferrer" className="mw-button mw-button-light">FIND A DEALER ↗</a></div>
    <div className="mw-product-setup-actions"><button onClick={saveSetup}>{setupSaved?"SETUP SAVED ✓":"SAVE SETUP"}</button><button onClick={shareSetup}>SHARE SETUP ↗</button><button onClick={addCompare}>{compareAdded?"ADDED TO COMPARE ✓":"COMPARE +"}</button><button onClick={()=>setSetupOpen(true)}>SETUP DETAILS / PRINT</button></div>
    <p className="mw-product-note">This page lists the published style, finish, lug configuration and available sizes. A matching lug count or diameter does not confirm vehicle fitment. Confirm the exact part number, bolt pattern, offset, hub bore, load rating and brake clearance with your dealer before selecting a retailer.</p>
   </section>
  </div>
  <section className="mw-product-description"><p className="mw-kicker">MAYHEM / DESIGN & ENGINEERING</p><h2>{current.style} {current.name}</h2><p>{current.description||"Mayhem wheels are designed for truck, Jeep and SUV applications, combining distinctive styling with a broad range of sizes and fitments. Explore the available finishes and configurations, then confirm the exact setup with an authorized retailer."}</p></section>
  <section className="mw-spec-table"><div><p className="mw-kicker">CONFIGURATION</p><h2>Selected wheel</h2><p>Published catalog information for the selected finish and lug configuration.</p></div>
   <div className="mw-product-configuration"><div><span>STYLE</span><strong>{current.style} {current.name}</strong></div><div><span>FINISH</span><strong>{current.finish}</strong></div><div><span>LUG CONFIGURATION</span><strong>{current.lugs}</strong></div><div><span>AVAILABLE SIZES</span><strong>{current.sizes}</strong></div></div>
   {specRows.length>0?<div className="mw-table-scroll"><table><thead><tr>{["PART NUMBER","SIZE","BOLT PATTERN","OFFSET","HUB BORE","LOAD RATING","BACKSPACE"].map(x=><th key={x}>{x}</th>)}</tr></thead><tbody>{specRows.filter(row=>!selectedSpec||row.partNumber===selectedSpec.partNumber).map(row=><tr key={row.partNumber}><td>{row.partNumber}</td><td>{row.size}</td><td>{row.boltPattern}</td><td>{row.offset}</td><td>{row.hubBore}</td><td>{row.loadRating}</td><td>{row.backspace}</td></tr>)}</tbody></table></div>:<p className="mw-product-note">No SKU-level specification rows are published here for this selected size and lug configuration. Request the exact current specification sheet from a Mayhem dealer.</p>}
  </section>
  {related.length>0&&<section className="mw-related-wheels"><p className="mw-kicker">MAYHEM / MORE STYLES</p><h2>Other wheels to explore.</h2><div>{related.map(item=><a href={"/products/"+item.slug} key={item.id}><img src={item.image} alt={item.style+" "+item.name}/><span>{item.style} {item.name}</span><small>{item.finish}</small></a>)}</div></section>}
  {setupOpen&&<div className="mw-setup-modal" role="dialog" aria-modal="true" aria-label="Wheel setup details"><section><button className="mw-setup-close" onClick={()=>setSetupOpen(false)} aria-label="Close setup details">×</button><p className="mw-kicker">YOUR MAYHEM SETUP</p><h2>{current.style} {current.name}</h2><p>{current.finish} / {current.lugs}</p><div className="mw-setup-details-grid"><div><span>SIZE</span><strong>{size}</strong></div><div><span>PART NUMBER</span><strong>{selectedSpec?.partNumber||"Select a configuration"}</strong></div><div><span>BOLT PATTERN</span><strong>{selectedSpec?.boltPattern||"See dealer"}</strong></div><div><span>OFFSET</span><strong>{selectedSpec?.offset||"See dealer"}</strong></div><div><span>CENTRE BORE</span><strong>{selectedSpec?.hubBore||"See dealer"}</strong></div><div><span>LOAD RATING</span><strong>{selectedSpec?.loadRating||"See dealer"}</strong></div></div><div className="mw-product-buttons"><button className="mw-button mw-button-dark" onClick={()=>window.print()}>PRINT SETUP →</button><button className="mw-button mw-button-light" onClick={()=>setSetupOpen(false)}>CLOSE</button></div></section></div>}
 </main>
}
