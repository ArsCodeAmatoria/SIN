import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE } from "@/lib/site";
import {
  binderGroups,
  type BinderDef,
} from "./binders";
import type { BinderDraft } from "./binder-store";
import { itemState } from "./binder-store";

const INK = rgb(16 / 255, 16 / 255, 16 / 255);
const STEEL = rgb(108 / 255, 104 / 255, 97 / 255);
const CROWN = rgb(255 / 255, 213 / 255, 0 / 255);
const LINE = rgb(0.75, 0.75, 0.75);
const W = 612;
const H = 792;
const M = 48;
const BOTTOM = 48;

function wrap(font: PDFFont, text: string, size: number, width: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [" "];
}

function statusLabel(status: string) {
  if (status === "have") return "IN BINDER";
  if (status === "need") return "MISSING";
  if (status === "na") return "N/A";
  return "—";
}

export async function binderToPdf(binder: BinderDef, draft: BinderDraft) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages: PDFPage[] = [];
  let page = doc.addPage([W, H]);
  pages.push(page);
  let y = H - M;

  function ensure(need: number) {
    if (y - need > BOTTOM) return;
    page = doc.addPage([W, H]);
    pages.push(page);
    y = H - M;
  }

  function text(s: string, x: number, size: number, f: PDFFont, color = INK) {
    page.drawText(s, { x, y, size, font: f, color });
  }

  text(SITE.name, M, 18, bold);
  text(
    SITE.descriptor,
    M + bold.widthOfTextAtSize(SITE.name, 18) + 10,
    7,
    font,
    STEEL,
  );
  const numW = bold.widthOfTextAtSize(binder.number, 9);
  text(binder.number, W - M - numW, 9, bold, CROWN);
  y -= 28;
  page.drawLine({
    start: { x: M, y },
    end: { x: W - M, y },
    thickness: 1,
    color: INK,
  });
  y -= 22;
  text(binder.title, M, 14, bold);
  y -= 16;
  const intro = wrap(
    font,
    "GOSPEL copy of the site-binder checklist. Numbered to the BC Crane Safety template. Official templates and WorkSafeBC forms stay official — this is the working file.",
    8,
    W - M * 2,
  );
  for (const line of intro) {
    text(line, M, 8, font, STEEL);
    y -= 11;
  }
  y -= 8;

  const meta: [string, string][] = [
    ["Site", draft.site],
    ["Address", draft.address],
    ["Contractor", draft.contractor],
    ["Activity supervisor", draft.supervisor],
    ["Crane", [draft.make, draft.model, draft.serial].filter(Boolean).join(" / ")],
    ["Meeting date", draft.meeting],
  ];
  for (const [k, v] of meta) {
    ensure(14);
    text(`${k}:`, M, 8, bold, STEEL);
    text(v || "—", M + 110, 9, font);
    y -= 13;
  }
  y -= 8;

  for (const group of binderGroups(binder)) {
    ensure(22);
    text(group.group.toUpperCase(), M, 9, bold, CROWN);
    y -= 16;
    for (const item of group.items) {
      const st = itemState(draft, item.id);
      const head = `${item.n}  ${item.title}`;
      const headLines = wrap(bold, head, 8, W - M * 2 - 80);
      const noteLines = wrap(font, item.note, 7, W - M * 2);
      const extra = st.who || st.note ? 12 : 0;
      ensure(headLines.length * 11 + noteLines.length * 9 + extra + 10);
      for (const line of headLines) {
        text(line, M, 8, bold);
        y -= 11;
      }
      const mark = statusLabel(st.status);
      const markW = bold.widthOfTextAtSize(mark, 8);
      page.drawText(mark, {
        x: W - M - markW,
        y: y + 11 * headLines.length - 11,
        size: 8,
        font: bold,
        color: st.status === "need" ? CROWN : INK,
      });
      for (const line of noteLines) {
        text(line, M, 7, font, STEEL);
        y -= 9;
      }
      if (st.who || st.note) {
        text(
          [st.who && `Who: ${st.who}`, st.note].filter(Boolean).join("  ·  "),
          M,
          7,
          font,
        );
        y -= 10;
      }
      page.drawLine({
        start: { x: M, y: y + 4 },
        end: { x: W - M, y: y + 4 },
        thickness: 0.4,
        color: LINE,
      });
      y -= 8;
    }
  }

  ensure(36);
  text(
    "Sign-off is on the official BC Crane Safety checklist. This PDF is the GOSPEL working copy.",
    M,
    7,
    font,
    STEEL,
  );
  y -= 12;
  text(`Generated ${new Date().toISOString().slice(0, 10)}. Uncontrolled when printed.`, M, 7, font, STEEL);

  return doc.save();
}

export function binderPdfFilename(binder: BinderDef, draft: BinderDraft) {
  const site = (draft.site || binder.slug).replace(/[^\w]+/g, "-").slice(0, 40);
  return `${binder.number}-${site}.pdf`;
}

export function downloadBinderPdf(bytes: Uint8Array, filename: string) {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  const blob = new Blob([copy], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
