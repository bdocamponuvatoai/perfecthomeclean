import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo.png";
import { site } from "@/config/site";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label={`${site.name} home`}>
      <Image src={logo} alt={site.name} loading="eager" />
    </Link>
  );
}
