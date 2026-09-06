import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JhaDoc } from "@/components/JhaDoc";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { JHAS, getJha } from "@/lib/ohs";
import { pageMeta, provenTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return JHAS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getJha(slug);
  if (!doc) return pageMeta({ title: "JHA", description: "Job hazard analysis.", path: "/safety" });
  return pageMeta({
    title: provenTitle(doc.number, doc.title),
    description: doc.summary,
    path: `/safety/jha/${slug}`,
  });
}

export default async function JhaPage({ params }: Props) {
  const { slug } = await params;
  const doc = getJha(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="JOB HAZARD ANALYSIS"
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/jha-library"
      backLabel="JHA LIBRARY"
    >
      <JhaDoc doc={doc} />
    </SafetyDocFrame>
  );
}
