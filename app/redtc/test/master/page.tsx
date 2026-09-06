"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormulaSheet } from "@/components/redtc/FormulaSheet";
import { ProgressBar } from "@/components/redtc/ProgressBar";
import { QuestionCard } from "@/components/redtc/QuestionCard";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, REDTC_PROGRESS_KEY } from "@/lib/redtc/bank";
import { parseRsosTask, RSOS_MWA, RSOS_TASKS, scoreByMwa, selectIpPaper } from "@/lib/redtc/exam-tracks";
import { recordMaster } from "@/lib/redtc/progress";
import { useTest } from "@/lib/redtc/use-test";

const questions = allQuestions(10000);
const MASTER_QUESTIONS = 100;
const MASTER_PASS = 70;
const TIMER = 4 * 60 * 60;

function formatClock(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function RedtcMasterPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER);
  const [timerExpired, setTimerExpired] = useState(false);
  const [formulasOpen, setFormulasOpen] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(() => new Set());
  const [reviewMissed, setReviewMissed] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const recorded = useRef(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    isComplete,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitExam,
    initializeTest,
    testQuestions,
    results,
    answeredCount,
    totalQuestions,
    canGoPrevious,
    isLastQuestion,
  } = useTest(questions, {
    questionsPerTest: MASTER_QUESTIONS,
    passPercentage: MASTER_PASS,
    examMode: true,
  });

  useEffect(() => {
    if (!hasStarted || isComplete || timerExpired) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, isComplete, timerExpired]);

  useEffect(() => {
    if (timerExpired && hasStarted && !isComplete) submitExam();
  }, [timerExpired, hasStarted, isComplete, submitExam]);

  useEffect(() => {
    if (isComplete && hasStarted && !recorded.current) {
      recorded.current = true;
      recordMaster(REDTC_PROGRESS_KEY, testQuestions, results);
    }
  }, [isComplete, hasStarted, testQuestions, results]);

  const handleStart = useCallback(() => {
    recorded.current = false;
    initializeTest(selectIpPaper(questions));
    setHasStarted(true);
    setTimeRemaining(TIMER);
    setTimerExpired(false);
    setFlagged(new Set());
    setReviewMissed(false);
    setReviewIndex(0);
    setFormulasOpen(false);
  }, [initializeTest]);

  const handleReset = useCallback(() => {
    setHasStarted(false);
    setTimeRemaining(TIMER);
    setTimerExpired(false);
    setFlagged(new Set());
    setReviewMissed(false);
    setReviewIndex(0);
  }, []);

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  };

  const handleFinish = () => {
    const blank = totalQuestions - answeredCount;
    if (blank > 0) {
      const ok = window.confirm(
        `${blank} unanswered question${blank === 1 ? "" : "s"} will count as incorrect. Submit anyway?`,
      );
      if (!ok) return;
    }
    submitExam();
  };

  const isLowTime = timeRemaining < 15 * 60;
  const mwaScores = scoreByMwa(testQuestions, results.answers);
  const missed = testQuestions.filter((q) => !results.answers[q.id]?.isCorrect);
  const unanswered = totalQuestions - answeredCount;
  const wrongAnswered = results.incorrectCount - unanswered;

  if (!hasStarted) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">REDTC — INTERPROVINCIAL</p>
          <h1 className="display giant">RED SEAL IP.</h1>
          <p className="lede mt-2">
            Closed-book simulation of the Tower Crane Operator Interprovincial exam
            (2023 RSOS). 100 four-option questions. 70 correct to pass. Four hours.
          </p>
          <RedtcNav />
        </header>
        <div className="place">
          <article>
            <span className="mono steel">QUESTIONS</span>
            <h3 className="display">{MASTER_QUESTIONS}</h3>
          </article>
          <article>
            <span className="mono steel">HOURS</span>
            <h3 className="display">4:00</h3>
          </article>
          <article>
            <span className="mono steel">TO PASS</span>
            <h3 className="display">70</h3>
          </article>
        </div>
        <p className="mono kicker mt-2">Official question counts</p>
        <div>
          {RSOS_MWA.map((block) => (
            <article className="service" key={block.letter}>
              <span className="mono steel">{block.letter}</span>
              <h3 className="display">{block.count}</h3>
              <p>
                {block.name}
                <br />
                {RSOS_TASKS.filter((t) => t.mwa === block.letter)
                  .map((t) => `${t.id} · ${t.count}`)
                  .join(" · ")}
              </p>
            </article>
          ))}
        </div>
        <div className="redtc-rulebox mt-2">
          <p className="mono steel">Same rules as the sitting</p>
          <ul className="redtc-bullets">
            <li>No code book. Formulas and acronyms on the sheet.</li>
            <li>No answer key until you submit. Skip, flag, change answers.</li>
            <li>Load-chart items include an Open Chart PDF.</li>
            <li>Unanswered counts as incorrect. Time expiry submits the paper.</li>
            <li>70/100 passes — even if the clock hits zero.</li>
          </ul>
        </div>
        <div className="inline-cta">
          <button type="button" className="btn btn-solid" onClick={handleStart}>
            Start Red Seal IP
          </button>
          <Link className="btn btn-ghost" href="/redtc/test">
            Practice papers
          </Link>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const passed = results.passed;
    const reviewQuestion = missed[reviewIndex];

    if (reviewMissed && reviewQuestion) {
      return (
        <div className="redtc wrap redtc-sit">
          <p className="mono steel">
            Missed {reviewIndex + 1} of {missed.length}
            {parseRsosTask(reviewQuestion) ? ` · RSOS ${parseRsosTask(reviewQuestion)}` : ""}
          </p>
          <QuestionCard
            question={reviewQuestion}
            selectedAnswer={results.answers[reviewQuestion.id]?.selected || null}
            showExplanation
            onSelectAnswer={() => {}}
            questionNumber={testQuestions.findIndex((q) => q.id === reviewQuestion.id) + 1}
            totalQuestions={totalQuestions}
            isReviewMode
          />
          <div className="redtc-sit-nav">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setReviewIndex((i) => Math.max(0, i - 1))}
              disabled={reviewIndex === 0}
            >
              Previous
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setReviewMissed(false)}>
              Results
            </button>
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => {
                if (reviewIndex < missed.length - 1) setReviewIndex(reviewIndex + 1);
                else setReviewMissed(false);
              }}
            >
              {reviewIndex < missed.length - 1 ? "Next missed" : "Done"}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">
            {timerExpired && passed
              ? "Time expired · Passed"
              : timerExpired
                ? "Time expired · Not passed"
                : passed
                  ? "Passed"
                  : "Not passed"}
          </p>
          <h1 className="display giant">{results.percentage}%</h1>
          <p className="lede mt">
            {results.correctCount} / {MASTER_QUESTIONS} · 70 required
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
            <h3 className="display">{Math.max(0, wrongAnswered)}</h3>
          </article>
          <article>
            <span className="mono steel">BLANK</span>
            <h3 className="display">{unanswered}</h3>
          </article>
        </div>
        <p className="mono kicker mt-2">By major work activity</p>
        <div>
          {mwaScores.map((block) => (
            <article className="service" key={block.letter}>
              <span className="mono steel">{block.letter}</span>
              <h3 className="display">
                {block.correct}/{block.count}
              </h3>
              <p>{block.name}</p>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          {missed.length > 0 ? (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => {
                setReviewIndex(0);
                setReviewMissed(true);
              }}
            >
              Review missed ({missed.length})
            </button>
          ) : null}
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            {passed ? "Sit another paper" : "Try again"}
          </button>
          {missed.length > 0 ? (
            <Link className="btn btn-ghost" href="/redtc/test#drill">
              Drill misses
            </Link>
          ) : null}
          <Link className="btn btn-ghost" href="/redtc/test">
            Practice papers
          </Link>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="redtc wrap">
        <p className="lede">Building a 2023 RSOS paper…</p>
      </div>
    );
  }

  return (
    <div className="redtc wrap redtc-sit">
      <FormulaSheet open={formulasOpen} onClose={() => setFormulasOpen(false)} />
      <div className="redtc-sit-bar">
        <div className="redtc-sit-tools">
          <button type="button" className="btn btn-ghost" onClick={() => setFormulasOpen(true)}>
            Formulas
          </button>
          <span className={`mono${isLowTime ? " redtc-low" : ""}`}>{formatClock(timeRemaining)}</span>
        </div>
        <ProgressBar current={answeredCount} total={totalQuestions} />
        <button type="button" className="btn btn-ghost" onClick={() => setShowNav((v) => !v)}>
          {showNav ? "Hide list" : "Question list"}
        </button>
        {showNav ? (
          <div className="redtc-grid">
            {testQuestions.map((q, i) => {
              const answered = Boolean(results.answers[q.id]?.selected);
              const current = i === currentQuestionIndex;
              const isFlagged = flagged.has(q.id);
              return (
                <button
                  key={q.id}
                  type="button"
                  className={`redtc-grid-n${current ? " current" : ""}${answered ? " answered" : ""}${isFlagged ? " flagged" : ""}`}
                  onClick={() => goToQuestion(i)}
                >
                  {i + 1}
                </button>
              );
            })}
            <button type="button" className="btn btn-solid" onClick={handleFinish}>
              Submit exam
            </button>
          </div>
        ) : null}
      </div>
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        showExplanation={false}
        onSelectAnswer={selectAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        hideMeta
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
        <button
          type="button"
          className={`btn ${flagged.has(currentQuestion.id) ? "btn-crown" : "btn-ghost"}`}
          onClick={toggleFlag}
        >
          {flagged.has(currentQuestion.id) ? "Flagged" : "Flag"}
        </button>
        {isLastQuestion ? (
          <button type="button" className="btn btn-solid" onClick={handleFinish}>
            Submit
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={nextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
