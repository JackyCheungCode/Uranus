import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ContentSection = {
  number: string;
  title: string;
  description: string;
  bullets?: string[];
};

type ContentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: ContentSection[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  note?: string;
};

export function ContentPage({
  eyebrow,
  title,
  description,
  sections,
  primaryHref = "/request-quote",
  primaryLabel = "REQUEST A QUOTE",
  secondaryHref = "/wheels",
  secondaryLabel = "EXPLORE WHEELS",
  note,
}: ContentPageProps) {
  return (
    <>
      <section className="bg-[#1a2129] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <p className="text-[10px] font-bold tracking-[0.22em] text-white/55">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl whitespace-pre-line text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/70 sm:text-base">{description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={primaryHref}><Button>{primaryLabel} <ArrowRight size={15} /></Button></Link>
            <Link href={secondaryHref}><Button variant="inverse">{secondaryLabel} <ArrowUpRight size={15} /></Button></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-px bg-line md:grid-cols-2">
          {sections.map((section) => (
            <article key={section.number} className="min-h-[250px] bg-white p-6 sm:p-9 lg:p-10">
              <div className="flex items-center justify-between border-b border-line pb-5">
                <span className="text-[10px] font-bold tracking-[0.18em] text-muted">{section.number} / URANUS</span>
                <span className="h-1 w-8 bg-brand" aria-hidden="true" />
              </div>
              <h2 className="mt-8 max-w-lg text-2xl font-bold leading-tight sm:text-3xl">{section.title}</h2>
              <p className="mt-4 max-w-xl text-sm font-light leading-7 text-muted">{section.description}</p>
              {section.bullets && (
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-xs font-light leading-6 text-body"><span className="mt-[9px] h-1 w-1 shrink-0 bg-brand" />{bullet}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
        {note && <p className="mt-8 border-l-2 border-brand bg-surface px-5 py-4 text-xs font-light leading-6 text-muted">{note}</p>}
      </section>
    </>
  );
}
