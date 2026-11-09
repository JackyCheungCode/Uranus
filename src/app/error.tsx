"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
      <AlertCircle size={28} strokeWidth={1.5} aria-hidden="true" />
      <p className="mt-6 text-[10px] font-bold tracking-[0.2em] text-muted">URANUS / SOMETHING WENT WRONG</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">WE COULDN&apos;T LOAD THIS PAGE.</h1>
      <p className="mt-5 max-w-xl text-sm font-light leading-7 text-muted">Please try again. If the problem continues, return to the collection and restart your journey.</p>
      {error.digest && <p className="mt-3 text-[10px] text-muted">REFERENCE: {error.digest}</p>}
      <div className="mt-8"><Button onClick={() => reset()}><RefreshCw size={15} /> TRY AGAIN</Button></div>
    </section>
  );
}
