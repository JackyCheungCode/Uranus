import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://api.wheel-size.com/v2";
const RESOURCES: Record<string, string> = {
  makes: "/makes/",
  models: "/models/",
  years: "/years/",
  modifications: "/modifications/",
  search: "/search/by_model/",
};
const ALLOWED_PARAMS = new Set(["make", "model", "year", "generation", "modification", "region", "trim", "body"]);

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEEL_SIZE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Wheel-size API credentials are not configured. Add WHEEL_SIZE_API_KEY as a server-side Cloudflare Worker secret." },
      { status: 503 }
    );
  }

  const resource = request.nextUrl.searchParams.get("resource") || "";
  const path = RESOURCES[resource];
  if (!path) return NextResponse.json({ error: "Unsupported vehicle-fitment resource." }, { status: 400 });

  const params = new URLSearchParams({ user_key: apiKey });
  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    if (key !== "resource" && ALLOWED_PARAMS.has(key) && value) params.set(key, value);
  }
  if (!params.has("region")) params.set("region", "usdm");

  try {
    const response = await fetch(`${API_BASE}${path}?${params.toString()}`, {
      headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
      next: { revalidate: resource === "search" ? 0 : 3600 },
    });
    const body = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: body?.message || body?.detail || "Wheel-size API request failed.", upstreamStatus: response.status },
        { status: response.status === 401 || response.status === 403 ? 502 : response.status }
      );
    }
    return NextResponse.json(body, {
      headers: { "Cache-Control": resource === "search" ? "no-store" : "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ error: "Wheel-size API is temporarily unavailable." }, { status: 502 });
  }
}
