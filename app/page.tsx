import Link from "next/link";
import { CorSection } from "@/components/CorSection";
import { ProvenName } from "@/components/ProvenMark";
import { WireStoryLink } from "@/components/WireStoryLink";
import { allQuestions as mobileQuestions } from "@/lib/redmc/bank";
import { allQuestions as towerQuestions, CHARTS } from "@/lib/redtc/bank";
import { PROGRAM, SITE } from "@/lib/site";
import { WIRE, getLatest, summarize } from "@/lib/whoopwire";

export default function HomePage() {
  const tower = towerQuestions().length;
  const mobile = mobileQuestions().length;
  const charts = CHARTS.length;

  return (
    <>
      <section className="section section-lead" id="sin">
        <div className="wrap">
          <p className="mono kicker">01 — THIS SITE</p>
          <h1 className="display giant">
            CRANE
            <br />
            SAFETY
            <br />
            INFORMATION.
          </h1>
          <p className="display pitch-line mt-2">
            PRACTICE TESTS.
            <br />
            A PUBLIC PROGRAM.
            <br />
            THE WIRE.
          </p>
          <p className="lede-lg mt">
            Public information for crane and rigging work in British Columbia.
            Exam practice, a written safety program, and writing about the
            work.
          </p>
          <div className="place mt-2">
            <article>
              <span className="mono steel">Practice</span>
              <h3 className="display">RED SEAL TESTS</h3>
              <p>
                Tower Crane and Mobile Crane exam prep. Tagged questions, load
                charts, 70% to pass.
              </p>
            </article>
            <article>
              <span className="mono steel">Program</span>
              <h3 className="display">
                <ProvenName />
              </h3>
              <p>
                Policies, procedures, JHAs, forms and binders. Readable on a
                phone before the hook is loaded.
              </p>
            </article>
            <article>
              <span className="mono steel">Writing</span>
              <h3 className="display">{WIRE.name}</h3>
              <p>
                Safety, rigging, cranes, people. The blog. Not a newsletter
                mill.
              </p>
            </article>
            <article>
              <span className="mono steel">COR®</span>
              <h3 className="display">INFORMATION</h3>
              <p>
                What the Certificate of Recognition is, who runs it in B.C.,
                and how an OHS program maps to it.
              </p>
            </article>
          </div>
          <div className="inline-cta">
            <Link className="btn btn-solid" href="/redtc">
              PRACTICE TESTS
            </Link>
            <Link className="btn btn-ghost" href="/safety">
              READ {SITE.system}
            </Link>
            <Link className="btn btn-ghost" href="/whoopwire">
              {WIRE.name}
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap redtc" id="redtc">
        <p className="mono kicker">02 — PRACTICE TESTS</p>
        <h2 className="display giant">
          RED SEAL.
          <br />
          PRACTICE.
        </h2>
        <p className="lede mt-2">
          Tower Crane and Mobile Crane. Fulford, SkilledTradesBC, Red Seal IP,
          and manufacturer load charts. Same interface. Separate banks. 70% to
          pass.
        </p>
        <div className="place mt-2">
          <article>
            <span className="mono steel">Tower</span>
            <h3 className="display">{tower.toLocaleString("en-CA")}</h3>
            <p>
              Questions in REDTC. {charts} manufacturer charts. Existing URLs
              stay put.
            </p>
          </article>
          <article>
            <span className="mono steel">Mobile</span>
            <h3 className="display">{mobile.toLocaleString("en-CA")}</h3>
            <p>
              {mobile.toLocaleString("en-CA")} Mobile Crane questions in REDMC.
              Chart sets appear when real PDFs are supplied.
            </p>
          </article>
          <article>
            <span className="mono steel">Pass</span>
            <h3 className="display">70%</h3>
            <p>Same bar as the sitting. Explanations after you answer.</p>
          </article>
          <article>
            <span className="mono steel">Master</span>
            <h3 className="display">IP</h3>
            <p>
              Closed-book Red Seal paper. Tower 100. Mobile 110, 2021 RSOS.
            </p>
          </article>
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redtc">
            TOWER CRANE
          </Link>
          <Link className="btn btn-ghost" href="/redmc">
            MOBILE CRANE
          </Link>
        </div>
      </section>

      <section className="section" id="safety">
        <div className="wrap">
          <p className="mono kicker">03 — THE PROGRAM</p>
          <h2 className="display giant">
            THE SAFETY
            <br />
            SYSTEM IS
            <br />
            CALLED
            <br />
            <ProvenName />
          </h2>
          <p className="lede-lg mt-2">
            A public occupational health and safety program for lifting work.
          </p>
          <p className="lede mt">
            Policies, safe work procedures, hazard assessments, forms and crane
            binders. Written to CSA Z150 / Z248, WorkSafeBC, BC Crane Safety,
            Technical Safety BC, ASME B30, manufacturer requirements and site
            policies. No portal. No request form. No expiry date.
          </p>
          <div className="mt-2">
            {PROGRAM.map((s) => (
              <article className="service" key={s.num}>
                <span className="mono steel">{s.num}</span>
                <h3 className="display">{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
          <div className="inline-cta">
            <Link className="btn btn-solid" href="/safety">
              OPEN {SITE.system}
            </Link>
            <Link className="btn btn-ghost" href="/safety/builder">
              FORM BUILDER
            </Link>
          </div>
        </div>
      </section>

      <CorSection />

      <section className="section wrap" id="whoopwire">
        <p className="mono kicker">05 — THE WIRE</p>
        <h2 className="display giant">{WIRE.name}</h2>
        <p className="mono mt">{WIRE.descriptor}</p>
        <p className="lede mt-2">{WIRE.dek}</p>
        <div className="wire-stack mt-2">
          {getLatest(3).map((story) => (
            <WireStoryLink key={story.slug} story={summarize(story)} size="home" />
          ))}
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/whoopwire">
            READ {WIRE.name} →
          </Link>
        </div>
      </section>
    </>
  );
}
