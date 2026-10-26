import type { IconName } from "@/components/ui/Icon";
import type { Headline } from "@/components/ui/Headline";

import { photos, type PhotoSource } from "./photos";
import type { PlannerService } from "./planner";

export type ServiceSlug = "residential" | "commercial" | "post-construction";

export type Service = {
  slug: ServiceSlug;
  name: string;
  short: string;
  photo: PhotoSource;
  alt: string;
  number: string;
  description: string;
  tags: readonly string[];
  plannerService: PlannerService;
  detail: {
    eyebrow: string;
    title: Headline;
    lead: string;
    intro: string;
    copy: string;
    options: readonly { icon: IconName; title: string; text: string }[];
    questions: readonly { question: string; answer: string }[];
  };
};

export const services: readonly Service[] = [
  {
    slug: "residential",
    name: "For the place you call home.",
    short: "Residential cleaning",
    photo: photos.hero,
    alt: "Illustrative sunlit living room",
    number: "01",
    description:
      "The everyday reset. The deeper clean. The feeling of coming home to a space that’s cared for.",
    tags: ["Regular & deep cleans", "One-time or recurring"],
    plannerService: "regular",
    detail: {
      eyebrow: "RESIDENTIAL CLEANING",
      title: { lines: ["Home feels better", "with a little "], highlight: "care." },
      lead: "From keeping up with the everyday to making room for a fresh start, find a clean that fits the way you live.",
      intro: "Make the clean your own.",
      copy: "Choose a regular clean, a more detailed deep clean, or a conversation about your priorities. Start with your rooms and the areas that matter most, then confirm the plan with the team.",
      options: [
        {
          icon: "spark",
          title: "Regular cleaning",
          text: "For keeping your space feeling cared for between busy days. Share a weekly, bi-weekly or monthly preference.",
        },
        {
          icon: "clock",
          title: "Deep cleaning",
          text: "For a more detailed reset. Point out the areas that need extra attention so the team can tailor the scope.",
        },
        {
          icon: "home",
          title: "A custom clean",
          text: "Have specific priorities or a special request? Build them into the conversation before your clean is arranged.",
        },
      ],
      questions: [
        {
          question: "Can you change the bed linens?",
          answer:
            "The company lists bed making and linen changes on request. Include the rooms and any instructions in your cleaning brief.",
        },
        {
          question: "Can I request attention to particular rooms?",
          answer:
            "Yes. Note your priorities in the planner. The team will confirm the tasks, time and quote with you.",
        },
      ],
    },
  },
  {
    slug: "commercial",
    name: "A fresh start for your workday.",
    short: "Commercial cleaning",
    photo: photos.office,
    alt: "Illustrative bright and tidy office",
    number: "02",
    description:
      "Make room for good work with cleaning planned around your workplace and its routines.",
    tags: ["Offices & workspaces", "Flexible scheduling"],
    plannerService: "commercial",
    detail: {
      eyebrow: "COMMERCIAL CLEANING",
      title: { lines: ["A clearer workspace.", "A better "], highlight: "workday." },
      lead: "Plan cleaning around your workplace, your team and the way your business runs.",
      intro: "Good work starts with the space.",
      copy: "Office layouts and routines are different. Share the type of workplace, its approximate size and any access requirements so the team can discuss a suitable scope and schedule.",
      options: [
        {
          icon: "spark",
          title: "A plan for your space",
          text: "Tell us about offices, common areas, meeting rooms and the surfaces that need attention.",
        },
        {
          icon: "clock",
          title: "A rhythm for your team",
          text: "Discuss the frequency and timing that work for your business. Availability is confirmed by the cleaning team.",
        },
        {
          icon: "home",
          title: "The details that matter",
          text: "Include building access, certificate-of-insurance requirements, product preferences and any areas that need special handling.",
        },
      ],
      questions: [
        {
          question: "Can you work around our office schedule?",
          answer:
            "The company offers flexible scheduling. Share your preferred days and access times; the team will confirm what can be arranged.",
        },
        {
          question: "Can our building request insurance documentation?",
          answer:
            "Yes. The company says it can provide a certificate of insurance and discuss additional-insured requests. Flag your building’s requirements when you inquire.",
        },
      ],
    },
  },
  {
    slug: "post-construction",
    name: "The final touch to a new chapter.",
    short: "Post-construction cleaning",
    photo: photos.construction,
    alt: "Post-construction cleaning image from the company website",
    number: "03",
    description:
      "After the work is done, bring the focus back to the space you’ve been looking forward to.",
    tags: ["After renovation", "A tailored scope"],
    plannerService: "construction",
    detail: {
      eyebrow: "POST-CONSTRUCTION CLEANING",
      title: { lines: ["The work is finished.", "Let the space "], highlight: "shine." },
      lead: "Bring the focus back to your newly finished space with a clean planned around the project.",
      intro: "A considered finishing touch.",
      copy: "Share the type of work completed, the size of the space and what remains to be cleaned. The company lists debris removal, surface cleaning and attention to high-touch areas among its post-construction services.",
      options: [
        {
          icon: "spark",
          title: "Tell us about the project",
          text: "Describe the renovation, the areas involved and whether other work is still in progress.",
        },
        {
          icon: "clock",
          title: "Agree on the scope",
          text: "Point out dust, remaining debris, fixtures and surfaces. Confirm what is included before cleaning begins.",
        },
        {
          icon: "home",
          title: "Plan the final handover",
          text: "Discuss access, your preferred date and any delicate new finishes so the team can plan appropriately.",
        },
      ],
      questions: [
        {
          question: "Is every kind of construction debris included?",
          answer:
            "The amount and type of debris need to be reviewed by the team. Describe what remains so removal and cleaning can be quoted appropriately.",
        },
        {
          question: "Can you clean newly installed surfaces?",
          answer:
            "Share material details and care instructions for new finishes. The team will confirm the suitable approach and any limitations.",
        },
      ],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
