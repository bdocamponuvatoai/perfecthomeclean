import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink, TextLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { cityLine, site } from "@/config/site";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Perfect Home Cleaning",
  path: "/contact/",
  description: "Call, email or prepare a cleaning brief for the Perfect Home Cleaning team.",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="A REAL CONVERSATION STARTS HERE"
        title={
          <>
            Let’s talk
            <br />
            {"about your "}
            <span>space.</span>
          </>
        }
        lead="Have a question or need help choosing a service? Reach out to the Perfect Home Cleaning team."
      />
      <section className="container section compact contact-layout">
        <div className="contact-main">
          <Eyebrow>GIVE US A CALL</Eyebrow>
          <a className="big-phone" href={site.phone.href}>
            {site.phone.display}
          </a>
          <p>
            {"Additional contact: "}
            <a href={site.altPhone.href}>{site.altPhone.display}</a>
          </p>
          <div className="contact-detail">
            <span>
              <Icon name="mail" />
            </span>
            <div>
              <h3>Drop us a note.</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="contact-detail">
            <span>
              <Icon name="pin" />
            </span>
            <div>
              <h3>New York, at home.</h3>
              <p>
                {site.address.street}
                <br />
                {cityLine}
              </p>
              <TextLink href={site.mapUrl} external>
                View location
              </TextLink>
            </div>
          </div>
        </div>
        <aside className="contact-card">
          <Photo photo={photos.kitchen} alt="Illustrative thoughtful kitchen cleaning" />
          <div>
            <Eyebrow>LET’S MAKE IT SIMPLE</Eyebrow>
            <h2>
              A few details.
              <br />A clearer request.
            </h2>
            <p>Put your service, space and priorities into one useful cleaning brief.</p>
            <ButtonLink href="/request/">Build my cleaning request</ButtonLink>
          </div>
        </aside>
      </section>
      <ClosingCta />
    </>
  );
}
