import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Master exam",
  description:
    "Closed-book simulation of the Mobile Crane Operator Interprovincial exam.",
  path: "/redmc/test/master",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
