import type { Metadata } from "next";
import Link from "next/link";
import { BINDERS, BINDER_OFFICIAL } from "@/lib/ohs/binders";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Crane Binder Wizard",
  description:
    "Build a Tower or Self-Erect site binder. Numbered to the BC Crane Safety checklists used with the WorkSafeBC NOP-TC.",
  path: "/safety/binder",
});

export default function BinderIndexPage() {
  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">CRANE BINDER WIZARD</p>
        <h1 className="display">WHICH MACHINE.</h1>
        <p className="lede mt">
          Tower or self-erect. The checklist is mandatory with the Notice of
          Project — Tower Crane. Work through the items. Download the GOSPEL
          copy. Official templates stay on BC Crane Safety and WorkSafeBC.
        </p>
        <p className="doc-cta">
          <Link href="/safety/crane-binders">22 — CRANE BINDERS →</Link>
        </p>
        <p className="doc-cta">
          <a href={BINDER_OFFICIAL.bccsBinder} target="_blank" rel="noreferrer">
            BC CRANE SAFETY SITE BINDERS →
          </a>
        </p>
      </header>
      <nav className="ohs-lib-list" aria-label="Binder types">
        {BINDERS.map((binder) => (
          <Link key={binder.kind} href={`/safety/binder/${binder.kind}`}>
            <span className="mono steel">{binder.number}</span>
            <strong className="display">{binder.title}</strong>
            <em>{binder.summary}</em>
          </Link>
        ))}
      </nav>
    </article>
  );
}
