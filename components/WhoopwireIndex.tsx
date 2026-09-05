"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WireStoryLink } from "@/components/WireStoryLink";
import { WireSubscribe } from "@/components/WireSubscribe";
import {
  WIRE_CATEGORIES,
  formatWireDate,
  type WireCategory,
  type WireSummary,
} from "@/lib/whoopwire";

const FILTERS = ["ALL", ...WIRE_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export function WireIndex({ stories }: { stories: WireSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Filter>("ALL");
  const [sort, setSort] = useState<"latest" | "featured">("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = stories.filter((story) => {
      const catOk = category === "ALL" || story.category === category;
      const qOk =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
    if (sort === "featured") {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [stories, query, category, sort]);

  const cover =
    !query && category === "ALL"
      ? filtered.find((story) => story.featured) ?? filtered[0]
      : filtered[0];
  const rest = cover ? filtered.filter((story) => story.slug !== cover.slug) : [];

  const grouped =
    !query && category === "ALL" && sort === "featured"
      ? WIRE_CATEGORIES.map((cat) => ({
          cat,
          items: rest.filter((story) => story.category === cat),
        })).filter((group) => group.items.length)
      : null;

  return (
    <>
      <div className="wire-tools wrap">
        <label className="wire-search">
          <span className="mono steel">SEARCH</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, subjects, trades"
            autoComplete="off"
          />
        </label>
        <div className="wire-filters" role="tablist" aria-label="Category">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              className={item === category ? "is-on" : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="wire-filters wire-sort" aria-label="Order">
          <button
            type="button"
            className={sort === "latest" ? "is-on" : undefined}
            onClick={() => setSort("latest")}
          >
            LATEST
          </button>
          <button
            type="button"
            className={sort === "featured" ? "is-on" : undefined}
            onClick={() => setSort("featured")}
          >
            FEATURED
          </button>
        </div>
      </div>

      {cover ? (
        <section className="wire-feature wrap">
          <p className="mono kicker">FEATURED — {cover.category}</p>
          <Link href={`/whoopwire/${cover.slug}`} className="wire-feature-link">
            <h2 className="display giant">
              {cover.titleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="lede-lg mt">{cover.excerpt}</p>
            <p className="mono steel mt">
              {cover.author} · {formatWireDate(cover.published)} · {cover.minutes}{" "}
              MIN
            </p>
            <span className="btn btn-solid wire-read">READ STORY →</span>
          </Link>
        </section>
      ) : (
        <section className="wrap" style={{ padding: "4rem 0 6rem" }}>
          <h2 className="display giant">
            NOTHING
            <br />
            HERE.
          </h2>
          <p className="lede mt">Try another category, or clear the search.</p>
        </section>
      )}

      {grouped
        ? grouped.map((group) => (
            <section className="section wrap" key={group.cat} id={group.cat.toLowerCase()}>
              <p className="mono kicker">{group.cat}</p>
              <div className="wire-stack">
                {group.items.map((story) => (
                  <WireStoryLink key={story.slug} story={story} />
                ))}
              </div>
            </section>
          ))
        : rest.length
          ? (
            <section className="section wrap">
              <p className="mono kicker">
                {category === "ALL" ? "STORIES" : category}
              </p>
              <div className="wire-stack">
                {rest.map((story) => (
                  <WireStoryLink key={story.slug} story={story} />
                ))}
              </div>
            </section>
          )
          : null}

      <section className="section wrap">
        <h2 className="display giant-sm">
          THE WORK.
          <br />
          HOW IT IS DONE.
        </h2>
        <p className="lede mt-2">
          Standards, the lift, and the procedures people work to.
        </p>
      </section>

      <WireSubscribe />
    </>
  );
}
