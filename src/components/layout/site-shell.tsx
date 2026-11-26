"use client";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
const links=[
 {label:"ALL WHEELS",href:"/wheels"},{label:"STREET",href:"/wheels?category=street"},{label:"TRAIL",href:"/wheels?category=trail"},{label:"DUALLY",href:"/wheels?category=dually"},{label:"COLOR SERIES",href:"/wheels?category=color-series"},{label:"NEW ARRIVALS",href:"/wheels?sort=new"}
];
const options={
 year:["2026","2025","2024","2023","2022","2021","2020","2019","2018"],
 make:["Chevrolet","Ford","GMC","Jeep","Ram","Toyota"],
 model:["1500","F-150","F-250","F-350","Silverado 1500","Silverado 2500HD","Sierra 1500","Sierra 2500HD","Wrangler","Gladiator","Ram 1500","Ram 2500","Tundra","Tacoma"],
 trim:["Base","XL","XLT","Lariat","King Ranch","Platinum","Limited","LT","LTZ","High Country","SLT","AT4","Denali","TRD Pro","Rubicon"],
 body:["Crew Cab","SuperCrew","Regular Cab","Double Cab","CrewMax","Short Bed","Long Bed"]
};
type Vehicle={year:string;make:string;model:string;trim:string;body:string};
const emptyVehicle:Vehicle={year:"2025",make:"Ford",model:"F-150",trim:"Lariat",body:"Crew Cab"};
type AccessPrefs={textSize:"small"|"normal"|"large"|"xlarge";highContrast:boolean;reduceMotion:boolean;highlightLinks:boolean;readableFont:boolean;moreSpacing:boolean};
const defaultAccess:AccessPrefs={textSize:"normal",highContrast:false,reduceMotion:false,highlightLinks:false,readableFont:false,moreSpacing:false};
const modelsByMake:Record<string,string[]>={Chevrolet:["Silverado 1500","Silverado 2500HD"],Ford:["F-150","F-250","F-350"],GMC:["Sierra 1500","Sierra 2500HD"],Jeep:["Wrangler","Gladiator"],Ram:["Ram 1500","Ram 2500"],Toyota:["Tundra","Tacoma"]};
export function SiteShell({children}:{children:ReactNode}){
 const [menuOpen,setMenuOpen]=useState(false),[vehicleOpen,setVehicleOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[query,setQuery]=useState("");
 const [vehicle,setVehicle]=useState<Vehicle>(emptyVehicle),[vehicleSaved,setVehicleSaved]=useState(false);
 const [accessOpen,setAccessOpen]=useState(false),[access,setAccess]=useState<AccessPrefs>(defaultAccess),[supportOpen,setSupportOpen]=useState(false);
 useEffect(()=>{
  const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMenuOpen(false);setVehicleOpen(false);setSearchOpen(false);setSupportOpen(false);}};
  window.addEventListener("keydown",close);
  const accessRaw=localStorage.getItem("mayhem-accessibility");
  if(accessRaw){try{setAccess(JSON.parse(accessRaw) as AccessPrefs);}catch{localStorage.removeItem("mayhem-accessibility");}}
  const raw=localStorage.getItem("mayhem-vehicle");
  if(raw){try{setVehicle(JSON.parse(raw) as Vehicle);setVehicleSaved(true);}catch{localStorage.removeItem("mayhem-vehicle");}}
  return()=>window.removeEventListener("keydown",close);
 },[]);
 useEffect(()=>{localStorage.setItem("mayhem-accessibility",JSON.stringify(access));const root=document.documentElement;root.dataset.textSize=access.textSize;root.classList.toggle("mw-high-contrast",access.highContrast);root.classList.toggle("mw-reduce-motion",access.reduceMotion);root.classList.toggle("mw-highlight-links",access.highlightLinks);root.classList.toggle("mw-readable-font",access.readableFont);root.classList.toggle("mw-more-spacing",access.moreSpacing);},[access]);
 const saveVehicle=(event:FormEvent)=>{event.preventDefault();localStorage.setItem("mayhem-vehicle",JSON.stringify(vehicle));setVehicleSaved(true);setVehicleOpen(false);};
 const vehicleLabel=vehicleSaved?vehicle.year+" "+vehicle.make+" "+vehicle.model:"SELECT VEHICLE";
 return <>
  <div className="mw-utility"><a href="/dealers">BECOME A DEALER</a><a href="/dealers">FIND A DEALER</a><a href="/contact">CONTACT US</a></div>
  <header className="mw-header">
   <button className="mw-menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><span/><span/><span/></button>
   <a className="mw-wordmark" href="/" aria-label="Mayhem Wheels home">MAYHEM<span>WHEELS</span></a>
   <nav className="mw-nav" aria-label="Main navigation"><div className="mw-nav-group"><a href="/wheels">WHEELS <span>⌄</span></a><div className="mw-dropdown">{links.map(item=><a key={item.label} href={item.href}>{item.label}</a>)}</div></div><a href="/visualizer">VISUALIZER</a><a href="/dealers">FIND A DEALER</a><a href="https://www.shoptwggear.com">MERCH</a></nav>
   <div className="mw-header-actions"><button onClick={()=>setSearchOpen(!searchOpen)} aria-label="Search" className="mw-icon-button">⌕</button><button onClick={()=>setVehicleOpen(true)} className="mw-vehicle-button"><span className="mw-vehicle-icon">＋</span>{vehicleLabel}</button><a href="/garage" className="mw-garage-link">MY GARAGE</a></div>
   {searchOpen&&<form className="mw-search" onSubmit={e=>{e.preventDefault();window.location.href="/wheels?q="+encodeURIComponent(query);}}><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search wheels, styles and part numbers"/><button type="submit">SEARCH →</button></form>}
  </header>
  {menuOpen&&<div className="mw-mobile-menu">{links.map(item=><a key={item.label} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}<span>↗</span></a>)}<a href="/visualizer" onClick={()=>setMenuOpen(false)}>VISUALIZER<span>↗</span></a><a href="/dealers" onClick={()=>setMenuOpen(false)}>FIND A DEALER<span>↗</span></a><button onClick={()=>{setVehicleOpen(true);setMenuOpen(false);}}>SELECT YOUR VEHICLE →</button></div>}
  {vehicleOpen&&<div className="mw-modal-backdrop" onClick={()=>setVehicleOpen(false)}><section className="mw-vehicle-modal" onClick={e=>e.stopPropagation()}><button className="mw-modal-close" onClick={()=>setVehicleOpen(false)} aria-label="Close">×</button><p className="mw-kicker">YOUR VEHICLE</p><h2>Find your fit.</h2><p>Save your vehicle to keep it available while you explore the Mayhem collection.</p><form onSubmit={saveVehicle}><div className="mw-vehicle-fields">{(["year","make","model","trim","body"] as const).map(key=><label key={key}>{key==="body"?"BODY / BED":key.toUpperCase()}<select value={vehicle[key]} onChange={e=>setVehicle(v=>({...v,[key]:e.target.value,...(key==="make"?{model:modelsByMake[e.target.value][0]}:{})}))}>{(key==="model"?modelsByMake[vehicle.make]:options[key]).map(v=><option key={v}>{v}</option>)}</select></label>)}</div><button type="submit" className="mw-button mw-button-dark">SAVE VEHICLE →</button></form><p className="mw-modal-note">Vehicle selection is saved locally. Live vehicle-to-wheel fitment verification is not connected yet; confirm exact part number, bolt pattern, offset and clearance with a dealer.</p>{vehicleSaved&&<button className="mw-clear-vehicle" onClick={()=>{localStorage.removeItem("mayhem-vehicle");setVehicle(emptyVehicle);setVehicleSaved(false);}}>CLEAR SAVED VEHICLE</button>}</section></div>}
  {children}
  <SiteFooter/>
  <button className="mw-support-launcher" onClick={()=>setSupportOpen(v=>!v)} aria-label="Contact Mayhem support" aria-expanded={supportOpen}>?</button>
  {supportOpen&&<section className="mw-support-panel" aria-label="Mayhem support"><button className="mw-accessibility-close" onClick={()=>setSupportOpen(false)} aria-label="Close support">×</button><p className="mw-kicker">MAYHEM SUPPORT</p><h2>Contact our team.</h2><p>Tell us how we can help. Our team will reply by email.</p><div className="mw-support-options"><a href="/fitment">WHAT FITS MY VEHICLE? <span>›</span></a><a href="/warranty">WARRANTY / DAMAGED WHEEL <span>›</span></a><a href="/contact?topic=product">PRODUCT QUESTION <span>›</span></a><a href="/dealers">FIND A DEALER <span>›</span></a><a href="/contact">SOMETHING ELSE <span>›</span></a></div><a className="mw-button mw-button-dark" href="mailto:customerservice@mayhemwheels.com">EMAIL CUSTOMER SUPPORT →</a><p className="mw-modal-note">AI-assisted product information can be incomplete. Confirm fitment and installation with a qualified professional.</p></section>}
  <button className="mw-accessibility-launcher" onClick={()=>setAccessOpen(v=>!v)} aria-label="Accessibility options" aria-expanded={accessOpen}>♿</button>
  {accessOpen&&<section className="mw-accessibility-panel" aria-label="Accessibility options"><button className="mw-accessibility-close" onClick={()=>setAccessOpen(false)} aria-label="Close accessibility options">×</button><p className="mw-kicker">ACCESSIBILITY OPTIONS</p><h2>Adjust your experience.</h2><label>TEXT SIZE<select value={access.textSize} onChange={e=>setAccess(a=>({...a,textSize:e.target.value as AccessPrefs["textSize"]}))}><option value="small">Small</option><option value="normal">Normal</option><option value="large">Large</option><option value="xlarge">Extra large</option></select></label><div className="mw-accessibility-toggles">{([{key:"highContrast",label:"High contrast"},{key:"reduceMotion",label:"Reduce motion"},{key:"highlightLinks",label:"Highlight links"},{key:"readableFont",label:"Readable font"},{key:"moreSpacing",label:"More text spacing"}] as const).map(item=><button key={item.key} aria-pressed={access[item.key]} className={access[item.key]?"active":""} onClick={()=>setAccess(a=>({...a,[item.key]:!a[item.key]}))}>{item.label}<span>{access[item.key]?"ON":"OFF"}</span></button>)}</div><button className="mw-accessibility-reset" onClick={()=>setAccess(defaultAccess)}>RESET PREFERENCES</button></section>}
 </>;
}
