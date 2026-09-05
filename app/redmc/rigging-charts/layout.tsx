import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Rigging Chart Practice – Chain, Web, Wire Rope | REDMC",
  description:
    "BCACS Crane Core sling charts for training and assessment: Grade T chain, nylon web and 6×19 IWRC wire rope. Not a field rating.",
  path: "/redmc/rigging-charts",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
