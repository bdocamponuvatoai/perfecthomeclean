import Link from "next/link";
import { notFound } from "next/navigation";

import { ClosingCta } from "@/components/sections/ClosingCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { RoomExplorer } from "@/components/sections/RoomExplorer";
import { ButtonLink, TextLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeadlineText } from "@/components/ui/Headline";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { priceQuestion } from "@/content/faq";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.short,
    path: `/services/${service.slug}/`,
    description: service.detail.lead,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const { detail } = service;
  const plannerHref = `/request/?service=${service.plannerService}`;

  return (
    <>
      <section className="container detail-hero">
        <div>
          <Link className="back-link" href="/services/">
            ← All services
          </Link>
          <Eyebrow>{detail.eyebrow}</Eyebrow>
          <h1>
            <HeadlineText title={detail.title} />
          </h1>
          <p>{detail.lead}</p>
          <ButtonLink href={plannerHref}>Plan this clean</ButtonLink>
        </div>
        <div className="detail-hero-image">
          <Photo photo={service.photo} alt={service.alt} eager />
        </div>
      </section>
      <section className="container section split-intro">
        <h2>{detail.intro}</h2>
        <p>{detail.copy}</p>
      </section>
      <section className="container option-row">
        {detail.options.map((option) => (
          <article key={option.title}>
            <span className="option-icon">
              <Icon name={option.icon} />
            </span>
            <h3>{option.title}</h3>
            <p>{option.text}</p>
          </article>
        ))}
      </section>
      {service.slug === "residential" ? (
        <section className="container section">
          <RoomExplorer />
        </section>
      ) : (
        <section className="container planning-note">
          <div>
            <Icon name="layers" />
          </div>
          <p>
            A good quote starts with a clear brief. Include your space, priorities and access
            details in the planner.
          </p>
          <TextLink href={plannerHref}>Create my brief</TextLink>
        </section>
      )}
      <FaqSection
        eyebrow="BEFORE WE BEGIN"
        title={
          <>
            A little more
            <br />
            <span className="serif">clarity.</span>
          </>
        }
        items={[...detail.questions, priceQuestion]}
      />
      <ClosingCta />
    </>
  );
}
