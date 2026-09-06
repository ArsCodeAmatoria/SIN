"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MobileBankOverview } from "@/components/redmc/MobileBankOverview";
import { QuestionCard } from "@/components/redtc/QuestionCard";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, mobileSourceQuestions } from "@/lib/redmc/bank";
import { REDMC_CATEGORIES } from "@/lib/redmc/copy";
import { MOBILE_EXAM_LABELS, MOBILE_EXAM_SHORT } from "@/lib/redmc/exam-tracks";
import type { ExamId } from "@/lib/redtc/types";

const questions = allQuestions();
const source = mobileSourceQuestions();

const CATEGORIES = [
  "All Questions",
  "PDF Load Charts",
  "PDF Rigging Charts",
  ...REDMC_CATEGORIES,
];

const EXAM_FILTERS: { id: "all" | ExamId; label: string }[] = [
  { id: "all", label: "All Mobile Questions" },
  { id: "b", label: MOBILE_EXAM_LABELS.b },
  { id: "l1", label: MOBILE_EXAM_LABELS.l1 },
  { id: "l2", label: MOBILE_EXAM_LABELS.l2 },
  { id: "l3", label: MOBILE_EXAM_LABELS.l3 },
  { id: "ip", label: MOBILE_EXAM_LABELS.ip },
  { id: "lcr", label: MOBILE_EXAM_LABELS.lcr },
];

const DIFFICULTY: { id: "all" | "easy" | "medium" | "hard"; label: string }[] = [
  { id: "all", label: "All difficulty" },
  { id: "easy", label: "Basic" },
  { id: "medium", label: "Intermediate" },
  { id: "hard", label: "Advanced" },
];

const REGULATIONS = [
  "all",
  ...Array.from(
    new Set(
      questions
        .map((q) => q.ohs)
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort(),
];

export default function RedmcReviewPage() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState("All Questions");
  const [exam, setExam] = useState<"all" | ExamId>("all");
  const [difficulty, setDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [mwa, setMwa] = useState("all");
  const [regulation, setRegulation] = useState("all");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const catOk =
        category === "All Questions" ||
        (category === "PDF Load Charts"
          ? Boolean(q.category?.startsWith("Load Chart:"))
          : category === "PDF Rigging Charts"
            ? q.chartKind === "rigging"
            : q.category === category);
      const examOk = exam === "all" || (q.exams && q.exams.includes(exam));
      const diffOk = difficulty === "all" || q.difficulty === difficulty;
      const mwaOk =
        mwa === "all" ||
        q.mwa === mwa ||
        q.rsos?.startsWith(`${mwa}-`);
      const regOk = regulation === "all" || q.ohs === regulation;
      return catOk && examOk && diffOk && mwaOk && regOk;
    });
  }, [category, exam, difficulty, mwa, regulation]);

  const current = filtered[index];

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">REDMC — BANK</p>
        <h1 className="display giant">REVIEW.</h1>
        <p className="lede mt-2">
          {source.length.toLocaleString("en-CA")} Mobile Crane Questions in the
          bank. {filtered.length} match this filter. Answers shown.
        </p>
        <RedtcNav />
      </header>
      <MobileBankOverview
        items={source}
        compact
        showSourceSplit={process.env.NODE_ENV !== "production"}
      />
      <div className="redtc-filters">
        {EXAM_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`redtc-chip${exam === item.id ? " active" : ""}`}
            onClick={() => {
              setExam(item.id);
              setIndex(0);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="redtc-filters">
        {DIFFICULTY.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`redtc-chip${difficulty === item.id ? " active" : ""}`}
            onClick={() => {
              setDifficulty(item.id);
              setIndex(0);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="redtc-filters">
        {["all", "A", "B", "C", "D", "E", "F", "G"].map((item) => (
          <button
            key={item}
            type="button"
            className={`redtc-chip${mwa === item ? " active" : ""}`}
            onClick={() => {
              setMwa(item);
              setIndex(0);
            }}
          >
            {item === "all" ? "All MWA" : `MWA ${item}`}
          </button>
        ))}
      </div>
      {REGULATIONS.length > 1 ? (
        <label className="redtc-select">
          <span className="mono steel">Regulation</span>
          <select
            value={regulation}
            onChange={(e) => {
              setRegulation(e.target.value);
              setIndex(0);
            }}
          >
            {REGULATIONS.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All regulations" : item}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="redtc-select">
        <span className="mono steel">Topic</span>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setIndex(0);
          }}
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      {current ? (
        <>
          <QuestionCard
            question={current}
            selectedAnswer={current.correctAnswer}
            showExplanation
            onSelectAnswer={() => {}}
            questionNumber={index + 1}
            totalQuestions={filtered.length}
            isReviewMode
            examShort={MOBILE_EXAM_SHORT}
            pdfBase="/redmc/charts"
          />
          <div className="redtc-sit-nav">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
            >
              Previous
            </button>
            <span className="mono steel">
              {index + 1} / {filtered.length}
            </span>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setIndex((i) => Math.min(filtered.length - 1, i + 1))}
              disabled={index >= filtered.length - 1}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="lede">No questions for this filter.</p>
      )}
      <div className="inline-cta">
        <Link className="btn btn-ghost" href="/redmc">
          Back to REDMC
        </Link>
      </div>
    </div>
  );
}
