import { Suspense } from "react";

import { PresetPlanner } from "@/components/request/PresetPlanner";
import { RequestPlanner } from "@/components/request/RequestPlanner";
import { PageIntro } from "@/components/sections/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Plan your perfect clean",
  path: "/request/",
  description:
    "Build a personalized cleaning brief with your service, space, schedule and priorities, then share it with the team for a quote.",
});

export default function RequestPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR SPACE, YOUR WAY"
        title={
          <>
            Let’s make room
            <br />
            {"for a "}
            <span>better clean.</span>
          </>
        }
        lead="Build a clear request in a few simple steps. The team confirms the scope, price and appointment with you."
      />
      {/* The static HTML contains the default form; query-string presets apply in the browser. */}
      <Suspense fallback={<RequestPlanner />}>
        <PresetPlanner />
      </Suspense>
    </>
  );
}
