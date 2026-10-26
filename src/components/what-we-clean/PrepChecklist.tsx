"use client";

import { useState } from "react";

import { prepItems } from "@/content/widgets";

export function PrepChecklist() {
  const [checked, setChecked] = useState(0);

  return (
    <div className="prep-list">
      {prepItems.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            onChange={(event) => setChecked((count) => count + (event.target.checked ? 1 : -1))}
          />{" "}
          <span>{item}</span>
        </label>
      ))}
      <p className="fine" role="status">
        {`${checked} of ${prepItems.length} planning points checked`}
      </p>
    </div>
  );
}
