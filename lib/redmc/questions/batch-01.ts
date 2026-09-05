import type { MobileExamLevel, MobileMwa, MobileQuestion } from "../types";

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
  calculation?: boolean;
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
    reference: "",
    chartId: null,
    calculation: spec.calculation ?? false,
    sourceVerified: false,
  };
}

const P1R: MobileExamLevel[] = ["provisional", "level1", "redseal"];
const L1R: MobileExamLevel[] = ["level1", "redseal"];
const L13R: MobileExamLevel[] = ["level1", "level3", "redseal"];
const L3R: MobileExamLevel[] = ["level3", "redseal"];

export const BATCH_01: MobileQuestion[] = [
  mc(1, {
    category: "Crane Setup",
    subcategory: "Outriggers",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["outriggers", "setup", "stability"],
    question:
      "What is the primary purpose of fully extending and properly supporting a mobile crane's outriggers when required by the load chart?",
    choices: [
      "Increase hoist speed",
      "Increase the crane's stability and provide the rated operating base",
      "Reduce wire rope wear",
      "Prevent the boom from telescoping",
    ],
    correct: 1,
    explanation:
      "Outriggers create the support base assumed by the applicable load chart and help resist overturning forces. If the crane is not set up in the configuration specified by the chart, the published capacities may not apply.",
  }),
  mc(2, {
    category: "Crane Setup",
    subcategory: "Level",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["level", "setup", "stability"],
    question:
      "Before performing a lift, why must a mobile crane be level within the manufacturer's allowable tolerance?",
    choices: [
      "To increase engine power",
      "To reduce hook block weight",
      "Because an out-of-level crane can reduce stability and alter load effects",
      "Because the boom cannot telescope unless perfectly level",
    ],
    correct: 2,
    explanation:
      "An out-of-level crane can shift load effects toward one side of the machine and reduce the stability margin. The operator must set the crane up within the manufacturer's specified level tolerance.",
  }),
  mc(3, {
    category: "Load Charts",
    subcategory: "Radius",
    difficulty: "basic",
    examLevels: L1R,
    mwa: "B",
    tags: ["load-charts", "radius", "centre-of-rotation"],
    question: "For most mobile crane load charts, operating radius is measured from:",
    choices: [
      "The boom tip to the load",
      "The centre of rotation of the crane to the vertical load line",
      "The front bumper to the hook",
      "The rear axle to the boom tip",
    ],
    correct: 1,
    explanation:
      "Operating radius is generally the horizontal distance from the crane's centre of rotation to the vertical line through the suspended load. The applicable manufacturer's chart definitions must always be followed.",
  }),
  mc(4, {
    category: "Gross vs Net Capacity",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "B",
    tags: ["gross-net", "deductions", "hook-block"],
    calculation: true,
    question:
      "A load chart shows a gross rated capacity of 18,000 lb. The hook block and rigging together weigh 2,000 lb. Ignoring all other deductions, what is the maximum allowable load weight?",
    choices: ["16,000 lb", "18,000 lb", "20,000 lb", "14,000 lb"],
    correct: 0,
    explanation:
      "Rated capacity = 18,000 lb\n\nDeductions:\nHook block and rigging = 2,000 lb\n\n18,000 − 2,000 = 16,000 lb\n\nMaximum allowable load weight = 16,000 lb.\n\nThe hook block and rigging are part of the total suspended load. Other chart deductions may still apply.",
  }),
  mc(5, {
    category: "Capacity Deductions",
    difficulty: "basic",
    examLevels: L1R,
    mwa: "B",
    tags: ["deductions", "suspended-load", "rigging"],
    question:
      "Which item normally forms part of the total suspended load when determining whether a crane is within rated capacity?",
    choices: [
      "The crane's fuel",
      "The operator",
      "The hook block and rigging",
      "The outrigger floats",
    ],
    correct: 2,
    explanation:
      "The suspended load generally includes the load itself plus below-the-boom-point equipment such as the hook block, slings, shackles, lifting beams and other rigging as applicable.",
  }),
  mc(6, {
    category: "Parts of Line",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "B",
    tags: ["parts-of-line", "line-pull", "reeving"],
    calculation: true,
    question:
      "A hoist has an allowable single-line pull of 12,000 lb. Ignoring efficiency losses and other restrictions, what theoretical line-supported load would four parts of line provide?",
    choices: ["3,000 lb", "12,000 lb", "24,000 lb", "48,000 lb"],
    correct: 3,
    explanation:
      "Line-supported load = single-line pull × parts of line\n\nSingle-line pull = 12,000 lb\nParts of line = 4\n\n12,000 × 4 = 48,000 lb\n\nTheoretical line-supported load = 48,000 lb.\n\nThe crane's actual allowable load is still limited by the manufacturer's load chart, hoist restrictions, reeving limits and other applicable ratings.",
  }),
  mc(7, {
    category: "Rigging",
    subcategory: "Sling Angle",
    difficulty: "intermediate",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "sling-angle", "tension"],
    question:
      "As the angle of a two-leg sling becomes flatter relative to the horizontal, what happens to the tension in each sling leg?",
    choices: [
      "It decreases",
      "It remains unchanged",
      "It increases",
      "It becomes zero",
    ],
    correct: 2,
    explanation:
      "As the sling angle becomes flatter, the tension in each sling leg increases. Low sling angles can generate very high leg forces even when the load weight itself has not changed.",
  }),
  mc(8, {
    category: "Rigging",
    subcategory: "Centre of Gravity",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "centre-of-gravity", "load-control"],
    question:
      "What will normally happen when a load is lifted with its hook point not directly above the load's centre of gravity?",
    choices: [
      "The load will remain perfectly level",
      "The load will tend to shift until its centre of gravity is below the hook",
      "The crane will automatically correct the hook position",
      "The rigging tension will become zero",
    ],
    correct: 1,
    explanation:
      "A freely suspended load will tend to rotate or shift until its centre of gravity is vertically beneath the hook. This is why centre-of-gravity assessment is important before lifting.",
  }),
  mc(9, {
    category: "Signals",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["signals", "emergency-stop", "communications"],
    question: "When should a crane operator obey an emergency stop signal?",
    choices: [
      "Only when it comes from the designated signal person",
      "Only when the superintendent gives it",
      "When it is given by any person who identifies an immediate danger",
      "Only after radio confirmation",
    ],
    correct: 2,
    explanation:
      "An emergency stop signal must be treated differently from routine operating signals. The operator should stop when an emergency stop is given because an immediate hazard may exist.",
  }),
  mc(10, {
    category: "Communications",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "A",
    tags: ["communications", "blind-lift", "stop-work"],
    question:
      "During a blind lift, required communication between the operator and signal person is lost. What is the best action?",
    choices: [
      "Continue slowly",
      "Stop crane movement until reliable communication is restored",
      "Continue if the operator remembers the previous instruction",
      "Complete the lift using only the LMI",
    ],
    correct: 1,
    explanation:
      "When required communication is lost, the operator should stop the operation safely until reliable communication is restored.",
  }),
  mc(11, {
    category: "Anti-Two-Block",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["anti-two-block", "atb", "hoist"],
    question: "What hazard is an anti-two-block system intended to help prevent?",
    choices: [
      "The boom contacting an outrigger",
      "The hook block or overhaul ball contacting the boom tip or upper sheave assembly",
      "Excessive engine speed",
      "The crane travelling too quickly",
    ],
    correct: 1,
    explanation:
      "Two-blocking occurs when the hook block or overhaul ball is hoisted into the boom tip or upper sheave assembly. This can damage equipment and potentially cause wire rope failure.",
  }),
  mc(12, {
    category: "LMI and RCL",
    difficulty: "basic",
    examLevels: L13R,
    mwa: "G",
    tags: ["lmi", "rcl", "rated-capacity"],
    question: "What is the primary function of a rated capacity limiter or load moment system?",
    choices: [
      "Replace the manufacturer's load chart",
      "Assist the operator by monitoring crane configuration and loading conditions",
      "Determine the qualifications of the rigger",
      "Automatically inspect wire rope",
    ],
    correct: 1,
    explanation:
      "Rated capacity and load moment systems assist the operator by monitoring crane configuration, geometry and loading. They do not replace the operator's responsibility to understand and use the correct load chart and configuration.",
  }),
  mc(13, {
    category: "LMI and RCL",
    difficulty: "intermediate",
    examLevels: L3R,
    mwa: "G",
    tags: ["lmi", "rcl", "configuration"],
    question: "Before relying on an LMI or rated capacity system, what must the operator confirm?",
    choices: [
      "The screen brightness is at maximum",
      "The crane configuration entered in the system matches the actual crane configuration",
      "The radio battery is fully charged",
      "The crane has a full fuel tank",
    ],
    correct: 1,
    explanation:
      "If boom length, counterweight, outrigger position, reeving, attachment or another configuration value is entered incorrectly, the system may calculate an incorrect allowable capacity.",
  }),
  mc(14, {
    category: "Ground Conditions",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["ground", "mats", "outriggers", "bearing"],
    question: "Why are outrigger mats or cribbing sometimes required?",
    choices: [
      "To increase boom length",
      "To distribute crane reactions over a larger ground area",
      "To reduce rigging weight",
      "To prevent the hook from swinging",
    ],
    correct: 1,
    explanation:
      "Mats and properly designed support materials increase the bearing area beneath the outrigger and can reduce the pressure applied to the supporting surface.",
  }),
  mc(15, {
    category: "Ground Conditions",
    subcategory: "Bearing Pressure",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "B",
    tags: ["ground", "bearing-pressure", "mats"],
    calculation: true,
    question:
      "An outrigger is applying 80,000 lb to a mat with an effective bearing area of 20 square feet. What is the average ground bearing pressure?",
    choices: ["400 psf", "4,000 psf", "8,000 psf", "16,000 psf"],
    correct: 1,
    explanation:
      "Ground pressure = force ÷ area\n\nForce = 80,000 lb\nArea = 20 ft²\n\n80,000 ÷ 20 = 4,000 psf\n\nAverage ground bearing pressure = 4,000 psf.\n\nThe supporting surface must still be able to take that pressure. This is an average over the mat area, not a site-specific soil rating.",
  }),
  mc(16, {
    category: "Crane Stability",
    difficulty: "basic",
    examLevels: L1R,
    mwa: "E",
    tags: ["stability", "radius", "load-moment"],
    question:
      "What generally happens to crane stability as operating radius increases while the load remains the same?",
    choices: [
      "Stability increases",
      "Stability is unaffected",
      "Overturning moment increases",
      "The crane automatically gains capacity",
    ],
    correct: 2,
    explanation:
      "Load moment is related to load multiplied by radius. Increasing the radius increases the overturning effect of the same suspended load.",
  }),
  mc(17, {
    category: "Hoisting Calculations",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "B",
    tags: ["calculations", "load-weight", "volume"],
    calculation: true,
    question:
      "A concrete component measures 4 ft × 3 ft × 2 ft. Its material weighs 150 lb per cubic foot. Approximately how much does the component weigh?",
    choices: ["1,800 lb", "2,400 lb", "3,600 lb", "7,200 lb"],
    correct: 2,
    explanation:
      "Weight = volume × unit weight\n\nVolume = 4 × 3 × 2 = 24 ft³\nUnit weight = 150 lb/ft³\n\n24 × 150 = 3,600 lb\n\nApproximate component weight = 3,600 lb.\n\nConfirm actual shipping weight or engineered weight before using it for a lift plan.",
  }),
  mc(18, {
    category: "Hoisting Calculations",
    subcategory: "Radius",
    difficulty: "basic",
    examLevels: L1R,
    mwa: "B",
    tags: ["calculations", "load-moment", "radius"],
    calculation: true,
    question:
      "A 10,000 lb load is suspended at a 40 ft operating radius. What is the load moment created by the load, ignoring other factors?",
    choices: ["40,000 ft-lb", "250,000 ft-lb", "400,000 ft-lb", "4,000,000 ft-lb"],
    correct: 2,
    explanation:
      "Load moment = load × radius\n\nLoad = 10,000 lb\nRadius = 40 ft\n\n10,000 × 40 = 400,000 ft-lb\n\nLoad moment = 400,000 ft-lb.\n\nRated capacity is still taken from the applicable load chart, not from this moment figure alone.",
  }),
  mc(19, {
    category: "Wire Rope",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["wire-rope", "inspection", "removal"],
    question:
      "What should an operator do if inspection identifies wire rope damage that meets the applicable removal criteria?",
    choices: [
      "Continue using the rope at half capacity",
      "Lubricate it and continue",
      "Remove the rope from service in accordance with the applicable requirements",
      "Use additional parts of line",
    ],
    correct: 2,
    explanation:
      "Wire rope that meets applicable removal criteria must not remain in service merely because the intended lift is light.",
  }),
  mc(20, {
    category: "Inspections",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "C",
    tags: ["inspections", "safety-devices", "pre-use"],
    question: "Why should crane safety devices and indicators be checked before operation?",
    choices: [
      "To increase crane capacity",
      "To confirm the systems required for safe operation are functioning as intended",
      "To reduce counterweight requirements",
      "To eliminate the need for a load chart",
    ],
    correct: 1,
    explanation:
      "Safety devices and operational indicators form part of the crane's safety system and should be verified as required before relying on them during operation.",
  }),
  mc(21, {
    category: "Lift Planning",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["lift-planning", "configuration", "radius"],
    question:
      "Before selecting a crane configuration for a lift, which information is most important to establish?",
    choices: [
      "Operator's preferred boom angle only",
      "Load weight, required radius, lift path, setup conditions and crane configuration",
      "Colour of the crane",
      "Number of workers on the project",
    ],
    correct: 1,
    explanation:
      "Crane selection and configuration depend on the actual load, radius, site conditions, required clearances, lift path and available setup configuration.",
  }),
  mc(22, {
    category: "Load Charts",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "B",
    tags: ["load-charts", "radius", "interpolation"],
    question:
      "A crane load chart provides capacities at 40 ft and 45 ft radius. The actual operating radius is 42 ft and the chart does not permit interpolation. Which radius should be used?",
    choices: ["40 ft", "41 ft", "42 ft", "45 ft"],
    correct: 3,
    explanation:
      "Where interpolation is not permitted and the exact radius is not listed, the operator uses the next greater listed radius because it provides the more restrictive capacity.",
  }),
  mc(23, {
    category: "Boom Length and Radius",
    difficulty: "intermediate",
    examLevels: L1R,
    mwa: "B",
    tags: ["boom", "radius", "capacity"],
    question:
      "If the load remains suspended and the boom is lowered, causing the operating radius to increase, what normally happens to available crane capacity?",
    choices: [
      "It normally decreases",
      "It always doubles",
      "It always remains unchanged",
      "It becomes equal to line pull",
    ],
    correct: 0,
    explanation:
      "As radius increases, the crane generally has less rated capacity because the overturning moment increases. The actual capacity must always be taken from the applicable load chart.",
  }),
  mc(24, {
    category: "Outriggers",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "E",
    tags: ["outriggers", "setup", "load-charts"],
    question:
      "A crane is set up with outriggers only partially extended. What load chart should be used?",
    choices: [
      "The fully extended outrigger chart",
      "The on-rubber chart regardless of manufacturer instructions",
      "The chart specifically applicable to the actual outrigger configuration",
      "The chart with the highest listed capacity",
    ],
    correct: 2,
    explanation:
      "Rated capacities depend on the actual crane configuration. The operator must use the chart corresponding to the actual approved outrigger position and setup.",
  }),
  mc(25, {
    category: "Capacity Deductions",
    difficulty: "intermediate",
    examLevels: L13R,
    mwa: "B",
    tags: ["deductions", "gross-net", "rigging"],
    calculation: true,
    question:
      "A crane has a gross chart capacity of 25,000 lb. The hook block weighs 1,500 lb, the lifting beam weighs 1,200 lb and the slings and shackles weigh 300 lb. What is the maximum load weight, assuming no other deductions?",
    choices: ["22,000 lb", "23,500 lb", "25,000 lb", "28,000 lb"],
    correct: 0,
    explanation:
      "Rated capacity = 25,000 lb\n\nDeductions:\nHook block = 1,500 lb\nLifting beam = 1,200 lb\nRigging = 300 lb\n\nTotal deductions = 3,000 lb\n\n25,000 − 3,000 = 22,000 lb\n\nMaximum allowable load weight = 22,000 lb.",
  }),
  mc(26, {
    category: "Rigging",
    subcategory: "Load Control",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "D",
    tags: ["rigging", "tagline", "load-control"],
    question:
      "What is the primary purpose of a tagline on a suspended load when its use is appropriate?",
    choices: [
      "Increase crane capacity",
      "Control load rotation or movement from a safe position",
      "Support half of the load weight",
      "Replace the signal person",
    ],
    correct: 1,
    explanation:
      "A tagline can help control unwanted load rotation or movement while allowing workers to remain away from the suspended load and pinch points, when conditions permit its safe use.",
  }),
  mc(27, {
    category: "Electrical Hazards",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "E",
    tags: ["electrical", "powerlines", "planning"],
    question:
      "When crane operations may bring the crane or load near energized overhead conductors, what should happen before work begins?",
    choices: [
      "The operator should estimate the distance while lifting",
      "The hazard must be assessed and required clearance/control measures established before the operation",
      "The hook should be grounded",
      "The crane should operate faster through the hazard area",
    ],
    correct: 1,
    explanation:
      "Electrical hazards must be identified during planning and controlled before crane movement places the crane, boom, load line or load near energized conductors.",
  }),
  mc(28, {
    category: "Weather",
    difficulty: "basic",
    examLevels: P1R,
    mwa: "G",
    tags: ["weather", "wind", "manufacturer"],
    question:
      "Who determines the allowable operating limits for wind and other environmental conditions affecting a specific mobile crane?",
    choices: [
      "Any worker on site",
      "The crane manufacturer and applicable engineered/regulated requirements",
      "The load itself",
      "The signal person alone",
    ],
    correct: 1,
    explanation:
      "Environmental operating limits depend on the crane, configuration and manufacturer's requirements, together with any applicable engineered or regulatory restrictions. There is no single wind speed that applies to every mobile crane.",
  }),
  mc(29, {
    category: "Pick and Carry",
    difficulty: "intermediate",
    examLevels: L3R,
    mwa: "G",
    tags: ["pick-and-carry", "travel", "on-rubber"],
    question:
      "When travelling a mobile crane with a suspended load, which capacity information must be used?",
    choices: [
      "The stationary outrigger chart",
      "The manufacturer's applicable pick-and-carry or on-rubber travelling capacity information",
      "The crane's maximum counterweight rating",
      "The bare boom structural capacity only",
    ],
    correct: 1,
    explanation:
      "Travelling with a suspended load introduces different stability and dynamic considerations. Only the manufacturer's applicable travelling or pick-and-carry capacities and procedures should be used.",
  }),
  mc(30, {
    category: "Transportation",
    difficulty: "basic",
    examLevels: L13R,
    mwa: "F",
    tags: ["transportation", "securement", "road"],
    question: "Before transporting a mobile crane on public roads, what should be confirmed?",
    choices: [
      "Only the hook block weight",
      "Applicable transport configuration, securement, dimensions, weights and road requirements",
      "The crane is at maximum boom angle",
      "Outriggers are fully extended",
    ],
    correct: 1,
    explanation:
      "Transport requires the crane to be configured and secured appropriately and to comply with applicable dimensional, weight, permitting and road requirements.",
  }),
];
