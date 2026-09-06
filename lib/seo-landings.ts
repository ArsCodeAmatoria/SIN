import { FULFORD_B_SECTIONS } from "@/lib/redtc/exam-tracks";
import { REDTC_CHART_MODELS, REDTC_EXAM_TOPICS } from "@/lib/redtc/copy";

const TOWER = { name: "REDTC", path: "/redtc" } as const;
const MOBILE = { name: "REDMC", path: "/redmc" } as const;

export type SeoLanding = {
  slug: string;
  title: string;
  description: string;
  kicker: string;
  crumb: string;
  cluster: { name: string; path: string };
  kind: "practice" | "guide";
  h1: string[];
  lede: string;
  facts: { label: string; value: string; note: string }[];
  sections: { heading: string; body: string; list?: string[] }[];
  faq: { q: string; a: string }[];
  practiceHref: string;
  practiceLabel: string;
  related: { href: string; label: string }[];
};

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: "tower-crane-red-seal-practice-test",
    title: "Tower Crane Red Seal Practice Test BC | REDTC",
    description:
      "Free BC Tower Crane Operator Red Seal practice. Tagged questions for the Interprovincial exam, Level B, Level 1 and Level 2, plus manufacturer load charts.",
    kicker: "REDTC — RED SEAL IP",
    crumb: "Red Seal practice test",
    cluster: TOWER,
    kind: "practice",
    h1: ["TOWER CRANE", "RED SEAL", "PRACTICE."],
    lede: "The Interprovincial Red Seal for Tower Crane Operator is a closed-book 100-question paper. Practice it here, then sit the same 70% bar as SkilledTradesBC.",
    facts: [
      { label: "Official paper", value: "100", note: "Questions · 2023 RSOS" },
      { label: "Time", value: "4:00", note: "Hours on the sitting" },
      { label: "Pass", value: "70%", note: "70/100 required" },
    ],
    sections: [
      {
        heading: "What the Red Seal paper actually is",
        body: "In British Columbia you sit the Tower Crane Operator Interprovincial exam through SkilledTradesBC after Level 1 SLE. It is 100 multiple-choice questions in four hours, weighted to the 2023 Red Seal Occupational Standard: occupational skills, inspection, set-up and lift planning, rigging, and operation. No code book. Formulas and acronyms are on the sheet.",
      },
      {
        heading: "Practice without inventing the exam",
        body: "REDTC is the practice bank — tagged questions, explanations after you answer, and a closed-book Master Exam that follows the official distribution. Load-chart items open real manufacturer PDFs. Counts are real items, not placeholders.",
      },
      {
        heading: "How the 100-question paper is weighted",
        body: "The 2023 Red Seal Occupational Standard weights the Interprovincial exam across five Major Work Activities. Practice follows that split; it is not a leaked copy of the sitting.",
        list: REDTC_EXAM_TOPICS.map(
          (item) => `${item.topic} — ${item.percentage}%`,
        ),
      },
    ],
    faq: [
      {
        q: "Is this the official Red Seal exam?",
        a: "No. It is practice for the official sitting. The Interprovincial exam is delivered by SkilledTradesBC. 70% still passes here.",
      },
      {
        q: "Do I need Level 1 before the IP?",
        a: "In B.C., Level 1 SLE is required before you sit the Interprovincial Red Seal paper. Register with BC Crane Safety first.",
      },
    ],
    practiceHref: "/redtc/test/master",
    practiceLabel: "Sit the Master Exam",
    related: [
      { href: "/redtc", label: "Tower Crane Red Seal practice tests" },
      { href: "/tower-crane-certification-bc", label: "BC certification path" },
      { href: "/tower-crane-load-chart-practice", label: "Load chart practice" },
      { href: "/wire/the-hardest-questions-on-the-tower-crane-red-seal-exam", label: "Hardest Red Seal questions" },
    ],
  },
  {
    slug: "tower-crane-level-b-exam-bc",
    title: "Tower Crane Level B Exam BC | REDTC",
    description:
      "Free Fulford Level B / BC Crane Safety Core Theory practice for Tower Crane Operator. 40-question provisional paper, 70% to pass.",
    kicker: "REDTC — LEVEL B",
    crumb: "Level B exam",
    cluster: TOWER,
    kind: "practice",
    h1: ["LEVEL B.", "PROVISIONAL", "THEORY."],
    lede: "Level B is the Fulford core theory that lets you operate a tower crane in B.C. under a written supervision plan. Forty questions. 70% to pass. Fifteen sections.",
    facts: [
      { label: "Paper", value: "40", note: "Questions" },
      { label: "Time", value: "90", note: "Minutes" },
      { label: "Pass", value: "70%", note: "28 correct" },
    ],
    sections: [
      {
        heading: "What Level B is for",
        body: "BC Crane Safety requires registration before you train or operate. Fulford’s Level B provisional theory is the written gate so you can log hours under supervision. It is not the Red Seal and it is not Level 1 SLE. Sections cover regulations, energized systems, signals, gross and net capacity, inspection, work platforms, rigging, weights, centre of gravity, tag lines, and ordinary and critical lift planning.",
      },
      {
        heading: "Practice the same 15 sections",
        body: "REDTC tags questions to the BC Crane Safety Core Theory layout. Start the Level B paper in the practice room. Explanations come after you answer. Then read Proven for the procedures the questions assume you will follow on site.",
      },
      {
        heading: "What is tested",
        body: "Forty questions. The points are not equal — sling charts and load weight carry more of the paper than tag lines.",
        list: FULFORD_B_SECTIONS.map(
          (section) =>
            `${section.id}. ${section.name} — ${section.points} point${section.points === 1 ? "" : "s"}`,
        ),
      },
      {
        heading: "Level B is not Level 1",
        body: "Level B is Fulford provisional theory so you can operate under a written supervision plan. Level 1 SLE is the first SkilledTradesBC apprenticeship exam after 175 hours of technical training. You can hold Level B and still have Level 1, Level 2, the Red Seal and a practical ahead of you.",
      },
    ],
    faq: [
      {
        q: "Who delivers Level B?",
        a: "Fulford Certification, as testing partner for BC Crane Safety. This site is practice, not the sitting.",
      },
      {
        q: "Can I operate after Level B?",
        a: "Under a written supervision plan, yes — that is what provisional status is for. Full-scope certification still needs the apprenticeship path, SLEs, Red Seal, and a practical assessment.",
      },
    ],
    practiceHref: "/redtc/test",
    practiceLabel: "Start Level B practice",
    related: [
      { href: "/redtc", label: "Tower Crane Red Seal practice tests" },
      { href: "/tower-crane-certification-bc", label: "BC certification path" },
      { href: "/tower-crane-level-1-practice-test", label: "Level 1 SLE" },
    ],
  },
  {
    slug: "tower-crane-level-1-practice-test",
    title: "Tower Crane Level 1 Practice Test BC | REDTC",
    description:
      "Free SkilledTradesBC Tower Crane Operator Level 1 SLE practice. Regulations, rigging, calculations, inspection and ordinary lift planning. 70% to pass.",
    kicker: "REDTC — LEVEL 1 SLE",
    crumb: "Level 1 practice test",
    cluster: TOWER,
    kind: "practice",
    h1: ["LEVEL 1 SLE.", "TOWER CRANE."],
    lede: "SkilledTradesBC Level 1 is the first Standardized Level Exam on the Tower Crane Operator apprenticeship. 70%. No code book.",
    facts: [
      { label: "Paper", value: "50", note: "Practice questions" },
      { label: "Pass", value: "70%", note: "Same as the SLE" },
      { label: "Book", value: "None", note: "Code book not required" },
    ],
    sections: [
      {
        heading: "What Level 1 covers",
        body: "Tower Crane Operator (2024) Level 1 draws on Lines A–H and J1: regulations, crane types, systems, basic rigging, hoisting calculations, inspection, ordinary lift planning, and operations. Technical training for this level is 175 hours. You sit Level 1 before Level 2 and before the Interprovincial Red Seal in B.C.",
      },
      {
        heading: "How to use REDTC for it",
        body: "Open the Level 1 paper in REDTC. Questions are tagged to this exam. Wrong answers explain the miss. Load-chart skill still lives on the manufacturer PDFs — do not interpolate.",
      },
    ],
    faq: [
      {
        q: "Is Level 1 the Red Seal?",
        a: "No. Level 1 SLE is a SkilledTradesBC apprenticeship exam. The Red Seal IP is a separate 100-question paper after Level 1.",
      },
    ],
    practiceHref: "/redtc/test",
    practiceLabel: "Start Level 1 practice",
    related: [
      { href: "/redtc", label: "Tower Crane Red Seal practice tests" },
      { href: "/tower-crane-level-2-practice-test", label: "Level 2 SLE" },
      { href: "/tower-crane-red-seal-practice-test", label: "Red Seal IP" },
    ],
  },
  {
    slug: "tower-crane-level-2-practice-test",
    title: "Tower Crane Level 2 Practice Test BC | REDTC",
    description:
      "Free SkilledTradesBC Tower Crane Operator Level 2 SLE practice covering advanced rigging, climbing, critical lifts and specialty operations.",
    kicker: "REDTC — LEVEL 2 SLE",
    crumb: "Level 2 practice test",
    cluster: TOWER,
    kind: "practice",
    h1: ["LEVEL 2 SLE.", "CLIMBING AND", "CRITICAL LIFTS."],
    lede: "Level 2 is the second Standardized Level Exam. Communications, advanced rigging, engineered lifts, climbing and reconfiguration, self-erect assembly, specialty operations.",
    facts: [
      { label: "Paper", value: "50", note: "Practice questions" },
      { label: "Pass", value: "70%", note: "Level 1 first" },
      { label: "Training", value: "140", note: "Technical hours" },
    ],
    sections: [
      {
        heading: "What changes at Level 2",
        body: "Level 1 is ordinary work. Level 2 is the work that changes the crane or the plan: climbing and reconfiguration, self-erect assembly, engineered and multiple-crane lifts, suspended platforms. 140 hours of technical training. Level 1 SLE is required before Level 2.",
      },
      {
        heading: "Practice, then read the climb",
        body: "REDTC tags Level 2 items in the practice room. For the actual climbing sequence used on site, read the Wire article and the Proven tower erection / climbing / dismantling procedure. The manufacturer’s sequence is the sequence.",
      },
    ],
    faq: [
      {
        q: "Does Level 2 include climbing?",
        a: "Yes — climbing and reconfiguration are Level 2 topics. Practice the questions here. Do not treat a practice bank as the manufacturer’s climbing procedure.",
      },
    ],
    practiceHref: "/redtc/test",
    practiceLabel: "Start Level 2 practice",
    related: [
      { href: "/redtc", label: "Tower Crane Red Seal practice tests" },
      { href: "/wire/tower-crane-climbing-sequence", label: "Climbing sequence" },
      { href: "/safety/swp/tower-erection-climbing", label: "Climbing SWP" },
    ],
  },
  {
    slug: "tower-crane-load-chart-practice",
    title: "Tower Crane Load Chart Practice BC | REDTC",
    description:
      "Practice reading real manufacturer tower crane load charts — Liebherr, Potain, WOLFF, Terex, Krøll and Pecco. Never interpolate.",
    kicker: "REDTC — LOAD CHARTS",
    crumb: "Load chart practice",
    cluster: TOWER,
    kind: "practice",
    h1: ["READ THE", "CHART."],
    lede: "Capacity is on the manufacturer PDF for that serial. Practice the lookup here: radius, jib, reeving, deductions. If the number is between rows, use the worse one.",
    facts: [
      { label: "PDFs", value: "14", note: "Manufacturer charts" },
      { label: "Makers", value: "6", note: "Liebherr to Pecco" },
      { label: "Rule", value: "None", note: "Do not interpolate" },
    ],
    sections: [
      {
        heading: "Why the PDF stays open",
        body: "Fulford’s load-chart and rigging practical is a lookup skill, not a memory skill. REDTC keeps the manufacturer chart on screen while you answer. Flat-top, hammerhead, luffing and self-erecting machines are in the bank. Capacities are not invented.",
      },
      {
        heading: "What you will be asked",
        body: "Gross versus net, hook-block and rigging deductions, parts of line, chart modes, maximum radius for a given load. The same discipline as WorkSafeBC Part 14: the chart for the configuration in front of you.",
      },
      {
        heading: "Six manufacturers, 14 charts",
        body: "Practice copies only. The cab serial chart still wins on the job.",
        list: [
          ...REDTC_CHART_MODELS.flat.map((c) => `${c.name} — ${c.jib} jib · flat-top / hammerhead`),
          ...REDTC_CHART_MODELS.luffing.map((c) => `${c.name} — ${c.jib} jib · luffing`),
          ...REDTC_CHART_MODELS.self.map((c) => `${c.name} — ${c.jib} jib · self-erecting`),
        ],
      },
    ],
    faq: [
      {
        q: "Can I use these charts on a job?",
        a: "No. Practice copies. The cab serial chart and the manufacturer document for that machine win on site.",
      },
    ],
    practiceHref: "/redtc/load-charts",
    practiceLabel: "Open load charts",
    related: [
      { href: "/redtc", label: "Tower Crane Red Seal practice tests" },
      { href: "/redmc/load-charts", label: "Mobile load charts" },
      { href: "/redmc/rigging-charts", label: "Rigging charts" },
    ],
  },
  {
    slug: "tower-crane-certification-bc",
    title: "Tower Crane Certification BC | REDTC",
    description:
      "How Tower Crane Operator certification works in British Columbia: BC Crane Safety, Fulford Level B, SkilledTradesBC apprenticeship, hours, SLEs and the Red Seal.",
    kicker: "BC CRANE SAFETY + SKILLEDTRADESBC",
    crumb: "Certification in B.C.",
    cluster: TOWER,
    kind: "guide",
    h1: ["TOWER CRANE", "CERTIFICATION", "IN B.C."],
    lede: "Register with BC Crane Safety. Get provisional status. Train and log hours. Pass Level 1, Level 2, the Red Seal, and a practical. That is the path. This page is the map — REDTC is the practice.",
    facts: [
      { label: "Technical", value: "315", note: "Hours · 175 + 140" },
      { label: "Work-based", value: "2,685", note: "Hours" },
      { label: "Pass", value: "70%", note: "Written exams" },
    ],
    sections: [
      {
        heading: "Who does what",
        body: "WorkSafeBC writes Part 14 and Part 15. BC Crane Safety administers operator certification in B.C. and Yukon — register before you train or operate. SkilledTradesBC runs the apprenticeship, Standardized Level Exams, and the Red Seal sitting. Fulford is the testing partner for Level B theory and the on-crane practical.",
      },
      {
        heading: "The sequence",
        body: "Register with BC Crane Safety, then enrol with SkilledTradesBC. Pass Fulford Level B so you can operate under a written supervision plan. Complete technical training and 2,685 hours of work-based training, logging crane time in SkillRecord Passport. Pass Level 1 SLE, Level 2 SLE, the Interprovincial Red Seal, and a Fulford practical.",
        list: [
          "Register with BC Crane Safety, then enrol with SkilledTradesBC",
          "Pass Fulford Level B — provisional theory",
          "Train and log hours — 175 + 140 technical, 2,685 work-based",
          "Pass Level 1 SLE",
          "Pass Level 2 SLE",
          "Pass the Interprovincial Red Seal — 100 questions",
          "Pass a Fulford practical assessment",
        ],
      },
    ],
    faq: [
      {
        q: "Does BC Crane Safety deliver the exams?",
        a: "No. They administer certification. SkilledTradesBC delivers the SLEs and the Red Seal sitting. Fulford delivers Level B and the practical.",
      },
      {
        q: "Where do I practice?",
        a: "REDTC. Tagged questions for Level B, Level 1, Level 2, Red Seal IP, and manufacturer load charts.",
      },
    ],
    practiceHref: "/redtc",
    practiceLabel: "Open REDTC",
    related: [
      { href: "/tower-crane-operator-hours-bc", label: "Hours in B.C." },
      { href: "/tower-crane-level-b-exam-bc", label: "Level B" },
      { href: "/tower-crane-red-seal-practice-test", label: "Red Seal IP" },
      { href: "/safety/training-competency", label: "Proven competency" },
    ],
  },
  {
    slug: "tower-crane-operator-hours-bc",
    title: "Tower Crane Operator Hours BC — 2,685 Work-Based | REDTC",
    description:
      "Tower Crane Operator work-based and technical hours in British Columbia: 2,685 WBT, 175 + 140 technical hours, SkillRecord Passport, SkilledTradesBC.",
    kicker: "SKILLEDTRADESBC — HOURS",
    crumb: "Hours in B.C.",
    cluster: TOWER,
    kind: "guide",
    h1: ["2,685 HOURS.", "THEN THE", "PAPER."],
    lede: "Tower Crane Operator in B.C. is not a weekend ticket. Technical training is 175 hours then 140. Work-based training is 2,685 hours. Log crane time in SkillRecord Passport.",
    facts: [
      { label: "Level 1", value: "175", note: "Technical hours" },
      { label: "Level 2", value: "140", note: "Technical hours" },
      { label: "WBT", value: "2,685", note: "Work-based hours" },
    ],
    sections: [
      {
        heading: "What counts",
        body: "SkilledTradesBC sets the apprenticeship hours. Your sponsor reports them in the Portal. Crane-specific time is logged in SkillRecord Passport for BC Crane Safety. A ticket without the hours is not the trade. Provisional operators still work under a written supervision plan while those hours accumulate.",
      },
      {
        heading: "Hours are not the exam",
        body: "The papers are separate: Level B, Level 1 SLE, Level 2 SLE, Red Seal IP, practical. Practice the written work in REDTC. Do not confuse logged time with being ready for the sitting.",
      },
    ],
    faq: [
      {
        q: "Is 2,685 the same as Mobile Crane?",
        a: "No. Mobile Crane Operator work-based training in B.C. is 4,980 hours, with specified operating time on lattice or large hydraulic equipment. Tower is 2,685.",
      },
    ],
    practiceHref: "/redtc",
    practiceLabel: "Practice the exams",
    related: [
      { href: "/tower-crane-certification-bc", label: "Certification path" },
      { href: "/bc-mobile-crane-certification", label: "Mobile hours and path" },
      { href: "/wire/a-ticket-isnt-competency", label: "A ticket isn’t competency" },
    ],
  },
  {
    slug: "mobile-crane-red-seal-practice-test",
    title: "Mobile Crane Red Seal Practice Test BC | REDMC",
    description:
      "Free BC Mobile Crane Operator and Red Seal exam practice covering load charts, rigging, calculations, crane setup, outriggers and WorkSafeBC regulations.",
    kicker: "REDMC — RED SEAL IP",
    crumb: "Red Seal practice test",
    cluster: MOBILE,
    kind: "practice",
    h1: ["MOBILE CRANE", "RED SEAL", "PRACTICE."],
    lede: "The Mobile Crane Operator Interprovincial exam is 110 questions on the 2021 RSOS. Closed book. 70% to pass. Practice it in REDMC — separate from the tower bank.",
    facts: [
      { label: "Official paper", value: "110", note: "Questions · 2021 RSOS" },
      { label: "Time", value: "4:00", note: "Hours on the sitting" },
      { label: "Pass", value: "70%", note: "Same as SkilledTradesBC" },
    ],
    sections: [
      {
        heading: "What this bank is",
        body: "REDMC is Mobile Crane only. Questions are tagged to BC provisional, SkilledTradesBC Level 1 and Level 3, and the 110-question Interprovincial exam. The current practice bank is not a complete one-for-one copy of that 110-question paper. Explanations after you answer. Manufacturer load charts and BCACS rigging figures sit beside the papers as verified questions are added. Capacities are not invented.",
      },
      {
        heading: "Tower stays in REDTC",
        body: "If you need tower climbing, luffing charts, or the 100-question tower IP, that is REDTC. Do not mix the banks. The sitting will not.",
      },
    ],
    faq: [
      {
        q: "Is the mobile IP 100 or 110 questions?",
        a: "110, weighted to the 2021 Mobile Crane Operator RSOS. Tower Crane is 100 questions on the 2023 RSOS. Sit the matching Master Exam.",
      },
    ],
    practiceHref: "/redmc/test/master",
    practiceLabel: "Sit the Master Exam",
    related: [
      { href: "/redmc", label: "REDMC index" },
      { href: "/bc-mobile-crane-certification", label: "BC certification path" },
      { href: "/mobile-crane-load-chart-practice", label: "Load chart practice" },
      { href: "/redmc/rigging-charts", label: "Rigging charts" },
    ],
  },
  {
    slug: "bc-mobile-crane-certification",
    title: "BC Mobile Crane Certification — Path, Hours & Exams | REDMC",
    description:
      "How Mobile Crane Operator certification works in British Columbia: BC Crane Safety, Fulford provisional, 4,980 hours, Level 1 and Level 3 SLEs, Red Seal IP.",
    kicker: "BC CRANE SAFETY + SKILLEDTRADESBC",
    crumb: "Certification in B.C.",
    cluster: MOBILE,
    kind: "guide",
    h1: ["MOBILE CRANE", "CERTIFICATION", "IN B.C."],
    lede: "Register with BC Crane Safety. Pass provisional theory. Log 4,980 hours. Sit Level 1 SLE, Level 3 SLE, and the 110-question Red Seal. Compulsory trade from 5 July 2027.",
    facts: [
      { label: "WBT", value: "4,980", note: "Work-based hours" },
      { label: "Operating", value: "1,600", note: "Hours on the hook" },
      { label: "IP", value: "110", note: "Red Seal questions" },
    ],
    sections: [
      {
        heading: "The path",
        body: "Register with BC Crane Safety, then enrol with SkilledTradesBC. Pass Fulford provisional theory so you can operate under a written supervision plan. Technical training is 12 weeks over three years: Level 1 210 hours, Level 2 140 hours, Level 3 70 hours. There is no separate Level 2 SLE. Level 1 SLE is required before Level 3 SLE and before the IP. 1,600 of the 4,980 hours are operating time, including 400 on specified lattice or greater-than-80 t hydraulic equipment.",
      },
      {
        heading: "Practice in REDMC",
        body: "REDMC holds the mobile questions, manufacturer RT/AT/crawler charts, and BCACS sling figures. Tower certification is a different trade — use REDTC for that.",
      },
    ],
    faq: [
      {
        q: "When does Mobile Crane become compulsory in B.C.?",
        a: "SkilledTradesBC: compulsory trade from 5 July 2027. Certification requirements from BC Crane Safety already apply. Confirm current rules with those bodies before you hire or dispatch.",
      },
    ],
    practiceHref: "/redmc",
    practiceLabel: "Open REDMC",
    related: [
      { href: "/mobile-crane-red-seal-practice-test", label: "Red Seal practice" },
      { href: "/tower-crane-operator-hours-bc", label: "Tower hours (different trade)" },
      { href: "/safety/training-competency", label: "Proven competency" },
    ],
  },
  {
    slug: "mobile-crane-load-chart-practice",
    title: "Mobile Crane Load Chart Practice BC | REDMC",
    description:
      "Practice reading manufacturer mobile crane load charts — Grove, Tadano, Terex, Liebherr, Link-Belt, Manitowoc — plus BCACS rigging figures. Never interpolate.",
    kicker: "REDMC — CHARTS",
    crumb: "Load chart practice",
    cluster: MOBILE,
    kind: "practice",
    h1: ["MOBILE", "LOAD CHARTS."],
    lede: "Rough-terrain, all-terrain, lattice crawler. Outriggers, on-rubber, pick-and-carry, boom length, radius, deductions. The cab serial chart still wins on the job.",
    facts: [
      { label: "Cranes", value: "7", note: "Manufacturer PDFs" },
      { label: "Rigging", value: "3", note: "BCACS sling figures" },
      { label: "Rule", value: "Worse", note: "Between rows, use worse" },
    ],
    sections: [
      {
        heading: "Manufacturer charts",
        body: "REDMC lists Grove RT880E, Tadano GR-800XL-4, Terex RT 670, Liebherr LTM 1100-5.3, Link-Belt 298 Series 2, Liebherr LR 1300 and Manitowoc 14000. Questions are written against those PDFs only. If a row is missing, the chart is still shown — capacities are not filled in by guess.",
      },
      {
        heading: "Sling charts are separate",
        body: "Chain, nylon web and wire-rope WLLs from the BCACS Crane Core figures booklet live under rigging charts. Training and assessment only. The sling tag and manufacturer rating win in the field.",
      },
    ],
    faq: [
      {
        q: "Can I interpolate radius?",
        a: "No. If the number is between rows, use the worse capacity. Same rule as the exam and as a competent operator.",
      },
    ],
    practiceHref: "/redmc/load-charts",
    practiceLabel: "Open load charts",
    related: [
      { href: "/redmc", label: "REDMC index" },
      { href: "/redmc/rigging-charts", label: "Rigging charts" },
      { href: "/tower-crane-load-chart-practice", label: "Tower load charts" },
    ],
  },
];

export function getSeoLanding(slug: string) {
  return SEO_LANDINGS.find((page) => page.slug === slug);
}

export const SEO_LANDING_SLUGS = SEO_LANDINGS.map((page) => page.slug);
