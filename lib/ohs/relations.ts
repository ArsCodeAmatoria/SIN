export type RelatedLink = { href: string; label: string };

/** Required records and actions for a program section, SWP, or form. Keys are slugs or `kind/slug`. */
export const RECORDS_FOR: Record<string, RelatedLink[]> = {
  "hazard-assessment": [
    { href: "/safety/form/flha", label: "COMPLETE FLHA →" },
    { href: "/safety/form/toolbox-meeting", label: "TOOLBOX MEETING →" },
    { href: "/safety/jha-library", label: "JHA LIBRARY →" },
  ],
  "crane-operations": [
    { href: "/safety/form/crane-pre-use", label: "COMPLETE CRANE PRE-USE →" },
    { href: "/safety/form/tower-pre-use", label: "COMPLETE TOWER PRE-USE →" },
    { href: "/safety/form/lift-plan", label: "COMPLETE LIFT PLAN →" },
    { href: "/safety/form/flha", label: "COMPLETE FLHA →" },
    { href: "/safety/form/toolbox-meeting", label: "TOOLBOX MEETING →" },
    { href: "/safety/form/critical-lift-plan", label: "CRITICAL LIFT PLAN →" },
  ],
  rigging: [
    { href: "/safety/form/rigging-inspection-form", label: "COMPLETE RIGGING INSPECTION →" },
    { href: "/sling", label: "SLING-ANGLE DESK →" },
    { href: "/safety/swp/sling-selection", label: "SLING SELECTION SWP →" },
    { href: "/redtc/rigging-charts", label: "SLING CHARTS →" },
  ],
  "fall-protection": [
    { href: "/safety/form/flha", label: "COMPLETE FLHA →" },
  ],
  "crane-binders": [
    { href: "/safety/binder", label: "BUILD THIS BINDER →" },
  ],
  "safe-work-procedures": [
    { href: "/safety/swp-library", label: "SWP LIBRARY →" },
  ],
  "safe-job-procedures": [
    { href: "/safety/sjp-library", label: "SJP LIBRARY →" },
  ],
  "incident-reporting": [
    { href: "/safety/report/incident", label: "REPORT INCIDENT →" },
    { href: "/safety/form/near-miss-report", label: "NEAR MISS →" },
    { href: "/safety/policy/right-to-refuse", label: "STOP WORK / REFUSE UNSAFE →" },
  ],
  "emergency-response": [
    { href: "/safety/report/incident", label: "REPORT INCIDENT →" },
    { href: "/safety/form/flha", label: "COMPLETE FLHA →" },
  ],
  "worker-rights": [
    { href: "/safety/policy/right-to-refuse", label: "STOP WORK / REFUSE UNSAFE →" },
  ],
  inspections: [
    { href: "/safety/form/crane-pre-use", label: "CRANE PRE-USE →" },
    { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE →" },
    { href: "/safety/form/rigging-inspection-form", label: "RIGGING INSPECTION →" },
    { href: "/safety/builder", label: "FORM BUILDER →" },
  ],
  "safety-forms": [
    { href: "/safety/builder", label: "USE A FORM →" },
  ],
  "swp/working-near-powerlines": [
    { href: "/safety/form/powerline-30m33", label: "POWERLINE RECORD — 30M33 →" },
    { href: "/safety/form/flha", label: "COMPLETE FLHA →" },
  ],
  "swp/weather-and-wind": [
    { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE →" },
    { href: "/safety/form/crane-pre-use", label: "CRANE PRE-USE →" },
    { href: "/safety/form/critical-lift-plan", label: "CRITICAL LIFT PLAN →" },
  ],
  "swp/crane-pre-use-inspection": [
    { href: "/safety/form/crane-pre-use", label: "COMPLETE CRANE PRE-USE →" },
  ],
  "swp/rigging-inspection": [
    { href: "/safety/form/rigging-inspection-form", label: "COMPLETE RIGGING INSPECTION →" },
  ],
  "swp/lift-planning": [
    { href: "/safety/form/lift-plan", label: "COMPLETE LIFT PLAN →" },
    { href: "/safety/form/critical-lift-plan", label: "CRITICAL LIFT PLAN →" },
  ],
  "swp/hooks": [
    { href: "/safety/form/rigging-inspection-form", label: "COMPLETE RIGGING INSPECTION →" },
    { href: "/safety/rigging", label: "06 — RIGGING →" },
  ],
};

export const GOVERNED_BY: Record<string, RelatedLink> = {
  "form/flha": { href: "/safety/hazard-assessment", label: "03 — Hazard Assessment →" },
  "form/toolbox-meeting": { href: "/safety/hazard-assessment", label: "03 — Hazard Assessment →" },
  "form/crane-pre-use": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "form/tower-pre-use": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "form/lift-plan": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "form/critical-lift-plan": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "form/daily-lift-checklist": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "form/rigging-inspection-form": { href: "/safety/rigging", label: "06 — Rigging →" },
  "form/rigging-equipment-inspection": { href: "/safety/rigging", label: "06 — Rigging →" },
  "form/powerline-30m33": { href: "/safety/swp/working-near-powerlines", label: "SWP — Working near powerlines →" },
  "form/near-miss-report": { href: "/safety/incident-reporting", label: "09 — Incident Reporting →" },
  "form/first-aid-report": { href: "/safety/incident-reporting", label: "09 — Incident Reporting →" },
  "swp/working-near-powerlines": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "swp/weather-and-wind": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "swp/crane-pre-use-inspection": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "swp/crane-operation": { href: "/safety/crane-operations", label: "07 — Crane Operations →" },
  "swp/sling-selection": { href: "/safety/rigging", label: "06 — Rigging →" },
  "swp/rigging-inspection": { href: "/safety/rigging", label: "06 — Rigging →" },
  "swp/hooks": { href: "/safety/rigging", label: "06 — Rigging →" },
  "swp/shackles": { href: "/safety/rigging", label: "06 — Rigging →" },
  "swp/slinging-loads": { href: "/safety/rigging", label: "06 — Rigging →" },
  "policy/right-to-refuse": { href: "/safety/worker-rights", label: "12 — Worker Rights →" },
};

export function recordsFor(key: string): RelatedLink[] {
  return RECORDS_FOR[key] ?? [];
}

export function governedBy(key: string): RelatedLink | undefined {
  return GOVERNED_BY[key];
}
