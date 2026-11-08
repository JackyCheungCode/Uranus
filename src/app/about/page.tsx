import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-20 md:px-10">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted">OUR APPROACH</p>
      <h1 className="mt-3 max-w-4xl text-4xl sm:text-6xl">ENGINEERING THE DETAILS THAT CHANGE THE DRIVE.</h1>
      <p className="mt-8 max-w-2xl text-base font-light leading-8 text-muted">URANUS is an independent aftermarket wheel concept focused on considered design, clear specifications, and vehicle-first fitment guidance. Brand story, manufacturing details, and company information will be added as they are confirmed.</p>
    </section>
  );
}
