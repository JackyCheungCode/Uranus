const cdn = "https://mayhemwheels.com/cdn/shop/files/";
const wheels = [
  { name: "HORIZON", number: "8120", finish: "GLOSS BLACK", size: "18x9 | 20x9 | 22x10", image: cdn + "Mayhem8120-6GB1.png?v=1789750229&width=1200", href: "/products/8120-horizon" },
  { name: "CYCLONE", number: "8121", finish: "GLOSS BLACK", size: "20x9 | 22x10", image: cdn + "Mayhem8121-6GB1.png?width=1200", href: "/products/8121-cyclone" },
  { name: "BLIZZARD", number: "8122", finish: "GLOSS BLACK", size: "17x8.5 | 18x9 | 20x9", image: cdn + "mayhem8122-6gb1.png?width=1200", href: "/products/8122-blizzard" },
  { name: "VECTOR", number: "8310", finish: "GLOSS BLACK", size: "17x9 | 20x9", image: cdn + "Mayhem8310-6GB1.png?width=1200", href: "/products/8310-vector" },
];
const directions = [
  { number: "01", title: "STREET", copy: "Make a statement on the street.", image: cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800", href: "/wheels?category=street" },
  { number: "02", title: "TRAIL", copy: "Take your style beyond the pavement.", image: cdn + "Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800", href: "/wheels?category=trail" },
  { number: "03", title: "DUALLY", copy: "A bold look for your dually.", image: cdn + "Mayhem_Dually_8107D_CogentDually.jpg?v=1791914232&width=1800", href: "/wheels?category=dually" },
];

export default function HomePage() {
  return (
    <main className="mw-home">
      <div className="mw-promo"><span>BLACK FRIDAY // CYBER MONDAY</span><strong>20% OFF</strong><span>NOV 9 – DEC 4, 2026</span><a href="/dealers">FIND A DEALER NEAR YOU ↗</a></div>
      <section className="mw-hero">
        <img className="mw-hero-image" src="https://mayhemwheels.com/cdn/shop/files/preview_images/8afaf56dea5c4eb3973c46668df55d16.thumbnail.0000000000.jpg?v=1793395054&width=2400" alt="Mayhem Wheels hero campaign" />
        <div className="mw-hero-shade" />
        <div className="mw-hero-copy">
          <p className="mw-kicker">MAYHEM WHEELS / BUILT FOR YOUR DRIVE</p>
          <h1>HORIZON</h1>
          <p className="mw-hero-subtitle">CONCAVE &amp; VENTED STYLE</p>
          <a href="/products/8120-horizon" className="mw-button mw-button-light">EXPLORE FITMENTS <span>↗</span></a>
        </div>
        <div className="mw-hero-bottom"><span>01 / 04</span><span>SCROLL TO EXPLORE ↓</span><span>M / W</span></div>
      </section>

      <section className="mw-featured">
        <div className="mw-section-top"><div><p className="mw-kicker">A CLOSER LOOK</p><h2>Break the ordinary.</h2></div><a href="/wheels" className="mw-text-link">VIEW ALL WHEELS ↗</a></div>
        <div className="mw-product-grid">
          {wheels.map((wheel) => <a href={wheel.href} className="mw-product-card" key={wheel.number}>
            <div className="mw-product-image"><img src={wheel.image} alt={wheel.number + " " + wheel.name + " " + wheel.finish} loading="lazy" /><span className="mw-product-arrow">↗</span></div>
            <div className="mw-product-meta"><span>{wheel.name}</span><span>{wheel.finish}</span></div>
            <h3>{wheel.number} {wheel.name}</h3>
            <p>{wheel.finish}</p>
            <span className="mw-product-cta">EXPLORE THIS STYLE <b>→</b></span>
          </a>)}
        </div>
        <div className="mw-featured-footer"><span>8120 HORIZON</span><span>8121 CYCLONE</span><span>8122 BLIZZARD</span><span>8310 VECTOR</span></div>
      </section>

      <section className="mw-directions">
        <div className="mw-section-top"><div><p className="mw-kicker">FIND YOUR STYLE</p><h2>Choose your direction.</h2></div><p className="mw-section-note">Purpose-built wheel styles for every kind of drive.</p></div>
        <div className="mw-direction-grid">
          {directions.map((item) => <a href={item.href} className="mw-direction-card" key={item.number}>
            <img src={item.image} alt={item.title + " Mayhem Wheels collection"} loading="lazy" />
            <div className="mw-direction-overlay"><span>{item.number}</span><b>+</b><h3>{item.title}<i>+</i></h3><p>{item.copy}</p><span className="mw-direction-link">EXPLORE {item.title} ↗</span></div>
          </a>)}
        </div>
      </section>

      <section className="mw-brand-story">
        <div className="mw-brand-image"><img src={cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800"} alt="Mayhem wheel fitted on a truck" loading="lazy" /></div>
        <div className="mw-brand-copy"><p className="mw-kicker">MAYHEM / WHEEL CULTURE</p><h2>Built to stand apart.</h2><p>Mayhem Wheels has a mission to create a brand that provides unique styling, precision and quality with solid functionality. Targeted for trucks, Jeep and SUV fitments, we deploy a wide variety of sizes and fitments which supply a custom look that’s unmistakable.</p><a href="/wheels" className="mw-text-link">EXPLORE THE COLLECTION ↗</a></div>
      </section>

      <section className="mw-fitment-cta">
        <div><p className="mw-kicker">YOUR VEHICLE / YOUR SETUP</p><h2>Find your fit.</h2><p>Start with your vehicle and discover wheels made for your build.</p></div>
        <a href="/wheels" className="mw-button mw-button-light">SELECT YOUR VEHICLE ↗</a>
      </section>

      <footer className="mw-footer">
        <div className="mw-footer-main"><div><a href="/" className="mw-wordmark mw-footer-logo">MAYHEM<span>WHEELS</span></a><p>BUILT FOR YOUR DRIVE.</p></div><div className="mw-footer-column"><b>WHEELS</b><a href="/wheels">ALL WHEELS</a><a href="/wheels?category=street">STREET</a><a href="/wheels?category=trail">TRAIL</a><a href="/wheels?category=dually">DUALLY</a><a href="/wheels?sort=new">NEW ARRIVALS</a></div><div className="mw-footer-column"><b>EXPLORE</b><a href="/visualizer">VISUALIZER</a><a href="/dealers">FIND A DEALER</a><a href="/dealers">BECOME A DEALER</a><a href="/merch">MERCH</a></div><div className="mw-footer-column"><b>INFORMATION</b><a href="/contact">CONTACT US</a><a href="/faq">WHEEL FAQS</a><a href="/warranty">WARRANTY</a><a href="/privacy">PRIVACY</a></div></div>
        <div className="mw-footer-bottom"><span>© 2026 THE WHEEL GROUP. ALL RIGHTS RESERVED.</span><span>MAYHEM WHEELS</span><a href="/accessibility">ACCESSIBILITY</a></div>
      </footer>
    </main>
  );
}
