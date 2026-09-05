import type { Metadata } from "next";
import { allQuestions, CHARTS } from "@/lib/redtc/bank";
import { pageMeta } from "@/lib/seo";

const questions = allQuestions().length;
const charts = CHARTS.length;

export const metadata: Metadata = pageMeta({
  title: `Tower Crane Red Seal Practice Test BC – ${questions.toLocaleString("en-CA")} Questions | REDTC`,
  description: `Free BC Tower Crane Operator exam practice with ${questions.toLocaleString("en-CA")} questions, Red Seal prep, Level B, Level 1 & 2 and ${charts} manufacturer load charts.`,
  path: "/redtc",
});

export default function RedtcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
