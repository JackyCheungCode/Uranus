import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type VehicleCandidate = {
  model: string | null;
  year: string | null;
  generation: string | null;
  modification: string | null;
  region: "usdm" | "cdm" | "eudm" | "jdm" | "audm" | null;
  confidence: "high" | "medium" | "low";
  clarification: string | null;
  notes: string | null;
};

type WorkersAI = {
  run: (
    model: string,
    input: {
      messages: Array<{ role: "system" | "user"; content: string }>;
      max_tokens: number;
      temperature: number;
    },
  ) => Promise<{ response?: string }>;
};

declare global {
  interface CloudflareEnv {
    AI: WorkersAI;
  }
}

const VALID_REGIONS = new Set(["usdm", "cdm", "eudm", "jdm", "audm"]);

function parseCandidate(raw: string): VehicleCandidate {
  const normalized = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const parsed: unknown = JSON.parse(normalized);
  if (!parsed || typeof parsed !== "object") throw new Error("AI returned an invalid vehicle response.");
  const value = parsed as Record<string, unknown>;
  const textOrNull = (item: unknown) => typeof item === "string" && item.trim() ? item.trim() : null;
  const regionValue = textOrNull(value.region)?.toLowerCase() ?? null;
  const confidence = value.confidence === "high" || value.confidence === "medium" ? value.confidence : "low";
  return {
    model: textOrNull(value.model),
    year: textOrNull(value.year),
    generation: textOrNull(value.generation),
    modification: textOrNull(value.modification),
    region: regionValue && VALID_REGIONS.has(regionValue) ? regionValue as VehicleCandidate["region"] : null,
    confidence,
    clarification: textOrNull(value.clarification),
    notes: textOrNull(value.notes),
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Enter a description of your BMW first." }, { status: 400 });
  }

  const input = body && typeof body === "object" ? body as Record<string, unknown> : {};
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const region = typeof input.region === "string" && VALID_REGIONS.has(input.region.toLowerCase())
    ? input.region.toLowerCase()
    : "usdm";

  if (description.length < 5 || description.length > 500) {
    return NextResponse.json({ error: "Describe your BMW in 5–500 characters." }, { status: 400 });
  }

  try {
    const { env } = getCloudflareContext();
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      max_tokens: 320,
      temperature: 0.1,
      messages: [
        {
          role: "system",
          content: [
            "You identify BMW vehicles from user descriptions for a wheel fitment lookup.",
            "Return exactly one JSON object and no markdown.",
            "Never invent a year, chassis, engine, trim, or region. Use null when not explicitly stated or confidently identifiable.",
            "The model field must be the BMW model family name used in vehicle catalogs, such as 3 Series, 5 Series, X5, M3, or i4; do not put the trim in model.",
            "If the user gives a model badge such as M3, M4, M5, X5, iX, or i4, preserve that model name.",
            "Ask one concise clarification when model or model year is missing or ambiguous.",
            "region must be one of usdm, cdm, eudm, jdm, audm, or null.",
            "JSON keys: model, year, generation, modification, region, confidence, clarification, notes.",
            "confidence must be high, medium, or low.",
          ].join(" "),
        },
        {
          role: "user",
          content: `Market default: ${region}. Vehicle description: ${description}`,
        },
      ],
    });

    if (!result.response) {
      return NextResponse.json({ error: "AI could not identify this vehicle. Try adding the model year and chassis." }, { status: 502 });
    }

    const candidate = parseCandidate(result.response);
    if (!candidate.region) candidate.region = region as VehicleCandidate["region"];
    return NextResponse.json({ candidate });
  } catch {
    return NextResponse.json({ error: "AI vehicle identification is temporarily unavailable. You can still use manual vehicle selection." }, { status: 503 });
  }
}
