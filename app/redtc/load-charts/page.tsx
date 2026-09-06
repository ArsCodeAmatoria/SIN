import Link from "next/link";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { CHARTS, chartPdfHref } from "@/lib/redtc/bank";
import type { LoadChart } from "@/lib/redtc/bank";
import { REDTC_SKILLS } from "@/lib/redtc/copy";

const SECTIONS: { type: string[]; title: string; body: string }[] = [
  {
    type: ["flat-top", "hammerhead"],
    title: "Flat-top + hammerhead",
    body: "Horizontal jib. Trolley travel. The common site crane.",
  },
  {
    type: ["luffing"],
    title: "Luffing jib",
    body: "Variable angle. Tight urban sites. Keep the swing in.",
  },
  {
    type: ["self-erecting"],
    title: "Self-erecting",
    body: "Folds for the road. Erects itself. Still a load chart.",
  },
];

function sortCharts(list: LoadChart[]) {
  return [...list].sort((a, b) => {
    if (a.manufacturer !== b.manufacturer) return a.manufacturer.localeCompare(b.manufacturer);
    return a.name.localeCompare(b.name);
  });
}

export default function RedtcChartsPage() {
  const totalQs = CHARTS.reduce((n, c) => n + c.questions.length, 0);

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">REDTC — CHARTS</p>
        <h1 className="display giant">
          READ THE
          <br />
          CHART.
        </h1>
        <p className="lede mt-2">
          Real manufacturer PDFs. {CHARTS.length} cranes. {totalQs} questions.
          Open the chart. Do not interpolate.
        </p>
        <RedtcNav />
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/redtc/rigging-charts">
            Sling charts
          </Link>
        </div>
      </header>
      <div className="place">
        <article>
          <span className="mono steel">01</span>
          <h3 className="display">OPEN THE PDF</h3>
          <p>Stays on the left while you answer. Enlarge or pinch-zoom on a phone.</p>
        </article>
        <article>
          <span className="mono steel">02</span>
          <h3 className="display">ANSWER</h3>
          <p>Capacity, deductions, radius. Same skill as Fulford LCR.</p>
        </article>
        <article>
          <span className="mono steel">03</span>
          <h3 className="display">NEVER INTERPOLATE</h3>
          <p>If the number is between rows, use the worse one.</p>
        </article>
      </div>
      {SECTIONS.map((section) => {
        const charts = sortCharts(CHARTS.filter((c) => section.type.includes(c.type || "")));
        if (!charts.length) return null;
        return (
          <section className="section" key={section.title}>
            <p className="mono kicker">{section.title}</p>
            <p className="lede">{section.body}</p>
            <p className="steel mt">
              Open a crane and the PDF stays beside the question — split screen
              on desktop, pinch-zoom or enlarge on a phone. Capacity lookups,
              deductions, and lift planning. Do not interpolate.
            </p>
            <div className="mt" aria-label={section.title}>
              {charts.map((chart) => (
                <div className="redtc-chart" key={chart.id}>
                  <Link href={`/redtc/load-charts/${chart.id}`}>
                    <span className="mono steel">{chart.manufacturer}</span>
                    <span>
                      <strong>{chart.name}</strong>
                      <em>
                        {chart.specifications?.maxCapacity
                          ? `${chart.specifications.maxCapacity} · `
                          : ""}
                        {chart.specifications?.maxJibLength
                          ? `${chart.specifications.maxJibLength} · `
                          : ""}
                        {chart.questions.length} questions
                      </em>
                    </span>
                  </Link>
                  <a
                    className="btn btn-ghost"
                    href={chartPdfHref(chart.pdfFile)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF
                  </a>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      <section className="section">
        <p className="mono kicker">Skills you’ll practice</p>
        <ul className="std-list">
          {REDTC_SKILLS.map((item) => (
            <li key={item}>
              <h3 className="display">{item}</h3>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
