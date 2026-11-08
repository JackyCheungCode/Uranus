import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const REGIONS = new Set(["usdm", "cdm", "mxndm", "ladm", "eudm", "rus", "jdm", "chdm", "skdm", "sam", "medm", "nadm", "sadm", "audm"]);

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEELSIZE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Wheel-Size API is not configured on the server." }, { status: 503 });

  const params = request.nextUrl.searchParams;
  const searchType = params.get("search_type");
  const mode = searchType === "drilldown" ? params.get("fitment_type") : searchType;
  if (mode !== "rim" && mode !== "tire") return NextResponse.json({ error: "Choose a rim or tire search." }, { status: 400 });

  const regions = params.getAll("region").map((value) => value.toLowerCase()).filter((value) => REGIONS.has(value));
  if (!regions.length || params.getAll("region").length !== regions.length) {
    return NextResponse.json({ error: "Select at least one valid market region." }, { status: 400 });
  }

  const isDrilldown = searchType === "drilldown";
  const model = params.get("model") ?? "";
  const generation = params.get("generation") ?? "";
  if (isDrilldown && (!/^[a-z0-9-]+$/i.test(model) || !/^[a-z0-9-]+$/i.test(generation))) {
    return NextResponse.json({ error: "A valid model and generation are required to load modifications." }, { status: 400 });
  }

  const endpoint = isDrilldown
    ? mode === "rim" ? "classified/by_rim/search/modifications/" : "classified/by_tire/search/modifications/"
    : mode === "rim" ? "by_rim/search/" : "by_tire/search/";
  const upstream = new URL(`https://api.wheel-size.com/v2/${endpoint}`);
  upstream.searchParams.set("make", "bmw");
  if (isDrilldown) {
    upstream.searchParams.set("model", model);
    upstream.searchParams.set("generation", generation);
  }
  for (const region of regions) upstream.searchParams.append("region", region);

  const rimFields = ["bolt_pattern", "rim_diameter", "rim_diameter_min", "rim_diameter_max", "rim_width", "rim_width_min", "rim_width_max", "offset", "offset_min", "offset_max", "cb", "cb_min", "cb_max", "mode", "sort"];
  const tireFields = ["section_width", "aspect_ratio", "rim_diameter", "fitment", "load_index", "speed_symbol", "load_index_min", "load_index_max", "speed_symbol_min", "speed_symbol_max"];
  const allowed = mode === "rim" ? rimFields : tireFields;
  for (const key of allowed) {
    const value = params.get(key);
    if (value) upstream.searchParams.set(key, value);
  }

  const required = mode === "rim"
    ? ["rim_diameter", "rim_width"]
    : ["section_width", "aspect_ratio", "rim_diameter"];
  const missing = required.filter((key) => !upstream.searchParams.has(key));
  if (missing.length) return NextResponse.json({ error: `Missing required search fields: ${missing.join(", ")}.` }, { status: 400 });

  const requestedLimit = Number(params.get("limit") ?? (isDrilldown ? "100" : "50"));
  const requestedOffset = Number(params.get("offset") ?? "0");
  if (!Number.isInteger(requestedLimit) || requestedLimit < 1 || requestedLimit > 100 || !Number.isInteger(requestedOffset) || requestedOffset < 0) {
    return NextResponse.json({ error: "Invalid pagination values." }, { status: 400 });
  }
  upstream.searchParams.set("limit", String(requestedLimit));
  upstream.searchParams.set("offset", String(requestedOffset));
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
