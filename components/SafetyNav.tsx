"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProvenName } from "@/components/ProvenMark";
import { SAFETY, safetyByGroup } from "@/lib/safety";
import { SITE } from "@/lib/site";

function sectionFromPath(path: string): string | undefined {
  if (path === "/safety" || path === "/safety/") return undefined;
  const part = path.slice("/safety/".length).split("/")[0];
  const nested: Record<string, string> = {
    swp: "swp-library",
    jha: "jha-library",
    sjp: "sjp-library",
    policy: "ohs-policies",
    form: "safety-forms",
    builder: "safety-forms",
    sds: "whmis-sds",
    report: "incident-reporting",
    crane: "inspections",
    binder: "crane-binders",
  };
  return nested[part] ?? part;
}

function NavLinks({
  current,
  onPick,
}: {
  current: string | undefined;
  onPick?: () => void;
}) {
  const groups = safetyByGroup();
  return (
    <>
      <Link
        href="/safety"
        className={!current ? "active" : undefined}
        aria-current={!current ? "page" : undefined}
        onClick={onPick}
      >
        <span>00</span>
        INDEX
      </Link>
      {groups.map((group) => (
        <div className="doc-nav-group" key={group.id}>
          <p className="mono steel">{group.label}</p>
          {group.sections.map((s) => (
            <Link
              key={s.slug}
              href={`/safety/${s.slug}`}
              className={current === s.slug ? "active" : undefined}
              aria-current={current === s.slug ? "page" : undefined}
              onClick={onPick}
            >
              <span>{s.num}</span>
              {s.title}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

export function SafetyNav() {
  const pathname = usePathname();
  const current = sectionFromPath(pathname);
  const stripRef = useRef<HTMLElement>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const here = SAFETY.find((s) => s.slug === current);
  const label = here ? `${here.num}  ${here.title}` : SITE.system;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1040px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setTocOpen(false);
    const el = stripRef.current?.querySelector<HTMLElement>("a.active");
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [current]);

  return (
    <aside className="doc-nav">
      <nav ref={stripRef} className="doc-nav-scroll" aria-label="Safety sections">
        <Link
          href="/safety"
          className={!current ? "active" : undefined}
          aria-current={!current ? "page" : undefined}
        >
          <span aria-hidden="true">00</span>
          <span className="visually-hidden">00 Index</span>
        </Link>
        {SAFETY.map((s) => (
          <Link
            key={s.slug}
            href={`/safety/${s.slug}`}
            className={current === s.slug ? "active" : undefined}
            aria-current={current === s.slug ? "page" : undefined}
          >
            <span aria-hidden="true">{s.num}</span>
            <span className="visually-hidden">{`${s.num} ${s.title}`}</span>
          </Link>
        ))}
      </nav>
      <details
        className="doc-nav-shell"
        open={desktop || tocOpen}
        onToggle={(e) => {
          const next = (e.target as HTMLDetailsElement).open;
          if (desktop) return;
          setTocOpen(next);
        }}
      >
        <summary>
          <span className="mono steel">NOW</span>
          <strong className="display">{label}</strong>
        </summary>
        <div className="doc-nav-inner">
          <p className="mono steel proven-nav-head">
            <ProvenName />
          </p>
          <nav aria-label={SITE.system}>
            <NavLinks current={current} onPick={() => setTocOpen(false)} />
          </nav>
        </div>
      </details>
    </aside>
  );
}
