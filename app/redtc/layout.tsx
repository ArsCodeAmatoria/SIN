import type { Metadata } from "next";
import { allQuestions } from "@/lib/redtc/bank";
import { pageMeta } from "@/lib/seo";

const questions = allQuestions().length;

export const metadata: Metadata = pageMeta({
  title: `REDTC — Tower Crane Exam Bank BC | ${questions.toLocaleString("en-CA")} Questions`,
  description: `The REDTC practice bank: ${questions.toLocaleString("en-CA")} tagged questions for Fulford Level B, SkilledTradesBC Level 1 & 2, and the Red Seal, plus manufacturer load charts and BCACS sling charts.`,
  path: "/redtc",
});

export default function RedtcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
