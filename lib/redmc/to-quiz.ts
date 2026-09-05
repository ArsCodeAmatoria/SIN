import type { Difficulty, ExamId, Question } from "@/lib/redtc/types";
import type { MobileDifficulty, MobileExamLevel, MobileQuestion } from "./types";

const DIFFICULTY: Record<MobileDifficulty, Difficulty> = {
  basic: "easy",
  intermediate: "medium",
  advanced: "hard",
};

const EXAM: Record<MobileExamLevel, ExamId> = {
  provisional: "b",
  level1: "l1",
  level2: "l2",
  level3: "l3",
  redseal: "ip",
};

const LOCKED_CHOICE =
  /all of the above|none of the above|both [a-d] and [a-d]/i;

export function mobileIdNumber(id: string): number {
  const match = /^MC-(\d{4})$/.exec(id);
  if (!match) {
    throw new Error(`Mobile question id must look like MC-0001, got ${id}`);
  }
  const n = Number(match[1]);
  if (n < 1) throw new Error(`Mobile question id ${id} is not sequential`);
  return n;
}

export function nextMobileId(existing: { id: string }[]): string {
  const max = existing.reduce((m, q) => Math.max(m, mobileIdNumber(q.id)), 0);
  return `MC-${String(max + 1).padStart(4, "0")}`;
}

export function toQuizQuestion(q: MobileQuestion): Question {
  if (q.correctAnswer < 0 || q.correctAnswer >= q.choices.length) {
    throw new Error(`${q.id} has an out-of-range correctAnswer`);
  }
  return {
    id: mobileIdNumber(q.id),
    code: q.id,
    question: q.question,
    options: q.choices.map((text, i) => ({
      id: String(i),
      text,
      explanation: i === q.correctAnswer ? q.explanation : "",
    })),
    correctAnswer: String(q.correctAnswer),
    category: q.category,
    subcategory: q.subcategory,
    difficulty: DIFFICULTY[q.difficulty],
    exams: q.examLevels.map((level) => EXAM[level]),
    mwa: q.redSealMWA ?? undefined,
    src: q.reference || undefined,
    calculation: q.calculation,
    sourceVerified: q.sourceVerified,
    tags: q.tags,
    sourceName: q.sourceName,
    sourceUrl: q.sourceUrl,
  };
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function canShuffleChoices(q: Question): boolean {
  return !q.options.some((opt) => LOCKED_CHOICE.test(opt.text));
}

/** Shuffle display order. Option ids stay mapped to the original correct index. */
export function shuffleQuestionChoices(q: Question): Question {
  if (!canShuffleChoices(q)) return q;
  return { ...q, options: shuffle(q.options) };
}

export function shufflePaper(questions: Question[]): Question[] {
  return shuffle(questions).map(shuffleQuestionChoices);
}

export function assertMobileBank(items: MobileQuestion[]) {
  const seen = new Set<string>();
  items.forEach((q, i) => {
    if (q.discipline !== "mobile") {
      throw new Error(`${q.id} must have discipline "mobile"`);
    }
    if (seen.has(q.id)) throw new Error(`Duplicate Mobile question id ${q.id}`);
    seen.add(q.id);
    if (mobileIdNumber(q.id) !== i + 1) {
      throw new Error(`Mobile ids must stay sequential; expected MC-${String(i + 1).padStart(4, "0")}, got ${q.id}`);
    }
    if (q.choices.length < 2) throw new Error(`${q.id} needs choices`);
    if (!q.explanation.trim()) throw new Error(`${q.id} needs an explanation`);
    if (q.sourceVerified && !q.reference.trim()) {
      throw new Error(`${q.id} is sourceVerified but has no reference`);
    }
  });
}
