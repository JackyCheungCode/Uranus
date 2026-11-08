import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Wheel } from "@/lib/data/wheels";
import { Card } from "@/components/ui/card";

export function WheelCard({ wheel }: { wheel: Wheel }) {
  return (
    <Card className="group flex h-full flex-col border-0 bg-surface">
      <Link href={`/wheels/${wheel.slug}`} className="block">
        <div className="flex aspect-[4/3] items-center justify-center border-b border-line bg-[#eeeeee] p-8">
          <div className="flex h-40 w-40 items-center justify-center border-[12px] border-[#777777] outline outline-1 outline-[#444444]">
            <div className="flex h-20 w-20 items-center justify-center border-[8px] border-[#444444]">
              <span className="text-[9px] font-bold tracking-widest text-ink">U</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10px] font-bold tracking-[0.12em] text-muted">{wheel.category}</p>
          <h3 className="mt-2 text-lg">{wheel.name}</h3>
          <p className="mt-2 text-xs font-light text-muted">{wheel.finish} · {wheel.size}</p>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-bold text-ink">{wheel.price} <span className="text-[10px] font-light text-muted">/ SET STARTING</span></span>
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Card>
  );
}
