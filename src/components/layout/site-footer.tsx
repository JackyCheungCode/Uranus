import {
  PHeading,
  PLinkPure,
  PSelect,
  PSelectOption,
  PText,
} from "@porsche-design-system/components-react/ssr";

export function SiteFooter() {
  return (
    <footer className="uranus-pds-footer grid-template py-fluid-xl bg-surface">
      <h2 className="sr-only">Uranus site footer</h2>

      <div className="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-fluid-md">
        <PSelect name="region" value="us" label="Change your region">
          <PSelectOption value="us">United States</PSelectOption>
          <PSelectOption value="ca">Canada</PSelectOption>
        </PSelect>
      </div>

      <nav className="col-extended grid xs:grid-cols-2 md:grid-cols-3 gap-x-fluid-md gap-y-fluid-lg mt-fluid-xl mb-fluid-xl" aria-label="Footer navigation">
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Explore</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/wheels" icon="none">All wheels</PLinkPure></li>
            <li><PLinkPure href="/wheels?category=street" icon="none">Street collection</PLinkPure></li>
            <li><PLinkPure href="/wheels?category=trail" icon="none">Trail collection</PLinkPure></li>
            <li><PLinkPure href="/visualizer" icon="none">Wheel visualizer</PLinkPure></li>
          </ul>
        </div>
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Vehicle tools</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/garage" icon="none">My garage</PLinkPure></li>
            <li><PLinkPure href="/dealers" icon="none">Find a dealer</PLinkPure></li>
            <li><PLinkPure href="/contact" icon="none">Contact Uranus</PLinkPure></li>
          </ul>
        </div>
        <div className="flex flex-col gap-fluid-sm">
          <PHeading tag="h3" size="2xs" color="contrast-medium">Information</PHeading>
          <ul className="grid gap-fluid-sm">
            <li><PLinkPure href="/warranty" icon="none">Warranty</PLinkPure></li>
            <li><PLinkPure href="/faq" icon="none">Wheel FAQs</PLinkPure></li>
            <li><PLinkPure href="/prop65" icon="none">Product notices</PLinkPure></li>
          </ul>
        </div>
      </nav>

      <div className="col-extended grid sm:grid-cols-[auto_minmax(0,1fr)] items-center gap-x-fluid-lg gap-y-static-lg border-t border-[var(--p-color-contrast-lower)] pt-fluid-lg">
        <div className="flex gap-fluid-md" aria-label="Uranus quick links">
          <PLinkPure href="/wheels" icon="car" hideLabel={true} size="md">Wheels</PLinkPure>
          <PLinkPure href="/garage" icon="user" hideLabel={true} size="md">Garage</PLinkPure>
          <PLinkPure href="/contact" icon="search" hideLabel={true} size="md">Contact</PLinkPure>
        </div>
        <PText size="xs" color="contrast-medium">Wheel designs and fitment information for trucks, Jeep and SUVs.</PText>
      </div>

      <div className="col-extended grid gap-fluid-md justify-items-center mt-fluid-xl">
        <a className="uranus-footer-wordmark" href="/" aria-label="Uranus home">URANUS</a>
        <PText size="2xs" color="contrast-medium">© 2026 Uranus. All rights reserved.</PText>
        <ul className="flex flex-wrap justify-center gap-fluid-md">
          <li><PLinkPure icon="none" size="xs" underline={true} href="/contact">Contact</PLinkPure></li>
          <li><PLinkPure icon="none" size="xs" underline={true} href="/prop65">Product notices</PLinkPure></li>
          <li><PLinkPure icon="none" size="xs" underline={true} href="/faq">FAQs</PLinkPure></li>
        </ul>
      </div>
    </footer>
  );
}
