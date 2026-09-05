import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Load Charts",
  description:
    "Practice reading manufacturer tower crane load charts — Liebherr, Potain, WOLFF, Terex, Krøll, Pecco.",
  path: "/redtc/load-charts",
});

export default function RedtcChartsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
