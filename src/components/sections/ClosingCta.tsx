import { ButtonLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/config/site";

export function ClosingCta() {
  return (
    <section className="container cta">
      <div>
        <Eyebrow>A FRESH START FEELS GOOD</Eyebrow>
        <h2>
          Your home.
          <br />
          {"Your time. "}
          <span>Your clean.</span>
        </h2>
        <p>Tell us what you need. We’ll help you take it from here.</p>
      </div>
      <div className="cta-actions">
        <ButtonLink href="/request/">Let’s plan your clean</ButtonLink>
        <a href={site.phone.href}>{`Or call ${site.phone.display}`}</a>
      </div>
      <div className="cta-spark" aria-hidden="true">
        <Icon name="spark" />
      </div>
    </section>
  );
}
