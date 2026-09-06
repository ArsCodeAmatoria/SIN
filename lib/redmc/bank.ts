import { RIGGING_CHARTS, riggingChartPdfHref, riggingChartQuestions } from "@/lib/rigging-charts";
import type { LoadChart } from "@/lib/redtc/bank";
import type { Question } from "@/lib/redtc/types";
import { MOBILE_QUESTIONS } from "./questions/index";
import { toQuizQuestion } from "./to-quiz";
import type { MobileQuestion } from "./types";

export { RIGGING_CHARTS, riggingChartPdfHref };

export type ComingSoonMaker = {
  id: string;
  name: string;
  note: string;
};

export const CHARTS: LoadChart[] = [
  {
    id: "grove-rt880e",
    name: "Grove RT880E",
    manufacturer: "Grove",
    model: "RT880E",
    type: "rough-terrain",
    pdfFile: "grove-rt880e.pdf",
    description:
      "80 US ton hydraulic rough-terrain. Outrigger, on-rubber, pick-and-carry, and boom-extension charts. Hydraulic 80 t class.",
    specifications: {
      maxCapacity: "80 USt (72.6 t)",
      maxJibLength: "41.3–128 ft main boom",
    },
    questions: [],
  },
  {
    id: "tadano-gr-800xl-4",
    name: "Tadano GR-800XL-4",
    manufacturer: "Tadano",
    model: "GR-800XL-4",
    type: "rough-terrain",
    pdfFile: "tadano-gr-800xl-4.pdf",
    description:
      "80 US ton hydraulic rough-terrain. Outrigger spread, on-rubber, and jib-offset charts. Hydraulic 80 t class.",
    specifications: {
      maxCapacity: "80 USt (72.6 t)",
      maxJibLength: "39.4–154.2 ft boom, 58.1 ft jib",
    },
    questions: [],
  },
  {
    id: "terex-rt-670",
    name: "Terex RT 670",
    manufacturer: "Terex",
    model: "RT 670",
    type: "rough-terrain",
    pdfFile: "terex-rt-670.pdf",
    description:
      "70 US ton hydraulic rough-terrain. Main-boom charts at 100% and 0% outriggers, 33 ft and 57 ft jibs, and on-tires.",
    specifications: {
      maxCapacity: "70 USt (63.5 t)",
      maxJibLength: "36–111 ft main boom, 57 ft jib",
      maxHoistHeight: "170 ft",
    },
    questions: [],
  },
  {
    id: "liebherr-ltm-1100-5-3",
    name: "Liebherr LTM 1100-5.3",
    manufacturer: "Liebherr",
    model: "LTM 1100-5.3",
    type: "all-terrain",
    pdfFile: "liebherr-ltm-1100-5-3.pdf",
    description:
      "100 t hydraulic all-terrain. Unlimited hydraulic class. Main boom, VarioBase, VarioBallast, and jib charts.",
    specifications: {
      maxCapacity: "100 t",
      maxJibLength: "12.9–62 m telescopic boom",
      maxHoistHeight: "76 m",
    },
    questions: [],
  },
  {
    id: "linkbelt-298-series-2",
    name: "Link-Belt 298 Series 2",
    manufacturer: "Link-Belt",
    model: "298 Series 2",
    type: "lattice-crawler",
    pdfFile: "linkbelt-298-series-2.pdf",
    description:
      "250 US ton lattice-boom crawler. Main-boom and jib working-range diagrams and 360° lift charts.",
    specifications: {
      maxCapacity: "250 USt (226.8 t)",
      maxJibLength: "Main boom and jib attachments",
    },
    questions: [],
  },
  {
    id: "liebherr-lr-1300",
    name: "Liebherr LR 1300",
    manufacturer: "Liebherr",
    model: "LR 1300",
    type: "lattice-crawler",
    pdfFile: "liebherr-lr-1300.pdf",
    description:
      "300 t lattice-boom crawler. Main-boom, L-boom, and luffing-jib lift charts with counterweight combinations.",
    specifications: {
      maxCapacity: "300 t (331 USt)",
      maxJibLength: "66–322 ft main boom",
    },
    questions: [],
  },
  {
    id: "manitowoc-14000",
    name: "Manitowoc 14000",
    manufacturer: "Manitowoc",
    model: "14000",
    type: "lattice-crawler",
    pdfFile: "manitowoc-14000.pdf",
    description:
      "220 US ton lattice-boom crawler. Heavy-lift main boom, fixed jib, and luffing-jib range and load charts.",
    specifications: {
      maxCapacity: "220 USt (200 t)",
      maxJibLength: "292 ft heavy-lift boom",
    },
    questions: [],
  },
];

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
    "Practice for your B.C. Red Seal Mobile Crane Operator exam. Tagged to BC provisional, SkilledTradesBC Level 1 and 3, the 110-question Interprovincial exam (2021 RSOS), and manufacturer load charts as they are added.",
} as const;
