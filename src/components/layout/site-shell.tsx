"use client";

import { useEffect, useState, type ReactNode } from "react";

const links = [
  { label: "ALL WHEELS", href: "/wheels" },
  { label: "STREET", href: "/wheels?category=street" },
  { label: "TRAIL", href: "/wheels?category=trail" },
  { label: "DUALLY", href: "/wheels?category=dually" },
  { label: "COLOR SERIES", href: "/wheels?category=color-series" },
  { label: "NEW ARRIVALS", href: "/wheels?sort=new" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setVehicleOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div className="mw-utility">
        <a href="/dealers">BECOME A DEALER</a>
        <a href="/dealers">FIND A DEALER</a>
        <a href="/contact">CONTACT US</a>
      </div>
      <header className="mw-header">
        <button className="mw-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>
        <a className="mw-wordmark" href="/" aria-label="Mayhem Wheels home">MAYHEM<span>WHEELS</span></a>
        <nav className="mw-nav" aria-label="Main navigation">
          <div className="mw-nav-group">
            <a href="/wheels">WHEELS <span>⌄</span></a>
            <div className="mw-dropdown">{links.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}</div>
          </div>
          <a href="/visualizer">VISUALIZER</a>
          <a href="/dealers">FIND A DEALER</a>
          <a href="/merch">MERCH</a>
        </nav>
        <div className="mw-header-actions">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" className="mw-icon-button">⌕</button>
          <button onClick={() => setVehicleOpen(true)} className="mw-vehicle-button"><span className="mw-vehicle-icon">＋</span> SELECT VEHICLE</button>
          <a href="/garage" className="mw-garage-link">MY GARAGE</a>
        </div>
        {searchOpen && <form className="mw-search" onSubmit={(e) => { e.preventDefault(); window.location.href = "/wheels?q=" + encodeURIComponent(query); }}>
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search wheels, styles and part numbers" />
          <button type="submit">SEARCH →</button>
        </form>}
      </header>
      {menuOpen && <div className="mw-mobile-menu">
        {links.map((item) => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span>↗</span></a>)}
        <a href="/visualizer" onClick={() => setMenuOpen(false)}>VISUALIZER<span>↗</span></a>
        <a href="/dealers" onClick={() => setMenuOpen(false)}>FIND A DEALER<span>↗</span></a>
        <button onClick={() => { setVehicleOpen(true); setMenuOpen(false); }}>SELECT YOUR VEHICLE →</button>
      </div>}
      {vehicleOpen && <div className="mw-modal-backdrop" onClick={() => setVehicleOpen(false)}>
        <section className="mw-vehicle-modal" onClick={(e) => e.stopPropagation()}>
          <button className="mw-modal-close" onClick={() => setVehicleOpen(false)}>×</button>
          <p className="mw-kicker">YOUR VEHICLE</p>
          <h2>Find wheels that fit.</h2>
          <p>Select your vehicle to see matching wheel configurations.</p>
          <div className="mw-vehicle-fields">
            {["Year", "Make", "Model", "Trim", "Body / Bed"].map((field) => <label key={field}>{field}<select defaultValue=""><option value="" disabled>Select {field.toLowerCase()}</option>{(field === "Year" ? ["2026", "2025", "2024", "2023", "2022", "2021", "2020"] : field === "Make" ? ["Chevrolet", "Ford", "GMC", "Jeep", "Ram", "Toyota"] : field === "Model" ? ["1500", "F-150", "Silverado", "Sierra", "Wrangler", "Tundra"] : ["Standard", "Crew Cab", "Double Cab"]).map((v) => <option key={v}>{v}</option>)}</select></label>)}
          </div>
          <button className="mw-button mw-button-dark" onClick={() => { setVehicleOpen(false); window.location.href = "/wheels"; }}>FIND WHEELS →</button>
          <p className="mw-modal-note">Vehicle selection is a visual starting point. Confirm exact fitment by wheel configuration.</p>
        </section>
      </div>}
      {children}
    </>
  );
}
