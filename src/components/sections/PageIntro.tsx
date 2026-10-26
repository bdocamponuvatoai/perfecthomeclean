import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

type PageIntroProps = { eyebrow: string; title: ReactNode; lead: string };

export function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <section className="container page-intro">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{lead}</p>
    </section>
  );
}
