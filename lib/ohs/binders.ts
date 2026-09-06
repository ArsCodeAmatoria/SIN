import type { DocLink } from "./types";

/**
 * Tower and self-erect site binders follow BC Crane Safety’s checklists
 * (FM-TC-01, Sept 2024) used with the WorkSafeBC NOP-TC.
 * The mobile / crawler binder is a Proven file numbered to Part 14 and the
 * forms this program already keeps — BC Crane Safety does not publish one.
 * This wizard does not replace official templates. It builds a working copy.
 * https://bccranesafety.ca/resources/tower-crane-site-binder/
 */

export const BINDER_OFFICIAL = {
  bccsBinder:
    "https://bccranesafety.ca/resources/tower-crane-site-binder/",
  towerChecklist:
    "https://bccranesafety.ca/download/92/download/9405/tower-crane-site-binder-document-checklist-2.pdf",
  selfErectChecklist:
    "https://bccranesafety.ca/wpfd_file/self-erect-tower-crane-site-binder-document-checklist-2/",
  mobileChecklist:
    "https://www.worksafebc.com/en/resources/health-safety/checklist/mobile-crane-inspection-checklist?lang=en",
  mobileAnnual:
    "https://www.worksafebc.com/en/health-safety/tools-machinery-equipment/cranes-mobile-equipment/annual-certification-and-inspection",
  mobileAnnualBulletin:
    "https://www.worksafebc.com/resources/health-safety/hazard-alerts/annual-inspection-certification-requirements-for-mobile-cranes-boom-trucks?lang=en",
  part14:
    "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
  towerToc:
    "https://bccranesafety.ca/wpfd_file/tower-crane-binder-table-of-contents-2/",
  towerNotes:
    "https://bccranesafety.ca/wpfd_file/tower-crane-binder-table-of-contents-notes-2/",
  selfErectToc:
    "https://bccranesafety.ca/wpfd_file/self-erect-tower-crane-binder-table-of-contents-2/",
  nop: "https://www.worksafebc.com/en/for-employers/just-for-you/submit-notice-project",
  form30m33:
    "https://www.worksafebc.com/en/resources/health-safety/forms/assurance-of-compliance-with-occupational-health-and-safety-regulation-part-19-form-30m33?lang=en",
  radio:
    "https://www.worksafebc.com/en/resources/health-safety/forms/radio-frequency-coordination-crane-operations-52e73c?lang=en",
  towerReport:
    "https://www.worksafebc.com/en/resources/health-safety/checklist/tower-crane-report?lang=en",
  navcan:
    "https://www.navcanada.ca/en/aeronautical-information/land-use-program.aspx",
  aeronautical:
    "https://tc.canada.ca/en/aviation/general-operating-flight-rules/marking-lighting-obstacles-air-navigation",
  tharrp: "https://www.bccsa.ca/tharrp_program.php",
  tharrpFaq: "https://www.bccsa.ca/tharrp_program.php",
  supervision:
    "https://www.worksafebc.com/en/health-safety/tools-machinery/cranes-rigging/tower-cranes",
  g14733:
    "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-guidelines/guidelines-part-14#SectionNumber:G14.73.3",
} as const;

export const BINDER_ROLES = [
  "Owner / supplier",
  "Prime contractor",
  "Activity supervisor",
  "Crane user",
  "Mobile crane",
  "Other",
] as const;

export type BinderRole = (typeof BINDER_ROLES)[number];
export type BinderKind = "tower" | "self-erect" | "mobile";
export type BinderNeed = "required" | "if-applicable";

export type BinderItem = {
  id: string;
  n: string;
  title: string;
  group: string;
  need: BinderNeed;
  note: string;
  formSlug?: string;
  official?: DocLink[];
  site?: DocLink[];
};

export type BinderDef = {
  kind: BinderKind;
  slug: string;
  title: string;
  number: string;
  summary: string;
  officialName: string;
  checklist: DocLink;
  workingCopy: string;
  signoff: string;
  colophon: string;
  items: BinderItem[];
};

function off(href: string, label: string): DocLink {
  return { href, label, external: true };
}

function site(href: string, label: string): DocLink {
  return { href, label };
}

const PRE = "Pre-assembly";
const ZONE = "Zoning and anti-collision";
const ROPE = "Ropes and test blocks";
const BTH = "Below the hook";
const PROC = "Procedures and compliance";
const POST = "Post-assembly";

const SHARED = {
  navcan: (n: string): BinderItem => ({
    id: "navcan",
    n,
    title: "LAND USE / NAV CANADA",
    group: PRE,
    need: "if-applicable",
    note: "If the crane is an obstacle to air navigation, NAV CANADA assesses land use before it goes up. Submit in their portal. Allow weeks, not a Friday afternoon.",
    formSlug: "navcan-land-use",
    official: [off(BINDER_OFFICIAL.navcan, "NAV CANADA LAND USE PORTAL →")],
  }),
  aeronautical: (n: string): BinderItem => ({
    id: "aeronautical",
    n,
    title: "AERONAUTICAL ASSESSMENT",
    group: PRE,
    need: "if-applicable",
    note: "Transport Canada Aeronautical Assessment Form when the crane is an obstacle or you need marking and lighting. Airport zoning can take up to 90 days. BC Crane Safety: tower cranes near an airport.",
    formSlug: "navcan-land-use",
    official: [
      off(BINDER_OFFICIAL.aeronautical, "TRANSPORT CANADA AAF →"),
      off(
        "https://bccranesafety.ca/tower-crane-assembly-near-an-airport/",
        "BC CRANE SAFETY — NEAR AN AIRPORT →",
      ),
    ],
  }),
  form30m33: (n: string): BinderItem => ({
    id: "30m33",
    n,
    title: "30M33 / RECORD OF DISCUSSION / ASSURANCE IN WRITING",
    group: PRE,
    need: "required",
    note: "Part 19 Table 19-1A. MAD is 1 m under 750 V, 3 m to 75 kV, 4.5 m to 250 kV, 6 m to 550 kV. Unknown: 3 m distribution, 6 m transmission, until BC Hydro verifies. If the crane can enter those limits, Form 30M33 is completed with the power-system owner. Coded form — order it from WorkSafeBC. The Proven sheet is the schematic and the discussion. Post it on the site board.",
    formSlug: "powerline-30m33",
    official: [off(BINDER_OFFICIAL.form30m33, "WORKSAFEBC FORM 30M33 →")],
    site: [site("/safety/swp/working-near-powerlines", "SWP — POWERLINES →")],
  }),
  power: (n: string): BinderItem => ({
    id: "power-source",
    n,
    title: "POWER SOURCE INFORMATION",
    group: PRE,
    need: "required",
    note: "How the crane is fed. Voltage, isolation, earthing, who can lock it out. Incomplete unfold or a missing earth is not a start-up problem. It is a stop.",
    formSlug: "power-source",
  }),
  nop: (n: string): BinderItem => ({
    id: "nop-tc",
    n,
    title: "NOTICE OF PROJECT — TOWER CRANE (NOP-TC)",
    group: PRE,
    need: "required",
    note: "14.73.3. Submit to WorkSafeBC at least two weeks before erecting, climbing, repositioning or dismantling. Project type: Tower Crane. Post the notice on site for the duration. Significant changes go back in writing.",
    formSlug: "nop-tc-notice",
    official: [off(BINDER_OFFICIAL.nop, "SUBMIT NOP-TC →")],
    site: [site("/safety/swp/tower-erection-climbing", "SWP-027 — ERECTION / CLIMBING →")],
  }),
  layout: (n: string): BinderItem => ({
    id: "site-layout",
    n,
    title: "SITE LAYOUT / DESIGN PACKAGE",
    group: PRE,
    need: "required",
    note: "Where the crane sits, radius, slew, loads over public, adjacent cranes, access. The drawing in the binder has to match the machine that is actually up.",
    formSlug: "site-layout",
  }),
  meeting: (n: string): BinderItem => ({
    id: "pre-assembly-meeting",
    n,
    title: "PRE-ASSEMBLY MEETING NOTES",
    group: PRE,
    need: "required",
    note: "Named people, sequence, exclusion zone, weather abort, radios, rescue. If it was not written, it was not agreed.",
    formSlug: "pre-assembly-meeting",
  }),
  tharrp: (n: string): BinderItem => ({
    id: "tharrp",
    n,
    title: "HIGH-ANGLE RESCUE / THARRP AGREEMENT",
    group: PRE,
    need: "required",
    note: "A tower operator in the cab is fire-department rope rescue, not a Proven rappel. Host or prime requests the survey in the THARRP portal. Confirm it exists before the operator goes up.",
    formSlug: "tharrp-cover",
    official: [off(BINDER_OFFICIAL.tharrp, "BCCSA THARRP →")],
    site: [site("/safety/emergency-response", "10 — EMERGENCY / THARRP →")],
  }),
  traffic: (n: string): BinderItem => ({
    id: "traffic",
    n,
    title: "TRAFFIC CONTROL / MUNICIPAL PERMITS / STREET USE",
    group: PRE,
    need: "if-applicable",
    note: "City, street-use, lane closure, pedestrian control. The crane does not invent a permit.",
    formSlug: "traffic-permits",
  }),
  radio: (n: string): BinderItem => ({
    id: "radio",
    n,
    title: "RADIO FREQUENCY APPLICATION / COORDINATION",
    group: PRE,
    need: "required",
    note: "WorkSafeBC 52E73C for tower, self-erect and industrial cranes: new site, radios change, or the crane runs more than a week. Dedicated UHF. Multi-channel radios are not how you direct the hook.",
    formSlug: "radio-frequency",
    official: [off(BINDER_OFFICIAL.radio, "WORKSAFEBC 52E73C →")],
    site: [site("/safety/swp/radio-communication", "SWP — RADIO →")],
  }),
  ndt: (n: string): BinderItem => ({
    id: "ndt",
    n,
    title: "NON-DESTRUCTIVE TESTING REPORT",
    group: PRE,
    need: "required",
    note: "Current NDT on the components this serial actually uses. A report for a different mast is not this crane.",
    formSlug: "ndt-record",
  }),
  variance: (n: string): BinderItem => ({
    id: "variance",
    n,
    title: "VARIANCE OR ACCEPTANCE",
    group: PRE,
    need: "if-applicable",
    note: "If the configuration or the method is not as the manufacturer wrote it, the acceptance is in the binder. No verbal workaround.",
  }),
  additions: (n: string): BinderItem => ({
    id: "additions",
    n,
    title: "ADDITIONS TO CRANE SURFACE",
    group: PRE,
    need: "if-applicable",
    note: "Cameras, lights, banners, holiday strings. WorkSafeBC has a bulletin on festive lights. Anything added is a modification until the manufacturer or a professional engineer says otherwise. 14.6.",
  }),
  manual: (n: string): BinderItem => ({
    id: "manual",
    n,
    title: "CRANE-SPECIFIC MANUAL",
    group: PRE,
    need: "required",
    note: "Serial operator and maintenance manuals. In the cab and a copy in the binder. OEM PDFs are linked from the crane library — not hosted.",
    site: [site("/safety/inspections", "19 — CRANE LIBRARY →")],
  }),
  chart: (n: string): BinderItem => ({
    id: "load-chart",
    n,
    title: "GENERAL SPECIFICATIONS AND LOAD CHART",
    group: PRE,
    need: "required",
    note: "The chart for this jib, this counterweight, this reeving. Serial plate wins if the download disagrees.",
    site: [site("/safety/inspections", "19 — CRANE LIBRARY →")],
  }),
  csa: (n: string): BinderItem => ({
    id: "csa",
    n,
    title: "CSA COMPLIANCE DOCUMENTATION",
    group: PRE,
    need: "required",
    note: "14.2(6) names CSA Z248-2004 for tower, hammerhead and self-erecting tower cranes. Record how this serial meets it — manufacturer declaration, engineer letter, or the certificate the owner holds.",
    formSlug: "csa-compliance",
  }),
  mobile: (n: string): BinderItem => ({
    id: "mobile-assist",
    n,
    title: "MOBILE CRANE DOCUMENTATION",
    group: PRE,
    need: "if-applicable",
    note: "If a mobile assists the erect or the dismantle: that machine’s cert, chart, operator ticket, and the lift plan for those picks.",
    site: [
      site("/safety/form/crane-pre-use", "MOBILE PRE-USE — FRM-002 →"),
      site("/safety/form/lift-plan", "LIFT PLAN — FRM-006 →"),
    ],
  }),
  components: (n: string): BinderItem => ({
    id: "components",
    n,
    title: "CRANE COMPONENT INSPECTIONS",
    group: PRE,
    need: "required",
    note: "Incoming inspection of the pieces before they go in the air. Pins, keepers, damage from the last job.",
    site: [site("/safety/form/tower-monthly-maintenance", "TOWER MONTHLY — FRM-031 →")],
  }),
  zoning: (n: string): BinderItem => ({
    id: "zoning",
    n,
    title: "ZONING SYSTEM DOCUMENTATION",
    group: ZONE,
    need: "if-applicable",
    note: "If a zone limiter is fitted, the setpoints and who can change them. NOP-TC asks for the manufacturer of any zone-limiting device.",
  }),
  anticollision: (n: string): BinderItem => ({
    id: "anti-collision",
    n,
    title: "ANTI-COLLISION SYSTEM DOCUMENTATION",
    group: ZONE,
    need: "if-applicable",
    note: "Two cranes that can meet. Device, setpoints, override rule. Override is a named decision, not a habit.",
  }),
  hoistCert: (n: string): BinderItem => ({
    id: "hoist-rope-cert",
    n,
    title: "TESTING CERTIFICATION FOR HOIST ROPES",
    group: ROPE,
    need: "required",
    note: "Mill cert and installation record for the rope that is on the drum now.",
    formSlug: "hoist-rope-record",
  }),
  hoistRecord: (n: string): BinderItem => ({
    id: "hoist-rope-record",
    n,
    title: "HOIST ROPE RECORD",
    group: ROPE,
    need: "if-applicable",
    note: "Hours, lubricant, broken wires, date on, date off. If you cannot name the rope, you do not run it.",
    formSlug: "hoist-rope-record",
  }),
  riggingCert: (n: string): BinderItem => ({
    id: "rigging-cert",
    n,
    title: "RIGGING CERTIFICATION",
    group: ROPE,
    need: "required",
    note: "WLL, identification, current inspection. Failed gear is isolated the same hour.",
    site: [site("/safety/form/rigging-inspection-form", "RIGGING INSPECTION — FRM-003 →")],
  }),
  testBlock: (n: string): BinderItem => ({
    id: "test-block",
    n,
    title: "TEST BLOCK DOCUMENTATION",
    group: ROPE,
    need: "required",
    note: "Weight known, identification, last use. A mystery block is not a test weight.",
  }),
  hll: (n: string): BinderItem => ({
    id: "hll",
    n,
    title: "HORIZONTAL LIFELINE DOCUMENTATION",
    group: ROPE,
    need: "if-applicable",
    note: "If people walk the jib or the counter-jib on a lifeline: engineer or manufacturer spec, inspection, rescue. Part 11. Not THARRP.",
    site: [site("/safety/fall-protection", "08 — FALL PROTECTION →")],
  }),
  dep: (n: string): BinderItem => ({
    id: "dep",
    n,
    title: "DEP BOX, WORK PLATFORMS AND SECONDARY RIGGING",
    group: BTH,
    need: "if-applicable",
    note: "Dedicated emergency personnel box, platforms, secondary hitch. Hardware rated, inspected, and the radio protocol for a DEP lift is briefed.",
  }),
  bth: (n: string): BinderItem => ({
    id: "bth",
    n,
    title: "BELOW-THE-HOOK LIFTING DEVICES",
    group: BTH,
    need: "if-applicable",
    note: "Spreader, vacuum, magnet, purpose-built. Marked WLL. Inspection current. 14.53 and Part 15.",
    site: [site("/safety/form/rigging-plan", "RIGGING PLAN — FRM-008 →")],
  }),
  assemblyProc: (n: string): BinderItem => ({
    id: "assembly-proc",
    n,
    title: "SITE-SPECIFIC ASSEMBLY / DISASSEMBLY PROCEDURES",
    group: PROC,
    need: "required",
    note: "Manufacturer sequence applied to this site. Exclusion zone, assist crane, weather abort. Not a generic pamphlet.",
    site: [site("/safety/swp/tower-erection-climbing", "SWP-027 →")],
  }),
  supervisor: (n: string): BinderItem => ({
    id: "supervisor-qual",
    n,
    title: "CRANE ACTIVITY SUPERVISOR AND LEAD HAND QUALIFICATION",
    group: PROC,
    need: "required",
    note: "14.73.2. Qualified supervisor for this particular crane. Ticket, experience, and that they are directing this activity — not a name on a whiteboard downtown.",
    formSlug: "supervisor-qualification",
  }),
  swpAssembly: (n: string): BinderItem => ({
    id: "swp-assembly",
    n,
    title: "SAFE WORK PROCEDURES — ASSEMBLY / DISASSEMBLY",
    group: PROC,
    need: "required",
    note: "Written procedures for the high-risk work. PROVEN-SWP-027 is the company method. The site procedure names this pad, this assist crane, this crew.",
    site: [site("/safety/swp/tower-erection-climbing", "SWP-027 →")],
  }),
  swpOps: (n: string): BinderItem => ({
    id: "swp-ops",
    n,
    title: "SAFE WORK PROCEDURES — OPERATION AND MAINTENANCE",
    group: PROC,
    need: "required",
    note: "How this crane is run and kept. Pre-use, weekly, monthly, shutdown, lockout.",
    site: [
      site("/safety/swp-library", "14 — SWP LIBRARY →"),
      site("/safety/form/tower-pre-use", "TOWER PRE-USE — FRM-027 →"),
    ],
  }),
  erp: (n: string): BinderItem => ({
    id: "erp",
    n,
    title: "EMERGENCY RESPONSE PLAN",
    group: PROC,
    need: "required",
    note: "Site ERP plus crane-specific: powerline contact, load hang-up, operator in the cab, weathervane failure. THARRP is the high-angle piece. It is not the whole plan.",
    formSlug: "emergency-drill",
    site: [site("/safety/emergency-response", "10 — EMERGENCY RESPONSE →")],
  }),
  report: (n: string): BinderItem => ({
    id: "tower-report",
    n,
    title: "CONSTRUCTION SITE TOWER CRANE REPORT",
    group: POST,
    need: "required",
    note: "Qualified supervisor completes a report after the crane is erected, climbed or repositioned. WorkSafeBC publishes the checklist. Keep it at the workplace.",
    formSlug: "tower-crane-report",
    official: [off(BINDER_OFFICIAL.towerReport, "WORKSAFEBC TOWER CRANE REPORT →")],
  }),
  pm: (n: string): BinderItem => ({
    id: "pm-schedule",
    n,
    title: "PREVENTIVE MAINTENANCE SCHEDULE AND INSTRUCTION",
    group: POST,
    need: "required",
    note: "OEM interval for this serial. Proven weekly and monthly forms record the work. The schedule in the binder is the manufacturer’s, not a guess.",
    site: [
      site("/safety/form/tower-weekly-maintenance", "TOWER WEEKLY — FRM-030 →"),
      site("/safety/form/tower-monthly-maintenance", "TOWER MONTHLY — FRM-031 →"),
    ],
  }),
  orientation: (n: string): BinderItem => ({
    id: "operator-orientation",
    n,
    title: "OPERATOR CRANE ORIENTATION",
    group: POST,
    need: "required",
    note: "This machine, this site, this chart, these radios, this rescue. A tower ticket is not an orientation.",
    formSlug: "operator-orientation",
  }),
  operatorCert: (n: string): BinderItem => ({
    id: "operator-cert",
    n,
    title: "OPERATOR CERTIFICATION AND PROOF OF QUALIFICATION",
    group: POST,
    need: "required",
    note: "14.34.1. Valid BC Crane Safety certificate for this class. Provisional operators need a written supervision plan. Copy in the binder.",
    formSlug: "operator-certification",
    official: [
      off("https://bccranesafety.ca/", "BC CRANE SAFETY →"),
    ],
    site: [site("/safety/form/competency-assessment", "COMPETENCY — FRM-017 →")],
  }),
  logs: (n: string): BinderItem => ({
    id: "inspection-logs",
    n,
    title: "INSPECTIONS DOCUMENTATION / LOGS",
    group: POST,
    need: "required",
    note: "Pre-use every shift. Frequent and periodic as 14.13 and the OEM require. Logbook in the cab. Copies as the site requires.",
    site: [
      site("/safety/form/tower-pre-use", "TOWER PRE-USE — FRM-027 →"),
      site("/safety/form/self-erect-inspection", "SELF-ERECT INSPECTION — FRM-029 →"),
      site("/safety/form/crane-operator-log", "OPERATOR LOG — FRM-023 →"),
    ],
  }),
  other: (n: string): BinderItem => ({
    id: "other",
    n,
    title: "OTHER SITE-SPECIFIC DOCUMENTS",
    group: "Other",
    need: "if-applicable",
    note: "Anything this site adds: engineer letters, neighbour agreements, rail, transit, school hours. If it constrains the crane, it is in the binder.",
  }),
};

export const TOWER_BINDER: BinderDef = {
  kind: "tower",
  slug: "tower",
  title: "TOWER CRANE SITE BINDER",
  number: "PROVEN-BND-001",
  summary:
    "Top-slewing tower: hammerhead, topless, luffing jib. Numbered to the BC Crane Safety Tower Crane Site Binder Document Checklist. Mandatory with the NOP-TC.",
  officialName: "Tower Crane Site Binder Document Checklist (FM-TC-01)",
  checklist: off(
    BINDER_OFFICIAL.towerChecklist,
    "BC CRANE SAFETY TOWER CHECKLIST PDF →",
  ),
  workingCopy:
    "Working copy of the site-binder checklist. Numbered to the BC Crane Safety template. Official templates and WorkSafeBC forms stay official.",
  signoff:
    "Sign-off is on the official BC Crane Safety checklist. This PDF is the Proven working copy.",
  colophon:
    "Saved on this device. Not sent to a server. The PDF cover has a QR to this page — the paper is uncontrolled. Official BC Crane Safety checklist and WorkSafeBC forms are linked — they are not Proven forms.",
  items: [
    SHARED.navcan("01"),
    SHARED.aeronautical("02"),
    SHARED.form30m33("03"),
    {
      id: "toh",
      n: "04",
      title: "TROLLEY OVERHEAD (TOH) ADJACENT WORKS",
      group: PRE,
      need: "if-applicable",
      note: "If the trolley can pass over an occupied adjacent workplace, that workplace has the documentation. Not a courtesy. A control.",
    },
    SHARED.power("05"),
    SHARED.nop("06"),
    SHARED.layout("07"),
    {
      id: "foundation",
      n: "08",
      title: "FOUNDATION, GEOTECHNICAL / SOILS AND CYLINDER BREAK",
      group: PRE,
      need: "required",
      note: "Engineer for the foundation. Soils. Concrete breaks before the crane is loaded as the design requires. 14.2(6) / Z248 foundation records.",
    },
    SHARED.meeting("09"),
    SHARED.tharrp("10"),
    SHARED.traffic("11"),
    SHARED.radio("12"),
    SHARED.ndt("13"),
    SHARED.variance("14"),
    SHARED.additions("15"),
    SHARED.manual("16"),
    SHARED.chart("17"),
    SHARED.csa("18"),
    SHARED.mobile("19"),
    SHARED.components("20"),
    {
      id: "derrick",
      n: "21",
      title: "DERRICK DOCUMENTATION",
      group: PRE,
      need: "if-applicable",
      note: "If a derrick or climbing derrick is used on this erect, its certs and procedure sit with the crane’s.",
    },
    {
      id: "climbing",
      n: "22",
      title: "CRANE CLIMBING DOCUMENTATION",
      group: PRE,
      need: "if-applicable",
      note: "Climbing frame, ties, next jump. Separate NOP-TC for the activity. Qualified supervisor. Manufacturer sequence.",
      site: [site("/safety/swp/tower-erection-climbing", "SWP-027 →")],
    },
    SHARED.zoning("23"),
    SHARED.anticollision("24"),
    SHARED.hoistCert("25"),
    SHARED.hoistRecord("26"),
    SHARED.riggingCert("27"),
    SHARED.testBlock("28"),
    SHARED.hll("29"),
    SHARED.dep("30"),
    SHARED.bth("31"),
    SHARED.assemblyProc("32"),
    SHARED.supervisor("33"),
    SHARED.swpAssembly("34"),
    SHARED.swpOps("35"),
    SHARED.erp("36"),
    SHARED.report("37"),
    SHARED.pm("38"),
    {
      id: "mast-torque",
      n: "39",
      title: "POST-INSTALL MAST BOLT RETORQUE",
      group: POST,
      need: "if-applicable",
      note: "If the OEM requires a retorque after install or after a climb, the record is in the binder with torque and who did it.",
    },
    SHARED.orientation("40"),
    SHARED.operatorCert("41"),
    SHARED.logs("42"),
    {
      id: "reposition",
      n: "43",
      title: "REPOSITIONING DOCUMENTATION",
      group: POST,
      need: "if-applicable",
      note: "A move is crane activity. NOP-TC, qualified supervisor, new report. Do not treat a travel or a jump as a footnote.",
      site: [site("/safety/swp/tower-erection-climbing", "SWP-027 →")],
    },
    SHARED.other("44"),
  ],
};

export const SELF_ERECT_BINDER: BinderDef = {
  kind: "self-erect",
  slug: "self-erect",
  title: "SELF-ERECT TOWER CRANE SITE BINDER",
  number: "PROVEN-BND-002",
  summary:
    "Hup, Igo, Igo T, K-series, CBR, CSE and the rest of the self-erecting class. Numbered to the BC Crane Safety Self-Erect Tower Crane Site Binder. NOP-TC still applies.",
  officialName: "Self-Erect Tower Crane Site Binder Document Checklist",
  checklist: off(
    BINDER_OFFICIAL.selfErectChecklist,
    "BC CRANE SAFETY SELF-ERECT CHECKLIST →",
  ),
  workingCopy:
    "Working copy of the site-binder checklist. Numbered to the BC Crane Safety template. Official templates and WorkSafeBC forms stay official.",
  signoff:
    "Sign-off is on the official BC Crane Safety checklist. This PDF is the Proven working copy.",
  colophon:
    "Saved on this device. Not sent to a server. The PDF cover has a QR to this page — the paper is uncontrolled. Official BC Crane Safety checklist and WorkSafeBC forms are linked — they are not Proven forms.",
  items: [
    SHARED.navcan("01"),
    SHARED.aeronautical("02"),
    SHARED.form30m33("03"),
    SHARED.power("04"),
    SHARED.nop("05"),
    SHARED.layout("06"),
    {
      id: "ground",
      n: "07",
      title: "GROUND, OUTRIGGERS, PADS AND BEARING",
      group: PRE,
      need: "required",
      note: "Self-erects live on pads and outriggers. Bearing known. Slope within OEM. Unfold is not a foundation pour — it is still a supporting-surface problem.",
      site: [site("/safety/swp/ground-conditions", "SWP — GROUND →")],
    },
    SHARED.meeting("08"),
    SHARED.tharrp("09"),
    SHARED.traffic("10"),
    SHARED.radio("11"),
    SHARED.ndt("12"),
    SHARED.variance("13"),
    SHARED.additions("14"),
    SHARED.manual("15"),
    SHARED.chart("16"),
    SHARED.csa("17"),
    SHARED.mobile("18"),
    SHARED.components("19"),
    SHARED.zoning("20"),
    SHARED.anticollision("21"),
    SHARED.hoistCert("22"),
    SHARED.hoistRecord("23"),
    SHARED.riggingCert("24"),
    SHARED.testBlock("25"),
    SHARED.hll("26"),
    SHARED.dep("27"),
    SHARED.bth("28"),
    SHARED.assemblyProc("29"),
    SHARED.supervisor("30"),
    SHARED.swpAssembly("31"),
    {
      ...SHARED.swpOps("32"),
      site: [
        site("/safety/swp-library", "14 — SWP LIBRARY →"),
        site("/safety/form/self-erect-inspection", "SELF-ERECT INSPECTION — FRM-029 →"),
      ],
    },
    SHARED.erp("33"),
    SHARED.report("34"),
    SHARED.pm("35"),
    SHARED.orientation("36"),
    SHARED.operatorCert("37"),
    {
      ...SHARED.logs("38"),
      site: [
        site("/safety/form/self-erect-inspection", "SELF-ERECT INSPECTION — FRM-029 →"),
        site("/safety/form/tower-weekly-maintenance", "TOWER WEEKLY — FRM-030 →"),
        site("/safety/form/crane-operator-log", "OPERATOR LOG — FRM-023 →"),
      ],
    },
    {
      id: "reposition",
      n: "39",
      title: "REPOSITIONING / TRAVEL DOCUMENTATION",
      group: POST,
      need: "if-applicable",
      note: "Folding, moving and unfolding is crane activity. NOP-TC if 14.73.3 applies to the move. New report when it sits again.",
    },
    SHARED.other("40"),
  ],
};

const MAC = "Machine and certificates";
const PAD = "The pad";
const CFG = "Build and configure";
const LIFTG = "The lift";
const LOGS = "Inspection and logs";
const METHOD = "Procedures";

export const MOBILE_BINDER: BinderDef = {
  kind: "mobile",
  slug: "mobile",
  title: "MOBILE / CRAWLER SITE BINDER",
  number: "PROVEN-BND-003",
  summary:
    "Rough-terrain, all-terrain, truck crane, boom truck, lattice crawler. Numbered to Proven forms and WorkSafeBC Part 14. BC Crane Safety does not publish a mobile site binder — NOP-TC is tower.",
  officialName: "WorkSafeBC Mobile Crane Inspection Checklist (Oct 2016)",
  checklist: off(
    BINDER_OFFICIAL.mobileChecklist,
    "WORKSAFEBC MOBILE CRANE INSPECTION CHECKLIST →",
  ),
  workingCopy:
    "Working copy of the mobile / crawler site file. Numbered to Proven forms and WorkSafeBC Part 14. BC Crane Safety does not publish a mobile site binder. Official WorkSafeBC checklists stay official.",
  signoff:
    "This PDF is the Proven working copy. The WorkSafeBC mobile crane inspection checklist is the officer tool — it is not this file.",
  colophon:
    "Saved on this device. Not sent to a server. The PDF cover has a QR to this page — the paper is uncontrolled. BC Crane Safety does not publish a mobile site binder. WorkSafeBC Part 14 and the officer inspection checklist stay official.",
  items: [
    {
      ...SHARED.operatorCert("01"),
      group: MAC,
      note: "14.34.1. Valid BC Crane Safety certificate for this class — mobile, boom truck, or the lattice class on the ticket. Provisional operators need a written supervision plan. Copy in the file.",
    },
    {
      id: "competency",
      n: "02",
      title: "COMPETENCY ON THIS CRANE",
      group: MAC,
      need: "required",
      note: "14.34. A ticket is not competency on this serial. Instructed on the operating instructions and the signals. Assessed on this machine before it takes load.",
      site: [
        site("/safety/form/competency-assessment", "COMPETENCY — FRM-017 →"),
        site("/safety/training-competency", "03 — TRAINING AND COMPETENCY →"),
      ],
    },
    {
      id: "provisional",
      n: "03",
      title: "PROVISIONAL SUPERVISION PLAN",
      group: MAC,
      need: "if-applicable",
      note: "If the operator is provisional: the written supervision plan is in the file. Indirect for ordinary work. Direct for critical lifts. A name on a whiteboard downtown is not the plan.",
      formSlug: "operator-certification",
    },
    {
      ...SHARED.manual("04"),
      group: MAC,
      note: "14.12. Serial operator and maintenance manuals. In the cab. Manufacturer sequence for assembly, travel and shutdown. REDMC charts are practice — not this serial.",
    },
    {
      ...SHARED.chart("05"),
      group: MAC,
      note: "14.5. The chart for this boom, this counterweight, this jib, this outrigger or crawler position, this reeving. Serial plate wins if a download disagrees. Practice PDFs are not this machine.",
      site: [
        site("/redmc/load-charts", "REDMC LOAD CHARTS — PRACTICE →"),
        site("/sling", "SLING-ANGLE DESK →"),
      ],
    },
    {
      id: "design-standard",
      n: "06",
      title: "DESIGN STANDARD — 14.2(5)",
      group: MAC,
      need: "required",
      note: "A mobile crane, boom truck or sign truck must meet CSA Z150-1998, or ASME B30.5-2004, or — articulating boom — B30.22-2005. Record which one this serial meets. That is not Z248. Meeting B30.5 does not cancel the rest of Part 14.",
      official: [off(BINDER_OFFICIAL.part14, "WORKSAFEBC PART 14 →")],
    },
    {
      id: "identification",
      n: "07",
      title: "IDENTIFICATION",
      group: MAC,
      need: "required",
      note: "14.3. Manufacturer, model, serial, year, rated capacity — marked on the crane. Matches the chart and the annual cert.",
    },
    {
      id: "annual",
      n: "08",
      title: "ANNUAL INSPECTION AND CERTIFICATION",
      group: MAC,
      need: "required",
      note: "14.71. Inspected in accordance with good engineering practice at intervals not exceeding 12 months, certified safe for use by a professional engineer, the manufacturer, or the manufacturer’s authorized representative. Remote workplace: delay up to 3 months, next still within 12 months of the original due date.",
      official: [
        off(BINDER_OFFICIAL.mobileAnnual, "WORKSAFEBC — ANNUAL CERTIFICATION →"),
        off(BINDER_OFFICIAL.mobileAnnualBulletin, "WS 2019-05 — MOBILE / BOOM TRUCK →"),
      ],
      site: [site("/safety/form/crane-inspection-form", "CRANE INSPECTION — FRM-021 →")],
    },
    {
      id: "boom-inspection",
      n: "09",
      title: "BOOM INSPECTION",
      group: MAC,
      need: "if-applicable",
      note: "14.72. When Part 14 or the manufacturer requires a boom inspection on this interval or after this event, the report is in the file. Lattice chords, lacing, pins — this serial, not a sister crane.",
      official: [off(BINDER_OFFICIAL.part14, "WORKSAFEBC PART 14.72 →")],
    },
    {
      ...SHARED.ndt("10"),
      group: MAC,
      need: "if-applicable",
      note: "Current NDT on the components this serial actually uses — boom, welds, pins as the engineer or OEM named. A report for a different crane is not this crane.",
    },
    {
      id: "modifications",
      n: "11",
      title: "MODIFICATIONS",
      group: MAC,
      need: "if-applicable",
      note: "14.15 and 14.16. Anything added or altered from the manufacturer is a modification until the manufacturer or a professional engineer says otherwise. Cameras, extra sheaves, homemade jibs — in the file or it is not on the crane.",
    },
    {
      id: "misadventure",
      n: "12",
      title: "CERTIFICATION AFTER MISADVENTURE",
      group: MAC,
      need: "if-applicable",
      note: "14.16.1. After a tip, a shock, a lightning strike, or contact that could have damaged the crane: out of service until certified. Do not ‘walk it off.’",
      site: [site("/safety/swp/weather-and-wind", "SWP-023 — WEATHER →")],
    },
    { ...SHARED.form30m33("13"), group: PAD },
    {
      id: "ground",
      n: "14",
      title: "SUPPORTING SURFACE",
      group: PAD,
      need: "required",
      note: "14.69 and 14.11. The pad holds the reaction the chart assumes. Walk it. Locates. Mats sized for the load — they do not invent bearing. First load is a test of the ground.",
      site: [
        site("/safety/swp/ground-conditions", "SWP-022 — GROUND →"),
        site("/safety/jha/mobile-crane-setup", "JHA — MOBILE SETUP →"),
      ],
    },
    {
      id: "outriggers",
      n: "15",
      title: "OUTRIGGERS AND STABILIZERS",
      group: PAD,
      need: "if-applicable",
      note: "14.67. Fully extended unless the short-rig chart for that position is in the cab and in use. Float pads secured. Crawler with no outriggers: N/A — the tracks and the ground item carry it.",
      site: [site("/safety/swp/outrigger-setup", "SWP-021 — OUTRIGGERS →")],
    },
    {
      id: "tires",
      n: "16",
      title: "TIRES",
      group: PAD,
      need: "if-applicable",
      note: "14.68. On-rubber only when the chart for that configuration is the chart. Pressure and condition as the manufacturer. Crawler: N/A.",
    },
    {
      id: "crawlers",
      n: "17",
      title: "CRAWLERS / TRACKS",
      group: PAD,
      need: "if-applicable",
      note: "Track tension, shoes, frames, travel locks as the manufacturer. Pick-and-carry and travel-with-load only on the crawler chart. Hydraulic RT on rubber is not this item.",
      site: [site("/safety/swp/mobile-crane-setup", "SWP-001 — SETUP →")],
    },
    {
      id: "layout-swing",
      n: "18",
      title: "SITE LAYOUT / SWING AND SHEAR",
      group: PAD,
      need: "required",
      note: "14.40 and 14.41. Where the crane sits, tail swing, boom clearance, other plant, people, lines. The drawing or the sketch in the file matches the machine that is actually set.",
      site: [site("/safety/swp/mobile-crane-setup", "SWP-001 — SETUP →")],
    },
    {
      ...SHARED.navcan("19"),
      group: PAD,
      note: "If this boom is an obstacle to air navigation — tall pick, airport zoning — NAV CANADA assesses land use. Mobile cranes are not exempt because they can fold.",
    },
    {
      ...SHARED.aeronautical("20"),
      group: PAD,
      note: "Transport Canada Aeronautical Assessment when the boom is an obstacle or you need marking and lighting. Not only a tower problem.",
    },
    { ...SHARED.traffic("21"), group: PAD },
    {
      id: "lattice-ad",
      n: "22",
      title: "LATTICE BOOM ASSEMBLY / DISASSEMBLY",
      group: CFG,
      need: "if-applicable",
      note: "If this lattice is built or stripped on this pad: the manufacturer’s sequence is the sequence. A qualified person directs it. Blocking, pin order, assist crane. 14.12. This is not a tower NOP-TC.",
      site: [
        site("/safety/form/lift-plan", "LIFT PLAN — FRM-006 →"),
        site("/safety/swp/mobile-crane-setup", "SWP-001 — SETUP →"),
      ],
    },
    {
      id: "reconfigure",
      n: "23",
      title: "JIB, FLY, COUNTERWEIGHT, REEVING",
      group: CFG,
      need: "if-applicable",
      note: "A change of configuration is a new chart. Install as the manufacturer. Confirm the LMI / RCI matches before the next pick.",
      site: [site("/safety/form/lift-plan", "LIFT PLAN — FRM-006 →")],
    },
    { ...SHARED.variance("24"), group: CFG },
    {
      id: "pre-use",
      n: "25",
      title: "PRE-USE INSPECTION",
      group: LOGS,
      need: "required",
      note: "14.35. Each shift the crane is used. Manufacturer list plus this program. Defects that affect lifting keep the crane down.",
      formSlug: "crane-pre-use",
      site: [site("/safety/swp/crane-pre-use-inspection", "SWP-002 — PRE-USE →")],
    },
    {
      id: "operator-log",
      n: "26",
      title: "OPERATOR LOG / INSPECTION RECORDS",
      group: LOGS,
      need: "required",
      note: "14.14. Hours, lifts, defects — dated and signed. Stays with the machine. The log is how the next operator knows the last shift.",
      site: [site("/safety/form/crane-operator-log", "OPERATOR LOG — FRM-023 →")],
    },
    {
      id: "frequent-periodic",
      n: "27",
      title: "FREQUENT AND PERIODIC INSPECTION",
      group: LOGS,
      need: "required",
      note: "14.13. Weekly and monthly as the OEM and the named 14.2 standard require. Not a tower weekly sheet used as a stand-in.",
      site: [
        site("/safety/form/weekly-maintenance", "WEEKLY — FRM-025 →"),
        site("/safety/form/monthly-maintenance", "MONTHLY — FRM-026 →"),
        site("/safety/form/crane-inspection-form", "CRANE INSPECTION — FRM-021 →"),
      ],
    },
    {
      id: "rci",
      n: "28",
      title: "RATED CAPACITY INDICATION / ANTI-TWO-BLOCK",
      group: LOGS,
      need: "required",
      note: "14.5, 14.7, 14.8. LMI / RCI, boom angle, radius — working, and matching this configuration. Anti-two-block not bypassed. Inoperative device: the crane does not lift.",
      site: [site("/safety/form/crane-pre-use", "PRE-USE — FRM-002 →")],
    },
    { ...SHARED.riggingCert("29"), group: LOGS },
    { ...SHARED.bth("30"), group: LIFTG },
    {
      id: "lift-method",
      n: "31",
      title: "LIFT PLANNING METHOD",
      group: LIFTG,
      need: "required",
      note: "How this crew plans a lift. Weight, COG, chart, path, abort — before the hook. Filled plans for non-routine work sit behind this item.",
      site: [
        site("/safety/swp/lift-planning", "SWP-020 — LIFT PLANNING →"),
        site("/safety/form/lift-plan", "LIFT PLAN — FRM-006 →"),
        site("/safety/form/rigging-plan", "RIGGING PLAN — FRM-008 →"),
      ],
    },
    {
      id: "critical",
      n: "32",
      title: "CRITICAL AND TANDEM LIFTS",
      group: LIFTG,
      need: "if-applicable",
      note: "14.42 and 14.42.1. Written plan, named supervision. Tandem is not two operators guessing.",
      site: [
        site("/safety/form/critical-lift-plan", "CRITICAL LIFT PLAN — FRM-007 →"),
        site("/safety/swp/critical-lifts", "SWP-019 — CRITICAL LIFTS →"),
      ],
    },
    {
      id: "daily-paper",
      n: "33",
      title: "FLHA AND DAILY LIFT CHECK",
      group: LIFTG,
      need: "required",
      note: "This shift, this lift, this ground. Not last Tuesday’s sheet with the date changed.",
      site: [
        site("/safety/form/flha", "FLHA — FRM-001 →"),
        site("/safety/form/daily-lift-checklist", "DAILY LIFT — FRM-005 →"),
        site("/safety/form/pre-lift-meeting", "PRE-LIFT MEETING — FRM-009 →"),
      ],
    },
    {
      id: "pick-carry",
      n: "34",
      title: "TRAVELLING WITH A LOAD",
      group: LIFTG,
      need: "if-applicable",
      note: "14.70. Pick-and-carry only on the chart for that configuration. Boom position, speed, path — as the manufacturer. If there is no travel-with-load chart, there is no travel with a load.",
    },
    {
      ...SHARED.radio("35"),
      group: LIFTG,
      need: "if-applicable",
      note: "52E73C is written for tower, self-erect and industrial cranes. If this mobile uses radios to direct the hook on a construction site for more than a week, treat coordination as required. Dedicated channel. Multi-channel radios are not how you direct the hook.",
    },
    {
      ...SHARED.swpOps("36"),
      group: METHOD,
      note: "How this crane is set, run and shut down. Pre-use, operation, shutdown. The chart is the law of the machine.",
      site: [
        site("/safety/swp/mobile-crane-setup", "SWP-001 — SETUP →"),
        site("/safety/swp/crane-operation", "SWP-003 — OPERATION →"),
        site("/safety/swp/crane-shutdown", "SWP-004 — SHUTDOWN →"),
      ],
    },
    {
      ...SHARED.erp("37"),
      group: METHOD,
      note: "Site ERP plus crane-specific: powerline contact, tip, load hang-up, travel incident. THARRP is a tower-cab problem. A mobile still needs a named first-aid and muster.",
    },
    {
      id: "powerlines-swp",
      n: "38",
      title: "WORKING NEAR POWERLINES",
      group: METHOD,
      need: "required",
      note: "Part 19 Table 19-1A. Assume live. MAD is a wall. Form 30M33 is item 13. This item is the method the crew can repeat.",
      site: [site("/safety/swp/working-near-powerlines", "SWP-018 — POWERLINES →")],
    },
    {
      id: "weather",
      n: "39",
      title: "WEATHER AND WIND",
      group: METHOD,
      need: "required",
      note: "Thunder is the stop. The lower wind number wins. Manufacturer and plan — not a vibe.",
      site: [site("/safety/swp/weather-and-wind", "SWP-023 — WEATHER →")],
    },
    {
      ...SHARED.orientation("40"),
      group: METHOD,
      note: "This machine, this site, this chart, these radios, this pad. A mobile ticket is not an orientation. Walk the cab. Ignore tower-only fields that do not apply.",
    },
    SHARED.other("41"),
  ],
};

export const BINDERS: BinderDef[] = [TOWER_BINDER, SELF_ERECT_BINDER, MOBILE_BINDER];

export function getBinder(kind: string) {
  return BINDERS.find((b) => b.kind === kind || b.slug === kind);
}

export function binderGroups(binder: BinderDef) {
  const seen: string[] = [];
  for (const item of binder.items) {
    if (!seen.includes(item.group)) seen.push(item.group);
  }
  return seen.map((group) => ({
    group,
    items: binder.items.filter((item) => item.group === group),
  }));
}

export function binderItemLinks(item: BinderItem): DocLink[] {
  const fill = item.formSlug
    ? [
        site(`/safety/form/${item.formSlug}`, "PROVEN FORM →"),
        site(`/safety/builder/${item.formSlug}`, "FILL + PDF →"),
      ]
    : [];
  return [...fill, ...(item.official ?? []), ...(item.site ?? [])];
}
