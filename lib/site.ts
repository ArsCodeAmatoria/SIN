export const SITE = {
  name: "sin()",
  legalName: "sin()",
  url: "https://sin.ae.org",
  descriptor: "CRANE SAFETY",
  phone: "1 604 431 2000",
  phoneHref: "tel:+16044312000",
  email: "info@sin.ae.org",
  emailHref: "mailto:info@sin.ae.org",
  location: "British Columbia, Canada",
  tagline: "CRANE SAFETY SYSTEMS.",
  sub: "OPEN. USABLE. ACCOUNTABLE.",
  dek: "This site is crane safety information for lifting work.",
  position: "The system behind the lift.",
  roles:
    "Policies, procedures, hazard assessments, forms and crane binders for operators, riggers, signalpersons and supervisors.",
  method:
    "Proven is the occupational health and safety management system. Written the way the work actually happens. Public so anyone on the lift can read it before the hook is loaded.",
  close:
    "If a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.",
  title: "Crane Safety, Rigging & Red Seal Exam Prep BC | sin()",
  description:
    "Public tower crane, mobile crane and rigging safety information for British Columbia. Red Seal exam practice, load charts, safety procedures, forms and writing about the work.",
  descriptionLong:
    "sin() is public crane safety information for lifting work in British Columbia.\n\nREDTC and REDMC are Tower Crane and Mobile Crane exam practice — Fulford, SkilledTradesBC, and the Interprovincial Red Seal. Tagged questions. Explanations after you answer. 70% to pass, same as the sitting.\n\nProven is the occupational health and safety program: policies, safe work procedures, hazard assessments, forms and crane binders. Written the way the work actually happens. Public so anyone on the lift can read it before the hook is loaded. No portal. No request form. No expiry date.\n\nThe Wire is writing about safety, rigging, cranes and people.\n\nWork is done to CSA Z150 / Z248, WorkSafeBC, BC Crane Safety, Technical Safety BC, ASME B30, manufacturer requirements and site policies. The stricter applicable requirement wins. Law always wins.\n\nIf a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.",
  system: "PROVEN",
} as const;

export const AUTHOR = {
  name: "sin()",
  path: "/about",
  jobTitle: "Crane and rigging safety practitioner",
  location: "British Columbia",
  bio: "Crane and rigging safety practitioner in British Columbia. sin() is built from field experience, manufacturer documentation, applicable regulations, certification material and industry standards.",
  process:
    "Technical claims are written against WorkSafeBC, BC Crane Safety, SkilledTradesBC, Red Seal occupational standards, CSA Z150 / Z248, ASME B30 and the manufacturer’s document for the machine. If a source is named, it can be opened. Corrections go to info@sin.ae.org.",
} as const;

export const ABOUT = [
  {
    name: "The program",
    body: "Policies, SWPs, JHAs, SJPs, forms and binders for lifting work.",
  },
  {
    name: "The standard",
    body: "Work is done to Proven, applicable OHS law, CSA Z150 / Z248, ASME B30 as named, the manufacturer, and the site. The stricter applicable requirement wins. Law always wins.",
  },
  {
    name: "The system",
    body: "People, process and documentation stay organized, verified and accountable. A ticket is not competency.",
  },
  {
    name: "British Columbia",
    body: "Written to WorkSafeBC, BC Crane Safety and Technical Safety BC. Used where the lift is.",
  },
  {
    name: "Open book",
    body: "Proven is public. Operators, riggers, supervisors, contractors and clients can read how the work is expected to be done before the gate.",
  },
  {
    name: "COR®",
    body: "This site explains the Certificate of Recognition and how a crane OHS program maps to it.",
  },
] as const;

export const STANDARDS = [
  {
    name: "CSA Z150 / Z248",
    body: "Safety code on mobile cranes. Code for tower cranes.",
    logo: "/marks/csa-group.png",
    href: "https://www.csagroup.org/",
  },
  {
    name: "WorkSafeBC",
    body: "Occupational Health and Safety Regulation, including Part 14 — Cranes and Hoists.",
    logo: "/marks/worksafebc.png",
    logoOnInk: "/marks/worksafebc-on-ink.png",
    href: "https://www.worksafebc.com/",
  },
  {
    name: "BC Crane Safety",
    body: "Crane operator certification and competency requirements in British Columbia.",
    logo: "/marks/bc-crane-safety.png",
    logoOnInk: "/marks/bc-crane-safety-on-ink.png",
    href: "https://bccranesafety.ca/",
  },
  {
    name: "Technical Safety BC",
    body: "Applicable technical safety requirements for regulated equipment.",
    logo: "/marks/technical-safety-bc.png",
    logoOnInk: "/marks/technical-safety-bc-on-ink.png",
    href: "https://www.technicalsafetybc.ca/",
  },
  {
    name: "ASME B30",
    body: "Cranes, derricks, hoists, slings and related lifting equipment.",
    logo: "/marks/asme.png",
    logoOnInk: "/marks/asme-on-ink.png",
    href: "https://www.asme.org/",
  },
  {
    name: "Manufacturer requirements",
    body: "Load charts, manuals and configuration limits for the machine on site.",
  },
  {
    name: "Site policies",
    body: "The site rules, orientations and lift plans. Where they are stricter, they win.",
  },
] as const;

export const COR = {
  mark: "COR®",
  title: "Certificate of Recognition",
  partner: "BC Construction Safety Alliance",
  partnerUrl: "https://www.bccsa.ca/cor_program.php",
  program: "WorkSafeBC Certificate of Recognition",
  asset: "/cor/bccsa-cor-certified.png",
} as const;

export const NAV = [
  { href: "/", label: "HOME", num: "01" },
  { href: "/safety", label: "PROVEN", num: "02" },
  { href: "/wire", label: "THE WIRE", num: "03" },
  { href: "/philosophy", label: "PHILOSOPHY", num: "04" },
  { href: "/redtc", label: "REDTC", num: "05" },
  { href: "/redmc", label: "REDMC", num: "06" },
] as const;

export const PROGRAM = [
  {
    num: "01",
    title: "OH&S POLICIES",
    body: "The rules of the work. Named, public, written to be used — not a poster in a trailer.",
  },
  {
    num: "02",
    title: "SAFE WORK PROCEDURES",
    body: "Numbered steps for the lift. Crane, signals, rigging, the plan. If it cannot be followed on site, it is not a procedure.",
  },
  {
    num: "03",
    title: "HAZARD ASSESSMENT",
    body: "JHAs and site-specific plans. Hazards, consequence, residual risk. The steps live in the SWP.",
  },
  {
    num: "04",
    title: "FORMS + BINDERS",
    body: "FLHA, lift plans, inspections, incident reports. Tower and self-erect binders. Fill them. Download a PDF.",
  },
  {
    num: "05",
    title: "COMPETENCY",
    body: "A ticket is not competency. The program names what each role must hold, verify and refuse.",
  },
] as const;

export const PRINCIPLES = [
  "WRITE IT DOWN.",
  "MAKE IT USABLE.",
  "WORK SAFE.",
  "MEAN IT.",
] as const;

export const BELIEFS = [
  {
    title: "Competent people matter.",
    body: "A ticket is a starting point. Qualifications, experience and practical competency have to be named — not assumed from a card.",
  },
  {
    title: "Safety information should be accessible.",
    body: "Proven is public. Anyone on the lift should be able to read how the work is expected to be performed before the gate. No portal. No request form. No expiry date.",
  },
  {
    title: "Documentation should be useful.",
    body: "If a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.",
  },
  {
    title: "A program has to keep its promises.",
    body: "If Proven says a stop is real, the stop is real. If it names a form, that form has to work on a phone at the lift.",
  },
  {
    title: "Workers should be treated with respect.",
    body: "People are not units. Competent tradespeople get the procedure, the hazards and backing when they refuse unsafe work.",
  },
  {
    title: "The standard should be in writing.",
    body: "Role, competency, tickets, the plan and the stop — named. No fog.",
  },
] as const;

export const METHOD = [
  {
    num: "01",
    title: "OPEN",
    body: "Read the program before the gate. No portal. No request form. No expiry date.",
  },
  {
    num: "02",
    title: "USE",
    body: "Procedures, forms and binders that work on a phone at the lift — not a PDF on a shared drive.",
  },
  {
    num: "03",
    title: "VERIFY",
    body: "Tickets, experience and practical competency are named. A card is a starting point.",
  },
  {
    num: "04",
    title: "ACCOUNT",
    body: "Incidents are reported. Stop-work is real. COR® is an independent look at an occupational health and safety management system — not that nothing will go wrong.",
  },
] as const;
