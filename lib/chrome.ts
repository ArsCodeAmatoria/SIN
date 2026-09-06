export type FooterKind = "full" | "slim" | "colophon" | "none";

function isExamDesk(path: string) {
  return (
    path.startsWith("/redtc/test") ||
    path.startsWith("/redtc/load-charts") ||
    path.startsWith("/redtc/rigging-charts")
  );
}

/** Brand footer on home and editorial. One-line colophon on desks. Nothing on Proven. */
export function footerKind(path: string): FooterKind {
  if (path === "/safety" || path.startsWith("/safety/")) return "none";
  if (path === "/sling" || path.startsWith("/sling/")) return "colophon";
  if (isExamDesk(path)) return "colophon";
  if (path === "/" || path === "/about") return "full";
  return "slim";
}
