import type { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted">WE ARE HERE TO HELP</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">LET&apos;S TALK FITMENT.</h1>
      <Card className="mt-10 max-w-2xl">
        <CardHeader><h2 className="text-lg">SEND AN ENQUIRY</h2></CardHeader>
        <CardContent>
          <form className="grid gap-5">
            <label className="grid gap-2 text-xs font-bold tracking-wide">NAME<Input placeholder="Your name" /></label>
            <label className="grid gap-2 text-xs font-bold tracking-wide">EMAIL<Input type="email" placeholder="you@example.com" /></label>
            <label className="grid gap-2 text-xs font-bold tracking-wide">VEHICLE / ENQUIRY<Input placeholder="Tell us what you drive" /></label>
            <Button type="button">SUBMIT ENQUIRY</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
