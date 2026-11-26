"use client";

import { useState } from "react";
import {
  PHeading,
  PLinkPure,
  PSelect,
  PSelectOption,
  PText,
  type SelectChangeEventDetail,
} from "@porsche-design-system/components-react/ssr";

export function SiteFooter() {
  const [region, setRegion] = useState("us");

  return (
    <footer className="uranus-template-footer grid-template py-fluid-lg bg-surface">
      <h2 className="sr-only">Uranus site footer</h2>

      <div className="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-fluid-md">
        <PSelect
          name="region"
          value={region}
          label="Change your region"
          onChange={(event: CustomEvent<SelectChangeEventDetail>) => setRegion(String(event.detail.value ?? "us"))}
        >
          <PSelectOption value="us">🇺🇸 United States</PSelectOption>
          <PSelectOption value="ca">🇨🇦 Canada</PSelectOption>
          <PSelectOption value="gb">🇬🇧 United Kingdom</PSelectOption>
          <PSelectOption value="de">🇩🇪 Germany</PSelectOption>
          <PSelectOption value="fr">🇫🇷 France</PSelectOption>
          <PSelectOption value="au">🇦🇺 Australia</PSelectOption>
        </PSelect>
      </div>

      <nav
        className="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-x-fluid-md gap-y-fluid-lg mt-fluid-sm mb-fluid-lg"
        aria-label="Footer navigation"
      >
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Explore</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/wheels" icon="none">All wheel designs</PLinkPure></li>
            <li><PLinkPure href="/wheels?category=street" icon="none">Street collection</PLinkPure></li>
            <li><PLinkPure href="/wheels?category=trail" icon="none">Off-road collection</PLinkPure></li>
            <li><PLinkPure href="/visualizer" icon="none">Wheel visualizer</PLinkPure></li>
          </ul>
        </div>
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Uranus</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/about" icon="none">About us</PLinkPure></li>
            <li><PLinkPure href="/dealers" icon="none">Find a dealer</PLinkPure></li>
            <li><PLinkPure href="/contact" icon="none">Contact</PLinkPure></li>
            <li><PLinkPure href="/faq" icon="none">Frequently asked questions</PLinkPure></li>
          </ul>
        </div>
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Information</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/warranty" icon="none">Warranty</PLinkPure></li>
            <li><PLinkPure href="/prop65" icon="none">Product notices</PLinkPure></li>
            <li><PLinkPure href="/privacy" icon="none">Privacy notice</PLinkPure></li>
            <li><PLinkPure href="/terms" icon="none">Terms of use</PLinkPure></li>
          </ul>
        </div>
      </nav>

      <article
        className="col-extended grid sm:grid-cols-[auto_minmax(0,1fr)] items-center gap-x-fluid-lg gap-y-static-lg"
        aria-label="Uranus social media"
      >
        <div className="flex gap-fluid-md">
          <PLinkPure className="p-static-sm -m-static-sm" href="https://www.instagram.com/" icon="logo-instagram" hideLabel={true} size="md">Instagram</PLinkPure>
          <PLinkPure className="p-static-sm -m-static-sm" href="https://www.facebook.com/" icon="logo-facebook" hideLabel={true} size="md">Facebook</PLinkPure>
          <PLinkPure className="p-static-sm -m-static-sm" href="https://x.com/" icon="logo-x" hideLabel={true} size="md">X</PLinkPure>
          <PLinkPure className="p-static-sm -m-static-sm" href="https://www.youtube.com/" icon="logo-youtube" hideLabel={true} size="md">YouTube</PLinkPure>
        </div>
        <PText size="2xs" color="contrast-medium">
          Vehicle fitment information is provided as a guide. Always confirm wheel dimensions and vehicle requirements before installation.
        </PText>
      </article>

      <div className="col-extended grid gap-fluid-md justify-items-center mt-fluid-md">
        <a className="uranus-template-footer-wordmark" href="/" aria-label="Uranus home">URANUS</a>
        <PText size="2xs" color="contrast-medium">© 2026 Uranus. All rights reserved.</PText>
        <ul className="flex flex-wrap justify-center gap-fluid-md">
          <li><PLinkPure icon="none" size="xs" underline={true} href="/terms">Terms of use</PLinkPure></li>
          <li><PLinkPure icon="none" size="xs" underline={true} href="/privacy">Privacy notice</PLinkPure></li>
          <li><PLinkPure icon="none" size="xs" underline={true} href="/contact">Contact</PLinkPure></li>
          <li><PLinkPure icon="none" size="xs" underline={true} href="/faq">FAQs</PLinkPure></li>
        </ul>
      </div>
    </footer>
  );
}
