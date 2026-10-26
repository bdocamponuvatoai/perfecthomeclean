import { PageIntro } from "@/components/sections/PageIntro";
import { TextLink } from "@/components/ui/ArrowLink";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy & preview information",
  path: "/privacy/",
  description:
    "Understand the cleaning planner, external services and imagery in this design preview.",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT THIS PREVIEW"
        title={
          <>
            Your details.
            <br />
            <span>Handled clearly.</span>
          </>
        }
        lead="How the cleaning planner and this design preview work."
      />
      <section className="container prose section compact">
        <h2>The cleaning planner</h2>
        <p>
          Your entries are used in your browser to assemble a cleaning brief. This preview does not
          submit a request, reserve an appointment, collect payment or store your plan on a server.
        </p>
        <p>
          Choosing “Create email request” opens your email app with the company’s address and your
          brief. Review it before sending. Choosing “Download my brief” saves a text copy to your
          device. Do not enter door codes, payment details or sensitive information.
        </p>
        <h2>External services</h2>
        <p>
          Phone, email, map and original-website links take you to separate services. The privacy
          practices of those services apply when you use them.
        </p>
        <h2>Design and imagery</h2>
        <p>
          This is a private design concept for Perfect Home Cleaning. Generated lifestyle imagery
          illustrates the proposed brand direction and does not document customer properties or
          completed work. The original team photograph and logo come from the company’s website.
        </p>
        <p>
          Service information was reviewed in October 2026. The company confirms current coverage,
          scope, pricing, scheduling and policies directly.
        </p>
        <TextLink href={site.originalContactPage} external>
          Contact the company
        </TextLink>
      </section>
    </>
  );
}
