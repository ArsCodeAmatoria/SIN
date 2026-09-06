import Link from "next/link";
import { DocBadge } from "@/components/DocBadge";
import { ProvenName } from "@/components/ProvenMark";
import { WireStoryLink } from "@/components/WireStoryLink";
import { HOME_LIFT_GROUPS } from "@/lib/safety";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { WIRE, getLatest, summarize } from "@/lib/whoopwire";
import type { Metadata } from "next";

export const metadata: Metadata = pageMeta({
  title: SITE.title,
  description: SITE.description,
  path: "/",
});

const HERO_LIFT = [
  { href: "/safety/form/flha", label: "FLHA", hint: "This shift" },
  { href: "/safety/binder", label: "BINDERS", hint: "This machine" },
  { href: "/sling", label: "SLING", hint: "θ / tension / WLL" },
  { href: "/safety", label: "PROVEN", hint: "The program" },
] as const;

const TOWER_LANDINGS = [
  { href: "/tower-crane-level-b-exam-bc", label: "Level B" },
  { href: "/tower-crane-level-1-practice-test", label: "Level 1" },
  { href: "/tower-crane-level-2-practice-test", label: "Level 2" },
  { href: "/tower-crane-load-chart-practice", label: "Load charts" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="section section-lead home-hero" id="sin">
        <div className="wrap">
          <p className="mono kicker">CRANE SAFETY · BRITISH COLUMBIA</p>
          <h1 className="display home-title">
            Practice the exam.
            <br />
            Use it on the lift.
          </h1>
          <p className="lede mt">
            Tower and mobile Red Seal practice. Procedures, forms, binders and
            sling math. Written for operators, riggers and supervisors in
            British Columbia.
          </p>
          <div className="home-jobs">
            <div className="home-practice">
              <Link
                href="/redtc/test"
                title="Tower Crane Red Seal practice test"
              >
                <strong className="display">Tower test</strong>
                <em>REDTC · 70% to pass</em>
              </Link>
              <Link
                href="/redmc/test"
                title="Mobile Crane Red Seal practice test"
              >
                <strong className="display">Mobile test</strong>
                <em>REDMC · 70% to pass</em>
              </Link>
            </div>
            <nav className="home-hero-lift" aria-label="This lift">
              {HERO_LIFT.map((item) => (
                <Link href={item.href} key={item.href}>
                  <strong className="display">{item.label}</strong>
                  <em>{item.hint}</em>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="section wrap" id="practice">
        <h2 className="display home-section-title">Red Seal practice</h2>
        <div className="home-doors mt-2">
          <article>
            <h3 className="display">Tower Crane</h3>
            <p>
              Fulford, SkilledTradesBC, Interprovincial. Manufacturer load
              charts. 70% to pass.
            </p>
            <div className="inline-cta">
              <Link className="btn btn-solid" href="/redtc/test">
                Start tower test
              </Link>
              <Link className="btn btn-ghost" href="/redtc">
                REDTC
              </Link>
            </div>
            <p className="mono steel home-landings">
              {TOWER_LANDINGS.map((item, i) => (
                <span key={item.href}>
                  {i ? " · " : ""}
                  <Link href={item.href}>{item.label}</Link>
                </span>
              ))}
            </p>
          </article>
          <article>
            <h3 className="display">Mobile Crane</h3>
            <p>
              Theory, manufacturer charts, sling charts. 70% to pass.
            </p>
            <div className="inline-cta">
              <Link className="btn btn-solid" href="/redmc/test">
                Start mobile test
              </Link>
              <Link className="btn btn-ghost" href="/redmc">
                REDMC
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section wrap" id="lift">
        <h2 className="display home-section-title">This lift</h2>
        {HOME_LIFT_GROUPS.map((group) => (
          <div className="safety-now-group" key={group.id}>
            <p className="mono steel">{group.label}</p>
            <nav className="safety-now" aria-label={group.label}>
              {group.items.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.kind ? <DocBadge kind={item.kind} /> : null}
                  <strong className="display">{item.label}</strong>
                  <em>{item.hint}</em>
                </Link>
              ))}
            </nav>
          </div>
        ))}
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/safety/builder">
            FORM BUILDER
          </Link>
        </div>
      </section>

      <section className="section wrap" id="safety">
        <h2 className="display home-section-title">
          <ProvenName />
        </h2>
        <p className="lede mt">
          The occupational health and safety program for this work. Policies,
          procedures, JHAs and forms. Readable on a phone before the hook is
          loaded.
        </p>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/safety">
            Open Proven
          </Link>
        </div>
      </section>

      <section className="section wrap" id="wire">
        <h2 className="display home-section-title">{WIRE.name}</h2>
        <p className="lede mt">{WIRE.dek}</p>
        <div className="wire-stack mt-2">
          {getLatest(3).map((story) => (
            <WireStoryLink key={story.slug} story={summarize(story)} size="home" />
          ))}
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href={WIRE.path}>
            Read {WIRE.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
