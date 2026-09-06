import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "REDTC Practice Room — Level B, Level 1, Level 2, Red Seal",
  description:
    "The REDTC practice room: papers for Fulford Level B, SkilledTradesBC Level 1 and 2, Red Seal IP, and load-chart rigging. 70% to pass.",
  path: "/redtc/test",
});

export default function RedtcTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
