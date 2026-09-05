import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/SeoLanding";
import { pageMeta } from "@/lib/seo";
import { getSeoLanding, SEO_LANDINGS } from "@/lib/seo-landings";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_LANDINGS.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLanding(slug);
  if (!page) return pageMeta({ title: "Not found", description: "Page not found.", path: "/" });
  return pageMeta({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
  });
}

export default async function SearchLanding({ params }: Props) {
  const { slug } = await params;
  const page = getSeoLanding(slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
