"use client";

import { Fragment, useState } from "react";

import { TextLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { CheckList } from "@/components/ui/lists";
import { Photo } from "@/components/ui/Photo";
import { photos } from "@/content/photos";
import { rooms } from "@/content/widgets";

type RoomKey = (typeof rooms)[number]["key"];

export function RoomExplorer() {
  // null until a tab is chosen: the first room keeps its designed line break.
  const [selected, setSelected] = useState<RoomKey | null>(null);
  const room = rooms.find((item) => item.key === (selected ?? "kitchen"))!;

  return (
    <div className="room-explorer">
      <div className="room-image">
        <Photo photo={photos.kitchen} alt="Illustrative kitchen cleaning" />
        <span className="image-caption">A LITTLE ATTENTION. A DIFFERENT FEELING.</span>
        <div className="room-sticker">
          <Icon name="spark" />
          <span>
            It’s the little
            <br />
            things.
          </span>
        </div>
      </div>
      <div className="room-content">
        <div className="room-tabs" role="group" aria-label="Choose a room">
          {rooms.map((item) => (
            <button
              key={item.key}
              aria-pressed={item.key === room.key}
              onClick={() => setSelected(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div id="room-result" aria-live="polite">
          <Eyebrow>{room.eyebrow}</Eyebrow>
          {selected === null ? (
            <h3>
              {room.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h3>
          ) : (
            <h3>{room.title.join(" ")}</h3>
          )}
          {selected === null ? (
            <CheckList items={room.tasks} />
          ) : (
            <PlainCheckList items={room.tasks} />
          )}
        </div>
        <p className="fine">
          A guide to the company’s listed tasks. Confirm the exact scope, access and any extras with
          the team.
        </p>
        <TextLink href="/request/?service=regular">Make this my clean</TextLink>
      </div>
    </div>
  );
}

/** After a tab is chosen the ticks are drawn without rounded caps, as on the original site. */
function PlainCheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
