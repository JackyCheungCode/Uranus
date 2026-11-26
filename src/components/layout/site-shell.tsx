"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { VehicleFitmentPicker } from "@/components/fitment/vehicle-fitment-picker";
import { PInputSearch } from "@porsche-design-system/components-react";
const links=[
 {label:"ALL WHEELS",href:"/wheels"},{label:"STREET",href:"/wheels?category=street"},{label:"TRAIL",href:"/wheels?category=trail"},{label:"DUALLY",href:"/wheels?category=dually"},{label:"COLOR SERIES",href:"/wheels?category=color-series"},{label:"NEW ARRIVALS",href:"/wheels?sort=new"}
];
type Vehicle={year:string;make:string;model:string;trim:string;body:string};
const emptyVehicle:Vehicle={year:"",make:"",model:"",trim:"",body:""};
export function SiteShell({children}:{children:ReactNode}){
 const [menuOpen,setMenuOpen]=useState(false),[vehicleOpen,setVehicleOpen]=useState(false),[searchOpen,setSearchOpen]=useState(false),[query,setQuery]=useState("");
 const [vehicle,setVehicle]=useState<Vehicle>(emptyVehicle),[vehicleSaved,setVehicleSaved]=useState(false);
 const [supportOpen,setSupportOpen]=useState(false);
 useEffect(()=>{
  const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMenuOpen(false);setVehicleOpen(false);setSearchOpen(false);setSupportOpen(false);}};
  window.addEventListener("keydown",close);
  const raw=localStorage.getItem("mayhem-vehicle");
  if(raw){try{setVehicle(JSON.parse(raw) as Vehicle);setVehicleSaved(true);}catch{localStorage.removeItem("mayhem-vehicle");}}
  return()=>window.removeEventListener("keydown",close);
 },[]);
 const vehicleLabel=vehicleSaved?vehicle.year+" "+vehicle.make+" "+vehicle.model:"FIND YOUR FIT";
 return <>
  
  <header className="mw-header">
   <button className="mw-menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><span/><span/><span/></button>
   <a className="mw-wordmark" href="/" aria-label="Uranus home">URANUS</a>
   <nav className="mw-nav" aria-label="Main navigation"><div className="mw-nav-group"><a href="/wheels">WHEELS <span>⌄</span></a><div className="mw-dropdown">{links.map(item=><a key={item.label} href={item.href}>{item.label}</a>)}</div></div><a href="/visualizer">VISUALIZER</a><a href="/dealers">FIND A DEALER</a></nav>
   <div className="mw-header-actions"><button onClick={()=>setSearchOpen(!searchOpen)} aria-label="Search" className="mw-icon-button">⌕</button><button onClick={()=>setVehicleOpen(true)} className="mw-vehicle-button"><span className="mw-vehicle-icon">＋</span>{vehicleSaved?vehicleLabel:"FIND YOUR FIT"}</button><a href="/garage" className="mw-garage-link">MY GARAGE</a></div>
   {searchOpen&&<form className="mw-search" onSubmit={e=>{e.preventDefault();window.location.href="/wheels?q="+encodeURIComponent(query);}}><PInputSearch autoFocus label="SEARCH WHEELS" hideLabel value={query} onInput={e=>setQuery((e.detail.target as HTMLInputElement).value)} placeholder="Search wheels, styles and part numbers" clear/><button type="submit">SEARCH →</button></form>}
  </header>
  {menuOpen&&<div className="mw-mobile-menu">{links.map(item=><a key={item.label} href={item.href} onClick={()=>setMenuOpen(false)}>{item.label}<span>↗</span></a>)}<a href="/visualizer" onClick={()=>setMenuOpen(false)}>VISUALIZER<span>↗</span></a><a href="/dealers" onClick={()=>setMenuOpen(false)}>FIND A DEALER<span>↗</span></a><button onClick={()=>{setVehicleOpen(true);setMenuOpen(false);}}>SELECT YOUR VEHICLE →</button></div>}
  {vehicleOpen&&<VehicleFitmentPicker initialVehicle={vehicleSaved?vehicle:null} onClose={()=>setVehicleOpen(false)} onSave={v=>{setVehicle(v);setVehicleSaved(true);}}/>}
  {children}
  <SiteFooter/>
  <button className="mw-support-launcher" onClick={()=>setSupportOpen(v=>!v)} aria-label="Contact Uranus support" aria-expanded={supportOpen}>?</button>
  {supportOpen&&<section className="mw-support-panel" aria-label="Mayhem support"><button className="mw-accessibility-close" onClick={()=>setSupportOpen(false)} aria-label="Close support">×</button><p className="mw-kicker">URANUS SUPPORT</p><h2>Contact our team.</h2><p>Tell us how we can help. Our team will reply by email.</p><div className="mw-support-options"><a href="/fitment">WHAT FITS MY VEHICLE? <span>›</span></a><a href="/warranty">WARRANTY / DAMAGED WHEEL <span>›</span></a><a href="/contact?topic=product">PRODUCT QUESTION <span>›</span></a><a href="/dealers">FIND A DEALER <span>›</span></a><a href="/contact">SOMETHING ELSE <span>›</span></a></div><a className="mw-button mw-button-dark" href="mailto:customerservice@mayhemwheels.com">EMAIL CUSTOMER SUPPORT →</a><p className="mw-modal-note">AI-assisted product information can be incomplete. Confirm fitment and installation with a qualified professional.</p></section>}

 </>;
}
