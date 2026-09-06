import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE } from "../site";
import {
  binderGroups,
  type BinderDef,
} from "./binders";
import type { BinderDraft } from "./binder-store";
import { itemState } from "./binder-store";
import { shortNumber } from "./doc";
import { issuerHasSign, type Issuer } from "./issuer";
import { drawQr } from "./qr";

const INK = rgb(16 / 255, 16 / 255, 16 / 255);
const STEEL = rgb(108 / 255, 104 / 255, 97 / 255);
const CROWN = rgb(255 / 255, 213 / 255, 0 / 255);
const LINE = rgb(0.75, 0.75, 0.75);
const W = 612;
const H = 792;
const M = 48;
const BOTTOM = 56;
const QR = 132;

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

function binderNumber(binder: BinderDef) {
  return shortNumber(binder.number);
}

async function embedDataUrl(doc: PDFDocument, dataUrl: string) {
  const m = dataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i);
  if (!m) return null;
  const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
  return m[1].toLowerCase().startsWith("jp")
    ? doc.embedJpg(bytes)
    : doc.embedPng(bytes);
}

export function binderLiveUrl(kind: BinderDef["kind"]) {
  return `${SITE.url}/safety/binder/${kind}`;
}

export async function binderToPdf(
  binder: BinderDef,
  draft: BinderDraft,
  issuer?: Issuer,
) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const live = binderLiveUrl(binder.kind);
  const pages: PDFPage[] = [];
  let page = doc.addPage([W, H]);
  pages.push(page);
  let y = H - M;

  function ensure(need: number) {
    if (y - need > BOTTOM) return;
    page = doc.addPage([W, H]);
    pages.push(page);
    y = H - M;
    runningHead();
  }

  function text(s: string, x: number, size: number, f: PDFFont, color = INK) {
    page.drawText(s, { x, y, size, font: f, color });
  }

  function runningHead() {
    text(SITE.name, M, 10, bold);
    const num = binderNumber(binder);
    const numW = bold.widthOfTextAtSize(num, 8);
    text(num, W - M - numW, 8, bold, CROWN);
    y -= 14;
    text(binder.title, M, 8, font, STEEL);
    y -= 12;
    page.drawLine({
      start: { x: M, y },
      end: { x: W - M, y },
      thickness: 0.6,
      color: INK,
    });
    y -= 18;
  }

  async function cover() {
    if (issuer?.logoDataUrl) {
      const img = await embedDataUrl(doc, issuer.logoDataUrl);
      if (img) {
        const scale = Math.min(120 / img.width, 40 / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        page.drawImage(img, { x: M, y: y - h + 10, width: w, height: h });
        y -= h + 8;
      }
    }
    text(SITE.name, M, 18, bold);
    text(
      SITE.descriptor,
      M + bold.widthOfTextAtSize(SITE.name, 18) + 10,
      7,
      font,
      STEEL,
    );
    const num = binderNumber(binder);
    const numW = bold.widthOfTextAtSize(num, 9);
    text(num, W - M - numW, 9, bold, CROWN);
    y -= 28;
    page.drawLine({
      start: { x: M, y },
      end: { x: W - M, y },
      thickness: 1,
      color: INK,
    });
    y -= 28;
    text("PROVEN SITE BINDER", M, 8, bold, CROWN);
    y -= 16;
    const titleLines = wrap(bold, binder.title, 16, W - M * 2);
    for (const line of titleLines) {
      text(line, M, 16, bold);
      y -= 20;
    }
    y -= 4;
    const intro = wrap(
      font,
      binder.workingCopy,
      8,
      W - M * 2,
    );
    for (const line of intro) {
      text(line, M, 8, font, STEEL);
      y -= 11;
    }
    y -= 12;
    if (issuer?.name) {
      text(`Issued for: ${issuer.name}`, M, 9, bold);
      y -= 14;
    }

    const meta: [string, string][] = [
      ["Site", draft.site],
      ["Address", draft.address],
      ["Contractor", draft.contractor],
      ["Activity supervisor", draft.supervisor],
      ["Crane", [draft.make, draft.model, draft.serial].filter(Boolean).join(" / ")],
      ["Meeting date", draft.meeting],
    ];
    for (const [k, v] of meta) {
      text(`${k}:`, M, 8, bold, STEEL);
      text(v || "—", M + 110, 9, font);
      y -= 13;
    }
    y -= 20;

    const qrBottom = y - QR;
    drawQr(page, live, M, qrBottom, QR);
    let copyY = y - 8;
    const copyX = M + QR + 16;
    const copyW = W - M - copyX;
    page.drawText("THIS PAPER IS UNCONTROLLED.", {
      x: copyX,
      y: copyY,
      size: 9,
      font: bold,
      color: INK,
    });
    copyY -= 16;
    const scan = wrap(
      font,
      "Scan for the live checklist. That page can change. This print cannot.",
      8,
      copyW,
    );
    for (const line of scan) {
      page.drawText(line, { x: copyX, y: copyY, size: 8, font, color: STEEL });
      copyY -= 11;
    }
    copyY -= 6;
    for (const line of wrap(font, live, 8, copyW)) {
      page.drawText(line, { x: copyX, y: copyY, size: 8, font: bold, color: INK });
      copyY -= 11;
    }
    y = qrBottom - 16;
  }

  await cover();
  page = doc.addPage([W, H]);
  pages.push(page);
  y = H - M;
  runningHead();

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

  if (issuer && issuerHasSign(issuer)) {
    ensure(80);
    text("ISSUED FOR THIS WORKPLACE", M, 8, bold, STEEL);
    y -= 14;
    if (issuer.signatureDataUrl) {
      const img = await embedDataUrl(doc, issuer.signatureDataUrl);
      if (img) {
        const scale = Math.min(180 / img.width, 48 / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        ensure(h + 20);
        page.drawImage(img, { x: M, y: y - h, width: w, height: h });
        y -= h + 8;
      }
    } else if (issuer.signatureTyped) {
      text(issuer.signatureTyped, M, 14, bold);
      y -= 18;
    }
    const who = [issuer.signedBy || issuer.name, issuer.title]
      .filter(Boolean)
      .join("  ·  ");
    if (who) {
      text(who, M, 9, font);
      y -= 12;
    }
  }

  ensure(36);
  text(
    binder.signoff,
    M,
    7,
    font,
    STEEL,
  );
  y -= 12;
  text(`Generated ${new Date().toISOString().slice(0, 10)}.`, M, 7, font, STEEL);

  const total = pages.length;
  pages.forEach((p, i) => {
    p.drawLine({
      start: { x: M, y: 36 },
      end: { x: W - M, y: 36 },
      thickness: 0.6,
      color: LINE,
    });
    p.drawText("PROVEN  ·  Printed copy uncontrolled", {
      x: M,
      y: 24,
      size: 7,
      font,
      color: STEEL,
    });
    const pageLabel = `${i + 1} / ${total}`;
    p.drawText(pageLabel, {
      x: W - M - font.widthOfTextAtSize(pageLabel, 7),
      y: 24,
      size: 7,
      font,
      color: STEEL,
    });
    p.drawText(live, {
      x: M,
      y: 14,
      size: 6,
      font,
      color: STEEL,
    });
  });

  return doc.save();
}

export function binderPdfFilename(binder: BinderDef, draft: BinderDraft) {
  const site = (draft.site || binder.slug).replace(/[^\w]+/g, "-").slice(0, 40);
  return `${binderNumber(binder)}-${site}.pdf`;
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
