import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = "https://uranus.xg-y.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "URANUS — Precision Wheel Engineering",
    template: "%s | URANUS",
  },
  description: "Explore performance aftermarket wheels, configure finishes and dimensions, and review vehicle fitment reference data.",
  applicationName: "URANUS Performance Wheels",
  openGraph: {
    type: "website",
    siteName: "URANUS Performance Wheels",
    title: "URANUS — Precision Wheel Engineering",
    description: "Performance wheel design, product configuration and vehicle-first fitment reference.",
    url: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="sr-only z-[100] bg-brand px-5 py-3 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          SKIP TO CONTENT
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
