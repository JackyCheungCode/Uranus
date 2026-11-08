import type { Metadata } from "next";
import { VehicleFitmentHub } from "@/components/vehicle-fitment-hub";

export const metadata: Metadata = {
  title: "BMW Wheel Fitment Search",
  description: "Find BMW OEM, aftermarket and plus/minus wheel fitment specifications by vehicle, rim or tire size.",
};

export default function VehicleFitmentPage() {
  return <VehicleFitmentHub />;
}
