import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { SwpDoc } from "@/components/SwpDoc";
import { SWPS, getSwp } from "@/lib/ohs";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SWPS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getSwp(slug);
  if (!doc) return pageMeta({ title: "SWP", description: "Safe work procedure.", path: "/safety" });
  return pageMeta({
    title: `${doc.number} ${doc.title}`,
    description: doc.summary,
    path: `/safety/swp/${slug}`,
  });
}

export default async function SwpPage({ params }: Props) {
  const { slug } = await params;
  const doc = getSwp(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="SAFE WORK PROCEDURE"
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/swp-library"
      backLabel="SWP LIBRARY"
    >
      <SwpDoc doc={doc} />
    </SafetyDocFrame>
  );
}
