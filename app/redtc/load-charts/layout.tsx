import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tower Crane Load Chart Practice – 14 Manufacturer PDFs | REDTC",
  description:
    "Practice reading manufacturer tower crane load charts — Liebherr, Potain, WOLFF, Terex, Krøll, Pecco. Never interpolate.",
  path: "/redtc/load-charts",
});

export default function RedtcChartsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
