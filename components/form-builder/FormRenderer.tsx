"use client";

import type {
  FormField,
  FormValues,
  InspectionRow,
  SafetyBlock,
  FormDef,
} from "@/lib/form-builder/types";
import { isAddressField, nid } from "@/lib/form-builder/types";
import { ProvenName } from "@/components/ProvenMark";
import { AddressFinder } from "./AddressFinder";
import { SignatureField } from "./SignatureField";

export type RenderMode = "edit" | "preview" | "fill";

function asString(v: string | string[] | undefined) {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

function asList(v: string | string[] | undefined) {
  return Array.isArray(v) ? v : [];
}

export function missingRequired(
  form: FormDef,
  values: FormValues
): string[] {
  const miss: string[] = [];
  for (const block of form.blocks) {
    for (const field of block.fields) {
      if (!field.required) continue;
      const v = values.fields[field.id];
      const empty = Array.isArray(v) ? v.length === 0 : !String(v ?? "").trim();
      if (empty) miss.push(field.id);
    }
    if (block.type === "signature" && block.required) {
      const s = values.signatures[block.id];
      if (!s?.typed && !s?.dataUrl) miss.push(`${block.id}_sig`);
    }
  }
  return miss;
}

function FieldInput({
  field,
  mode,
  value,
  invalid,
  onChange,
}: {
  field: FormField;
  mode: RenderMode;
  value: string | string[] | undefined;
  invalid?: boolean;
  onChange: (v: string | string[]) => void;
}) {
  const disabled = mode !== "fill";
  const cls = `fb-input${invalid ? " invalid" : ""}`;

  if (field.type === "textarea") {
    return (
      <textarea
        className={cls}
        disabled={disabled}
        required={field.required && mode === "fill"}
        placeholder={mode === "preview" ? "" : field.placeholder}
        value={asString(value)}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        className={cls}
        disabled={disabled}
        required={field.required && mode === "fill"}
        value={asString(value)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {(field.options ?? []).map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "yesno") {
    return (
      <select
        className={cls}
        disabled={disabled}
        required={field.required && mode === "fill"}
        value={asString(value)}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="fb-check">
        <input
          type="checkbox"
          disabled={disabled}
          checked={asString(value) === "yes"}
          onChange={(e) => onChange(e.target.checked ? "yes" : "")}
        />
        {field.label}
      </label>
    );
  }
  if (field.type === "checkboxes") {
    const selected = asList(value);
    return (
      <div className="fb-checks">
        {(field.options ?? []).map((o) => (
          <label key={o} className="fb-check">
            <input
              type="checkbox"
              disabled={disabled}
              checked={selected.includes(o)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...selected, o]
                  : selected.filter((x) => x !== o);
                onChange(next);
              }}
            />
            {o}
          </label>
        ))}
      </div>
    );
  }
  if (isAddressField(field)) {
    return (
      <AddressFinder
        id={field.id}
        value={asString(value)}
        invalid={invalid}
        required={field.required && mode === "fill"}
        placeholder={mode === "preview" ? "" : field.placeholder}
        disabled={disabled}
        onChange={(v) => onChange(v)}
      />
    );
  }
  const inputType =
    field.type === "number"
      ? "number"
      : field.type === "date"
        ? "date"
        : field.type === "time"
          ? "time"
          : "text";
  return (
    <input
      className={cls}
      type={inputType}
      disabled={disabled}
      required={field.required && mode === "fill"}
      placeholder={mode === "preview" ? "" : field.placeholder}
      value={asString(value)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function InspectionTable({
  block,
  mode,
  rows,
  onChange,
}: {
  block: SafetyBlock;
  mode: RenderMode;
  rows: InspectionRow[];
  onChange: (rows: InspectionRow[]) => void;
}) {
  const list =
    rows.length > 0
      ? rows
      : (block.inspectionItems ?? ["Item"]).map((item, i) => ({
          id: `${block.id}-item-${i}`,
          item,
          result: "" as const,
          comments: "",
        }));

  return (
    <div className="fb-table-wrap">
      <table className="fb-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Pass</th>
            <th>Fail</th>
            <th>N/A</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {list.map((row, i) => (
            <tr key={row.id}>
              <td>
                {mode === "fill" ? (
                  <input
                    className="fb-input"
                    value={row.item}
                    onChange={(e) => {
                      const next = [...list];
                      next[i] = { ...row, item: e.target.value };
                      onChange(next);
                    }}
                  />
                ) : (
                  row.item
                )}
              </td>
              {(["pass", "fail", "na"] as const).map((r) => (
                <td key={r} className="fb-td-check">
                  <input
                    type="radio"
                    name={`${block.id}-${row.id}`}
                    disabled={mode !== "fill"}
                    checked={row.result === r}
                    onChange={() => {
                      const next = [...list];
                      next[i] = { ...row, result: r };
                      onChange(next);
                    }}
                  />
                </td>
              ))}
              <td>
                {mode === "fill" ? (
                  <input
                    className="fb-input"
                    value={row.comments}
                    onChange={(e) => {
                      const next = [...list];
                      next[i] = { ...row, comments: e.target.value };
                      onChange(next);
                    }}
                  />
                ) : (
                  row.comments
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mode === "fill" ? (
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            onChange([
              ...list,
              { id: nid("row"), item: "", result: "", comments: "" },
            ])
          }
        >
          ADD ROW
        </button>
      ) : null}
    </div>
  );
}

export function FormRenderer({
  form,
  values,
  mode,
  missing,
  onChange,
  onEditField,
}: {
  form: FormDef;
  values: FormValues;
  mode: RenderMode;
  missing?: string[];
  onChange: (values: FormValues) => void;
  onEditField?: (blockId: string, fieldId: string, patch: Partial<FormField>) => void;
}) {
  const miss = new Set(missing ?? []);

  function setField(id: string, v: string | string[]) {
    onChange({ ...values, fields: { ...values.fields, [id]: v } });
  }

  return (
    <div className={`fb-doc${mode === "preview" ? " is-preview" : ""}`}>
      <header className="fb-doc-head">
        <p className="brand">
          <ProvenName />
        </p>
        <div className="fb-doc-meta">
          <span className="mono">{form.number}</span>
          <span className="mono">REV {form.revision}</span>
          {form.current ? (
            <span className="ohs-current">CURRENT VERSION</span>
          ) : (
            <span className="mono steel">WORKING COPY</span>
          )}
        </div>
        <h1 className="display">{form.title}</h1>
        {form.description ? <p className="lede">{form.description}</p> : null}
        <p className="mono steel">
          Effective {form.effective} · Owner {form.owner} · Approved {form.approvedBy} ·
          Review {form.review}
        </p>
      </header>

      {form.blocks.map((block) => (
        <section key={block.id} className="fb-block-view" data-block={block.id}>
          <h2>{block.title}</h2>
          {block.fields
            .filter((f) => f.type !== "checkbox")
            .map((field) => (
              <label
                key={field.id}
                className={`fb-field${miss.has(field.id) ? " is-missing" : ""}`}
                htmlFor={field.id}
              >
                <span className="mono">
                  {field.label}
                  {field.required ? " *" : ""}
                </span>
                {mode === "edit" && onEditField ? (
                  <input
                    className="fb-input"
                    value={field.label}
                    onChange={(e) =>
                      onEditField(block.id, field.id, { label: e.target.value })
                    }
                  />
                ) : null}
                {field.type !== "signature" && field.type !== "photo" ? (
                  <FieldInput
                    field={field}
                    mode={mode === "edit" ? "preview" : mode}
                    value={values.fields[field.id]}
                    invalid={miss.has(field.id)}
                    onChange={(v) => setField(field.id, v)}
                  />
                ) : null}
              </label>
            ))}

          {block.type === "inspection" ? (
            <InspectionTable
              block={block}
              mode={mode === "edit" ? "preview" : mode}
              rows={values.inspection[block.id] ?? []}
              onChange={(rows) =>
                onChange({
                  ...values,
                  inspection: { ...values.inspection, [block.id]: rows },
                })
              }
            />
          ) : null}

          {block.type === "signature" ? (
            <div className={miss.has(`${block.id}_sig`) ? "is-missing" : ""}>
              <SignatureField
                fill={mode === "fill"}
                value={values.signatures[block.id]}
                onChange={(sig) =>
                  onChange({
                    ...values,
                    signatures: { ...values.signatures, [block.id]: sig },
                    fields: {
                      ...values.fields,
                      [block.fields.find((f) => f.key === "printed")?.id ?? ""]:
                        sig.printed || sig.typed || "",
                      [block.fields.find((f) => f.key === "date")?.id ?? ""]:
                        sig.date,
                    },
                  })
                }
              />
            </div>
          ) : null}

          {block.type === "photo" && mode === "fill" ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const dataUrl = String(reader.result ?? "");
                  const prev = values.photos[block.id] ?? [];
                  onChange({
                    ...values,
                    photos: {
                      ...values.photos,
                      [block.id]: [...prev, { name: file.name, dataUrl }],
                    },
                  });
                };
                reader.readAsDataURL(file);
              }}
            />
          ) : null}
          {block.type === "photo"
            ? (values.photos[block.id] ?? []).map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.name} src={p.dataUrl} alt={p.name} className="fb-photo" />
              ))
            : null}
        </section>
      ))}
    </div>
  );
}
