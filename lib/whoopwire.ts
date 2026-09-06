import { ARTICLES } from "@/lib/whoopwire-stories";
import type { Step } from "@/lib/safety";

export const WIRE = {
  name: "THE WIRE",
  path: "/wire",
  descriptor: "SAFETY. RIGGING. CRANES. PEOPLE.",
  dek: "The things worth talking about in crane safety, rigging and the people who do the work in British Columbia.",
  subscribe: "New stories on crane safety, rigging and the people doing the work.",
} as const;

export function wirePath(slug?: string) {
  return slug ? `${WIRE.path}/${slug}` : WIRE.path;
}

export const WIRE_CATEGORIES = [
  "SAFETY",
  "RIGGING",
  "CRANES",
  "PEOPLE",
  "INDUSTRY",
] as const;

export type WireCategory = (typeof WIRE_CATEGORIES)[number];

export type WireBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: Step[] }
  | { type: "image"; src: string; alt: string; caption?: string; contain?: boolean }
  | { type: "formula"; expr: string; note?: string }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  | { type: "diagram"; name: "sling-sin" | "boom-trig" }
  | { type: "calc"; name: "sling-sin" | "boom-trig" | "sling-angle" }
  | { type: "cta"; href: string; label: string };

export type WireSource = { name: string; href?: string };

export type WireArticle = {
  slug: string;
  title: string;
  titleLines: string[];
  category: WireCategory;
  excerpt: string;
  author: string;
  published: string;
  updated?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  /** Keep the whole picture visible. Use for diagrams and infographics. */
  imageContain?: boolean;
  seoTitle: string;
  seoDescription: string;
  related: string[];
  safety: string[];
  sources?: WireSource[];
  blocks: WireBlock[];
};

export type WireSummary = Omit<WireArticle, "blocks"> & { minutes: number };

export function wordCount(article: WireArticle) {
  const fromBlocks = article.blocks
    .map((block) => {
      if (block.type === "p" || block.type === "h" || block.type === "quote") {
        return block.text;
      }
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "steps") {
        return block.items.map((s) => `${s.title} ${s.body}`).join(" ");
      }
      if (block.type === "image") return block.caption ?? "";
      if (block.type === "formula") return `${block.expr} ${block.note ?? ""}`;
      if (block.type === "table") {
        return `${block.caption ?? ""} ${block.columns.join(" ")} ${block.rows.flat().join(" ")}`;
      }
      if (block.type === "cta") return block.label;
      return "";
    })
    .join(" ");
  return `${article.title} ${article.excerpt} ${fromBlocks}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(article: WireArticle) {
  return Math.max(1, Math.round(wordCount(article) / 200));
}

export function formatWireDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

function byDate(a: WireArticle, b: WireArticle) {
  return b.published.localeCompare(a.published);
}

export function getArticles() {
  return [...ARTICLES].sort(byDate);
}

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getFeatured() {
  return getArticles().find((article) => article.featured) ?? getArticles()[0];
}

export function getLatest(count = 3) {
  return getArticles().slice(0, count);
}

export function getRelated(article: WireArticle) {
  const bySlug = article.related
    .map((slug) => getArticle(slug))
    .filter((item): item is WireArticle => Boolean(item));
  if (bySlug.length) return bySlug;
  return getArticles()
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 2);
}

export function summarize(article: WireArticle): WireSummary {
  const { blocks: _blocks, ...rest } = article;
  return { ...rest, minutes: readingMinutes(article) };
}

export function getSummaries() {
  return getArticles().map(summarize);
}
