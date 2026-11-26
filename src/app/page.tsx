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
      className="scheme-dark z-0 col-full grid grid-cols-subgrid items-end h-[clamp(480px,80vh,1000px)] relative before:absolute before:inset-[50%_0_0_0] before:z-2 before:pointer-events-none before:bg-linear-to-t before:from-canvas before:to-transparent"
      aria-labelledby="heading-section-1"
    >
      <video
        ref={videoRef}
        className="z-1 col-span-full row-span-full min-w-full w-full min-h-full h-full object-cover object-center"
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
      <div className="z-2 col-extended row-span-full mb-fluid-lg uranus-template-hero-copy">
        <PHeading id="heading-section-1" className="pb-fluid-md" tag="h1" size="3xl">
          <span className="text-md block">URANUS</span>
          Engineered to move.
        </PHeading>
        <PText color="contrast-high" className="uranus-template-hero-description">
          Wheel design, vehicle fitment and a more considered way to build your vehicle.
        </PText>
        <PButton className="mt-fluid-md" variant="secondary" href="/wheels">
          Explore wheels
        </PButton>
      </div>
      <PButton
        className="z-3 col-wide place-self-end row-span-full mb-fluid-lg"
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
        className="scheme-dark col-full grid grid-cols-subgrid gap-y-fluid-md bg-canvas p-fluid-xl -mt-fluid-xl -mb-fluid-xl"
        aria-label="Explore Uranus"
      >
        <div className="col-basic grid grid-cols-subgrid gap-y-fluid-md">
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/wheels?category=street"
            label="Street collection"
            description="A distinctive look for the everyday drive"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={media.raceWheel} alt="Close-up of a performance wheel and tire" />
          </PLinkTile>
          <PLinkTile
            className="col-span-full sm:col-span-one-half"
            href="/wheels?category=trail"
            label="Off-road collection"
            description="Built for the road beyond the pavement"
            compact={true}
            weight="regular"
            aspectRatio={{ base: "4/3", xs: "16/9", s: "3/4", m: "1/1" }}
          >
            <img src={media.redWheel} alt="Sports car wheel on a race track" />
          </PLinkTile>
        </div>
      </section>

      <section className="col-full grid grid-cols-subgrid py-fluid-xl" aria-label="Featured wheel stories">
        <PCarousel
          className="col-span-full"
          slidesPerPage={{ base: 1, xs: 1, m: 1 }}
          alignHeader="center"
          width="extended"
          heading="Discover the details"
        >
          <PLinkTile gradient={true} href="/wheels" label="Form and proportion" description="Wheel design" compact={true} aspectRatio={{ base: "1/1", xs: "16/9" }} weight="regular">
            <img src={media.blackWheel} alt="Close-up of a dark alloy wheel" loading="lazy" />
          </PLinkTile>
          <PLinkTile gradient={true} href="/wheels" label="Performance character" description="On the track" compact={true} aspectRatio={{ base: "1/1", xs: "16/9" }} weight="regular">
            <img src={media.raceCar} alt="Race car on circuit" loading="lazy" />
          </PLinkTile>
          <PLinkTile gradient={true} href="/visualizer" label="Your vehicle, reimagined" description="Wheel visualizer" compact={true} aspectRatio={{ base: "1/1", xs: "16/9" }} weight="regular">
            <img src={media.drift} alt="Sports car driving on a race track" loading="lazy" />
          </PLinkTile>
          <PLinkTile gradient={true} href="/garage" label="A considered setup" description="Vehicle fitment" compact={true} aspectRatio={{ base: "1/1", xs: "16/9" }} weight="regular">
            <img src={media.showroom} alt="Detailed view of a performance car" loading="lazy" />
          </PLinkTile>
        </PCarousel>
      </section>

      <section className="col-basic grid grid-cols-subgrid gap-y-fluid-xl" aria-label="Uranus design and engineering">
        <div className="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="col-span-full md:col-start-1 md:col-end-7 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={media.raceWheel}
            alt="Detailed view of an automotive wheel"
            loading="lazy"
          />
          <div className="col-span-full md:col-start-8 md:col-end-13 md:row-start-1 flex flex-col justify-center items-start">
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
        <div className="col-span-full grid grid-cols-subgrid gap-y-fluid-lg">
          <img
            className="col-span-full md:col-start-7 md:col-end-13 md:row-start-1 w-full aspect-4/3 md:aspect-3/4 object-cover rounded-3xl"
            src={media.redWheel}
            alt="Performance wheel fitted to a sports car"
            loading="lazy"
          />
          <div className="col-span-full md:col-start-1 md:col-end-6 md:row-start-1 flex flex-col justify-center items-start">
            <PHeading tag="h2" size="md">Fitment, made clear.</PHeading>
            <PText className="mt-fluid-sm">
              Start with your vehicle. Review wheel dimensions and compatibility information before choosing a setup.
            </PText>
            <PText className="mt-fluid-sm" size="xs" color="contrast-medium">
              VEHICLE / DIMENSIONS / COMPATIBILITY
            </PText>
            <a className="uranus-template-text-link mt-fluid-lg" href="/wheels">Find your fit <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
