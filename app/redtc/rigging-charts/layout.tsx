import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Rigging Chart Practice – Chain, Web, Wire Rope | REDTC",
  description:
    "BCACS Crane Core sling charts for tower-crane training and assessment: Grade T chain, nylon web and 6×19 IWRC wire rope. Same lookup skill as Fulford LCR.",
  path: "/redtc/rigging-charts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
