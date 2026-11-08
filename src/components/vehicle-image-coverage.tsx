"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, ChevronDown, Image as ImageIcon, Loader2, Play, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ModelTarget = { name: string; slug: string };
type GenerationResult = {
  name: string;
  slug?: string;
  years?: string;
  imageUrl?: string;
  imageFields?: string[];
};
type CoverageResult = {
  model: string;
  status: "images" | "missing" | "error";
  generations: GenerationResult[];
  message?: string;
};

const TARGETS: ModelTarget[] = [
  { name: "1 SERIES", slug: "1-series" },
  { name: "2 SERIES", slug: "2-series" },
  { name: "3 SERIES", slug: "3-series" },
  { name: "4 SERIES", slug: "4-series" },
  { name: "5 SERIES", slug: "5-series" },
  { name: "6 SERIES", slug: "6-series" },
  { name: "7 SERIES", slug: "7-series" },
  { name: "8 SERIES", slug: "8-series" },
  { name: "X1", slug: "x1" },
  { name: "X2", slug: "x2" },
  { name: "X3", slug: "x3" },
  { name: "X4", slug: "x4" },
  { name: "X5", slug: "x5" },
  { name: "X6", slug: "x6" },
  { name: "X7", slug: "x7" },
  { name: "Z4", slug: "z4" },
  { name: "i4", slug: "i4" },
  { name: "i5", slug: "i5" },
  { name: "i7", slug: "i7" },
  { name: "iX", slug: "ix" },
];

export function VehicleImageCoverage() {
  const [region, setRegion] = useState("usdm");
  const [results, setResults] = useState<Record<string, CoverageResult>>({});
  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");

  const completed = Object.keys(results).length;
  const imageCount = useMemo(
    () => Object.values(results).filter((item) => item.status === "images").length,
    [results],
  );
  const generationCount = useMemo(
    () => Object.values(results).reduce((sum, item) => sum + item.generations.length, 0),
    [results],
  );

  async function testModel(target: ModelTarget) {
    setCurrent(target.name);
    try {
      const response = await fetch(
        `/api/vehicle-images/coverage?model=${encodeURIComponent(target.slug)}&region=${encodeURIComponent(region)}`,
        { cache: "no-store" },
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "The image coverage request failed.");
      }
      const generations: GenerationResult[] = payload.generations || [];
      setResults((previous) => ({
        ...previous,
        [target.slug]: {
          model: target.name,
          status: generations.some((generation) => generation.imageUrl) ? "images" : "missing",
          generations,
          message: payload.message,
        },
      }));
    } catch (requestError) {
      setResults((previous) => ({
        ...previous,
        [target.slug]: {
          model: target.name,
          status: "error",
          generations: [],
          message: requestError instanceof Error ? requestError.message : "Unknown API error",
        },
      }));
      if (requestError instanceof Error && requestError.message.includes("not configured")) {
        setError(requestError.message);
      }
    }
  }

  async function runAll() {
    setResults({});
    setError("");
    setRunning(true);
    for (const target of TARGETS) {
      await testModel(target);
    }
    setCurrent("");
    setRunning(false);
  }

  async function retry(target: ModelTarget) {
    setError("");
    await testModel(target);
  }

  const statusLabel = (status: CoverageResult["status"]) => {
    if (status === "images") return "IMAGE FOUND";
    if (status === "missing") return "NO IMAGE";
    return "REQUEST ERROR";
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-muted">DATA QUALITY / VEHICLE MEDIA</p>
          <h1 className="mt-4 max-w-4xl text-4xl leading-[1.02] sm:text-5xl">BMW VEHICLE IMAGE COVERAGE.</h1>
          <p className="mt-5 max-w-3xl text-sm font-light leading-7 text-muted">
            Check whether Wheel-Size returns generation reference photography for a representative set of 20 BMW model lines.
            This test reads image URLs only; it does not download or copy image assets.
          </p>
        </div>
        <Card className="border-line">
          <CardHeader className="pb-3">
            <p className="text-[11px] font-bold tracking-[0.14em] text-muted">TEST SETTINGS</p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <label className="grid gap-2 text-[11px] font-bold tracking-[0.12em] text-ink">
              MARKET REGION
              <Input value={region} onChange={(event) => setRegion(event.target.value.toLowerCase())} placeholder="usdm" />
            </label>
            <p className="text-xs font-light leading-5 text-muted">Default: USDM. Use API region codes such as EUDM, CDM or JDM.</p>
            <Button onClick={runAll} disabled={running || !region.trim()} className="h-12 w-full">
              {running ? <Loader2 className="animate-spin" size={16} /> : <Play size={15} />}
              {running ? `TESTING ${completed} / 20` : "RUN 20-MODEL TEST"}
            </Button>
            <p className="text-[11px] font-light text-muted">One catalog request per model. Run only when you intentionally start the test.</p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-8 flex items-start gap-3 border border-line bg-surface p-4 text-sm text-ink">
          <AlertCircle className="mt-0.5 shrink-0" size={17} />
          <div>
            <p className="font-bold">API CONFIGURATION REQUIRED</p>
            <p className="mt-1 font-light">{error}</p>
            <p className="mt-2 font-light">Add WHEELSIZE_API_KEY as a server-side environment secret, then restart or redeploy the application.</p>
          </div>
        </div>
      )}

      <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {[
          { label: "MODEL LINES", value: "20" },
          { label: "TESTED", value: String(completed) },
          { label: "WITH IMAGES", value: String(imageCount) },
          { label: "GENERATIONS", value: String(generationCount) },
        ].map((metric) => (
          <div key={metric.label} className="bg-white p-4 md:p-5">
            <p className="text-[10px] font-bold tracking-[0.14em] text-muted">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-ink">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-xl">MODEL COVERAGE RESULTS</h2>
          <p className="mt-1 text-xs font-light text-muted">BMW model catalog · {region.toUpperCase()} · generation-level image check</p>
        </div>
        {completed > 0 && (
          <Button variant="secondary" onClick={runAll} disabled={running} className="h-10">
            <RefreshCw size={14} /> RUN AGAIN
          </Button>
        )}
      </div>

      <div className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {TARGETS.map((target, index) => {
          const result = results[target.slug];
          const isCurrent = current === target.name;
          const isExpanded = expanded === target.slug;
          return (
            <div key={target.slug} className="min-w-0 bg-white">
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : target.slug)}
                className="flex min-h-[112px] w-full items-center justify-between gap-3 p-4 text-left hover:bg-surface"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.14em] text-muted">BMW / {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-base font-bold uppercase text-ink">{target.name}</p>
                  <p className="mt-1 text-[10px] font-light text-muted">
                    {isCurrent ? "CHECKING..." : result ? statusLabel(result.status) : "NOT TESTED"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-muted">
                  {isCurrent ? <Loader2 size={16} className="animate-spin" /> : result?.status === "images" ? <Check size={16} /> : result?.status === "error" ? <AlertCircle size={16} /> : <ImageIcon size={16} />}
                  <ChevronDown size={14} className={isExpanded ? "rotate-180" : ""} />
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-line p-4">
                  {result?.generations.length ? (
                    <div className="grid gap-4">
                      {result.generations.map((generation, generationIndex) => (
                        <div key={generation.slug || generation.name + generationIndex} className="grid gap-2">
                          {generation.imageUrl ? (
                            <img src={generation.imageUrl} alt={generation.name} className="aspect-[16/9] w-full border border-line bg-surface object-contain" />
                          ) : (
                            <div className="flex aspect-[16/9] items-center justify-center border border-line bg-surface text-xs text-muted">NO IMAGE URL</div>
                          )}
                          <p className="text-xs font-bold uppercase text-ink">{generation.name}</p>
                          {generation.years && <p className="text-[11px] font-light text-muted">{generation.years}</p>}\n                          {!generation.imageUrl && generation.imageFields && generation.imageFields.length > 0 && (\n                            <p className="break-all text-[10px] font-light leading-5 text-muted">IMAGE FIELDS DETECTED: {generation.imageFields.join(", ")}</p>\n                          )}
                          {generation.imageUrl && <a className="break-all text-[10px] text-ink underline" href={generation.imageUrl} target="_blank" rel="noreferrer">OPEN IMAGE SOURCE</a>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-light leading-5 text-muted">{result?.message || "Run the test to inspect generation image availability."}</p>
                  )}
                  {result?.status === "error" && (
                    <Button variant="secondary" size="compact" className="mt-3" onClick={() => retry(target)}>RETRY</Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 max-w-4xl text-xs font-light leading-6 text-muted">
        Coverage is measured by returned generation image URLs, not by visual accuracy or licensing approval. Confirm Wheel-Size image display rights before using returned images in the public storefront.
      </p>
    </div>
  );
}
