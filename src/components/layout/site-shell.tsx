"use client";
import { useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { VehicleFitmentPicker } from "@/components/fitment/vehicle-fitment-picker";
import { PButton, PButtonPure, PInputSearch, PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";

const links = [
  { label: "All wheels", href: "/wheels" },
  { label: "Street", href: "/wheels?category=street" },
  { label: "Trail", href: "/wheels?category=trail" },
  { label: "Dually", href: "/wheels?category=dually" },
  { label: "Color series", href: "/wheels?category=color-series" },
  { label: "New arrivals", href: "/wheels?sort=new" },
  { label: "Visualizer", href: "/visualizer" },
  { label: "My Garage", href: "/garage" },
  { label: "Find a Dealer", href: "/dealers" },
  { label: "Contact", href: "/contact" },
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
  return (
    <PorscheDesignSystemProvider cdn="auto">
      <div className="pds-app">
        <header className="uranus-pds-header">
          <div className="uranus-header-left">
            <PButtonPure className="uranus-menu-trigger" type="button" onClick={() => setMenuOpen(!menuOpen)} aria={{ "aria-expanded": menuOpen, "aria-haspopup": "dialog" }} icon="menu-lines" hideLabel={false}>Menu</PButtonPure>
          </div>
          <a className="uranus-header-wordmark" href="/" aria-label="Uranus home">URANUS</a>
          <div className="uranus-header-right">
            <PButtonPure className="uranus-header-icon" type="button" onClick={() => setSearchOpen(!searchOpen)} title="Search" icon="search" hideLabel>Search</PButtonPure>
            <PButton onClick={() => setVehicleOpen(true)} icon="car">{vehicleLabel}</PButton>
          </div>
          {searchOpen && <form className="uranus-search-panel" onSubmit={event => { event.preventDefault(); window.location.href = "/wheels?q=" + encodeURIComponent(query); }}>
            <PInputSearch name="site-search" label="Search wheels" value={query} onInput={event => setQuery((event.detail.target as HTMLInputElement).value)} placeholder="Search wheels, styles and part numbers" clear />
            <PButton type="submit">Search</PButton>
          </form>}
        </header>
        {menuOpen && <><button className="uranus-menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation" /><nav className="uranus-menu-panel" aria-label="Main navigation">
          <div className="uranus-menu-panel-heading"><span>EXPLORE URANUS</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
          <div className="uranus-menu-links">{links.map((link, index) => <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{link.label}<b>↗</b></a>)}</div>
        </nav></>}
        {vehicleOpen && <VehicleFitmentPicker initialVehicle={vehicleSaved ? vehicle : null} onClose={() => setVehicleOpen(false)} onSave={selected => { setVehicle(selected); setVehicleSaved(true); }} />}
        <main className="pds-content">{children}</main>
        <SiteFooter />
      </div>
    </PorscheDesignSystemProvider>
  );
}
