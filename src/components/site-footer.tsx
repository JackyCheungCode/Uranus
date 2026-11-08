import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-xl font-bold tracking-[0.16em]">URANUS</p>
          <p className="mt-4 max-w-sm text-sm font-light leading-7 text-white/70">
            Precision wheel design, fitment guidance, and considered details for drivers who care about every line.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.12em]">EXPLORE</p>
          <div className="mt-4 flex flex-col gap-3 text-sm font-light text-white/70">
            <Link href="/wheels">Wheel collection</Link>
            <Link href="/vehicle-fitment">Vehicle fitment</Link>
            <Link href="/configurator">Configurator</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.12em]">INFORMATION</p>
          <div className="mt-4 flex flex-col gap-3 text-sm font-light text-white/70">
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 px-5 py-5 text-[10px] font-light tracking-[0.08em] text-white/60 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-2 sm:flex-row">
          <span>© {new Date().getFullYear()} URANUS. ALL RIGHTS RESERVED.</span>
          <span>INDEPENDENT AFTERMARKET WHEEL BRAND. NOT AFFILIATED WITH BMW AG.</span>
        </div>
      </div>
    </footer>
  );
}
