import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const REGIONS = new Set(["usdm", "cdm", "mxndm", "ladm", "eudm", "rus", "jdm", "chdm", "skdm", "sam", "medm", "nadm", "sadm", "audm"]);

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEELSIZE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Wheel-Size API is not configured on the server." }, { status: 503 });

  const params = request.nextUrl.searchParams;
  const mode = params.get("search_type");
  if (mode !== "rim" && mode !== "tire") return NextResponse.json({ error: "Choose a rim or tire search." }, { status: 400 });

  const regions = params.getAll("region").map((value) => value.toLowerCase()).filter((value) => REGIONS.has(value));
  if (!regions.length || params.getAll("region").length !== regions.length) {
    return NextResponse.json({ error: "Select at least one valid market region." }, { status: 400 });
  }

  const endpoint = mode === "rim" ? "by_rim/search/" : "by_tire/search/";
  const upstream = new URL(`https://api.wheel-size.com/v2/${endpoint}`);
  upstream.searchParams.set("make", "bmw");
  for (const region of regions) upstream.searchParams.append("region", region);

  const allowed = mode === "rim"
    ? ["bolt_pattern", "rim_diameter", "rim_diameter_min", "rim_diameter_max", "rim_width", "rim_width_min", "rim_width_max", "offset", "offset_min", "offset_max", "cb", "cb_min", "cb_max", "mode", "sort", "offset", "limit"]
    : ["section_width", "aspect_ratio", "rim_diameter", "fitment", "load_index", "speed_symbol", "load_index_min", "load_index_max", "speed_symbol_min", "speed_symbol_max", "offset", "limit"];
  for (const key of new Set(allowed)) {
    const value = params.get(key);
    if (value) upstream.searchParams.set(key, value);
  }

  const required = mode === "rim"
    ? ["rim_diameter", "rim_width"]
    : ["section_width", "aspect_ratio", "rim_diameter"];
  const missing = required.filter((key) => !upstream.searchParams.has(key));
  if (missing.length) return NextResponse.json({ error: `Missing required search fields: ${missing.join(", ")}.` }, { status: 400 });

  if (!upstream.searchParams.has("limit")) upstream.searchParams.set("limit", "50");
  if (!upstream.searchParams.has("offset")) upstream.searchParams.set("offset", "0");
  upstream.searchParams.set("user_key", apiKey);

  try {
    const response = await fetch(upstream, {
      headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const payload: unknown = await response.json();
    if (!response.ok) {
      const body = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
      const detail = body.detail ?? body.message ?? body.error;
      return NextResponse.json({ error: detail ? `Wheel-Size API: ${String(detail)}` : `Wheel-Size API returned HTTP ${response.status}.` }, { status: response.status });
    }
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "Unable to retrieve compatible BMW vehicles. Please try again." }, { status: 502 });
  }
}
