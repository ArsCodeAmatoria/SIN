import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { BELIEFS, PRINCIPLES, SITE } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Philosophy",
  description:
    "No bullshit. Just the standard. How this crane safety information is written.",
  path: "/philosophy",
});

export default function PhilosophyPage() {
  return (
    <div>
      <header className="page-hero wrap">
        <p className="mono kicker">THE STANDARD</p>
        <h1 className="display giant">
          NO BULLSHIT.
          <br />
          JUST THE
          <br />
          STANDARD.
        </h1>
      </header>
      <div className="split wrap top" style={{ paddingBottom: "4rem" }}>
        <p className="lede-lg">
          This site is crane safety information. Proven is the system — policies,
          procedures, assessments, forms and binders for lifting work.
        </p>
        <p className="lede">
          Competent people matter. Safety information should be accessible.
          Documentation should be useful. A program has to keep its promises.
          If Proven names a stop, the stop is real.
        </p>
      </div>
      <section className="section wrap">
        <p className="mono kicker">SAY IT. DO IT.</p>
        <ul>
          {PRINCIPLES.map((p) => (
            <li
              key={p}
              className="display"
              style={{
                fontSize: "clamp(2.4rem, 8vw, 6rem)",
                padding: "0.4rem 0",
                borderTop: "1px solid var(--line)",
              }}
            >
              {p}
            </li>
          ))}
        </ul>
        <div className="rules mt-2">
          {BELIEFS.map((b) => (
            <article className="rule" key={b.title}>
              <h3 className="display">{b.title}</h3>
              <p>{b.body}</p>
            </article>
          ))}
        </div>
        <p className="lede mt-2">
          The standard should be in writing. Workers should be treated with
          respect. That is the whole program.
        </p>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/safety">
            READ {SITE.system}
          </Link>
          <Link className="btn btn-ghost" href="/safety/builder">
            OPEN THE FORM BUILDER
          </Link>
        </div>
      </section>
    </div>
  );
}
