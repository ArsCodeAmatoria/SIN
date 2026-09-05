export type MobileDifficulty = "basic" | "intermediate" | "advanced";

export type MobileExamLevel =
  | "provisional"
  | "level1"
  | "level2"
  | "level3"
  | "redseal";

export type MobileMwa = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type MobileQuestion = {
  id: string;
  discipline: "mobile";
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  subcategory?: string;
  difficulty: MobileDifficulty;
  examLevels: MobileExamLevel[];
  redSealMWA: MobileMwa | null;
  tags: string[];
  /** Citation shown after the answer, e.g. "WorkSafeBC OHSR 14.69" */
  reference: string;
  sourceName?: string;
  sourceUrl?: string;
  chartId: string | null;
  calculation: boolean;
  sourceVerified: boolean;
};

export const MOBILE_DIFFICULTIES: MobileDifficulty[] = [
  "basic",
  "intermediate",
  "advanced",
];

export const MOBILE_EXAM_LEVELS: MobileExamLevel[] = [
  "provisional",
  "level1",
  "level2",
  "level3",
  "redseal",
];

export const MOBILE_MWA: { letter: MobileMwa; name: string }[] = [
  { letter: "A", name: "Performs common occupational skills" },
  { letter: "B", name: "Performs hoisting calculations" },
  { letter: "C", name: "Inspects and maintains crane" },
  { letter: "D", name: "Performs rigging" },
  { letter: "E", name: "Plans lift, prepares site and sets up crane" },
  { letter: "F", name: "Assembles, disassembles and transports crane" },
  { letter: "G", name: "Operates crane" },
];
