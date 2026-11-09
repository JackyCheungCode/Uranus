import type { Metadata } from "next";
import { WheelConfigurator } from "@/components/wheel-configurator";

export const metadata: Metadata = {
  title: "Wheel Configuration Studio",
  description: "Configure your performance wheel setup.",
};

export default function ConfiguratorPage() {
  return <>
    <section className="bg-[#0b0e12] px-5 py-14 text-white sm:px-10 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[10px] font-bold tracking-[.22em] text-white/45">URANUS PERFORMANCE / PERSONAL CONFIGURATION</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[.94] tracking-[-.04em] text-white sm:text-6xl lg:text-7xl">MAKE IT<br/>YOUR OWN.</h1>
        <p className="mt-6 max-w-xl text-sm font-light leading-7 text-white/60">Build a wheel setup around your vehicle, your preferred design and the details that define your stance.</p>
      </div>
    </section>
    <section className="mx-auto max-w-[1600px] px-0 py-0"><WheelConfigurator/></section>
  </>;
}
