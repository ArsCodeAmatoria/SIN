import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Review",
  description: "Browse the REDMC question bank with answers, sources and exam tags.",
  path: "/redmc/test/review",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
