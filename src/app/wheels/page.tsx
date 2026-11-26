"use client";
import { useEffect, useMemo, useState } from "react";

const products = [
 {id:"8120",name:"HORIZON",finish:"GLOSS BLACK",sizes:"18x9 | 20x9 | 22x10",lugs:"6 Lug",category:"STREET",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem8120-6GB1.png?v=1789750229&width=1200",href:"/products/8120-horizon"},
 {id:"8121",name:"CYCLONE",finish:"GLOSS BLACK",sizes:"20x9 | 22x10",lugs:"6 / 8 Lug",category:"STREET",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem8121-6GB1.png?v=1789750230&width=1200",href:"/products/8121-cyclone"},
 {id:"8122",name:"BLIZZARD",finish:"GLOSS BLACK",sizes:"17x8.5 | 18x9 | 20x9",lugs:"6 / 8 Lug",category:"STREET",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem8122-6GB1-CAN.png?v=1791917407&width=1200",href:"/products/8122-blizzard"},
 {id:"8310",name:"VECTOR",finish:"GLOSS BLACK",sizes:"17x9 | 20x9",lugs:"6 / 8 Lug",category:"TRAIL",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem8310-6GB1.png?v=1789751560&width=1200",href:"/products/8310-vector"},
 {id:"8306",name:"RIDGELINE",finish:"SATIN BRONZE / BLACK LIP",sizes:"17x8.5 | 18x9 | 20x9",lugs:"5 / 6 / 8 Lug",category:"TRAIL",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1200",href:"/products/8306-ridgeline"},
 {id:"8107",name:"COGENT DUALLY",finish:"GLOSS BLACK",sizes:"17x6.5 | 20x8.25",lugs:"8 / 10 Lug",category:"DUALLY",image:"https://mayhemwheels.com/cdn/shop/files/Mayhem_Dually_8107D_CogentDually.jpg?v=1791914232&width=1200",href:"/products/8107-cogent-dually"},
];
const categories=["ALL WHEELS","STREET","TRAIL","DUALLY","COLOR SERIES","NEW ARRIVALS"];
export default function WheelsPage(){
 const [category,setCategory]=useState("ALL WHEELS"),[search,setSearch]=useState(""),[finish,setFinish]=useState("ALL"),[sort,setSort]=useState("FEATURED"),[compare,setCompare]=useState<string[]>([]);
 useEffect(()=>{const q=new URLSearchParams(window.location.search);const c=q.get("category");if(c){const normalized=c.toUpperCase().replace(/-/g," ");if(categories.includes(normalized))setCategory(normalized);}if(q.get("sort")==="new")setCategory("NEW ARRIVALS");},[]);
 const filtered=useMemo(()=>products.filter(p=>(category==="ALL WHEELS"||category==="NEW ARRIVALS"||p.category===category)&&(finish==="ALL"||p.finish.includes(finish))&&(p.name+" "+p.id+" "+p.finish).toLowerCase().includes(search.toLowerCase())).sort((a,b)=>sort==="A-Z"?a.name.localeCompare(b.name):sort==="Z-A"?b.name.localeCompare(a.name):0),[category,finish,search,sort]);
 return <main className="mw-catalog">
  <div className="mw-breadcrumb">HOME / WHEELS / <b>{category}</b></div>
  <header className="mw-catalog-heading"><p className="mw-kicker">MAYHEM / WHEEL COLLECTION</p><h1>{category==="ALL WHEELS"?"ALL WHEELS":category}</h1><p>Find the style, finish and fitment built for your drive.</p></header>
  <div className="mw-category-tabs">{categories.map(c=><button className={category===c?"active":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
  <div className="mw-catalog-layout">
   <aside className="mw-filters"><div className="mw-filter-head">FILTER & SORT <button onClick={()=>{setCategory("ALL WHEELS");setFinish("ALL");setSearch("");}}>CLEAR ALL</button></div>
    <div className="mw-filter-group"><h3>VEHICLE FITMENT</h3>{["All matching wheels","Factory size (OE)","Plus size","Minus size","Lifted","Staggered"].map(x=><label key={x}><input type="checkbox"/>{x}</label>)}<a href="/fitment">SELECT YOUR VEHICLE →</a></div>
    <div className="mw-filter-group"><h3>FINISH</h3>{["ALL","GLOSS BLACK","SATIN BRONZE","MATTE GUNMETAL"].map(x=><label key={x}><input type="radio" name="finish" checked={finish===x} onChange={()=>setFinish(x)}/>{x==="ALL"?"All finishes":x}</label>)}</div>
    <div className="mw-filter-group"><h3>DIAMETER (IN)</h3>{["17","18","20","22"].map(x=><label key={x}><input type="checkbox"/>{x}"</label>)}</div>
    <div className="mw-filter-group"><h3>BOLT PATTERN</h3>{["5-127","5-139.7","6-135","6-139.7","8-165.1","8-170","8-180"].map(x=><label key={x}><input type="checkbox"/>{x}</label>)}</div>
   </aside>
   <section className="mw-results"><div className="mw-results-toolbar"><span>{filtered.length} RESULTS</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search styles or part numbers"/><label>SORT BY <select value={sort} onChange={e=>setSort(e.target.value)}><option value="FEATURED">Featured</option><option value="A-Z">Alphabetically, A-Z</option><option value="Z-A">Alphabetically, Z-A</option></select></label></div>
    <div className="mw-catalog-grid">{filtered.map(p=><article className="mw-catalog-card" key={p.id}><a href={p.href} className="mw-catalog-image"><img src={p.image} alt={p.id+" "+p.name}/><span>NEW STYLE</span></a><div className="mw-catalog-card-copy"><p className="mw-kicker">{p.id} / {p.category}</p><h2><a href={p.href}>{p.name}</a></h2><p>{p.finish}</p><div className="mw-catalog-specs"><span>{p.sizes}</span><span>{p.lugs}</span></div><div className="mw-catalog-actions"><a href={p.href}>FITMENT OPTIONS ↗</a><button onClick={()=>setCompare(v=>v.includes(p.id)?v.filter(x=>x!==p.id):[...v,p.id])}>{compare.includes(p.id)?"✓ ADDED":"＋ COMPARE"}</button></div></div></article>)}</div>
   </section>
  </div>
  {compare.length>0&&<div className="mw-compare-bar"><span>{compare.length} WHEELS SELECTED FOR COMPARISON</span><button onClick={()=>setCompare([])}>CLEAR</button><button onClick={()=>alert("Comparison: "+compare.join(", "))}>COMPARE NOW →</button></div>}
 </main>
}
