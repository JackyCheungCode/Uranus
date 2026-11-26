import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
 title: { default: "Mayhem Wheels | Custom Truck, Jeep & SUV Wheels", template: "%s | Mayhem Wheels" },
 description: "Explore Mayhem wheels for trucks, Jeep and SUV applications. Find your fit, compare styles and discover wheel specifications.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
 return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}
