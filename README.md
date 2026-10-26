# Perfect Home Cleaning

Website for Perfect Home Cleaning, a family-owned cleaning company serving New York City, Long Island
and New Jersey. It is a static Next.js site (App Router, `output: "export"`) with a browser-only
cleaning-request planner. Nothing is submitted to a server: the planner prepares a brief that the
visitor emails or downloads.

## Getting started

Requires Node.js 20.9 or newer (`.nvmrc` pins the current LTS, 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to out/
npm run preview    # serve out/ locally
```

## Scripts

| Script                 | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                             |
| `npm run build`        | Static export to `out/`, then `postbuild` (see below)          |
| `npm run preview`      | Serves `out/` with `npx serve@14`                              |
| `npm run lint`         | ESLint (Next.js core-web-vitals and TypeScript rules)          |
| `npm run typecheck`    | `next typegen` then `tsc --noEmit`                             |
| `npm run format`       | Prettier, write mode                                           |
| `npm run format:check` | Prettier, check mode                                           |
| `npm run check`        | typecheck + lint + format:check (what CI runs before building) |

`postbuild` runs `scripts/fix-export-segments.mjs`. On Windows, Next.js writes link-prefetch files
into nested folders (`__next.about/__PAGE__.txt`) instead of flat names (`__next.about.__PAGE__.txt`),
so prefetches 404. The script flattens them and does nothing on other platforms.

## Structure

```
src/
  app/                 routes (one folder per page), layout, not-found, robots, sitemap, icon, fonts
    services/[slug]/   the three service pages (generateStaticParams, dynamicParams = false)
  components/
    layout/            header (client: menu, active link), footer, announcement, mobile bar
    sections/          shared sections: page intro, closing CTA, FAQ, room explorer (client), help block
    home/              hero, quick finder (client), service card
    services/          service matcher (client)
    what-we-clean/     preparation checklist (client)
    request/           request planner (client) and query-string preset wrapper
    ui/                Icon, SmartLink, TextLink/ButtonLink, Photo, Brand, Eyebrow, Headline, lists
    seo/               LocalBusiness JSON-LD
  config/
    site.ts            business details and navigation (safe in client code)
    deployment.ts      SITE_URL / SITE_INDEXABLE (build-time, server only)
  content/             typed copy: services, FAQ, planner options, widget data, photos
  lib/                 metadata helper, request brief / mailto builder
  styles/              globals.css importing ordered partials (base, components, sections, pages)
  assets/              images and fonts (static imports; font licenses alongside)
scripts/               fix-export-segments.mjs
docs/                  content sources and the migration verification record
```

## Conventions

- Server Components by default. Client components only where there is real interactivity: menu,
  finder, matcher, room tabs, checklist and planner.
- Class names and the IDs used by CSS match the stylesheet exactly. When editing JSX, keep text that
  mixes literals and values as one string (``{`Or call ${phone}`}``); several text nodes render with
  slightly different spacing.
- `styles/globals.css` imports partials in the order of the original stylesheet, and that order is
  part of the cascade. `base/overrides.css` must stay last.
- Fonts come from `next/font/local` through the `--font-body` and `--font-display` tokens. Never
  write font names directly in CSS.
- Images use static imports through `Photo`, which adds the `-small` variant to `srcset`. The LCP image
  per page gets `eager`.
- Business facts live in `config/site.ts` and `content/`. Don't add hours, prices, ratings or other
  claims that the business hasn't provided.

## Routes

| Path                           | Page                                                |
| ------------------------------ | --------------------------------------------------- |
| `/`                            | Home                                                |
| `/services/`                   | Services overview and matcher                       |
| `/services/residential/`       | Residential cleaning                                |
| `/services/commercial/`        | Commercial cleaning                                 |
| `/services/post-construction/` | Post-construction cleaning                          |
| `/what-we-clean/`              | Room-by-room guide and preparation checklist        |
| `/about/`                      | Company story                                       |
| `/areas/`                      | Service areas                                       |
| `/faq/`                        | Questions                                           |
| `/contact/`                    | Phone, email, address                               |
| `/request/`                    | Request planner; accepts `?service=` and `?region=` |
| `/privacy/`                    | Privacy and preview information                     |
| `404.html`                     | Not found                                           |

`?service=` accepts `regular`, `deep`, `commercial` or `construction`. `?region=` accepts
`New York City`, `Long Island`, `New Jersey` or `Ask about another area`. Unknown values are ignored.

## Configuration

Copy `.env.example` to `.env.local` for local overrides. Both variables are read at build time.

| Variable         | Default                                                                | Purpose                                                                                                            |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Canonical URLs, Open Graph, robots.txt, sitemap.xml                                                                |
| `SITE_INDEXABLE` | `false`                                                                | `true` removes `noindex` and opens robots.txt. The build fails if this is `true` while the URL is still localhost. |

## Before launch

- [ ] Owner confirms every company fact (history, insurance, policies, service regions, phone numbers, address).
- [ ] Owner approves the copy and the use of AI-generated lifestyle photos, or supplies real photos.
- [ ] Decide on the "Privacy & preview information" page wording.
- [ ] Decide whether requests should keep going through email, or connect a real form or booking service.
- [ ] Set `SITE_URL` to the production domain and `SITE_INDEXABLE=true` in production only.
- [ ] Re-run Lighthouse on the live domain; submit `sitemap.xml` in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci`, `npm run check`,
`npm run build`. It uploads `out/` as an artifact. Dependabot updates npm packages weekly (Next.js,
React and types grouped) and GitHub Actions monthly.

## Hosting

Vercel: import the repository. The framework is detected as Next.js and the static export is served
from `out/`. `vercel.json` adds security headers (nosniff, referrer policy, frame denial, permissions
policy, HSTS). Set `SITE_INDEXABLE=false` for Preview; set `SITE_URL` and, after owner approval,
`SITE_INDEXABLE=true` for Production.

`out/` also works on any static host that serves directory `index.html` files and `404.html`.

Preview deployment: _to be added after the first Vercel deploy._
