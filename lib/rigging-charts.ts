import type { LoadChart } from "@/lib/redtc/bank";
import type { Question } from "@/lib/redtc/types";

/**
 * BCACS Crane Core Theory Figures Booklet, March 2011.
 * Working load limits copied from Figure 1 (1)–(3). Training and assessment only.
 * Do not invent capacities — every option is a number that appears on the figure
 * or is the figure’s stated multiplier (.75 choker bridle, ×2 double basket).
 */

const SRC =
  "Fulford LCR practical (8 load-chart + 2 rigging, 7/10) · BCACS Crane Core Figures, March 2011 · WorkSafeBC Part 15";

const EXAMS = ["b", "l1", "l2", "l3", "ip", "lcr"] as Question["exams"];

function opt(
  id: "a" | "b" | "c" | "d",
  text: string,
  explanation: string,
): Question["options"][number] {
  return { id, text, explanation };
}

function lookup(
  id: number,
  question: string,
  correct: "a" | "b" | "c" | "d",
  options: Question["options"],
  extra?: Partial<Question>,
): Question {
  return {
    exams: EXAMS,
    bSection: 10,
    competency: "L1-D2",
    rsos: "B-5",
    mwa: "B",
    ohs: "15.5",
    src: SRC,
    calculation: true,
    sourceVerified: true,
    sourceName: "BCACS Crane Core Figures, March 2011",
    tags: ["rigging-chart", "wll", "fulford-lcr"],
    ...extra,
    id,
    question,
    options,
    correctAnswer: correct,
  };
}

function config(lines: string[]) {
  return `Determine the working load limit based on the following configuration:\n\n${lines.map((line) => `• ${line}`).join("\n")}`;
}

const CHAIN: Question[] = [
  lookup(1, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 1/2 in", "Hitch — single vertical"])}`, "c", [
    opt("a", "7,200 lb", "Incorrect. 7,200 lb is the 1/2 in single choker. The question is a single vertical hitch."),
    opt("b", "5,680 lb", "Incorrect. 5,680 lb is the 3/8 in single vertical. Wrong size row."),
    opt("c", "9,600 lb", "Correct. Figure 1 (1), 1/2 in, single vertical hitch is 9,600 lb."),
    opt("d", "19,200 lb", "Incorrect. 19,200 lb is the 1/2 in single basket with vertical legs (twice the vertical)."),
  ]),
  lookup(2, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 5/8 in", "Hitch — single choker"])}`, "b", [
    opt("a", "14,480 lb", "Incorrect. 14,480 lb is the 5/8 in single vertical. Choker is the next column."),
    opt("b", "10,860 lb", "Correct. Figure 1 (1), 5/8 in, single choker hitch is 10,860 lb."),
    opt("c", "7,200 lb", "Incorrect. 7,200 lb is the 1/2 in single choker. Wrong size row."),
    opt("d", "16,980 lb", "Incorrect. 16,980 lb is the 3/4 in single choker."),
  ]),
  lookup(3, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 3/8 in", "Hitch — single basket, vertical legs"])}`, "a", [
    opt("a", "11,360 lb", "Correct. Figure 1 (1), 3/8 in, single basket with vertical legs is 11,360 lb — twice the 5,680 lb vertical."),
    opt("b", "5,680 lb", "Incorrect. 5,680 lb is the 3/8 in single vertical. Basket with vertical legs is twice that."),
    opt("c", "9,838 lb", "Incorrect. 9,838 lb is the 3/8 in 2-leg bridle at 60°."),
    opt("d", "19,200 lb", "Incorrect. 19,200 lb is the 1/2 in single basket. Wrong size row."),
  ]),
  lookup(4, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 3/4 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 60°"])}`, "d", [
    opt("a", "22,640 lb", "Incorrect. 22,640 lb is the 3/4 in vertical (and the 30° bridle). The angle is 60°."),
    opt("b", "32,013 lb", "Incorrect. 32,013 lb is the 3/4 in 2-leg bridle at 45°."),
    opt("c", "45,280 lb", "Incorrect. 45,280 lb is the 3/4 in single basket with vertical legs."),
    opt("d", "39,212 lb", "Correct. Figure 1 (1), 3/4 in, 2-leg bridle at 60° is 39,212 lb. Never interpolate."),
  ]),
  lookup(5, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 1/2 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 45°"])}`, "b", [
    opt("a", "16,627 lb", "Incorrect. 16,627 lb is the 1/2 in 2-leg bridle at 60°."),
    opt("b", "13,574 lb", "Correct. Figure 1 (1), 1/2 in, 2-leg bridle at 45° is 13,574 lb."),
    opt("c", "9,600 lb", "Incorrect. 9,600 lb is the 1/2 in vertical / 30° bridle. The angle is 45°."),
    opt("d", "20,475 lb", "Incorrect. 20,475 lb is the 5/8 in 2-leg bridle at 45°. Wrong size row."),
  ]),
  lookup(6, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 1 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 30°"])}`, "a", [
    opt("a", "38,160 lb", "Correct. Figure 1 (1), 1 in, 2-leg bridle at 30° is 38,160 lb — the same number as the single vertical. Do not use the basket column."),
    opt("b", "76,320 lb", "Incorrect. 76,320 lb is the 1 in single basket with vertical legs. 30° bridle is not a vertical basket."),
    opt("c", "53,958 lb", "Incorrect. 53,958 lb is the 1 in 2-leg bridle at 45°."),
    opt("d", "66,093 lb", "Incorrect. 66,093 lb is the 1 in 2-leg bridle at 60°."),
  ]),
  lookup(7, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 3/4 in", "Hitch — 2-leg bridle used as a choker", "Sling angle from horizontal — 60°"])}`, "c", [
    opt("a", "39,212 lb", "Incorrect. 39,212 lb is the 3/4 in 2-leg bridle at 60° before the choker reduction. The note says multiply by 0.75."),
    opt("b", "16,980 lb", "Incorrect. 16,980 lb is the 3/4 in single choker, not a 2-leg bridle choker at 60°."),
    opt("c", "29,409 lb", "Correct. Figure 1 (1): 3/4 in, 2-leg bridle at 60° is 39,212 lb. A 2-leg bridle in a choker hitch: 39,212 × 0.75 = 29,409 lb."),
    opt("d", "45,280 lb", "Incorrect. 45,280 lb is the 3/4 in single basket. Wrong hitch and no 0.75."),
  ]),
  lookup(8, `Using Figure 1 (1) — Grade T (8) alloy steel chain. ${config(["Chain size — 3/8 in", "Hitch — double basket, vertical legs"])}`, "d", [
    opt("a", "11,360 lb", "Incorrect. 11,360 lb is a single basket with vertical legs. Double basket: multiply by 2."),
    opt("b", "5,680 lb", "Incorrect. 5,680 lb is the single vertical."),
    opt("c", "9,838 lb", "Incorrect. 9,838 lb is the 3/8 in 2-leg bridle at 60°."),
    opt("d", "22,720 lb", "Correct. Figure 1 (1): 3/8 in single basket, vertical legs is 11,360 lb. Double basket: 11,360 × 2 = 22,720 lb."),
  ]),
  lookup(9, `Using Figure 1 (1) — Grade T (8) alloy steel chain. A load weighs 10,000 lb. What is the smallest chain size that will lift it on a single vertical hitch?`, "c", [
    opt("a", "3/8 in", "Incorrect. 3/8 in vertical is 5,680 lb — below 10,000 lb."),
    opt("b", "1/2 in", "Incorrect. 1/2 in vertical is 9,600 lb — still short of 10,000 lb. Never interpolate."),
    opt("c", "5/8 in", "Correct. 1/2 in vertical is 9,600 lb. 5/8 in vertical is 14,480 lb. The smallest size at or above 10,000 lb is 5/8 in."),
    opt("d", "3/4 in", "Incorrect. 3/4 in vertical (22,640 lb) will lift it, but 5/8 in already will. The question asks for the smallest size."),
  ]),
  lookup(
    10,
    "Using Figure 1 (1) — Grade T (8) alloy steel chain. Chain links on this chart must be stamped with which mark, and when is the chain discarded for wear?",
    "b",
    [
      opt("a", "Grade 70. Discard at 5% wear.", "Incorrect. The figure is Grade T (8) alloy. Links are stamped 8 or T. Wear limit is more than 10% at the bearing surfaces."),
      opt("b", "8 or T. Discard if more than 10% wear at the bearing surfaces.", "Correct. Figure 1 (1): use only alloy steel chain; links stamped 8 or T. Discard if more than 10% wear at the bearing surfaces."),
      opt("c", "IPS. Discard if a link is stretched 25%.", "Incorrect. IPS is improved plow steel on the wire-rope figure, not this chain chart."),
      opt("d", "NACM. Discard only if a link is cracked.", "Incorrect. The figure names the stamp (8 or T) and a 10% wear discard at the bearing surfaces."),
    ],
    { calculation: false, rsos: "D-9", mwa: "D", bSection: 7, competency: "L1-D1", tags: ["rigging-chart", "inspection", "fulford-lcr"] },
  ),
];

const NYLON: Question[] = [
  lookup(1, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 3 in", "Hitch — single vertical"])}`, "b", [
    opt("a", "2,475 lb", "Incorrect. 2,475 lb is the 3 in single choker."),
    opt("b", "3,300 lb", "Correct. Figure 1 (2), 3 in, single vertical hitch is 3,300 lb."),
    opt("c", "4,400 lb", "Incorrect. 4,400 lb is the 4 in single vertical."),
    opt("d", "6,600 lb", "Incorrect. 6,600 lb is the 3 in single basket with vertical legs."),
  ]),
  lookup(2, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 4 in", "Hitch — single choker"])}`, "a", [
    opt("a", "3,300 lb", "Correct. Figure 1 (2), 4 in, single choker hitch is 3,300 lb."),
    opt("b", "4,400 lb", "Incorrect. 4,400 lb is the 4 in single vertical."),
    opt("c", "2,475 lb", "Incorrect. 2,475 lb is the 3 in single choker. Wrong width row."),
    opt("d", "6,220 lb", "Incorrect. 6,220 lb is the 4 in 2-leg bridle at 45°."),
  ]),
  lookup(3, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 2 in", "Hitch — single basket, vertical legs"])}`, "d", [
    opt("a", "2,200 lb", "Incorrect. 2,200 lb is the 2 in single vertical."),
    opt("b", "3,810 lb", "Incorrect. 3,810 lb is the 2 in 2-leg bridle at 60°."),
    opt("c", "1,650 lb", "Incorrect. 1,650 lb is the 2 in single choker."),
    opt("d", "4,400 lb", "Correct. Figure 1 (2), 2 in, single basket with vertical legs is 4,400 lb — twice the vertical."),
  ]),
  lookup(4, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 5 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 60°"])}`, "c", [
    opt("a", "5,500 lb", "Incorrect. 5,500 lb is the 5 in single vertical / 30° bridle."),
    opt("b", "7,775 lb", "Incorrect. 7,775 lb is the 5 in 2-leg bridle at 45°."),
    opt("c", "9,525 lb", "Correct. Figure 1 (2), 5 in, 2-leg bridle at 60° is 9,525 lb."),
    opt("d", "11,000 lb", "Incorrect. 11,000 lb is the 5 in single basket with vertical legs."),
  ]),
  lookup(5, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 3 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 45°"])}`, "b", [
    opt("a", "5,715 lb", "Incorrect. 5,715 lb is the 3 in 2-leg bridle at 60°."),
    opt("b", "4,665 lb", "Correct. Figure 1 (2), 3 in, 2-leg bridle at 45° is 4,665 lb."),
    opt("c", "3,300 lb", "Incorrect. 3,300 lb is the 3 in vertical / 30° bridle."),
    opt("d", "6,220 lb", "Incorrect. 6,220 lb is the 4 in 2-leg bridle at 45°. Wrong width row."),
  ]),
  lookup(6, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 4 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 30°"])}`, "a", [
    opt("a", "4,400 lb", "Correct. Figure 1 (2), 4 in, 2-leg bridle at 30° is 4,400 lb — the same as the single vertical. Do not use the basket column."),
    opt("b", "8,800 lb", "Incorrect. 8,800 lb is the 4 in single basket with vertical legs."),
    opt("c", "6,220 lb", "Incorrect. 6,220 lb is the 4 in 2-leg bridle at 45°."),
    opt("d", "7,620 lb", "Incorrect. 7,620 lb is the 4 in 2-leg bridle at 60°."),
  ]),
  lookup(7, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 2 in", "Hitch — 2-leg bridle used as a choker", "Sling angle from horizontal — 60°"])}`, "c", [
    opt("a", "3,810 lb", "Incorrect. 3,810 lb is the 2 in 2-leg bridle at 60° before the choker reduction."),
    opt("b", "1,650 lb", "Incorrect. 1,650 lb is the 2 in single choker."),
    opt("c", "2,858 lb", "Correct. Figure 1 (2): 2 in, 2-leg bridle at 60° is 3,810 lb. A 2-leg bridle in a choker hitch: 3,810 × 0.75 = 2,857.5 lb → 2,858 lb."),
    opt("d", "2,200 lb", "Incorrect. 2,200 lb is the 2 in single vertical."),
  ]),
  lookup(8, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. ${config(["Web width — 3 in", "Hitch — double basket, vertical legs"])}`, "b", [
    opt("a", "6,600 lb", "Incorrect. 6,600 lb is a single basket with vertical legs. Double basket: multiply by 2."),
    opt("b", "13,200 lb", "Correct. Figure 1 (2): 3 in single basket, vertical legs is 6,600 lb. Double basket: 6,600 × 2 = 13,200 lb."),
    opt("c", "11,430 lb", "Incorrect. 11,430 lb is the 6 in 2-leg bridle at 60°."),
    opt("d", "3,300 lb", "Incorrect. 3,300 lb is the 3 in single vertical."),
  ]),
  lookup(9, `Using Figure 1 (2) — nylon web, 6,800 lb/in material. A load weighs 5,000 lb. What is the smallest web width that will lift it on a single vertical hitch?`, "c", [
    opt("a", "3 in", "Incorrect. 3 in vertical is 3,300 lb."),
    opt("b", "4 in", "Incorrect. 4 in vertical is 4,400 lb — still below 5,000 lb. Never interpolate."),
    opt("c", "5 in", "Correct. 4 in vertical is 4,400 lb. 5 in vertical is 5,500 lb. The smallest width at or above 5,000 lb is 5 in."),
    opt("d", "6 in", "Incorrect. 6 in vertical (6,600 lb) will lift it, but 5 in already will."),
  ]),
  lookup(
    10,
    "Using Figure 1 (2) — nylon web slings. The working load limits on this figure apply to which fittings?",
    "a",
    [
      opt("a", "Flat eye, twisted eye, and triangle fittings", "Correct. Figure 1 (2) note: capacities are for flat eye, twisted eye and triangle fittings. Training and assessment only."),
      opt("b", "Endless round slings only", "Incorrect. This figure is nylon web, not round-sling tables."),
      opt("c", "Wire-rope Flemish eyes only", "Incorrect. Wire rope is Figure 1 (3)."),
      opt("d", "Grade T chain hooks only", "Incorrect. Chain is Figure 1 (1)."),
    ],
    { calculation: false, rsos: "D-9", mwa: "D", bSection: 7, competency: "L1-D1", tags: ["rigging-chart", "hardware", "fulford-lcr"] },
  ),
];

const WIRE: Question[] = [
  lookup(1, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 1/2 in", "Hitch — single vertical"])}`, "b", [
    opt("a", "3,500 lb", "Incorrect. 3,500 lb is the 1/2 in single choker."),
    opt("b", "4,700 lb", "Correct. Figure 1 (3), 1/2 in, single vertical hitch is 4,700 lb."),
    opt("c", "7,100 lb", "Incorrect. 7,100 lb is the 5/8 in single vertical."),
    opt("d", "9,400 lb", "Incorrect. 9,400 lb is the 1/2 in single basket with vertical legs."),
  ]),
  lookup(2, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 5/8 in", "Hitch — single choker"])}`, "c", [
    opt("a", "7,100 lb", "Incorrect. 7,100 lb is the 5/8 in single vertical."),
    opt("b", "3,500 lb", "Incorrect. 3,500 lb is the 1/2 in single choker."),
    opt("c", "5,300 lb", "Correct. Figure 1 (3), 5/8 in, single choker hitch is 5,300 lb."),
    opt("d", "7,650 lb", "Incorrect. 7,650 lb is the 3/4 in single choker."),
  ]),
  lookup(3, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 3/4 in", "Hitch — single basket, vertical legs"])}`, "a", [
    opt("a", "20,400 lb", "Correct. Figure 1 (3), 3/4 in, single basket with vertical legs is 20,400 lb — twice the 10,200 lb vertical."),
    opt("b", "10,200 lb", "Incorrect. 10,200 lb is the 3/4 in single vertical."),
    opt("c", "17,700 lb", "Incorrect. 17,700 lb is the 3/4 in 2-leg bridle at 60°."),
    opt("d", "14,200 lb", "Incorrect. 14,200 lb is the 5/8 in single basket."),
  ]),
  lookup(4, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 1 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 60°"])}`, "d", [
    opt("a", "17,950 lb", "Incorrect. 17,950 lb is the 1 in single vertical / 30° bridle."),
    opt("b", "25,400 lb", "Incorrect. 25,400 lb is the 1 in 2-leg bridle at 45°."),
    opt("c", "35,900 lb", "Incorrect. 35,900 lb is the 1 in single basket with vertical legs."),
    opt("d", "31,100 lb", "Correct. Figure 1 (3), 1 in, 2-leg bridle at 60° is 31,100 lb."),
  ]),
  lookup(5, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 1/2 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 45°"])}`, "b", [
    opt("a", "8,150 lb", "Incorrect. 8,150 lb is the 1/2 in 2-leg bridle at 60°."),
    opt("b", "6,650 lb", "Correct. Figure 1 (3), 1/2 in, 2-leg bridle at 45° is 6,650 lb."),
    opt("c", "4,700 lb", "Incorrect. 4,700 lb is the 1/2 in vertical / 30° bridle."),
    opt("d", "10,000 lb", "Incorrect. 10,000 lb is the 5/8 in 2-leg bridle at 45°."),
  ]),
  lookup(6, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 5/8 in", "Hitch — 2-leg bridle", "Sling angle from horizontal — 30°"])}`, "a", [
    opt("a", "7,100 lb", "Correct. Figure 1 (3), 5/8 in, 2-leg bridle at 30° is 7,100 lb — the same as the single vertical."),
    opt("b", "14,200 lb", "Incorrect. 14,200 lb is the 5/8 in single basket with vertical legs."),
    opt("c", "10,000 lb", "Incorrect. 10,000 lb is the 5/8 in 2-leg bridle at 45°."),
    opt("d", "12,300 lb", "Incorrect. 12,300 lb is the 5/8 in 2-leg bridle at 60°."),
  ]),
  lookup(7, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 3/4 in", "Hitch — 2-leg bridle used as a choker", "Sling angle from horizontal — 60°"])}`, "c", [
    opt("a", "17,700 lb", "Incorrect. 17,700 lb is the 3/4 in 2-leg bridle at 60° before the choker reduction."),
    opt("b", "7,650 lb", "Incorrect. 7,650 lb is the 3/4 in single choker."),
    opt("c", "13,275 lb", "Correct. Figure 1 (3): 3/4 in, 2-leg bridle at 60° is 17,700 lb. A 2-leg bridle in a choker hitch: 17,700 × 0.75 = 13,275 lb."),
    opt("d", "20,400 lb", "Incorrect. 20,400 lb is the 3/4 in single basket."),
  ]),
  lookup(8, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. ${config(["Rope diameter — 1/2 in", "Hitch — double basket, vertical legs"])}`, "d", [
    opt("a", "9,400 lb", "Incorrect. 9,400 lb is a single basket with vertical legs. Double basket: multiply by 2."),
    opt("b", "4,700 lb", "Incorrect. 4,700 lb is the single vertical."),
    opt("c", "8,150 lb", "Incorrect. 8,150 lb is the 1/2 in 2-leg bridle at 60°."),
    opt("d", "18,800 lb", "Correct. Figure 1 (3): 1/2 in single basket, vertical legs is 9,400 lb. Double basket: 9,400 × 2 = 18,800 lb."),
  ]),
  lookup(9, `Using Figure 1 (3) — 6×19 IWRC improved plow steel. A load weighs 8,000 lb. What is the smallest rope diameter that will lift it on a single vertical hitch?`, "c", [
    opt("a", "1/2 in", "Incorrect. 1/2 in vertical is 4,700 lb."),
    opt("b", "5/8 in", "Incorrect. 5/8 in vertical is 7,100 lb — still below 8,000 lb. Never interpolate."),
    opt("c", "3/4 in", "Correct. 5/8 in vertical is 7,100 lb. 3/4 in vertical is 10,200 lb. The smallest diameter at or above 8,000 lb is 3/4 in."),
    opt("d", "7/8 in", "Incorrect. 7/8 in vertical (13,750 lb) will lift it, but 3/4 in already will."),
  ]),
  lookup(
    10,
    "Using Figure 1 (3) — wire rope slings. This working-load table is for which rope construction?",
    "b",
    [
      opt("a", "6×19 fiber-core extra improved plow steel", "Incorrect. The figure is IWRC (independent wire rope core), improved plow steel — not fiber core and not extra IPS."),
      opt("b", "6×19 classification group, improved plow steel, IWRC", "Correct. Figure 1 (3) header: 6×19 classification group, improved plow steel, IWRC."),
      opt("c", "6×37 rotation-resistant compacted strand", "Incorrect. That construction is not this figure."),
      opt("d", "8×19 IWRC Grade T alloy", "Incorrect. Grade T is the chain figure. This is 6×19 IPS IWRC."),
    ],
    { calculation: false, rsos: "D-9", mwa: "D", bSection: 7, competency: "L1-D1", tags: ["rigging-chart", "wire-rope", "fulford-lcr"] },
  ),
];

export const RIGGING_CHARTS: LoadChart[] = [
  {
    id: "chain-slings",
    name: "Chain slings",
    manufacturer: "BCACS",
    model: "Figure 1 (1)",
    type: "rigging",
    pdfFile: "chain-slings.pdf",
    description:
      "Grade T (8) alloy steel chain. Working load limits in pounds for vertical, choker, basket, and 2-leg bridle hitches. Training and assessment only.",
    specifications: {
      maxCapacity: "1/4–1-1/4 in Grade T (8)",
    },
    questions: CHAIN,
  },
  {
    id: "nylon-web-slings",
    name: "Nylon web slings",
    manufacturer: "BCACS",
    model: "Figure 1 (2)",
    type: "rigging",
    pdfFile: "nylon-web-slings.pdf",
    description:
      "Nylon web, 6,800 lb/in material. Working load limits in pounds by web width and hitch. Training and assessment only.",
    specifications: {
      maxCapacity: "1–6 in web, 6,800 lb/in",
    },
    questions: NYLON,
  },
  {
    id: "wire-rope-slings",
    name: "Wire rope slings",
    manufacturer: "BCACS",
    model: "Figure 1 (3)",
    type: "rigging",
    pdfFile: "wire-rope-slings.pdf",
    description:
      "6×19 IWRC improved plow steel. Working load limits in pounds by rope diameter and hitch. Training and assessment only.",
    specifications: {
      maxCapacity: "3/16–1-1/2 in 6×19 IWRC",
    },
    questions: WIRE,
  },
];

export function riggingChartPdfHref(pdfFile: string) {
  if (pdfFile.startsWith("/")) return pdfFile;
  return `/redtc/rigging-charts/${pdfFile}`;
}

export function riggingChartQuestions(offset = 40000): Question[] {
  let id = offset;
  return RIGGING_CHARTS.flatMap((chart) =>
    chart.questions.map((q) => ({
      ...q,
      id: id++,
      category: "Rigging",
      subcategory: chart.name,
      chartPdf: riggingChartPdfHref(chart.pdfFile),
      chartName: `${chart.model} ${chart.name}`,
      chartKind: "rigging" as const,
    })),
  );
}

/** Tower RSOS: B-5 is crane maintenance. Chart lookups belong on D-10. */
export function towerRiggingChartQuestions(offset = 50000): Question[] {
  return riggingChartQuestions(offset).map((q) =>
    q.rsos === "B-5" ? { ...q, rsos: "D-10", mwa: "D" as const } : q,
  );
}
