import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Let’s find your fresh start | ${site.titleSuffix}` },
  description: "Return to the Perfect Home Cleaning experience.",
};

export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE OUT OF PLACE"
        title={
          <>
            Let’s find your
            <br />
            <span>fresh start.</span>
          </>
        }
        lead="This page could not be found. Your next clean is still just a few steps away."
      />
      <div className="container section compact">
        <ButtonLink href="/">Take me home</ButtonLink>
      </div>
    </>
  );
}
