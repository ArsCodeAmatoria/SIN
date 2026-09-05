import Link from "next/link";
import { absUrl, breadcrumbLd, jsonLdGraph, organizationLd, websiteLd } from "@/lib/seo";
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

export function SeoLandingPage({ page }: { page: SeoLanding }) {
  const crumbs = [
    { name: SITE.name, path: "/" },
    { name: page.kicker, path: `/${page.slug}` },
  ];
  const schema = jsonLdGraph([
    organizationLd(),
    websiteLd(),
    breadcrumbLd(crumbs),
    {
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: absUrl(`/${page.slug}`),
      isPartOf: { "@id": `${absUrl("/")}#website` },
    },
    {
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ]);

  return (
    <div className="wrap">
      <JsonLd data={schema} />
      <header className="page-hero">
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
          <Link className="btn btn-ghost" href="/safety">
            Read {SITE.system}
          </Link>
        </div>
      </header>
      {page.sections.map((section) => (
        <section className="section" key={section.heading}>
          <h2 className="display">{section.heading}</h2>
          <p className="lede mt">{section.body}</p>
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
