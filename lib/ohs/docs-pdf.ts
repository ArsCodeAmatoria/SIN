import { SAFETY, type SafetySection } from "@/lib/safety";
import { SITE } from "../site";
import { binderToPdf } from "./binder-pdf";
import { emptyDraft } from "./binder-store";
import { binderGroups, type BinderDef } from "./binders";
import { shortNumber } from "./doc";
import { EMPTY_ISSUER } from "./issuer";
import { provenPdf } from "./pdf-kit";
import { policyToPdf } from "./policy-pdf";
import { MANUFACTURER_SDS } from "./sds-manufacturer";
import type { Crane, Jha, Policy, ReportKind, Sds, Sjp, Swp } from "./types";

export async function sectionToPdf(section: SafetySection) {
  const pdf = await provenPdf({
    kicker: `PROGRAM SECTION ${section.num}`,
    number: section.num,
    title: section.title,
    summary: section.intro,
    live: `${SITE.url}/safety/${section.slug}`,
  });
  pdf.steel(section.kicker);
  for (const block of section.blocks) {
    if (block.type === "h") pdf.heading(block.text);
    else if (block.type === "p") pdf.para(block.text);
    else if (block.type === "quote") pdf.quote(block.text);
    else if (block.type === "list") pdf.bullets(block.items);
    else if (block.type === "steps") {
      pdf.heading("PROCEDURE");
      pdf.steps(block.items);
    }
    else if (block.type === "rules") pdf.rules(block.items);
    else if (block.type === "cta") {
      pdf.para(`${block.label}  ${SITE.url}${block.href.startsWith("/") ? block.href : `/${block.href}`}`);
    } else if (block.type === "table") {
      pdf.table(block.columns, block.rows, block.caption);
    }
  }
  return pdf.save();
}

export async function policyDocToPdf(policy: Policy) {
  return policyToPdf(policy, EMPTY_ISSUER);
}

export async function swpToPdf(doc: Swp) {
  const pdf = await provenPdf({
    kicker: "SAFE WORK PROCEDURE",
    number: doc.number,
    title: doc.title,
    summary: doc.summary,
    live: `${SITE.url}/safety/swp/${doc.slug}`,
  });
  pdf.heading("Purpose");
  pdf.para(doc.purpose);
  pdf.heading("Scope");
  pdf.para(doc.scope);
  pdf.para(
    "This document is the method - the steps. Hazards and residual risk for the same work are in the JHA library. A procedure is not a hazard analysis.",
  );
  for (const table of doc.tables ?? []) {
    pdf.table(table.columns, table.rows, table.caption);
  }
  pdf.heading("Procedure");
  pdf.steps(doc.procedure);
  pdf.heading("Responsibilities");
  pdf.rules(doc.responsibilities);
  pdf.heading("Required competency");
  pdf.bullets(doc.competency);
  pdf.heading("Equipment");
  pdf.bullets(doc.equipment);
  pdf.heading("PPE");
  pdf.bullets(doc.ppe);
  pdf.heading("Prohibited practices");
  pdf.bullets(doc.prohibited);
  pdf.heading("Emergency response");
  pdf.para(doc.emergency);
  pdf.heading("Documentation");
  pdf.bullets(doc.documentation);
  pdf.heading("References");
  pdf.bullets(doc.references);
  if (doc.links?.length) {
    pdf.heading("Links");
    pdf.bullets(doc.links.map((link) => `${link.label}  ${link.href}`));
  }
  return pdf.save();
}

export async function jhaToPdf(doc: Jha) {
  const pdf = await provenPdf({
    kicker: "JOB HAZARD ANALYSIS",
    number: doc.number,
    title: doc.title,
    summary: doc.summary,
    live: `${SITE.url}/safety/jha/${doc.slug}`,
  });
  pdf.heading("The job");
  pdf.para(doc.job);
  pdf.heading("Who is exposed");
  pdf.bullets(doc.people);
  pdf.para(
    "A JHA names what can hurt someone and how that risk is controlled. It is not the procedure. Do the work to the matching SWP.",
  );
  pdf.heading("Hazards and risk");
  pdf.steel(
    "Task is the work being analysed. Controls follow eliminate, substitute, engineer, administer, PPE last. Extreme is the killer with no recovery. High is serious injury or a dropped load you still have a chance to stop.",
  );
  pdf.table(
    ["TASK", "HAZARD", "LEVEL", "RISK", "CONTROL"],
    doc.rows.map((row) => [row.task, row.hazard, row.level.toUpperCase(), row.risk, row.control]),
  );
  pdf.heading("Residual risk");
  pdf.para(doc.residual);
  pdf.heading("The job does not proceed if");
  pdf.bullets(doc.stop);
  pdf.heading("PPE - last line");
  pdf.bullets(doc.ppe);
  if (doc.swpLabel && doc.swpHref) {
    pdf.heading("Matching SWP");
    pdf.para(`${doc.swpLabel}  ${SITE.url}${doc.swpHref}`);
  }
  pdf.heading("References");
  pdf.bullets(doc.references);
  return pdf.save();
}

export async function sjpToPdf(doc: Sjp) {
  const pdf = await provenPdf({
    kicker: "SAFE JOB PROCEDURE",
    number: doc.number,
    title: doc.title,
    summary: doc.summary,
    live: `${SITE.url}/safety/sjp/${doc.slug}`,
  });
  pdf.heading("When");
  pdf.para(doc.when);
  pdf.heading("Purpose");
  pdf.para(doc.purpose);
  pdf.para(
    "An SJP is not a longer SWP. It is the SWP plus the facts of this job. Do the work to the method. Fill this instance. If they disagree, stop.",
  );
  pdf.heading("Built on");
  pdf.bullets(doc.basedOn.map((link) => `${link.label}  ${SITE.url}${link.href}`));
  pdf.heading("Facts this sheet must name");
  pdf.bullets(doc.facts);
  pdf.heading("Hold points");
  pdf.steps(doc.holds);
  pdf.heading("Abort");
  pdf.bullets(doc.abort);
  pdf.heading("Named on the sheet");
  pdf.bullets(doc.named);
  pdf.heading("Documentation");
  pdf.bullets(doc.documentation);
  pdf.heading("References");
  pdf.bullets(doc.references);
  return pdf.save();
}

export async function sdsToPdf(doc: Sds) {
  const pdf = await provenPdf({
    kicker: "SDS FIELD CARD",
    number: doc.number,
    title: doc.title,
    summary: doc.use,
    live: `${SITE.url}/safety/sds/${doc.slug}`,
  });
  pdf.heading("Hazards");
  pdf.bullets(doc.hazards);
  pdf.heading("PPE");
  pdf.bullets(doc.ppe);
  pdf.heading("Spill");
  pdf.para(doc.spill);
  pdf.heading("First aid");
  pdf.para(doc.firstAid);
  pdf.heading("Storage");
  pdf.para(doc.storage);
  pdf.para(
    "This is a field card for the lift. The manufacturer SDS for the exact product on site wins if it is stricter or more specific. Example manufacturer sheets sit in Manufacturer-SDS in this pack.",
  );
  const sheets = MANUFACTURER_SDS.filter((item) => item.fieldSlug === doc.slug);
  if (sheets.length) {
    pdf.heading("Example manufacturer SDS in this pack");
    pdf.bullets(sheets.map((item) => `${item.product} - ${item.maker} (${item.file})`));
  }
  return pdf.save();
}

export async function reportToPdf(doc: ReportKind) {
  const pdf = await provenPdf({
    kicker: "REPORT",
    number: doc.number,
    title: doc.title,
    summary: doc.summary,
    live: `${SITE.url}/safety/report/${doc.slug}`,
  });
  pdf.heading("How to use this");
  pdf.para(
    "Open the live report on the phone at the lift. Write what happened while it is still true. Do not wait for a trailer with a printer. The form builder can PDF the filled record.",
  );
  pdf.para(`${SITE.url}/safety/report/${doc.slug}`);
  pdf.para("Printed copy uncontrolled. The current method is the one on the site.");
  return pdf.save();
}

export async function craneToPdf(doc: Crane) {
  const pdf = await provenPdf({
    kicker: `${doc.family}  ·  ${doc.maker}`,
    number: doc.number,
    title: doc.title,
    summary: doc.summary,
    live: `${SITE.url}/safety/crane/${doc.slug}`,
  });
  pdf.heading("This class");
  pdf.rules(doc.specs);
  pdf.heading("Inspect");
  pdf.bullets(doc.inspect);
  pdf.heading("Maintain");
  pdf.bullets(doc.maint);
  pdf.heading("Charts and manuals");
  pdf.para(
    "Serial chart and manuals stay in the cab. Published data sheets are linked from the live card - they are not copied into this pack. Serial plate wins if a download disagrees.",
  );
  pdf.para(doc.productUrl);
  if (doc.charts.length) {
    pdf.heading("Published charts");
    pdf.bullets(doc.charts.map((link) => `${link.label}  ${link.href}`));
  }
  if (doc.manuals.length) {
    pdf.heading("Manuals");
    pdf.bullets(doc.manuals.map((link) => `${link.label}  ${link.href}`));
  }
  return pdf.save();
}

export async function binderChecklistToPdf(binder: BinderDef) {
  return binderToPdf(binder, emptyDraft(binder.kind), EMPTY_ISSUER);
}

export async function binderTabMapToPdf(binder: BinderDef) {
  const pdf = await provenPdf({
    kicker: "SITE BINDER TABS",
    number: binder.number,
    title: binder.title,
    summary: binder.summary,
    live: `${SITE.url}/safety/binder/${binder.kind}`,
  });
  pdf.para(
    "Print the tab inserts. File the official documents and Proven forms behind the matching tab. This page is the map - not a substitute for the BC Crane Safety checklist.",
  );
  for (const group of binderGroups(binder)) {
    pdf.heading(group.group);
    pdf.table(
      ["#", "ITEM", "NEED", "PROVEN FORM"],
      group.items.map((item) => [
        item.n,
        item.title,
        item.need === "required" ? "Required" : "If applicable",
        item.formSlug ?? "-",
      ]),
    );
  }
  return pdf.save();
}

export async function programTabInsertsToPdf() {
  const pdf = await provenPdf({
    kicker: "BINDER TAB INSERTS",
    number: "PROVEN",
    title: "OH&S program tabs",
    summary:
      "Cut on the line. Tape onto 1/5-cut or write-on dividers. Tab numbers match the folders in this zip and the table of contents.",
    live: `${SITE.url}/safety/pack`,
  });
  pdf.steel("Company OH&S binder - 22 tabs. Libraries (policies, SWPs, forms, SDS) sit behind their section tab.");
  pdf.table(
    ["TAB", "SECTION", "GROUP"],
    SAFETY.map((section) => {
      const group =
        [
          ["PEOPLE & RESPONSIBILITY", ["company-safety-policy", "responsibilities", "training-competency", "worker-rights"]],
          ["PLAN THE WORK", ["hazard-assessment", "safe-work-procedures", "safe-job-procedures", "swp-library", "jha-library", "sjp-library"]],
          ["DO THE LIFT", ["crane-operations", "rigging", "fall-protection", "crane-binders"]],
          ["WHEN SOMETHING GOES WRONG", ["incident-reporting", "emergency-response"]],
          ["RECORDS & DOCUMENTS", ["safety-forms", "inspections", "whmis-sds", "document-control"]],
          ["MANAGEMENT SYSTEM", ["ohs-management-system", "ohs-policies"]],
        ].find(([, slugs]) => (slugs as string[]).includes(section.slug))?.[0] ?? "";
      return [section.num, section.title, String(group)];
    }),
  );
  pdf.heading("How to tab");
  pdf.bullets([
    "Buy a 2-inch D-ring binder and 31-tab or write-on dividers.",
    "Print this sheet and 00-Table-of-Contents.pdf. Keep both behind Tab 00 / the front pocket.",
    "Label tabs 01 through 22 with the section titles. Use the group names as colour bands if you have them.",
    "File the PDFs from each numbered folder behind that tab. Do not mix the crane site binder (Tab 22) with this company program.",
    "The crane site binder is a second physical binder. Its tabs are Pre-assembly, Zoning, Ropes, Below the hook, Procedures, Post-assembly, Other - see folder 22.",
    "SDS manufacturer sheets go behind Tab 18, in a plastic sleeve, product facing out.",
  ]);
  return pdf.save();
}

export async function tocToPdf(treeText: string) {
  const pdf = await provenPdf({
    kicker: "TABLE OF CONTENTS",
    number: "PROVEN",
    title: "OH&S program pack",
    summary: "Print this first. It is the tab list and the zip map.",
    live: `${SITE.url}/safety/pack`,
  });
  pdf.heading("What this pack is");
  pdf.para(
    "The whole Proven occupational health and safety program as PDFs, filed the way a company OH&S binder is tabbed. WorkSafeBC s. 3.3 contents live in these sections. Printed copies are uncontrolled. The current version is on sin.ae.org.",
  );
  pdf.heading("Tabs");
  pdf.table(
    ["TAB", "TITLE"],
    SAFETY.map((section) => [section.num, section.title]),
  );
  pdf.heading("Folder tree");
  pdf.para(treeText, 8);
  return pdf.save();
}

export async function readmeToPdf() {
  const pdf = await provenPdf({
    kicker: "START HERE",
    number: "PROVEN",
    title: "How to use this pack",
    summary: "Download. Unzip. Print. Tab. Replace manufacturer SDS with the can on this machine.",
    live: `${SITE.url}/safety/pack`,
  });
  pdf.heading("Two binders, not one");
  pdf.para(
    "This zip is the company OH&S program. Tabs 01-22 match Proven sections. The crane site binder (tower, self-erect, or mobile) is a second file for the machine on this project. It lives in folder 22. Do not stuff NOP-TC and load charts into the policy binder.",
  );
  pdf.heading("Print order");
  pdf.bullets([
    "00-Table-of-Contents.pdf - front of the binder.",
    "00-Binder-tab-inserts.pdf - cut and tape to dividers.",
    "Each numbered folder, in order, behind its tab.",
    "Blank forms from Tab 17 - print what you actually use. Fill on the phone when you can.",
    "Tab 18 - field cards in front, manufacturer SDS behind them in sleeves.",
  ]);
  pdf.heading("SDS");
  pdf.para(
    "WHMIS requires the SDS for the product actually on site. The manufacturer PDFs in this pack are common products a crane crew meets in Canada - diesel, hydraulic oil, EP grease, WD-40, wire-rope dressing, battery acid, pumice hand cleaner, shop cleaner. If the drum says something else, that manufacturer's sheet wins. Date-check them. Manufacturers revise SDS.",
  );
  pdf.heading("Control");
  pdf.para(
    "Revision 01. Effective 2026-09-01. Printed copy uncontrolled. Put your company name on issued policies with the issuer on the live site. Law always wins. Where this program is stricter, this program wins.",
  );
  return pdf.save();
}

export async function manufacturerSdsIndexToPdf() {
  const pdf = await provenPdf({
    kicker: "WHMIS",
    number: "SDS",
    title: "Manufacturer SDS in this pack",
    summary: "Example products. The can on this machine wins.",
    live: `${SITE.url}/safety/whmis-sds`,
  });
  pdf.para(
    "These sheets were copied from manufacturer or publicly posted SDS so a crew can stand up a WHMIS sleeve on day one. They are not a claim that Proven sells these products. Replace them the first time you read the label on the actual drum, can, or battery.",
  );
  pdf.table(
    ["FIELD CARD", "PRODUCT", "MAKER", "FILE"],
    MANUFACTURER_SDS.map((item) => [item.fieldSlug, item.product, item.maker, item.file]),
  );
  pdf.heading("Sources");
  pdf.bullets(MANUFACTURER_SDS.map((item) => `${item.product} - ${item.source}`));
  return pdf.save();
}

export function fileStub(number: string, title: string) {
  const n = shortNumber(number) || number;
  return `${n}-${title.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48)}.pdf`;
}
