import type { Metadata } from "next";
import Link from "next/link";
import { CabLine } from "@/components/CabCopy";
import { DocBadge } from "@/components/DocBadge";
import { ProvenColophon, ProvenName } from "@/components/ProvenMark";
import { SafetyFind } from "@/components/SafetyFind";
import { StandardsList } from "@/components/StandardsList";
import { LIBRARY_KIND } from "@/lib/ohs/doc";
import { safetyCatalog } from "@/lib/ohs/catalog";
import { FIND_NOW_GROUPS, safetyByGroup } from "@/lib/safety";
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
        </h1>
        <p className="lede mt-2">
          Open the form for this shift. Build the binder for this machine. Read
          the procedure before the hook is loaded. No portal. No expiry.
        </p>
        <CabLine where="proven" />
      </header>

      <SafetyFind catalog={catalog} />

      <section id="now">
        <p className="mono kicker">DO THE WORK</p>
        <p className="lede">What are you trying to do. Not where it is filed.</p>
        {FIND_NOW_GROUPS.map((group) => (
          <div className="safety-now-group" key={group.id}>
            <p className="mono steel">{group.label}</p>
            <nav className="safety-now" aria-label={group.label}>
              {group.items.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={item.href.includes("/binder") ? "is-binder" : undefined}
                >
                  {item.kind ? <DocBadge kind={item.kind} /> : null}
                  <strong className="display">{item.label}</strong>
                  <em>{item.hint}</em>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </section>

      <section id="standard">
        <p className="mono kicker">READ THE STANDARD</p>
        <p className="lede">
          The program, in the order the work happens. Document numbers stay on
          the page. They are not how you find it.
        </p>
        {groups.map((group) => (
          <div key={group.id} className="safety-group">
            <p className="mono kicker">{group.label}</p>
            <nav className="safety-index" aria-label={group.label}>
              {group.sections.map((s) => (
                <Link
                  href={`/safety/${s.slug}`}
                  key={s.slug}
                  className={s.slug === "crane-binders" ? "is-binder" : undefined}
                >
                  <span>
                    <strong>{s.title}</strong>
                    <em>{s.kicker}</em>
                  </span>
                  <span className="safety-index-meta">
                    <span className="mono steel">{s.num}</span>
                    {s.library ? <DocBadge kind={LIBRARY_KIND[s.library]} /> : null}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </section>

      <p className="lede mt-2">
        Read it on a phone at the gate. Open once on a network and the pages
        stay on this device when the trailer Wi-Fi is dead. Print a section if
        you need it on paper. If the procedure cannot be followed, it is not the
        procedure.
      </p>
      <div id="standards" className="mt-2">
        <p className="mono steel">WHAT THE WORK IS DONE TO</p>
        <p className="lede mt">
          Where these conflict, the stricter applicable requirement wins. Law
          always wins. The marks name the bodies. They are not an endorsement
          of {SITE.system}.
        </p>
        <StandardsList />
      </div>
      <ProvenColophon />
    </article>
  );
}
