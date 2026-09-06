import { encode } from "uqr";
import { rgb, type PDFPage } from "pdf-lib";

const INK = rgb(16 / 255, 16 / 255, 16 / 255);
const PAPER = rgb(1, 1, 1);

/** Draw a QR code onto a PDF page. `x, y` is the lower-left corner, PDF space. */
export function drawQr(page: PDFPage, value: string, x: number, y: number, size: number) {
  const { data, size: modules } = encode(value, { ecc: "M", border: 2 });
  const cell = size / modules;
  page.drawRectangle({ x, y, width: size, height: size, color: PAPER });
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (!data[row][col]) continue;
      page.drawRectangle({
        x: x + col * cell,
        y: y + (modules - 1 - row) * cell,
        width: cell + 0.15,
        height: cell + 0.15,
        color: INK,
      });
    }
  }
}
