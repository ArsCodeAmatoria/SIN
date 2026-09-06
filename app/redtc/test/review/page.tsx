"use client";

import { useMemo, useState } from "react";
import { ReviewSession, matchesReviewTopic, reviewTopicCounts } from "@/components/redtc/ReviewSession";
import { allQuestions } from "@/lib/redtc/bank";
import { EXAM_SHORT, type ExamId } from "@/lib/redtc/exam-tracks";

const questions = allQuestions();

const TOPICS = [
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
  { id: "all", label: "All" },
  { id: "b", label: EXAM_SHORT.b },
  { id: "l1", label: EXAM_SHORT.l1 },
  { id: "l2", label: EXAM_SHORT.l2 },
  { id: "ip", label: EXAM_SHORT.ip },
  { id: "lcr", label: EXAM_SHORT.lcr },
];

export default function RedtcReviewPage() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState("All Questions");
  const [exam, setExam] = useState<"all" | ExamId>("all");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const examOk = exam === "all" || (q.exams && q.exams.includes(exam));
      return examOk && matchesReviewTopic(q, category);
    });
  }, [category, exam]);

  const counts = useMemo(
    () =>
      reviewTopicCounts(
        questions,
        (q) => exam === "all" || Boolean(q.exams?.includes(exam)),
      ),
    [exam],
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
      kicker="REDTC — BANK"
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
        </div>
      }
    />
  );
}
