import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Mobile Crane Red Seal Master Exam BC – 110 Questions | REDMC",
  description:
    "Closed-book simulation of the Mobile Crane Operator Interprovincial exam (2021 RSOS, 110 questions). 70% to pass.",
  path: "/redmc/test/master",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
