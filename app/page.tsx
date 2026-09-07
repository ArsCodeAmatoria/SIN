import Link from "next/link";
import { DocBadge } from "@/components/DocBadge";
import { JibTrolley } from "@/components/JibTrolley";
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

const HERO_DOORS = [
  { href: "/sling", label: "SLING", hint: "θ / tension / WLL" },
  { href: "/safety/form/flha", label: "FLHA", hint: "This shift" },
  { href: "/safety/binder", label: "BINDERS", hint: "Tower / self-erect" },
  { href: "/safety", label: "PROVEN", hint: "The program" },
  {
    href: "/redtc/test",
    label: "Tower test",
    hint: "REDTC · 70% to pass",
    title: "Tower Crane Red Seal practice test",
  },
  {
    href: "/redtc/load-charts",
    label: "Charts",
    hint: "Load chart practice",
    title: "Tower and self-erect load chart practice",
  },
] as const;

const TOWER_LANDINGS = [
  { href: "/tower-crane-level-b-exam-bc", label: "Level B" },
  { href: "/tower-crane-level-1-practice-test", label: "Level 1" },
  { href: "/tower-crane-level-2-practice-test", label: "Level 2" },
  { href: "/tower-crane-load-chart-practice", label: "Load charts" },
  { href: "/safety/binder/self-erect", label: "Self-erect" },
  { href: "/redtc/rigging-charts", label: "Rigging" },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="section section-lead home-hero" id="sin">
        <div className="wrap">
          <p className="mono kicker">Tower Crane · British Columbia</p>
          <h1 className="display home-title">
            <span className="home-title-docs">Docs</span>
            <span className="home-title-rest">for the Tower Crane Crew</span>
          </h1>
          <p className="lede mt">
            Rigging, procedures, forms and binders written to be used on the
            lift. Red Seal practice for the sitting. For operators, riggers and
            supervisors in British Columbia.
          </p>
          <nav className="home-hero-lift" aria-label="This lift">
            {HERO_DOORS.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                title={"title" in item ? item.title : undefined}
              >
                <strong className="display">{item.label}</strong>
                <em>{item.hint}</em>
              </Link>
            ))}
          </nav>
          <JibTrolley />
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

      <section className="section wrap" id="practice">
        <h2 className="display home-section-title">The sitting</h2>
        <div className="home-doors mt-2">
          <article>
            <h3 className="display">Tower Crane</h3>
            <p>
              Fulford, SkilledTradesBC, Interprovincial. Flat-top, luffing and
              self-erecting charts. 70% to pass.
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
            <h3 className="display">Rigging</h3>
            <p>
              Sling angle from height and length. Tension from sin(). Compare T
              to the tag. BCACS sling charts in the practice room.
            </p>
            <div className="inline-cta">
              <Link className="btn btn-solid" href="/sling">
                Sling desk
              </Link>
              <Link className="btn btn-ghost" href="/redtc/rigging-charts">
                Sling charts
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section wrap" id="safety">
        <h2 className="display home-section-title">
          <ProvenName />
        </h2>
        <p className="lede mt">
          The open procedures, forms and binders. Readable on a phone before
          the hook is loaded. The work system is not this site.
        </p>
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/safety">
            Open Proven
          </Link>
        </div>
      </section>
    </>
  );
}
