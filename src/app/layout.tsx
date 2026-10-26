import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Announcement } from "@/components/layout/Announcement";
import { MobileBar } from "@/components/layout/MobileBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BusinessJsonLd } from "@/components/seo/BusinessJsonLd";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import "@/styles/globals.css";

import { inter, manrope } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: isIndexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body id="top">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Announcement />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileBar />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
