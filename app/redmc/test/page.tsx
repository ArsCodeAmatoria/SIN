"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "@/components/redtc/ProgressBar";
import { QuestionCard } from "@/components/redtc/QuestionCard";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, REDMC_PROGRESS_KEY, REDMC_SEEN_KEY } from "@/lib/redmc/bank";
import { REDMC_CATEGORIES } from "@/lib/redmc/copy";
import {
  MOBILE_EXAM_LEVEL_TRACKS,
  MOBILE_EXAM_SHORT,
  MOBILE_PRACTICE_MODES,
  MOBILE_RSOS_MWA,
  mobilePracticeAvailable,
  selectMobilePracticeQuestions,
  type MobilePracticeMode,
} from "@/lib/redmc/exam-tracks";
import { recordPractice } from "@/lib/redtc/progress";
import { useTest } from "@/lib/redtc/use-test";
import type { ExamId } from "@/lib/redtc/types";

const questions = allQuestions();
const CATEGORIES_WITH_QUESTIONS = REDMC_CATEGORIES.filter((name) =>
  questions.some((q) => q.category === name),
);

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
}

export default function RedmcTestPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [mode, setMode] = useState<MobilePracticeMode>("practice");
  const [exam, setExam] = useState<ExamId>("b");
  const [category, setCategory] = useState<string>(CATEGORIES_WITH_QUESTIONS[0] || "");
  const [mwa, setMwa] = useState("A");
  const recorded = useRef(false);

  const selectedMode = MOBILE_PRACTICE_MODES.find((item) => item.id === mode)!;
  const examTrack = MOBILE_EXAM_LEVEL_TRACKS.find((item) => item.id === exam);
  const paperOpts = { exam, category, mwa };
  const paperSize = mobilePracticeAvailable(questions, mode, paperOpts);

  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    showExplanation,
    isComplete,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    resetTest,
    initializeTest,
    testQuestions,
    results,
    answeredCount,
    totalQuestions,
    totalQuestionsInBank,
    canGoNext,
    canGoPrevious,
    isLastQuestion,
    passPercentage,
    totalTestTime,
    timingStats,
  } = useTest(questions, {
    questionsPerTest: Math.min(10, Math.max(1, questions.length)),
    passPercentage: 70,
    seenKey: REDMC_SEEN_KEY,
  });

  useEffect(() => {
    if (isComplete && !recorded.current) {
      recorded.current = true;
      recordPractice(REDMC_PROGRESS_KEY, testQuestions, results);
    }
  }, [isComplete, testQuestions, results]);

  const start = () => {
    recorded.current = false;
    const paper = selectMobilePracticeQuestions(questions, mode, paperOpts);
    if (!paper.length) return;
    initializeTest(paper);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">REDMC — PRACTICE</p>
          <h1 className="display giant">CHOOSE A PAPER.</h1>
          <p className="lede mt-2">
            Quick, category, exam-level, calculation, and Red Seal MWA practice.
            Empty papers stay empty until questions exist.
          </p>
          <RedtcNav />
        </header>
        <div className="redtc-tracks">
          {MOBILE_PRACTICE_MODES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`redtc-track${item.id === mode ? " active" : ""}`}
              onClick={() => setMode(item.id)}
            >
              <span className="mono steel">{item.subtitle}</span>
              <strong className="display">{item.title}</strong>
            </button>
          ))}
        </div>
        <p className="lede mt-2">{selectedMode.body}</p>
        {mode === "exam" ? (
          <div className="redtc-filters">
            {MOBILE_EXAM_LEVEL_TRACKS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`redtc-chip${exam === item.id ? " active" : ""}`}
                onClick={() => setExam(item.id as ExamId)}
              >
                {item.title}
              </button>
            ))}
          </div>
        ) : null}
        {mode === "category" ? (
          <label className="redtc-select">
            <span className="mono steel">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES_WITH_QUESTIONS.map((name) => (
                <option key={name} value={name}>
                  {name} ({questions.filter((q) => q.category === name).length})
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {mode === "mwa" ? (
          <div className="redtc-filters">
            {MOBILE_RSOS_MWA.map((block) => (
              <button
                key={block.letter}
                type="button"
                className={`redtc-chip${mwa === block.letter ? " active" : ""}`}
                onClick={() => setMwa(block.letter)}
              >
                {block.letter} · {block.name}
              </button>
            ))}
          </div>
        ) : null}
        {mode === "exam" && examTrack ? (
          <p className="steel mt">{examTrack.body}</p>
        ) : null}
        <div className="place mt-2">
          <article>
            <span className="mono steel">THIS PAPER</span>
            <h3 className="display">{paperSize}</h3>
          </article>
          <article>
            <span className="mono steel">TO PASS</span>
            <h3 className="display">70%</h3>
          </article>
          <article>
            <span className="mono steel">IN BANK</span>
            <h3 className="display">{questions.length}</h3>
          </article>
        </div>
        <div className="inline-cta">
          <button type="button" className="btn btn-solid" onClick={start} disabled={!paperSize}>
            {paperSize ? `Start ${selectedMode.title}` : "No questions tagged yet"}
          </button>
          <Link className="btn btn-ghost" href="/redmc/test/master">
            Master exam
          </Link>
          <Link className="btn btn-ghost" href="/redmc">
            Back to REDMC
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const passed = results.passed;
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">{passed ? "Passed" : "Not passed"}</p>
          <h1 className="display giant">{results.percentage}%</h1>
          <p className="lede mt">
            {passed
              ? "Solid. Sit another paper or take the master exam."
              : `${passPercentage}% to pass. Read what you missed. Sit it again.`}
          </p>
          <RedtcNav />
        </header>
        <div className="place">
          <article>
            <span className="mono steel">CORRECT</span>
            <h3 className="display">{results.correctCount}</h3>
          </article>
          <article>
            <span className="mono steel">WRONG</span>
            <h3 className="display">{results.incorrectCount}</h3>
          </article>
          <article>
            <span className="mono steel">TIME</span>
            <h3 className="display">{formatTime(totalTestTime)}</h3>
          </article>
          <article>
            <span className="mono steel">AVG / Q</span>
            <h3 className="display">{formatTime(timingStats.average)}</h3>
          </article>
        </div>
        <p className="steel mt">
          {totalQuestions} questions · {passPercentage}% pass · {totalQuestionsInBank} in bank ·
          fastest {formatTime(timingStats.fastest)} · slowest {formatTime(timingStats.slowest)}
        </p>
        <div className="inline-cta">
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              recorded.current = false;
              resetTest();
            }}
          >
            {passed ? "Practice again" : "Try again"}
          </button>
          <Link className="btn btn-ghost" href="/redmc/test/master">
            Master exam
          </Link>
          <Link className="btn btn-ghost" href="/redmc/test/review">
            Review bank
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="redtc wrap">
        <p className="lede">Loading questions…</p>
      </div>
    );
  }

  return (
    <div className="redtc wrap redtc-sit">
      <div className="redtc-sit-bar">
        <p className="mono steel">{passPercentage}% to pass</p>
        <RedtcNav />
        <ProgressBar current={answeredCount} total={totalQuestions} />
      </div>
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
        onSelectAnswer={selectAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        examShort={MOBILE_EXAM_SHORT}
        pdfBase="/redmc/charts"
      />
      <div className="redtc-sit-nav">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={previousQuestion}
          disabled={!canGoPrevious}
        >
          Previous
        </button>
        <span className="mono steel">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        <button
          type="button"
          className={`btn ${canGoNext && isLastQuestion ? "btn-solid" : "btn-ghost"}`}
          onClick={nextQuestion}
          disabled={!canGoNext}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            recorded.current = false;
            resetTest();
            setHasStarted(false);
          }}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
