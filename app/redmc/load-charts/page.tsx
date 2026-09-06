import Link from "next/link";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { CHART_MAKERS, CHARTS } from "@/lib/redmc/bank";
export default function RedmcChartsPage() {
  const totalQs = CHARTS.reduce((n, c) => n + c.questions.length, 0);

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">REDMC — CHARTS</p>
        <h1 className="display giant">
          READ THE
          <br />
          CHART.
        </h1>
        <p className="lede mt-2">
          {CHARTS.length} manufacturer charts are available as PDFs.{" "}
          {totalQs
            ? `${totalQs} load-chart questions written so far.`
            : "Load-chart question sets are being added as verified questions are completed."}{" "}
          Open the chart. Do not interpolate. Capacities are not invented here.
        </p>
        <RedtcNav />
      </header>
      <div className="inline-cta">
        <Link className="btn btn-ghost" href="/redmc/rigging-charts">
          Rigging charts
        </Link>
      </div>
      <div className="place">
        <article>
          <span className="mono steel">01</span>
          <h3 className="display">OPEN THE PDF</h3>
          <p>New tab. Two screens if you have them. On a phone, pinch-zoom the PDF.</p>
        </article>
        <article>
          <span className="mono steel">02</span>
          <h3 className="display">ANSWER</h3>
          <p>Radius, boom length, outriggers, counterweight, deductions, net load.</p>
        </article>
        <article>
          <span className="mono steel">03</span>
          <h3 className="display">NEVER INTERPOLATE</h3>
          <p>If the number is between rows, use the worse one.</p>
        </article>
      </div>
      {CHARTS.length > 0 ? (
        <section className="section">
          <p className="mono kicker">In the bank</p>
          <div className="mt" aria-label="Mobile crane load charts">
            {CHARTS.map((chart) => (
              <div className="redtc-chart" key={chart.id}>
                <Link href={`/redmc/load-charts/${chart.id}`}>
                  <span className="mono steel">{chart.manufacturer}</span>
                  <span>
                    <strong>{chart.name}</strong>
                    <em>
                      {chart.questions.length} question
                      {chart.questions.length === 1 ? "" : "s"}
                    </em>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <section className="section">
        <p className="mono kicker">Manufacturers</p>
        <p className="lede">
          Demag is not in the bank yet. Questions for the charts above appear
          when they are written against the PDF.
        </p>
        <div className="mt" aria-label="Coming soon load charts">
          {CHART_MAKERS.map((maker) => (
            <div className="redtc-chart" key={maker.id}>
              <div className="redtc-chart-soon">
                <span className="mono steel">Coming soon</span>
                <span>
                  <strong>{maker.name}</strong>
                  <em>{maker.note}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
