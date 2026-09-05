import { OHS_META } from "@/lib/ohs";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "time"
  | "select"
  | "checkbox"
  | "yesno"
  | "checkboxes"
  | "signature"
  | "photo"
  | "address";

export type FormField = {
  id: string;
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export type BlockType =
  | "worker"
  | "project"
  | "task"
  | "hazard"
  | "control"
  | "crane"
  | "load"
  | "rigging"
  | "inspection"
  | "ppe"
  | "communication"
  | "weather"
  | "powerlines"
  | "emergency"
  | "corrective"
  | "comments"
  | "signature"
  | "photo"
  | "log"
  | "incident";

export type SafetyBlock = {
  id: string;
  type: BlockType;
  title: string;
  required?: boolean;
  fields: FormField[];
  inspectionItems?: string[];
};

export type FormGroup =
  | "Daily"
  | "Logs"
  | "Lifting"
  | "Incident"
  | "Inspection"
  | "Worker"
  | "Binder";

export const FORM_GROUPS: FormGroup[] = [
  "Daily",
  "Logs",
  "Lifting",
  "Inspection",
  "Incident",
  "Worker",
  "Binder",
];

export type FormDef = {
  id: string;
  title: string;
  description?: string;
  number: string;
  version: string;
  revision: string;
  effective: string;
  review: string;
  owner: string;
  approvedBy: string;
  current: boolean;
  source: "template" | "local";
  group: FormGroup;
  blocks: SafetyBlock[];
};

export type InspectionRow = {
  id: string;
  item: string;
  result: "" | "pass" | "fail" | "na";
  comments: string;
};

export type SignatureValue = {
  kind: "typed" | "drawn";
  printed: string;
  date: string;
  typed?: string;
  dataUrl?: string;
};

export type PhotoValue = {
  name: string;
  dataUrl: string;
};

export type FormValues = {
  fields: Record<string, string | string[]>;
  inspection: Record<string, InspectionRow[]>;
  signatures: Record<string, SignatureValue>;
  photos: Record<string, PhotoValue[]>;
};

export const FORM_CONTROL = {
  revision: OHS_META.revision,
  effective: OHS_META.effective,
  review: OHS_META.review,
  owner: OHS_META.owner,
  approvedBy: OHS_META.approvedBy,
} as const;

export function emptyValues(): FormValues {
  return { fields: {}, inspection: {}, signatures: {}, photos: {} };
}

export function nid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export type AddressHit = {
  label: string;
  line: string;
  locality: string;
  region: string;
  postcode: string;
  country: string;
};

export function isAddressField(field: FormField) {
  return field.type === "address" || field.key === "address";
}
