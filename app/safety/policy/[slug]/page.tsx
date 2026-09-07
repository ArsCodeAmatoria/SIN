import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyIssue } from "@/components/PolicyIssue";
import { SafetyControlStamp } from "@/components/SafetyControl";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { RelatedWork } from "@/components/RelatedWork";
import { POLICIES, getPolicy } from "@/lib/ohs";
import { governedBy } from "@/lib/ohs/relations";
import { pageMeta, provenTitle } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POLICIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPolicy(slug);
  if (!doc) return pageMeta({ title: "Policy", description: "OH&S policy.", path: "/safety" });
  return pageMeta({
    title: provenTitle(doc.number, doc.title),
    description: doc.summary,
    path: `/safety/policy/${slug}`,
  });
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const doc = getPolicy(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="OH&S POLICY"
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/ohs-policies"
      backLabel="OH&S POLICIES"
    >
      <div className="prose">
        <SafetyControlStamp number={doc.number} title={doc.title} />
        <RelatedWork governed={governedBy(`policy/${slug}`)} />
        {doc.download ? (
          <p className="doc-cta">
            {doc.download.external ? (
              <a href={doc.download.href} target="_blank" rel="noreferrer">
                {doc.download.label}
              </a>
            ) : (
              <a href={doc.download.href} download>
                {doc.download.label}
              </a>
            )}
          </p>
        ) : null}
        {doc.download?.note ? <p>{doc.download.note}</p> : null}
        <div className="rules">
          {doc.statements.map((item) => (
            <article className="rule" key={item.title}>
              <h3 className="display">{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <PolicyIssue policy={doc} />
      </div>
    </SafetyDocFrame>
  );
}
