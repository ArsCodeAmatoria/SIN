"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DocBadge } from "@/components/DocBadge";
import { searchCatalog } from "@/lib/ohs/search";
import type { CatalogHit } from "@/lib/ohs/catalog";

export function SafetyFind({ catalog }: { catalog: CatalogHit[] }) {
  const [query, setQuery] = useState("");
  const hits = useMemo(() => searchCatalog(catalog, query), [catalog, query]);
  const looking = query.trim().length >= 2;

  return (
    <div className="safety-find" id="find">
      <label className="ohs-search">
        <span className="mono steel">FIND</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="wind, powerline, FLHA, hook…"
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
                <DocBadge
                  kind={item.kind === "BINDER" ? "BND" : undefined}
                  label={item.typeLabel}
                />
              </span>
              <strong className="display">{item.title}</strong>
              <em>
                {item.number} · {item.summary}
              </em>
            </Link>
          ))}
        </nav>
      ) : null}
      {looking && hits.length === 0 ? (
        <p className="lede mt">Nothing matches. Try the task: wind, powerline, FLHA.</p>
      ) : null}
    </div>
  );
}
