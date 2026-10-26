import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/photos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The people behind your clean",
  path: "/about/",
  description:
    "Meet a family-owned cleaning company serving New York homes and businesses for over two decades.",
});

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Confidence in the details.",
    text: "The company states that it is insured and bonded, with insurance documentation available for building requirements.",
  },
  {
    icon: "clock",
    title: "A plan that fits.",
    text: "One-time needs and recurring routines start with a conversation about your space and schedule.",
  },
  {
    icon: "spark",
    title: "A clean you can talk about.",
    text: "If something needs attention, contact the team. The company’s satisfaction commitment is about making concerns heard and addressed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE PEOPLE BEHIND THE CLEAN"
        title={
          <>
            Thoughtful care.
            <br />
            {"From people who "}
            <span>care.</span>
          </>
        }
        lead="A family business built around the everyday spaces that matter to you."
      />
      <section className="container about-feature">
        <div>
          <Photo
            photo={photos.company}
            alt="Perfect Home Cleaning team working in a bedroom; original company photograph"
            eager
          />
          <p className="fine">Team photograph from Perfect Home Cleaning’s existing website.</p>
        </div>
        <div>
          <Eyebrow>A PERSONAL APPROACH</Eyebrow>
          <h2>
            Every home has
            <br />
            its own story.
          </h2>
          <p>
            Perfect Home Cleaning is family owned and operated, serving residential and commercial
            customers in the New York area for over 20 years.
          </p>
          <p>
            That experience begins with listening: how you use your space, what you need from a
            clean, and the details that make your day easier.
          </p>
          <ButtonLink href="/contact/">Let’s talk about your space</ButtonLink>
        </div>
      </section>
      <section className="container section">
        <div className="values-grid">
          {values.map((value) => (
            <article key={value.title}>
              <Icon name={value.icon} />
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
