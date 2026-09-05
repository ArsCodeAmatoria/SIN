import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Mobile Crane Practice Test BC – Provisional, Level 1, Level 3, Red Seal | REDMC",
  description:
    "Practice papers for BC Mobile Crane Operator — provisional, Level 1, Level 3, Red Seal IP, and load charts. 70% to pass.",
  path: "/redmc/test",
});

export default function RedmcTestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
