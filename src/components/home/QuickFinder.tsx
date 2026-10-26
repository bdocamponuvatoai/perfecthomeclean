"use client";

import Link from "next/link";
import { useState } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { finderOptions } from "@/content/widgets";

type FinderKey = (typeof finderOptions)[number]["key"];

export function QuickFinder() {
  const [selected, setSelected] = useState<FinderKey>("home");
  const option = finderOptions.find((item) => item.key === selected)!;

  return (
    <section className="container quick-finder" aria-labelledby="finder-title">
      <div>
        <Eyebrow>LET’S START WITH YOU</Eyebrow>
        <h2 id="finder-title">What needs a fresh start?</h2>
      </div>
      <div className="finder-options" role="group" aria-label="Choose a space">
        {finderOptions.map((item) => (
          <button
            key={item.key}
            aria-pressed={item.key === selected}
            onClick={() => setSelected(item.key)}
          >
            <Icon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>
      <Link
        className="finder-next"
        href={`/services/${option.service}/`}
        aria-label={`Explore ${option.service.replaceAll("-", " ")} cleaning`}
      >
        <Icon name="arrow" />
      </Link>
      <p className="finder-note" role="status">
        {option.note}
      </p>
    </section>
  );
}
