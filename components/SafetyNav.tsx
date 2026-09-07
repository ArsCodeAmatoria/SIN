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

function isActive(current: string | undefined, slug?: string) {
  return slug ? current === slug : !current;
}

const TASK_LINKS = [
  { href: "/safety", label: "INDEX", slug: undefined as string | undefined },
  { href: "/safety#now", label: "DO" },
  { href: "/safety#find", label: "FIND" },
  { href: "/safety/builder", label: "FORMS", slug: "safety-forms" },
  { href: "/safety/binder", label: "BINDERS", slug: "crane-binders" },
] as const;

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
        className={isActive(current) ? "active" : undefined}
        aria-current={isActive(current) ? "page" : undefined}
        onClick={onPick}
      >
        INDEX
      </Link>
      <Link href="/safety#now" onClick={onPick}>
        DO THE WORK
      </Link>
      <Link href="/safety#find" onClick={onPick}>
        FIND
      </Link>
      {groups.map((group) => (
        <div className="doc-nav-group" key={group.id}>
          <p className="mono steel">{group.label}</p>
          {group.sections.map((s) => (
            <Link
              key={s.slug}
              href={`/safety/${s.slug}`}
              className={isActive(current, s.slug) ? "active" : undefined}
              data-nav={s.slug === "crane-binders" ? "binder" : undefined}
              aria-current={isActive(current, s.slug) ? "page" : undefined}
              onClick={onPick}
            >
              {s.title}
              <span>{s.num}</span>
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
  const [offline, setOffline] = useState(false);
  const here = SAFETY.find((s) => s.slug === current);
  const label = here ? here.title : SITE.system;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1040px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  useEffect(() => {
    setTocOpen(false);
    const el = stripRef.current?.querySelector<HTMLElement>("a.active");
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [current]);

  return (
    <aside className="doc-nav">
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
          <span className="mono steel">{offline ? "OFFLINE" : "NOW"}</span>
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
      <nav ref={stripRef} className="doc-nav-scroll" aria-label="Proven tasks">
        {TASK_LINKS.map((item) => {
          const slug = "slug" in item ? item.slug : undefined;
          const active =
            item.href === "/safety"
              ? isActive(current)
              : slug
                ? isActive(current, slug)
                : false;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : undefined}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
