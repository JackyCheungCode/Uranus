"use client";
import { useEffect, useMemo, useState } from "react";
import { wheels } from "@/data/wheels";
import { wheelSpecs } from "@/data/wheel-specs";
const scenes=[
 {name:"STREET",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800"},
 {name:"TRAIL",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800"},
 {name:"DUALLY",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem_Dually_8107D_CogentDually.jpg?v=1791914232&width=1800"}
];
const years=["2026","2025","2024","2023","2022","2021","2020","2019","2018"];
const makes=["Ford","Chevrolet","GMC","Ram","Jeep","Toyota"];
const models:Record<string,string[]>={Ford:["F-150","F-250","F-350","Ranger"],Chevrolet:["Silverado 1500","Silverado 2500HD","Colorado"],GMC:["Sierra 1500","Sierra 2500HD","Canyon"],Ram:["1500","2500","3500"],Jeep:["Wrangler","Gladiator"],Toyota:["Tacoma","Tundra","4Runner"]};
export default function VisualizerPage(){
 const [vehicle,setVehicle]=useState({year:"2025",make:"Ford",model:"F-150",trim:"Lariat",body:"Crew Cab"});
 const [wheelId,setWheelId]=useState(wheels.find(w=>w.allWheels!==false)?.id||wheels[0].id),[size,setSize]=useState(wheels[0].sizes.split(" | ")[0]),[partNumber,setPartNumber]=useState(""),[scene,setScene]=useState(0),[color,setColor]=useState("BLACK"),[height,setHeight]=useState("LEVEL"),[tire,setTire]=useState("35"),[background,setBackground]=useState("DAYLIGHT"),[mode,setMode]=useState("MAYHEM"),[vehicleSaved,setVehicleSaved]=useState(false),[setupSaved,setSetupSaved]=useState(false);
 const selected=wheels.find(w=>w.id===wheelId)||wheels.find(w=>w.allWheels!==false)||wheels[0];
 const availableWheels=wheels.filter(w=>w.allWheels!==false);
 const sameStyle=useMemo(()=>availableWheels.filter(w=>w.style===selected.style),[selected.style]);
 const specRows=(wheelSpecs[selected.slug]||[]).filter(spec=>spec.size===size&&selected.lugs.split(/[ /]+/).includes(spec.lugCount));
 const selectedSpec=specRows.find(spec=>spec.partNumber===partNumber)||specRows[0];
 useEffect(()=>{const options=selected.sizes.split(" | ");if(!options.includes(size))setSize(options[0]);setPartNumber("");},[selected.id]);
 useEffect(()=>{if(specRows.length>0&&!specRows.some(spec=>spec.partNumber===partNumber))setPartNumber(specRows[0].partNumber);},[selected.id,size,specRows,partNumber]);
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const slug=params.get("style");const requestedSize=params.get("size");const vehicleRaw=localStorage.getItem("mayhem-vehicle");const setupRaw=localStorage.getItem("mayhem-setup");let setup:{vehicle?:typeof vehicle;wheelId?:string;size?:string;partNumber?:string}|null=null;if(setupRaw){try{setup=JSON.parse(setupRaw);}catch{localStorage.removeItem("mayhem-setup");}}if(setup?.vehicle)setVehicle(setup.vehicle);else if(vehicleRaw){try{setVehicle(JSON.parse(vehicleRaw));}catch{localStorage.removeItem("mayhem-vehicle");}}const found=slug?wheels.find(w=>w.slug===slug&&w.allWheels!==false):wheels.find(w=>w.id===setup?.wheelId);if(found){setWheelId(found.id);const nextSize=requestedSize||setup?.size;if(nextSize&&found.sizes.split(" | ").includes(nextSize))setSize(nextSize);if(setup?.partNumber)setPartNumber(setup.partNumber);}},[]);
 const saveVehicle=()=>{localStorage.setItem("mayhem-vehicle",JSON.stringify(vehicle));setVehicleSaved(true);};
 const saveSetup=()=>{localStorage.setItem("mayhem-setup",JSON.stringify({vehicle,wheelId,size,partNumber,scene,color,height,tire,background}));setSetupSaved(true);};
 const share=()=>{const url=window.location.origin+"/visualizer?style="+encodeURIComponent(selected.slug)+"&size="+encodeURIComponent(size);if(navigator.clipboard?.writeText)navigator.clipboard.writeText(url);};
 return <main className="mw-visualizer"><div className="mw-breadcrumb">HOME / VISUALIZER</div>
  <header className="mw-catalog-heading"><p className="mw-kicker">BUILT FOR YOUR DRIVE</p><h1>SEE MAYHEM ON YOUR TRUCK.</h1><p>Choose your vehicle, then explore wheel styles, finishes and sizes.</p></header>
  <div className="mw-visualizer-layout">
   <aside className="mw-visualizer-controls"><p className="mw-kicker">01 / YOUR VEHICLE</p><h2>Find your fit.</h2>
    {(["year","make","model","trim","body"] as const).map(key=><label key={key}>{key.toUpperCase()}<select value={vehicle[key]} onChange={e=>{setVehicle(v=>({...v,[key]:e.target.value,...(key==="make"?{model:models[e.target.value][0]}:{})}));setVehicleSaved(false);setSetupSaved(false);}}>{(key==="year"?years:key==="make"?makes:key==="model"?models[vehicle.make]:key==="trim"?["XL","XLT","Lariat","King Ranch","Platinum","Limited","TRD Pro","Rubicon"]:["Crew Cab","SuperCrew","Regular Cab","Double Cab","CrewMax","Short Bed","Long Bed"]).map(v=><option key={v}>{v}</option>)}</select></label>)}
    <button className="mw-button mw-button-dark" onClick={saveVehicle}>{vehicleSaved?"VEHICLE SAVED ✓":"SAVE VEHICLE →"}</button>
    <p className="mw-modal-note">Vehicle details are saved locally. This preview does not query a live fitment database.</p>
    <p className="mw-kicker mw-viz-space">02 / CUSTOMIZE PREVIEW</p>
    <label>VEHICLE COLOR<select value={color} onChange={e=>setColor(e.target.value)}>{["BLACK","WHITE","GREY","RED","BLUE"].map(v=><option key={v}>{v}</option>)}</select></label>
    <label>RIDE HEIGHT<select value={height} onChange={e=>setHeight(e.target.value)}><option>STOCK</option><option>LEVEL</option><option>LIFTED</option></select></label>
    <label>TIRE SIZE PREVIEW<select value={tire} onChange={e=>setTire(e.target.value)}><option value="33">33 INCH</option><option value="35">35 INCH</option><option value="37">37 INCH</option><option value="40">40 INCH</option></select></label>
    <label>BACKGROUND<select value={background} onChange={e=>setBackground(e.target.value)}><option>DAYLIGHT</option><option>STUDIO</option><option>DARK</option></select></label>
   </aside>
   <section className="mw-visualizer-stage">
    <div className="mw-visualizer-top"><span>{vehicle.year} {vehicle.make} {vehicle.model} / {vehicle.trim}</span><span>ILLUSTRATIVE SIDE PROFILE</span></div>
    <div className={"mw-truck-preview color-"+color.toLowerCase()+" height-"+height.toLowerCase()+" bg-"+background.toLowerCase()+" tire-"+tire}>
     <img className="mw-visualizer-scene" src={scenes[scene].image} alt={scenes[scene].name+" Mayhem truck scene"}/>
     <div className="mw-vehicle-color-tint"/>
     {mode==="MAYHEM"&&<><div className="mw-preview-wheel wheel-front"><img src={selected.image} alt={selected.style+" "+selected.name+" wheel preview"}/></div><div className="mw-preview-wheel wheel-rear"><img src={selected.image} alt=""/></div></>}
     <span className="mw-preview-mode">{mode==="MAYHEM"?"MAYHEM SETUP":"STOCK IMAGE"}</span>
    </div>
    <div className="mw-scene-switch">{scenes.map((s,i)=><button key={s.name} className={scene===i?"active":""} onClick={()=>setScene(i)}>{s.name}</button>)}</div>
    <div className="mw-view-switch"><button className={mode==="MAYHEM"?"active":""} onClick={()=>setMode("MAYHEM")}>MY MAYHEM SETUP</button><button className={mode==="STOCK"?"active":""} onClick={()=>setMode("STOCK")}>STOCK IMAGE</button></div>
    <div className="mw-wheel-picker"><div><p className="mw-kicker">03 / WHEEL STYLE</p><h3>{selected.style} {selected.name}</h3><p>{selected.finish} / {selected.lugs}</p></div>
     <div className="mw-wheel-select"><select value={wheelId} onChange={e=>{setWheelId(e.target.value);setSetupSaved(false);}}>{availableWheels.map(w=><option key={w.id} value={w.id}>{w.style} {w.name} — {w.finish} — {w.lugs}</option>)}</select><select value={size} onChange={e=>{setSize(e.target.value);setPartNumber("");setSetupSaved(false);}}>{selected.sizes.split(" | ").map(v=><option key={v}>{v}</option>)}</select></div>
    </div>
    <div className="mw-wheel-options">{sameStyle.map(w=><button onClick={()=>{setWheelId(w.id);setSetupSaved(false);}} className={wheelId===w.id?"active":""} key={w.id}><img src={w.image} alt={w.finish}/><span>{w.finish} / {w.lugs}</span></button>)}</div>
    <section className="mw-viz-specs"><div className="mw-viz-specs-heading"><p className="mw-kicker">04 / TECHNICAL DETAILS</p><h3>Choose configuration.</h3></div>{specRows.length>0?<><label>PART NUMBER<select value={selectedSpec?.partNumber||""} onChange={e=>setPartNumber(e.target.value)}>{specRows.map(row=><option key={row.partNumber} value={row.partNumber}>{row.partNumber} / {row.boltPattern}</option>)}</select></label><button className="mw-copy-part" onClick={()=>selectedSpec&&navigator.clipboard?.writeText(selectedSpec.partNumber)}>COPY PART NUMBER ↗</button><div className="mw-viz-spec-grid"><div><span>PART NUMBER</span><strong>{selectedSpec?.partNumber}</strong></div><div><span>BOLT PATTERN</span><strong>{selectedSpec?.boltPattern}</strong></div><div><span>OFFSET</span><strong>{selectedSpec?.offset}</strong></div><div><span>CENTRE BORE</span><strong>{selectedSpec?.hubBore}</strong></div><div><span>LOAD RATING</span><strong>{selectedSpec?.loadRating}</strong></div><div><span>BACKSPACE</span><strong>{selectedSpec?.backspace}</strong></div></div></>:<p className="mw-visualizer-disclaimer">Exact SKU-level specifications are not yet available for this configuration. Ask a Mayhem dealer for the current specification sheet.</p>}</section>
    <div className="mw-visualizer-actions"><button className="mw-button mw-button-dark" onClick={saveSetup}>{setupSaved?"SETUP SAVED ✓":"SAVE SETUP"}</button><button className="mw-button mw-button-light" onClick={share}>SHARE SETUP ↗</button><button className="mw-button mw-button-light" onClick={()=>window.print()}>PRINT SETUP ↗</button><a className="mw-button mw-button-light" href={"/products/"+selected.slug}>VIEW THIS WHEEL ↗</a></div>
    <p className="mw-visualizer-disclaimer">This is an illustrative styling preview using Mayhem campaign photography and wheel imagery. Vehicle color, ride height and tire-size controls do not alter a 3D vehicle model. It does not confirm physical fitment. Verify part number, wheel size, offset, bolt pattern and clearance with a dealer.</p>
   </section>
  </div>
 </main>
}
