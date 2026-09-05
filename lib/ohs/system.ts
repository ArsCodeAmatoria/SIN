/**
 * Maps Proven to WorkSafeBC s. 3.3 and the CFCSA / BCCSA
 * COR® OHS National Audit elements. Documentation is not implementation.
 * Size-dependent duties are named, not invented as universal.
 */

export type SystemRow = {
  id: string;
  title: string;
  documentation: string;
  form: string;
  record: string;
  owner: string;
  frequency: string;
  note?: string;
};

/** WorkSafeBC OHS Regulation s. 3.3 — contents of a formal OHS program. */
export const WSBC_33: SystemRow[] = [
  {
    id: "3.3(a)",
    title: "Aims and responsibilities",
    documentation: "01 Company Safety Policy · 02 Responsibilities · POL-001",
    form: "FRM-019 acknowledgement",
    record: "Signed acknowledgement in the worker file",
    owner: "GOSPEL",
    frequency: "When a worker starts. Review the policy at least annually.",
  },
  {
    id: "3.3(b)",
    title: "Regular inspections",
    documentation: "18 Inspections · POL-013",
    form: "FRM-002 / 003 / 020 / 021 / 027–031",
    record: "Inspection sheets and the corrective-action log",
    owner: "Operator, rigger, supervisor as assigned",
    frequency: "Pre-use each shift. Lift-area at setup. Standing tower at least weekly.",
  },
  {
    id: "3.3(c)",
    title: "Written instructions",
    documentation: "04 SWP · 05 SJP · 14 SWP · 15 JHA · 16 SJP libraries",
    form: "FRM-001 FLHA · FRM-006 lift plan",
    record: "Completed FLHA / plan at the lift",
    owner: "Crew on this lift",
    frequency: "Each shift. Rewrite when the work changes.",
  },
  {
    id: "3.3(d)",
    title: "Management meetings",
    documentation: "POL-016 · 20 OHS Management System",
    form: "FRM-032 management review · FRM-033 OHS meeting",
    record: "Minutes, actions, owners and dates",
    owner: "GOSPEL Safety",
    frequency: "At least quarterly. After a serious incident.",
  },
  {
    id: "3.3(e)",
    title: "Incident investigation",
    documentation: "09 Incident Reporting · POL-006 · POL-007",
    form: "FRM-010 / 011 / 012 / 013 / 014",
    record: "Report, investigation, closed corrective actions",
    owner: "GOSPEL Safety with the crew",
    frequency: "Prompt. Same shift to start. Close on a date that matches severity.",
  },
  {
    id: "3.3(f)",
    title: "Records and statistics",
    documentation: "19 Document Control · POL-016",
    form: "The forms in this program",
    record: "Kept at least 3 years. Available to the committee or worker rep, and on request to an officer, the union, or the workers.",
    owner: "GOSPEL Safety",
    frequency: "Trends reviewed at each management review.",
    note: "3.3(f). First aid records: keep at least 3 years (3.19).",
  },
  {
    id: "3.3(g)",
    title: "Instruction and supervision",
    documentation: "11 Training + Competency · POL-002 · POL-003",
    form: "FRM-015 / 016 / 017",
    record: "Orientation, training and competency in the worker file",
    owner: "This program before the lift. Supervisor on the lift.",
    frequency: "Before first work. Young or new worker before they begin (3.23). When the work class changes.",
  },
];

/**
 * CFCSA COR® Accreditation Standard (14 elements). BCCSA uses the COR® OHS
 * National Audit Document to measure these. Passing score is a matter for
 * the auditor and BCCSA — this table is the document map, not a score.
 */
export const COR_ELEMENTS: SystemRow[] = [
  {
    id: "COR 1",
    title: "Safety and health policy",
    documentation: "01 · POL-001 · POL-016",
    form: "FRM-019",
    record: "Current policy on this site. Signed acknowledgements.",
    owner: "GOSPEL",
    frequency: "Review at least annually.",
  },
  {
    id: "COR 2",
    title: "Hazard assessment, analysis and control",
    documentation: "03 · POL-004 · POL-005 · JHA library",
    form: "FRM-001 · JHA pages",
    record: "FLHA each shift. JHA for the class of work.",
    owner: "Crew. Supervisor confirms.",
    frequency: "Each shift. When conditions change.",
  },
  {
    id: "COR 3",
    title: "Safe work practices",
    documentation: "01 policy statements · 06 Rigging · 07 Crane Operations · 12 Worker Rights",
    form: "FRM-004 toolbox",
    record: "Toolbox attendance. Worker acknowledgement.",
    owner: "GOSPEL",
    frequency: "Practices live in this program. Briefed each shift.",
    note: "Practices are the standing rules. Procedures are the numbered SWPs.",
  },
  {
    id: "COR 4",
    title: "Safe job procedures",
    documentation: "04 · 05 · SWP library",
    form: "FRM-006 / 007 when the SWP is not enough",
    record: "Plan at the lift. SJP for non-routine work.",
    owner: "Supervisor / planner",
    frequency: "SWPs are the default method. SJP when the work is not routine.",
  },
  {
    id: "COR 5",
    title: "Company safety rules",
    documentation: "01 · POL-018 · POL-008 · POL-010 · POL-020",
    form: "FRM-019 · FRM-035 refusal",
    record: "Acknowledgements. Refusal records.",
    owner: "GOSPEL",
    frequency: "When a worker starts. Enforced every lift.",
  },
  {
    id: "COR 6",
    title: "Personal protective equipment",
    documentation: "POL-010",
    form: "FRM-018",
    record: "Issue, inspection, replacement",
    owner: "The employer and the worker",
    frequency: "Inspect before use. Replace when it fails.",
  },
  {
    id: "COR 7",
    title: "Preventative maintenance",
    documentation: "POL-013 · 18 Inspections",
    form: "FRM-025 / 026 / 030 / 031",
    record: "Maintenance log. Out-of-service tags.",
    owner: "Owner of the machine for PM. The operator for pre-use and defect reports.",
    frequency: "OEM interval for gear used on the lift. Host/owner PM for their crane.",
    note: "Most cranes are not owned by the crew. Pre-use and defect reporting still are.",
  },
  {
    id: "COR 8",
    title: "Training and communication",
    documentation: "11 · POL-002 · POL-003 · 12",
    form: "FRM-015 / 016 / 017 / 004 / 033",
    record: "Worker file. Toolbox and OHS meeting minutes.",
    owner: "GOSPEL",
    frequency: "Before the lift. Toolbox each shift. OHS meeting at least monthly if 3.2 applies; otherwise with management review.",
  },
  {
    id: "COR 9",
    title: "Inspections",
    documentation: "18 · POL-013",
    form: "FRM-002 / 003 / 020 / 027–031",
    record: "Sheets plus FRM-014",
    owner: "Assigned competent person",
    frequency: "See 3.3(b).",
  },
  {
    id: "COR 10",
    title: "Investigations and reporting",
    documentation: "09 · POL-006",
    form: "FRM-010–014",
    record: "Closed investigations",
    owner: "GOSPEL Safety",
    frequency: "Prompt.",
  },
  {
    id: "COR 11",
    title: "Emergency preparedness",
    documentation: "10 · POL-015",
    form: "FRM-034 drill",
    record: "Site brief on the FLHA. Drill record where the employer controls the workplace.",
    owner: "Supervisor on the lift. Host employer for the site ERP.",
    frequency: "Briefed before work. Drills where the employer controls that workplace. Tower: THARRP plan confirmed before the operator goes up.",
  },
  {
    id: "COR 12",
    title: "Statistics, records and document control",
    documentation: "19 · POL-016",
    form: "FRM-032",
    record: "The files named in 3.3(f)",
    owner: "GOSPEL Safety",
    frequency: "Trends at each management review. Documents: revision 01, review by 2027-09-01.",
  },
  {
    id: "COR 13",
    title: "Legislation",
    documentation: "01 standards stack · this site /safety#standards",
    form: "FRM-015 (program and rights)",
    record: "Orientation that the Regulation and this program were shown",
    owner: "GOSPEL",
    frequency: "When a worker starts. When the named edition in the Regulation changes.",
    note: "Workers can read the Regulation on worksafebc.com. This program cites the editions Part 14 actually names.",
  },
  {
    id: "COR 14",
    title: "Procurement and contractor management",
    documentation: "POL-027 · 02 Responsibilities",
    form: "Lift file: host orientation, prime contractor named",
    record: "Who is prime. What the host required. What was verified before the lift.",
    owner: "The supervisor or the contractor",
    frequency: "Each lift.",
    note: "The contractor on a host site is usually not the prime. Subcontractors are selected and monitored to this policy.",
  },
];

export const PROGRAM_HIERARCHY = [
  { title: "PROVEN", body: "GOSPEL’s safety system. How it runs. Section 21 is the map." },
  { title: "POLICIES", body: "GOSPEL-POL. The rules. Library 13." },
  { title: "PROCEDURES", body: "Numbered methods in the sections and the SWP library." },
  { title: "SWPs / PRACTICES", body: "SWPs are steps. Practices are the standing rules in 01, 06, 07 and 12. SJPs are this lift." },
  { title: "FORMS", body: "PROVEN-FRM. How evidence is collected. Library 16 and the form builder." },
  { title: "RECORDS", body: "Completed forms, reports, logs, minutes. Proof the system ran." },
  { title: "REVIEW / CORRECTIVE ACTION", body: "FRM-014. Finding → owner → date → done → verified." },
  { title: "CONTINUOUS IMPROVEMENT", body: "POL-016. Management review. COR audit. This program revised when the lesson is real." },
] as const;
