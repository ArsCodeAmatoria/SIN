import type { Metadata } from "next";
import { CHART_MAKERS, CHARTS } from "@/lib/redmc/bank";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const chart = CHARTS.find((item) => item.id === id);
  if (chart) {
    return pageMeta({
      title: `${chart.name} Load Chart | REDMC`,
      description: chart.description,
      path: `/redmc/load-charts/${id}`,
    });
  }
  const maker = CHART_MAKERS.find((item) => item.id === id);
  return pageMeta({
    title: maker ? `${maker.name} load chart` : "Load chart",
    description: maker?.note ?? "This chart is not in the bank yet.",
    path: `/redmc/load-charts/${id}`,
    index: false,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
