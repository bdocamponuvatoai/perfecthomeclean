import { Fragment } from "react";

/** Heading copy split into lines, ending with a highlighted phrase. */
export type Headline = { lines: readonly string[]; highlight: string };

export function HeadlineText({ title }: { title: Headline }) {
  return (
    <>
      {title.lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
      <span>{title.highlight}</span>
    </>
  );
}
