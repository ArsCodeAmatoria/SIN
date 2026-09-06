import type { MetadataRoute } from "next";
import { safetyCatalog } from "@/lib/ohs/catalog";
import { CHARTS as TOWER_CHARTS } from "@/lib/redtc/bank";
import { RIGGING_CHARTS } from "@/lib/rigging-charts";
import { ORIGIN } from "@/lib/seo";
import { SEO_LANDINGS } from "@/lib/seo-landings";
import { getArticles, wirePath } from "@/lib/whoopwire";

function loc(path: string, lastModified?: string | Date, changeFrequency?: MetadataRoute.Sitemap[0]["changeFrequency"], priority?: number): MetadataRoute.Sitemap[0] {
  return {
    url: path === "/" ? ORIGIN : `${ORIGIN}${path}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: changeFrequency ?? "weekly",
    priority: priority ?? 0.6,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles().map((article) =>
    loc(wirePath(article.slug), article.updated ?? article.published, "monthly", 0.7),
  );

  const proven = [
    loc("/safety", undefined, "weekly", 0.9),
    ...safetyCatalog().map((item) => loc(item.href, undefined, "monthly", 0.5)),
  ];

  const exams = [
    loc("/redtc", undefined, "weekly", 0.9),
    loc("/redtc/test", undefined, "weekly", 0.8),
    loc("/redtc/test/master", undefined, "weekly", 0.8),
    loc("/redtc/load-charts", undefined, "weekly", 0.8),
    loc("/redtc/rigging-charts", undefined, "weekly", 0.6),
    ...TOWER_CHARTS.map((chart) => loc(`/redtc/load-charts/${chart.id}`, undefined, "monthly", 0.5)),
    ...RIGGING_CHARTS.map((chart) => loc(`/redtc/rigging-charts/${chart.id}`, undefined, "monthly", 0.5)),
  ];

  const landings = SEO_LANDINGS.map((page) => loc(`/${page.slug}`, undefined, "monthly", 0.85));

  return [
    loc("/", undefined, "weekly", 1),
    loc("/sling", undefined, "weekly", 0.8),
    loc("/wire", undefined, "weekly", 0.8),
    loc("/about", undefined, "monthly", 0.6),
    loc("/philosophy", undefined, "yearly", 0.4),
    loc("/safety/builder", undefined, "weekly", 0.6),
    ...landings,
    ...exams,
    ...proven,
    ...articles,
  ];
}
