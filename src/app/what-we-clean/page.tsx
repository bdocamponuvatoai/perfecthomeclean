import { ClosingCta } from "@/components/sections/ClosingCta";
import { PageIntro } from "@/components/sections/PageIntro";
import { RoomExplorer } from "@/components/sections/RoomExplorer";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PrepChecklist } from "@/components/what-we-clean/PrepChecklist";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "What we clean",
  path: "/what-we-clean/",
  description:
    "Explore cleaning tasks room by room and prepare a clearer brief for your home or workplace.",
});

export default function WhatWeCleanPage() {
  return (
    <>
      <PageIntro
        eyebrow="KNOW WHAT TO ASK FOR"
        title={
          <>
            A little attention.
            <br />
            {"A whole different "}
            <span>feeling.</span>
          </>
        }
        lead="Explore the company’s listed cleaning tasks, then tell the team what matters most to your space."
      />
      <section className="container section compact">
        <RoomExplorer />
      </section>
      <section className="container section split-intro">
        <div>
          <Eyebrow>MAKE THE DETAILS CLEAR</Eyebrow>
          <h2>
            Some things deserve
            <br />
            their own conversation.
          </h2>
        </div>
        <div>
          <p>
            Specific requests, inside-appliance cleaning, interior windows, delicate finishes,
            access restrictions and pet-related concerns can change the scope. Add them to your
            brief and ask the team to confirm what’s included.
          </p>
          <ButtonLink href="/request/">Add my priorities</ButtonLink>
        </div>
      </section>
      <section className="container prep-section">
        <div>
          <Eyebrow>A SMOOTHER START</Eyebrow>
          <h2>
            A few things
            <br />
            to think about.
          </h2>
        </div>
        <PrepChecklist />
      </section>
      <ClosingCta />
    </>
  );
}
