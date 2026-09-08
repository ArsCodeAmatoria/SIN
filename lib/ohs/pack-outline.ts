import { SAFETY, SAFETY_GROUPS } from "@/lib/safety";

export const PACK_ROOT = "PROVEN-OHS";
export const PACK_FILENAME = "PROVEN-OHS-Rev01.zip";

export type PackNode = {
  name: string;
  note?: string;
  children?: PackNode[];
};

export function sectionFolder(num: string, title: string) {
  const slug = title
    .replace(/[+]/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${num}-${slug}`;
}

export function groupFolder(label: string) {
  return label.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function sectionPath(slug: string) {
  const section = SAFETY.find((item) => item.slug === slug);
  if (!section) return `${PACK_ROOT}/99`;
  return `${PACK_ROOT}/${sectionFolder(section.num, section.title)}`;
}

export function ohsPackOutline(): PackNode[] {
  const groups = SAFETY_GROUPS.map((group) => ({
    name: group.label,
    children: group.slugs.map((slug) => {
      const section = SAFETY.find((item) => item.slug === slug)!;
      const folder = sectionFolder(section.num, section.title);
      const extra: PackNode[] = [{ name: `${folder}.pdf`, note: "Section" }];
      if (slug === "ohs-policies") {
        extra.push(
          ...["THE-COMPANY", "THE-LIFT", "THE-CREW", "AFTER"].map((name) => ({
            name,
            note: "Policies",
          })),
        );
      }
      if (slug === "swp-library") extra.push({ name: "CRANE / SIGNALS / RIGGING / THE-PLAN" });
      if (slug === "jha-library") extra.push({ name: "CRANE / SIGNALS / RIGGING / THE-PLAN" });
      if (slug === "sjp-library") extra.push({ name: "FLYTABLE / LOADING-PLATFORM" });
      if (slug === "safety-forms") extra.push({ name: "Daily / Lifting / Incident / Worker / Inspection / Binder" });
      if (slug === "whmis-sds") {
        extra.push({ name: "Field-cards" }, { name: "Manufacturer-SDS" });
      }
      if (slug === "inspections") extra.push({ name: "Crane-cards" });
      if (slug === "crane-binders") {
        extra.push({ name: "Tower" }, { name: "Self-erect" }, { name: "Mobile" });
      }
      if (slug === "incident-reporting") extra.push({ name: "Reports" });
      return { name: folder, children: extra };
    }),
  }));

  return [
    {
      name: PACK_ROOT,
      children: [
        {
          name: "00-START-HERE",
          children: [
            { name: "00-Read-me.pdf" },
            { name: "00-Table-of-Contents.pdf" },
            { name: "00-Binder-tab-inserts.pdf" },
            { name: "00-Folder-structure.txt" },
            { name: "00-WHMIS-manufacturer-SDS-index.pdf" },
          ],
        },
        ...groups,
      ],
    },
  ];
}

export function packFolderTreeText() {
  const lines: string[] = [];
  function walk(nodes: PackNode[], depth: number) {
    for (const node of nodes) {
      lines.push(`${"  ".repeat(depth)}${node.name}${node.note ? `    # ${node.note}` : ""}`);
      if (node.children) walk(node.children, depth + 1);
    }
  }
  walk(ohsPackOutline(), 0);
  lines.push("");
  lines.push("Tabs 01-22 match Proven program sections.");
  lines.push("Print 00-Binder-tab-inserts.pdf and tape onto dividers.");
  lines.push("Manufacturer SDS are examples. The can on this machine wins.");
  lines.push("Current controlled version: https://sin.ae.org/safety");
  return lines.join("\n");
}
