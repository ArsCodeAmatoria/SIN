import { SAFETY } from "@/lib/safety";
import { BINDERS } from "./binders";
import { CRANES } from "./cranes";
import { FORMS } from "./forms";
import { JHAS } from "./jhas";
import { POLICIES } from "./policies";
import { REPORTS } from "./reports";
import { SDS } from "./sds";
import { SJPS } from "./sjps";
import { SWPS } from "./swps";

export type CatalogHit = {
  href: string;
  number: string;
  title: string;
  summary: string;
  kind: string;
};

export const POLICY_GROUP_ORDER = [
  "THE COMPANY",
  "THE LIFT",
  "THE CREW",
  "AFTER",
] as const;

const POLICY_GROUP: Record<string, (typeof POLICY_GROUP_ORDER)[number]> = {
  "health-and-safety": "THE COMPANY",
  competency: "THE COMPANY",
  training: "THE COMPANY",
  "continuous-improvement": "THE COMPANY",
  "joint-committee": "THE COMPANY",
  contractors: "THE COMPANY",
  "hazard-identification": "THE LIFT",
  "risk-assessment": "THE LIFT",
  ppe: "THE LIFT",
  "crane-operations": "THE LIFT",
  rigging: "THE LIFT",
  "equipment-inspection": "THE LIFT",
  "environmental-conditions": "THE LIFT",
  "first-aid": "THE CREW",
  "occupational-health": "THE CREW",
  "right-to-refuse": "THE CREW",
  "workplace-conduct": "THE CREW",
  "fitness-for-work": "THE CREW",
  impairment: "THE CREW",
  "working-alone": "THE CREW",
  "violence-and-harassment": "THE CREW",
  "bullying-and-harassment": "THE CREW",
  discrimination: "THE CREW",
  "incident-reporting": "AFTER",
  "near-miss-reporting": "AFTER",
  "emergency-response": "AFTER",
  "injury-management": "AFTER",
  "return-to-work": "AFTER",
};

export const SWP_GROUP_ORDER = [
  "CRANE",
  "SIGNALS",
  "RIGGING",
  "THE PLAN",
] as const;

const SWP_GROUP: Record<string, (typeof SWP_GROUP_ORDER)[number]> = {
  "mobile-crane-setup": "CRANE",
  "crane-pre-use-inspection": "CRANE",
  "crane-operation": "CRANE",
  "crane-shutdown": "CRANE",
  "outrigger-setup": "CRANE",
  "ground-conditions": "CRANE",
  "weather-and-wind": "CRANE",
  "crane-emergency-procedures": "CRANE",
  "crane-communication": "SIGNALS",
  "radio-communication": "SIGNALS",
  "standard-hand-signals": "SIGNALS",
  "blind-lifts": "SIGNALS",
  "rigging-inspection": "RIGGING",
  "sling-selection": "RIGGING",
  "slinging-loads": "RIGGING",
  shackles: "RIGGING",
  hooks: "RIGGING",
  "rigging-hardware": "RIGGING",
  "load-control": "RIGGING",
  "tag-lines": "RIGGING",
  "suspended-loads": "RIGGING",
  "removal-of-damaged-rigging": "RIGGING",
  "working-near-powerlines": "THE PLAN",
  "critical-lifts": "THE PLAN",
  "lift-planning": "THE PLAN",
  lockout: "CRANE",
  "tower-erection-climbing": "CRANE",
  "flytable-cycling": "THE PLAN",
  "corner-nontypical-flytables": "THE PLAN",
  "loading-platform-reposition": "THE PLAN",
};

export const JHA_GROUP_ORDER = ["CRANE", "SIGNALS", "RIGGING", "THE PLAN"] as const;

const JHA_GROUP: Record<string, (typeof JHA_GROUP_ORDER)[number]> = {
  "mobile-crane-setup": "CRANE",
  "signalling-a-crane": "SIGNALS",
  "blind-lift": "SIGNALS",
  "rigging-a-load": "RIGGING",
  "connecting-a-load": "RIGGING",
  "landing-a-load": "RIGGING",
  "suspended-load": "RIGGING",
  "tag-line": "RIGGING",
  "rigging-inspection": "RIGGING",
  "critical-lift": "THE PLAN",
  "working-near-powerlines": "THE PLAN",
  "flytable-cycling": "THE PLAN",
  "corner-nontypical-flytables": "THE PLAN",
  "loading-platform-reposition": "THE PLAN",
  "weather-and-wind": "CRANE",
};

export function policyGroup(slug: string) {
  return POLICY_GROUP[slug] ?? "THE COMPANY";
}

export function swpGroup(slug: string) {
  return SWP_GROUP[slug] ?? "CRANE";
}

export function jhaGroup(slug: string) {
  return JHA_GROUP[slug] ?? "RIGGING";
}

export const SJP_GROUP_ORDER = ["FLYTABLE", "LOADING PLATFORM"] as const;

const SJP_GROUP: Record<string, (typeof SJP_GROUP_ORDER)[number]> = {
  "flytable-cycle": "FLYTABLE",
  "corner-nontypical-flytable": "FLYTABLE",
  "loading-platform": "LOADING PLATFORM",
};

export function sjpGroup(slug: string) {
  return SJP_GROUP[slug] ?? "FLYTABLE";
}

export function safetyCatalog(): CatalogHit[] {
  return [
    ...SAFETY.map((item) => ({
      href: `/safety/${item.slug}`,
      number: item.num,
      title: item.title,
      summary: item.kicker,
      kind: "SECTION",
    })),
    ...POLICIES.map((item) => ({
      href: `/safety/policy/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "POLICY",
    })),
    ...SWPS.map((item) => ({
      href: `/safety/swp/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "SWP",
    })),
    ...JHAS.map((item) => ({
      href: `/safety/jha/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "JHA",
    })),
    ...SJPS.map((item) => ({
      href: `/safety/sjp/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "SJP",
    })),
    {
      href: "/safety/builder",
      number: "PROVEN-FRM",
      title: "FORM BUILDER",
      summary: "Assemble, fill, PDF.",
      kind: "FORM",
    },
    {
      href: "/safety/binder",
      number: "PROVEN-BND",
      title: "CRANE BINDERS",
      summary: "Tower, self-erect or mobile / crawler site binder.",
      kind: "BINDER",
    },
    ...BINDERS.map((item) => ({
      href: `/safety/binder/${item.kind}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "BINDER",
    })),
    ...CRANES.map((item) => ({
      href: `/safety/crane/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "CRANE",
    })),
    ...FORMS.map((item) => ({
      href: `/safety/form/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "FORM",
    })),
    ...SDS.map((item) => ({
      href: `/safety/sds/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.use,
      kind: "SDS",
    })),
    ...REPORTS.map((item) => ({
      href: `/safety/report/${item.slug}`,
      number: item.number,
      title: item.title,
      summary: item.summary,
      kind: "REPORT",
    })),
  ];
}
