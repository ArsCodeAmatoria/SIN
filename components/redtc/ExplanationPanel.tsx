"use client";

import type { Question } from "@/lib/redtc/types";

export function ExplanationPanel({
  question,
  isVisible,
}: {
  question: Question;
  selectedAnswer: string | null;
  isVisible: boolean;
}) {
  if (!isVisible) return null;
  const correct = question.options.find((opt) => opt.id === question.correctAnswer);

  const wrong = question.options.filter((opt) => opt.id !== question.correctAnswer);
  const wrongExplained = wrong.filter((opt) => opt.explanation);

  return (
    <div className="redtc-explain">
      <p className="mono kicker">Explanation</p>
      <p>
        <strong>{correct?.text}</strong>
        {correct?.explanation ? ` — ${correct.explanation}` : ""}
      </p>
      {wrongExplained.length > 0 ? (
        <>
          <p className="mono steel mt">Why the others are wrong</p>
          {wrongExplained.map((opt) => (
            <p key={opt.id}>
              <strong>{opt.text}</strong>
              {opt.explanation ? ` — ${opt.explanation}` : ""}
            </p>
          ))}
        </>
      ) : null}
      {question.src ? (
        <p className="steel mt">
          <strong>Source: </strong>
          {question.sourceUrl ? (
            <a href={question.sourceUrl} rel="noreferrer" target="_blank">
              {question.src}
            </a>
          ) : (
            question.src
          )}
        </p>
      ) : null}
    </div>
  );
}
