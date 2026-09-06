import { RIGGING_CHARTS, riggingChartPdfHref, riggingChartQuestions } from "@/lib/rigging-charts";
import type { LoadChart } from "@/lib/redtc/bank";
import type { Question } from "@/lib/redtc/types";
import loadChartData from "./load-chart-questions.json";
import { MOBILE_QUESTIONS } from "./questions/index";
import { toQuizQuestion } from "./to-quiz";
import type { MobileQuestion } from "./types";

export { RIGGING_CHARTS, riggingChartPdfHref };

export type ComingSoonMaker = {
  id: string;
  name: string;
  note: string;
};

export const CHARTS = loadChartData.charts as LoadChart[];

export const CHART_MAKERS: ComingSoonMaker[] = [
  { id: "demag", name: "Demag", note: "Coming soon." },
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
      chartKind: "load" as const,
    })),
  );
}

export function allQuestions(chartOffset = 30000): Question[] {
  return [
    ...theoryQuestions(),
    ...chartQuestions(chartOffset),
    ...riggingChartQuestions(40000),
  ];
}

export function chartPdfHref(pdfFile: string) {
  if (pdfFile.startsWith("/")) return pdfFile;
  return `/redmc/charts/${pdfFile}`;
}

export const REDMC_NAV = [
  { href: "/redmc", label: "INDEX", num: "00" },
  { href: "/redmc/test", label: "PRACTICE", num: "01" },
  { href: "/redmc/test/master", label: "MASTER", num: "02" },
  { href: "/redmc/load-charts", label: "CHARTS", num: "03" },
  { href: "/redmc/rigging-charts", label: "RIGGING", num: "04" },
  { href: "/redmc/test/review", label: "REVIEW", num: "05" },
] as const;

export const REDMC_PROGRESS_KEY = "redmc-progress";
export const REDMC_SEEN_KEY = "redmc-seen-questions";

export const REDMC = {
  name: "REDMC",
  kicker: "RED SEAL PRACTICE",
  dek: "Practice for BC Mobile Crane Operator certification and the Red Seal Mobile Crane Operator exam — calculations, regulations, rigging, and manufacturer-style load charts.",
  description:
    "Practice for your B.C. Red Seal Mobile Crane Operator exam. Tagged to BC provisional, SkilledTradesBC Level 1 and 3, the 110-question Interprovincial exam (2021 RSOS), manufacturer load charts, and BCACS sling charts.",
} as const;
