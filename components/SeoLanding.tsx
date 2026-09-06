import Link from "next/link";
import { absUrl, breadcrumbLd, faqPageLd, jsonLdGraph, organizationLd, ORIGIN, websiteLd } from "@/lib/seo";
import type { SeoLanding } from "@/lib/seo-landings";
import { SITE } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path?: string }[];
}) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items
          .filter((item, index) => item.path || index === items.length - 1)
          .map((item, index, listed) => {
            const last = index === listed.length - 1;
            return (
              <li key={`${item.name}-${index}`}>
                {!last && item.path ? (
                  <Link href={item.path}>{item.name}</Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{item.name}</span>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}

export function SeoLandingPage({ page }: { page: SeoLanding }) {
  const url = absUrl(`/${page.slug}`);
  const crumbs = [
    { name: SITE.name, path: "/" },
    { name: page.cluster.name, path: page.cluster.path },
    { name: page.crumb, path: `/${page.slug}` },
  ];
  const webpage: Record<string, unknown> = {
    "@type": page.kind === "practice" ? ["WebPage", "LearningResource"] : "WebPage",
    "@id": `${url}#webpage`,
    name: page.title,
    description: page.description,
    url,
    isPartOf: { "@id": `${ORIGIN}/#website` },
    inLanguage: "en-CA",
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };
  if (page.kind === "practice") {
    webpage.learningResourceType = "Practice test";
    webpage.educationalLevel = "Trade certification";
    webpage.audience = {
      "@type": "EducationalAudience",
      educationalRole: "crane operator candidate",
    };
  }
  const faq = faqPageLd(url, page.faq);
  if (faq) webpage.mainEntity = { "@id": `${url}#faq` };
  const schema = jsonLdGraph([
    organizationLd(),
    websiteLd(),
    { ...breadcrumbLd(crumbs), "@id": `${url}#breadcrumb` },
    webpage,
    ...(faq ? [faq] : []),
  ]);

  return (
    <div className="wrap">
      <JsonLd data={schema} />
      <header className="page-hero">
        <Breadcrumbs items={crumbs} />
        <p className="mono kicker">{page.kicker}</p>
        <h1 className="display giant">
          {page.h1.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="lede-lg mt-2">{page.lede}</p>
        <div className="place mt-2">
          {page.facts.map((fact) => (
            <article key={fact.label}>
              <span className="mono steel">{fact.label}</span>
              <h2 className="display">{fact.value}</h2>
              <p>{fact.note}</p>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <Link className="btn btn-solid" href={page.practiceHref}>
            {page.practiceLabel}
          </Link>
          <Link className="btn btn-ghost" href="/safety" title="Crane safety program and procedures">
            Crane safety program
          </Link>
        </div>
      </header>
      {page.sections.map((section) => (
        <section className="section" key={section.heading}>
          <h2 className="display">{section.heading}</h2>
          <p className="lede mt">{section.body}</p>
          {section.list?.length ? (
            <ul className="std-list mt">
              {section.list.map((item) => (
                <li key={item}>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <section className="section">
        <p className="mono kicker">Questions people ask</p>
        <ul className="std-list mt-2">
          {page.faq.map((item) => (
            <li key={item.q}>
              <h2 className="display">{item.q}</h2>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <p className="mono kicker">Also on this site</p>
        <nav className="safety-index mt" aria-label="Related pages">
          {page.related.map((item) => (
            <Link href={item.href} key={item.href}>
              <span className="mono steel">→</span>
              <span>
                <strong>{item.label}</strong>
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
