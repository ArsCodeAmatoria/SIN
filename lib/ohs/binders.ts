import type { DocLink } from "./types";

/**
 * Site binders follow BC Crane Safety’s Tower / Self-Erect checklists
 * (FM-TC-01, Sept 2024) used with the WorkSafeBC NOP-TC. This wizard does not
 * replace those templates. It builds a working copy: numbered
 * items, who holds them, and the downloadable forms that go in the file.
 * https://bccranesafety.ca/resources/tower-crane-site-binder/
 */

export const BINDER_OFFICIAL = {
  bccsBinder:
    "https://bccranesafety.ca/resources/tower-crane-site-binder/",
  towerChecklist:
    "https://bccranesafety.ca/download/92/download/9405/tower-crane-site-binder-document-checklist-2.pdf",
  selfErectChecklist:
    "https://bccranesafety.ca/wpfd_file/self-erect-tower-crane-site-binder-document-checklist-2/",
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
export type BinderKind = "tower" | "self-erect";
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
    note: "Part 19 Table 19-1A. MAD is 1 m under 750 V, 3 m to 75 kV, 4.5 m to 250 kV, 6 m to 550 kV. Unknown: 3 m distribution, 6 m transmission, until BC Hydro verifies. If the crane can enter those limits, Form 30M33 is completed with the power-system owner. Coded form — order it from WorkSafeBC. The GOSPEL sheet is the schematic and the discussion. Post it on the site board.",
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
    note: "A tower operator in the cab is fire-department rope rescue, not a GOSPEL rappel. Host or prime requests the survey in the THARRP portal. Confirm it exists before the operator goes up.",
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
    note: "Written procedures for the high-risk work. GOSPEL-SWP-027 is the company method. The site procedure names this pad, this assist crane, this crew.",
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
    note: "OEM interval for this serial. GOSPEL weekly and monthly forms record the work. The schedule in the binder is the manufacturer’s, not a guess.",
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
  number: "GOSPEL-BND-001",
  summary:
    "Top-slewing tower: hammerhead, topless, luffing jib. Numbered to the BC Crane Safety Tower Crane Site Binder Document Checklist. Mandatory with the NOP-TC.",
  officialName: "Tower Crane Site Binder Document Checklist (FM-TC-01)",
  checklist: off(
    BINDER_OFFICIAL.towerChecklist,
    "BC CRANE SAFETY TOWER CHECKLIST PDF →",
  ),
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
  number: "GOSPEL-BND-002",
  summary:
    "Hup, Igo, Igo T, K-series, CBR, CSE and the rest of the self-erecting class. Numbered to the BC Crane Safety Self-Erect Tower Crane Site Binder. NOP-TC still applies.",
  officialName: "Self-Erect Tower Crane Site Binder Document Checklist",
  checklist: off(
    BINDER_OFFICIAL.selfErectChecklist,
    "BC CRANE SAFETY SELF-ERECT CHECKLIST →",
  ),
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

export const BINDERS: BinderDef[] = [TOWER_BINDER, SELF_ERECT_BINDER];

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
