import type { Metadata } from "next";
import { REDMC } from "@/lib/redmc/bank";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "REDMC",
  description: REDMC.description,
  path: "/redmc",
});

export default function RedmcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
