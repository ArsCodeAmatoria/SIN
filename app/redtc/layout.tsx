import type { Metadata } from "next";
import { allQuestions } from "@/lib/redtc/bank";
import { pageMeta } from "@/lib/seo";

const questions = allQuestions().length;

export const metadata: Metadata = pageMeta({
  title: `Tower Crane Red Seal Practice Test BC – ${questions.toLocaleString("en-CA")} Questions | REDTC`,
  description: `Free Tower Crane Red Seal exam practice for B.C. with ${questions.toLocaleString("en-CA")} questions, Fulford Level B, SkilledTradesBC Level 1 & 2, manufacturer load charts, and BCACS sling charts.`,
  path: "/redtc",
});

export default function RedtcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
