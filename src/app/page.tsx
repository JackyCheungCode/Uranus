import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";

const images = {
  hero: "https://images.unsplash.com/photo-1772289093693-60c4de650e65?auto=format&fit=crop&fm=jpg&q=85&w=2400",
  wheel: "https://images.unsplash.com/photo-1760018247832-7b0a8f615353?auto=format&fit=crop&fm=jpg&q=85&w=1800",
  trail: "https://images.unsplash.com/photo-1745193592657-05dc10ce804f?auto=format&fit=crop&fm=jpg&q=85&w=1400",
  overland: "https://images.unsplash.com/photo-1748446468465-7a4063143be1?auto=format&fit=crop&fm=jpg&q=85&w=1400",
};

const directions = [
  {
    number: "01",
    name: "STREET",
    descriptor: "Urban performance",
    copy: "A confident stance. Clean geometry. Built to make every arrival count.",
    href: "/wheels/street",
    image: images.wheel,
    imageAlt: "Close-up detail of an automotive alloy wheel",
  },
  {
    number: "02",
    name: "TRAIL",
    descriptor: "Beyond the pavement",
    copy: "Purposeful design for routes that leave the ordinary behind.",
    href: "/wheels/trail",
    image: images.trail,
    imageAlt: "Off-road SUV travelling across rugged terrain",
  },
  {
    number: "03",
    name: "DUALLY",
    descriptor: "Heavy-duty presence",
    copy: "A wider footprint and a stronger visual statement for dual rear wheel builds.",
    href: "/wheels/dually",
    image: images.overland,
    imageAlt: "Off-road vehicle in an expansive outdoor landscape",
  },
];

const engineeringDetails = [
  { index: "A", title: "Hub interface", detail: "Center bore and mounting interface" },
  { index: "B", title: "Mounting geometry", detail: "Offset, backspace and brake clearance" },
  { index: "C", title: "Structural design", detail: "Load requirements and application" },
];

function ImageSurface({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={["u-image-surface", className].filter(Boolean).join(" ")}
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="u-home-hero lg:ml-[var(--u-sidebar-current-width)]">
        <ImageSurface src={images.hero} alt="Pickup truck crossing an open desert landscape" className="u-home-hero__image" />
        <div className="u-home-hero__shade" aria-hidden="true" />
        <div className="u-home-hero__content">
          <Eyebrow className="!text-white/75">Precision engineered / Made to move</Eyebrow>
          <h1 className="u-home-hero__title">Built with<br />intent.</h1>
          <p className="u-home-hero__copy">
            Wheel design shaped by engineering discipline, purposeful form, and the freedom to take the long way.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ActionLink href="/wheels" tone="light">Explore wheel systems</ActionLink>
            <ActionLink href="/fitment" tone="outline">Find your fit</ActionLink>
          </div>
        </div>
        <div className="u-home-hero__meta">
          <span>UR / 001</span>
          <span>Designed for the drive</span>
        </div>
        <a className="u-home-hero__scroll" href="#collections">
          <span className="u-scroll-line" />
          Scroll to explore
        </a>
      </section>

      <div className="u-home-indexbar lg:ml-[var(--u-sidebar-current-width)]">
        <span>Engineered for every direction</span>
        <span className="hidden sm:inline">Form / Function / Fitment</span>
        <span>URANUS WHEELS — 2026</span>
      </div>

      <section id="collections" className="u-home-section lg:ml-[var(--u-sidebar-current-width)]">
        <Container width="wide">
          <div className="u-collection-intro">
            <div>
              <Eyebrow index="01">The collection</Eyebrow>
              <h2 className="u-display-heading">Choose your<br /><span>direction.</span></h2>
            </div>
            <div className="u-collection-intro__aside">
              <p>Three distinct applications. One uncompromising approach to proportion, detail, and fit.</p>
              <a href="/wheels" className="u-text-link">View all wheel systems <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="u-direction-grid">
            {directions.map((item) => (
              <a href={item.href} className="u-direction-card" key={item.number}>
                <div className="u-direction-card__media">
                  <ImageSurface src={item.image} alt={item.imageAlt} />
                  <span className="u-direction-card__number">{item.number}</span>
                  <span className="u-direction-card__arrow" aria-hidden="true">↗</span>
                </div>
                <div className="u-direction-card__body">
                  <div>
                    <p className="u-direction-card__descriptor">{item.descriptor}</p>
                    <h3>{item.name}<span>+</span></h3>
                  </div>
                  <p className="u-direction-card__copy">{item.copy}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="u-wheel-feature lg:ml-[var(--u-sidebar-current-width)]">
        <div className="u-wheel-feature__visual">
          <ImageSurface src={images.wheel} alt="Detailed close-up of a machined automotive alloy wheel" />
          <div className="u-wheel-feature__image-label">
            <span>DETAIL STUDY / 001</span>
            <span>Surface · Geometry · Structure</span>
          </div>
        </div>
        <div className="u-wheel-feature__content">
          <Eyebrow index="02">Design philosophy</Eyebrow>
          <h2>Every line<br />has a reason.</h2>
          <p>
            A wheel is more than a visual signature. It is the connection between vehicle and road — where design decisions meet real-world demands.
          </p>
          <a href="/technology" className="u-text-link">Explore our approach <span aria-hidden="true">↗</span></a>
          <div className="u-wheel-feature__specimen">
            <span>FORM STUDY / A-01</span>
            <span>Proportion is performance.</span>
          </div>
        </div>
      </section>

      <section className="u-engineering lg:ml-[var(--u-sidebar-current-width)]">
        <Container width="wide">
          <div className="u-engineering__header">
            <Eyebrow index="03">Precision engineering</Eyebrow>
            <h2>Fit is engineered.<br /><span>Never assumed.</span></h2>
            <p>Every application depends on the complete mounting geometry. The details matter — from hub interface to brake clearance.</p>
          </div>
          <div className="u-engineering__body">
            <div className="u-engineering-drawing" aria-label="Illustrative wheel mounting geometry diagram">
              <div className="u-engineering-drawing__outer">
                <div className="u-engineering-drawing__inner">
                  <div className="u-engineering-drawing__hub" />
                </div>
              </div>
              <span className="u-drawing-label u-drawing-label--top">CENTERLINE</span>
              <span className="u-drawing-label u-drawing-label--left">HUB FACE</span>
              <span className="u-drawing-label u-drawing-label--right">OFFSET</span>
              <span className="u-drawing-cross u-drawing-cross--horizontal" />
              <span className="u-drawing-cross u-drawing-cross--vertical" />
              <span className="u-engineering-drawing__note">SCHEMATIC / NOT TO SCALE</span>
            </div>
            <div className="u-engineering-list">
              {engineeringDetails.map((item) => (
                <div className="u-engineering-list__item" key={item.index}>
                  <span>{item.index}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span aria-hidden="true">↗</span>
                </div>
              ))}
              <p className="u-engineering-list__disclaimer">Illustrative engineering concepts only. Product-specific specifications and vehicle compatibility must be verified against the selected configuration.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="u-fitment-banner lg:ml-[var(--u-sidebar-current-width)]">
        <div className="u-fitment-banner__backdrop" aria-hidden="true" />
        <Container width="wide">
          <div className="u-fitment-banner__content">
            <Eyebrow className="!text-white/65">Your vehicle / Your setup</Eyebrow>
            <h2>Start with<br />what you drive.</h2>
            <p>Explore wheel options by vehicle. Final fitment is confirmed against the exact wheel configuration and vehicle specifications.</p>
            <ActionLink href="/fitment" tone="light">Find wheels for your vehicle</ActionLink>
          </div>
          <div className="u-fitment-banner__coordinates" aria-hidden="true">
            <span>FITMENT SYSTEM / 01</span>
            <span>VEHICLE DATA REQUIRED</span>
          </div>
        </Container>
      </section>

      <section className="u-home-outro lg:ml-[var(--u-sidebar-current-width)]">
        <Container width="wide">
          <div className="u-home-outro__top">
            <Eyebrow index="04">Uranus / Wheel systems</Eyebrow>
            <h2>Driven by detail.<br /><span>Defined by purpose.</span></h2>
          </div>
          <div className="u-home-outro__bottom">
            <p>Engineering-led wheel design for drivers who know the difference is in the details.</p>
            <ActionLink href="/wheels" tone="dark">Discover the collection</ActionLink>
          </div>
        </Container>
      </section>

      <footer className="u-home-footer lg:ml-[var(--u-sidebar-current-width)]">
        <Container width="wide">
          <div className="u-home-footer__main">
            <a href="/" className="u-home-footer__brand">URANUS<span>WHEELS</span></a>
            <div className="u-home-footer__links">
              <a href="/wheels">Wheels</a>
              <a href="/visualizer">Visualizer</a>
              <a href="/technology">Technology</a>
              <a href="/dealers">Dealers</a>
              <a href="/faq">FAQ</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="u-home-footer__legal">
            <span>© 2026 URANUS WHEELS</span>
            <span>PRECISION IN MOTION</span>
            <a href="/privacy">Privacy & legal</a>
          </div>
        </Container>
      </footer>
    </main>
  );
}
