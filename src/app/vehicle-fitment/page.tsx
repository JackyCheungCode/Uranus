import type { Metadata } from "next";
import { VehicleFitmentSearch } from "@/components/vehicle-fitment-search";

export const metadata: Metadata = {
  title: "BMW Wheel Fitment Search",
  description: "Find BMW OEM, aftermarket and plus/minus wheel fitment specifications by vehicle.",
};

export default function VehicleFitmentPage() {
  return <VehicleFitmentSearch />;
}
