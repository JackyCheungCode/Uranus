import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
 title: { default: "Uranus | Wheels for Trucks, Jeep & SUVs", template: "%s | Uranus" },
 description: "Explore wheel styles, vehicle fitment data and technical specifications for trucks, Jeep and SUVs.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
 return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
