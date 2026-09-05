import type { Metadata } from "next";
import { allQuestions } from "@/lib/redmc/bank";
import { pageMeta } from "@/lib/seo";

const questions = allQuestions().length;

export const metadata: Metadata = pageMeta({
  title: "Mobile Crane Red Seal Practice Test BC | REDMC",
  description: `Free BC Mobile Crane Operator and Red Seal exam practice covering load charts, rigging, calculations, crane setup, outriggers and WorkSafeBC regulations. ${questions.toLocaleString("en-CA")} questions in the bank.`,
  path: "/redmc",
});

export default function RedmcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
