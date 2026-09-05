import type { Metadata } from "next";
import { REDMC } from "@/lib/redmc/bank";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Load Charts",
  description: REDMC.description,
  path: "/redmc/load-charts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
