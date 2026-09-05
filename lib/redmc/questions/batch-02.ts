import type { MobileExamLevel, MobileMwa, MobileQuestion } from "../types";

const WSBC14 =
  "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists";
const WSBC15 =
  "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging";

type Source = {
  reference: string;
  sourceName: string;
  sourceUrl: string;
};

type Spec = {
  category: string;
  subcategory?: string;
  difficulty: MobileQuestion["difficulty"];
  examLevels: MobileExamLevel[];
  mwa: MobileMwa | null;
  question: string;
  choices: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  tags: string[];
  source: Source;
};

function ws(section: string, part: 14 | 15 = 14): Source {
  const anchor = section.split(" / ")[0];
  const base = part === 15 ? WSBC15 : WSBC14;
  return {
    reference: `WorkSafeBC OHSR ${section}`,
    sourceName: "WorkSafeBC",
    sourceUrl: `${base}#SectionNumber:${anchor}`,
  };
}

const BCCS_PROV: Source = {
  reference: "BC Crane Safety — Provisional Crane Operator",
  sourceName: "BC Crane Safety",
  sourceUrl: "https://bccranesafety.ca/resources/provisional-crane-operator/",
};

const BCCS: Source = {
  reference: "BC Crane Safety",
  sourceName: "BC Crane Safety",
  sourceUrl: "https://bccranesafety.ca/",
};

const STBC: Source = {
  reference: "SkilledTradesBC",
  sourceName: "SkilledTradesBC",
  sourceUrl: "https://skilledtradesbc.ca/mobile-crane-operator",
};

const STBC_PROFILE: Source = {
  reference: "SkilledTradesBC — Mobile Crane Operator Program Profile",
  sourceName: "SkilledTradesBC",
  sourceUrl: "https://skilledtradesbc.ca/mobile-crane-operator",
};

function mc(n: number, spec: Spec): MobileQuestion {
  return {
    id: `MC-${String(n).padStart(4, "0")}`,
    discipline: "mobile",
    question: spec.question,
    choices: spec.choices,
    correctAnswer: spec.correct,
    explanation: spec.explanation,
    category: spec.category,
    subcategory: spec.subcategory,
    difficulty: spec.difficulty,
    examLevels: spec.examLevels,
    redSealMWA: spec.mwa,
    tags: spec.tags,
    reference: spec.source.reference,
    sourceName: spec.source.sourceName,
    sourceUrl: spec.source.sourceUrl,
    chartId: null,
    calculation: false,
    sourceVerified: true,
  };
}

const P: MobileExamLevel[] = ["provisional"];
const P1: MobileExamLevel[] = ["provisional", "level1"];
const P1R: MobileExamLevel[] = ["provisional", "level1", "redseal"];
const L1R: MobileExamLevel[] = ["level1", "redseal"];
const L13R: MobileExamLevel[] = ["level1", "level3", "redseal"];
const L3R: MobileExamLevel[] = ["level3", "redseal"];

export const BATCH_02: MobileQuestion[] = [
  mc(31, {
    category: "Common Occupational Skills",
    subcategory: "Provisional Certification",
    difficulty: "basic",
    examLevels: P,
    mwa: "A",
    tags: ["provisional", "supervision", "certification"],
    source: BCCS_PROV,
    question:
      "What does a B.C. Provisional Crane Operator designation allow a trainee to do?",
    choices: [
      "Operate any crane independently",
      "Operate a crane under qualified supervision while working toward full certification",
      "Supervise certified operators",
      "Operate only when no qualified operator is available",
    ],
    correct: 1,
    explanation:
      "The provisional designation allows an operator who has not yet achieved full-scope certification to gain operating experience under qualified and competent supervision.",
  }),
  mc(32, {
    category: "Common Occupational Skills",
    subcategory: "Provisional Certification",
    difficulty: "basic",
    examLevels: P,
    mwa: "A",
    tags: ["provisional", "employer", "certification"],
    source: BCCS_PROV,
    question:
      "A provisional crane operator changes employers. Can the operator assume the existing provisional card automatically applies to the new employer?",
    choices: [
      "Yes",
      "Yes, for 30 days",
      "No, because the provisional designation is tied to the employer named on the certificate",
      "Only if operating the same crane model",
    ],
    correct: 2,
    explanation:
      "BC Crane Safety states that the provisional certificate is valid while the operator is working for the employer named on the provisional certificate.",
  }),
  mc(33, {
    category: "Common Occupational Skills",
    subcategory: "Provisional Exam",
    difficulty: "basic",
    examLevels: P,
    mwa: "A",
    tags: ["provisional", "exam", "fulford"],
    source: BCCS_PROV,
    question:
      "How many questions are currently on the Fulford Crane Operator Provisional Theory Test in B.C.?",
    choices: ["20", "23", "40", "110"],
    correct: 2,
    explanation: "The current provisional theory examination contains 40 questions.",
  }),
  mc(34, {
    category: "Rigging",
    subcategory: "Provisional Requirements",
    difficulty: "basic",
    examLevels: P,
    mwa: "D",
    tags: ["provisional", "rigging", "training"],
    source: BCCS_PROV,
    question:
      "What training proof must an applicant currently provide when applying for a B.C. provisional crane operator designation?",
    choices: [
      "Welding theory training",
      "Rigging theory training",
      "Heavy-equipment mechanic training",
      "First aid instructor training",
    ],
    correct: 1,
    explanation:
      "Proof of rigging theory training is currently required as part of obtaining a provisional crane operator designation.",
  }),
  mc(35, {
    category: "Common Occupational Skills",
    subcategory: "Provisional Exam",
    difficulty: "intermediate",
    examLevels: P1,
    mwa: "A",
    tags: ["provisional", "level1", "exam"],
    source: BCCS_PROV,
    question:
      "A registered Mobile Crane Operator apprentice has already passed the SkilledTradesBC Level 1 standardized exam. What does BC Crane Safety state regarding the separate provisional theory exam?",
    choices: [
      "It must still be written twice",
      "It is not additionally required for provisional certification",
      "It is replaced by a practical test only",
      "Level 1 has no effect on provisional certification",
    ],
    correct: 1,
    explanation:
      "BC Crane Safety states that registered apprentices who have passed the SkilledTradesBC Level 1 exam do not require an additional provisional operator theory exam.",
  }),
  mc(36, {
    category: "Common Occupational Skills",
    subcategory: "Registration",
    difficulty: "basic",
    examLevels: P1,
    mwa: "A",
    tags: ["registration", "bc-crane-safety"],
    source: BCCS,
    question: "What registration is required for crane operators working in B.C.?",
    choices: [
      "Registration with BC Crane Safety",
      "Registration with Transport Canada only",
      "Registration with the crane manufacturer",
      "Registration with the municipality only",
    ],
    correct: 0,
    explanation:
      "Crane operators in British Columbia are required to be registered with BC Crane Safety.",
  }),
  mc(37, {
    category: "Common Occupational Skills",
    subcategory: "Certification",
    difficulty: "intermediate",
    examLevels: P1R,
    mwa: "A",
    tags: ["skilledtradesbc", "compulsory", "certification"],
    source: STBC,
    question:
      "On what date is Mobile Crane Operator scheduled to become subject to B.C.'s Skilled Trades Certification compulsory-trade requirements?",
    choices: [
      "January 1, 2027",
      "July 5, 2027",
      "September 1, 2028",
      "It is already fully compulsory",
    ],
    correct: 1,
    explanation:
      "The transition period runs until July 5, 2027. After that date, affected Mobile Crane Operators must meet the applicable Skilled Trades Certification status requirements.",
  }),
  mc(38, {
    category: "Common Occupational Skills",
    subcategory: "Certification",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "A",
    tags: ["exam", "pass-mark", "red-seal"],
    source: STBC_PROFILE,
    question:
      "What is the minimum passing mark for the B.C. Mobile Crane Operator standardized written exams and Red Seal exam?",
    choices: ["60%", "65%", "70%", "80%"],
    correct: 2,
    explanation:
      "The applicable SkilledTradesBC standardized exams and Interprovincial Red Seal exam require a minimum mark of 70%.",
  }),
  mc(39, {
    category: "Common Occupational Skills",
    subcategory: "Operator Qualification",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["operator", "qualified", "part-14"],
    source: ws("14.34"),
    question: "Who may operate a crane or hoist under WorkSafeBC requirements?",
    choices: [
      "Any worker instructed by another employee",
      "A qualified person who has been instructed to operate the equipment",
      "Any worker with a driver's licence",
      "Only the site superintendent",
    ],
    correct: 1,
    explanation:
      "A crane or hoist must only be operated by a qualified person who has been instructed to operate that equipment.",
  }),
  mc(40, {
    category: "Common Occupational Skills",
    subcategory: "Operator Competency",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["operator", "signals", "instructions"],
    source: ws("14.34"),
    question: "Before operating a crane, an operator must demonstrate familiarity with:",
    choices: [
      "Only the crane's engine",
      "The operating instructions and authorized hoisting signal code",
      "The project's concrete schedule",
      "Every trade working on the project",
    ],
    correct: 1,
    explanation:
      "Operator competency includes familiarity with the crane's operating instructions and the authorized code of signals for hoisting operations.",
  }),
  mc(41, {
    category: "Common Occupational Skills",
    subcategory: "Certification",
    difficulty: "basic",
    examLevels: P1,
    mwa: "A",
    tags: ["certificate", "conditions", "operator"],
    source: ws("14.34.1"),
    question:
      "A certified operator has conditions listed on the operator certificate. How must the crane be operated?",
    choices: [
      "The conditions are recommendations only",
      "In accordance with the conditions on the certificate",
      "Conditions apply only to tower cranes",
      "The site superintendent may cancel the conditions",
    ],
    correct: 1,
    explanation:
      "WorkSafeBC requires operation in accordance with any conditions stipulated on the operator's certificate.",
  }),
  mc(42, {
    category: "Inspections",
    subcategory: "Pre-Use Inspection",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["inspection", "pre-use", "shift"],
    source: ws("14.35"),
    question:
      "Before an operator uses a crane during a work shift, what must the operator ensure?",
    choices: [
      "Only that fuel is available",
      "The crane was inspected and its control and safety devices were tested for that work shift",
      "The crane received an annual inspection that morning",
      "The rigger has inspected the engine",
    ],
    correct: 1,
    explanation:
      "The crane must be inspected and the control and safety devices tested for the work shift before use.",
  }),
  mc(43, {
    category: "Inspections",
    subcategory: "Defects",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["inspection", "defects", "reporting"],
    source: ws("14.35"),
    question: "A defect is discovered during a crane inspection. What must happen?",
    choices: [
      "Nothing unless the crane stops operating",
      "The defect must be recorded and immediately reported to the supervisor",
      "Only the operator needs to know",
      "The defect can be erased after the shift",
    ],
    correct: 1,
    explanation:
      "Defects found during inspection or use must be recorded in the inspection and maintenance record system and reported immediately to the supervisor.",
  }),
  mc(44, {
    category: "Inspections",
    subcategory: "Defects",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["inspection", "defects", "out-of-service"],
    source: ws("14.35"),
    question: "A defect affects the safe operation of a mobile crane. What is required?",
    choices: [
      "Operate at 50% capacity",
      "Operate only with a spotter",
      "Do not use the crane until the defect has been remedied",
      "Continue until the end of the shift",
    ],
    correct: 2,
    explanation:
      "If a defect affects safe operation, the equipment must not be used until the defect is remedied.",
  }),
  mc(45, {
    category: "Hoisting Calculations",
    subcategory: "Load Weight",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "B",
    tags: ["load-weight", "operator", "rigger"],
    source: ws("14.36"),
    question: "Who must be informed of the weight of a load before it is hoisted?",
    choices: [
      "Only the superintendent",
      "The crane operator and any person rigging the load",
      "Only the crane owner",
      "Only the engineer",
    ],
    correct: 1,
    explanation:
      "The weight of each load must be determined and communicated to both the equipment operator and any person rigging the load.",
  }),
  mc(46, {
    category: "Hoisting Calculations",
    subcategory: "Unknown Load Weight",
    difficulty: "intermediate",
    examLevels: L1R,
    mwa: "B",
    tags: ["load-weight", "lmi", "unknown-weight"],
    source: ws("14.36"),
    question:
      "The weight of a load cannot be accurately determined. What equipment feature is required by WorkSafeBC for the lift?",
    choices: [
      "Boom-angle indicator only",
      "Load weight indicator or overload prevention system",
      "Additional counterweight",
      "Four-part line",
    ],
    correct: 1,
    explanation:
      "If load weight cannot be accurately determined, the crane or hoist used for the lift must have a load weight indicator or overload prevention system.",
  }),
  mc(47, {
    category: "LMI and RCL",
    subcategory: "Calibration",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "C",
    tags: ["lmi", "calibration", "overload"],
    source: ws("14.37"),
    question: "When must a load moment indicator be calibrated?",
    choices: [
      "Every morning regardless of manufacturer requirements",
      "At manufacturer-specified intervals and whenever there is an indication it is not functioning correctly",
      "Only when the crane is sold",
      "Only after an overload",
    ],
    correct: 1,
    explanation:
      "Load weighing devices, load moment indicators and overload prevention systems must be calibrated at manufacturer-specified intervals and when there is an indication of incorrect operation.",
  }),
  mc(48, {
    category: "Common Occupational Skills",
    subcategory: "Operator Duties",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["operator", "control", "duties"],
    source: ws("14.37.1"),
    question: "While hoisting equipment is in use, what other duties may the operator perform?",
    choices: [
      "Rigging loads",
      "Completing paperwork",
      "Directing traffic",
      "No other duties that interfere with maintaining full control of the equipment controls",
    ],
    correct: 3,
    explanation:
      "The operator must have full control of the equipment controls and engage in no other duties while operating the equipment.",
  }),
  mc(49, {
    category: "Rated Capacity",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "B",
    tags: ["capacity", "overload", "rated"],
    source: ws("14.38"),
    question:
      "May the rated capacity of a crane be exceeded if the lift is only a few inches off the ground?",
    choices: [
      "Yes",
      "Yes, by 10%",
      "No",
      "Only with additional parts of line",
    ],
    correct: 2,
    explanation: "WorkSafeBC states that the rated capacity of a crane or hoist must not be exceeded.",
  }),
  mc(50, {
    category: "Safe Work Practices",
    subcategory: "Safe Lifting",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["operator", "load-control", "judgment"],
    source: ws("14.38"),
    question: "When may an operator move a suspended load?",
    choices: [
      "Whenever a signal is received",
      "When the operator is satisfied that the load can be handled safely",
      "Whenever the load is below 5 tonnes",
      "Only when the superintendent is watching",
    ],
    correct: 1,
    explanation: "The operator must not move a load unless satisfied that it can be handled safely.",
  }),
  mc(51, {
    category: "Rigging",
    subcategory: "Load Security",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "load-security", "hitch"],
    source: ws("14.38"),
    question: "How must a load be secured during a lift?",
    choices: [
      "So no part of the load can become dislodged",
      "Only enough to lift clear of the ground",
      "With a tagline in every case",
      "With exactly four slings",
    ],
    correct: 0,
    explanation:
      "A load must be secured so that all or any part of it cannot be dislodged during the lift.",
  }),
  mc(52, {
    category: "Rigging",
    subcategory: "Load Control",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["taglines", "load-control", "rigging"],
    source: ws("14.38"),
    question: "When are taglines or another effective means of load control required?",
    choices: [
      "On every lift without exception",
      "When necessary to control hazardous load movement or assist positioning",
      "Only when lifting concrete",
      "Only above 20 tonnes",
    ],
    correct: 1,
    explanation:
      "Taglines or other effective methods are required when necessary to control hazardous movement or assist with positioning.",
  }),
  mc(53, {
    category: "Safe Work Practices",
    subcategory: "Swing Hazard",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["swing", "counterweight", "exclusion"],
    source: ws("14.40"),
    question:
      "A worker enters the counterweight swing area while the crane is operating. What should the operator do when movement would create a hazard?",
    choices: [
      "Swing slowly",
      "Sound the horn and continue",
      "Do not move the equipment while the person is within the hazardous swing area",
      "Continue if the load is light",
    ],
    correct: 2,
    explanation:
      "The operator must not move the equipment when a person is within a hazardous swing or shearing area.",
  }),
  mc(54, {
    category: "Crane Setup",
    subcategory: "Clearance",
    difficulty: "intermediate",
    examLevels: L1R,
    mwa: "E",
    tags: ["clearance", "setup", "obstruction"],
    source: ws("14.41"),
    question:
      "Where an area is accessible to workers, how much clearance must normally be maintained between moving crane parts and an obstruction?",
    choices: ["15 cm", "30 cm", "60 cm", "1.5 m"],
    correct: 2,
    explanation:
      "Equipment must normally be positioned so that moving parts remain at least 60 cm (2 ft) from obstructions in areas accessible to workers. If that clearance cannot be provided, access must be prevented by barriers or another effective method.",
  }),
  mc(55, {
    category: "Critical Lifts",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["critical-lift", "lift-plan", "documentation"],
    source: ws("14.42.1"),
    question: "What documentation is required for every critical lift?",
    choices: [
      "A verbal instruction only",
      "A written lift plan available at the worksite",
      "A crane rental invoice",
      "An operator résumé",
    ],
    correct: 1,
    explanation:
      "Every critical lift requires a written lift plan that is available at the worksite during the lift.",
  }),
  mc(56, {
    category: "Critical Lifts",
    subcategory: "Pre-Job Meeting",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["critical-lift", "pre-job", "communication"],
    source: ws("14.42.1"),
    question: "Immediately before a critical lift begins, what must occur?",
    choices: [
      "Only the operator reviews the plan",
      "The lift plan must be communicated to all involved people at a documented pre-job meeting",
      "A test lift to full radius must always be completed",
      "The load must be lifted to maximum height",
    ],
    correct: 1,
    explanation:
      "The critical lift plan must be communicated at a pre-job meeting immediately before hoisting, and the supervisor must document the meeting.",
  }),
  mc(57, {
    category: "Critical Lifts",
    subcategory: "Change Management",
    difficulty: "intermediate",
    examLevels: L3R,
    mwa: "E",
    tags: ["critical-lift", "pre-job", "change"],
    source: ws("14.42.1"),
    question:
      "The people or equipment involved in a critical lift change after the pre-job meeting. What is required?",
    choices: [
      "Nothing",
      "Repeat the required pre-job meeting",
      "Reduce the load by 10%",
      "Replace the signal person",
    ],
    correct: 1,
    explanation:
      "The pre-job meeting must be repeated whenever there is a change in the people or equipment involved in the critical lift.",
  }),
  mc(58, {
    category: "Lift Planning",
    subcategory: "Tandem Lift",
    difficulty: "intermediate",
    examLevels: L3R,
    mwa: "E",
    tags: ["tandem", "lift-plan", "multi-crane"],
    source: ws("14.42"),
    question: "What is required for every tandem lift in B.C.?",
    choices: [
      "A written lift plan",
      "Four riggers",
      "Two identical cranes",
      "A load less than 50% capacity",
    ],
    correct: 0,
    explanation:
      "A written lift plan is required for every tandem lift and must be available at the worksite.",
  }),
  mc(59, {
    category: "Pick and Carry",
    subcategory: "Load Position",
    difficulty: "basic",
    examLevels: L13R,
    mwa: "G",
    tags: ["pick-and-carry", "travel", "load-height"],
    source: ws("14.43"),
    question: "When travelling with a suspended load, where should the load be carried?",
    choices: [
      "As high as possible",
      "As close to the ground or grade as possible",
      "Above cab height",
      "At maximum boom angle",
    ],
    correct: 1,
    explanation:
      "The load must be carried as close to the ground or grade as possible and rigged to control load swing.",
  }),
  mc(60, {
    category: "Safe Work Practices",
    subcategory: "Suspended Loads",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["suspended-load", "exclusion", "planning"],
    source: ws("14.44"),
    question: "What should normally be done regarding travelling a suspended load over people?",
    choices: [
      "Arrange the work to prevent it where practicable",
      "It is acceptable below 50% capacity",
      "It is acceptable with a tagline",
      "It is always acceptable outdoors",
    ],
    correct: 0,
    explanation:
      "Work should be arranged, where practicable, to prevent passing a load over any person.",
  }),
  mc(61, {
    category: "Safe Work Practices",
    subcategory: "Suspended Loads",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["suspended-load", "under-load", "exclusion"],
    source: ws("14.44"),
    question: "May a worker stand beneath a suspended load?",
    choices: [
      "Yes, while wearing a hard hat",
      "Yes, for less than one minute",
      "No",
      "Only when the operator can see the worker",
    ],
    correct: 2,
    explanation: "A person must not stand under or pass beneath a suspended load.",
  }),
  mc(62, {
    category: "Safe Work Practices",
    subcategory: "Unattended Load",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["unattended", "suspended-load", "controls"],
    source: ws("14.45"),
    question:
      "Can a suspended load be left supported by the crane while the operator leaves the controls?",
    choices: [
      "Yes, if the brake is set",
      "Yes, below 5 tonnes",
      "No",
      "Only for 15 minutes",
    ],
    correct: 2,
    explanation:
      "A load must not be left suspended from or supported by a crane or hoist when the operator is not at the controls.",
  }),
  mc(63, {
    category: "Advanced Operations",
    subcategory: "Side Loading",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["side-loading", "load-line", "vertical"],
    source: ws("14.46"),
    question:
      "How should the load line above the hook or load block be positioned when lifting?",
    choices: [
      "Horizontal",
      "Vertical",
      "At approximately 45°",
      "Any angle below capacity",
    ],
    correct: 1,
    explanation:
      "The load line must be kept vertical when lifting to prevent side loading and uncontrolled load swing.",
  }),
  mc(64, {
    category: "Signals",
    subcategory: "Blind Lift",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["signals", "signaller", "blind-lift"],
    source: ws("14.47"),
    question:
      "The operator cannot clearly see the load throughout the complete hoisting operation. Whose directions must the operator follow?",
    choices: [
      "Any nearby worker",
      "A qualified signaller who can see what the operator cannot",
      "Only the site owner",
      "No signals are required",
    ],
    correct: 1,
    explanation:
      "When the operator does not have a clear and unobstructed view throughout the operation, movement must be directed by a qualified signaller with the necessary view.",
  }),
  mc(65, {
    category: "Signals",
    subcategory: "Stop Signal",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["signals", "stop", "operator"],
    source: ws("14.47"),
    question: "Who may give a stop signal that the crane operator must obey?",
    choices: [
      "Only the designated signaller",
      "Only the superintendent",
      "Any person",
      "Only another crane operator",
    ],
    correct: 2,
    explanation: "The operator must stop the operation on receiving a stop signal from any person.",
  }),
  mc(66, {
    category: "Communications",
    difficulty: "intermediate",
    examLevels: P1R,
    mwa: "A",
    tags: ["radio", "signals", "communication"],
    source: ws("14.48"),
    question:
      "Hand signals become impracticable because of distance and visibility. What should be used?",
    choices: [
      "Guessing based on previous movements",
      "An acceptable two-way radio or other suitable audio/video communication system",
      "Text messages",
      "Boom horn signals only",
    ],
    correct: 1,
    explanation:
      "An acceptable two-way radio or audio/video system must be used when circumstances make hand signals hazardous or impracticable.",
  }),
  mc(67, {
    category: "Rigging",
    subcategory: "Detaching Loads",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "landing", "unhook"],
    source: ws("14.50 / 15.3"),
    question: "Before rigging is detached from a load, what must happen?",
    choices: [
      "The hook must be raised",
      "The load must be safely landed and supported",
      "The crane must be shut off",
      "The slings must be loosened while suspended",
    ],
    correct: 1,
    explanation:
      "A load must be safely landed and supported before it is unhooked or the rigging is detached.",
  }),
  mc(68, {
    category: "Safe Work Practices",
    subcategory: "Riding Loads",
    difficulty: "basic",
    examLevels: P1,
    mwa: "A",
    tags: ["riding-load", "personnel", "hook"],
    source: ws("14.51"),
    question:
      "May a worker ride on a crane hook, sling or suspended load during a normal material lift?",
    choices: ["Yes", "Only below 10 ft", "No", "Only with a tagline"],
    correct: 2,
    explanation: "A worker must not ride on a load, sling, hook or other rigging equipment.",
  }),
  mc(69, {
    category: "Electrical Hazards",
    difficulty: "intermediate",
    examLevels: P1R,
    mwa: "E",
    tags: ["powerlines", "mad", "electrical"],
    source: ws("14.52.1 / Part 19"),
    question:
      "When operating near energized high-voltage conductors, what must be prevented?",
    choices: [
      "The hook from rotating",
      "Any part of the crane, load line, rigging or load entering the required minimum approach distance",
      "The engine from idling",
      "The outriggers from touching the ground",
    ],
    correct: 1,
    explanation:
      "The crane must be operated so the crane, load line, rigging and load remain outside the applicable minimum distance from energized high-voltage conductors or equipment.",
  }),
  mc(70, {
    category: "LMI and RCL",
    subcategory: "Load Indicator",
    difficulty: "intermediate",
    examLevels: L1R,
    mwa: "C",
    tags: ["lmi", "mobile", "10-tonnes"],
    source: ws("14.64"),
    question:
      "Subject to specified exceptions, a mobile crane with what rated capacity must have the required load-indicating or overload-prevention device?",
    choices: [
      "2 tonnes or more",
      "5 tonnes or more",
      "10 tonnes or more",
      "100 tonnes or more",
    ],
    correct: 2,
    explanation:
      "A mobile crane or boom truck rated at 10 tonnes (11 tons) or more must have the specified load weight indicating or overload-prevention capability, subject to the regulation's exceptions.",
  }),
  mc(71, {
    category: "Outriggers",
    subcategory: "Extension",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["outriggers", "markings", "extension"],
    source: ws("14.67"),
    question: "What must outrigger beams and stabilizers have to identify required extension?",
    choices: [
      "Paint chosen by the operator",
      "Markings indicating when the necessary extension has been achieved",
      "A separate radio",
      "A capacity plate on every jack cylinder",
    ],
    correct: 1,
    explanation:
      "Outrigger beams and stabilizers must be marked to indicate when the necessary extension has been achieved.",
  }),
  mc(72, {
    category: "Outriggers",
    subcategory: "Floats",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["outriggers", "floats", "setup"],
    source: ws("14.67"),
    question: "When outriggers are used, what is required of the outrigger floats?",
    choices: [
      "They must be removed",
      "They must be secured to the outrigger jacks",
      "They must be welded to the crane carrier",
      "They must always be placed directly on soil",
    ],
    correct: 1,
    explanation:
      "WorkSafeBC requires outrigger floats to be secured to the outrigger jacks when outriggers are used.",
  }),
  mc(73, {
    category: "Pick and Carry",
    subcategory: "Tires",
    difficulty: "basic",
    examLevels: L1R,
    mwa: "G",
    tags: ["on-rubber", "tires", "manufacturer"],
    source: ws("14.68"),
    question:
      "When lifting on rubber, how must mobile-crane tire type, condition and inflation be established?",
    choices: [
      "According to the rigger",
      "According to the manufacturer",
      "By keeping all tires at maximum shop pressure",
      "Tire condition does not affect capacity",
    ],
    correct: 1,
    explanation:
      "When lifting on rubber, tire type, condition and inflation must conform to the manufacturer's specifications.",
  }),
  mc(74, {
    category: "Ground Conditions",
    subcategory: "Supporting Surface",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["ground", "setup", "bearing"],
    source: ws("14.69"),
    question: "On what type of surface may a mobile crane be used?",
    choices: [
      "Any paved surface",
      "Only a surface capable of safely supporting the equipment and hoisted load",
      "Only concrete",
      "Any surface if steel mats are available",
    ],
    correct: 1,
    explanation:
      "A mobile crane must be used only on a surface capable of safely supporting the crane and any hoisted load.",
  }),
  mc(75, {
    category: "Ground Conditions",
    subcategory: "Excavations",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["ground", "excavation", "qualified-person"],
    source: ws("14.69"),
    question:
      "A mobile crane is to be set up adjacent to an excavation, slope or backfilled area. Who must determine the location of the crane for hoisting?",
    choices: [
      "Any rigger",
      "A qualified person",
      "The truck driver only",
      "The client",
    ],
    correct: 1,
    explanation:
      "A qualified person must determine the location when a mobile crane or boom truck will operate adjacent to an excavation, slope or backfilled area.",
  }),
  mc(76, {
    category: "Ground Conditions",
    subcategory: "Cribbing",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["ground", "cribbing", "bearing"],
    source: ws("14.69"),
    question:
      "What is the purpose of appropriately sized blocking, shoring or cribbing beneath mobile-crane supports?",
    choices: [
      "Increase boom length",
      "Ensure crane support loading does not exceed the bearing capacity of the supporting surface",
      "Increase hoist line speed",
      "Reduce hook block weight",
    ],
    correct: 1,
    explanation:
      "Blocking, shoring or cribbing must be sized and used as necessary so crane support loading does not exceed the bearing capacity of the ground or supporting surface.",
  }),
  mc(77, {
    category: "Pick and Carry",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "G",
    tags: ["pick-and-carry", "travel", "manufacturer"],
    source: ws("14.70"),
    question: "When may a mobile crane travel with a suspended load?",
    choices: [
      "Whenever the operator believes it is safe",
      "Only when the manufacturer specifies load ratings for travelling with a load and the operation follows the manufacturer's instructions",
      "Whenever the load is below 50% of outrigger capacity",
      "Only when outriggers are partly extended",
    ],
    correct: 1,
    explanation:
      "Travelling with a suspended load is permitted only when the manufacturer specifies ratings for that operation and the crane is operated according to the manufacturer's instructions.",
  }),
  mc(78, {
    category: "Inspections",
    subcategory: "Annual Inspection",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "C",
    tags: ["annual-inspection", "12-months", "engineering"],
    source: ws("14.71"),
    question:
      "At minimum, how often must a mobile crane or boom truck receive the WorkSafeBC annual inspection?",
    choices: [
      "Every 3 months",
      "Every 6 months",
      "At least once every 12 months",
      "Every 24 months",
    ],
    correct: 2,
    explanation:
      "A mobile crane or boom truck must be inspected at least once every 12 months in accordance with good engineering practice.",
  }),
  mc(79, {
    category: "Inspections",
    subcategory: "Annual Certification",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "C",
    tags: ["annual-inspection", "engineer", "certification"],
    source: ws("14.71"),
    question:
      "After the required annual mobile-crane inspection, what is required before the crane may be used?",
    choices: [
      "The operator signs the logbook",
      "A professional engineer certifies the crane is safe for use based on the inspection",
      "The crane completes a lift at 50% capacity",
      "The superintendent verbally approves it",
    ],
    correct: 1,
    explanation:
      "Following the annual inspection, the crane must not be used unless a professional engineer certifies it safe for use on the basis of that inspection.",
  }),
  mc(80, {
    category: "Rigging",
    subcategory: "Qualified Rigger",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "qualified", "signals"],
    source: ws("15.2", 15),
    question: "Who must perform or directly supervise rigging and slinging work?",
    choices: [
      "Any construction worker",
      "A qualified worker familiar with the rigging being used and the authorized signal code",
      "Only the crane operator",
      "Only a professional engineer",
    ],
    correct: 1,
    explanation:
      "Rigging and slinging work must be performed by, or under the direct supervision of, qualified workers familiar with the rigging equipment and the authorized code of signals.",
  }),
];
