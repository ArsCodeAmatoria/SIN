import Link from "next/link";
import { MobileBankOverview } from "@/components/redmc/MobileBankOverview";
import { MobileProgress } from "@/components/redmc/MobileProgress";
import { ExamCluster } from "@/components/ExamCluster";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, CHARTS, RIGGING_CHARTS, mobileSourceQuestions } from "@/lib/redmc/bank";
import {
  REDMC_AUTHORITIES,
  REDMC_COVERS,
  REDMC_FEATURES,
  REDMC_PATH,
  REDMC_RESOURCES,
} from "@/lib/redmc/copy";
import { MOBILE_EXAM_TRACKS, MOBILE_RSOS_MWA } from "@/lib/redmc/exam-tracks";
import { formatReviewed, LAST_REVIEWED } from "@/lib/reviewed";

export default function RedmcPage() {
  const bank = allQuestions().length;
  const source = mobileSourceQuestions();
  const theoryCount = source.length;
  const countLabel = `${bank.toLocaleString("en-CA")} Mobile Crane Practice Questions`;
  const chartQs = CHARTS.reduce((n, c) => n + c.questions.length, 0);
  const riggingQs = RIGGING_CHARTS.reduce((n, c) => n + c.questions.length, 0);

  return (
    <>
      <header className="page-hero wrap">
        <p className="mono kicker">06 — BC RED SEAL · MOBILE CRANE CERTIFICATION</p>
        <h1 className="display giant">
          MOBILE CRANE
          <br />
          OPERATOR.
        </h1>
        <p className="display pitch-line mt-2">BC &amp; RED SEAL EXAM PRACTICE.</p>
        <p className="lede-lg mt-2">
          Prepare for BC Mobile Crane Operator certification and the Red Seal
          Mobile Crane Operator exam using realistic practice questions,
          calculations, regulations, rigging problems and manufacturer-style load
          chart exercises.
        </p>
        <RedtcNav />
        <div className="place mt-2">
          <article>
            <span className="mono steel">Practice bank</span>
            <h3 className="display">{bank.toLocaleString("en-CA")}</h3>
            <p>Current items — not the official paper</p>
          </article>
          <article>
            <span className="mono steel">Pass mark</span>
            <h3 className="display">70%</h3>
          </article>
          <article>
            <span className="mono steel">Official IP</span>
            <h3 className="display">110</h3>
            <p>2021 RSOS sitting — a different 110</p>
          </article>
        </div>
        <p className="mono steel mt-2">Covers</p>
        <p className="lede">{REDMC_COVERS.join(" · ")}</p>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redmc/test">
            Start practice test
          </Link>
          <Link className="btn btn-ghost" href="/redmc/load-charts">
            Load charts
          </Link>
          <Link className="btn btn-ghost" href="/redmc/rigging-charts">
            Rigging charts
          </Link>
          <Link className="btn btn-ghost" href="/redmc/test/master">
            Master exam
          </Link>
        </div>
        <p className="steel mt">
          Practice bank — {bank.toLocaleString("en-CA")} current items (
          {theoryCount} theory + {riggingQs} BCACS sling-chart). Official Red
          Seal sitting — 110-question paper. Those two 110s are not the same
          thing. Counts only real items. Tower Crane stays at REDTC.
        </p>
        <p className="mono steel mt">Last reviewed: {formatReviewed(LAST_REVIEWED)}</p>
        <ExamCluster tone="mobile" />
      </header>

      <MobileProgress />

      <section className="section wrap">
        <p className="mono kicker">What this is</p>
        <div className="mt-2">
          {REDMC_FEATURES.map((item) => (
            <article className="service" key={item.label}>
              <span className="mono steel">{item.label}</span>
              <h3 className="display">
                {item.label === "Practice"
                  ? countLabel
                  : item.title}
              </h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">About</p>
        <h2 className="display giant">WHAT IS RED SEAL CERTIFICATION?</h2>
        <p className="lede mt-2">
          The Red Seal Program is Canada’s interprovincial standard in the skilled
          trades. A Red Seal endorsement on your Mobile Crane Operator CofQ lets
          you work in other Red Seal jurisdictions without rewriting the exam.
        </p>
        <p className="lede mt">
          The current exam is based on the 2021 Red Seal Occupational Standard.
          110 questions. 70% to pass. No code book.
        </p>
      </section>

      <section className="section wrap">
        <p className="mono kicker">British Columbia</p>
        <h2 className="display giant">WHO RUNS CERTIFICATION IN B.C.</h2>
        <ul className="std-list mt-2">
          {REDMC_AUTHORITIES.map((item) => (
            <li key={item.name}>
              <p className="mono steel">{item.role}</p>
              <h3 className="display">
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <p className="mono kicker">The path</p>
        <h2 className="display giant">HOW YOU GET CERTIFIED</h2>
        <div className="mt-2">
          {REDMC_PATH.map((item) => (
            <article className="service" key={item.num}>
              <span className="mono steel">{item.num}</span>
              <h3 className="display">{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Question bank</p>
        <h2 className="display giant">{countLabel.toUpperCase()}</h2>
        <p className="lede mt-2">
          {theoryCount} theory questions + {riggingQs} BCACS sling-chart
          questions. Manufacturer load-chart question sets are being added
          separately.
        </p>
        <p className="lede mt">
          This is the current practice bank, not a one-for-one copy of the
          official 110-question Red Seal paper. Categories with no questions yet
          are not listed.
        </p>
        <div className="place mt-2">
          <article>
            <span className="mono steel">Total</span>
            <h3 className="display">{bank.toLocaleString("en-CA")}</h3>
            <p>Practice items</p>
          </article>
          <article>
            <span className="mono steel">Theory</span>
            <h3 className="display">{theoryCount}</h3>
          </article>
          <article>
            <span className="mono steel">Rigging-chart</span>
            <h3 className="display">{riggingQs}</h3>
          </article>
        </div>
        <MobileBankOverview items={source} showBankTotal={false} />
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/redmc/test/review">
            Review the bank
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Papers</p>
        <h2 className="display giant">EXAM PATHS</h2>
        <div className="mt-2">
          {MOBILE_EXAM_TRACKS.map((item) => (
            <article className="service" key={item.id}>
              <span className="mono steel">
                {item.kicker ?? `${item.questions} Q`}
              </span>
              <h3 className="display">{item.title}</h3>
              <p>
                {item.subtitle}. {item.body}
              </p>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redmc/test">
            Choose a paper
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Master exam</p>
        <h2 className="display giant">110-QUESTION RED SEAL</h2>
        <p className="lede mt-2">
          The official Interprovincial paper is 110 questions on the 2021 RSOS.
          The Master Exam follows that weighting as closely as the current
          verified question bank allows. Questions are never fabricated simply to
          fill a category. {bank.toLocaleString("en-CA")} practice items is not
          the official sitting.
        </p>
        <div>
          {MOBILE_RSOS_MWA.map((block) => (
            <article className="service" key={block.letter}>
              <span className="mono steel">{block.letter}</span>
              <h3 className="display">{block.count}</h3>
              <p>{block.name}</p>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href="/redmc/test/master">
            Start Master Exam
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Load charts</p>
        <h2 className="display giant">MANUFACTURER CHARTS</h2>
        <p className="lede mt-2">
          {CHARTS.length} manufacturer load-chart PDFs are available. Question
          sets are added only when an actual manufacturer PDF and verified
          questions exist. Capacities are never invented
          {chartQs ? ` — ${chartQs} chart questions written so far` : ""}.{" "}
          {riggingQs} sling-chart questions use the BCACS Figure 1 booklet.
        </p>
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/redmc/load-charts">
            Open load charts
          </Link>
          <Link className="btn btn-ghost" href="/redmc/rigging-charts">
            Open rigging charts
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <p className="mono kicker">Official resources</p>
        <ul className="std-list mt-2">
          {REDMC_RESOURCES.map((item, i) => (
            <li key={item.href}>
              <p className="mono steel">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="display">
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
