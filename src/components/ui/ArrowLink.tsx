import type { ReactNode } from "react";

import { Icon } from "./Icon";
import { SmartLink } from "./SmartLink";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** Opens in a new tab with an outbound arrow. */
  external?: boolean;
};

function ArrowLink({
  href,
  children,
  external,
  className,
}: ArrowLinkProps & { className: string }) {
  const target = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <SmartLink className={className} href={href} {...target}>
      <span>{children}</span>
      <Icon name={external ? "up" : "arrow"} />
    </SmartLink>
  );
}

export function TextLink(props: ArrowLinkProps) {
  return <ArrowLink {...props} className="text-link" />;
}

export function ButtonLink({ className, ...props }: ArrowLinkProps & { className?: string }) {
  return <ArrowLink {...props} className={className ? `button ${className}` : "button"} />;
}
