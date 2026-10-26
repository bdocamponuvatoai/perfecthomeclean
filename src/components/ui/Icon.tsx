import type { ReactNode } from "react";

const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  up: <path d="M6 18 18 6M6 6h12v12" />,
  check: <path d="m5 12 4 4L19 6" />,
  home: <path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7" />,
  office: <path d="M4 21V3h12v18M16 9h4v12M8 7h4M8 11h4M8 15h4M9 21v-3h2v3" />,
  spark: <path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7z" />,
  shield: <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6zM8 12l3 3 5-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  phone: <path d="m7 3 3 5-3 2c2 4 3 5 7 7l2-3 5 3c0 3-2 5-5 4C8 19 3 14 2 7 2 4 4 2 7 3Z" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3" />
    </>
  ),
  layers: <path d="m3 7 9-4 9 4-9 4zM3 12l9 4 9-4M3 17l9 4 9-4" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
