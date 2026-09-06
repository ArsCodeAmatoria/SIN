import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE } from "@/lib/site";
import { shortNumber } from "@/lib/ohs/doc";
import { type Issuer } from "@/lib/ohs/issuer";
import type {
  FormValues,
  InspectionRow,
  SafetyBlock,
  FormDef,
} from "./types";

const INK = rgb(16 / 255, 16 / 255, 16 / 255);
const STEEL = rgb(108 / 255, 104 / 255, 97 / 255);
const CROWN = rgb(255 / 255, 213 / 255, 0 / 255);
const LINE = rgb(0.75, 0.75, 0.75);
const W = 612;
const H = 792;
const M = 48;
const BOTTOM = 52;

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y: number;
  pages: PDFPage[];
};

function fieldText(
  values: FormValues,
  fieldId: string
): string {
  const v = values.fields[fieldId];
  if (Array.isArray(v)) return v.join(", ");
  return (v ?? "").toString();
}

async function ensureSpace(ctx: Ctx, need: number) {
  if (ctx.y - need > BOTTOM) return;
  const page = ctx.doc.addPage([W, H]);
  ctx.pages.push(page);
  ctx.page = page;
  ctx.y = H - M;
}

function wrap(font: PDFFont, text: string, size: number, width: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (!lines.length) lines.push(" ");
  return lines;
}

function drawHeader(ctx: Ctx, form: FormDef, completedBy: string, issuer?: Issuer) {
  const { page, bold, font } = ctx;
  page.drawText(SITE.system, {
    x: M,
    y: H - 36,
    size: 14,
    font: bold,
    color: INK,
  });
  page.drawText("FORM", {
    x: M + bold.widthOfTextAtSize(SITE.system, 14) + 8,
    y: H - 34,
    size: 7,
    font,
    color: STEEL,
  });
  const num = shortNumber(form.number);
  const numW = bold.widthOfTextAtSize(num, 9);
  page.drawText(num, {
    x: W - M - numW,
    y: H - 32,
    size: 9,
    font: bold,
    color: CROWN,
  });
  page.drawLine({
    start: { x: M, y: H - 44 },
    end: { x: W - M, y: H - 44 },
    thickness: 1.5,
    color: INK,
  });
  page.drawText(form.title, {
    x: M,
    y: H - 62,
    size: 11,
    font: bold,
    color: INK,
  });
  const issued = issuer?.name ? `  ·  ${issuer.name}` : "";
  const meta = `Rev ${form.revision}  ·  Effective ${form.effective}  ·  ${form.current ? "CURRENT VERSION" : "WORKING COPY"}  ·  ${completedBy || "Completed in field"}${issued}`;
  page.drawText(meta, {
    x: M,
    y: H - 76,
    size: 7,
    font,
    color: STEEL,
  });
  ctx.y = H - 96;
}

function drawFooter(page: PDFPage, font: PDFFont, i: number, n: number) {
  page.drawLine({
    start: { x: M, y: 36 },
    end: { x: W - M, y: 36 },
    thickness: 0.6,
    color: LINE,
  });
  page.drawText("PROVEN  ·  Printed copy uncontrolled  ·  Check revision on sin.ae.org", {
    x: M,
    y: 24,
    size: 7,
    font,
    color: STEEL,
  });
  const label = `${i} / ${n}`;
  page.drawText(label, {
    x: W - M - font.widthOfTextAtSize(label, 7),
    y: 24,
    size: 7,
    font,
    color: STEEL,
  });
}

async function drawParagraph(ctx: Ctx, text: string, size = 9, bold = false) {
  const font = bold ? ctx.bold : ctx.font;
  const lines = wrap(font, text, size, W - M * 2);
  for (const line of lines) {
    await ensureSpace(ctx, 14);
    ctx.page.drawText(line, { x: M, y: ctx.y, size, font, color: INK });
    ctx.y -= 13;
  }
}

async function drawField(ctx: Ctx, label: string, value: string) {
  await ensureSpace(ctx, 28);
  ctx.page.drawText(label.toUpperCase(), {
    x: M,
    y: ctx.y,
    size: 7,
    font: ctx.font,
    color: STEEL,
  });
  ctx.y -= 12;
  const display = value.trim() || "—";
  const lines = wrap(ctx.font, display, 10, W - M * 2);
  for (const line of lines) {
    await ensureSpace(ctx, 14);
    ctx.page.drawText(line, {
      x: M,
      y: ctx.y,
      size: 10,
      font: ctx.font,
      color: INK,
    });
    ctx.y -= 13;
  }
  ctx.y -= 4;
}

async function drawInspection(ctx: Ctx, rows: InspectionRow[]) {
  await ensureSpace(ctx, 36);
  const cols = [M, M + 220, M + 268, M + 316, M + 364];
  const headers = ["ITEM", "PASS", "FAIL", "N/A", "COMMENTS"];
  headers.forEach((h, i) => {
    ctx.page.drawText(h, {
      x: cols[i],
      y: ctx.y,
      size: 7,
      font: ctx.bold,
      color: STEEL,
    });
  });
  ctx.y -= 8;
  ctx.page.drawLine({
    start: { x: M, y: ctx.y },
    end: { x: W - M, y: ctx.y },
    thickness: 0.6,
    color: INK,
  });
  ctx.y -= 14;
  for (const row of rows) {
    await ensureSpace(ctx, 16);
    const item = wrap(ctx.font, row.item || "—", 8, 210)[0];
    ctx.page.drawText(item, { x: cols[0], y: ctx.y, size: 8, font: ctx.font, color: INK });
    ctx.page.drawText(row.result === "pass" ? "X" : "", { x: cols[1] + 8, y: ctx.y, size: 8, font: ctx.bold, color: INK });
    ctx.page.drawText(row.result === "fail" ? "X" : "", { x: cols[2] + 8, y: ctx.y, size: 8, font: ctx.bold, color: CROWN });
    ctx.page.drawText(row.result === "na" ? "X" : "", { x: cols[3] + 8, y: ctx.y, size: 8, font: ctx.bold, color: INK });
    const c = wrap(ctx.font, row.comments || "", 8, 150)[0] ?? "";
    ctx.page.drawText(c, { x: cols[4], y: ctx.y, size: 8, font: ctx.font, color: INK });
    ctx.y -= 14;
  }
  ctx.y -= 6;
}

async function embedPng(ctx: Ctx, dataUrl: string, maxW = 220, maxH = 90) {
  const m = dataUrl.match(/^data:image\/(png|jpe?g);base64,(.+)$/i);
  if (!m) return;
  const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
  const img =
    m[1].toLowerCase().startsWith("jp")
      ? await ctx.doc.embedJpg(bytes)
      : await ctx.doc.embedPng(bytes);
  const scale = Math.min(maxW / img.width, maxH / img.height, 1);
  const w = img.width * scale;
  const h = img.height * scale;
  await ensureSpace(ctx, h + 8);
  ctx.page.drawImage(img, { x: M, y: ctx.y - h, width: w, height: h });
  ctx.y -= h + 10;
}

async function drawBlock(
  ctx: Ctx,
  block: SafetyBlock,
  values: FormValues
) {
  await ensureSpace(ctx, 28);
  ctx.page.drawText(block.title.toUpperCase(), {
    x: M,
    y: ctx.y,
    size: 10,
    font: ctx.bold,
    color: CROWN,
  });
  ctx.y -= 6;
  ctx.page.drawLine({
    start: { x: M, y: ctx.y },
    end: { x: W - M, y: ctx.y },
    thickness: 0.8,
    color: INK,
  });
  ctx.y -= 16;

  for (const field of block.fields) {
    if (field.type === "signature" || field.type === "photo") continue;
    await drawField(ctx, field.label, fieldText(values, field.id));
  }

  if (block.type === "inspection") {
    const rows =
      values.inspection[block.id] ??
      (block.inspectionItems ?? []).map((item, i) => ({
        id: `${block.id}-r${i}`,
        item,
        result: "" as const,
        comments: "",
      }));
    await drawInspection(ctx, rows);
  }

  if (block.type === "signature") {
    const sig = values.signatures[block.id];
    if (sig?.dataUrl) await embedPng(ctx, sig.dataUrl, 200, 70);
    else if (sig?.typed) {
      await ensureSpace(ctx, 28);
      ctx.page.drawText(sig.typed, {
        x: M,
        y: ctx.y,
        size: 16,
        font: ctx.bold,
        color: INK,
      });
      ctx.y -= 20;
    }
    await drawField(ctx, "Printed name", sig?.printed ?? "");
    await drawField(ctx, "Date", sig?.date ?? "");
  }

  if (block.type === "photo") {
    const photos = values.photos[block.id] ?? [];
    for (const p of photos) {
      await drawParagraph(ctx, p.name, 8);
      await embedPng(ctx, p.dataUrl, 280, 180);
    }
    if (!photos.length) await drawField(ctx, "Photo", "");
  }
}

export async function formToPdf(
  form: FormDef,
  values: FormValues,
  issuer?: Issuer,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([W, H]);
  const completed =
    Object.values(values.signatures)[0]?.printed ||
    (values.fields[
      form.blocks.find((b) => b.type === "worker")?.fields.find((f) => f.key === "name")
        ?.id ?? ""
    ] as string) ||
    "";

  const ctx: Ctx = { doc, page, font, bold, y: H - M, pages: [page] };
  drawHeader(ctx, form, completed, issuer);

  if (issuer?.logoDataUrl) {
    await embedPng(ctx, issuer.logoDataUrl, 120, 36);
  }

  if (form.description) {
    await drawParagraph(ctx, form.description, 9);
    ctx.y -= 6;
  }

  for (const block of form.blocks) {
    await drawBlock(ctx, block, values);
    ctx.y -= 8;
  }

  const n = ctx.pages.length;
  ctx.pages.forEach((p, i) => drawFooter(p, font, i + 1, n));
  return doc.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
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

export function pdfFilename(form: FormDef) {
  const day = new Date().toISOString().slice(0, 10);
  const slug = form.title.replace(/[^A-Z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return `PROVEN-${slug}-${day}.pdf`;
}
