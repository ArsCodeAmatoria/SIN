import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WireBlocks } from "@/components/WireBlocks";
import { WireFigure } from "@/components/WireFigure";
import { WireFeed } from "@/components/WireFeed";
import { WireShare } from "@/components/WireShare";
import { WireStoryLink } from "@/components/WireStoryLink";
import { WireSubscribe } from "@/components/WireSubscribe";
import { ProvenName } from "@/components/ProvenMark";
import { JsonLd } from "@/components/SeoLanding";
import { getSafety } from "@/lib/safety";
import { absUrl, breadcrumbLd, jsonLdGraph, organizationLd, pageMeta, personLd, websiteLd } from "@/lib/seo";
import { AUTHOR, SITE } from "@/lib/site";
import {
  WIRE,
  formatWireDate,
  getArticle,
  getArticles,
  getRelated,
  readingMinutes,
  summarize,
  wirePath,
  wordCount,
} from "@/lib/whoopwire";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return pageMeta({
      title: WIRE.name,
      description: WIRE.dek,
      path: wirePath(),
    });
  }
  const path = wirePath(article.slug);
  return pageMeta({
    title: `${article.seoTitle} | ${SITE.name}`,
    description: article.seoDescription,
    path,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
    authors: [AUTHOR.name],
    section: article.category,
    images: article.image
      ? [{ url: article.image, alt: article.imageAlt ?? article.title }]
      : undefined,
  });
}

export default async function WireArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const minutes = readingMinutes(article);
  const related = getRelated(article).map(summarize);
  const safety = article.safety
    .map((item) => getSafety(item))
    .filter((item): item is NonNullable<ReturnType<typeof getSafety>> => Boolean(item));
  const url = absUrl(wirePath(article.slug));
  const jsonLd = jsonLdGraph([
    organizationLd(),
    websiteLd(),
    personLd(),
    breadcrumbLd([
      { name: SITE.name, path: "/" },
      { name: WIRE.name, path: wirePath() },
      { name: article.seoTitle, path: wirePath(article.slug) },
    ]),
    {
      "@type": "Article",
      headline: article.seoTitle,
      alternativeHeadline: article.title,
      description: article.seoDescription,
      datePublished: article.published,
      dateModified: article.updated ?? article.published,
      author: { "@id": `${absUrl(AUTHOR.path)}#author` },
      publisher: { "@id": `${absUrl("/")}#org` },
      mainEntityOfPage: url,
      articleSection: article.category,
      image: article.image ? absUrl(article.image) : absUrl("/og.png"),
      wordCount: wordCount(article),
      inLanguage: "en-CA",
    },
  ]);

  return (
    <article className="wire-article wrap">
      <JsonLd data={jsonLd} />
      <header className="wire-article-head">
        <p className="mono kicker">
          <Link href={wirePath()}>{WIRE.name}</Link>
          <span> / {article.category}</span>
        </p>
        <h1 className="wire-topic">{article.seoTitle}</h1>
        <p className="display giant" aria-hidden="true">
          {article.titleLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <p className="lede-lg mt">{article.excerpt}</p>
        <p className="mono steel mt">
          <Link href={AUTHOR.path}>{article.author}</Link>
          <span> · {formatWireDate(article.published)}</span>
          {article.updated ? (
            <span> · UPDATED {formatWireDate(article.updated)}</span>
          ) : null}
          <span> · {minutes} MIN</span>
        </p>
        <WireShare title={article.seoTitle} url={url} />
      </header>

      {article.image ? (
        <WireFigure
          src={article.image}
          alt={article.imageAlt ?? article.title}
          lead
          contain={article.imageContain}
          lightbox={article.imageContain}
        />
      ) : null}

      <WireBlocks blocks={article.blocks} />

      {safety.length ? (
        <aside className="wire-safety">
          <p className="mono steel">
            <ProvenName />
          </p>
          <Link className="btn btn-solid" href="/safety">
            READ {SITE.system} →
          </Link>
          <div className="wire-safety-links">
            {safety.map((section) => (
              <Link key={section.slug} href={`/safety/${section.slug}`}>
                <span className="mono steel">{section.num}</span>
                <strong className="display">{section.title}</strong>
              </Link>
            ))}
          </div>
        </aside>
      ) : (
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/safety">
            READ {SITE.system} →
          </Link>
        </div>
      )}

      <WireFeed slug={article.slug} />

      {related.length ? (
        <section className="wire-related">
          <p className="mono kicker">MORE FROM {WIRE.name}</p>
          <div className="wire-stack">
            {related.map((story) => (
              <WireStoryLink key={story.slug} story={story} />
            ))}
          </div>
        </section>
      ) : null}

      <nav className="pager">
        <Link href={wirePath()}>
          <span className="mono steel">{WIRE.name}</span>
          <strong className="display">ALL STORIES</strong>
        </Link>
        <Link href="/safety">
          <span className="mono steel">NEXT</span>
          <strong className="display">READ PROVEN</strong>
        </Link>
      </nav>

      <WireSubscribe compact />
    </article>
  );
}
