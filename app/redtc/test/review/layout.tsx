import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tower Crane Question Bank BC | REDTC",
  description: "Browse the REDTC tower crane question bank with answers, sources and exam tags for Level B, Level 1, Level 2 and Red Seal.",
  path: "/redtc/test/review",
});

export default function RedtcReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
