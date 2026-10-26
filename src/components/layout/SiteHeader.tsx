"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/ArrowLink";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";
import { mainNav, site } from "@/config/site";

const DESKTOP_QUERY = "(min-width: 951px)";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const section = pathname.endsWith("/") ? pathname : `${pathname}/`;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOnPath(null);
      toggleRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header>
      <div className="container nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={section.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="nav-phone" href={site.phone.href}>
          <Icon name="phone" />
          <span>{site.phone.display}</span>
        </a>
        <ButtonLink href="/request/" className="small header-cta">
          Get my clean
        </ButtonLink>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpenOnPath(open ? null : pathname)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden={!open}>
        {mainNav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <ButtonLink href="/request/">Plan my clean</ButtonLink>
      </nav>
    </header>
  );
}
