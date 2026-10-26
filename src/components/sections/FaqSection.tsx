import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import type { FaqItem } from "@/content/faq";

import { FaqList } from "./FaqList";

type FaqSectionProps = {
  eyebrow: string;
  title: ReactNode;
  items: readonly FaqItem[];
  /** Optional link under the heading. */
  action?: ReactNode;
};

export function FaqSection({ eyebrow, title, items, action }: FaqSectionProps) {
  return (
    <section className="container section faq-section">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {action}
      </div>
      <FaqList items={items} />
    </section>
  );
}
