"use client";

import { usePathname } from "next/navigation";
import { Footer, SiteColophon } from "@/components/Footer";
import { footerKind } from "@/lib/chrome";

export function SiteFooter() {
  const kind = footerKind(usePathname());
  if (kind === "none") return null;
  if (kind === "colophon") return <SiteColophon />;
  return <Footer marks={kind === "full"} />;
}
