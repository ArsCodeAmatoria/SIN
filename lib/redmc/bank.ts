import type { LoadChart } from "@/lib/redtc/bank";
import type { Question } from "@/lib/redtc/types";
import { MOBILE_QUESTIONS } from "./questions/index";
import { toQuizQuestion } from "./to-quiz";
import type { MobileQuestion } from "./types";

export type ComingSoonMaker = {
  id: string;
  name: string;
  note: string;
};

export const CHARTS: LoadChart[] = [];

export const CHART_MAKERS: ComingSoonMaker[] = [
  { id: "liebherr", name: "Liebherr", note: "All-terrain and rough-terrain charts — coming soon." },
  { id: "grove", name: "Grove", note: "Coming soon. Capacities will only be added from a real chart." },
  { id: "tadano", name: "Tadano", note: "Coming soon." },
  { id: "terex-demag", name: "Terex / Demag", note: "Coming soon." },
  { id: "link-belt", name: "Link-Belt", note: "Coming soon." },
  { id: "manitowoc", name: "Manitowoc", note: "Coming soon." },
];

export function mobileSourceQuestions(): MobileQuestion[] {
  return MOBILE_QUESTIONS;
}

export function theoryQuestions(): Question[] {
  return MOBILE_QUESTIONS.map(toQuizQuestion);
}

export function chartQuestions(offset = 30000): Question[] {
  let id = offset;
  return CHARTS.flatMap((chart) =>
    chart.questions.map((q) => ({
      ...q,
      id: id++,
      category: `Load Chart: ${chart.name}`,
      chartPdf: chart.pdfFile,
      chartName: chart.name,
    })),
  );
}

export function allQuestions(chartOffset = 30000): Question[] {
  return [...theoryQuestions(), ...chartQuestions(chartOffset)];
}

export function chartPdfHref(pdfFile: string) {
  return `/redmc/charts/${pdfFile}`;
}

export const REDMC_NAV = [
  { href: "/redmc", label: "INDEX", num: "00" },
  { href: "/redmc/test", label: "PRACTICE", num: "01" },
  { href: "/redmc/test/master", label: "MASTER", num: "02" },
  { href: "/redmc/load-charts", label: "CHARTS", num: "03" },
  { href: "/redmc/test/review", label: "REVIEW", num: "04" },
] as const;

export const REDMC_PROGRESS_KEY = "redmc-progress";
export const REDMC_SEEN_KEY = "redmc-seen-questions";

export const REDMC = {
  name: "REDMC",
  kicker: "RED SEAL PRACTICE",
  dek: "Practice for BC Mobile Crane Operator certification and the Red Seal Mobile Crane Operator exam — calculations, regulations, rigging, and manufacturer-style load charts.",
  description:
    "Practice for your B.C. Red Seal Mobile Crane Operator exam. Tagged to BC provisional, SkilledTradesBC Level 1 and 3, the 110-question Interprovincial exam (2021 RSOS), and manufacturer load charts as they are added.",
} as const;
