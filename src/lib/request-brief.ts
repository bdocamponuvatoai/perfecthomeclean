import { serviceNames, type PlannerService } from "@/content/planner";

export type PlannerValues = {
  service: PlannerService;
  region: string;
  zip: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  frequency: string;
  date: string;
  priorities: string[];
  notes: string;
};

export function isBusinessService(service: PlannerService): boolean {
  return service === "commercial" || service === "construction";
}

const plural = (count: string, noun: string) => `${count} ${noun}${count === "1" ? "" : "s"}`;

export function describeSpace(values: PlannerValues): string {
  if (isBusinessService(values.service)) return values.area;
  const bedrooms = values.bedrooms === "Studio" ? "Studio" : plural(values.bedrooms, "bedroom");
  return `${bedrooms}, ${plural(values.bathrooms, "bathroom")}`;
}

/** "2026-11-03" -> "November 3, 2026". Noon avoids time-zone date shifts. */
function formatPreferredDate(date: string): string {
  if (!date) return "To be discussed";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Today in local time as YYYY-MM-DD, for comparing with date inputs. */
export function localIsoDate(now = new Date()): string {
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

export function reviewEntries(values: PlannerValues): [string, string][] {
  return [
    ["Service", serviceNames[values.service]],
    ["Location", `${values.region} · ${values.zip}`],
    ["Space", describeSpace(values)],
    ["Frequency", values.frequency],
    ["Preferred date", formatPreferredDate(values.date)],
    ["Priorities", values.priorities.join(", ") || "Discuss with the team"],
    ["Additional notes", values.notes || "None added"],
  ];
}

export function buildRequestText(values: PlannerValues): string {
  return [
    "PERFECT HOME CLEANING — CLEANING REQUEST",
    ...reviewEntries(values).map(([key, value]) => `${key}: ${value}`),
    "Please confirm service coverage, scope, quote and availability. This brief is a request, not a confirmed appointment.",
    "Prepared using the Perfect Home Cleaning design preview.",
  ].join("\n\n");
}

export function buildMailtoHref(email: string, values: PlannerValues): string {
  const subject = encodeURIComponent(`Cleaning request: ${serviceNames[values.service]}`);
  const body = encodeURIComponent(buildRequestText(values));
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
