import {
  docKind,
  shortNumber,
  type DocKind,
} from "@/lib/ohs/doc";

const LABELS: Record<DocKind, string> = {
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

export function DocBadge({
  number,
  kind,
  label,
}: {
  number?: string;
  kind?: DocKind;
  label?: string;
}) {
  const resolved = kind ?? (number ? docKind(number) : undefined);
  if (!resolved && !label && !number) return null;
  const text =
    label ??
    (number ? shortNumber(number) : resolved ? LABELS[resolved] : "");
  return (
    <span
      className={`doc-badge${resolved === "BND" ? " is-binder" : ""}`}
      data-kind={resolved ?? "DOC"}
    >
      {text}
    </span>
  );
}
