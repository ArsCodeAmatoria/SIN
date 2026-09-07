"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  blankForm,
  cloneForm,
  deleteLocalForm,
  FORM_GROUPS,
  FORM_TEMPLATES,
  listLocalForms,
  saveLocalForm,
} from "@/lib/form-builder";
import type { FormDef, FormGroup } from "@/lib/form-builder/types";
import { ProvenName } from "@/components/ProvenMark";
import { DocBadge } from "@/components/DocBadge";
import { IssuerCard } from "@/components/IssuerCard";
import { useRouter } from "next/navigation";

const FILTERS: { id: "ALL" | FormGroup; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "Daily", label: "DAILY" },
  { id: "Lifting", label: "LIFTING" },
  { id: "Inspection", label: "CRANE" },
  { id: "Logs", label: "LOGS" },
  { id: "Incident", label: "INCIDENT" },
  { id: "Worker", label: "WORKER" },
  { id: "Binder", label: "BINDER" },
];

function matches(form: FormDef, query: string, group: "ALL" | FormGroup) {
  if (group !== "ALL" && form.group !== group) return false;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${form.title} ${form.description ?? ""} ${form.number} ${form.group}`
    .toLowerCase()
    .includes(q);
}

export function BuilderIndex() {
  const router = useRouter();
  const [local, setLocal] = useState<FormDef[]>([]);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<"ALL" | FormGroup>("ALL");

  useEffect(() => {
    setLocal(listLocalForms());
  }, []);

  function create() {
    const form = saveLocalForm(blankForm());
    router.push(`/safety/builder/${form.id}`);
  }

  const visible = useMemo(() => {
    const grouped = FORM_GROUPS.map((g) => ({
      group: g,
      items: FORM_TEMPLATES.filter((t) => t.group === g && matches(t, query, group)),
    })).filter((section) => section.items.length);
    return grouped;
  }, [query, group]);

  const shown = visible.reduce((n, section) => n + section.items.length, 0);

  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">
          <ProvenName /> FORMS
        </p>
        <h1 className="display">FORM BUILDER</h1>
        <p className="lede mt">
          <ProvenName /> forms are assembled from reusable Safety Blocks. Pick a
          controlled template, or start from scratch. Fill it out on this
          device. Put your company name, logo and signature on the PDF. Nothing
          is kept on a server.
        </p>
        <p className="doc-cta">
          <Link href="/safety/safety-forms">SAFETY FORMS →</Link>
        </p>
        <p className="doc-cta is-binder">
          <Link href="/safety/binder">CRANE BINDERS →</Link>
        </p>
      </header>
      <IssuerCard compact />
      <div className="form-actions">
        <button type="button" className="btn btn-solid" onClick={create}>
          NEW FORM
        </button>
      </div>

      <div className="fb-find">
        <label className="ohs-search">
          <span className="mono steel">SEARCH FORMS</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="monthly, tower, FLHA, wind…"
            autoComplete="off"
          />
        </label>
        <div className="tabs fb-filters" role="tablist" aria-label="Form type">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={group === item.id ? "is-on" : undefined}
              onClick={() => setGroup(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mono steel ohs-count">
          {shown} FORM{shown === 1 ? "" : "S"}
        </p>
      </div>

      {visible.map((section) => (
        <section key={section.group}>
          <p className="mono kicker mt-2">{section.group.toUpperCase()}</p>
          <nav className="ohs-lib-list" aria-label={`${section.group} templates`}>
            {section.items.map((t) => (
              <div key={t.id} className="fb-index-row">
                <Link href={`/safety/builder/${t.id}`}>
                  <DocBadge number={t.number} />
                  <strong className="display">{t.title}</strong>
                  <em>{t.description}</em>
                </Link>
                <Link className="btn btn-solid" href={`/safety/builder/${t.id}`}>
                  USE →
                </Link>
              </div>
            ))}
          </nav>
        </section>
      ))}

      {shown === 0 ? (
        <p className="lede mt">Nothing matches. Try tower, monthly, or FLHA.</p>
      ) : null}

      {local.length ? (
        <>
          <p className="mono kicker mt-2">ON THIS DEVICE</p>
          <nav className="ohs-lib-list" aria-label="Saved forms">
            {local.map((t) => (
              <div key={t.id} className="fb-index-row">
                <Link href={`/safety/builder/${t.id}`}>
                  <DocBadge number={t.number} />
                  <strong className="display">{t.title}</strong>
                  <em>Working copy. Not the controlled template.</em>
                </Link>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    deleteLocalForm(t.id);
                    setLocal(listLocalForms());
                  }}
                >
                  DELETE
                </button>
              </div>
            ))}
          </nav>
        </>
      ) : null}
    </article>
  );
}
