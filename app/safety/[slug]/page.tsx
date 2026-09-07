import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { DocBadge } from "@/components/DocBadge";
import { RelatedWork } from "@/components/RelatedWork";
import { SafetyLibraryPanel } from "@/components/SafetyLibraryPanel";
import { ProvenColophon, ProvenName } from "@/components/ProvenMark";
import { LIBRARY_KIND } from "@/lib/ohs/doc";
import { recordsFor } from "@/lib/ohs/relations";
import { SAFETY, getSafety } from "@/lib/safety";
import { pageMeta, provenTitle } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SAFETY.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = getSafety(slug);
  if (!section) return pageMeta({ title: "Proven", description: SITE.description, path: "/safety" });
  return pageMeta({
    title: provenTitle(section.num, section.title),
    description: section.intro,
    path: `/safety/${slug}`,
  });
}

export default async function SafetySectionPage({ params }: Props) {
  const { slug } = await params;
  const section = getSafety(slug);
  if (!section) notFound();

  const index = SAFETY.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? SAFETY[index - 1] : null;
  const next = index < SAFETY.length - 1 ? SAFETY[index + 1] : null;

  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">
          <ProvenName />
        </p>
        {section.library ? <DocBadge kind={LIBRARY_KIND[section.library]} /> : null}
        <div className="num">{section.num}</div>
        <h1 className={`display${section.slug === "crane-binders" ? " binder-title" : ""}`}>
          {section.title}
        </h1>
        <p className="lede mt">{section.intro}</p>
      </header>
      <RelatedWork records={recordsFor(section.slug)} />
      <Blocks blocks={section.blocks} />
      {section.library ? <SafetyLibraryPanel kind={section.library} /> : null}
      <nav className="pager">
        {prev ? (
          <Link href={`/safety/${prev.slug}`}>
            <span className="mono steel">PREV</span>
            <strong className="display">{prev.title}</strong>
          </Link>
        ) : (
          <Link href="/safety">
            <span className="mono steel">INDEX</span>
            <strong className="display">
              <ProvenName />
            </strong>
          </Link>
        )}
        {next ? (
          <Link href={`/safety/${next.slug}`}>
            <span className="mono steel">NEXT</span>
            <strong className="display">{next.title}</strong>
          </Link>
        ) : (
          <Link href="/safety">
            <span className="mono steel">NEXT</span>
            <strong className="display">
              <ProvenName />
            </strong>
          </Link>
        )}
      </nav>
      <ProvenColophon />
    </article>
  );
}
