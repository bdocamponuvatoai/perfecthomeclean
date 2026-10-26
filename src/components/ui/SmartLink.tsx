import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/** Internal paths use next/link; tel:, mailto:, hash and external links stay plain anchors. */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
