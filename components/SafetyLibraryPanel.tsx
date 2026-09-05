import { peakRisk } from "@/components/RiskBadge";
import { SafetyLibrary } from "@/components/SafetyLibrary";
import {
  CRANE_GROUP_ORDER,
  CRANES,
  FORM_GROUPS,
  FORMS,
  POLICIES,
  REPORTS,
  SDS,
  JHAS,
  SJPS,
  SWPS,
} from "@/lib/ohs";
import { BINDERS } from "@/lib/ohs/binders";
import {
  JHA_GROUP_ORDER,
  POLICY_GROUP_ORDER,
  SJP_GROUP_ORDER,
  SWP_GROUP_ORDER,
  jhaGroup,
  policyGroup,
  sjpGroup,
  swpGroup,
} from "@/lib/ohs/catalog";
import type { SafetyLibraryKind } from "@/lib/safety";

export function SafetyLibraryPanel({ kind }: { kind: SafetyLibraryKind }) {
  if (kind === "swp") {
    return (
      <SafetyLibrary
        placeholder="Setup, signals, slings, powerlines…"
        groupOrder={SWP_GROUP_ORDER}
        items={SWPS.map((item) => ({
          href: `/safety/swp/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.summary,
          meta: swpGroup(item.slug),
        }))}
      />
    );
  }
  if (kind === "jha") {
    return (
      <SafetyLibrary
        placeholder="Overload, pinch, powerlines, suspended load…"
        groupOrder={JHA_GROUP_ORDER}
        items={JHAS.map((item) => ({
          href: `/safety/jha/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.summary,
          meta: jhaGroup(item.slug),
          risk: peakRisk(item.rows.map((row) => row.level)),
        }))}
      />
    );
  }
  if (kind === "sjp") {
    return (
      <SafetyLibrary
        placeholder="Flytable cycle, this lift, this floor…"
        groupOrder={SJP_GROUP_ORDER}
        items={SJPS.map((item) => ({
          href: `/safety/sjp/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.summary,
          meta: sjpGroup(item.slug),
        }))}
      />
    );
  }
  if (kind === "policy") {
    return (
      <SafetyLibrary
        placeholder="Competency, PPE, refuse unsafe work…"
        groupOrder={POLICY_GROUP_ORDER}
        items={POLICIES.map((item) => ({
          href: `/safety/policy/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.summary,
          meta: policyGroup(item.slug),
        }))}
      />
    );
  }
  if (kind === "form") {
    return (
      <SafetyLibrary
        placeholder="FLHA, lift plan, inspection, OHS meeting…"
        groupOrder={["Builder", ...FORM_GROUPS]}
        items={[
          {
            href: "/safety/builder",
            number: "PROVEN-FRM",
            title: "FORM BUILDER",
            summary:
              "Assemble approved Safety Blocks. Fill on this device. Download or email a PDF.",
            meta: "Builder",
          },
          ...FORMS.map((item) => ({
            href: `/safety/form/${item.slug}`,
            number: item.number,
            title: item.title,
            summary: item.summary,
            meta: item.group,
          })),
        ]}
      />
    );
  }
  if (kind === "sds") {
    return (
      <SafetyLibrary
        placeholder="Diesel, hydraulic oil, grease…"
        items={SDS.map((item) => ({
          href: `/safety/sds/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.use,
        }))}
      />
    );
  }
  if (kind === "crane") {
    return (
      <SafetyLibrary
        placeholder="MDT 219, CTT 172, J165.8, SK 225, SN 160…"
        groupOrder={CRANE_GROUP_ORDER}
        items={CRANES.map((item) => ({
          href: `/safety/crane/${item.slug}`,
          number: item.number,
          title: item.title,
          summary: item.summary,
          meta: item.family,
        }))}
      />
    );
  }
  if (kind === "binder") {
    return (
      <SafetyLibrary
        placeholder="30M33, radio, NOP-TC, tower report…"
        groupOrder={["Wizard", "Tower", "Self-erect", "Binder forms"]}
        items={[
          {
            href: "/safety/binder",
            number: "GOSPEL-BND",
            title: "BINDER WIZARD",
            summary:
              "Tower or self-erect. Walk the checklist. Download the GOSPEL PDF.",
            meta: "Wizard",
          },
          ...BINDERS.map((item) => ({
            href: `/safety/binder/${item.kind}`,
            number: item.number,
            title: item.title,
            summary: item.summary,
            meta: item.kind === "tower" ? "Tower" : "Self-erect",
          })),
          ...FORMS.filter((item) => item.group === "Binder").map((item) => ({
            href: `/safety/form/${item.slug}`,
            number: item.number,
            title: item.title,
            summary: item.summary,
            meta: "Binder forms",
          })),
        ]}
      />
    );
  }
  return (
    <SafetyLibrary
      placeholder="Incident, near miss, damaged rigging…"
      items={REPORTS.map((item) => ({
        href: `/safety/report/${item.slug}`,
        number: item.number,
        title: item.title,
        summary: item.summary,
      }))}
    />
  );
}
