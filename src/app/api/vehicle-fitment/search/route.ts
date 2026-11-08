import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RecordValue = Record<string, unknown>;

function asRecord(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : {};
}

const SUPPORTED_REGIONS = new Set(["usdm", "cdm", "mxndm", "ladm", "eudm", "rus", "jdm", "chdm", "skdm", "sam", "medm", "nadm", "sadm", "audm"]);

function firstOeWheel(payload: unknown): RecordValue | null {
  const root = asRecord(payload);
  const rows = Array.isArray(root.data) ? root.data : Array.isArray(root.results) ? root.results : [];
  for (const row of rows) {
    const vehicle = asRecord(row);
    const wheels = vehicle.wheels ?? vehicle.wheel;
    const wheelRows = Array.isArray(wheels) ? wheels : wheels && typeof wheels === "object" ? [wheels] : [];
    const found = wheelRows.map(asRecord).find((wheel) => wheel.is_stock === true || vehicle.is_stock === true);
    if (found) return found;
  }
  return null;
}

function hasFitmentRows(payload: unknown): boolean {
  const root = asRecord(payload);
  const rows = root.data ?? root.results;
  if (Array.isArray(rows)) return rows.length > 0;
  return !!rows && typeof rows === "object" && Object.keys(asRecord(rows)).length > 0;
}

function numeric(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "string" && /^-?\d+(?:\.\d+)?$/.test(value)) return value;
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
  if (!SUPPORTED_REGIONS.has(region)) {
    return NextResponse.json({ error: "Unsupported market / region. Choose one of the 14 supported Wheel-Size regions." }, { status: 400 });
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
    async function requestFitment(url: URL) {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      });
      const payload: unknown = await response.json();
      return { response, payload };
    }

    let { response, payload } = await requestFitment(upstream);
    if (!response.ok) {
      const upstreamError = asRecord(payload);
      const detail = upstreamError.detail ?? upstreamError.message ?? upstreamError.error;
      return NextResponse.json({ error: detail ? `Wheel-Size API: ${String(detail)}` : `Wheel-Size API returned HTTP ${response.status}. Check the selected model, year, generation and region.` }, { status: response.status });
    }

    // If an optional trim/chassis filter is too restrictive, retry only within the
    // same selected model, year and region. Never silently substitute another market.
    let fallbackMessage: string | undefined;
    if (!hasFitmentRows(payload) && modification) {
      const broader = new URL(upstream);
      broader.searchParams.delete("modification");
      const retry = await requestFitment(broader);
      if (retry.response.ok && hasFitmentRows(retry.payload)) {
        payload = retry.payload;
        fallbackMessage = "No exact trim match was found. Showing all modifications for this BMW model, year, generation and region.";
      }
    }
    if (!hasFitmentRows(payload) && generation) {
      const broader = new URL(upstream);
      broader.searchParams.delete("modification");
      broader.searchParams.delete("generation");
      const retry = await requestFitment(broader);
      if (retry.response.ok && hasFitmentRows(retry.payload)) {
        payload = retry.payload;
        fallbackMessage = "No exact chassis / trim match was found. Showing all generations and modifications for this BMW model, year and selected region.";
      }
    }

    // Plus/minus sizing is requested only after a visitor explicitly submits a vehicle search.
    // One OE package is used for the sizing call to keep API usage predictable.
    let upsteps: unknown = null;
    let upstepsError: string | undefined;
    const oeWheel = firstOeWheel(payload);
    if (oeWheel) {
      const front = asRecord(oeWheel.front);
      const tire = String(front.tire_full ?? front.tire ?? "");
      const match = tire.match(/(\d{3})\/(\d{2})R(\d{2})/i);
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

    return NextResponse.json({ ...asRecord(payload), fallbackMessage, upsteps, upstepsError });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve fitment data. Please try again." }, { status: 502 });
  }
}
