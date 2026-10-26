import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/config/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <ButtonLink href="/request/">Plan my clean</ButtonLink>
      <a href={site.phone.href} aria-label={`Call ${site.name}`}>
        <Icon name="phone" />
      </a>
    </div>
  );
}
