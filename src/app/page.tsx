"use client";

import { useRef, useState } from "react";
import { PCarousel, PButton, PHeading, PLinkTile, PText } from "@porsche-design-system/components-react/ssr";
import "./pds-landing-template.css";

const media = {
  heroPoster: "https://images.pexels.com/photos/18434037/pexels-photo-18434037/free-photo-of-close-up-of-a-racing-car.jpeg?auto=compress&dpr=1&h=1600&w=2400",
  heroVideo: "https://videos.pexels.com/video-files/33968285/14411956_1920_1080_60fps.mp4",
  raceWheel: "https://images.pexels.com/photos/30639412/pexels-photo-30639412/free-photo-of-close-up-of-race-car-wheel-in-motion.jpeg?auto=compress&dpr=1&h=1200&w=1800",
  redWheel: "https://images.pexels.com/photos/30773524/pexels-photo-30773524/free-photo-of-close-up-of-a-red-sports-car-wheel-on-track.jpeg?auto=compress&dpr=1&h=1200&w=1800",
  blackWheel: "https://images.pexels.com/photos/18434037/pexels-photo-18434037/free-photo-of-close-up-of-a-racing-car.jpeg?auto=compress&dpr=1&h=1200&w=1800",
  raceCar: "https://images.pexels.com/photos/29252120/pexels-photo-29252120/free-photo-of-formula-1-race-car-on-track-close-up.jpeg?auto=compress&dpr=1&h=1200&w=1800",
  drift: "https://images.pexels.com/photos/10467348/pexels-photo-10467348.jpeg?auto=compress&dpr=1&h=1200&w=1800",
  showroom: "https://images.pexels.com/photos/18434037/pexels-photo-18434037.jpeg?auto=compress&cs=tinysrgb&w=1800",
};

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="uranus-template-hero scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(560px,88svh,1000px)] relative before:absolute before:inset-[42%_0_0_0] before:z-2 before:pointer-events-none"
      aria-labelledby="heading-section-1"
    >
      <video
        ref={videoRef}
        className="uranus-template-hero-video z-1 col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
        poster={media.heroPoster}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={media.heroVideo} type="video/mp4" />
      </video>
      <div className="z-2 col-extended row-span-full mb-fluid-xl uranus-template-hero-copy">
        <PHeading id="heading-section-1" className="pb-fluid-md" tag="h1" size="3xl">
          <span className="text-md block">URANUS</span>
          Engineered to move.
        </PHeading>
        <PText color="contrast-high" className="uranus-template-hero-description">
          Wheel design, vehicle fitment and a more considered way to build your vehicle.
        </PText>
        <PButton className="mt-fluid-md" variant="secondary" onClick={() => { window.location.href = "/fitment"; }}>
          Explore wheels
        </PButton>
      </div>
      <PButton
        className="uranus-template-video-control z-3 col-wide place-self-end row-span-full mb-fluid-xl"
        variant="secondary"
        compact={true}
        hideLabel={true}
        icon={isPlaying ? "pause" : "play"}
        onClick={togglePlayback}
      >
        {isPlaying ? "Pause video" : "Play video"}
      </PButton>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="uranus-landing uranus-landing-template grid-template gap-y-fluid-xl pb-fluid-2xl">
      <HeroVideo />

      <section
        className="uranus-template-entry-section scheme-dark col-full grid grid-cols-subgrid gap-y-fluid-md bg-canvas p-fluid-xl -mt-fluid-xl -mb-fluid-xl"
        aria-label="Start your Uranus build"
      >
        <div className="col-basic grid grid-cols-subgrid gap-y-fluid-md">
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/fitment"
            onClick={(event) => {
              event.preventDefault();
              window.dispatchEvent(new Event("uranus:open-fitment"));
            }}
            label="Find your fit"
            description="Choose your vehicle and explore compatible wheels"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={media.raceWheel} alt="Performance wheel detail for vehicle fitment" />
          </PLinkTile>
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/visualizer"
            label="Create your own wheel"
            description="Customize a wheel design around your vision"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={media.redWheel} alt="Custom performance wheel on a sports car" />
          </PLinkTile>
        </div>
      </section>
      <section className="uranus-featured-stories col-full grid grid-cols-subgrid py-fluid-xl" aria-label="Explore wheel design dimensions">
        <div className="col-span-full">
          <PHeading tag="h2" size="xl">Explore wheels by design detail.</PHeading>
          <PText className="mt-fluid-sm" color="contrast-medium">
            Find the details that define your style — from spoke architecture and face depth to construction, finish and purpose.
          </PText>
        </div>
        <div className="uranus-wheel-discovery-grid col-span-full">
          <a className="uranus-wheel-discovery-card" href="/wheels?style=spoke-design">
            <img src="https://s.alicdn.com/@sc04/kf/H6e21dc48041a43b6a3009f94462e227fW/For-HRE-Forged-Alloy-Wheels-18-19-20-21-Inch-New-35mm-ET-Compatible-with-Mercedes-for-BMW-for-Xiaomi-Tesla-Hongxin-for-Passenger.png" alt="Forged alloy wheels with multi-spoke, split-spoke and mesh designs" loading="lazy" />
            <span className="uranus-wheel-discovery-index">01 / FORM</span>
            <h3>Spoke Design</h3>
            <p>Explore the character of five-spoke, split-spoke, Y-spoke, mesh and multi-spoke patterns.</p>
            <span className="uranus-wheel-discovery-link">Explore spoke styles ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=face-depth">
            <img src="https://postimg.easyarticlemarketing.com/illustrations/2c1b66b2-a332-4805-8a53-e6d1ca08db9c/visual-comparison-of-five-wheel-concavity-levels-from-flat-face-to-super-concave.jpg" alt="Comparison of flat, shallow, medium, deep and super-concave wheel faces" loading="lazy" />
            <span className="uranus-wheel-discovery-index">02 / PROFILE</span>
            <h3>Face Depth</h3>
            <p>Compare flat, shallow and deep-concave profiles to find the right visual depth and stance.</p>
            <span className="uranus-wheel-discovery-link">Explore face profiles ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=construction">
            <img src="https://cdn.shoptop.com/1791019793052323841.png" alt="One-piece, two-piece and three-piece alloy wheel construction comparison" loading="lazy" />
            <span className="uranus-wheel-discovery-index">03 / ENGINEERING</span>
            <h3>Wheel Construction</h3>
            <p>Understand monoblock, two-piece and three-piece construction — each with its own balance of design and customization.</p>
            <span className="uranus-wheel-discovery-link">Explore construction ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=lip">
            <img src="https://s.alicdn.com/@sc04/kf/H64a5faa46a804000aa9cd7e8a5ef6c8al/15-16-17-18-19-20-21-22-Inch-Deep-Dish-Chrome-Five-Spoke-Car-Rims-Racing-Wheels-2-piece-Custom-Forged-Wheels-for-bmw-Z3-G80.jpg" alt="Polished deep-lip multi-piece alloy wheel fitted to a sports car" loading="lazy" />
            <span className="uranus-wheel-discovery-index">04 / DETAIL</span>
            <h3>Lip Profile</h3>
            <p>From a clean flush edge to a pronounced step lip or deep dish, explore the finishing line of the wheel.</p>
            <span className="uranus-wheel-discovery-link">Explore lip styles ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=manufacturing">
            <img src="https://mazdashop.ca/cdn/shop/products/Fast-Wheels-FC09-Alloy-Wheel-Metallic-Gunmetal-17-18-20-3_1200x.jpg?v=1678473348" alt="Illustration of the alloy wheel flow-forming manufacturing process" loading="lazy" />
            <span className="uranus-wheel-discovery-index">05 / PROCESS</span>
            <h3>Manufacturing Process</h3>
            <p>Discover cast, flow-formed and forged production methods, and how each process shapes the wheel.</p>
            <span className="uranus-wheel-discovery-link">Explore processes ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=finish">
            <img src="https://static.wixstatic.com/media/d86eeb_6dd930f2fa7d4a7ebbd88039720f943a~mv2.png/v1/fill/w_1000%2Ch_497%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01/d86eeb_6dd930f2fa7d4a7ebbd88039720f943a~mv2.png" alt="Alloy wheel surface finishes including polished, brushed, satin and bronze" loading="lazy" />
            <span className="uranus-wheel-discovery-index">06 / MATERIAL</span>
            <h3>Surface & Finish</h3>
            <p>Compare colour and surface treatments, from polished aluminium and brushed metal to satin, gloss and two-tone finishes.</p>
            <span className="uranus-wheel-discovery-link">Explore finishes ↗</span>
          </a>
          <a className="uranus-wheel-discovery-card" href="/wheels?style=purpose">
            <img src="https://www.carce.cc/img/ckeditor/5359ef6cde728.jpg" alt="Wheel style references spanning sport, off-road, luxury and street looks" loading="lazy" />
            <span className="uranus-wheel-discovery-index">07 / CHARACTER</span>
            <h3>Purpose & Style</h3>
            <p>Browse styles shaped by their setting — motorsport, performance road, luxury, street and off-road.</p>
            <span className="uranus-wheel-discovery-link">Explore wheel styles ↗</span>
          </a>
        </div>
      </section>

      <section className="uranus-editorial-stories col-basic grid grid-cols-subgrid gap-y-fluid-xl" aria-label="Uranus design and engineering">
        <div className="uranus-editorial-row col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="uranus-editorial-image col-span-full md:col-start-1 md:col-end-7 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={media.raceCar}
            alt="Formula race car on circuit"
            loading="lazy"
          />
          <div className="uranus-editorial-copy col-span-full md:col-start-8 md:col-end-13 md:row-start-1 flex flex-col justify-center items-start">
            <PHeading tag="h2" size="md">Design in every detail.</PHeading>
            <PText className="mt-fluid-sm">
              A wheel changes the character of a vehicle. Explore considered proportions, finishes and forms created to make every build feel intentional.
            </PText>
            <PText className="mt-fluid-sm" size="xs" color="contrast-medium">
              FORM / MATERIAL / FINISH
            </PText>
            <a className="uranus-template-text-link mt-fluid-lg" href="/wheels">Explore wheel designs <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="uranus-editorial-row col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="uranus-editorial-image col-span-full md:col-start-7 md:col-end-13 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={media.drift}
            alt="Performance car cornering on a race track"
            loading="lazy"
          />
          <div className="uranus-editorial-copy col-span-full md:col-start-1 md:col-end-6 md:row-start-1 flex flex-col justify-center items-start">
            <PHeading tag="h2" size="md">Fitment, made clear.</PHeading>
            <PText className="mt-fluid-sm">
              Start with your vehicle. Review wheel dimensions and compatibility information before choosing a setup.
            </PText>
            <PText className="mt-fluid-sm" size="xs" color="contrast-medium">
              VEHICLE / DIMENSIONS / COMPATIBILITY
            </PText>
            <a className="uranus-template-text-link mt-fluid-lg" href="/fitment" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event("uranus:open-fitment")); }}>Find your fit <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
