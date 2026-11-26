import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react/ssr";
import {
  getComponentChunkLinks,
  getFontLinks,
  getIconLinks,
  getMetaTagsAndIconLinks,
} from "@porsche-design-system/components-react/partials";
import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "URANUS Wheels — Precision in Motion",
    template: "%s | URANUS Wheels",
  },
  description:
    "Performance wheel engineering, precision-machined details, and vehicle-specific fitment.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {getFontLinks({ format: "jsx" })}
        {getIconLinks({ format: "jsx" })}
        {getComponentChunkLinks({ format: "jsx" })}
        {getMetaTagsAndIconLinks({ appTitle: "URANUS Wheels", format: "jsx" })}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <SiteShell>{children}</SiteShell>
        </PorscheDesignSystemProvider>
      </body>
    </html>
  );
}
