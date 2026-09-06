import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/SeoLanding";
import { absUrl, breadcrumbLd, jsonLdGraph, organizationLd, ORIGIN, pageMeta, personLd, websiteLd } from "@/lib/seo";
import { AUTHOR, SITE } from "@/lib/site";
import { WIRE } from "@/lib/whoopwire";

export const metadata: Metadata = pageMeta({
  title: "About the Author — Crane & Rigging Safety in BC | sin()",
  description: AUTHOR.bio,
  path: AUTHOR.path,
});

export default function AboutPage() {
  const schema = jsonLdGraph([
    organizationLd(),
    websiteLd(),
    personLd(),
    breadcrumbLd([
      { name: SITE.name, path: "/" },
      { name: "About", path: AUTHOR.path },
    ]),
    {
      "@type": "AboutPage",
      name: "About the author",
      url: absUrl(AUTHOR.path),
      description: AUTHOR.bio,
      mainEntity: { "@id": `${ORIGIN}/about#author` },
    },
  ]);

  return (
    <div className="wrap">
      <JsonLd data={schema} />
      <header className="page-hero">
        <p className="mono kicker">ABOUT THE AUTHOR</p>
        <h1 className="wire-topic">{AUTHOR.name} — Crane &amp; Rigging Safety</h1>
        <p className="display giant" aria-hidden="true">
          WHO WRITES
          <br />
          THIS.
        </p>
        <p className="lede-lg mt-2">{AUTHOR.bio}</p>
        <p className="lede mt">{AUTHOR.work}</p>
      </header>
      <section className="section">
        <h2 className="display">How sources are used</h2>
        <p className="lede mt">{AUTHOR.process}</p>
      </section>
      <section className="section">
        <h2 className="display">What this site is</h2>
        <p className="lede mt">
          {SITE.name} is public crane and rigging information for British
          Columbia. REDTC and REDMC are exam practice. {SITE.system} is the
          written safety program. {WIRE.name} is the writing. None of it is a
          substitute for the manufacturer’s document, the site plan, or the
          law.
        </p>
      </section>
      <section className="section">
        <h2 className="display">What this is not</h2>
        <p className="lede mt">
          Exam practice is not the sitting. Proven is not a regulator. Articles
          are training material. WorkSafeBC, BC Crane Safety, SkilledTradesBC,
          the manufacturer’s document for the serial crane, and the site plan
          remain the authority. If they disagree with this site, they win.
        </p>
      </section>
      <section className="section">
        <h2 className="display">Corrections</h2>
        <p className="lede mt">
          If a regulation citation, hour count, or chart reference is wrong,
          write {SITE.email}. Name the page. Technical pages are dated. When
          the source changes, the page should show when it was last reviewed.
        </p>
      </section>
      <div className="inline-cta">
        <Link className="btn btn-solid" href="/redtc" title="Tower Crane Red Seal practice tests">
          Tower Crane Red Seal practice
        </Link>
        <Link className="btn btn-ghost" href="/redmc" title="Mobile Crane Red Seal practice tests">
          Mobile Crane Red Seal practice
        </Link>
        <Link className="btn btn-ghost" href="/safety" title="Crane safety program and procedures">
          {SITE.system}
        </Link>
        <a className="btn btn-ghost" href={SITE.emailHref}>
          {SITE.email}
        </a>
      </div>
    </div>
  );
}
