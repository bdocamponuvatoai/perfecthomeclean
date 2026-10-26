import type { FaqItem } from "@/content/faq";

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
          <summary>
            {item.question}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
