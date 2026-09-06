import type { Question, TestResult } from "./types";

export type CategoryScore = {
  attempted: number;
  correct: number;
};

export type DisciplineProgress = {
  attempted: number;
  correct: number;
  byCategory: Record<string, CategoryScore>;
  masterAttempts: number;
  masterBest: number | null;
  /** Most recent misses first. Dropped when the same item is answered correctly. */
  missedIds: number[];
};

const EMPTY: DisciplineProgress = {
  attempted: 0,
  correct: 0,
  byCategory: {},
  masterAttempts: 0,
  masterBest: null,
  missedIds: [],
};

const MISS_CAP = 120;
export const DRILL_SIZE = 10;

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function rememberMisses(
  prev: number[],
  questions: Question[],
  results: TestResult,
): number[] {
  let ids = [...prev];
  for (const question of questions) {
    const ok = results.answers[question.id]?.isCorrect;
    ids = ids.filter((id) => id !== question.id);
    if (!ok) ids.unshift(question.id);
  }
  return ids.slice(0, MISS_CAP);
}

export function loadProgress(key: string): DisciplineProgress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as DisciplineProgress;
    const missedIds = Array.isArray(parsed.missedIds)
      ? parsed.missedIds.filter((id) => Number.isFinite(id))
      : [];
    return {
      ...EMPTY,
      ...parsed,
      byCategory: parsed.byCategory || {},
      missedIds,
    };
  } catch {
    return EMPTY;
  }
}

function saveProgress(key: string, data: DisciplineProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

function applySit(
  prev: DisciplineProgress,
  questions: Question[],
  results: TestResult,
): DisciplineProgress {
  const next: DisciplineProgress = {
    ...prev,
    attempted: prev.attempted + questions.length,
    correct: prev.correct + results.correctCount,
    byCategory: { ...prev.byCategory },
    missedIds: rememberMisses(prev.missedIds, questions, results),
  };

  for (const question of questions) {
    const label = question.category || "Uncategorized";
    const bucket = next.byCategory[label] || { attempted: 0, correct: 0 };
    bucket.attempted += 1;
    if (results.answers[question.id]?.isCorrect) bucket.correct += 1;
    next.byCategory[label] = bucket;
  }

  return next;
}

export function recordPractice(
  key: string,
  questions: Question[],
  results: TestResult,
): DisciplineProgress {
  const next = applySit(loadProgress(key), questions, results);
  saveProgress(key, next);
  return next;
}

export function recordMaster(
  key: string,
  questions: Question[],
  results: TestResult,
): DisciplineProgress {
  const next = applySit(loadProgress(key), questions, results);
  next.masterAttempts += 1;
  next.masterBest =
    next.masterBest == null ? results.percentage : Math.max(next.masterBest, results.percentage);
  saveProgress(key, next);
  return next;
}

export function weakestCategories(progress: DisciplineProgress, limit = 4) {
  return Object.entries(progress.byCategory)
    .filter(([, score]) => score.attempted > 0)
    .map(([name, score]) => ({
      name,
      attempted: score.attempted,
      correct: score.correct,
      pct: Math.round((score.correct / score.attempted) * 100),
    }))
    .sort((a, b) => a.pct - b.pct || b.attempted - a.attempted)
    .slice(0, limit);
}

/** Paper from recent misses, then items in categories still under 70%. */
export function selectDrillQuestions(
  bank: Question[],
  progress: DisciplineProgress,
  size = DRILL_SIZE,
): Question[] {
  const byId = new Map(bank.map((question) => [question.id, question]));
  const picked: Question[] = [];
  const used = new Set<number>();

  const take = (pool: Question[]) => {
    for (const question of shuffle(pool)) {
      if (picked.length >= size) return;
      if (used.has(question.id)) continue;
      used.add(question.id);
      picked.push(question);
    }
  };

  take(
    (progress.missedIds ?? [])
      .map((id) => byId.get(id))
      .filter((question): question is Question => Boolean(question)),
  );

  if (picked.length < size) {
    const weak = new Set(
      weakestCategories(progress, 8)
        .filter((item) => item.attempted >= 1 && item.pct < 70)
        .map((item) => item.name),
    );
    take(bank.filter((question) => weak.has(question.category || "Uncategorized")));
  }

  return picked;
}
