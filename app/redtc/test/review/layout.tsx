import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Review",
  description: "Browse the REDTC question bank with answers, sources and exam tags.",
  path: "/redtc/test/review",
});

export default function RedtcReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
