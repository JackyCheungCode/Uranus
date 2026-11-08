import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEELSIZE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Wheel-Size API is not configured on the server." }, { status: 503 });
  }

  const source = request.nextUrl.searchParams;
  const model = source.get("model");
  const year = source.get("year");
  const region = source.get("region") || "usdm";
  const generation = source.get("generation");
  const modification = source.get("modification");

  if (!model || !year) {
    return NextResponse.json({ error: "Select a BMW model and model year first." }, { status: 400 });
  }

  const upstream = new URL("https://api.wheel-size.com/v2/search/by_model/");
  upstream.searchParams.set("make", "bmw");
  upstream.searchParams.set("model", model);
  upstream.searchParams.set("year", year);
  upstream.searchParams.set("region", region);
  if (generation) upstream.searchParams.set("generation", generation);
  if (modification) upstream.searchParams.set("modification", modification);
  upstream.searchParams.set("user_key", apiKey);

  try {
    const response = await fetch(upstream, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve fitment data. Please try again." }, { status: 502 });
  }
}
