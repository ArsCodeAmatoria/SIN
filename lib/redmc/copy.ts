export const REDMC_FEATURES = [
  {
    label: "Practice",
    title: "Exam questions tagged to B.C. papers",
    body: "Every question includes an explanation of the correct answer. Tower Crane questions stay in REDTC.",
  },
  {
    label: "Charts",
    title: "Manufacturer load charts (as supplied)",
    body: "Grove, Tadano, Terex, Liebherr, Link-Belt and Manitowoc PDFs are in the bank. Rigging uses the BCACS Figure 1 sling charts — chain, nylon web, and wire rope — the same lookup skill as Fulford’s LCR practical.",
  },
  {
    label: "Pass",
    title: "70% pass rate mirrors the real exam",
    body: "Practice tests and the 110-question Master Exam use the same 70% bar as SkilledTradesBC and Red Seal.",
  },
] as const;

export const REDMC_COVERS = [
  "Gross vs net capacity",
  "Outriggers and ground",
  "Rigging and sling angles",
  "Parts of line",
  "WorkSafeBC Part 14 and Part 15",
] as const;

export const REDMC_AUTHORITIES = [
  {
    name: "WorkSafeBC",
    role: "Regulator",
    body: "OHS Regulation Part 14 (Cranes and Hoists) and Part 15 (Rigging). Operator certification is mandatory. Part 19 for limits of approach to power lines.",
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
  },
  {
    name: "BC Crane Safety",
    role: "Administrator",
    body: "Administers B.C. and Yukon crane operator certification. Register before you train or operate. They do not deliver the SkilledTradesBC exams.",
    href: "https://bccranesafety.ca/",
  },
  {
    name: "SkilledTradesBC",
    role: "Apprenticeship",
    body: "Mobile Crane Operator trade: Level 1 SLE, Level 3 SLE, Red Seal IP, 4,980 hours work-based training. Compulsory trade from July 5, 2027.",
    href: "https://skilledtradesbc.ca/mobile-crane-operator",
  },
  {
    name: "Fulford Certification",
    role: "Testing partner",
    body: "Independent assessor for BC Crane Safety. Provisional theory and on-crane practical assessment.",
    href: "https://fulford.ca/",
  },
  {
    name: "Red Seal Program",
    role: "National standard",
    body: "2021 RSOS. 110-question Interprovincial exam. A Red Seal endorsement is recognized across Canada.",
    href: "https://www.red-seal.ca/eng/trades/mobilecrane_op/exam-information.shtml",
  },
] as const;

export const REDMC_PATH = [
  {
    num: "01",
    title: "Register",
    body: "Register with BC Crane Safety, then enrol with SkilledTradesBC as an apprentice or trade qualifier with a sponsor.",
  },
  {
    num: "02",
    title: "Get Provisional Status",
    body: "Pass Fulford’s provisional theory so you can operate under a written supervision plan while you train.",
  },
  {
    num: "03",
    title: "Train & Log Hours",
    body: "Technical training is 12 weeks over three years (Level 1: 210 hours, Level 2: 140 hours, Level 3: 70 hours). Work-based training is 4,980 hours, including 1,600 operating hours (400 on specified lattice or >80 t hydraulic equipment). Log time in SkillRecord Passport.",
  },
  {
    num: "04",
    title: "Pass Exams & Practical",
    body: "Level 1 SLE before Level 3 SLE and before the IP. 70% on written exams. SkilledTradesBC practical assessment. No code book.",
  },
] as const;

export const REDMC_CATEGORIES = [
  "Common Occupational Skills",
  "Hoisting Calculations",
  "Load Charts",
  "Rated Capacity",
  "Gross vs Net Capacity",
  "Capacity Deductions",
  "Boom Length and Radius",
  "Parts of Line",
  "Line Pull",
  "Crane Setup",
  "Outriggers",
  "Ground Conditions",
  "Crane Stability",
  "Rigging",
  "Sling Angles",
  "Load Weight",
  "Centre of Gravity",
  "Lift Planning",
  "Critical Lifts",
  "LMI and RCL",
  "Anti-Two-Block",
  "Hydraulic Mobile Cranes",
  "Lattice Boom Cranes",
  "Boom Assembly",
  "Jibs and Extensions",
  "Counterweights",
  "Pick and Carry",
  "Transportation",
  "Inspections",
  "Maintenance",
  "Wire Rope",
  "Sheaves and Drums",
  "Signals",
  "Communications",
  "Electrical Hazards",
  "Weather",
  "WorkSafeBC Part 14",
  "WorkSafeBC Part 15",
  "Safe Work Practices",
  "Advanced Operations",
] as const;

export const REDMC_RESOURCES = [
  {
    href: "https://bccranesafety.ca/",
    name: "BC Crane Safety",
    body: "Register before you train or operate.",
  },
  {
    href: "https://skilledtradesbc.ca/mobile-crane-operator",
    name: "SkilledTradesBC Mobile Crane",
    body: "Trade page, 4,980 hours, Level 1 and 3 SLEs, CofQ",
  },
  {
    href: "https://portal.skilledtradesbc.ca/Account/Login/Register",
    name: "SkilledTradesBC Portal",
    body: "Register, hours, book exams",
  },
  {
    href: "https://www.red-seal.ca/eng/trades/mobilecrane_op/exam-information.shtml",
    name: "Red Seal Program",
    body: "2021 RSOS and 110-question exam",
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

export const REDMC_FORMULAS = [
  { name: "Line tension", abbr: "T = (load + hook + rigging) ÷ parts of line" },
  { name: "Net capacity", abbr: "Net = chart − deductions" },
  { name: "Sling 60°", abbr: "Tension ≈ vertical share × 1.155" },
] as const;

export const REDMC_ACRONYMS = [
  { abbr: "ATB", name: "anti-two-block" },
  { abbr: "RCL", name: "rated capacity limiter" },
  { abbr: "MAD", name: "limits of approach / minimum approach distance" },
] as const;
