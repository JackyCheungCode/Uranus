import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type VehicleCandidate = {
  model: string | null;
  modelLabel: string | null;
  year: string | null;
  generation: string | null;
  modification: string | null;
  region: "usdm" | "cdm" | "mxndm" | "ladm" | "eudm" | "rus" | "jdm" | "chdm" | "skdm" | "sam" | "medm" | "nadm" | "sadm" | "audm" | null;
  confidence: "high" | "medium" | "low";
  clarification: string | null;
  notes: string | null;
};

type ModelOption = { value: string; label: string };

type WorkersAI = {
  run: (
    model: string,
    input: {
      messages: Array<{ role: "system" | "user"; content: string }>;
      max_tokens: number;
      temperature: number;
      response_format: { type: "json_object" };
    },
  ) => Promise<{ response?: unknown }>;
};

declare global {
  interface CloudflareEnv {
    AI: WorkersAI;
  }
}

const VALID_REGIONS = new Set(["usdm", "cdm", "mxndm", "ladm", "eudm", "rus", "jdm", "chdm", "skdm", "sam", "medm", "nadm", "sadm", "audm"]);

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function textOrNull(item: unknown): string | null {
  if (typeof item === "string" && item.trim()) return item.trim();
  if (typeof item === "number" && Number.isFinite(item)) return String(item);
  return null;
}

function normalizeRegion(value: unknown): VehicleCandidate["region"] {
  const normalized = textOrNull(value)?.toLowerCase();
  if (!normalized) return null;
  if (VALID_REGIONS.has(normalized)) return normalized as VehicleCandidate["region"];
  if (["us", "usa", "united states", "united states of america"].includes(normalized)) return "usdm";
  if (["canada", "ca"].includes(normalized)) return "cdm";
  if (["europe", "eu", "european union"].includes(normalized)) return "eudm";
  if (["japan"].includes(normalized)) return "jdm";
  if (["mexico", "mx"].includes(normalized)) return "mxndm";
  if (["central & south america", "latin america", "south america"].includes(normalized)) return "ladm";
  if (["russia", "russia+"].includes(normalized)) return "rus";
  if (["china", "hong kong", "macao", "macau"].includes(normalized)) return "chdm";
  if (["south korea", "korea", "republic of korea"].includes(normalized)) return "skdm";
  if (["southeast asia", "south east asia"].includes(normalized)) return "sam";
  if (["middle east"].includes(normalized)) return "medm";
  if (["north africa"].includes(normalized)) return "nadm";
  if (["south africa"].includes(normalized)) return "sadm";
  if (["australia", "au", "oceania", "new zealand"].includes(normalized)) return "audm";
  return null;
}

function parseCandidate(raw: unknown, models: ModelOption[]): VehicleCandidate {
  let parsed: unknown = raw;
  if (typeof raw === "string") {
    const normalized = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    parsed = JSON.parse(normalized);
  }
  const value = asRecord(parsed);
  const requestedModel = textOrNull(value.model);
  const matchedModel = requestedModel
    ? models.find((item) => item.value.toLowerCase() === requestedModel.toLowerCase()
      || item.label.toLowerCase() === requestedModel.toLowerCase())
    : undefined;
  const confidenceValue = value.confidence;
  const confidence: VehicleCandidate["confidence"] =
    confidenceValue === "high" || (typeof confidenceValue === "number" && confidenceValue >= 0.8)
      ? "high"
      : confidenceValue === "medium" || (typeof confidenceValue === "number" && confidenceValue >= 0.5)
        ? "medium"
        : "low";

  return {
    model: matchedModel?.value ?? null,
    modelLabel: matchedModel?.label ?? null,
    year: textOrNull(value.year),
    generation: textOrNull(value.generation)?.toLowerCase() ?? null,
    modification: null,
    region: normalizeRegion(value.region),
    confidence: matchedModel ? confidence : "low",
    clarification: matchedModel
      ? textOrNull(value.clarification)
      : "I couldn't match that model to the current BMW catalog. Please choose the model in the manual selector.",
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

  const input = asRecord(body);
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const region = typeof input.region === "string" && VALID_REGIONS.has(input.region.toLowerCase())
    ? input.region.toLowerCase()
    : "usdm";
  const models = Array.isArray(input.models)
    ? input.models.map((item) => {
      const option = asRecord(item);
      const value = textOrNull(option.value);
      const label = textOrNull(option.label);
      return value && label ? { value, label } : null;
    }).filter((item): item is ModelOption => item !== null).slice(0, 100)
    : [];

  if (description.length < 5 || description.length > 500) {
    return NextResponse.json({ error: "Describe your BMW in 5–500 characters." }, { status: 400 });
  }
  if (!models.length) {
    return NextResponse.json({ error: "BMW model catalog is still loading. Try manual selection or retry in a moment." }, { status: 409 });
  }

  try {
    const { env } = getCloudflareContext();
    const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      max_tokens: 320,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "You identify BMW vehicles for a wheel fitment database lookup.",
            "Return exactly one JSON object with keys model, year, generation, region, confidence, clarification, notes.",
            "The model value MUST exactly equal one of the value fields in the supplied BMW model catalog. Never invent or rewrite a model value.",
            "Select the closest exact catalog option. For example, if the user says M3, choose the M3 option if present; if the user says 330i, choose the 3 Series option if present.",
            "Do not include BMW, trim, engine, drivetrain, or edition words in model.",
            "Extract the four-digit model year only when stated or unambiguously present.",
            "generation should be the chassis code only, lowercase, such as g80 or f30. Use null if not stated.",
            "Do not return modification. Trim information may be mentioned briefly in notes, but it must not be used as a catalog identifier.",
            "Map USA+ to usdm, Canada to cdm, Mexico to mxndm, Central and South America to ladm, Europe to eudm, Russia+ to rus, Japan to jdm, China to chdm, South Korea to skdm, Southeast Asia to sam, Middle East to medm, North Africa to nadm, South Africa to sadm, and Oceania to audm. Otherwise use the supplied default region.",
            "confidence must be high, medium, or low.",
            "Ask one concise clarification if model or year is missing or ambiguous. Otherwise clarification must be null.",
            "Never invent vehicle details.",
          ].join(" "),
        },
        {
          role: "user",
          content: `Default market: ${region}. BMW model catalog options: ${JSON.stringify(models)}. Vehicle description: ${description}`,
        },
      ],
    });

    if (result.response === undefined || result.response === null) {
      return NextResponse.json({ error: "AI could not identify this vehicle. Try adding the model year and chassis." }, { status: 502 });
    }

    const candidate = parseCandidate(result.response, models);
    if (!candidate.region) candidate.region = region as VehicleCandidate["region"];
    if (!candidate.year && !candidate.clarification) {
      candidate.clarification = "What model year is your BMW?";
    }
    return NextResponse.json({ candidate });
  } catch {
    return NextResponse.json({ error: "AI vehicle identification is temporarily unavailable. You can still use manual vehicle selection." }, { status: 503 });
  }
}
