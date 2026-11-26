"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { VehicleFitmentPicker } from "@/components/fitment/vehicle-fitment-picker";
import {
  PButtonPure,
  PDrilldown,
  PDrilldownItem,
  PDrilldownLink,
  PInputSearch,
  PorscheDesignSystemProvider,
} from "@porsche-design-system/components-react/ssr";

type Vehicle = { year: string; make: string; model: string; trim: string; body: string };
const emptyVehicle: Vehicle = { year: "", make: "", model: "", trim: "", body: "" };

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [vehicleSaved, setVehicleSaved] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setVehicleOpen(false);
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

  return (
    <PorscheDesignSystemProvider cdn="auto">
      <div className="pds-app">
        <header className="uranus-pds-header grid-template absolute inset-x-0 top-0 z-30">
          <div className="col-wide grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-fluid-md min-h-[80px]">
            <nav className="flex items-center justify-start" aria-label="Main navigation">
              <PButtonPure
                className="uranus-menu-trigger scheme-dark p-static-xs -m-static-xs"
                type="button"
                icon="menu-lines"
                hideLabel={true}
                onClick={() => setMenuOpen(true)}
                aria={{ "aria-haspopup": "dialog", "aria-expanded": menuOpen, "aria-label": "Open menu" }}
              >
                Menu
              </PButtonPure>
              <PDrilldown open={menuOpen} onDismiss={() => setMenuOpen(false)}>
                <PDrilldownItem identifier="wheels" label="Wheels">
                  <PDrilldownLink href="/wheels">All wheels</PDrilldownLink>
                  <PDrilldownLink href="/wheels?category=street">Street</PDrilldownLink>
                  <PDrilldownLink href="/wheels?category=trail">Trail</PDrilldownLink>
                  <PDrilldownLink href="/wheels?category=dually">Dually</PDrilldownLink>
                  <PDrilldownLink href="/wheels?category=color-series">Color series</PDrilldownLink>
                  <PDrilldownLink href="/wheels?sort=new">New arrivals</PDrilldownLink>
                </PDrilldownItem>
                <PDrilldownItem identifier="tools" label="Tools">
                  <PDrilldownLink href="/visualizer">Wheel visualizer</PDrilldownLink>
                  <PDrilldownLink href="/garage">My garage</PDrilldownLink>
                  <PDrilldownLink href="/dealers">Find a dealer</PDrilldownLink>
                  <PDrilldownLink href="/contact">Contact</PDrilldownLink>
                </PDrilldownItem>
                <PDrilldownItem identifier="fitment" label="Vehicle fitment">
                  <PDrilldownLink href="/wheels">Explore compatible wheels</PDrilldownLink>
                </PDrilldownItem>
              </PDrilldown>
            </nav>

            <a className="uranus-header-wordmark scheme-dark" href="/" aria-label="Uranus home">URANUS</a>

            <div className="uranus-header-right scheme-dark flex items-center justify-end gap-static-md">
              <PButtonPure
                className="uranus-header-icon p-static-xs -m-static-xs"
                type="button"
                icon="search"
                hideLabel={true}
                title="Search"
                onClick={() => setSearchOpen(value => !value)}
                aria={{ "aria-label": "Search" }}
              >
                Search
              </PButtonPure>
              <PButtonPure
                className="uranus-header-icon uranus-fitment-icon p-static-xs -m-static-xs"
                type="button"
                icon="car"
                hideLabel={true}
                title="Find your fit"
                onClick={() => setVehicleOpen(true)}
                aria={{ "aria-label": "Find your fit" }}
              >
                Find your fit
              </PButtonPure>
            </div>

            {searchOpen && (
              <form
                className="uranus-search-panel col-wide"
                onSubmit={event => {
                  event.preventDefault();
                  window.location.href = "/wheels?q=" + encodeURIComponent(query);
                }}
              >
                <PInputSearch
                  name="site-search"
                  label="Search wheels"
                  value={query}
                  onInput={event => setQuery((event.detail.target as HTMLInputElement).value)}
                  placeholder="Search wheels, styles and part numbers"
                  clear
                />
              </form>
            )}
          </div>
        </header>

        {vehicleOpen && (
          <VehicleFitmentPicker
            initialVehicle={vehicleSaved ? vehicle : null}
            onClose={() => setVehicleOpen(false)}
            onSave={selected => {
              setVehicle(selected);
              setVehicleSaved(true);
            }}
          />
        )}

        <main className="pds-content">{children}</main>
        <SiteFooter />
      </div>
    </PorscheDesignSystemProvider>
  );
}
