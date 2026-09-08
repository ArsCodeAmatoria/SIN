import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE } from "../site";
import { shortNumber } from "./doc";
import { issuerHasBrand, issuerHasSign, type Issuer } from "./issuer";
import { pdfSafe } from "./pdf-kit";
import type { Policy } from "./types";

const INK = rgb(16 / 255, 16 / 255, 16 / 255);
const STEEL = rgb(108 / 255, 104 / 255, 97 / 255);
const LINE = rgb(0.75, 0.75, 0.75);
const W = 612;
const H = 792;
const M = 48;
const BOTTOM = 56;

function wrap(font: PDFFont, text: string, size: number, width: number) {
  const words = pdfSafe(text).split(/\s+/).filter(Boolean);
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

async function embedDataUrl(doc: PDFDocument, dataUrl: string) {
  const m = dataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i);
  if (!m) return null;
  const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
  return m[1].toLowerCase().startsWith("jp")
    ? doc.embedJpg(bytes)
    : doc.embedPng(bytes);
}

export async function policyToPdf(policy: Policy, issuer: Issuer) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages: PDFPage[] = [];
  let page = pdf.addPage([W, H]);
  pages.push(page);
  let y = H - M;

  function ensure(need: number) {
    if (y - need > BOTTOM) return;
    page = pdf.addPage([W, H]);
    pages.push(page);
    y = H - M;
  }

  function text(s: string, x: number, size: number, f: PDFFont, color = INK) {
    page.drawText(pdfSafe(s), { x, y, size, font: f, color });
  }

  if (issuer.logoDataUrl) {
    const img = await embedDataUrl(pdf, issuer.logoDataUrl);
    if (img) {
      const scale = Math.min(110 / img.width, 36 / img.height, 1);
      const w = img.width * scale;
      const h = img.height * scale;
      page.drawImage(img, { x: M, y: y - h + 8, width: w, height: h });
    }
  }

  text(SITE.system, issuer.logoDataUrl ? M + 120 : M, 14, bold);
  const num = shortNumber(policy.number);
  const numW = bold.widthOfTextAtSize(num, 9);
  text(num, W - M - numW, 9, bold);
  y -= 18;
  if (issuer.name) {
    text(issuer.name, M, 9, font, STEEL);
    y -= 12;
  }
  page.drawLine({
    start: { x: M, y },
    end: { x: W - M, y },
    thickness: 1.5,
    color: INK,
  });
  y -= 22;
  text(policy.title, M, 14, bold);
  y -= 16;
  const meta = wrap(font, policy.summary, 9, W - M * 2);
  for (const line of meta) {
    ensure(14);
    text(line, M, 9, font);
    y -= 12;
  }
  y -= 10;
  text("Working copy. Current controlled version is on this site.", M, 7, font, STEEL);
  y -= 18;

  for (const item of policy.statements) {
    ensure(36);
    text(item.title.toUpperCase(), M, 10, bold);
    y -= 14;
    const body = wrap(font, item.body, 9, W - M * 2);
    for (const line of body) {
      ensure(13);
      text(line, M, 9, font);
      y -= 12;
    }
    y -= 10;
  }

  if (issuerHasSign(issuer) || issuerHasBrand(issuer)) {
    ensure(90);
    y -= 8;
    page.drawLine({
      start: { x: M, y },
      end: { x: W - M, y },
      thickness: 0.6,
      color: LINE,
    });
    y -= 16;
    text("ISSUED FOR THIS WORKPLACE", M, 8, bold, STEEL);
    y -= 14;
    if (issuer.signatureDataUrl) {
      const img = await embedDataUrl(pdf, issuer.signatureDataUrl);
      if (img) {
        const scale = Math.min(180 / img.width, 48 / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        ensure(h + 24);
        page.drawImage(img, { x: M, y: y - h, width: w, height: h });
        y -= h + 8;
      }
    } else if (issuer.signatureTyped) {
      text(issuer.signatureTyped, M, 16, bold);
      y -= 20;
    }
    const who = [issuer.signedBy || issuer.name, issuer.title]
      .filter(Boolean)
      .join("  ·  ");
    if (who) {
      text(who, M, 9, font);
      y -= 12;
    }
    text(new Date().toISOString().slice(0, 10), M, 8, font, STEEL);
  }

  const total = pages.length;
  pages.forEach((p, i) => {
    p.drawLine({
      start: { x: M, y: 36 },
      end: { x: W - M, y: 36 },
      thickness: 0.6,
      color: LINE,
    });
    p.drawText("PROVEN  ·  Printed copy uncontrolled  ·  Check revision on sin.ae.org", {
      x: M,
      y: 24,
      size: 7,
      font,
      color: STEEL,
    });
    const label = `${i + 1} / ${total}`;
    p.drawText(label, {
      x: W - M - font.widthOfTextAtSize(label, 7),
      y: 24,
      size: 7,
      font,
      color: STEEL,
    });
  });

  return pdf.save();
}

export function policyPdfFilename(policy: Policy, issuer: Issuer) {
  const who = (issuer.name || "policy").replace(/[^\w]+/g, "-").slice(0, 40);
  return `${shortNumber(policy.number)}-${who}.pdf`;
}

export function downloadPolicyPdf(bytes: Uint8Array, filename: string) {
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
