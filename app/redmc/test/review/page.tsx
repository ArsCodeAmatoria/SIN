"use client";

import { useMemo, useState } from "react";
import { ReviewSession, matchesReviewTopic, reviewTopicCounts } from "@/components/redtc/ReviewSession";
import { allQuestions } from "@/lib/redmc/bank";
import { REDMC_CATEGORIES } from "@/lib/redmc/copy";
import { MOBILE_EXAM_SHORT } from "@/lib/redmc/exam-tracks";
import type { ExamId } from "@/lib/redtc/types";

const questions = allQuestions();

const TOPICS = [
  "All Questions",
  "PDF Load Charts",
  "PDF Rigging Charts",
  ...REDMC_CATEGORIES,
];

const EXAM_FILTERS: { id: "all" | ExamId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "b", label: MOBILE_EXAM_SHORT.b },
  { id: "l1", label: MOBILE_EXAM_SHORT.l1 },
  { id: "l2", label: MOBILE_EXAM_SHORT.l2 },
  { id: "l3", label: MOBILE_EXAM_SHORT.l3 },
  { id: "ip", label: MOBILE_EXAM_SHORT.ip },
  { id: "lcr", label: MOBILE_EXAM_SHORT.lcr },
];

const DIFFICULTY: { id: "all" | "easy" | "medium" | "hard"; label: string }[] = [
  { id: "all", label: "All difficulty" },
  { id: "easy", label: "Basic" },
  { id: "medium", label: "Intermediate" },
  { id: "hard", label: "Advanced" },
];

const MWA = ["all", "A", "B", "C", "D", "E", "F", "G"] as const;

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

  const keep = (q: (typeof questions)[number]) => {
    const examOk = exam === "all" || Boolean(q.exams?.includes(exam));
    const diffOk = difficulty === "all" || q.difficulty === difficulty;
    const mwaOk = mwa === "all" || q.mwa === mwa || Boolean(q.rsos?.startsWith(`${mwa}-`));
    const regOk = regulation === "all" || q.ohs === regulation;
    return examOk && diffOk && mwaOk && regOk;
  };

  const filtered = useMemo(() => {
    return questions.filter((q) => keep(q) && matchesReviewTopic(q, category));
  }, [category, exam, difficulty, mwa, regulation]);

  const counts = useMemo(
    () => reviewTopicCounts(questions, keep),
    [exam, difficulty, mwa, regulation],
  );

  const topics = TOPICS.filter(
    (topic) => topic === "All Questions" || topic === category || (counts.get(topic) || 0) > 0,
  );

  return (
    <ReviewSession
      index={index}
      total={filtered.length}
      onIndex={setIndex}
      current={filtered[index]}
      kicker="REDMC — BANK"
      examShort={MOBILE_EXAM_SHORT}
      pdfBase="/redmc/charts"
      filters={
        <div className="redtc-review-filters">
          <div className="redtc-filters" role="group" aria-label="Exam">
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
          <div className="redtc-review-selects">
            <label className="redtc-select">
              <span className="mono steel">Topic</span>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIndex(0);
                }}
              >
                {topics.map((item) => (
                  <option key={item} value={item}>
                    {item} ({counts.get(item) || 0})
                  </option>
                ))}
              </select>
            </label>
            <label className="redtc-select">
              <span className="mono steel">Difficulty</span>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value as typeof difficulty);
                  setIndex(0);
                }}
              >
                {DIFFICULTY.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="redtc-select">
              <span className="mono steel">MWA</span>
              <select
                value={mwa}
                onChange={(e) => {
                  setMwa(e.target.value);
                  setIndex(0);
                }}
              >
                {MWA.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All MWA" : `MWA ${item}`}
                  </option>
                ))}
              </select>
            </label>
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
          </div>
        </div>
      }
    />
  );
}
