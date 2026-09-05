import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { SjpDoc } from "@/components/SjpDoc";
import { SJPS, getSjp } from "@/lib/ohs";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SJPS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getSjp(slug);
  if (!doc) return pageMeta({ title: "SJP", description: "Site-specific job procedure.", path: "/safety" });
  return pageMeta({
    title: `${doc.number} ${doc.title}`,
    description: doc.summary,
    path: `/safety/sjp/${slug}`,
  });
}

export default async function SjpPage({ params }: Props) {
  const { slug } = await params;
  const doc = getSjp(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="SAFE JOB PROCEDURE"
      num={doc.number.replace("GOSPEL-", "")}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/sjp-library"
      backLabel="SJP LIBRARY"
    >
      <SjpDoc doc={doc} />
    </SafetyDocFrame>
  );
}
