"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SafetyControl } from "@/components/SafetyControl";
import { ProvenName } from "@/components/ProvenMark";
import { EmailPdf } from "@/components/form-builder/EmailPdf";
import { FormRenderer, missingRequired } from "@/components/form-builder/FormRenderer";
import {
  BLOCK_CATALOG,
  cloneBlock,
  createBlock,
  downloadPdf,
  formToPdf,
  pdfFilename,
  saveLocalForm,
} from "@/lib/form-builder";
import {
  emptyValues,
  nid,
  type BlockType,
  type FormField,
  type FormValues,
  type SafetyBlock,
  type FormDef,
} from "@/lib/form-builder/types";

type Mode = "edit" | "preview" | "fill";
const FIELD_TYPES: FormField["type"][] = [
  "text",
  "textarea",
  "number",
  "date",
  "time",
  "select",
  "yesno",
  "checkboxes",
  "address",
];

export function BuilderApp({ initial }: { initial: FormDef }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [mode, setMode] = useState<Mode>("edit");
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [missing, setMissing] = useState<string[]>([]);
  const [saved, setSaved] = useState("");
  const [dragType, setDragType] = useState<BlockType | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function setBlocks(blocks: SafetyBlock[]) {
    setForm((f) => ({ ...f, blocks }));
  }

  function addBlock(type: BlockType, at?: number) {
    const block = createBlock(type);
    setForm((f) => {
      const blocks = [...f.blocks];
      const i = at ?? blocks.length;
      blocks.splice(i, 0, block);
      return { ...f, blocks };
    });
  }

  function move(i: number, dir: -1 | 1) {
    setForm((f) => {
      const j = i + dir;
      if (j < 0 || j >= f.blocks.length) return f;
      const blocks = [...f.blocks];
      const [b] = blocks.splice(i, 1);
      blocks.splice(j, 0, b);
      return { ...f, blocks };
    });
  }

  function patchField(blockId: string, fieldId: string, patch: Partial<FormField>) {
    setForm((f) => ({
      ...f,
      blocks: f.blocks.map((b) =>
        b.id !== blockId
          ? b
          : {
              ...b,
              fields: b.fields.map((field) =>
                field.id === fieldId ? { ...field, ...patch } : field
              ),
            }
      ),
    }));
  }

  async function pdf() {
    const miss = missingRequired(form, values);
    if (mode === "fill" && miss.length) {
      setMissing(miss);
      return;
    }
    setMissing([]);
    const bytes = await formToPdf(form, values);
    downloadPdf(bytes, pdfFilename(form));
  }

  function save() {
    const stored = saveLocalForm({
      ...form,
      id: form.source === "template" ? nid("form") : form.id,
      source: "local",
      current: false,
    });
    setForm(stored);
    setSaved("Saved on this device.");
    if (stored.id !== form.id) router.replace(`/safety/builder/${stored.id}`);
  }

  function onFillSubmit(e: React.FormEvent) {
    e.preventDefault();
    const miss = missingRequired(form, values);
    setMissing(miss);
    if (miss.length) return;
    void pdf();
  }

  return (
    <article className="doc-body fb-app">
      <header className="doc-title">
        <p className="mono steel">
          <ProvenName /> FORM
        </p>
        <h1 className="display">{form.title}</h1>
        <p className="lede mt">
          Assemble approved Safety Blocks. Preview. Fill. PDF. Nothing is stored
          on a server.
        </p>
        <p className="doc-cta">
          <Link href="/safety/builder">ALL FORMS →</Link>
        </p>
      </header>
      <SafetyControl
        current={form.current}
        doc={{
          number: form.number,
          title: form.title,
          revision: form.revision,
          effective: form.effective,
          owner: form.owner,
          approvedBy: form.approvedBy,
          review: form.review,
        }}
      />

      <div className="fb-toolbar">
        {(["edit", "preview", "fill"] as const).map((m) => (
          <button
            key={m}
            type="button"
            className={`btn ${mode === m ? "btn-solid" : "btn-ghost"}`}
            onClick={() => setMode(m)}
          >
            {m === "edit" ? "EDIT" : m === "preview" ? "PREVIEW" : "FILL OUT"}
          </button>
        ))}
        <button type="button" className="btn btn-ghost" onClick={save}>
          SAVE
        </button>
        {mode !== "edit" ? (
          <>
            <button type="button" className="btn btn-solid" onClick={() => void pdf()}>
              DOWNLOAD PDF
            </button>
            <EmailPdf form={form} values={values} />
          </>
        ) : null}
      </div>
      {saved ? <p className="mono steel mt">{saved}</p> : null}
      {missing.length ? (
        <p className="fb-warn">
          Required fields are incomplete. They are marked on the form.
        </p>
      ) : null}

      {mode === "edit" ? (
        <div className="fb-meta">
          <label className="field">
            <span className="mono">FORM NAME</span>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="mono">DOCUMENT ID</span>
            <input
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="mono">REVISION</span>
            <input
              value={form.revision}
              onChange={(e) =>
                setForm({ ...form, revision: e.target.value, version: e.target.value })
              }
            />
          </label>
          <label className="field">
            <span className="mono">EFFECTIVE</span>
            <input
              type="date"
              value={form.effective}
              onChange={(e) => setForm({ ...form, effective: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="mono">REVIEW</span>
            <input
              type="date"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="mono">OWNER</span>
            <input
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
            />
          </label>
          <label className="field">
            <span className="mono">APPROVED BY</span>
            <input
              value={form.approvedBy}
              onChange={(e) => setForm({ ...form, approvedBy: e.target.value })}
            />
          </label>
        </div>
      ) : null}

      {mode === "edit" ? (
        <div className="fb-layout">
          <aside className="fb-palette">
            <p className="mono steel">SAFETY BLOCKS</p>
            {BLOCK_CATALOG.map((item) => (
              <button
                key={item.type}
                type="button"
                className="fb-chip"
                draggable
                onDragStart={() => setDragType(item.type)}
                onDragEnd={() => setDragType(null)}
                onClick={() => addBlock(item.type)}
              >
                <strong>{item.title}</strong>
                <span>{item.blurb}</span>
              </button>
            ))}
          </aside>
          <div
            className="fb-canvas"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragType) addBlock(dragType);
              if (dragIndex !== null) setDragIndex(null);
              setDragType(null);
            }}
          >
            <p className="mono steel">FORM CANVAS</p>
            {form.blocks.length === 0 ? (
              <p className="lede">Add a Safety Block. Drag or tap.</p>
            ) : null}
            {form.blocks.map((block, i) => (
              <article
                key={block.id}
                className="fb-card"
                draggable
                onDragStart={() => setDragIndex(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragType) {
                    addBlock(dragType, i);
                    setDragType(null);
                    return;
                  }
                  if (dragIndex === null || dragIndex === i) return;
                  const blocks = [...form.blocks];
                  const [b] = blocks.splice(dragIndex, 1);
                  blocks.splice(i, 0, b);
                  setBlocks(blocks);
                  setDragIndex(null);
                }}
              >
                <header>
                  <input
                    className="fb-title-input"
                    value={block.title}
                    onChange={(e) =>
                      setBlocks(
                        form.blocks.map((b) =>
                          b.id === block.id ? { ...b, title: e.target.value } : b
                        )
                      )
                    }
                  />
                  <div className="fb-card-actions">
                    <button type="button" onClick={() => move(i, -1)}>
                      ↑
                    </button>
                    <button type="button" onClick={() => move(i, 1)}>
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBlocks([
                          ...form.blocks.slice(0, i + 1),
                          cloneBlock(block),
                          ...form.blocks.slice(i + 1),
                        ])
                      }
                    >
                      COPY
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setBlocks(form.blocks.filter((b) => b.id !== block.id))
                      }
                    >
                      REMOVE
                    </button>
                  </div>
                </header>
                {block.fields.map((field) => (
                  <div key={field.id} className="fb-field-edit">
                    <input
                      value={field.label}
                      onChange={(e) =>
                        patchField(block.id, field.id, { label: e.target.value })
                      }
                    />
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const type = e.target.value as FormField["type"];
                        patchField(block.id, field.id, {
                          type,
                          options:
                            type === "select" || type === "checkboxes"
                              ? field.options ?? ["Option"]
                              : field.options,
                        });
                      }}
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <label className="fb-check">
                      <input
                        type="checkbox"
                        checked={!!field.required}
                        onChange={(e) =>
                          patchField(block.id, field.id, {
                            required: e.target.checked,
                          })
                        }
                      />
                      Required
                    </label>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      ) : (
        <form className="fb-sheet" onSubmit={onFillSubmit}>
          <FormRenderer
            form={form}
            values={values}
            mode={mode}
            missing={missing}
            onChange={setValues}
          />
          {mode === "fill" ? (
            <div className="form-actions">
              <button className="btn btn-solid" type="submit">
                GENERATE PDF →
              </button>
            </div>
          ) : null}
        </form>
      )}
    </article>
  );
}
