import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

export function Announcement() {
  return (
    <div className="announcement">
      {"A little more life. A little less cleaning. "}
      <Link href="/areas/">
        {"NYC · Long Island · New Jersey "}
        <Icon name="up" />
      </Link>
    </div>
  );
}
