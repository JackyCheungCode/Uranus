import type { Metadata } from "next";
import { VehicleFitmentResults } from "@/components/vehicle-fitment-results";

export const metadata: Metadata = {
  title: "BMW Wheel Fitment Results",
  description: "BMW factory, aftermarket and plus/minus wheel fitment specifications.",
};

type SearchParams = Promise<{
  model?: string;
  year?: string;
  generation?: string;
  modification?: string;
  region?: string;
}>;

export default async function VehicleFitmentResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <VehicleFitmentResults
      model={params.model}
      year={params.year}
      generation={params.generation}
      modification={params.modification}
      region={params.region || "usdm"}
    />
  );
}
