import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/deployment";
import { services } from "@/content/services";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/",
  "/services/",
  ...services.map((service) => `/services/${service.slug}/`),
  "/what-we-clean/",
  "/about/",
  "/areas/",
  "/faq/",
  "/contact/",
  "/request/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PATHS.map((path) => ({ url: `${siteUrl}${path}` }));
}
