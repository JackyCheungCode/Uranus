import type { MetadataRoute } from "next";
import { wheels } from "@/lib/data/wheels";

const baseUrl = "https://uranus.xg-y.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/wheels", "/vehicle-fitment", "/configurator", "/about", "/contact", "/technology", "/finishes", "/advice", "/advice/wheel-fitment-basics", "/advice/wheel-construction", "/insights", "/dealers", "/faq", "/shipping-returns", "/warranty", "/request-quote", "/legal/privacy", "/legal/terms"];
  const staticEntries = pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const productEntries = wheels.map((wheel) => ({
    url: `${baseUrl}/wheels/${wheel.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...staticEntries, ...productEntries];
}
