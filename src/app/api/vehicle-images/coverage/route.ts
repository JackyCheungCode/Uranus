import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : null;
}

function readText(value: unknown): string | undefined {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

function isHttpUrl(value: unknown): value is string {
  return typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"));
}

function findAnyUrl(value: unknown, depth = 0): string | undefined {
  if (depth > 8) return undefined;
  if (isHttpUrl(value)) return value;
  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = findAnyUrl(item, depth + 1);
      if (nested) return nested;
    }
    return undefined;
  }
  const record = asRecord(value);
  if (!record) return undefined;
  for (const key of ["url", "src", "href", "original", "large", "full"]) {
    if (isHttpUrl(record[key])) return record[key];
  }
  for (const candidate of Object.values(record)) {
    const nested = findAnyUrl(candidate, depth + 1);
    if (nested) return nested;
  }
  return undefined;
}

// Image metadata is not guaranteed to sit on the generation object's first level.
// Walk nested vehicle/media objects as well (for example: vehicle.image).
function findImageUrl(value: unknown, depth = 0): string | undefined {
  if (depth > 8) return undefined;
  if (Array.isArray(value)) {
    for (const item of value) {
      const nested = findImageUrl(item, depth + 1);
      if (nested) return nested;
    }
    return undefined;
  }
  const record = asRecord(value);
  if (!record) return undefined;

  for (const [key, candidate] of Object.entries(record)) {
    if (/image|photo|picture|photography|thumbnail|media/i.test(key)) {
      const url = findAnyUrl(candidate);
      if (url) return url;
    }
  }
  for (const candidate of Object.values(record)) {
    const nested = findImageUrl(candidate, depth + 1);
    if (nested) return nested;
  }
  return undefined;
}

function findImageFieldPaths(value: unknown, path = "$", depth = 0): string[] {
  if (depth > 8) return [];
  if (Array.isArray(value)) {
    return value.slice(0, 10).flatMap((item, index) => findImageFieldPaths(item, `${path}[${index}]`, depth + 1));
  }
  const record = asRecord(value);
  if (!record) return [];
  return Object.entries(record).flatMap(([key, child]) => {
    const childPath = `${path}.${key}`;
    const matches = /image|photo|picture|photography|thumbnail|media/i.test(key) ? [childPath] : [];
    return [...matches, ...findImageFieldPaths(child, childPath, depth + 1)];
  }).slice(0, 20);
}

function getGenerationCandidates(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  const root = asRecord(payload);
  if (!root) return [];
  const data = root.data;
  const dataRecord = asRecord(data);
  if (Array.isArray(data)) return data;
  if (Array.isArray(root.results)) return root.results;
  if (Array.isArray(root.generations)) return root.generations;
  if (Array.isArray(dataRecord?.results)) return dataRecord.results;
  if (Array.isArray(dataRecord?.generations)) return dataRecord.generations;
  return [];
}

function normalizeGenerations(payload: unknown) {
  const candidates = getGenerationCandidates(payload);
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
      imageFields: findImageFieldPaths(record),
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
    const root = asRecord(payload);
    return NextResponse.json({
      model,
      region,
      generations,
      diagnostics: {
        responseKeys: root ? Object.keys(root) : Array.isArray(payload) ? ["<array>"] : ["<non-object>"],
        generationCount: generations.length,
        imageFieldPaths: generations.flatMap((generation) => generation.imageFields.map((field) => `${generation.name}:${field}`)).slice(0, 30),
      },
      message: generations.length ? undefined : "No generation records were returned for this model and region.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reach Wheel-Size API.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
