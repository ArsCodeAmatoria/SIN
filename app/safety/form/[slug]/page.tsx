import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafetyControlStamp } from "@/components/SafetyControl";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { RelatedWork } from "@/components/RelatedWork";
import { FORMS, getForm } from "@/lib/ohs";
import { governedBy } from "@/lib/ohs/relations";
import type { DocLink } from "@/lib/ohs/types";
import { getTemplate } from "@/lib/form-builder/templates";
import { pageMeta, provenTitle } from "@/lib/seo";

const TEMPLATE_ALIAS: Record<string, string> = {
  "rigging-inspection-form": "rigging-inspection",
  "near-miss-report": "near-miss",
  "first-aid-report": "first-aid",
  "crane-operator-log": "crane-op-log",
  "critical-lift-plan": "critical-lift",
  "workplace-inspection": "site-inspection",
  "rigging-equipment-inspection": "rigging-inspection",
};

function templateFor(slug: string) {
  return getTemplate(slug) ?? getTemplate(TEMPLATE_ALIAS[slug] ?? "");
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FORMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getForm(slug);
  if (!doc) return pageMeta({ title: "Form", description: "Safety form.", path: "/safety" });
  return pageMeta({
    title: provenTitle(doc.number, doc.title),
    description: doc.summary,
    path: `/safety/form/${slug}`,
  });
}

function FormCta({ link }: { link: DocLink }) {
  if (link.external || /^https?:\/\//i.test(link.href)) {
    return (
      <p className="doc-cta">
        <a href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      </p>
    );
  }
  if (link.href.startsWith("/")) {
    return (
      <p className="doc-cta">
        <Link href={link.href}>{link.label}</Link>
      </p>
    );
  }
  return (
    <p className="doc-cta">
      <a href={link.href} download>
        {link.label}
      </a>
    </p>
  );
}

export default async function FormPage({ params }: Props) {
  const { slug } = await params;
  const doc = getForm(slug);
  if (!doc) notFound();
  const template = templateFor(slug);
  const ctas: DocLink[] = [];
  if (doc.download) ctas.push(doc.download);
  else if (template) {
    ctas.push({
      href: `/safety/builder/${template.id}`,
      label: "FILL THIS FORM — DOWNLOAD PDF →",
    });
  }
  if (template && doc.download && !doc.download.href.includes("/safety/builder/")) {
    ctas.push({
      href: `/safety/builder/${template.id}`,
      label: "FILL THIS FORM — DOWNLOAD PDF →",
    });
  }
  for (const link of doc.links ?? []) ctas.push(link);

  return (
    <SafetyDocFrame
      kicker={`${doc.group.toUpperCase()} FORM`}
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/safety-forms"
      backLabel="SAFETY FORMS"
    >
      <div className="prose">
        <SafetyControlStamp number={doc.number} title={doc.title} />
        <RelatedWork governed={governedBy(`form/${slug}`)} />
        {ctas.map((link) => (
          <FormCta key={link.href + link.label} link={link} />
        ))}
        {doc.download?.note ? <p>{doc.download.note}</p> : null}
        {(doc.links ?? [])
          .filter((link) => link.note)
          .map((link) => (
            <p key={link.href}>{link.note}</p>
          ))}
        <h2>WHEN</h2>
        <p>{doc.when}</p>
        <h2>CAPTURE</h2>
        <ul className="bullets">
          {doc.fields.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>ROUTING</h2>
        <p>{doc.routing}</p>
      </div>
    </SafetyDocFrame>
  );
}
