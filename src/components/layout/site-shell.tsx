"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { VehicleFitmentPicker } from "@/components/fitment/vehicle-fitment-picker";
import { PButton, PInputSearch, PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";

const links = [
  { label: "Wheels", short: "W", href: "/wheels", group: "COLLECTION" },
  { label: "Visualizer", short: "V", href: "/visualizer", group: "TOOLS" },
  { label: "My Garage", short: "G", href: "/garage", group: "TOOLS" },
  { label: "Find a Dealer", short: "D", href: "/dealers", group: "SUPPORT" },
  { label: "Contact", short: "C", href: "/contact", group: "SUPPORT" },
];
const categories = [
  { label: "All wheels", href: "/wheels" },
  { label: "Street", href: "/wheels?category=street" },
  { label: "Trail", href: "/wheels?category=trail" },
  { label: "Dually", href: "/wheels?category=dually" },
  { label: "Color series", href: "/wheels?category=color-series" },
  { label: "New arrivals", href: "/wheels?sort=new" },
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
      if (event.key === "Escape") { setMenuOpen(false); setVehicleOpen(false); setSearchOpen(false); }
    };
    window.addEventListener("keydown", close);
    const raw = localStorage.getItem("mayhem-vehicle");
    if (raw) { try { setVehicle(JSON.parse(raw) as Vehicle); setVehicleSaved(true); } catch { localStorage.removeItem("mayhem-vehicle"); } }
    return () => window.removeEventListener("keydown", close);
  }, []);
  const vehicleLabel = vehicleSaved ? [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ") : "Find your fit";
  const groups = ["COLLECTION", "TOOLS", "SUPPORT"];
  return (
    <PorscheDesignSystemProvider cdn="auto">
      <div className="pds-app">
        <header className="pds-header">
          <button className="pds-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}><span/><span/><span/></button>
          <a className="pds-brand" href="/" aria-label="Uranus home">URANUS</a>
          <div className="pds-header-context"><span>WHEELS &amp; VEHICLE FITMENT</span><span className="pds-header-divider">/</span><span>DESIGNED FOR YOUR DRIVE</span></div>
          <div className="pds-header-actions">
            <button className="pds-icon-action" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">⌕</button>
            <PButton onClick={() => setVehicleOpen(true)} icon="car">{vehicleLabel}</PButton>
          </div>
          {searchOpen && <form className="pds-search-panel" onSubmit={event => { event.preventDefault(); window.location.href = "/wheels?q=" + encodeURIComponent(query); }}>
            <PInputSearch name="site-search" label="Search wheels" value={query} onInput={event => setQuery((event.detail.target as HTMLInputElement).value)} placeholder="Search wheels, styles and part numbers" clear />
            <PButton type="submit">Search</PButton>
          </form>}
        </header>
        <aside className={"pds-sidebar" + (menuOpen ? " is-open" : "")} aria-label="Primary navigation">
          <a className="pds-sidebar-home" href="/" aria-label="Home"><span>U</span></a>
          {groups.map(group => <div className="pds-sidebar-group" key={group}>
            <span className="pds-sidebar-label">{group}</span>
            {links.filter(link => link.group === group).map(link => <a key={link.href} href={link.href} className="pds-sidebar-link" onClick={() => setMenuOpen(false)}><span className="pds-sidebar-glyph">{link.short}</span><span>{link.label}</span></a>)}
            {group === "COLLECTION" && <div className="pds-sidebar-subnav">{categories.map(item => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>}
          </div>)}
          <div className="pds-sidebar-bottom"><span>URANUS / 2026</span></div>
        </aside>
        <div className="pds-main">
          {vehicleOpen && <VehicleFitmentPicker initialVehicle={vehicleSaved ? vehicle : null} onClose={() => setVehicleOpen(false)} onSave={selected => { setVehicle(selected); setVehicleSaved(true); }} />}
          <main className="pds-content">{children}</main>
          <SiteFooter />
        </div>
        {menuOpen && <button className="pds-mobile-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation"/>}
      </div>
    </PorscheDesignSystemProvider>
  );
}
