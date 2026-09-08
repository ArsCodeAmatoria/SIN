"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { ProvenName } from "./ProvenMark";
import { ThemeSwitch } from "./ThemeSwitch";
import { NAV_LIFT, NAV_PRACTICE, NAV_READ, SITE, SOCIALS, type NavItem } from "@/lib/site";

function OverlayLinks({
  items,
  pathname,
  onPick,
}: {
  items: NavItem[];
  pathname: string;
  onPick: () => void;
}) {
  return items.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      title={item.title}
      aria-label={item.title}
      onClick={() => {
        if (pathname === item.href) onPick();
      }}
    >
      <span className="overlay-num">{item.num}</span>
      {item.href === "/safety" ? (
        <ProvenName className="overlay-label" />
      ) : (
        <span className="overlay-label">{item.label}</span>
      )}
    </Link>
  ));
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="header">
        <Link href="/" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </Link>
        <div className="header-actions">
          <ThemeSwitch />
          <button
            className="btn btn-ghost btn-menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>
      <div
        id="site-menu"
        className={`overlay${open ? " open" : ""}`}
        hidden={!open}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="overlay-bands">
          <nav className="overlay-list overlay-desk" aria-label="This lift">
            <p className="mono overlay-kicker">THIS LIFT</p>
            <OverlayLinks
              items={NAV_LIFT}
              pathname={pathname}
              onPick={() => setOpen(false)}
            />
          </nav>
          <nav className="overlay-list overlay-read" aria-label="Learn">
            <p className="mono overlay-kicker">LEARN</p>
            <OverlayLinks
              items={NAV_READ}
              pathname={pathname}
              onPick={() => setOpen(false)}
            />
          </nav>
          <nav className="overlay-list" aria-label="Practice">
            <p className="mono overlay-kicker">PRACTICE</p>
            <OverlayLinks
              items={NAV_PRACTICE}
              pathname={pathname}
              onPick={() => setOpen(false)}
            />
          </nav>
        </div>
        <div className="overlay-foot mono">
          <span>{SITE.location}</span>
          <nav className="overlay-foot-links" aria-label="Contact">
            <a href={SITE.emailHref}>{SITE.email}</a>
            {SOCIALS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                title={item.title}
                rel="me noopener noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
