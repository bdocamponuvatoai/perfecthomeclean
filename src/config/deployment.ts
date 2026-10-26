// Deployment settings read from the environment at build time.
// Server only: do not import from client components.

function resolveSiteUrl(): string {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url =
    process.env.SITE_URL ||
    (productionHost ? `https://${productionHost}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && /^https?:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(siteUrl)) {
  throw new Error(
    "SITE_INDEXABLE is true but the site URL is still localhost. Set SITE_URL to the public domain.",
  );
}
