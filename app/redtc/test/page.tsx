"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "@/components/redtc/ProgressBar";
import { QuestionCard } from "@/components/redtc/QuestionCard";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { allQuestions, REDTC_PROGRESS_KEY, REDTC_SEEN_KEY } from "@/lib/redtc/bank";
import { EXAM_TRACKS, selectTrackQuestions, type ExamTrack } from "@/lib/redtc/exam-tracks";
import {
  loadProgress,
  recordPractice,
  selectDrillQuestions,
} from "@/lib/redtc/progress";
import { useTest } from "@/lib/redtc/use-test";

const questions = allQuestions();

type PaperId = ExamTrack["id"] | "drill";

const DRILL = {
  id: "drill" as const,
  title: "Drill misses",
  subtitle: "Wrong answers + weak topics",
  questions: 10,
  passPercent: 70,
  body: "Questions you missed, then items from categories still under 70%. Sit another paper first if this is empty.",
};

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
}

export default function RedtcTestPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<PaperId>("practice");
  const [drillCount, setDrillCount] = useState(0);
  const recorded = useRef(false);
  const track =
    selectedTrack === "drill"
      ? DRILL
      : EXAM_TRACKS.find((t) => t.id === selectedTrack)!;

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
    questionsPerTest: track.questions,
    passPercentage: track.passPercent,
    seenKey: REDTC_SEEN_KEY,
  });

  useEffect(() => {
    setDrillCount(selectDrillQuestions(questions, loadProgress(REDTC_PROGRESS_KEY)).length);
    if (window.location.hash === "#drill") setSelectedTrack("drill");
  }, []);

  useEffect(() => {
    if (isComplete && !recorded.current) {
      recorded.current = true;
      recordPractice(REDTC_PROGRESS_KEY, testQuestions, results);
    }
  }, [isComplete, testQuestions, results]);

  const start = () => {
    recorded.current = false;
    const paper =
      selectedTrack === "drill"
        ? selectDrillQuestions(questions, loadProgress(REDTC_PROGRESS_KEY))
        : selectTrackQuestions(questions, selectedTrack);
    if (!paper.length) return;
    initializeTest(paper);
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">REDTC — PRACTICE</p>
          <h1 className="display giant">CHOOSE A PAPER.</h1>
          <p className="lede mt-2">
            Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, load-chart
            practical. Every question is tagged to the section it tests.
          </p>
          <RedtcNav />
        </header>
        <div className="redtc-tracks">
          <button
            type="button"
            className={`redtc-track${selectedTrack === "drill" ? " active" : ""}`}
            onClick={() => setSelectedTrack("drill")}
            id="drill"
          >
            <span className="mono steel">
              {drillCount} Q · {DRILL.passPercent}%
            </span>
            <strong className="display">{DRILL.title}</strong>
            <em>{DRILL.subtitle}</em>
          </button>
          {EXAM_TRACKS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`redtc-track${item.id === selectedTrack ? " active" : ""}`}
              onClick={() => setSelectedTrack(item.id)}
            >
              <span className="mono steel">{item.questions} Q · {item.passPercent}%</span>
              <strong className="display">{item.title}</strong>
              <em>{item.subtitle}</em>
            </button>
          ))}
        </div>
        <p className="lede mt-2">{track.body}</p>
        <div className="place mt-2">
          <article>
            <span className="mono steel">QUESTIONS</span>
            <h3 className="display">
              {selectedTrack === "drill" ? drillCount : track.questions}
            </h3>
          </article>
          <article>
            <span className="mono steel">TO PASS</span>
            <h3 className="display">{track.passPercent}%</h3>
          </article>
          <article>
            <span className="mono steel">IN BANK</span>
            <h3 className="display">{questions.length}</h3>
          </article>
        </div>
        <div className="inline-cta">
          <button
            type="button"
            className="btn btn-solid"
            onClick={start}
            disabled={selectedTrack === "drill" && drillCount === 0}
          >
            {selectedTrack === "drill" && drillCount === 0
              ? "Sit a paper first"
              : `Start ${track.title}`}
          </button>
          <Link className="btn btn-ghost" href="/redtc">
            Back to REDTC
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
          {results.incorrectCount > 0 ? (
            <button
              type="button"
              className="btn btn-solid"
              onClick={() => {
                setSelectedTrack("drill");
                recorded.current = false;
                const paper = selectDrillQuestions(
                  questions,
                  loadProgress(REDTC_PROGRESS_KEY),
                );
                if (!paper.length) return;
                initializeTest(paper);
              }}
            >
              Drill misses
            </button>
          ) : (
            <button type="button" className="btn btn-solid" onClick={() => resetTest()}>
              Practice again
            </button>
          )}
          {results.incorrectCount > 0 ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                recorded.current = false;
                resetTest();
              }}
            >
              Try again
            </button>
          ) : null}
          <Link className="btn btn-ghost" href="/redtc/test/master">
            Master exam
          </Link>
          <Link className="btn btn-ghost" href="/redtc/test/review">
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
      </div>
    </div>
  );
}
