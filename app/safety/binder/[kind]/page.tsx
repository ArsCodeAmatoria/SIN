import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BinderWizard } from "@/components/binder/BinderWizard";
import { BINDERS, getBinder } from "@/lib/ohs/binders";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ kind: string }> };

export function generateStaticParams() {
  return BINDERS.map((b) => ({ kind: b.kind }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  const binder = getBinder(kind);
  if (!binder) return pageMeta({ title: "Crane Binder", description: "Site crane binder.", path: "/safety/binder" });
  return pageMeta({
    title: `${binder.number} ${binder.title}`,
    description: binder.summary,
    path: `/safety/binder/${kind}`,
  });
}

export default async function BinderKindPage({ params }: Props) {
  const { kind } = await params;
  const binder = getBinder(kind);
  if (!binder) notFound();
  return <BinderWizard binder={binder} />;
}
