"use client";

import { useEffect, useState, type ReactNode } from "react";
import { EXAM_SHORT } from "@/lib/redtc/exam-tracks";
import type { ExamId, Question } from "@/lib/redtc/types";
import { QuestionCard } from "./QuestionCard";
import { RedtcNav } from "./RedtcNav";

export function matchesReviewTopic(question: Question, category: string) {
  if (category === "All Questions") return true;
  if (category === "PDF Load Charts") return Boolean(question.category?.startsWith("Load Chart:"));
  if (category === "PDF Rigging Charts") return question.chartKind === "rigging";
  return question.category === category;
}

export function reviewTopicCounts(
  items: Question[],
  keep: (question: Question) => boolean,
) {
  const map = new Map<string, number>();
  let all = 0;
  for (const question of items) {
    if (!keep(question)) continue;
    all += 1;
    if (question.category?.startsWith("Load Chart:")) {
      map.set("PDF Load Charts", (map.get("PDF Load Charts") || 0) + 1);
    }
    if (question.chartKind === "rigging") {
      map.set("PDF Rigging Charts", (map.get("PDF Rigging Charts") || 0) + 1);
    }
    if (question.category) {
      map.set(question.category, (map.get(question.category) || 0) + 1);
    }
  }
  map.set("All Questions", all);
  return map;
}

export function ReviewSession({
  index,
  total,
  onIndex,
  current,
  filters,
  kicker,
  examShort = EXAM_SHORT,
  pdfBase,
}: {
  index: number;
  total: number;
  onIndex: (next: number) => void;
  current?: Question;
  filters: ReactNode;
  kicker: string;
  examShort?: Record<ExamId, string>;
  pdfBase?: string;
}) {
  const [draft, setDraft] = useState("");
  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    if (total > 0 && index >= total) onIndex(0);
  }, [index, total, onIndex]);

  const go = (next: number) => {
    if (total <= 0) return;
    onIndex(Math.min(Math.max(0, next), total - 1));
  };

  const commitDraft = () => {
    const n = Number(draft);
    if (!Number.isFinite(n)) {
      setDraft(total ? String(index + 1) : "");
      return;
    }
    go(Math.round(n) - 1);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (total <= 0) return;
        onIndex(Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (total <= 0) return;
        onIndex(Math.min(total - 1, index + 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onIndex]);

  const meta = current
    ? [
        current.category,
        current.exams?.map((exam) => examShort[exam]).filter(Boolean).join(" · "),
      ]
        .filter(Boolean)
        .join("  ·  ")
    : "";

  return (
    <div className="redtc wrap redtc-sit redtc-review">
      <header className="page-hero">
        <p className="mono kicker">{kicker}</p>
        <h1 className="display giant">REVIEW.</h1>
        <p className="lede mt-2">
          {total.toLocaleString("en-CA")} questions. Answers shown.
        </p>
        <RedtcNav />
      </header>
      <div className="redtc-sit-bar">
        {filters}
        <p className="display redtc-q">
          {total ? `Question ${index + 1} of ${total}` : "No questions"}
        </p>
        {meta ? <p className="mono steel">{meta}</p> : null}
        <div className="redtc-progress-track" aria-hidden>
          <div
            className="redtc-progress-fill"
            style={{ width: total ? `${((index + 1) / total) * 100}%` : "0%" }}
          />
        </div>
      </div>
      {current ? (
        <QuestionCard
          question={current}
          selectedAnswer={current.correctAnswer}
          showExplanation
          onSelectAnswer={() => {}}
          questionNumber={index + 1}
          totalQuestions={total}
          isReviewMode
          hideMeta
          examShort={examShort}
          pdfBase={pdfBase}
        />
      ) : (
        <p className="lede">No questions for this filter.</p>
      )}
      <div className="redtc-sit-nav redtc-review-nav">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => go(index - 1)}
          disabled={!total || index <= 0}
        >
          Previous
        </button>
        <label className="redtc-review-jump">
          <span className="visually-hidden">Go to question</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={Math.max(total, 1)}
            value={jumping ? draft : total ? String(index + 1) : ""}
            disabled={!total}
            onFocus={() => {
              setDraft(total ? String(index + 1) : "");
              setJumping(true);
            }}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={() => {
              commitDraft();
              setJumping(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitDraft();
                setJumping(false);
                event.currentTarget.blur();
              }
            }}
          />
          <span className="mono steel">/ {total}</span>
        </label>
        <button
          type="button"
          className="btn btn-solid"
          onClick={() => go(index + 1)}
          disabled={!total || index >= total - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
