"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DocBadge } from "@/components/DocBadge";
import { IssuerCard } from "@/components/IssuerCard";
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
import { shortNumber } from "@/lib/ohs/doc";
import { loadIssuer } from "@/lib/ohs/issuer";
import {
  emptyDraft,
  itemState,
  loadBinderDraft,
  saveBinderDraft,
  type BinderDraft,
  type ItemStatus,
} from "@/lib/ohs/binder-store";

const STEPS = [
  { id: "site", label: "THIS SITE" },
  { id: "docs", label: "DOCUMENTS" },
  { id: "download", label: "DOWNLOAD" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

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
  const groups = useMemo(() => binderGroups(binder), [binder]);
  const [draft, setDraft] = useState<BinderDraft>(() => emptyDraft(binder.kind));
  const [busy, setBusy] = useState("");
  const [step, setStep] = useState<StepId>("site");
  const [groupIx, setGroupIx] = useState(0);
  const [filter, setFilter] = useState<"all" | "open" | "missing">("all");

  useEffect(() => {
    setDraft(loadBinderDraft(binder.kind));
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
    const missingRequired: BinderItem[] = [];
    for (const item of binder.items) {
      const st = itemState(draft, item.id).status;
      if (st === "have") have += 1;
      else if (st === "need") {
        need += 1;
        if (item.need === "required") missingRequired.push(item);
      } else if (st === "na") na += 1;
      else if (item.need === "required") {
        open += 1;
        missingRequired.push(item);
      }
    }
    return { have, need, na, open, total: binder.items.length, missingRequired };
  }, [binder.items, draft]);

  async function download() {
    setBusy("Building PDF…");
    try {
      const bytes = await binderToPdf(binder, draft, loadIssuer());
      downloadBinderPdf(bytes, binderPdfFilename(binder, draft));
      setBusy("");
    } catch {
      setBusy("PDF failed.");
    }
  }

  const group = groups[groupIx] ?? groups[0];
  const visible = (group?.items ?? []).filter((item) => {
    const st = itemState(draft, item.id).status;
    if (filter === "missing") return st === "need" || (st === "" && item.need === "required");
    if (filter === "open") return st === "" || st === "need";
    return true;
  });

  return (
    <article className="doc-body binder-app">
      <header className="doc-title">
        <p className="mono steel">CRANE BINDERS</p>
        <DocBadge number={binder.number} />
        <div className="num">{shortNumber(binder.number)}</div>
        <h1 className="display binder-title">{binder.title}</h1>
        <p className="lede mt">{binder.summary}</p>
      </header>

      <p className="binder-progress mono">
        {counts.have} in binder · {counts.need} missing · {counts.open} required still open ·{" "}
        {counts.na} N/A · {counts.total} items
      </p>
      <div className="binder-meter" aria-hidden>
        <span
          style={{
            width: `${counts.total ? (counts.have / counts.total) * 100 : 0}%`,
          }}
        />
      </div>

      <nav className="tabs binder-steps" aria-label="Binder steps">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={step === s.id ? "is-on" : undefined}
            onClick={() => setStep(s.id)}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {step === "site" ? (
        <section className="binder-site">
          <p className="mono kicker">THIS SITE</p>
          <p className="lede mt">
            Name the project and the machine. Then walk the documents. Saved on
            this device.
          </p>
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
          <div className="form-actions">
            <button type="button" className="btn btn-solid" onClick={() => setStep("docs")}>
              CONTINUE TO DOCUMENTS
            </button>
            <Link className="btn btn-ghost" href="/safety/binder">
              OTHER MACHINE
            </Link>
          </div>
        </section>
      ) : null}

      {step === "docs" && group ? (
        <section>
          <nav className="binder-groups" aria-label="Binder sections">
            {groups.map((g, i) => {
              const done = g.items.filter(
                (item) => itemState(draft, item.id).status !== "",
              ).length;
              return (
                <button
                  key={g.group}
                  type="button"
                  className={i === groupIx ? "is-on" : undefined}
                  onClick={() => setGroupIx(i)}
                >
                  <span className="mono">
                    {done}/{g.items.length}
                  </span>
                  {g.group}
                </button>
              );
            })}
          </nav>
          <div className="binder-filter" role="group" aria-label="Filter items">
            {(
              [
                ["all", "ALL"],
                ["open", "STILL OPEN"],
                ["missing", "MISSING / REQUIRED"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={filter === id ? "is-on" : undefined}
                onClick={() => setFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mono kicker">{group.group.toUpperCase()}</p>
          <ol className="binder-list">
            {visible.map((item) => {
              const st = itemState(draft, item.id);
              return (
                <li
                  key={item.id}
                  className={`binder-item${st.status === "have" ? " is-have" : ""}${
                    st.status === "need" ? " is-need" : ""
                  }`}
                >
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
                        data-status={s.id}
                        className={st.status === s.id ? "is-on" : undefined}
                        onClick={() => patchItem(item.id, { status: s.id })}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <div className="binder-fields">
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
                  </div>
                  <LinkRow item={item} />
                </li>
              );
            })}
          </ol>
          {visible.length === 0 ? (
            <p className="lede mt">Nothing in this filter. Try All.</p>
          ) : null}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (groupIx === 0) setStep("site");
                else setGroupIx((i) => i - 1);
              }}
            >
              BACK
            </button>
            {groupIx < groups.length - 1 ? (
              <button
                type="button"
                className="btn btn-solid"
                onClick={() => setGroupIx((i) => i + 1)}
              >
                NEXT SECTION
              </button>
            ) : (
              <button type="button" className="btn btn-solid" onClick={() => setStep("download")}>
                REVIEW + DOWNLOAD
              </button>
            )}
          </div>
        </section>
      ) : null}

      {step === "download" ? (
        <section>
          <p className="mono kicker">REVIEW</p>
          <p className="lede mt">
            {counts.missingRequired.length
              ? `${counts.missingRequired.length} required item${
                  counts.missingRequired.length === 1 ? "" : "s"
                } still open or missing. Download anyway if you are building the file. Official templates stay official.`
              : "Required items are marked. Download the Proven working copy for this site."}
          </p>
          <IssuerCard compact />
          <div className="form-actions">
            <button type="button" className="btn btn-solid" onClick={download}>
              DOWNLOAD CHECKLIST PDF
            </button>
            <a className="btn btn-ghost" href={binder.checklist.href} target="_blank" rel="noreferrer">
              {binder.checklist.label}
            </a>
            <Link className="btn btn-ghost" href="/safety/safety-forms">
              ALL FORMS
            </Link>
          </div>
          {busy ? <p className="fb-warn">{busy}</p> : null}
          {counts.missingRequired.length ? (
            <ul className="binder-gaps">
              {counts.missingRequired.map((item) => (
                <li key={item.id}>
                  <span className="mono steel">{item.n}</span>
                  <strong>{item.title}</strong>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <p className="mono steel doc-colophon">{binder.colophon}</p>
    </article>
  );
}
