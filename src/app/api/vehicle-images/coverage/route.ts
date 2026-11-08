import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : null;
}

function readText(value: unknown): string | undefined {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

function findImageUrl(value: unknown, depth = 0): string | undefined {
  if (depth > 4) return undefined;
  const record = asRecord(value);
  if (!record) return undefined;

  const preferredKeys = ["image_url", "imageUrl", "image", "photo_url", "photo", "photography", "picture", "thumbnail"];
  for (const key of preferredKeys) {
    const candidate = record[key];
    if (typeof candidate === "string" && /^https?:\/\//i.test(candidate)) return candidate;
    if (candidate && typeof candidate === "object") {
      const nested = findImageUrl(candidate, depth + 1);
      if (nested) return nested;
    }
  }
  for (const [key, candidate] of Object.entries(record)) {
    if (/image|photo|picture|photography/i.test(key)) {
      if (typeof candidate === "string" && /^https?:\/\//i.test(candidate)) return candidate;
      const nested = findImageUrl(candidate, depth + 1);
      if (nested) return nested;
    }
  }
  return undefined;
}

function normalizeGenerations(payload: unknown) {
  const root = asRecord(payload);
  const data = root?.data;
  const candidates = Array.isArray(data) ? data : Array.isArray(root?.results) ? root.results : [];
  return candidates.map((candidate, index) => {
    const record = asRecord(candidate) || {};
    const years = readText(record.year_range) || [
      readText(record.start_year || record.year_start),
      readText(record.end_year || record.year_end),
    ].filter(Boolean).join("–");
    return {
      name: readText(record.name) || readText(record.generation) || readText(record.slug) || `Generation ${index + 1}`,
      slug: readText(record.slug),
      years,
      imageUrl: findImageUrl(record),
    };
  });
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.WHEELSIZE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "WHEELSIZE_API_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  const model = request.nextUrl.searchParams.get("model")?.trim().toLowerCase();
  const region = request.nextUrl.searchParams.get("region")?.trim().toLowerCase() || "usdm";
  if (!model || !/^[a-z0-9-]+$/.test(model)) {
    return NextResponse.json({ error: "A valid BMW model slug is required." }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(region)) {
    return NextResponse.json({ error: "A valid region code is required." }, { status: 400 });
  }

  const endpoint = new URL("https://api.wheel-size.com/v2/generations/");
  endpoint.searchParams.set("make", "bmw");
  endpoint.searchParams.set("model", model);
  endpoint.searchParams.set("region", region);
  endpoint.searchParams.set("user_key", apiKey);

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json", "Accept-Encoding": "gzip" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const payload: unknown = await response.json();
    if (!response.ok) {
      const errorRecord = asRecord(payload);
      const message = readText(errorRecord?.detail) || readText(errorRecord?.message) || `Wheel-Size returned HTTP ${response.status}.`;
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const generations = normalizeGenerations(payload);
    return NextResponse.json({
      model,
      region,
      generations,
      message: generations.length ? undefined : "No generation records were returned for this model and region.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reach Wheel-Size API.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
