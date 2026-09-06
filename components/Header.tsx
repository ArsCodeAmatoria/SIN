"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { ProvenName } from "./ProvenMark";
import { ThemeSwitch } from "./ThemeSwitch";
import { NAV_LIFT, NAV_PRACTICE, NAV_READ, SITE, type NavItem } from "@/lib/site";

function OverlayLinks({
  items,
  onPick,
}: {
  items: NavItem[];
  onPick: () => void;
}) {
  return items.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      title={item.title}
      aria-label={item.title}
      onClick={onPick}
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
          <nav className="overlay-list" aria-label="Practice">
            <p className="mono overlay-kicker">PRACTICE</p>
            <OverlayLinks items={NAV_PRACTICE} onPick={() => setOpen(false)} />
          </nav>
          <nav className="overlay-list overlay-desk" aria-label="This lift">
            <p className="mono overlay-kicker">THIS LIFT</p>
            <OverlayLinks items={NAV_LIFT} onPick={() => setOpen(false)} />
          </nav>
          <nav className="overlay-list overlay-read" aria-label="Read">
            <p className="mono overlay-kicker">READ</p>
            <OverlayLinks items={NAV_READ} onPick={() => setOpen(false)} />
          </nav>
        </div>
        <div className="overlay-foot mono">
          <span>{SITE.location}</span>
          <a href={SITE.emailHref}>{SITE.email}</a>
        </div>
      </div>
    </>
  );
}
