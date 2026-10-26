import { ServiceMatch } from "@/components/services/ServiceMatch";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Tags } from "@/components/ui/lists";
import { Photo } from "@/components/ui/Photo";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cleaning for every kind of space",
  path: "/services/",
  description:
    "Explore residential, commercial and post-construction cleaning and find the right starting point for your space.",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="FIND YOUR PERFECT CLEAN"
        title={
          <>
            Your space.
            <br />
            {"Your routine. "}
            <span>Our care.</span>
          </>
        }
        lead="Start with what your space needs. We’ll help you put the details together."
      />
      <section className="container section compact service-list">
        {services.map((service) => (
          <article key={service.slug}>
            <div className="service-list-image">
              <Photo photo={service.photo} alt={service.alt} />
            </div>
            <div>
              <Eyebrow>{`${service.number} / ${service.short}`}</Eyebrow>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <Tags items={service.tags} />
              <ButtonLink href={`/services/${service.slug}/`}>
                {`Explore ${service.short.toLowerCase()}`}
              </ButtonLink>
            </div>
          </article>
        ))}
      </section>
      <section className="container service-match">
        <div>
          <Eyebrow>NOT QUITE SURE?</Eyebrow>
          <h2>
            Start with the feeling
            <br />
            you’re looking for.
          </h2>
          <p>Pick what sounds most like your space.</p>
        </div>
        <ServiceMatch />
      </section>
      <ClosingCta />
    </>
  );
}
