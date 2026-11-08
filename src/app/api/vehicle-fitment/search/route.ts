import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RecordValue = Record<string, unknown>;

function asRecord(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : {};
}

function firstOeWheel(payload: unknown): RecordValue | null {
  const root = asRecord(payload);
  const rows = Array.isArray(root.data) ? root.data : Array.isArray(root.results) ? root.results : [];
  for (const row of rows) {
    const vehicle = asRecord(row);
    const wheels = vehicle.wheels ?? vehicle.wheel;
    const wheelRows = Array.isArray(wheels) ? wheels : wheels && typeof wheels === "object" ? [wheels] : [];
    const found = wheelRows.map(asRecord).find((wheel) => wheel.is_stock === true);
    if (found) return found;
  }
  return null;
}

function numeric(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && /^-?\\d+(?:\\.\\d+)?$/.test(value)) return value;
  return undefined;
}

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
    const payload: unknown = await response.json();
    if (!response.ok) return NextResponse.json(payload, { status: response.status });

    // Plus/minus sizing is requested only after a visitor explicitly submits a vehicle search.
    // One OE package is used for the sizing call to keep API usage predictable.
    let upsteps: unknown = null;
    let upstepsError: string | undefined;
    const oeWheel = firstOeWheel(payload);
    if (oeWheel) {
      const front = asRecord(oeWheel.front);
      const tire = String(front.tire_full ?? front.tire ?? "");
      const match = tire.match(/(\\d{3})\\/(\\d{2})R(\\d{2})/i);
      if (match) {
        const sizing = new URL("https://api.wheel-size.com/v2/upsteps/");
        sizing.searchParams.set("section_width", match[1]);
        sizing.searchParams.set("aspect_ratio", match[2]);
        sizing.searchParams.set("rim_diameter", match[3]);
        const rimWidth = numeric(front.rim_width);
        const rimOffset = numeric(front.rim_offset);
        if (rimWidth) sizing.searchParams.set("rim_width", rimWidth);
        if (rimOffset) sizing.searchParams.set("rim_offset", rimOffset);
        sizing.searchParams.set("steps_min", "-1");
        sizing.searchParams.set("steps_max", "2");
        sizing.searchParams.set("user_key", apiKey);
        try {
          const sizingResponse = await fetch(sizing, {
            headers: { Accept: "application/json" },
            cache: "no-store",
            signal: AbortSignal.timeout(15000),
          });
          const sizingPayload: unknown = await sizingResponse.json();
          if (sizingResponse.ok) upsteps = sizingPayload;
          else upstepsError = `Plus/minus sizing unavailable (HTTP ${sizingResponse.status}).`;
        } catch {
          upstepsError = "Plus/minus sizing could not be reached.";
        }
      }
    }

    return NextResponse.json({ ...asRecord(payload), upsteps, upstepsError });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve fitment data. Please try again." }, { status: 502 });
  }
}
