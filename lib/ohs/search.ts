import type { CatalogHit } from "./catalog";

export function catalogTypeLabel(kind: string): string {
  return (
    {
      SECTION: "STANDARD",
      POLICY: "POLICY",
      SWP: "SWP",
      JHA: "JHA",
      SJP: "SJP",
      FORM: "FORM",
      BINDER: "BINDER",
      CRANE: "CRANE",
      SDS: "SDS",
      REPORT: "REPORT",
    }[kind] ?? kind
  );
}

/** Extra tokens a worker might type for a given document. */
export const SEARCH_ALIASES: Record<string, string> = {
  "/safety/swp/weather-and-wind":
    "wind lightning thunder weather abort weathervane storm",
  "/safety/swp/working-near-powerlines":
    "powerline power line mad 30m33 overhead voltage hydro approach",
  "/safety/form/powerline-30m33":
    "powerline power line mad 30m33 overhead hydro assurance",
  "/safety/form/crane-pre-use":
    "hook inspection preuse pre-use daily walkaround operator",
  "/safety/form/tower-pre-use":
    "tower luffer z248 weekly monthly hook inspection pre-use",
  "/safety/form/flha": "flra hazard assessment this shift start",
  "/safety/pack": "zip download binder tabs sds whmis print pdf program",
  "/safety/form/lift-plan": "critical weather abort radius chart",
  "/safety/form/critical-lift-plan": "weather abort tandem plant public ego",
  "/safety/form/rigging-inspection-form":
    "hook sling shackle hardware wll tag out of service",
  "/safety/form/toolbox-meeting": "brief crew talk start of shift",
  "/safety/rigging": "hook sling hitch wll hardware choke basket",
  "/safety/crane-operations":
    "weather wind powerline chart operator inspection pre-use",
  "/safety/hazard-assessment": "flha walk hazards stop criteria",
  "/safety/policy/right-to-refuse": "refuse stop work unsafe refusal",
  "/safety/incident-reporting": "incident near miss report accident",
  "/safety/emergency-response": "erp muster rescue tharrp",
  "/safety/fall-protection": "height harness lanyard edge",
  "/sling": "theta tension wll angle height length sin",
  "/safety/swp/hooks": "hook throat latch wll hardware",
  "/safety/swp/sling-selection": "sling wll hitch angle choke basket",
  "/safety/swp/rigging-inspection": "sling hook hardware removal damaged",
  "/safety/swp/removal-of-damaged-rigging": "hook damaged out of service tag",
};

const QUERY_EXPAND: Record<string, string[]> = {
  wind: ["wind", "lightning", "weather", "abort", "thunder"],
  lightning: ["lightning", "wind", "weather", "thunder"],
  weather: ["weather", "wind", "lightning", "abort"],
  powerline: ["powerline", "power", "mad", "30m33", "overhead", "voltage"],
  powerlines: ["powerline", "power", "mad", "30m33", "overhead"],
  mad: ["mad", "powerline", "30m33", "approach"],
  hook: ["hook", "rigging", "hardware", "pre-use", "inspection"],
  hooks: ["hook", "rigging", "hardware"],
  sling: ["sling", "rigging", "wll", "hitch", "angle"],
  slings: ["sling", "rigging", "wll"],
  monthly: ["monthly", "maintenance", "tower"],
  tower: ["tower", "z248", "luffer", "pre-use"],
  refuse: ["refuse", "stop", "unsafe", "rights"],
  heat: ["heat", "weather", "occupational"],
  flha: ["flha", "flra", "hazard", "shift"],
  incident: ["incident", "near", "miss", "report"],
  binder: ["binder", "tower", "self-erect", "mobile"],
};

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9+]+/i)
    .filter((part) => part.length >= 2);
}

function expandQuery(query: string): string[] {
  const tokens = tokenize(query);
  const extra = tokens.flatMap((token) => QUERY_EXPAND[token] ?? [token]);
  return [...new Set([...tokens, ...extra])];
}

function haystack(item: CatalogHit): string {
  const aliases = SEARCH_ALIASES[item.href] ?? "";
  return `${item.kind} ${item.typeLabel} ${item.number} ${item.title} ${item.summary} ${aliases}`.toLowerCase();
}

function score(item: CatalogHit, raw: string, terms: string[]): number {
  const title = item.title.toLowerCase();
  const number = item.number.toLowerCase();
  const aliases = (SEARCH_ALIASES[item.href] ?? "").toLowerCase();
  const text = haystack(item);
  let n = 0;
  if (title.includes(raw) || number.includes(raw)) n += 80;
  if (aliases.includes(raw)) n += 40;
  for (const term of terms) {
    if (title.includes(term)) n += 24;
    else if (number.includes(term)) n += 18;
    else if (aliases.includes(term)) n += 14;
    else if (text.includes(term)) n += 8;
  }
  return n;
}

export function searchCatalog(catalog: CatalogHit[], query: string, limit = 16): CatalogHit[] {
  const raw = query.trim().toLowerCase();
  if (raw.length < 2) return [];
  const terms = expandQuery(raw);
  return catalog
    .map((item) => ({ item, n: score(item, raw, terms) }))
    .filter((row) => row.n > 0)
    .sort((a, b) => b.n - a.n || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map((row) => row.item);
}
