import type { Metadata } from "next";

import hero from "@/assets/images/hero.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  title: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  description: string;
};

export function pageMetadata({ title, path, description }: PageMetadataInput): Metadata {
  return {
    title: { absolute: `${title} | ${site.titleSuffix}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      images: [hero.src],
      type: "website",
    },
  };
}
