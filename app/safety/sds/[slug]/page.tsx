import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafetyControlStamp } from "@/components/SafetyControl";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { SDS, getSds } from "@/lib/ohs";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SDS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getSds(slug);
  if (!doc) return pageMeta({ title: "SDS", description: "Safety data sheet.", path: "/safety" });
  return pageMeta({
    title: `${doc.number} ${doc.title}`,
    description: doc.use,
    path: `/safety/sds/${slug}`,
  });
}

export default async function SdsPage({ params }: Props) {
  const { slug } = await params;
  const doc = getSds(slug);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="SDS"
      num={doc.number.replace("GOSPEL-", "")}
      title={doc.title}
      intro={doc.use}
      backHref="/safety/whmis-sds"
      backLabel="WHMIS + SDS"
    >
      <div className="prose">
        <SafetyControlStamp number={doc.number} title={doc.title} />
        <h2>HAZARDS</h2>
        <ul className="bullets">
          {doc.hazards.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>PPE</h2>
        <ul className="bullets">
          {doc.ppe.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2>SPILL</h2>
        <p>{doc.spill}</p>
        <h2>FIRST AID</h2>
        <p>{doc.firstAid}</p>
        <h2>STORAGE</h2>
        <p>{doc.storage}</p>
        <p>
          This is a field card for the lift. The manufacturer SDS for the
          exact product on site wins if it is stricter or more specific.
        </p>
      </div>
    </SafetyDocFrame>
  );
}
