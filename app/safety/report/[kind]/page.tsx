import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafetyDocFrame } from "@/components/SafetyDocFrame";
import { SafetyReportForm } from "@/components/SafetyReportForm";
import { REPORTS, getReport } from "@/lib/ohs";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ kind: string }> };

export function generateStaticParams() {
  return REPORTS.map((item) => ({ kind: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  const doc = getReport(kind);
  if (!doc) return pageMeta({ title: "Report", description: "Field report.", path: "/safety" });
  return pageMeta({
    title: doc.title,
    description: doc.summary,
    path: `/safety/report/${kind}`,
  });
}

export default async function ReportPage({ params }: Props) {
  const { kind } = await params;
  const doc = getReport(kind);
  if (!doc) notFound();
  return (
    <SafetyDocFrame
      kicker="FIELD REPORT"
      number={doc.number}
      title={doc.title}
      intro={doc.summary}
      backHref="/safety/incident-reporting"
      backLabel="INCIDENT REPORTING"
    >
      <div className="prose">
        <p>
          If people are still in danger, stop the lift and call{" "}
          <a href={SITE.phoneHref}>{SITE.phone}</a> or the site emergency
          number. This form does not replace that.
        </p>
      </div>
      <SafetyReportForm kind={doc.slug} title={doc.title} />
    </SafetyDocFrame>
  );
}
