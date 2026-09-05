import type { ExamId, Question } from "@/lib/redtc/types";
import type { ExamTrack } from "@/lib/redtc/exam-tracks";
import { shufflePaper } from "./to-quiz";

export const MOBILE_EXAM_LABELS: Record<ExamId, string> = {
  b: "BC Provisional",
  l1: "Level 1 SLE",
  l2: "Level 2 technical",
  l3: "Level 3 SLE",
  ip: "Red Seal IP",
  lcr: "Load charts",
};

export const MOBILE_EXAM_SHORT: Record<ExamId, string> = {
  b: "Provisional",
  l1: "Level 1",
  l2: "Level 2",
  l3: "Level 3",
  ip: "Red Seal",
  lcr: "Charts",
};

export const MOBILE_EXAM_TRACKS: ExamTrack[] = [
  {
    id: "practice",
    title: "Quick Practice",
    subtitle: "Mixed bank",
    questions: 10,
    minutes: null,
    passPercent: 70,
    body: "10 random questions from the Mobile Crane bank.",
  },
  {
    id: "b",
    title: "BC Provisional",
    subtitle: "Fulford / BC Crane Safety",
    questions: 40,
    minutes: 90,
    passPercent: 70,
    body: "Provisional theory so you can operate under a written supervision plan. Tagged questions only — the bank grows as items are added.",
  },
  {
    id: "l1",
    title: "Level 1 SLE",
    subtitle: "SkilledTradesBC",
    questions: 50,
    minutes: null,
    passPercent: 70,
    body: "Shared Level 1 with Tower Crane Operator: 210 hours technical training, then the Level 1 Standardized Level Exam. 70%. No code book.",
  },
  {
    id: "l2",
    title: "Level 2 technical",
    subtitle: "140 hours",
    questions: 50,
    minutes: null,
    passPercent: 70,
    body: "Level 2 is technical training (140 hours). There is no separate Level 2 SLE. Use this paper for Level 2 topics while that bank is built.",
  },
  {
    id: "l3",
    title: "Level 3 SLE",
    subtitle: "SkilledTradesBC",
    questions: 50,
    minutes: null,
    passPercent: 70,
    body: "Level 3: 70 hours technical training and the Level 3 Standardized Level Exam. 70%. Level 1 SLE is required before Level 3 SLE.",
  },
  {
    id: "ip",
    title: "Red Seal IP",
    subtitle: "110 questions · 2021 RSOS",
    questions: 110,
    minutes: 240,
    passPercent: 70,
    body: "110 multiple-choice questions weighted to the 2021 Mobile Crane Operator RSOS. Closed book. Sit the dedicated Master Exam for the official distribution.",
  },
  {
    id: "lcr",
    title: "Load charts",
    subtitle: "Manufacturer PDFs",
    questions: 10,
    minutes: 45,
    passPercent: 70,
    body: "Chart sets are coming soon. This track stays empty until a manufacturer PDF and questions are supplied — capacities are not invented here.",
  },
];

export type MobilePracticeMode =
  | "practice"
  | "category"
  | "exam"
  | "calculation"
  | "mwa";

export const MOBILE_PRACTICE_MODES: {
  id: MobilePracticeMode;
  title: string;
  subtitle: string;
  body: string;
}[] = [
  {
    id: "practice",
    title: "Quick Practice",
    subtitle: "10 mixed questions",
    body: "10 random questions from the Mobile Crane bank.",
  },
  {
    id: "category",
    title: "Category Practice",
    subtitle: "Choose a topic",
    body: "Practice one Mobile Crane category. Paper size is the questions in that category, up to 10.",
  },
  {
    id: "exam",
    title: "Exam-Level Practice",
    subtitle: "Provisional through Red Seal",
    body: "Sit a paper tagged to BC Provisional, Level 1, Level 2, Level 3, or Red Seal.",
  },
  {
    id: "calculation",
    title: "Calculation Practice",
    subtitle: "Working numbers",
    body: "Only questions tagged as calculations. Formula, values, working, and the limiting reminder are in the explanation.",
  },
  {
    id: "mwa",
    title: "Red Seal MWA Practice",
    subtitle: "Major Work Activities A–G",
    body: "Practice one 2021 RSOS Major Work Activity.",
  },
];

export const MOBILE_EXAM_LEVEL_TRACKS = MOBILE_EXAM_TRACKS.filter(
  (item) => item.id !== "practice",
);

/** Official 2021 RSOS Interprovincial breakdown (110 questions). */
export const MOBILE_RSOS_MWA: {
  letter: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  name: string;
  count: number;
}[] = [
  { letter: "A", name: "Performs common occupational skills", count: 7 },
  { letter: "B", name: "Performs hoisting calculations", count: 20 },
  { letter: "C", name: "Inspects and maintains crane", count: 14 },
  { letter: "D", name: "Performs rigging", count: 13 },
  { letter: "E", name: "Plans lift, prepares site and sets up crane", count: 16 },
  { letter: "F", name: "Assembles, disassembles and transports crane", count: 15 },
  { letter: "G", name: "Operates crane", count: 25 },
];

export const MOBILE_RSOS_TASKS: {
  id: string;
  mwa: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  name: string;
  count: number;
}[] = [
  { id: "A-1", mwa: "A", name: "Performs safety-related functions", count: 4 },
  { id: "A-2", mwa: "A", name: "Uses communication and mentoring techniques", count: 3 },
  { id: "B-3", mwa: "B", name: "Determines load weights", count: 6 },
  { id: "B-4", mwa: "B", name: "Calculates crane capacity", count: 8 },
  { id: "B-5", mwa: "B", name: "Performs rigging calculations", count: 6 },
  { id: "C-6", mwa: "C", name: "Performs pre-operational checks and regular inspections", count: 6 },
  { id: "C-7", mwa: "C", name: "Performs operational and continual checks", count: 5 },
  { id: "C-8", mwa: "C", name: "Performs minor crane maintenance", count: 3 },
  { id: "D-9", mwa: "D", name: "Inspects, maintains and stores slings and hardware", count: 6 },
  { id: "D-10", mwa: "D", name: "Follows rigging procedures", count: 7 },
  { id: "E-11", mwa: "E", name: "Performs pre-lift planning", count: 9 },
  { id: "E-12", mwa: "E", name: "Sets up crane", count: 7 },
  { id: "F-13", mwa: "F", name: "Loads and unloads components for transport", count: 3 },
  { id: "F-14", mwa: "F", name: "Drives cranes on public roadways", count: 2 },
  { id: "F-15", mwa: "F", name: "Assembles and disassembles lattice boom cranes", count: 4 },
  { id: "F-16", mwa: "F", name: "Assembles and disassembles telescopic boom cranes", count: 4 },
  { id: "F-17", mwa: "F", name: "Assembles and disassembles specialty equipment and attachments", count: 2 },
  { id: "G-18", mwa: "G", name: "Performs common craning operations", count: 5 },
  { id: "G-19", mwa: "G", name: "Operates friction drive lattice boom cranes", count: 2 },
  { id: "G-20", mwa: "G", name: "Operates hydraulic drive lattice boom cranes", count: 6 },
  { id: "G-21", mwa: "G", name: "Operates telescopic boom cranes", count: 5 },
  { id: "G-22", mwa: "G", name: "Performs specialty craning operations", count: 4 },
  { id: "G-23", mwa: "G", name: "Secures crane", count: 3 },
];

export const MASTER_QUESTIONS = 110;
export const MASTER_PASS = 70;

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function parseMobileRsosTask(q: Question): string | null {
  const raw = q.rsos || "";
  const match = raw.match(/[A-G]-\d+/);
  return match ? match[0] : null;
}

export function mobileMwaLetter(q: Question): string | null {
  const task = parseMobileRsosTask(q);
  if (task) return task[0];
  return q.mwa || null;
}

function takeFrom(candidates: Question[], count: number, used: Set<number>): Question[] {
  const out: Question[] = [];
  for (const q of shuffle(candidates)) {
    if (out.length >= count) break;
    if (used.has(q.id)) continue;
    out.push(q);
    used.add(q.id);
  }
  return out;
}

/** Weighted 110-question paper. Uses every tagged item available; does not invent questions. */
export function selectMobileIpPaper(all: Question[]): Question[] {
  const pool = all.filter((q) => q.exams?.includes("ip"));
  const source = pool.length ? pool : all;
  const used = new Set<number>();
  const picked: Question[] = [];

  for (const task of MOBILE_RSOS_TASKS) {
    const exact = source.filter((q) => parseMobileRsosTask(q) === task.id && !used.has(q.id));
    let batch = takeFrom(exact, task.count, used);
    if (batch.length < task.count) {
      batch.push(
        ...takeFrom(
          source.filter((q) => !used.has(q.id) && mobileMwaLetter(q) === task.mwa),
          task.count - batch.length,
          used,
        ),
      );
    }
    picked.push(...batch);
  }

  if (picked.length < MASTER_QUESTIONS) {
    picked.push(...takeFrom(source, MASTER_QUESTIONS - picked.length, used));
  }
  if (picked.length < MASTER_QUESTIONS) {
    picked.push(...takeFrom(all, MASTER_QUESTIONS - picked.length, used));
  }

  return shufflePaper(picked).slice(0, MASTER_QUESTIONS);
}

export function scoreMobileByMwa(
  questions: Question[],
  answers: Record<number, { isCorrect: boolean }>,
) {
  return MOBILE_RSOS_MWA.map((block) => {
    const inBlock = questions.filter((q) => mobileMwaLetter(q) === block.letter);
    const correct = inBlock.filter((q) => answers[q.id]?.isCorrect).length;
    return {
      letter: block.letter,
      name: block.name,
      count: inBlock.length,
      correct,
    };
  });
}

export function mobileTrackAvailable(
  all: Question[],
  trackId: ExamTrack["id"],
): number {
  if (trackId === "practice") return Math.min(10, all.length);
  if (trackId === "lcr") return Math.min(10, all.filter((q) => q.chartPdf).length);
  if (trackId === "ip") return Math.min(MASTER_QUESTIONS, all.length);
  const exam = trackId as ExamId;
  const tagged = all.filter((q) => q.exams?.includes(exam));
  const size = MOBILE_EXAM_TRACKS.find((t) => t.id === trackId)?.questions || 50;
  return Math.min(size, tagged.length);
}

export function mobilePracticeAvailable(
  all: Question[],
  mode: MobilePracticeMode,
  opts?: { exam?: ExamId; category?: string; mwa?: string },
): number {
  if (mode === "practice") return Math.min(10, all.length);
  if (mode === "calculation") {
    return Math.min(10, all.filter((q) => q.calculation).length);
  }
  if (mode === "category") {
    if (!opts?.category) return 0;
    return Math.min(10, all.filter((q) => q.category === opts.category).length);
  }
  if (mode === "mwa") {
    if (!opts?.mwa) return 0;
    return Math.min(
      10,
      all.filter((q) => q.mwa === opts.mwa || q.rsos?.startsWith(`${opts.mwa}-`)).length,
    );
  }
  if (!opts?.exam) return 0;
  return mobileTrackAvailable(all, opts.exam);
}

export function selectMobileTrackQuestions(
  all: Question[],
  trackId: ExamTrack["id"],
): Question[] {
  if (trackId === "practice") return shufflePaper(all.slice()).slice(0, Math.min(10, all.length));
  if (trackId === "ip") return shufflePaper(selectMobileIpPaper(all));
  if (trackId === "lcr") {
    return shufflePaper(all.filter((q) => q.chartPdf)).slice(0, 10);
  }
  const exam = trackId as ExamId;
  const tagged = all.filter((q) => q.exams?.includes(exam));
  const size = MOBILE_EXAM_TRACKS.find((t) => t.id === trackId)?.questions || 50;
  return shufflePaper(tagged).slice(0, Math.min(size, tagged.length));
}

export function selectMobilePracticeQuestions(
  all: Question[],
  mode: MobilePracticeMode,
  opts?: { exam?: ExamId; category?: string; mwa?: string },
): Question[] {
  if (mode === "practice") return selectMobileTrackQuestions(all, "practice");
  if (mode === "calculation") {
    return shufflePaper(all.filter((q) => q.calculation)).slice(0, 10);
  }
  if (mode === "category" && opts?.category) {
    return shufflePaper(all.filter((q) => q.category === opts.category)).slice(0, 10);
  }
  if (mode === "mwa" && opts?.mwa) {
    return shufflePaper(
      all.filter((q) => q.mwa === opts.mwa || q.rsos?.startsWith(`${opts.mwa}-`)),
    ).slice(0, 10);
  }
  if (mode === "exam" && opts?.exam) {
    return selectMobileTrackQuestions(all, opts.exam);
  }
  return [];
}
