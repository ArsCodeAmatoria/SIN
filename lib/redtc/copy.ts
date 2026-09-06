export const REDTC_FEATURES = [
  {
    label: "Practice",
    title: "Exam questions tagged to B.C. papers",
    body: "Every question includes why the correct answer is right and why others are wrong.",
  },
  {
    label: "Charts",
    title: "Real manufacturer load charts (PDF)",
    body: "Practice reading actual Liebherr, Potain, WOLFF, Terex, Krøll, and Pecco load charts — flat-top, luffing, and self-erecting cranes.",
  },
  {
    label: "Pass",
    title: "70% pass rate mirrors the real exam",
    body: "Practice tests simulate actual exam conditions with randomized questions.",
  },
] as const;

export const REDTC_COVERS = [
  "Real PDF load charts",
  "BCACS sling charts",
  "Capacity calculations",
  "Rigging fundamentals",
  "Crane operations",
  "Safety regulations",
] as const;

export const REDTC_AUTHORITIES = [
  {
    name: "WorkSafeBC",
    role: "Regulator",
    body: "OHS Regulation Part 14 (Cranes and Hoists) and Part 15 (Rigging) make operator certification mandatory and set the rules for lifts, signals, and equipment.",
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
  },
  {
    name: "BC Crane Safety",
    role: "Administrator",
    body: "Administers the B.C. and Yukon crane operator certification system. Registration is required before you train or operate. They do not deliver training or exams.",
    href: "https://bccranesafety.ca/",
  },
  {
    name: "SkilledTradesBC",
    role: "Apprenticeship",
    body: "Runs the Tower Crane Operator apprenticeship, Standardized Level Exams, the Red Seal exam sitting, and issues the B.C. Certificate of Qualification.",
    href: "https://skilledtradesbc.ca/tower-crane-operator",
  },
  {
    name: "Fulford Certification",
    role: "Testing partner",
    body: "Independent assessor for BC Crane Safety. Issues Level B provisional certificates and conducts the on-crane practical assessment for full-scope certification.",
    href: "https://fulford.ca/",
  },
  {
    name: "Red Seal Program",
    role: "National standard",
    body: "Sets the 2023 Red Seal Occupational Standard and the 100-question interprovincial exam. A Red Seal endorsement on your CofQ is recognized across Canada.",
    href: "https://www.red-seal.ca/eng/trades/tower-crane-op.shtml",
  },
] as const;

export const REDTC_PATH = [
  {
    num: "01",
    title: "Register",
    body: "Register with BC Crane Safety (required for every crane operator in B.C.), then enrol with SkilledTradesBC as an apprentice or trade qualifier with a sponsor employer.",
  },
  {
    num: "02",
    title: "Get Provisional Status",
    body: "Pass Fulford’s Level B provisional theory exam so you can operate under a written supervision plan while you train.",
  },
  {
    num: "03",
    title: "Train & Log Hours",
    body: "Complete two levels of technical training (175 + 140 hours) and 2,685 hours of work-based training. Log crane hours in SkillRecord Passport; your SkilledTradesBC sponsor reports apprenticeship hours in the Portal.",
  },
  {
    num: "04",
    title: "Pass Exams & Practical",
    body: "Pass SkilledTradesBC Level 1 and Level 2 exams, the Interprovincial Red Seal exam, and a Fulford practical assessment.",
  },
] as const;

export const REDTC_EXAM_TOPICS = [
  { topic: "Occupational Skills", percentage: 11 },
  { topic: "Inspects & Maintains Crane", percentage: 21 },
  { topic: "Set-up, Calculations & Lift Planning", percentage: 23 },
  { topic: "Rigging", percentage: 17 },
  { topic: "Operates Crane", percentage: 28 },
] as const;

export const REDTC_PAPERS_STILL = [
  {
    name: "Fulford Level B",
    body: "40-question provisional theory exam, 70% to pass. Required to operate under supervision.",
  },
  {
    name: "Level 1 & 2 SLEs",
    body: "SkilledTradesBC Standardized Level Exams. 70% each; Level 1 before Level 2.",
  },
  {
    name: "Red Seal IP Exam",
    body: "100 multiple-choice questions, 70% to pass, based on the 2023 RSOS.",
  },
  {
    name: "Fulford Practical",
    body: "On-crane full-scope assessment booked through Fulford after the written exams.",
  },
] as const;

export const REDTC_CATEGORIES = [
  { name: "Load Charts & Parts of Line", count: 140 },
  { name: "PDF Load Chart Practice", count: 140, charts: true },
  { name: "PDF Rigging Charts", count: 30, rigging: true },
  { name: "Advanced Operations & Traps", count: 95 },
  { name: "Master Level Questions", count: 100 },
  { name: "Rigging & Sling Angles", count: 150 },
  { name: "Material Weight & Geometry", count: 80 },
  { name: "Structural & Mechanical", count: 70 },
  { name: "Gear, Drive & Capacity", count: 65 },
  { name: "Safety, Regulations & Comms", count: 60 },
  { name: "Weather & Environmental", count: 50 },
  { name: "Self-Erect & Remote Operation", count: 18 },
  { name: "Cab Controls & LMI", count: 48 },
  { name: "Test Blocks & Commissioning", count: 20 },
  { name: "12-Month Crane Certification", count: 20 },
  { name: "Tower Crane Erection", count: 20 },
  { name: "Climbing & Reconfiguration", count: 34 },
] as const;

export const REDTC_CHART_MODELS = {
  flat: [
    { name: "Liebherr 470 EC-B", jib: "83m" },
    { name: "Liebherr 550 EC-H", jib: "81m" },
    { name: "Potain MDT 189", jib: "60m" },
    { name: "Potain MD 1600", jib: "80m" },
    { name: "Terex CTT 222-10", jib: "65m" },
    { name: "Terex SK 415-20", jib: "80m" },
    { name: "Krøll K630F", jib: "80m" },
    { name: "Pecco SK 180", jib: "60m" },
  ],
  luffing: [
    { name: "Liebherr 195 HC-LH", jib: "55m" },
    { name: "Liebherr NC-LH 12-55", jib: "55m" },
    { name: "WOLFF 355 B US", jib: "60m" },
    { name: "Terex CTL 260A-18", jib: "60m" },
  ],
  self: [
    { name: "Liebherr 91 K", jib: "48m" },
    { name: "Potain Igo T 139", jib: "55m" },
  ],
} as const;

export const REDTC_SKILLS = [
  "Reading capacity at specific radii",
  "Finding maximum radius for loads",
  "Hook block and rigging deductions",
  "Chart modes (LM 1, Load-Plus, Boost)",
  "Reeving configurations (2-fall, 4-fall)",
  "Level luffing and sway control",
  "Metric vs Imperial unit conversions",
  "ANSI vs FEM vs EN standards",
  "Real-world lift planning",
] as const;

export const REDTC_RESOURCES = [
  {
    href: "https://bccranesafety.ca/",
    name: "BC Crane Safety",
    body: "Administers crane operator certification in B.C. and Yukon. Register here before you train or operate — they do not deliver exams.",
    featured: true,
  },
  {
    href: "https://skilledtradesbc.ca/tower-crane-operator",
    name: "SkilledTradesBC Tower Crane",
    body: "Trade page, exams, 2,685 hours, CofQ",
  },
  {
    href: "https://portal.skilledtradesbc.ca/Account/Login/Register",
    name: "SkilledTradesBC Portal",
    body: "Register, hours, book exams",
  },
  {
    href: "https://bccranesafety.ca/resources/crane-operator-logbook/",
    name: "SkillRecord Passport",
    body: "Free iOS & Android crane logbook",
  },
  {
    href: "https://www.red-seal.ca/eng/trades/towercrane_op/exam-information.shtml",
    name: "Red Seal Program",
    body: "2023 RSOS and 100-question exam",
  },
  {
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
    name: "WorkSafeBC Part 14",
    body: "Cranes and hoists, operator certification",
  },
  {
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging",
    name: "WorkSafeBC Part 15",
    body: "Rigging, slings, and hand signals",
  },
  {
    href: "https://fulford.ca/",
    name: "Fulford Certification",
    body: "Provisional exam and practical assessment",
  },
] as const;
