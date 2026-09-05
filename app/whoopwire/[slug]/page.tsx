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
import { getSafety } from "@/lib/safety";
import { absUrl, pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  WIRE,
  formatWireDate,
  getArticle,
  getArticles,
  getRelated,
  readingMinutes,
  summarize,
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
      path: "/whoopwire",
    });
  }
  const path = `/whoopwire/${article.slug}`;
  return pageMeta({
    title: article.seoTitle,
    description: article.seoDescription,
    path,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
    authors: [SITE.name],
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
  const url = absUrl(`/whoopwire/${article.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: absUrl("/"),
    },
    mainEntityOfPage: url,
    articleSection: article.category,
    image: article.image ? absUrl(article.image) : undefined,
    wordCount: wordCount(article),
  };

  return (
    <article className="wire-article wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="wire-article-head">
        <p className="mono kicker">
          <Link href="/whoopwire">{WIRE.name}</Link>
          <span> / {article.category}</span>
        </p>
        <h1 className="display giant">
          {article.titleLines.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="lede-lg mt">{article.excerpt}</p>
        <p className="mono steel mt">
          {article.author}
          <span> · {formatWireDate(article.published)}</span>
          {article.updated ? (
            <span> · UPDATED {formatWireDate(article.updated)}</span>
          ) : null}
          <span> · {minutes} MIN</span>
        </p>
        <WireShare title={article.title} url={url} />
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
        <Link href="/whoopwire">
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
