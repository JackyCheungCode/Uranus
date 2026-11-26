"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { VehicleFitmentPicker } from "@/components/fitment/vehicle-fitment-picker";
import { PInputSearch, PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";

const links = [
  { label: "ALL WHEELS", href: "/wheels" },
  { label: "STREET", href: "/wheels?category=street" },
  { label: "TRAIL", href: "/wheels?category=trail" },
  { label: "DUALLY", href: "/wheels?category=dually" },
  { label: "COLOR SERIES", href: "/wheels?category=color-series" },
  { label: "NEW ARRIVALS", href: "/wheels?sort=new" },
];

type Vehicle = { year: string; make: string; model: string; trim: string; body: string };
const emptyVehicle: Vehicle = { year: "", make: "", model: "", trim: "", body: "" };

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [vehicleSaved, setVehicleSaved] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setVehicleOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    const raw = localStorage.getItem("mayhem-vehicle");
    if (raw) {
      try {
        setVehicle(JSON.parse(raw) as Vehicle);
        setVehicleSaved(true);
      } catch {
        localStorage.removeItem("mayhem-vehicle");
      }
    }
    return () => window.removeEventListener("keydown", close);
  }, []);

  const vehicleLabel = vehicleSaved ? vehicle.year + " " + vehicle.make + " " + vehicle.model : "FIND YOUR FIT";

  return (
    <PorscheDesignSystemProvider cdn="auto">
      <>
        <header className="mw-header">
          <button className="mw-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
          <a className="mw-wordmark" href="/" aria-label="Uranus home">URANUS</a>
          <nav className="mw-nav" aria-label="Main navigation">
            <div className="mw-nav-group">
              <a href="/wheels">WHEELS <span>⌄</span></a>
              <div className="mw-dropdown">{links.map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</div>
            </div>
            <a href="/visualizer">VISUALIZER</a>
          </nav>
          <div className="mw-header-actions">
            <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" className="mw-icon-button">⌕</button>
            <button onClick={() => setVehicleOpen(true)} className="mw-vehicle-button">
              <span className="mw-vehicle-icon">＋</span>{vehicleSaved ? vehicleLabel : "FIND YOUR FIT"}
            </button>
            <a href="/garage" className="mw-garage-link">MY GARAGE</a>
          </div>
          {searchOpen && (
            <form className="mw-search" onSubmit={event => { event.preventDefault(); window.location.href = "/wheels?q=" + encodeURIComponent(query); }}>
              <PInputSearch autoFocus name="site-search" label="SEARCH WHEELS" hideLabel value={query}
                onInput={event => setQuery((event.detail.target as HTMLInputElement).value)}
                placeholder="Search wheels, styles and part numbers" clear />
              <button type="submit">SEARCH →</button>
            </form>
          )}
        </header>
        {menuOpen && (
          <div className="mw-mobile-menu">
            {links.map(item => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<span>↗</span></a>)}
            <a href="/visualizer" onClick={() => setMenuOpen(false)}>VISUALIZER<span>↗</span></a>
            <button onClick={() => { setVehicleOpen(true); setMenuOpen(false); }}>SELECT YOUR VEHICLE →</button>
          </div>
        )}
        {vehicleOpen && <VehicleFitmentPicker initialVehicle={vehicleSaved ? vehicle : null} onClose={() => setVehicleOpen(false)}
          onSave={selected => { setVehicle(selected); setVehicleSaved(true); }} />}
        {children}
        <SiteFooter />
      </>
    </PorscheDesignSystemProvider>
  );
}
