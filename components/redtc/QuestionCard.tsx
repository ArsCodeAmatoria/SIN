"use client";

import { EXAM_SHORT } from "@/lib/redtc/exam-tracks";
import { chartPdfHref } from "@/lib/redtc/bank";
import type { ExamId, Question } from "@/lib/redtc/types";
import { AnswerOption } from "./AnswerOption";
import { ChartDisplay } from "./ChartDisplay";
import { ChartSplit } from "./ChartSplit";
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
  const pdfHref = question.chartPdf ? chartPdfHref(question.chartPdf, pdfBase) : null;
  const chartTitle = question.chartName
    || (question.chartKind === "rigging" ? "Rigging chart" : "Load chart");

  const body = (
    <>
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
    </>
  );

  return (
    <div className="redtc-card">
      {hideMeta ? null : (
        <>
          <div className="redtc-card-meta">
            <p className="mono kicker">
              Question {questionNumber} / {totalQuestions}
              {question.code ? ` · ${question.code}` : ""}
            </p>
            {question.category ? (
              <p className="mono steel">{question.category}</p>
            ) : null}
          </div>
          {question.exams?.length ? (
            <div className="redtc-tags">
              {question.exams.map((exam) => (
                <span key={exam} className="redtc-badge">
                  {examShort[exam]}
                </span>
              ))}
            </div>
          ) : null}
        </>
      )}
      {pdfHref ? (
        <ChartSplit pdfHref={pdfHref} title={chartTitle}>
          {body}
        </ChartSplit>
      ) : (
        body
      )}
    </div>
  );
}
