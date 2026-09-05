"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { RedtcNav } from "@/components/redtc/RedtcNav";
import { RIGGING_CHARTS, riggingChartPdfHref } from "@/lib/redmc/bank";

export default function RedmcRiggingChartPage() {
  const params = useParams();
  const chartId = String(params.id || "");
  const chart = useMemo(() => RIGGING_CHARTS.find((c) => c.id === chartId), [chartId]);

  if (!chart) {
    return (
      <div className="redtc wrap">
        <header className="page-hero">
          <p className="mono kicker">Not in the bank</p>
          <h1 className="display giant">Chart</h1>
          <p className="lede mt-2">This rigging chart is not in the booklet yet.</p>
          <RedtcNav />
        </header>
        <div className="inline-cta">
          <Link className="btn btn-ghost" href="/redmc/rigging-charts">
            Back to rigging
          </Link>
        </div>
      </div>
    );
  }

  const pdfHref = riggingChartPdfHref(chart.pdfFile);

  return (
    <div className="redtc wrap">
      <header className="page-hero">
        <p className="mono kicker">{chart.manufacturer}</p>
        <h1 className="display giant">{chart.name}</h1>
        <p className="lede mt-2">
          {chart.description} Questions appear when they are written against
          this PDF.
        </p>
        <RedtcNav />
      </header>
      <div className="inline-cta">
        <a className="btn btn-solid" href={pdfHref} target="_blank" rel="noopener noreferrer">
          Open chart
        </a>
        <Link className="btn btn-ghost" href="/redmc/rigging-charts">
          Back to rigging
        </Link>
      </div>
      <iframe
        className="redtc-chart-frame mt-2"
        src={pdfHref}
        title={`${chart.name} rigging chart`}
      />
    </div>
  );
}
