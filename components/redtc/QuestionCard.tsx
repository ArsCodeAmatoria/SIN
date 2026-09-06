"use client";

import { EXAM_SHORT } from "@/lib/redtc/exam-tracks";
import { chartPdfHref } from "@/lib/redtc/bank";
import type { ExamId, Question } from "@/lib/redtc/types";
import { AnswerOption } from "./AnswerOption";
import { ChartDisplay } from "./ChartDisplay";
import { ExplanationPanel } from "./ExplanationPanel";

export function QuestionCard({
  question,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
  isReviewMode = false,
  hideMeta = false,
  examShort = EXAM_SHORT,
  pdfBase = "/redtc/charts",
}: {
  question: Question;
  selectedAnswer: string | null;
  showExplanation: boolean;
  onSelectAnswer: (answerId: string) => void;
  questionNumber: number;
  totalQuestions: number;
  isReviewMode?: boolean;
  hideMeta?: boolean;
  examShort?: Record<ExamId, string>;
  pdfBase?: string;
}) {
  return (
    <div className="redtc-card">
      <div className="redtc-card-meta">
        <p className="mono kicker">
          Question {questionNumber} / {totalQuestions}
          {question.code ? ` · ${question.code}` : ""}
        </p>
        {question.category && !hideMeta ? (
          <p className="mono steel">{question.category}</p>
        ) : null}
      </div>
      {!hideMeta && question.exams?.length ? (
        <div className="redtc-tags">
          {question.exams.map((exam) => (
            <span key={exam} className="redtc-badge">
              {examShort[exam]}
            </span>
          ))}
        </div>
      ) : null}
      {question.chartPdf ? (
        <a
          className="btn btn-ghost"
          href={chartPdfHref(question.chartPdf, pdfBase)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open {question.chartName || (question.chartKind === "rigging" ? "rigging chart" : "load chart")} PDF
        </a>
      ) : null}
      <ChartDisplay questionText={question.question} />
      <div className="redtc-opts">
        {question.options.map((option, index) => (
          <AnswerOption
            key={option.id}
            option={option}
            index={index}
            isSelected={selectedAnswer === option.id}
            isCorrect={option.id === question.correctAnswer}
            showResult={showExplanation}
            onClick={() => onSelectAnswer(option.id)}
            disabled={showExplanation && !isReviewMode}
          />
        ))}
      </div>
      <ExplanationPanel
        question={question}
        selectedAnswer={selectedAnswer}
        isVisible={showExplanation}
      />
    </div>
  );
}
