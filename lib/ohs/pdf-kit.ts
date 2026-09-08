import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE } from "../site";
import { shortNumber } from "./doc";
import { OHS_META } from "./meta";

export const INK = rgb(16 / 255, 16 / 255, 16 / 255);
export const STEEL = rgb(108 / 255, 104 / 255, 97 / 255);
export const LINE = rgb(0.75, 0.75, 0.75);
export const CROWN = rgb(255 / 255, 213 / 255, 0 / 255);
export const W = 612;
export const H = 792;
export const M = 48;
export const BOTTOM = 56;

export function pdfSafe(text: string) {
  return text
    .replace(/[θΘ]/g, "theta")
    .replace(/[—–−]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[→]/g, "->")
    .replace(/[←]/g, "<-")
    .replace(/[•]/g, "-")
    .replace(/[°]/g, " deg")
    .replace(/[×]/g, "x")
    .replace(/[≤]/g, "<=")
    .replace(/[≥]/g, ">=")
    .replace(/[±]/g, "+/-")
    .replace(/[²]/g, "2")
    .replace(/[³]/g, "3")
    .replace(/[®™©]/g, "")
    .replace(/…/g, "...")
    .replace(/[^\t\n\r\x20-\x7E]/g, " ");
}

export function wrap(font: PDFFont, text: string, size: number, width: number) {
  const words = pdfSafe(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    if (font.widthOfTextAtSize(word, size) <= width) {
      line = word;
      continue;
    }
    let chunk = "";
    for (const ch of word) {
      const trial = chunk + ch;
      if (font.widthOfTextAtSize(trial, size) <= width) chunk = trial;
      else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [" "];
}

export type PdfMeta = {
  kicker: string;
  number: string;
  title: string;
  summary?: string;
  live?: string;
};

export type PdfWriter = {
  heading: (text: string) => void;
  para: (text: string, size?: number) => void;
  steel: (text: string) => void;
  quote: (text: string) => void;
  bullets: (items: string[]) => void;
  steps: (items: { n: string; title: string; body: string }[]) => void;
  rules: (items: { title: string; body: string }[]) => void;
  table: (columns: string[], rows: string[][], caption?: string) => void;
  kv: (label: string, value: string) => void;
  gap: (n?: number) => void;
  save: () => Promise<Uint8Array>;
};

export async function provenPdf(meta: PdfMeta): Promise<PdfWriter> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages: PDFPage[] = [];
  let page = pdf.addPage([W, H]);
  pages.push(page);
  let y = H - M;
  const width = W - M * 2;

  function ensure(need: number) {
    if (y - need > BOTTOM) return;
    page = pdf.addPage([W, H]);
    pages.push(page);
    y = H - M;
  }

  function text(s: string, x: number, size: number, f: PDFFont, color = INK) {
    page.drawText(pdfSafe(s), { x, y, size, font: f, color });
  }

  text(SITE.system, M, 14, bold);
  const num = shortNumber(meta.number) || meta.number;
  const numW = bold.widthOfTextAtSize(pdfSafe(num), 9);
  text(num, W - M - numW, 9, bold);
  y -= 14;
  text(meta.kicker, M, 8, font, STEEL);
  y -= 12;
  page.drawLine({
    start: { x: M, y },
    end: { x: W - M, y },
    thickness: 1.5,
    color: INK,
  });
  y -= 22;
  const titleLines = wrap(bold, meta.title, 14, width);
  for (const line of titleLines) {
    ensure(18);
    text(line, M, 14, bold);
    y -= 16;
  }
  if (meta.summary) {
    y -= 2;
    for (const line of wrap(font, meta.summary, 9, width)) {
      ensure(13);
      text(line, M, 9, font);
      y -= 12;
    }
  }
  y -= 8;
  text(
    `Rev ${OHS_META.revision}  ·  Effective ${OHS_META.effective}  ·  Review ${OHS_META.review}  ·  Printed copy uncontrolled`,
    M,
    7,
    font,
    STEEL,
  );
  y -= 18;

  const writer: PdfWriter = {
    heading(s) {
      ensure(28);
      y -= 4;
      text(s.toUpperCase(), M, 10, bold);
      y -= 6;
      page.drawLine({
        start: { x: M, y },
        end: { x: W - M, y },
        thickness: 0.6,
        color: INK,
      });
      y -= 14;
    },
    para(s, size = 9) {
      for (const line of wrap(font, s, size, width)) {
        ensure(13);
        text(line, M, size, font);
        y -= 12;
      }
      y -= 6;
    },
    steel(s) {
      for (const line of wrap(font, s, 8, width)) {
        ensure(12);
        text(line, M, 8, font, STEEL);
        y -= 11;
      }
      y -= 4;
    },
    quote(s) {
      ensure(28);
      page.drawRectangle({
        x: M,
        y: y - 4,
        width: 3,
        height: 16,
        color: CROWN,
      });
      for (const line of wrap(bold, s, 10, width - 14)) {
        ensure(14);
        text(line, M + 12, 10, bold);
        y -= 13;
      }
      y -= 8;
    },
    bullets(items) {
      for (const item of items) {
        const lines = wrap(font, item, 9, width - 14);
        ensure(13);
        text("·", M, 9, bold);
        text(lines[0], M + 12, 9, font);
        y -= 12;
        for (const line of lines.slice(1)) {
          ensure(13);
          text(line, M + 12, 9, font);
          y -= 12;
        }
      }
      y -= 6;
    },
    steps(items) {
      for (const item of items) {
        ensure(32);
        text(`${item.n}  ${item.title}`.toUpperCase(), M, 9, bold);
        y -= 13;
        for (const line of wrap(font, item.body, 9, width)) {
          ensure(13);
          text(line, M, 9, font);
          y -= 12;
        }
        y -= 6;
      }
    },
    rules(items) {
      for (const item of items) {
        ensure(28);
        text(item.title.toUpperCase(), M, 9, bold);
        y -= 13;
        for (const line of wrap(font, item.body, 9, width)) {
          ensure(13);
          text(line, M, 9, font);
          y -= 12;
        }
        y -= 8;
      }
    },
    table(columns, rows, caption) {
      if (caption) {
        ensure(16);
        text(caption, M, 8, bold, STEEL);
        y -= 12;
      }
      const colW = columns.map(() => width / columns.length);
      const size = columns.length > 4 ? 7 : 8;
      function rowHeight(cells: string[]) {
        return Math.max(
          14,
          ...cells.map((cell, i) => wrap(font, cell || " ", size, colW[i] - 6).length * 10 + 4),
        );
      }
      const headH = rowHeight(columns);
      ensure(headH + 8);
      page.drawRectangle({
        x: M,
        y: y - headH + 10,
        width,
        height: headH,
        color: rgb(0.94, 0.94, 0.93),
      });
      columns.forEach((col, i) => {
        const lines = wrap(bold, col, size, colW[i] - 6);
        lines.forEach((line, li) => {
          page.drawText(pdfSafe(line), {
            x: M + colW.slice(0, i).reduce((a, b) => a + b, 0) + 3,
            y: y - 2 - li * 10,
            size,
            font: bold,
            color: INK,
          });
        });
      });
      y -= headH;
      for (const row of rows) {
        const h = rowHeight(row);
        ensure(h + 4);
        row.forEach((cell, i) => {
          const lines = wrap(font, cell || " ", size, colW[i] - 6);
          lines.forEach((line, li) => {
            page.drawText(pdfSafe(line), {
              x: M + colW.slice(0, i).reduce((a, b) => a + b, 0) + 3,
              y: y - 2 - li * 10,
              size,
              font,
              color: INK,
            });
          });
        });
        y -= h;
        page.drawLine({
          start: { x: M, y: y + 8 },
          end: { x: W - M, y: y + 8 },
          thickness: 0.3,
          color: LINE,
        });
      }
      y -= 8;
    },
    kv(label, value) {
      ensure(16);
      text(`${label.toUpperCase()}  `, M, 7, bold, STEEL);
      const labelW = bold.widthOfTextAtSize(pdfSafe(label.toUpperCase()) + "  ", 7);
      const lines = wrap(font, value, 9, width - labelW);
      text(lines[0], M + labelW, 9, font);
      y -= 12;
      for (const line of lines.slice(1)) {
        ensure(13);
        text(line, M + labelW, 9, font);
        y -= 12;
      }
    },
    gap(n = 10) {
      y -= n;
    },
    async save() {
      const total = pages.length;
      const live = meta.live || SITE.url;
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
        p.drawText(pdfSafe(live), {
          x: M,
          y: 14,
          size: 6,
          font,
          color: STEEL,
        });
      });
      return pdf.save();
    },
  };

  return writer;
}
