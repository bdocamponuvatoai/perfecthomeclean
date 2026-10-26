import { Hero } from "@/components/home/Hero";
import { QuickFinder } from "@/components/home/QuickFinder";
import { ServiceCard } from "@/components/home/ServiceCard";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { RoomExplorer } from "@/components/sections/RoomExplorer";
import { ButtonLink, TextLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";
import { faqs } from "@/content/faq";
import { photos } from "@/content/photos";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "A little more life, a little less cleaning",
  path: "/",
  description:
    "Discover a thoughtful cleaning experience for homes, workplaces and post-construction spaces in NYC, Long Island and New Jersey.",
});

const steps = [
  {
    title: "Tell us about your space.",
    text: "Choose your service and share the details that make your home or workplace yours.",
  },
  {
    title: "Make the plan together.",
    text: "The team confirms your scope, quote and timing before the appointment is booked.",
  },
  {
    title: "Leave room for life.",
    text: "Once your clean is arranged, you can focus on the rest of your day.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickFinder />
      <div className="container trust-row">
        <span>
          <Icon name="shield" />
          Insured & bonded
        </span>
        <span>
          <Icon name="home" />
          Family owned & operated
        </span>
        <span>
          <Icon name="calendar" />
          Cleaning that fits your routine
        </span>
        <span>
          <Icon name="spark" />
          Supplies & equipment provided
        </span>
      </div>

      <section className="container section">
        <div className="section-head">
          <div>
            <Eyebrow>A CLEAN FOR EVERY CHAPTER</Eyebrow>
            <h2>
              Different spaces.
              <br />
              {"Same "}
              <span className="serif">good feeling.</span>
            </h2>
          </div>
          <div>
            <p>
              From everyday living to your next big project,
              <br />
              there’s a place to start.
            </p>
            <TextLink href="/services/">Meet your clean</TextLink>
          </div>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="soft-section">
        <div className="container section">
          <div className="section-head">
            <div>
              <Eyebrow>CARE YOU CAN SEE</Eyebrow>
              <h2>
                The details make
                <br />
                {"the "}
                <span className="serif">difference.</span>
              </h2>
            </div>
            <TextLink href="/what-we-clean/">Explore what we clean</TextLink>
          </div>
          <RoomExplorer />
        </div>
      </section>

      <section className="container section how-section">
        <div>
          <Eyebrow>LESS TO ARRANGE. MORE TO ENJOY.</Eyebrow>
          <h2>
            From “one more thing”
            <br />
            {"to "}
            <span className="serif">taken care of.</span>
          </h2>
          <p>
            One clear plan. A team to talk to.
            <br />A space you can get back to enjoying.
          </p>
          <ButtonLink href="/request/">Build your cleaning plan</ButtonLink>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container story-strip">
        <div className="story-photo">
          <Photo
            photo={photos.company}
            alt="Perfect Home Cleaning team members preparing a bed; photo from the company website"
          />
          <span>THE PEOPLE BEHIND YOUR CLEAN</span>
        </div>
        <div className="story-copy">
          <Eyebrow>PERSONAL SERVICE. REAL PEOPLE.</Eyebrow>
          <h2>
            Home is personal.
            <br />
            <span className="serif">So is our care.</span>
          </h2>
          <p>
            Perfect Home Cleaning is family owned and operated. For more than two decades, the
            company has helped New York homes and businesses find a cleaner rhythm.
          </p>
          <TextLink href="/about/">Get to know us</TextLink>
          <div className="story-facts">
            <div>
              <b>2001</b>
              <span>Serving New York since</span>
            </div>
            <div>
              <b>Family</b>
              <span>Owned & operated</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container quote-section">
        <Eyebrow>A GOOD WORD GOES A LONG WAY</Eyebrow>
        <blockquote>“Very detailed … easy to communicate with staff.”</blockquote>
        <div>
          <span>Joan Mckay</span>
          <a href={site.originalWebsite} target="_blank" rel="noopener">
            Customer feedback shared on the company website ↗
          </a>
        </div>
      </section>

      <FaqSection
        eyebrow="LET’S CLEAR A FEW THINGS UP"
        title={
          <>
            Good questions.
            <br />
            <span className="serif">Clear answers.</span>
          </>
        }
        items={faqs.slice(0, 4)}
        action={<TextLink href="/faq/">All your questions</TextLink>}
      />
      <ClosingCta />
    </>
  );
}
