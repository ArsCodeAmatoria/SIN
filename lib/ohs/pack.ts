import { readFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { emptyValues, FORM_TEMPLATES, formToPdf } from "@/lib/form-builder";
import { SAFETY } from "@/lib/safety";
import { BINDERS, binderGroups } from "./binders";
import { CRANES } from "./cranes";
import { FORMS } from "./forms";
import { JHAS } from "./jhas";
import {
  groupFolder,
  PACK_ROOT,
  packFolderTreeText,
  sectionFolder,
  sectionPath,
} from "./pack-outline";
import { POLICIES } from "./policies";
import { REPORTS } from "./reports";
import { SDS } from "./sds";
import { SJPS } from "./sjps";
import { SWPS } from "./swps";
import {
  jhaGroup,
  policyGroup,
  sjpGroup,
  swpGroup,
} from "./catalog";
import {
  binderChecklistToPdf,
  binderTabMapToPdf,
  craneToPdf,
  fileStub,
  jhaToPdf,
  manufacturerSdsIndexToPdf,
  policyDocToPdf,
  programTabInsertsToPdf,
  readmeToPdf,
  reportToPdf,
  sdsToPdf,
  sectionToPdf,
  sjpToPdf,
  swpToPdf,
  tocToPdf,
} from "./docs-pdf";
import { MANUFACTURER_SDS } from "./sds-manufacturer";

export { PACK_FILENAME, PACK_ROOT } from "./pack-outline";

const START = `${PACK_ROOT}/00-START-HERE`;

type PackFile = { path: string; bytes: Uint8Array };

async function publicBytes(rel: string) {
  return readFile(path.join(process.cwd(), "public", rel));
}

export async function buildOhsPack(): Promise<{ bytes: Uint8Array; files: string[] }> {
  const files: PackFile[] = [];
  const tree = packFolderTreeText();

  files.push({ path: `${START}/00-Read-me.pdf`, bytes: await readmeToPdf() });
  files.push({ path: `${START}/00-Binder-tab-inserts.pdf`, bytes: await programTabInsertsToPdf() });
  files.push({ path: `${START}/00-WHMIS-manufacturer-SDS-index.pdf`, bytes: await manufacturerSdsIndexToPdf() });
  files.push({
    path: `${START}/00-Folder-structure.txt`,
    bytes: new TextEncoder().encode(tree),
  });
  files.push({ path: `${START}/00-Table-of-Contents.pdf`, bytes: await tocToPdf(tree) });

  for (const section of SAFETY) {
    const folder = sectionPath(section.slug);
    files.push({
      path: `${folder}/${sectionFolder(section.num, section.title)}.pdf`,
      bytes: await sectionToPdf(section),
    });
  }

  const policyRoot = sectionPath("ohs-policies");
  for (const doc of POLICIES) {
    files.push({
      path: `${policyRoot}/${groupFolder(policyGroup(doc.slug))}/${fileStub(doc.number, doc.title)}`,
      bytes: await policyDocToPdf(doc),
    });
  }
  try {
    files.push({
      path: `${policyRoot}/${groupFolder("AFTER")}/bccsa-injury-management.zip`,
      bytes: await publicBytes("downloads/injury-management.zip"),
    });
  } catch {
    /* pack still ships without the BCCSA zip */
  }

  const swpRoot = sectionPath("swp-library");
  for (const doc of SWPS) {
    files.push({
      path: `${swpRoot}/${groupFolder(swpGroup(doc.slug))}/${fileStub(doc.number, doc.title)}`,
      bytes: await swpToPdf(doc),
    });
  }

  const jhaRoot = sectionPath("jha-library");
  for (const doc of JHAS) {
    files.push({
      path: `${jhaRoot}/${groupFolder(jhaGroup(doc.slug))}/${fileStub(doc.number, doc.title)}`,
      bytes: await jhaToPdf(doc),
    });
  }

  const sjpRoot = sectionPath("sjp-library");
  for (const doc of SJPS) {
    files.push({
      path: `${sjpRoot}/${groupFolder(sjpGroup(doc.slug))}/${fileStub(doc.number, doc.title)}`,
      bytes: await sjpToPdf(doc),
    });
  }

  const formRoot = sectionPath("safety-forms");
  for (const doc of FORMS) {
    const template = FORM_TEMPLATES.find((item) => item.id === doc.slug);
    const bytes = template
      ? await formToPdf(template, emptyValues())
      : await reportToPdf({
          slug: doc.slug,
          title: doc.title,
          number: doc.number,
          summary: doc.summary,
        });
    files.push({
      path: `${formRoot}/${doc.group}/${fileStub(doc.number, doc.title)}`,
      bytes,
    });
  }

  const sdsRoot = sectionPath("whmis-sds");
  for (const doc of SDS) {
    files.push({
      path: `${sdsRoot}/Field-cards/${fileStub(doc.number, doc.title)}`,
      bytes: await sdsToPdf(doc),
    });
  }
  files.push({
    path: `${sdsRoot}/Manufacturer-SDS/00-Read-this-first.pdf`,
    bytes: await manufacturerSdsIndexToPdf(),
  });
  for (const sheet of MANUFACTURER_SDS) {
    const field = SDS.find((item) => item.slug === sheet.fieldSlug);
    const folder = field
      ? field.title.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      : groupFolder(sheet.fieldSlug);
    try {
      files.push({
        path: `${sdsRoot}/Manufacturer-SDS/${folder}/${sheet.file}`,
        bytes: await publicBytes(`downloads/sds/${sheet.file}`),
      });
    } catch {
      /* skip missing manufacturer file */
    }
  }

  const inspectRoot = sectionPath("inspections");
  for (const doc of CRANES) {
    files.push({
      path: `${inspectRoot}/Crane-cards/${doc.family}/${fileStub(doc.number, doc.title)}`,
      bytes: await craneToPdf(doc),
    });
  }

  const reportRoot = sectionPath("incident-reporting");
  for (const doc of REPORTS) {
    files.push({
      path: `${reportRoot}/Reports/${fileStub(doc.number, doc.title)}`,
      bytes: await reportToPdf(doc),
    });
  }

  const binderRoot = sectionPath("crane-binders");
  for (const binder of BINDERS) {
    const folder =
      binder.kind === "tower" ? "Tower" : binder.kind === "self-erect" ? "Self-erect" : "Mobile";
    files.push({
      path: `${binderRoot}/${folder}/00-Working-copy-checklist.pdf`,
      bytes: await binderChecklistToPdf(binder),
    });
    files.push({
      path: `${binderRoot}/${folder}/00-What-files-in-each-tab.pdf`,
      bytes: await binderTabMapToPdf(binder),
    });
    const map = binderGroups(binder)
      .map((group) => {
        const items = group.items
          .map((item) => `  ${item.n}  ${item.title}  (${item.need})${item.formSlug ? `  form:${item.formSlug}` : ""}`)
          .join("\n");
        return `${group.group}\n${items}`;
      })
      .join("\n\n");
    files.push({
      path: `${binderRoot}/${folder}/00-Tab-list.txt`,
      bytes: new TextEncoder().encode(`${binder.title}\n\n${map}\n`),
    });
  }

  const zip = new JSZip();
  for (const file of files) zip.file(file.path, file.bytes);
  const bytes = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  return { bytes, files: files.map((file) => file.path) };
}
