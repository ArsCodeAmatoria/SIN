import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Mobile Crane Question Bank BC | REDMC",
  description: "Browse the REDMC mobile crane question bank with answers, sources and exam tags.",
  path: "/redmc/test/review",
  index: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
