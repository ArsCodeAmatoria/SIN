"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ChartDisplay } from "@/components/redtc/ChartDisplay";
import { useChartViewer } from "@/components/redtc/ChartSplit";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { CHARTS, chartPdfHref } from "@/lib/redtc/bank";

export default function RedtcChartQuizPage() {
  const params = useParams();
  const chartId = String(params.id || "");
  const chart = useMemo(() => CHARTS.find((c) => c.id === chartId), [chartId]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const pdfHref = chart ? chartPdfHref(chart.pdfFile) : "";
  const { frame, sheet, setEnlarge } = useChartViewer(pdfHref, chart?.name || "Load chart");

  if (!chart) {
    return (
      <div className="redtc wrap">
        <p className="lede">Chart not found.</p>
        <Link className="btn btn-ghost" href="/redtc/load-charts">
          Back to charts
        </Link>
      </div>
    );
  }

  const question = chart.questions[index];
  const total = chart.questions.length;
  const last = index === total - 1;
  const correctCount = Object.entries(answers).filter(([id, answer]) => {
    const q = chart.questions.find((item) => item.id === Number(id));
    return q?.correctAnswer === answer;
  }).length;
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = pct >= 70;

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setShow(false);
    setAnswers({});
    setDone(false);
    setEnlarge(false);
  };

  if (!question) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">{chart.manufacturer}</p>
          <h1 className="display giant">{chart.name}</h1>
          <p className="lede mt-2">
            {chart.description} Questions appear when they are written against
            this PDF. Capacities are not invented here.
          </p>
          <RedtcNav />
        </header>
        <div className="inline-cta">
          <a className="btn btn-solid" href={pdfHref} target="_blank" rel="noopener noreferrer">
            Open chart
          </a>
          <Link className="btn btn-ghost" href="/redtc/load-charts">
            Back to charts
          </Link>
        </div>
        {frame}
      </div>
    );
  }

  if (done) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">{passed ? "Passed" : "Not passed"}</p>
          <h1 className="display giant">{pct}%</h1>
          <p className="lede mt">
            {chart.name}. {correctCount}/{total}. 70% required.
          </p>
          <RedtcNav />
        </header>
        <div className="inline-cta">
          <button type="button" className="btn btn-solid" onClick={reset}>
            Retry
          </button>
          <Link className="btn btn-ghost" href="/redtc/load-charts">
            Back to charts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="redtc wrap redtc-sit">
      {sheet}
      <div className="redtc-sit-bar">
        <RedtcNav />
        <div className="redtc-sit-tools">
          <p className="mono steel">
            {chart.manufacturer} {chart.model}
          </p>
          <a className="btn btn-solid" href={pdfHref} target="_blank" rel="noopener noreferrer">
            Open chart
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => setEnlarge(true)}>
            Enlarge
          </button>
        </div>
        <p className="display redtc-q">
          Question {index + 1} of {total}
        </p>
        <div className="redtc-progress-track" aria-hidden>
          <div
            className="redtc-progress-fill"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>
      <div className="redtc-chart-split">
        <div className="redtc-chart-pane">{frame}</div>
        <div>
          {question.src ? <p className="steel">{question.src}</p> : null}
          <ChartDisplay questionText={question.question} />
          <div className="redtc-opts">
            {question.options.map((option) => {
              const picked = selected === option.id;
              const right = option.id === question.correctAnswer;
              const state = show ? (right ? "right" : picked ? "wrong" : "") : picked ? "picked" : "";
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`redtc-opt${state ? ` ${state}` : ""}`}
                  disabled={show}
                  onClick={() => {
                    if (show) return;
                    setSelected(option.id);
                  }}
                >
                  <span className="mono redtc-opt-letter">{option.id.toUpperCase()}</span>
                  <span>
                    {option.text}
                    {show ? <em> — {option.explanation}</em> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="redtc-sit-nav">
        <Link className="btn btn-ghost" href="/redtc/load-charts">
          Charts
        </Link>
        {!show ? (
          <button
            type="button"
            className="btn btn-solid"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              setShow(true);
              setAnswers((prev) => ({ ...prev, [question.id]: selected }));
            }}
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              if (last) {
                setDone(true);
                return;
              }
              setIndex((i) => i + 1);
              setSelected(null);
              setShow(false);
            }}
          >
            {last ? "Results" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
}
