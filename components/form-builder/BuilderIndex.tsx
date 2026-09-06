"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  blankForm,
  cloneForm,
  deleteLocalForm,
  FORM_GROUPS,
  FORM_TEMPLATES,
  listLocalForms,
  saveLocalForm,
} from "@/lib/form-builder";
import type { FormDef } from "@/lib/form-builder/types";
import { ProvenName } from "@/components/ProvenMark";
import { DocBadge } from "@/components/DocBadge";
import { IssuerCard } from "@/components/IssuerCard";
import { useRouter } from "next/navigation";

export function BuilderIndex() {
  const router = useRouter();
  const [local, setLocal] = useState<FormDef[]>([]);

  useEffect(() => {
    setLocal(listLocalForms());
  }, []);

  function create() {
    const form = saveLocalForm(blankForm());
    router.push(`/safety/builder/${form.id}`);
  }

  function copyTemplate(t: FormDef) {
    const form = saveLocalForm(cloneForm(t, t.title));
    router.push(`/safety/builder/${form.id}`);
  }

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
          <Link href="/safety/safety-forms">17 — SAFETY FORMS →</Link>
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

      {FORM_GROUPS.map((group) => {
        const items = FORM_TEMPLATES.filter((t) => t.group === group);
        if (!items.length) return null;
        return (
          <section key={group}>
            <p className="mono kicker mt-2">{group.toUpperCase()}</p>
            <nav className="ohs-lib-list" aria-label={`${group} templates`}>
              {items.map((t) => (
                <div key={t.id} className="fb-index-row">
                  <Link href={`/safety/builder/${t.id}`}>
                    <DocBadge number={t.number} />
                    <strong className="display">{t.title}</strong>
                    <em>{t.description}</em>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => copyTemplate(t)}
                  >
                    DUPLICATE
                  </button>
                </div>
              ))}
            </nav>
          </section>
        );
      })}

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
