import type { Metadata } from "next";
import { VehicleImageCoverage } from "@/components/vehicle-image-coverage";

export const metadata: Metadata = {
  title: "BMW Vehicle Image Coverage",
  description: "Check BMW generation reference image availability from Wheel-Size.",
};

export default function VehicleImageCoveragePage() {
  return <VehicleImageCoverage />;
}
