"use client";
import { useEffect, useState } from "react";
export function HeroVideoButton(){
 const [open,setOpen]=useState(false);
 useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[]);
 return <><button type="button" className="mw-hero-video-trigger" onClick={()=>setOpen(true)}>PLAY BACKGROUND VIDEO <span>▶</span></button>{open&&<div className="mw-video-modal" role="dialog" aria-modal="true" aria-label="Mayhem Wheels background video"><button className="mw-video-close" onClick={()=>setOpen(false)} aria-label="Close video">×</button><div className="mw-video-frame"><iframe src="https://www.youtube.com/embed/zXGecaz0hkw?autoplay=1&mute=1&rel=0" title="Mayhem Wheels campaign video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div></div>}</>;
}
