import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative flex min-h-[min(900px,calc(100svh-var(--u-header-height)))] items-end overflow-hidden bg-[#17191b] px-[var(--u-page-gutter)] pb-20 pt-28 text-white transition-[margin] duration-[var(--u-duration-standard)] lg:ml-[var(--u-sidebar-current-width)] lg:pb-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(150,158,164,0.24),transparent_38%),linear-gradient(115deg,#17191b_0%,#24282c_52%,#111315_100%)]" />
        <div aria-hidden="true" className="absolute right-[8%] top-[18%] hidden aspect-square w-[min(38vw,430px)] rounded-full border border-white/10 md:block">
          <div className="absolute inset-[7%] rounded-full border border-white/10" />
          <div className="absolute inset-[16%] rounded-full border border-white/10" />
          <div className="absolute inset-[26%] rounded-full border border-white/10" />
          <div className="absolute inset-[36%] rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <Eyebrow className="mb-6 !text-[var(--u-color-muted-on-dark)]">Engineering / Performance / Form</Eyebrow>
          <h1 className="max-w-3xl text-[var(--u-type-display)] font-medium leading-[var(--u-leading-display)] tracking-[var(--u-tracking-display)]">
            Precision<br />in motion.
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-7 text-[#c1c5c8] md:text-base">
            Engineered wheel systems defined by structural integrity, considered geometry, and uncompromising detail.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ActionLink href="/wheels" tone="light">Explore Wheels</ActionLink>
            <ActionLink href="/technology" tone="outline">Our Engineering</ActionLink>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden text-right text-[9px] uppercase tracking-[0.22em] text-white/45 md:block">
          <div>UR / SERIES 001</div>
          <div className="mt-2">DESIGNED FOR THE DRIVE</div>
        </div>
      </section>

      <section className="py-[var(--u-space-24)] transition-[margin] duration-[var(--u-duration-standard)] lg:ml-[var(--u-sidebar-current-width)]">
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <SectionHeading eyebrow="01 / Wheel systems" title="Form follows function. Every detail has a purpose." />
            <div className="flex flex-col justify-end border-t border-[var(--u-color-line)] pt-6 md:pt-8">
              <p className="max-w-xl text-sm leading-7 text-[var(--u-color-muted)]">
                The product catalogue, technical specifications, vehicle fitment workflow, and wheel visualizer will be built on a verified product and vehicle data model.
              </p>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--u-color-muted)]">Foundation build / Phase 03</p>
            </div>
          </div>
        </Container>
      </section>

      <footer className="border-t border-[var(--u-color-line)] px-[var(--u-page-gutter)] py-8 text-[9px] uppercase tracking-[0.2em] text-[var(--u-color-muted)] transition-[margin] duration-[var(--u-duration-standard)] lg:ml-[var(--u-sidebar-current-width)]">
        URANUS WHEELS <span className="mx-3">/</span> PRECISION ENGINEERING
      </footer>
    </main>
  );
}
