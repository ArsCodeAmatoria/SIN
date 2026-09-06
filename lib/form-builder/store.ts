import type { FormDef } from "./types";

const KEY = "proven-form-defs-v1";
const LEGACY_KEYS = ["whoop-form-defs-v1"];

function migrateNumbers(form: FormDef): FormDef {
  return {
    ...form,
    number: form.number.replace(/^GOSPEL-/, "PROVEN-").replace(/^Proven-/, "PROVEN-"),
  };
}

function read(): FormDef[] {
  if (typeof window === "undefined") return [];
  try {
    for (const key of [KEY, ...LEGACY_KEYS]) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as FormDef[];
      if (!Array.isArray(parsed)) continue;
      const forms = parsed.map(migrateNumbers);
      if (key !== KEY) {
        localStorage.setItem(KEY, JSON.stringify(forms));
        localStorage.removeItem(key);
      }
      return forms;
    }
    return [];
  } catch {
    return [];
  }
}

function write(forms: FormDef[]) {
  localStorage.setItem(KEY, JSON.stringify(forms));
}

export function listLocalForms(): FormDef[] {
  return read();
}

export function getLocalForm(id: string) {
  return read().find((f) => f.id === id);
}

export function saveLocalForm(form: FormDef) {
  const next = read().filter((f) => f.id !== form.id);
  const stored: FormDef = {
    ...migrateNumbers(form),
    source: "local",
    current: false,
  };
  next.unshift(stored);
  write(next);
  return stored;
}

export function deleteLocalForm(id: string) {
  write(read().filter((f) => f.id !== id));
}
