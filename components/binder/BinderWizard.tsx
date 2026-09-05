"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BINDER_ROLES,
  binderGroups,
  binderItemLinks,
  type BinderDef,
  type BinderItem,
} from "@/lib/ohs/binders";
import {
  binderPdfFilename,
  binderToPdf,
  downloadBinderPdf,
} from "@/lib/ohs/binder-pdf";
import {
  emptyDraft,
  itemState,
  loadBinderDraft,
  saveBinderDraft,
  type BinderDraft,
  type ItemStatus,
} from "@/lib/ohs/binder-store";

const STATUSES: { id: ItemStatus; label: string }[] = [
  { id: "need", label: "MISSING" },
  { id: "have", label: "IN BINDER" },
  { id: "na", label: "N/A" },
];

function LinkRow({ item }: { item: BinderItem }) {
  const links = binderItemLinks(item);
  if (!links.length) return null;
  return (
    <p className="binder-item-links">
      {links.map((link) =>
        link.external || /^https?:\/\//i.test(link.href) ? (
          <a key={link.href + link.label} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ) : (
          <Link key={link.href + link.label} href={link.href}>
            {link.label}
          </Link>
        ),
      )}
    </p>
  );
}

export function BinderWizard({ binder }: { binder: BinderDef }) {
  const [draft, setDraft] = useState<BinderDraft>(() => emptyDraft(binder.kind));
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState("");

  useEffect(() => {
    setDraft(loadBinderDraft(binder.kind));
    setReady(true);
  }, [binder.kind]);

  function patch(partial: Partial<BinderDraft>) {
    setDraft((prev) => {
      const next = { ...prev, ...partial, kind: binder.kind };
      saveBinderDraft(next);
      return next;
    });
  }

  function patchItem(id: string, partial: Partial<ReturnType<typeof itemState>>) {
    setDraft((prev) => {
      const cur = itemState(prev, id);
      const next = {
        ...prev,
        items: { ...prev.items, [id]: { ...cur, ...partial } },
      };
      saveBinderDraft(next);
      return next;
    });
  }

  const counts = useMemo(() => {
    let have = 0;
    let need = 0;
    let na = 0;
    let open = 0;
    for (const item of binder.items) {
      const st = itemState(draft, item.id).status;
      if (st === "have") have += 1;
      else if (st === "need") need += 1;
      else if (st === "na") na += 1;
      else if (item.need === "required") open += 1;
    }
    return { have, need, na, open, total: binder.items.length };
  }, [binder.items, draft]);

  async function download() {
    setBusy("Building PDF…");
    try {
      const bytes = await binderToPdf(binder, draft);
      downloadBinderPdf(bytes, binderPdfFilename(binder, draft));
      setBusy("");
    } catch {
      setBusy("PDF failed.");
    }
  }

  if (!ready) {
    return (
      <article className="doc-body">
        <p className="mono steel">LOADING</p>
      </article>
    );
  }

  return (
    <article className="doc-body">
      <header className="doc-title">
        <p className="mono steel">CRANE BINDER WIZARD</p>
        <div className="num">{binder.number.replace("GOSPEL-", "")}</div>
        <h1 className="display">{binder.title}</h1>
        <p className="lede mt">{binder.summary}</p>
        <p className="doc-cta">
          <a href={binder.checklist.href} target="_blank" rel="noreferrer">
            {binder.checklist.label}
          </a>
        </p>
        <p className="doc-cta">
          <Link href="/safety/crane-binders">22 — CRANE BINDERS →</Link>
        </p>
      </header>

      <p className="binder-progress mono">
        {counts.have} in binder · {counts.need} missing · {counts.open} required still open ·{" "}
        {counts.na} N/A · {counts.total} items
      </p>

      <section className="binder-site">
        <p className="mono kicker">THIS SITE</p>
        <div className="binder-fields">
          {(
            [
              ["site", "Site / project", draft.site],
              ["address", "Address", draft.address],
              ["contractor", "Contractor", draft.contractor],
              ["supervisor", "Activity supervisor", draft.supervisor],
              ["make", "Crane make", draft.make],
              ["model", "Model", draft.model],
              ["serial", "Serial", draft.serial],
              ["meeting", "Meeting date", draft.meeting],
            ] as const
          ).map(([key, label, value]) => (
            <label className="field" key={key}>
              <span>{label}</span>
              <input
                type={key === "meeting" ? "date" : "text"}
                value={value}
                onChange={(e) => patch({ [key]: e.target.value })}
              />
            </label>
          ))}
        </div>
      </section>

      {binderGroups(binder).map((group) => (
        <section key={group.group} className="binder-group">
          <p className="mono kicker">{group.group.toUpperCase()}</p>
          <ol className="binder-list">
            {group.items.map((item) => {
              const st = itemState(draft, item.id);
              return (
                <li key={item.id} className="binder-item">
                  <header>
                    <span className="mono steel">{item.n}</span>
                    <h2 className="display">{item.title}</h2>
                    <em className="mono">
                      {item.need === "required" ? "REQUIRED" : "IF APPLICABLE"}
                    </em>
                  </header>
                  <p>{item.note}</p>
                  <div className="binder-status" role="group" aria-label="Status">
                    {STATUSES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={st.status === s.id ? "is-on" : undefined}
                        onClick={() => patchItem(item.id, { status: s.id })}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <label className="field">
                    <span>Who holds it</span>
                    <select
                      value={st.who}
                      onChange={(e) =>
                        patchItem(item.id, {
                          who: e.target.value as typeof st.who,
                        })
                      }
                    >
                      <option value="">Not assigned</option>
                      {BINDER_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Note</span>
                    <input
                      type="text"
                      value={st.note}
                      onChange={(e) => patchItem(item.id, { note: e.target.value })}
                      placeholder="File name, date, gap"
                    />
                  </label>
                  <LinkRow item={item} />
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <div className="form-actions">
        <button type="button" className="btn btn-solid" onClick={download}>
          DOWNLOAD CHECKLIST PDF
        </button>
        <Link className="btn btn-ghost" href="/safety/safety-forms">
          ALL FORMS
        </Link>
      </div>
      {busy ? <p className="fb-warn">{busy}</p> : null}
      <p className="mono steel doc-colophon">
        Saved on this device. Not sent to a server. Official BC Crane Safety
        checklist and WorkSafeBC forms are linked — they are not Proven forms.
      </p>
    </article>
  );
}
