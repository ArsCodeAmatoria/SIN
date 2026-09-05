import type { Metadata } from "next";
import { BuilderIndex } from "@/components/form-builder/BuilderIndex";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Form Builder",
  description:
    "Assemble crane and rigging forms from reusable Safety Blocks. Fill, PDF, download.",
  path: "/safety/builder",
});

export default function BuilderPage() {
  return <BuilderIndex />;
}
