import loadChartData from "./load-chart-questions.json";
import questionsData from "./questions.json";
import type { Question } from "./types";

export type ChartSpec = {
  maxCapacity?: string;
  maxJibLength?: string;
  tipCapacity?: string;
  maxHoistHeight?: string;
  maxTowerHeight?: string;
  loadMoment?: string;
};

export type LoadChart = {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  type?: string;
  pdfFile: string;
  description: string;
  specifications?: ChartSpec;
  questions: Question[];
};

export const CHARTS = loadChartData.charts as LoadChart[];

export function theoryQuestions(): Question[] {
  return questionsData as Question[];
}

export function chartQuestions(offset = 20000): Question[] {
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

export function allQuestions(chartOffset = 20000): Question[] {
  return [...theoryQuestions(), ...chartQuestions(chartOffset)];
}

export function chartPdfHref(pdfFile: string, base = "/redtc/charts") {
  return `${base}/${pdfFile}`;
}

export const REDTC_NAV = [
  { href: "/redtc", label: "INDEX", num: "00" },
  { href: "/redtc/test", label: "PRACTICE", num: "01" },
  { href: "/redtc/test/master", label: "MASTER", num: "02" },
  { href: "/redtc/load-charts", label: "CHARTS", num: "03" },
  { href: "/redtc/test/review", label: "REVIEW", num: "04" },
] as const;

export const REDTC = {
  name: "REDTC",
  kicker: "RED SEAL PRACTICE",
  dek: "Practice with questions tagged to Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and the load-chart practical — WorkSafeBC Part 14 and Part 15.",
  description:
    "Practice for your B.C. Red Seal Tower Crane Operator exam with tagged questions for Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and real manufacturer load charts.",
} as const;
