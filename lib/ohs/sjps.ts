import type { Sjp } from "./types";
import { FLYTABLE_LINKS, FLYTABLE_REFS, LIFT_REFS, PLATFORM_LINKS, PLATFORM_REFS } from "./meta";

export const SJPS: Sjp[] = [
  {
    slug: "flytable-cycle",
    title: "FLYTABLE CYCLE",
    number: "PROVEN-SJP-001",
    summary: "This table. This floor. This drawing revision. Not last cycle’s sheet.",
    when: "Every flytable / flyform cycle the crane hooks. Critical lift. Fill PROVEN-FRM-052. Typical tables only — corner and nontypical use PROVEN-SJP-002 on the same form.",
    purpose:
      "Name the facts the SWP cannot know until this morning: table ID, drawing revision, weight, pick points, sling lengths, wind number, named crew, holds. The method stays PROVEN-SWP-028. If this sheet contradicts the SWP, stop and fix one of them before the hook moves.",
    basedOn: [
      { href: "/safety/swp/flytable-cycling", label: "SWP — FLYTABLE CYCLING — PROVEN-SWP-028 →" },
      { href: "/safety/jha/flytable-cycling", label: "JHA — FLYTABLE CYCLING — PROVEN-JHA-011 →" },
      { href: "/safety/swp/critical-lifts", label: "SWP — CRITICAL LIFTS — PROVEN-SWP-019 →" },
      { href: "/safety/form/flytable-cycle-sjp", label: "FILL THIS CYCLE — PROVEN-FRM-052 →" },
    ],
    facts: [
      "Project, building, floor leaving, floor landing",
      "Table ID — and whether it is typical",
      "Engineered drawing number and revision — matches this table",
      "Manufacturer / system (EFCO, Doka, Aluma, other) and the cycle at the lift",
      "Weight and centre of gravity (14.36)",
      "Every designated pick point, named. Pins / cotters / Safety Pin-Bolts as the OEM",
      "Sling type, WLL, and lengths as the drawing — not last floor’s memory. Some systems use a longer rear pair only if that drawing says so",
      "Wind limit — the lower of crane, manufacturer, this SJP. A number.",
      "Radio channel. Confirmation loop. Who is on drop floor. Who is on landing floor.",
      "Curb stops, kicker blocks, brake lines — as the drawing, in place before roll",
      "Exclusion below and on the landing floor",
      "Named operator, rigger, signalperson, formwork supervisor, prime contact",
    ],
    holds: [
      {
        n: "01",
        title: "BEFORE DROP",
        body: "Drawing and OEM cycle at the lift. SJP filled. Meeting done. Radios tested. Zone below. Table free of the pour as the host confirms. Crane not on load.",
      },
      {
        n: "02",
        title: "BEFORE ROLL PAST THE EDGE",
        body: "Curb / kicker / brake line as the drawing. Fall protection at the edge. Exclusion held. Crane will not pull.",
      },
      {
        n: "03",
        title: "BEFORE THE TABLE LEAVES THE BUILDING",
        body: "Every designated pick made. Pins in. People off. Loose material off. Test lift. Hang matches the drawing.",
      },
      {
        n: "04",
        title: "BEFORE HOIST TO THE NEXT FLOOR",
        body: "Landing floor ready on the radio. Confirmation loop. Wind at or below the number. Path clear.",
      },
      {
        n: "05",
        title: "BEFORE DISCONNECT",
        body: "Table on jacks or landing dollies as the OEM. Tiebacks / curbs as the drawing. Formwork supervisor says landed.",
      },
    ],
    abort: [
      "Any fact on this sheet is unknown or no longer true",
      "The work is being asked to drift from PROVEN-SWP-028",
      "This table is a corner or nontypical and this is the typical SJP",
      "Radio loss. Wind over the number. Person in the zone.",
      "Change without stop-and-discuss",
    ],
    named: [
      "Crane operator",
      "Rigger",
      "Signalperson",
      "Formwork supervisor (host)",
      "Spotter — drop floor",
      "Spotter — landing floor",
      "Prime contact",
      "Lift supervisor",
    ],
    documentation: [
      "This SJP / PROVEN-FRM-052",
      "PROVEN-FRM-007",
      "PROVEN-FRM-009",
      "FLHA",
      "Drawing revision attached or cited",
    ],
    references: [...LIFT_REFS, ...FLYTABLE_REFS],
    download: {
      href: "/safety/builder/flytable-cycle-sjp",
      label: "FILL PROVEN-FRM-052 — THIS CYCLE →",
    },
    links: FLYTABLE_LINKS,
  },
  {
    slug: "corner-nontypical-flytable",
    title: "CORNER / NONTIPICAL FLYTABLE",
    number: "PROVEN-SJP-002",
    summary: "This corner table. This special plan. Not the typical cycle sheet.",
    when: "The table is a corner, infill, reduced-width, or any table the engineer marks nontypical. Fill PROVEN-FRM-052 and mark it nontypical. Attach the special handling plan.",
    purpose:
      "Force the special facts onto paper: why this table is not typical, the engineered handling plan, the different sling geometry, the extra tag line. Then do PROVEN-SWP-028 on top of that plan. Do not fly this table on PROVEN-SJP-001 alone.",
    basedOn: [
      { href: "/safety/swp/corner-nontypical-flytables", label: "SWP — CORNER AND NONTIPICAL FLYTABLES — PROVEN-SWP-029 →" },
      { href: "/safety/jha/corner-nontypical-flytables", label: "JHA — CORNER AND NONTIPICAL FLYTABLES — PROVEN-JHA-012 →" },
      { href: "/safety/sjp/flytable-cycle", label: "SJP — TYPICAL CYCLE — PROVEN-SJP-001 →" },
      { href: "/safety/form/flytable-cycle-sjp", label: "FILL THIS CYCLE — PROVEN-FRM-052 →" },
    ],
    facts: [
      "Everything PROVEN-SJP-001 names",
      "Why this table is nontypical — said in one sentence",
      "Special engineered handling plan — document number and revision, at the lift",
      "COG as that plan, not as the typical table",
      "Pick points and sling lengths as that plan",
      "Extra tag lines, extra spotters — named",
      "Any reduced speed or extra hold the plan names",
    ],
    holds: [
      {
        n: "01",
        title: "BEFORE THE TYPICAL GATE",
        body: "Crew can say why this table is not typical. Special plan at the lift. FRM-052 marked nontypical.",
      },
      {
        n: "02",
        title: "THEN PROVEN-SJP-001 HOLDS",
        body: "Drop, roll, attach, fly, land — every hold on the typical cycle, plus the extra holds this plan names. Crane still does not pull.",
      },
    ],
    abort: [
      "Special plan not at the lift",
      "Anyone treating it as typical",
      "Sling lengths copied from a typical table",
      "Every abort on PROVEN-SJP-001",
    ],
    named: [
      "Everyone named on PROVEN-SJP-001",
      "Extra tag-line hands the special plan names",
      "Engineer contact if the table or the plan changed",
    ],
    documentation: [
      "PROVEN-FRM-052 marked nontypical",
      "Special handling plan attached",
      "PROVEN-SJP-001 documentation",
    ],
    references: [...LIFT_REFS, ...FLYTABLE_REFS],
    download: {
      href: "/safety/builder/flytable-cycle-sjp",
      label: "FILL PROVEN-FRM-052 — MARK NONTIPICAL →",
    },
    links: FLYTABLE_LINKS,
  },
  {
    slug: "loading-platform",
    title: "LOADING PLATFORM",
    number: "PROVEN-SJP-003",
    summary: "This deck. This floor. This serial. Empty. Not last floor’s sheet.",
    when: "Every loading-platform install, reposition or strike the crane hooks. Critical lift. Fill PROVEN-FRM-053. Daily SuperDeck extend / retract is not this sheet.",
    purpose:
      "Name the facts the SWP cannot know until this morning: manufacturer, serial, dead weight, WLL, pick points, chain, wind number, named crew, holds. The method stays PROVEN-SWP-030. If this sheet contradicts the SWP, stop and fix one of them before the hook moves.",
    basedOn: [
      { href: "/safety/swp/loading-platform-reposition", label: "SWP — LOADING PLATFORM — PROVEN-SWP-030 →" },
      { href: "/safety/jha/loading-platform-reposition", label: "JHA — LOADING PLATFORM — PROVEN-JHA-014 →" },
      { href: "/safety/swp/critical-lifts", label: "SWP — CRITICAL LIFTS — PROVEN-SWP-019 →" },
      { href: "/safety/form/loading-platform-sjp", label: "FILL THIS DECK — PROVEN-FRM-053 →" },
    ],
    facts: [
      "Project, building, floor leaving, floor landing",
      "Manufacturer / system — Doka, SuperDeck, CantiDeck, PERI RCS MP, DOC, other",
      "Serial / ID. Type plate. Fixed or retractable — said",
      "OEM user information at the lift — document number if it has one",
      "Dead weight empty, plus rigging (14.36). Not the service WLL",
      "Service WLL / remaining WLL — named so nobody flies it",
      "Every designated pick point, named. Four unless this OEM names otherwise",
      "Chain / sling type, WLL, length. Doka: 4-part 3.20 m, β ≤ 30° if that is this serial",
      "Wind limit — the lower of crane, manufacturer, this SJP. A number. Doka cites 72 km/h",
      "Tag lines — how many, who holds them",
      "Radio channel. Confirmation loop",
      "Exclusion below and at the slab edge (Part 11, 14.44)",
      "Who releases props / clamps. Who says landed",
    ],
    holds: [
      {
        n: "01",
        title: "GATE",
        body: "User information and type plate at the lift. Empty dead weight known. FRM-053 filled. Brief done. If not, the hook does not take the deck.",
      },
      {
        n: "02",
        title: "HITCH AND EMPTY",
        body: "Four designated points. Chain as the OEM. People off. Material off. Tag lines on.",
      },
      {
        n: "03",
        title: "RELEASE",
        body: "Host has released props / clamps. Confirm free. Then hoist.",
      },
      {
        n: "04",
        title: "LAND",
        body: "Host pins rails and props, clamps or anchors as the OEM. Supervisor says landed. Then disconnect.",
      },
    ],
    abort: [
      "User information or type plate not at the lift",
      "Anyone treating service WLL as the fly weight",
      "People or material on the deck",
      "Props still in",
      "Improvised picks",
      "Wind above the number on this sheet",
      "Asked to retract or extend a SuperDeck with the crane",
      "The work is being asked to drift from PROVEN-SWP-030",
    ],
    named: [
      "Operator",
      "Rigger",
      "Signalperson",
      "Tag-line hands",
      "Platform supervisor (host)",
      "Prime contact",
      "Lift supervisor",
    ],
    documentation: [
      "This SJP / PROVEN-FRM-053",
      "PROVEN-FRM-007",
      "PROVEN-FRM-009",
      "FLHA",
      "OEM user information cited",
    ],
    references: [...LIFT_REFS, ...PLATFORM_REFS],
    download: {
      href: "/safety/builder/loading-platform-sjp",
      label: "FILL PROVEN-FRM-053 — THIS DECK →",
    },
    links: PLATFORM_LINKS,
  },
];

export function getSjp(slug: string) {
  return SJPS.find((item) => item.slug === slug);
}
