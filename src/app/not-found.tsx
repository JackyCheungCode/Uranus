import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-surface-dark text-white">
      <div className="mx-auto flex min-h-[68vh] max-w-[1440px] flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white/55">URANUS / 404</p>
        <h1 className="mt-5 text-6xl font-bold text-white sm:text-8xl">PAGE NOT FOUND.</h1>
        <p className="mt-6 max-w-xl text-sm font-light leading-7 text-white/70">The page may have moved or the address may be incorrect. Return to the collection or start a new fitment search.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/"><Button><ArrowLeft size={15} /> BACK HOME</Button></Link>
          <Link href="/wheels"><Button variant="inverse">EXPLORE WHEELS <ArrowRight size={15} /></Button></Link>
        </div>
      </div>
    </section>
  );
}
