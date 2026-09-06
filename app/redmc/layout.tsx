import type { Metadata } from "next";
import { allQuestions } from "@/lib/redmc/bank";
import { pageMeta } from "@/lib/seo";

const questions = allQuestions().length;

export const metadata: Metadata = pageMeta({
  title: "Mobile Crane Red Seal Practice Test BC | REDMC",
  description: `Free BC Mobile Crane Operator practice. Current practice bank: ${questions.toLocaleString("en-CA")} items — not the official 110-question Red Seal paper. Load charts, rigging, calculations, crane setup, outriggers and WorkSafeBC.`,
  path: "/redmc",
});

export default function RedmcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
