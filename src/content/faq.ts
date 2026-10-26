export type FaqItem = { question: string; answer: string };

export const faqs: readonly FaqItem[] = [
  {
    question: "What type of cleaning should I choose?",
    answer:
      "A regular clean helps keep your space on track. A deep clean is a good starting point when you want a more detailed reset. For workplaces or a recently completed renovation, choose the service made for that setting. The team will confirm the scope with you.",
  },
  {
    question: "Do I need to supply the cleaning products?",
    answer:
      "The company brings cleaning supplies and equipment. Mention any product preferences, delicate surfaces or sensitivities when you request a clean so the team can discuss them with you.",
  },
  {
    question: "Can I arrange a recurring clean?",
    answer:
      "Yes. Weekly, bi-weekly and monthly options are listed by the company. Share your preferred rhythm; the team confirms scheduling and availability.",
  },
  {
    question: "Is the company insured and bonded?",
    answer:
      "Perfect Home Cleaning states that it is insured and bonded. If your building needs a certificate of insurance, include that requirement when you get in touch.",
  },
  {
    question: "Will I get a price before booking?",
    answer:
      "Ask the team for a quote for your particular space and scope. This planner helps you prepare the details; it does not calculate a live price or confirm an appointment.",
  },
  {
    question: "How do I change an appointment?",
    answer:
      "Contact the team directly about changes. The company asks for at least 24 hours’ notice when cancelling or rescheduling; confirm the applicable terms when booking.",
  },
  {
    question: "What if something needs another look?",
    answer:
      "The company offers a satisfaction guarantee and asks customers to raise concerns so the team can address them. Contact the team to discuss the details of your clean.",
  },
];

export const priceQuestion = faqs[4];
