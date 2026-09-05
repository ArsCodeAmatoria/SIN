import { cloneBlock, createBlock } from "./blocks";
import { FORM_CONTROL, nid, type BlockType, type FormGroup, type FormDef } from "./types";

export function assembleForm(opts: {
  id: string;
  title: string;
  number: string;
  description?: string;
  group?: FormGroup;
  blocks: { type: BlockType; inspectionItems?: string[] }[];
}): FormDef {
  return {
    id: opts.id,
    title: opts.title,
    description: opts.description,
    number: opts.number,
    version: FORM_CONTROL.revision,
    revision: FORM_CONTROL.revision,
    effective: FORM_CONTROL.effective,
    review: FORM_CONTROL.review,
    owner: FORM_CONTROL.owner,
    approvedBy: FORM_CONTROL.approvedBy,
    current: true,
    source: "template",
    group: opts.group ?? "Daily",
    blocks: opts.blocks.map((b) => createBlock(b.type, b.inspectionItems)),
  };
}

export function blankForm(): FormDef {
  return assembleForm({
    id: nid("form"),
    title: "UNTITLED FORM",
    number: "PROVEN-FRM-DRAFT",
    description: "Assembled from Proven Safety Blocks.",
    blocks: [{ type: "worker" }, { type: "project" }, { type: "signature" }],
  });
}

export function cloneForm(form: FormDef, title?: string): FormDef {
  return {
    ...form,
    id: nid("form"),
    title: title ?? `${form.title} (COPY)`,
    source: "local",
    current: false,
    blocks: form.blocks.map((block) => cloneBlock(block)),
  };
}

/** Rebuild field ids after a block id change so fill-out keys stay unique. */
export function retargetBlock(block: FormDef["blocks"][number]) {
  const id = nid(block.type);
  return {
    ...block,
    id,
    fields: block.fields.map((f) => ({ ...f, id: `${id}_${f.key}` })),
  };
}
