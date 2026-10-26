import type { IconName } from "@/components/ui/Icon";

import type { ServiceSlug } from "./services";

// Home page "What needs a fresh start?" finder.
export const finderOptions = [
  {
    key: "home",
    icon: "home",
    label: "My home",
    service: "residential",
    note: "Regular, deep or custom cleaning—let’s find the right fit for home.",
  },
  {
    key: "work",
    icon: "office",
    label: "My workplace",
    service: "commercial",
    note: "A cleaning plan shaped around your workplace and the way your team works.",
  },
  {
    key: "renovation",
    icon: "layers",
    label: "After renovation",
    service: "post-construction",
    note: "A considered finishing touch after the renovation work is complete.",
  },
] as const satisfies readonly {
  key: string;
  icon: IconName;
  label: string;
  service: ServiceSlug;
  note: string;
}[];

// Services page "Start with the feeling" matcher.
export const matchOptions = [
  {
    key: "regular",
    prompt: "“I’d like to keep things on track.”",
    title: "Regular home cleaning",
    copy: "A useful starting point for staying on top of the everyday. Discuss your preferred rhythm and priorities with the team.",
  },
  {
    key: "deep",
    prompt: "“It’s time for a proper reset.”",
    title: "Deep home cleaning",
    copy: "A useful starting point for a more detailed reset. Tell the team which areas need attention so they can confirm the scope.",
  },
  {
    key: "construction",
    prompt: "“We’ve just finished renovating.”",
    title: "Post-construction cleaning",
    copy: "A useful starting point after renovation. Share the project details, new finishes and any remaining debris for the team to review.",
  },
] as const;

// Room-by-room guide. Titles are lines; the first room starts with a line break.
export const rooms = [
  {
    key: "kitchen",
    label: "Kitchen",
    eyebrow: "WHERE THE DAY BEGINS",
    title: ["A kitchen ready", "for real life."],
    tasks: [
      "Countertops and surfaces",
      "Appliance exteriors",
      "Microwave interior",
      "Floors and wastebaskets",
    ],
  },
  {
    key: "bathroom",
    label: "Bathroom",
    eyebrow: "A LITTLE EVERYDAY RESET",
    title: ["A fresh start, every day."],
    tasks: ["Shower and bathtub", "Toilet cleaning", "Mirrors and glass", "Fixtures and surfaces"],
  },
  {
    key: "bedroom",
    label: "Bedroom",
    eyebrow: "ROOM TO REST",
    title: ["Let the day settle down."],
    tasks: ["Dust furniture", "Vacuum floors", "Bed making on request", "Linen changes on request"],
  },
  {
    key: "living",
    label: "Living areas",
    eyebrow: "WHERE LIFE HAPPENS",
    title: ["More room for the good things."],
    tasks: [
      "Dust accessible surfaces",
      "Vacuum rugs and carpets",
      "Mop suitable flooring",
      "Empty wastebaskets",
    ],
  },
] as const;

// "A few things to think about" checklist.
export const prepItems = [
  "Make a note of your priority rooms.",
  "Flag delicate surfaces or product preferences.",
  "Confirm access and any building requirements.",
  "Agree on the scope, date and quote with the team.",
] as const;
