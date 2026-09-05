import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tower Crane Practice Test BC – Level B, Level 1, Level 2, Red Seal | REDTC",
  description:
    "Practice papers for Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and load-chart rigging. 70% to pass.",
  path: "/redtc/test",
});

export default function RedtcTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
