import type { StaticImageData } from "next/image";

import companySmall from "@/assets/images/company-small.webp";
import company from "@/assets/images/company.webp";
import constructionSmall from "@/assets/images/construction-small.webp";
import construction from "@/assets/images/construction.webp";
import heroSmall from "@/assets/images/hero-small.webp";
import hero from "@/assets/images/hero.webp";
import kitchenSmall from "@/assets/images/kitchen-small.webp";
import kitchen from "@/assets/images/kitchen.webp";
import officeSmall from "@/assets/images/office-small.webp";
import office from "@/assets/images/office.webp";

export type PhotoSource = { image: StaticImageData; small?: StaticImageData };

export const photos = {
  hero: { image: hero, small: heroSmall },
  office: { image: office, small: officeSmall },
  construction: { image: construction, small: constructionSmall },
  kitchen: { image: kitchen, small: kitchenSmall },
  company: { image: company, small: companySmall },
} satisfies Record<string, PhotoSource>;
