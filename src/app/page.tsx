const navigation = [
  { label: "Wheels", href: "#wheels" },
  { label: "Visualizer", href: "#visualizer" },
  { label: "Technology", href: "#technology" },
  { label: "Dealers", href: "#dealers" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between border-b border-black/10 bg-[#f5f5f3]/95 px-6 backdrop-blur-xl lg:px-10">
        <a href="/" className="text-[19px] font-semibold tracking-[0.24em]">
          URANUS<span className="ml-2 text-[10px] font-normal tracking-[0.28em] text-[#777b80]">WHEELS</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#4d5054] transition-colors hover:text-black">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#fitment" className="border border-[#111214] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-[#111214] hover:text-white">
          Find Your Fit
        </a>
      </header>

      <aside className="fixed bottom-0 left-0 top-[76px] z-40 hidden w-[68px] flex-col items-center justify-between border-r border-black/10 bg-[#f5f5f3] py-7 lg:flex">
        <div className="flex flex-col items-center gap-8">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] uppercase tracking-[0.28em] text-[#777b80]">Precision Engineering</span>
          <span className="h-10 w-px bg-[#b9bdc1]" />
        </div>
        <span className="[writing-mode:vertical-rl] text-[9px] tracking-[0.2em] text-[#777b80]">EST. 2026</span>
      </aside>

      <section className="relative flex min-h-[780px] items-end overflow-hidden bg-[#17191b] px-7 pb-20 pt-36 text-white md:min-h-[900px] md:px-16 md:pb-28 lg:ml-[68px] lg:px-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(150,158,164,0.24),transparent_38%),linear-gradient(115deg,#17191b_0%,#24282c_52%,#111315_100%)]" />
        <div className="absolute right-[8%] top-[18%] hidden h-[430px] w-[430px] rounded-full border border-white/10 md:block">
          <div className="absolute inset-[28px] rounded-full border border-white/10" />
          <div className="absolute inset-[68px] rounded-full border border-white/10" />
          <div className="absolute inset-[112px] rounded-full border border-white/10" />
          <div className="absolute inset-[156px] rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.34em] text-[#b9c0c5]">Engineering / Performance / Form</p>
          <h1 className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.055em] md:text-7xl lg:text-[92px]">
            Precision<br />in motion.
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-7 text-[#c1c5c8] md:text-base">
            Engineered wheel systems defined by structural integrity, considered geometry, and uncompromising detail.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#wheels" className="bg-white px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111214] transition-colors hover:bg-[#d7dade]">Explore Wheels <span aria-hidden="true">↗</span></a>
            <a href="#technology" className="border border-white/35 px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10">Our Engineering</a>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden text-right text-[9px] uppercase tracking-[0.22em] text-white/45 md:block">
          <div>UR / SERIES 001</div>
          <div className="mt-2">DESIGNED FOR THE DRIVE</div>
        </div>
      </section>

      <section id="wheels" className="grid gap-8 px-7 py-24 md:grid-cols-[1fr_1.2fr] md:px-16 lg:ml-[68px] lg:px-24">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#777b80]">01 / Wheel systems</p>
          <h2 className="mt-5 max-w-md text-4xl font-medium leading-tight tracking-[-0.045em] md:text-5xl">Form follows function. Every detail has a purpose.</h2>
        </div>
        <div className="flex flex-col justify-end border-t border-[#c9cbcc] pt-6 md:pt-8">
          <p className="max-w-xl text-sm leading-7 text-[#62666a]">The product catalogue, technical specifications, vehicle fitment workflow, and wheel visualizer will be built on a verified product and vehicle data model.</p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#777b80]">Foundation build / Phase 01</p>
        </div>
      </section>

      <footer className="border-t border-[#dedfe1] px-7 py-8 text-[9px] uppercase tracking-[0.2em] text-[#777b80] md:px-16 lg:ml-[68px] lg:px-24">
        URANUS WHEELS <span className="mx-3">/</span> PRECISION ENGINEERING
      </footer>
    </main>
  );
}
