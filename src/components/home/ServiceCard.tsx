import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  const href = `/services/${service.slug}/`;
  return (
    <article className="service-card">
      <Link className="service-image" href={href}>
        <Photo photo={service.photo} alt={service.alt} />
        <span className="service-number">{service.number}</span>
        <span className="circle-arrow">
          <Icon name="up" />
        </span>
      </Link>
      <div className="service-card-copy">
        <Eyebrow>{service.short}</Eyebrow>
        <h3>
          <Link href={href}>{service.name}</Link>
        </h3>
        <p>{service.description}</p>
      </div>
    </article>
  );
}
