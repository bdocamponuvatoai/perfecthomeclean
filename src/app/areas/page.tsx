import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink, TextLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Where we clean",
  path: "/areas/",
  description:
    "Explore Perfect Home Cleaning’s listed service regions in New York City, Long Island and New Jersey.",
});

const areas = [
  {
    eyebrow: "01 / THE CITY",
    name: "New York City",
    text: "Residential and commercial cleaning, with a dedicated Brooklyn service offering.",
    link: "Plan a New York clean",
  },
  {
    eyebrow: "02 / A LITTLE MORE ROOM",
    name: "Long Island",
    text: "Regular, deep and custom home cleaning across the company’s listed Long Island service area.",
    link: "Plan a Long Island clean",
  },
  {
    eyebrow: "03 / ACROSS THE RIVER",
    name: "New Jersey",
    text: "Ask the team about service for your location, property and preferred schedule.",
    link: "Ask about New Jersey",
  },
];

export default function AreasPage() {
  return (
    <>
      <PageIntro
        eyebrow="GOOD CARE, CLOSE TO HOME"
        title={
          <>
            Around the city.
            <br />
            {"Across your "}
            <span>everyday.</span>
          </>
        }
        lead="Explore the company’s listed service regions. The team confirms availability for your exact address and cleaning needs."
      />
      <section className="container section compact area-layout">
        <div className="area-visual">
          <div className="area-words" aria-hidden="true">
            <span>NEW YORK CITY</span>
            <strong>
              A little
              <br />
              closer to
              <br />
              <em>clean.</em>
            </strong>
            <span>LONG ISLAND · NEW JERSEY</span>
          </div>
          <div className="area-dot one"></div>
          <div className="area-dot two"></div>
          <div className="area-dot three"></div>
        </div>
        <div className="area-list">
          {areas.map((area) => (
            <article key={area.name}>
              <Eyebrow>{area.eyebrow}</Eyebrow>
              <h2>{area.name}</h2>
              <p>{area.text}</p>
              <TextLink href={`/request/?region=${encodeURIComponent(area.name)}`}>
                {area.link}
              </TextLink>
            </article>
          ))}
        </div>
      </section>
      <section className="container location-cta">
        <span>
          <Icon name="pin" />
        </span>
        <div>
          <h3>Have a specific ZIP code in mind?</h3>
          <p>Add it to your request. The team will confirm coverage and availability.</p>
        </div>
        <ButtonLink href="/request/">Start with my address</ButtonLink>
      </section>
      <ClosingCta />
    </>
  );
}
