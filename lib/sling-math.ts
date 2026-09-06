/** Two-leg bridle. θ from the horizontal. Same numbers as the Wire desks. */

export function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

export function sinDeg(deg: number) {
  return Math.sin((deg * Math.PI) / 180);
}

export type AngleFromTape =
  | { ok: false; reason: "invalid" | "impossible" }
  | { ok: true; ratio: number; theta: number; low: boolean };

export function slingAngleFromHL(height: number, length: number): AngleFromTape {
  if (!Number.isFinite(height) || height <= 0) return { ok: false, reason: "invalid" };
  if (!Number.isFinite(length) || length <= 0) return { ok: false, reason: "invalid" };
  if (height > length) return { ok: false, reason: "impossible" };
  const ratio = height / length;
  const theta = toDeg(Math.asin(ratio));
  return { ok: true, ratio, theta, low: theta < 30 };
}

export type TwoLegTension =
  | { ok: false }
  | { ok: true; sin: number; factor: number; tension: number; low: boolean };

export function twoLegTension(load: number, theta: number): TwoLegTension {
  if (!Number.isFinite(load) || load <= 0) return { ok: false };
  if (!Number.isFinite(theta) || theta <= 0 || theta > 90) return { ok: false };
  const s = sinDeg(theta);
  if (s <= 0) return { ok: false };
  return {
    ok: true,
    sin: s,
    factor: 1 / s,
    tension: load / (2 * s),
    low: theta < 30,
  };
}

export type WllCompare =
  | { ok: false }
  | { ok: true; fit: boolean; ratio: number };

export function compareWll(tension: number, wll: number): WllCompare {
  if (!Number.isFinite(tension) || tension <= 0) return { ok: false };
  if (!Number.isFinite(wll) || wll <= 0) return { ok: false };
  return { ok: true, fit: tension <= wll, ratio: tension / wll };
}

export function formatTension(n: number) {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

export const SLING_ANGLE_ROWS = [
  { hl: "0.500", theta: "30°", sin: "0.500", factor: "2.00", t4000: "4000", note: "Floor. Each leg sees W." },
  { hl: "0.707", theta: "45°", sin: "0.707", factor: "1.41", t4000: "2829", note: "Working bridle." },
  { hl: "0.866", theta: "60°", sin: "0.866", factor: "1.15", t4000: "2309", note: "Steep. Lower tension." },
  { hl: "0.966", theta: "75°", sin: "0.966", factor: "1.04", t4000: "2071", note: "Almost vertical." },
  { hl: "1.000", theta: "90°", sin: "1.000", factor: "1.00", t4000: "2000", note: "Vertical hitch. No spread." },
] as const;
