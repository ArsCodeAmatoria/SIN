/**
 * Maps Proven to WorkSafeBC s. 3.3.
 * Documentation is not implementation.
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
    owner: "Proven",
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
    owner: "Proven",
    frequency: "At least quarterly. After a serious incident.",
  },
  {
    id: "3.3(e)",
    title: "Incident investigation",
    documentation: "09 Incident Reporting · POL-006 · POL-007",
    form: "FRM-010 / 011 / 012 / 013 / 014",
    record: "Report, investigation, closed corrective actions",
    owner: "Proven with the crew",
    frequency: "Prompt. Same shift to start. Close on a date that matches severity.",
  },
  {
    id: "3.3(f)",
    title: "Records and statistics",
    documentation: "19 Document Control · POL-016",
    form: "The forms in this program",
    record: "Kept at least 3 years. Available to the committee or worker rep, and on request to an officer, the union, or the workers.",
    owner: "Proven",
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

export const PROGRAM_HIERARCHY = [
  { title: "PROVEN", body: "The occupational health and safety system. How it runs. Section 21 is the map." },
  { title: "POLICIES", body: "PROVEN-POL. The rules. Library 13." },
  { title: "PROCEDURES", body: "Numbered methods in the sections and the SWP library." },
  { title: "SWPs / PRACTICES", body: "SWPs are steps. Practices are the standing rules in 01, 06, 07 and 12. SJPs are this lift." },
  { title: "FORMS", body: "PROVEN-FRM. How evidence is collected. Library 16 and the form builder." },
  { title: "RECORDS", body: "Completed forms, reports, logs, minutes. Proof the system ran." },
  { title: "REVIEW / CORRECTIVE ACTION", body: "FRM-014. Finding → owner → date → done → verified." },
  { title: "CONTINUOUS IMPROVEMENT", body: "POL-016. Management review. This program revised when the lesson is real." },
] as const;
