import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Master Exam",
  description:
    "Closed-book 100-question simulation of the Tower Crane Operator Interprovincial exam (2023 RSOS).",
  path: "/redtc/test/master",
});

export default function RedtcMasterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
