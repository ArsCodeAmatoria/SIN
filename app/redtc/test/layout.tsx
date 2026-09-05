import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Practice",
  description:
    "Practice papers for Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and load-chart rigging.",
  path: "/redtc/test",
});

export default function RedtcTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
