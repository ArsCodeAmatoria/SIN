import type { Metadata } from "next";
import { REDTC } from "@/lib/redtc/bank";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "REDTC",
  description: REDTC.description,
  path: "/redtc",
});

export default function RedtcLayout({ children }: { children: React.ReactNode }) {
  return <div className="redtc">{children}</div>;
}
