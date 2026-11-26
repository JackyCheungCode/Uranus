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
        <header className="uranus-pds-header uranus-template-header z-1 grid-template absolute inset-x-0 top-0 before:absolute before:inset-[0_0_-60px_0] before:-z-1 before:pointer-events-none">
          <div className="col-wide grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-fluid-md items-center min-h-[80px]">
            <div className="flex flex-wrap gap-static-md items-center justify-start">
              <nav aria-label="Main navigation">
                <PButtonPure
                  id="uranus-nav-button"
                  className="scheme-dark p-static-xs -m-static-xs"
                  type="button"
                  icon="menu-lines"
                  hideLabel={{ base: true, s: false }}
                  onClick={() => setMenuOpen(true)}
                  aria={{ "aria-haspopup": "dialog", "aria-expanded": menuOpen, "aria-label": "Menu" }}
                >
                  Menu
                </PButtonPure>
                <PDrilldown open={menuOpen} onDismiss={() => setMenuOpen(false)}>
                  <PDrilldownItem identifier="wheels" label="Wheel collections">
                    <PDrilldownItem identifier="street" label="Street collection">
                      <PDrilldownLink href="/wheels?category=street">Explore street wheels</PDrilldownLink>
                    </PDrilldownItem>
                    <PDrilldownItem identifier="off-road" label="Off-road collection">
                      <PDrilldownLink href="/wheels?category=trail">Explore off-road wheels</PDrilldownLink>
                    </PDrilldownItem>
                    <PDrilldownLink href="/wheels">All wheel designs</PDrilldownLink>
                  </PDrilldownItem>
                  <PDrilldownItem identifier="fitment" label="Vehicle fitment">
                    <PDrilldownLink href="/wheels">Find compatible wheels</PDrilldownLink>
                    <PDrilldownLink href="/garage">My garage</PDrilldownLink>
                  </PDrilldownItem>
                  <PDrilldownItem identifier="discover" label="Discover Uranus">
                    <PDrilldownLink href="/visualizer">Wheel visualizer</PDrilldownLink>
                    <PDrilldownLink href="/dealers">Find a dealer</PDrilldownLink>
                    <PDrilldownLink href="/contact">Contact</PDrilldownLink>
                  </PDrilldownItem>
                </PDrilldown>
              </nav>
            </div>

            <a className="uranus-template-wordmark scheme-dark" href="/" aria-label="Uranus home">URANUS</a>

            <div className="scheme-dark flex flex-wrap gap-static-md items-center justify-end uranus-template-header-actions">
              <PButtonPure
                className="p-static-xs -m-static-xs"
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
                className="p-static-xs -m-static-xs"
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
                  placeholder="Search wheel designs and specifications"
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

        <div className="pds-content">{children}</div>
        <SiteFooter />
      </div>
    </PorscheDesignSystemProvider>
  );
}
