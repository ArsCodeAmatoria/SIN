"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DocBadge } from "@/components/DocBadge";
import type { CatalogHit } from "@/lib/ohs/catalog";

export function SafetyFind({ catalog }: { catalog: CatalogHit[] }) {
  const [query, setQuery] = useState("");
  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return catalog
      .filter((item) =>
        `${item.kind} ${item.number} ${item.title} ${item.summary}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 12);
  }, [catalog, query]);

  return (
    <div className="safety-find">
      <label className="ohs-search">
        <span className="mono steel">FIND A DOCUMENT</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="FLHA, slings, heat, refuse, incident…"
          autoComplete="off"
        />
      </label>
      {hits.length > 0 ? (
        <nav className="safety-find-hits" aria-label="Search results">
          {hits.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.kind === "BINDER" ? "is-binder" : undefined}
            >
              <span className="ohs-lib-head">
                <DocBadge number={item.number} />
              </span>
              <strong className="display">{item.title}</strong>
            </Link>
          ))}
        </nav>
      ) : null}
      {query.trim().length >= 2 && hits.length === 0 ? (
        <p className="lede mt">Nothing matches. Try the number or the task.</p>
      ) : null}
    </div>
  );
}
