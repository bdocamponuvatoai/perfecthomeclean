import localFont from "next/font/local";

// No generated fallback face: glyphs missing from these fonts (such as arrows)
// fall back to Arial exactly as in the design.
export const inter = localFont({
  src: "../assets/fonts/inter.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: false,
});

export const manrope = localFont({
  src: "../assets/fonts/manrope.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  adjustFontFallback: false,
});
