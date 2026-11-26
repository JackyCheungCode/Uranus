import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
 title: { default: "Uranus | Wheel Design & Vehicle Fitment", template: "%s | Uranus" },
 description: "Explore considered wheel design, vehicle fitment and technical specifications for your vehicle.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
 return <html lang="en" className="scheme-light bg-canvas"><body><SiteShell>{children}</SiteShell></body></html>;
}
