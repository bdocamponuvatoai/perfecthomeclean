import { ClosingCta } from "@/components/sections/ClosingCta";
import { FaqList } from "@/components/sections/FaqList";
import { HelpBlock } from "@/components/sections/HelpBlock";
import { PageIntro } from "@/components/sections/PageIntro";
import { faqs } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Questions, answered",
  path: "/faq/",
  description: "Cleaning services, supplies, scheduling, insurance and quote questions answered.",
});

export default function FaqPage() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE CLARITY GOES A LONG WAY"
        title={
          <>
            Let’s get your
            <br />
            {"questions "}
            <span>answered.</span>
          </>
        }
        lead="From supplies to scheduling, here are a few useful things to know before you plan a clean."
      />
      <section className="container section compact faq-page">
        <FaqList items={faqs} />
        <HelpBlock />
      </section>
      <ClosingCta />
    </>
  );
}
