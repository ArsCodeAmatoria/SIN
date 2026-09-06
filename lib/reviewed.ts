export const LAST_REVIEWED = "2026-09-05";

export function formatReviewed(iso = LAST_REVIEWED): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
