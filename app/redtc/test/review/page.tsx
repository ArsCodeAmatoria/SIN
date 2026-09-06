"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QuestionCard } from "@/components/redtc/QuestionCard";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions } from "@/lib/redtc/bank";
import { EXAM_LABELS, type ExamId } from "@/lib/redtc/exam-tracks";

const questions = allQuestions();

const CATEGORIES = [
  "All Questions",
  "PDF Load Charts",
  "PDF Rigging Charts",
  ...Array.from(
    new Set(
      questions
        .map((q) => q.category)
        .filter((c): c is string => typeof c === "string" && !c.startsWith("Load Chart:")),
    ),
  ).sort(),
];

const EXAM_FILTERS: { id: "all" | ExamId; label: string }[] = [
  { id: "all", label: "All exams" },
  { id: "b", label: EXAM_LABELS.b },
  { id: "l1", label: EXAM_LABELS.l1 },
  { id: "l2", label: EXAM_LABELS.l2 },
  { id: "ip", label: EXAM_LABELS.ip },
  { id: "lcr", label: EXAM_LABELS.lcr },
];

export default function RedtcReviewPage() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState("All Questions");
  const [exam, setExam] = useState<"all" | ExamId>("all");

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
      return catOk && examOk;
    });
  }, [category, exam]);

  const current = filtered[index];

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">REDTC — BANK</p>
        <h1 className="display giant">REVIEW.</h1>
        <p className="lede mt-2">
          {filtered.length} questions. Answers shown. Filter by exam and topic.
        </p>
        <RedtcNav />
      </header>
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
        <Link className="btn btn-ghost" href="/redtc">
          Back to REDTC
        </Link>
      </div>
    </div>
  );
}
