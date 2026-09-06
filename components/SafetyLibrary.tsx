"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { DocBadge } from "@/components/DocBadge";
import { RiskBadge } from "@/components/RiskBadge";
import type { LibraryCard } from "@/lib/ohs";

export function SafetyLibrary({
  items,
  placeholder,
  groupOrder,
}: {
  items: LibraryCard[];
  placeholder: string;
  groupOrder?: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      `${item.number} ${item.title} ${item.summary} ${item.meta ?? ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [items, query]);

  const sections = useMemo(() => {
    if (!groupOrder) return [{ label: null as string | null, items: filtered }];
    const used = new Set<string>();
    const grouped = groupOrder
      .map((label) => {
        const bunch = filtered.filter((item) => item.meta === label);
        bunch.forEach((item) => used.add(item.href));
        return { label, items: bunch };
      })
      .filter((section) => section.items.length > 0);
    const rest = filtered.filter((item) => !used.has(item.href));
    if (rest.length) grouped.push({ label: "OTHER", items: rest });
    return grouped;
  }, [filtered, groupOrder]);

  return (
    <div className="ohs-library">
      <label className="ohs-search">
        <span className="mono steel">SEARCH</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
      </label>
      <p className="mono steel ohs-count">
        {filtered.length} DOCUMENT{filtered.length === 1 ? "" : "S"}
      </p>
      {sections.map((section) => (
        <div key={section.label ?? "all"} className="ohs-lib-group">
          {section.label ? (
            <p className="mono kicker">{section.label}</p>
          ) : null}
          <nav className="ohs-lib-list" aria-label={section.label ?? "Document library"}>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.number.includes("-BND") || item.href.includes("/binder")
                    ? "is-binder"
                    : undefined
                }
              >
                <span className="ohs-lib-head">
                  <DocBadge number={item.number} />
                  {item.risk ? <RiskBadge level={item.risk} /> : null}
                </span>
                <strong className="display">{item.title}</strong>
                <em>{item.summary}</em>
              </Link>
            ))}
          </nav>
        </div>
      ))}
      {filtered.length === 0 ? (
        <p className="lede mt">No documents match. Try the number or the task.</p>
      ) : null}
    </div>
  );
}
