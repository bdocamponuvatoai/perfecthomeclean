# Verification — Next.js migration parity

Measured on 27 October 2026, comparing the original generated site (`dist/`, served as-is) with the
Next.js static export (`out/`). Both were served locally by the same small Node static server with
directory index support.

**Setup:** Chrome 155.0.8059.85 (installed copy, headless) driven by `playwright-core` 1.64.1, with
pixelmatch 5.3.0. Captures used reduced motion and device scale factor 1. Before each capture, every
image was forced eager and awaited with `img.decode()`, and `document.fonts.ready` was awaited. Chrome
ran with `--disable-checker-imaging --disable-gpu --disable-partial-raster --force-color-profile=srgb`.
Without these flags, repeated captures of the _original_ site differed by up to 140,812 pixels: large
images are rasterised asynchronously. With the flags, three consecutive captures of each site were
identical.

## Build and static checks

- `npm run build`: 17 static outputs; `postbuild` flattened 12 prefetch segment files.
- `npm run check`: typecheck, ESLint and Prettier all pass.

## CSS split

The original 47 KB minified stylesheet was split into 23 partials under `src/styles/` by a postcss
script.

- **Computed styles:** identical. Every element (and its `::before`/`::after`) on all 13 original pages
  was compared at 1600, 1280, 1024, 768, 390 and 320 px, with the original stylesheet and with the
  concatenated partials: **78 of 78 page/width combinations matched**. The only allowed difference is
  the font-family fallback chain (`Manrope, sans-serif` now reads `Manrope, Arial, sans-serif`).
- **Declarations:** the multiset of (media query, selector, declaration) entries is identical: 2,163
  before and after.
- **Declaration count:** 2,040 originally, minus 8 `@font-face` declarations (replaced by
  `next/font`), plus 15 copies. The copies come from four grouped rules whose selectors span several
  partials; each partial keeps its own copy so the cascade order is preserved. 2,047 are written, plus
  2 font tokens.
- **Overrides last:** the original "readability" overrides that follow the media queries live in
  `base/overrides.css` and load last.

## DOM structure

The `<body>` of each page was compared after hydration: tags, classes, every text node (including how
text is split into nodes), and the attributes that matter (links, ARIA, form attributes, image
attributes). Asset URLs were normalised for hashing.

- **12 of 14 routes are identical.** Routes compared: 13 pages, a `?service=&region=` preset and the
  404 page.
- `/request/` differs only by whitespace-only `"\n"` text nodes between the original fieldsets, which
  render nothing.
- With a preset, the original set the field value by script, while the new markup sets the `checked`
  or `selected` attribute. The resulting state is the same.
- Next.js adds a hidden metadata `<div hidden>` at the start of `<body>`. It is `display: none` and
  was excluded.

## Pixel comparison

Full-page screenshots of 14 routes at 6 widths (1600, 1280, 1024, 768, 390, 320 px), compared with
pixelmatch at **threshold 0** (any channel difference counts).

**Result: 84 of 84 identical (0 differing pixels).** Two causes of difference were found and fixed
before this result:

1. **Arrows in the fallback font.** Inter does not contain "→" and "←", so those glyphs fall back to
   the next font. `next/font`'s generated, size-adjusted fallback face moved them by 1–3 px; one
   glyph shifted the text after it (175 px on the "← All services" link). Fixed with
   `adjustFontFallback: false`, which gives the same fallback chain as the original.
2. **Capture timing.** Large images were rasterised asynchronously and produced noise even between two
   captures of the same site. Fixed in the capture setup with the Chrome flags above, not by accepting
   the difference.

No sub-pixel or anti-aliasing exceptions were needed.

## Behaviour parity

The same scripted interactions ran on both sites. The JSON outcomes were compared, and screenshots of
16 interactive states were compared at threshold 0. **10 of 10 scenarios gave identical JSON, all 16
screenshots had 0 differing pixels, and neither site logged a console error.**

| Scenario        | What was exercised                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobile menu     | Open and close (`aria-expanded`, `aria-label`, `hidden`); Escape closes it and returns focus to the toggle; resizing to desktop closes it; screenshot of the open menu                                                                                                                                                                                                                                                                                                          |
| Home finder     | Each option: `aria-pressed`, link `href` and `aria-label`, note text; keyboard Enter and Space; 3 screenshots                                                                                                                                                                                                                                                                                                                                                                   |
| Room guide      | Initial state and each of the 4 rooms: result markup and `aria-pressed`; 5 screenshots                                                                                                                                                                                                                                                                                                                                                                                          |
| Service matcher | Hidden at first, then each of 3 answers: result markup and `aria-pressed`; 3 screenshots                                                                                                                                                                                                                                                                                                                                                                                        |
| Prep checklist  | Counter text after checking, unchecking and pressing Space; 1 screenshot                                                                                                                                                                                                                                                                                                                                                                                                        |
| FAQ             | Disclosure opens; 1 screenshot                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Planner (home)  | Service choice, live summary, empty and invalid ZIP errors (message, `aria-invalid`, focus), Enter in the ZIP field, past-date error, priorities and notes, review list, the exact 777-character `mailto:` href, downloaded file name and text, download status, Back keeps date, notes, frequency, priorities, ZIP and region, progress classes, focus moves to each step's legend; 4 screenshots. The download replaced clipboard testing: the site has no clipboard feature. |
| Planner (work)  | `?service=commercial&region=New%20Jersey` preset; home fields hidden and disabled, area field shown; review and `mailto:` at 390 px; 2 screenshots                                                                                                                                                                                                                                                                                                                              |
| Bad preset      | `?service=windows&region=Mars` falls back to the defaults                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Area links      | "Plan a Long Island clean" opens the planner with Long Island selected                                                                                                                                                                                                                                                                                                                                                                                                          |

## Navigation (new site)

**32 of 32 checks passed.**

- Desktop navigation, footer, call-to-action and mobile-menu links navigate client-side: a `window`
  marker survives each navigation.
- Titles and `aria-current` update on each navigation. Service detail pages keep "Our services"
  current.
- A planner preset is applied after client-side navigation.
- Back and Forward work.
- `#top` scrolls to the top. The skip link is the first tab stop and targets `#main`.
- The mobile menu closes after navigating.
- All 18 internal URLs were crawled, including the query-string presets.
- An unknown path returns the styled 404 page with status 404.
- **Zero 4xx/5xx responses in 863 requests**, including link prefetches, and zero console errors or
  hydration warnings.

## `<head>` comparison

Titles and descriptions are identical on every route. Intended differences:

- The canonical and Open Graph URLs come from `SITE_URL`; the `chatgpt.site` preview domain is gone.
  `og:image` points at the hashed hero asset.
- Next.js adds `twitter:*` tags derived from Open Graph, preloads both fonts and above-the-fold images,
  and serves the favicon as `/icon.svg`.
- `robots` reads `noindex, nofollow` (with spaces). The viewport content gains a space.
- New: a `LocalBusiness` JSON-LD block, using only the name, contact details, address and regions
  shown on the site.
- The 404 page has no canonical or Open Graph tags; Next.js adds its own `noindex`.

## After cleanup (owner-approved removal)

The footer note ("Private design concept. Lifestyle imagery is illustrative; …") was removed from every
page, together with its two CSS rules. It provided no spacing that other elements depended on: the
clearance above the fixed mobile bar comes from `body { padding-bottom: 70px }`, and the footer keeps
its own 25px bottom padding. All checks were re-run:

- DOM: the only difference on every route is the removed `<p class="preview-note">`.
- Pixels: pages are 34–35 px shorter at 768 px and wider, 50–51 px at 390 px and 65–66 px at 320 px.
  Everything above the bottom of `.footer-bottom` is identical on **84 of 84** captures. With
  unequal page heights, 8 mobile captures showed small differences inside `backdrop-filter: blur`
  elements (the fixed mobile bar, image caption pills and number badges): Chrome rasterises the
  blur differently when the page surface is a different size. Padding the new page to the old
  document height below the footer removed every difference, which confirms the cause.
- Behaviour: 10 of 10 scenarios with identical JSON; 16 of 16 state screenshots with 0 differing
  pixels.
- Navigation: 32 of 32 checks; zero 4xx/5xx responses in 859 requests; zero console errors.
- `npm audit --omit=dev` and the full `npm audit` both report 0 vulnerabilities.
