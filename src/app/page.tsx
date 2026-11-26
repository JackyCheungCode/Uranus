"use client";

import { useRef, useState } from "react";
import { PCarousel, PButton, PHeading, PLinkTile, PText } from "@porsche-design-system/components-react/ssr";

const cdn = "https://mayhemwheels.com/cdn/shop/files/";
const heroPoster = "https://mayhemwheels.com/cdn/shop/files/preview_images/8afaf56dea5c4eb3973c46668df55d16.thumbnail.0000000000.jpg?v=1793395054&width=2400";
const videoSrc = "https://videos.pexels.com/video-files/33968285/14411956_1920_1080_60fps.mp4";

const featuredWheels = [
  { name: "HORIZON", number: "8120", finish: "GLOSS BLACK", image: cdn + "Mayhem8120-6GB1.png?v=1789750229&width=1200", href: "/products/8120-horizon" },
  { name: "CYCLONE", number: "8121", finish: "GLOSS BLACK", image: cdn + "Mayhem8121-6GB1.png?v=1789750230&width=1200", href: "/products/8121-cyclone" },
  { name: "BLIZZARD", number: "8122", finish: "GLOSS BLACK", image: cdn + "Mayhem8122-6GB1-CAN.png?v=1791917407&width=1200", href: "/products/8122-blizzard" },
  { name: "VECTOR", number: "8310", finish: "GLOSS BLACK", image: cdn + "Mayhem8310-6GB1.png?v=1789751560&width=1200", href: "/products/8310-vector" },
];

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
      className="uranus-template-hero scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)] relative"
      aria-labelledby="home-heading"
    >
      <video
        ref={videoRef}
        className="z-1 col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
        poster={heroPoster}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="uranus-template-hero-shade z-2 col-span-full row-span-full" />
      <div className="z-3 col-extended row-span-full mb-fluid-xl uranus-template-hero-copy">
        <PHeading id="home-heading" tag="h1" size="3xl">
          <span className="text-md block">URANUS / WHEEL DESIGN</span>
          Made to move.
        </PHeading>
        <PText className="mt-fluid-md max-w-[38rem]" color="contrast-high">
          Distinctive wheel design. Precision fitment. A considered approach to every vehicle.
        </PText>
        <a className="uranus-template-primary-link mt-fluid-lg" href="/wheels">Explore wheels <span aria-hidden="true">↗</span></a>
      </div>
      <PButton
        className="z-3 col-wide place-self-end row-span-full mb-fluid-xl"
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
    <main className="uranus-landing grid-template gap-y-fluid-xl pb-fluid-2xl">
      <HeroVideo />

      <section
        className="scheme-dark col-full grid grid-cols-subgrid gap-y-fluid-md bg-canvas p-fluid-xl -mt-fluid-xl -mb-fluid-xl"
        aria-label="Explore Uranus"
      >
        <div className="col-basic grid grid-cols-subgrid gap-y-fluid-md">
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/wheels?category=street"
            label="Street collection"
            description="Purposeful design for the everyday drive"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800"} alt="Street wheel collection on a vehicle" />
          </PLinkTile>
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/wheels?category=trail"
            label="Trail collection"
            description="Take your build beyond the pavement"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={cdn + "Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800"} alt="Trail wheel collection on an off-road vehicle" />
          </PLinkTile>
        </div>
      </section>

      <section className="col-full grid grid-cols-subgrid py-fluid-xl" aria-label="Featured wheel designs">
        <PCarousel
          className="col-span-full"
          slidesPerPage={{ base: 1, xs: 1, m: 1 }}
          alignHeader="center"
          width="extended"
          heading="Featured wheel designs"
        >
          {featuredWheels.map(wheel => (
            <PLinkTile
              key={wheel.number}
              gradient={true}
              href={wheel.href}
              label={wheel.number + " " + wheel.name}
              description={wheel.finish + " · " + wheel.number}
              compact={true}
              aspectRatio={{ base: "1/1", xs: "16/9" }}
              weight="regular"
            >
              <img src={wheel.image} alt={wheel.number + " " + wheel.name + " wheel in " + wheel.finish} loading="lazy" />
            </PLinkTile>
          ))}
        </PCarousel>
      </section>

      <section className="col-basic grid grid-cols-subgrid gap-y-fluid-xl" aria-label="Uranus design and engineering">
        <div className="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="col-span-full md:col-start-1 md:col-end-7 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={cdn + "Mayhem_Street_8119_Vanquish_1.jpg?v=1793656266&width=1800"}
            alt="Uranus street wheel design fitted to a vehicle"
            loading="lazy"
          />
          <div className="col-span-full md:col-start-8 md:col-end-13 md:row-start-1 flex flex-col justify-center items-start">
            <PHeading tag="h2" size="md">Design with purpose.</PHeading>
            <PText className="mt-fluid-sm">
              Every wheel begins with proportion, material and intent. Explore designs developed to bring a distinctive character to trucks, Jeep and SUVs.
            </PText>
            <PText className="mt-fluid-sm" size="xs" color="contrast-medium">
              FORM / FINISH / FUNCTION
            </PText>
            <a className="uranus-template-text-link mt-fluid-lg" href="/wheels">Discover the collection <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="col-span-full md:col-start-7 md:col-end-13 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={cdn + "Mayhem_Trail_8306_Ridgeline.jpg?v=1791914224&width=1800"}
            alt="Off-road vehicle with trail wheel setup"
            loading="lazy"
          />
          <div className="col-span-full md:col-start-1 md:col-end-6 md:row-start-1 flex flex-col justify-center items-start">
            <PHeading tag="h2" size="md">Fitment, considered.</PHeading>
            <PText className="mt-fluid-sm">
              Start with your vehicle and explore wheel sizes and specifications designed around your setup.
            </PText>
            <PText className="mt-fluid-sm" size="xs" color="contrast-medium">
              VEHICLE / SIZE / COMPATIBILITY
            </PText>
            <a className="uranus-template-text-link mt-fluid-lg" href="/wheels">Find your fit <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
