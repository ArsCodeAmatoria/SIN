import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Tower Crane Red Seal Master Exam BC – 100 Questions | REDTC",
  description:
    "Closed-book 100-question simulation of the Tower Crane Operator Interprovincial exam (2023 RSOS). 70% to pass.",
  path: "/redtc/test/master",
});

export default function RedtcMasterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
