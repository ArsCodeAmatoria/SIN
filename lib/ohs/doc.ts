export const DOC_KINDS = [
  "POL",
  "SWP",
  "JHA",
  "SJP",
  "FRM",
  "SDS",
  "CRN",
  "BND",
  "RPT",
] as const;

export type DocKind = (typeof DOC_KINDS)[number];

const KIND_SET = new Set<string>(DOC_KINDS);

export const KIND_LABELS: Record<DocKind, string> = {
  POL: "POLICY",
  SWP: "SWP",
  JHA: "JHA",
  SJP: "SJP",
  FRM: "FORM",
  SDS: "SDS",
  CRN: "CRANE",
  BND: "BINDER",
  RPT: "REPORT",
};

export function controlTypeLabel(number: string): string {
  const kind = docKind(number);
  return kind ? KIND_LABELS[kind] : "PROGRAM STANDARD";
}

export const LIBRARY_KIND: Record<string, DocKind> = {
  policy: "POL",
  swp: "SWP",
  jha: "JHA",
  sjp: "SJP",
  form: "FRM",
  sds: "SDS",
  crane: "CRN",
  binder: "BND",
  report: "RPT",
};

export function shortNumber(number: string): string {
  return number.replace(/^(GOSPEL|PROVEN|Proven)-/, "");
}

export function docKind(number: string): DocKind | undefined {
  const head = shortNumber(number).split("-")[0];
  return KIND_SET.has(head) ? (head as DocKind) : undefined;
}

export function isDocKind(value: string): value is DocKind {
  return KIND_SET.has(value);
}
