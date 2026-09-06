import type { Metadata } from "next";
import { BuilderIndex } from "@/components/form-builder/BuilderIndex";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Crane Safety Form Builder | FLHA, Lift Plans & Inspections — sin()",
  description:
    "Build crane and rigging field forms — FLHAs, lift plans, pre-use inspections, toolbox talks and incident reports. Fill, PDF, download.",
  path: "/safety/builder",
});

export default function BuilderPage() {
  return <BuilderIndex />;
}
