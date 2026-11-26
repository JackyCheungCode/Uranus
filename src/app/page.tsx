import { PCarousel, PLinkTile } from "@porsche-design-system/components-react/ssr";

const cdn = "https://mayhemwheels.com/cdn/shop/files/";
const heroImage = "https://mayhemwheels.com/cdn/shop/files/preview_images/8afaf56dea5c4eb3973c46668df55d16.thumbnail.0000000000.jpg?v=1793395054&width=2400";
const wheels = [
  { name: "HORIZON", number: "8120", finish: "GLOSS BLACK", image: cdn + "Mayhem8120-6GB1.png?v=1789750229&width=1200", href: "/products/8120-horizon" },
  { name: "CYCLONE", number: "8121", finish: "GLOSS BLACK", image: cdn + "Mayhem8121-6GB1.png?v=1789750230&width=1200", href: "/products/8121-cyclone" },
  { name: "BLIZZARD", number: "8122", finish: "GLOSS BLACK", image: cdn + "Mayhem8122-6GB1-CAN.png?v=1791917407&width=1200", href: "/products/8122-blizzard" },
  { name: "VECTOR", number: "8310", finish: "GLOSS BLACK", image: cdn + "Mayhem8310-6GB1.png?v=1789751560&width=1200", href: "/products/8310-vector" },
];
const directions = [
  { label: "STREET", description: "Purposeful design for the everyday drive.", image: cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800", href: "/wheels?category=street" },
  { label: "TRAIL", description: "Take your build beyond the pavement.", image: cdn + "Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800", href: "/wheels?category=trail" },
];

export default function HomePage() {
  return (
    <main className="uranus-landing">
      <section className="uranus-landing-hero" aria-labelledby="home-heading">
        <img src={heroImage} alt="Uranus wheel campaign" fetchPriority="high" />
        <div className="uranus-landing-hero-shade" />
        <div className="uranus-landing-hero-copy">
          <p className="uranus-eyebrow">URANUS / BUILT FOR YOUR DRIVE</p>
          <h1 id="home-heading">Designed to<br />stand apart.</h1>
          <p>Distinctive wheel design. Engineered fitment.</p>
          <a className="uranus-hero-action" href="/wheels">EXPLORE THE COLLECTION <span>↗</span></a>
        </div>
        <span className="uranus-hero-index">01 / 04</span>
      </section>

      <section className="uranus-landing-feature-pair" aria-label="Explore Uranus wheels">
        <div className="uranus-feature-pair-inner">
          {directions.map((item) => (
            <PLinkTile key={item.label} href={item.href} label={item.label} description={item.description} compact weight="regular" aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}>
              <img src={item.image} alt={item.label + " wheel collection"} loading="lazy" />
            </PLinkTile>
          ))}
        </div>
      </section>

      <section className="uranus-wheel-carousel" aria-label="Featured wheel collection">
        <div className="uranus-section-heading">
          <p className="uranus-eyebrow">THE URANUS COLLECTION</p>
          <h2>Find your signature.</h2>
          <p>Explore the details, finishes and fitments behind each design.</p>
        </div>
        <PCarousel heading="Featured wheels" slidesPerPage={{ base: 1, xs: 1, m: 2 }}>
          {wheels.map((wheel) => (
            <PLinkTile key={wheel.number} href={wheel.href} label={wheel.number + " " + wheel.name} description={wheel.finish + " · " + wheel.number} compact weight="regular" aspectRatio="1/1">
              <img src={wheel.image} alt={wheel.number + " " + wheel.name + " wheel in " + wheel.finish} loading="lazy" />
            </PLinkTile>
          ))}
        </PCarousel>
      </section>

      <section className="uranus-editorial">
        <div className="uranus-editorial-row">
          <img src={cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800"} alt="Uranus street wheel fitment" loading="lazy" />
          <div>
            <p className="uranus-eyebrow">FORM / FUNCTION</p>
            <h2>Made to move you.</h2>
            <p>Explore distinctive wheel designs developed for trucks, Jeep and SUVs. Every detail is considered — from spoke geometry and finish to the fitment that brings the complete setup together.</p>
            <a className="uranus-text-link" href="/wheels">DISCOVER THE WHEELS <span>↗</span></a>
          </div>
        </div>
        <div className="uranus-editorial-row uranus-editorial-row-reverse">
          <img src={cdn + "Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800"} alt="Uranus wheel on an off-road vehicle" loading="lazy" />
          <div>
            <p className="uranus-eyebrow">PRECISION FITMENT</p>
            <h2>Your vehicle.<br />Your setup.</h2>
            <p>Start with your vehicle to explore wheel sizes and specifications designed around your build.</p>
            <a className="uranus-text-link" href="/wheels">FIND YOUR FIT <span>↗</span></a>
          </div>
        </div>
      </section>
      <section className="uranus-fitment-banner">
        <div><p className="uranus-eyebrow">START WITH YOUR VEHICLE</p><h2>Find your fit.</h2><p>Check vehicle compatibility before choosing your wheels.</p></div>
        <a className="uranus-hero-action" href="/wheels">SELECT YOUR VEHICLE <span>↗</span></a>
      </section>
    </main>
  );
}
