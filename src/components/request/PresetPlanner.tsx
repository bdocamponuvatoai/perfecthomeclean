"use client";

import { useSearchParams } from "next/navigation";

import { isPlannerService, regions } from "@/content/planner";

import { RequestPlanner } from "./RequestPlanner";

/** Applies `?service=` and `?region=` presets. Unknown values are ignored. */
export function PresetPlanner() {
  const params = useSearchParams();
  const service = params.get("service");
  const region = params.get("region");
  const preset = {
    service: isPlannerService(service) ? service : undefined,
    region: regions.find((item) => item === region),
  };
  return <RequestPlanner key={`${preset.service}|${preset.region}`} preset={preset} />;
}
