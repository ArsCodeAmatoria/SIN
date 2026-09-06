import Link from "next/link";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { RIGGING_CHARTS } from "@/lib/redtc/bank";

export default function RedtcRiggingChartsPage() {
  const totalQs = RIGGING_CHARTS.reduce((n, c) => n + c.questions.length, 0);

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">REDTC — RIGGING</p>
        <h1 className="display giant">
          READ THE
          <br />
          SLING CHART.
        </h1>
        <p className="lede mt-2">
          BCACS Crane Core figures, March 2011. {RIGGING_CHARTS.length} sling
          charts. {totalQs} questions. Training and assessment only — not a
          manufacturer rating for the lift. Same two-question slot as Fulford
          LCR practical.
        </p>
        <RedtcNav />
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/sling">
            Sling-angle desk
          </Link>
        </div>
      </header>
      <div className="place">
        <article>
          <span className="mono steel">01</span>
          <h3 className="display">OPEN THE PDF</h3>
          <p>Chain, nylon web, or wire rope. Hitch and angle first, then size.</p>
        </article>
        <article>
          <span className="mono steel">02</span>
          <h3 className="display">APPLY THE NOTE</h3>
          <p>2-leg choker × 0.75. Double basket × 2. Do not interpolate.</p>
        </article>
        <article>
          <span className="mono steel">03</span>
          <h3 className="display">NOT THE JOB</h3>
          <p>Exam figures. The sling tag and manufacturer chart win in the field.</p>
        </article>
      </div>
      <section className="section">
        <p className="mono kicker">In the bank</p>
        <div className="mt" aria-label="Rigging charts">
          {RIGGING_CHARTS.map((chart) => (
            <div className="redtc-chart" key={chart.id}>
              <Link href={`/redtc/rigging-charts/${chart.id}`}>
                <span className="mono steel">{chart.model}</span>
                <span>
                  <strong>{chart.name}</strong>
                  <em>
                    {`${chart.questions.length} question${chart.questions.length === 1 ? "" : "s"}`}
                  </em>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
