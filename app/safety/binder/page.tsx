import type { Metadata } from "next";
import Link from "next/link";
import { DocBadge } from "@/components/DocBadge";
import { BINDERS, BINDER_OFFICIAL } from "@/lib/ohs/binders";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tower & Self-Erect Crane Binders BC | PROVEN",
  description:
    "Build a tower or self-erect site binder in British Columbia. Pick the machine, mark what you have, download the Proven PDF.",
  path: "/safety/binder",
});

export default function BinderIndexPage() {
  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">PROVEN</p>
        <DocBadge kind="BND" number="PROVEN-BND" />
        <h1 className="display binder-title">CRANE BINDERS</h1>
        <p className="lede mt">
          One machine. One site file. Pick tower or self-erect, name the
          project, mark what is in the binder, download the Proven copy.
          Official BC Crane Safety paper stays official.
        </p>
      </header>

      <ol className="binder-how" aria-label="How to build a binder">
        <li>
          <span className="mono">01</span>
          <strong>Pick the machine</strong>
          <em>Tower or self-erect. Do not mix the lists.</em>
        </li>
        <li>
          <span className="mono">02</span>
          <strong>Name this site</strong>
          <em>Project, address, contractor, the serial on the pad.</em>
        </li>
        <li>
          <span className="mono">03</span>
          <strong>Mark what you have</strong>
          <em>In binder, missing, or N/A. Open the Proven form when you need it.</em>
        </li>
        <li>
          <span className="mono">04</span>
          <strong>Download the PDF</strong>
          <em>Your company name, logo and signature print on the working copy.</em>
        </li>
      </ol>

      <nav className="binder-pick" aria-label="Binder types">
        {BINDERS.filter((binder) => binder.kind !== "mobile").map((binder) => (
          <Link key={binder.kind} href={`/safety/binder/${binder.kind}`}>
            <DocBadge number={binder.number} />
            <strong className="display">{binder.title}</strong>
            <em>{binder.summary}</em>
            <span className="mono">START THIS BINDER →</span>
          </Link>
        ))}
      </nav>

      <p className="doc-cta">
        <Link href="/safety/crane-binders">22 — WHY THE BINDER EXISTS →</Link>
      </p>
      <p className="mono steel mt">
        A mobile that assists the erect still needs its own file.
      </p>
      <p className="doc-cta">
        <Link href="/safety/binder/mobile">MOBILE / CRAWLER BINDER →</Link>
      </p>
      <p className="doc-cta">
        <a href={BINDER_OFFICIAL.bccsBinder} target="_blank" rel="noreferrer">
          BC CRANE SAFETY SITE BINDERS →
        </a>
      </p>
      <p className="doc-cta">
        <a href={BINDER_OFFICIAL.mobileChecklist} target="_blank" rel="noreferrer">
          WORKSAFEBC MOBILE CRANE INSPECTION CHECKLIST →
        </a>
      </p>
    </article>
  );
}
