"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { matchOptions } from "@/content/widgets";

type MatchKey = (typeof matchOptions)[number]["key"];

export function ServiceMatch() {
  const [selected, setSelected] = useState<MatchKey | null>(null);
  const match = matchOptions.find((item) => item.key === selected);

  return (
    <div className="match-options">
      {matchOptions.map((item) => (
        <button
          key={item.key}
          aria-pressed={selected === null ? undefined : item.key === selected}
          onClick={() => setSelected(item.key)}
        >
          <span>{item.prompt}</span>
          <Icon name="arrow" />
        </button>
      ))}
      <div id="match-result" aria-live="polite" hidden={!match}>
        {match && (
          <>
            <h3>{match.title}</h3>
            <p>{match.copy}</p>
            <Link className="text-link" href={`/request/?service=${match.key}`}>
              Build my cleaning request →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
