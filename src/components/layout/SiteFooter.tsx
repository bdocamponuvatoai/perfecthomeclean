import Link from "next/link";

import { Brand } from "@/components/ui/Brand";
import { cityLine, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            More room for the good things.
            <br />
            We’ll take care of the cleaning.
          </p>
          <a className="footer-phone" href={site.phone.href}>
            {site.phone.display}
          </a>
        </div>
        <div>
          <h3>A clean for every space</h3>
          <Link href="/services/residential/">Residential cleaning</Link>
          <Link href="/services/commercial/">Commercial cleaning</Link>
          <Link href="/services/post-construction/">Post-construction cleaning</Link>
          <Link href="/what-we-clean/">Explore the cleaning guide</Link>
        </div>
        <div>
          <h3>Make yourself at home</h3>
          <Link href="/about/">Our story</Link>
          <Link href="/areas/">Where we clean</Link>
          <Link href="/faq/">Questions, answered</Link>
          <Link href="/contact/">Get in touch</Link>
        </div>
        <div>
          <h3>Let’s talk clean</h3>
          <a className="footer-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p>
            {site.address.street}
            <br />
            {cityLine}
          </p>
          <Link href="/request/">Start your cleaning request →</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{`© ${new Date().getFullYear()} ${site.name}`}</span>
        <Link href="/privacy/">Privacy & preview information</Link>
        <a href={site.originalWebsite} target="_blank" rel="noopener">
          Original website ↗
        </a>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
