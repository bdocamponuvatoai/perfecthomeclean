import type { IconName } from "@/components/ui/Icon";

export const plannerServices = [
  {
    value: "regular",
    icon: "home",
    title: "Regular home cleaning",
    description: "Keep things feeling fresh, on your schedule.",
  },
  {
    value: "deep",
    icon: "spark",
    title: "Deep home cleaning",
    description: "A more detailed reset for your space.",
  },
  {
    value: "commercial",
    icon: "office",
    title: "Commercial cleaning",
    description: "A cleaner workplace, planned around your team.",
  },
  {
    value: "construction",
    icon: "layers",
    title: "Post-construction cleaning",
    description: "The next step after the renovation work.",
  },
] as const satisfies readonly {
  value: string;
  icon: IconName;
  title: string;
  description: string;
}[];

export type PlannerService = (typeof plannerServices)[number]["value"];

export const serviceNames = Object.fromEntries(
  plannerServices.map((service) => [service.value, service.title]),
) as Record<PlannerService, string>;

export function isPlannerService(value: string | null): value is PlannerService {
  return value !== null && Object.hasOwn(serviceNames, value);
}

export const regions = [
  "New York City",
  "Long Island",
  "New Jersey",
  "Ask about another area",
] as const;

export const bedroomOptions = [
  { value: "Studio", label: "Studio" },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4", label: "4 bedrooms" },
  { value: "5+", label: "5+ bedrooms" },
] as const;

export const bathroomOptions = [
  { value: "1", label: "1 bathroom" },
  { value: "1.5", label: "1.5 bathrooms" },
  { value: "2", label: "2 bathrooms" },
  { value: "3", label: "3 bathrooms" },
  { value: "4+", label: "4+ bathrooms" },
] as const;

export const areaOptions = [
  "Not sure yet",
  "Under 1,000 sq ft",
  "1,000–2,500 sq ft",
  "2,500–5,000 sq ft",
  "Over 5,000 sq ft",
] as const;

export const frequencyOptions = [
  "One-time clean",
  "Weekly",
  "Every two weeks",
  "Monthly",
  "Discuss a custom schedule",
] as const;

export const priorityOptions = [
  "Kitchen",
  "Bathrooms",
  "Floors",
  "Dusting & surfaces",
  "Bed linens",
  "Inside appliances",
  "Interior windows",
  "Building insurance paperwork",
] as const;

export const plannerSteps = ["Your clean", "Your space", "Your details", "Review"] as const;
