import type { Metadata } from "next";
import Link from "next/link";
import { ProvenName } from "@/components/ProvenMark";
import { SafetyFind } from "@/components/SafetyFind";
import { StandardsList } from "@/components/StandardsList";
import { safetyCatalog } from "@/lib/ohs/catalog";
import { FIND_NOW, safetyByGroup } from "@/lib/safety";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Crane Safety Program & Procedures BC | PROVEN",
  description:
    "Free crane and rigging safety program for British Columbia with policies, SWPs, JHAs, lift plans, inspections, emergency procedures, forms and crane binders.",
  path: "/safety",
});

export default function SafetyIndexPage() {
  const groups = safetyByGroup();
  const catalog = safetyCatalog();

  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">PUBLIC DOCUMENT</p>
        <h1 className="display">
          <ProvenName />
          <br />
          IS OPEN.
        </h1>
        <p className="lede mt-2">
          Proven is the platform behind the lift. People, process and
          documentation — organized, verified and accountable. Operators,
          riggers, supervisors, contractors and clients can read how the work
          is expected to be performed before the gate. No request form. No
          expiring link. No PDF as the primary experience.
        </p>
      </header>

      <p className="mono kicker">NEED IT NOW</p>
      <nav className="safety-now" aria-label="Documents used on the job">
        {FIND_NOW.map((item) => (
          <Link href={item.href} key={item.href}>
            <strong className="display">{item.label}</strong>
            <em>{item.hint}</em>
          </Link>
        ))}
      </nav>

      <SafetyFind catalog={catalog} />

      {groups.map((group) => (
        <section key={group.id} className="safety-group">
          <p className="mono kicker">{group.label}</p>
          <nav className="safety-index" aria-label={group.label}>
            {group.sections.map((s) => (
              <Link href={`/safety/${s.slug}`} key={s.slug}>
                <span className="mono steel">{s.num}</span>
                <span>
                  <strong>{s.title}</strong>
                  <em>{s.kicker}</em>
                </span>
              </Link>
            ))}
          </nav>
        </section>
      ))}

      <p className="lede mt-2">
        Read it on a phone at the gate. Print a section if you need it on paper.
        If the procedure cannot be followed, it is not the procedure.
      </p>
      <div id="standards" className="mt-2">
        <p className="mono steel">WHAT THE WORK IS DONE TO</p>
        <p className="lede mt">
          Where these conflict, the stricter applicable requirement wins. Law
          always wins. The marks name the bodies. They are not an endorsement
          of {SITE.name}.
        </p>
        <StandardsList />
      </div>
      <p className="lede mt">
        Proven maps to the COR® elements — the Certificate of Recognition —
        so that framework is readable.{" "}
        <Link href="/#cor">WHAT COR IS →</Link>
      </p>
      <p className="mono steel doc-colophon">
        <ProvenName />
        <span>
          {SITE.legalName}. Current version on this site.
        </span>
      </p>
    </article>
  );
}
