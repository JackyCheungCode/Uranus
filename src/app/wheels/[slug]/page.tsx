import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { wheels } from "@/lib/data/wheels";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return wheels.map((wheel) => ({ slug: wheel.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wheel = wheels.find((item) => item.slug === slug);
  return { title: wheel?.name ?? "Wheel Detail" };
}

export default async function WheelDetailPage({ params }: Props) {
  const { slug } = await params;
  const wheel = wheels.find((item) => item.slug === slug);
  if (!wheel) notFound();

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
      <Link href="/wheels" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-muted hover:text-brand"><ArrowLeft size={14} /> BACK TO COLLECTION</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex min-h-[420px] items-center justify-center bg-surface">
          <div className="flex h-64 w-64 items-center justify-center border-[20px] border-[#777777] outline outline-1 outline-[#444444]">
            <div className="flex h-32 w-32 items-center justify-center border-[14px] border-[#444444]"><span className="text-xs font-bold">U / 01</span></div>
          </div>
        </div>
        <div className="py-4">
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted">{wheel.category}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{wheel.name}</h1>
          <p className="mt-5 text-sm font-light leading-7 text-muted">{wheel.description}</p>
          <p className="mt-8 text-2xl font-bold text-ink">{wheel.price} <span className="text-xs font-light text-muted">/ SET STARTING</span></p>
          <Card className="mt-8 border-line">
            <CardHeader><h2 className="text-sm">KEY SPECIFICATIONS</h2></CardHeader>
            <CardContent className="grid grid-cols-2 gap-5">
              <div><p className="text-[10px] font-bold tracking-wider text-muted">FINISH</p><p className="mt-1 text-sm">{wheel.finish}</p></div>
              <div><p className="text-[10px] font-bold tracking-wider text-muted">BOLT PATTERN</p><p className="mt-1 text-sm">{wheel.fitment}</p></div>
              <div className="col-span-2"><p className="text-[10px] font-bold tracking-wider text-muted">AVAILABLE SIZES</p><p className="mt-1 text-sm">{wheel.size}</p></div>
            </CardContent>
          </Card>
          <Link href="/vehicle-fitment" className="mt-8 inline-block"><Button>CHECK VEHICLE FITMENT <ArrowRight size={15} /></Button></Link>
        </div>
      </div>
    </section>
  );
}
