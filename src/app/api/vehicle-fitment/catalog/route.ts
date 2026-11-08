import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_RESOURCES = new Set(["models", "years", "generations", "modifications"]);
const SUPPORTED_REGIONS = new Set(["usdm", "cdm", "mxndm", "ladm", "eudm", "rus", "jdm", "chdm", "skdm", "sam", "medm", "nadm", "sadm", "audm"]);

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEELSIZE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Wheel-Size API is not configured on the server." }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const resource = params.get("resource") || "";
  if (!ALLOWED_RESOURCES.has(resource)) {
    return NextResponse.json({ error: "Unsupported vehicle catalog resource." }, { status: 400 });
  }
  const region = params.get("region");
  if (region && !SUPPORTED_REGIONS.has(region.toLowerCase())) {
    return NextResponse.json({ error: "Unsupported market / region." }, { status: 400 });
  }

  const upstream = new URL(`https://api.wheel-size.com/v2/${resource}/`);
  for (const key of ["make", "model", "year", "generation", "region", "offset", "limit"]) {
    const value = params.get(key);
    if (value) upstream.searchParams.set(key, value);
  }
  upstream.searchParams.set("make", "bmw");
  upstream.searchParams.set("user_key", apiKey);

  try {
    const response = await fetch(upstream, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to reach the vehicle catalog. Please try again." }, { status: 502 });
  }
}
