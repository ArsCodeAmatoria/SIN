import type { DocControl, DocLink, DocTable, RoleLine } from "./types";

export const OHS_META = {
  revision: "01",
  effective: "2026-09-01",
  owner: "Proven",
  approvedBy: "Proven",
  review: "2027-09-01",
} as const;

export function control(number: string, title: string): DocControl {
  return { number, title, ...OHS_META };
}

export const CREW_ROLES: RoleLine[] = [
  {
    title: "This program",
    body: "The published method for the work. Stop-work is named in it. It does not own the site.",
  },
  {
    title: "Supervisor",
    body: "Confirms the plan, the crew, the zone and the stop criteria. Owns whether the hook moves.",
  },
  {
    title: "Crane operator",
    body: "Runs only the machine they are competent on, to the chart, after inspection. Stops on an unclear signal or a broken plan.",
  },
  {
    title: "Rigger",
    body: "Selects, inspects and applies the hitch. Does not guess weight, centre of gravity or angle.",
  },
  {
    title: "Signalperson",
    body: "One set of hands on the crane. Holds the zone. STOP means stop.",
  },
  {
    title: "Worker",
    body: "Works to this program and to site rules — whichever is stricter. Uses the three rights. Reports damaged gear.",
  },
];

export const LIFT_PPE = [
  "Hard hat",
  "CSA-grade footwear",
  "High-visibility clothing",
  "Eye protection",
  "Task-rated gloves",
  "Hearing protection where required",
  "Fall protection where the work exposes a fall",
];

export const LIFT_REFS = [
  "Workers Compensation Act s. 21 — known or reasonably foreseeable hazards; instruction and supervision",
  "OHS Regulation (B.C. Reg. 296/97, in force 15 Apr 1998) Part 3 — OHS program, instruction, inspections",
  "OHS Regulation Part 4 s. 4.13 — risk assessment where rescue or evacuation may arise",
  "OHS Regulation Part 8 — PPE; headwear CSA Z94.1-05 or Z94.1-15",
  "OHS Regulation Part 11 — fall protection",
  "OHS Regulation Part 14 — Cranes and Hoists",
  "14.2(5) — CSA Z150-1998, or ASME B30.5-2004, or ASME B30.22-2005 (articulating boom)",
  "14.2(6) — CSA Z248-2004 for tower, hammerhead and self-erecting tower cranes",
  "14.35 pre-use inspection · 14.36 load weight · 14.42.1 critical lift · 14.44 loads over work areas · 14.45 unattended loads · 14.47–14.49 signals",
  "OHS Regulation Part 15 — Rigging",
  "Manufacturer load chart, manual and configuration limits",
  "Site lift plan, FLHA and site rules where stricter",
];

/** WorkSafeBC Table 19-1A. BC Hydro publishes the same distances for work near their system. */
export const MAD_APPROACH: DocTable = {
  caption: "TABLE 19-1A — LIMITS OF APPROACH. INTACT LINES. PHASE TO PHASE.",
  columns: ["VOLTAGE", "METRES", "FEET"],
  rows: [
    ["Under 750 V — service / secondary (BC Hydro)", "1", "4"],
    ["Over 750 V to 75 kV", "3", "10"],
    ["Over 75 kV to 250 kV", "4.5", "15"],
    ["Over 250 kV to 550 kV", "6", "20"],
  ],
};

export const MAD_UNKNOWN: DocTable = {
  caption: "VOLTAGE NOT VERIFIED — UNTIL BC HYDRO NAMES IT.",
  columns: ["LINE", "METRES", "FEET"],
  rows: [
    ["Distribution", "3", "10"],
    ["Transmission", "6", "20"],
  ],
};

export const MAD_DOWN: DocTable = {
  caption: "DOWNED, DAMAGED, OR CONTACT. STAY BACK. CALL 911.",
  columns: ["CONDITION", "METRES", "FEET"],
  rows: [
    ["Fallen line or equipment contact — BC Hydro 3 keys", "10", "33"],
    ["Downed transmission or manhole — BC Hydro overhead-system", "33", "108"],
  ],
};

export const MAD_TABLES: DocTable[] = [MAD_APPROACH, MAD_UNKNOWN, MAD_DOWN];

export const MAD_LINKS: DocLink[] = [
  {
    href: "https://www.bchydro.com/safety-outages/electrical-safety/worker-training.html",
    label: "BC HYDRO — WORKING NEAR POWER LINES →",
    note: "Express Connect 1 877 520 1355. Table 19-1A. 30M33 if you cannot hold MAD.",
    external: true,
  },
  {
    href: "https://www.worksafebc.com/en/about-us/news-events/campaigns/planning-work-around-high-voltage-equipment",
    label: "WORKSAFEBC — PLAN FOR 10 →",
    external: true,
  },
  {
    href: "https://www.worksafebc.com/en/resources/health-safety/forms/assurance-of-compliance-with-occupational-health-and-safety-regulation-part-19-form-30m33?lang=en",
    label: "WORKSAFEBC FORM 30M33 →",
    external: true,
  },
];

export const MAD_REFS = [
  "OHS Regulation Part 19 s. 19.24.1 and Table 19-1A — minimum approach distance for persons, tools, machines, material and equipment",
  "19.24.1(2) — tower crane zone-limiting device if practicable",
  "Form 30M33 — assurance in writing if MAD cannot be maintained. Only the coded WorkSafeBC form. Part 19.",
  "14.52.1 — high voltage electrical equipment and cranes",
  "BC Hydro Working near power lines — same Table 19-1A. Express Connect 1 877 520 1355.",
  "BC Hydro: unknown voltage — 3 m distribution, 6 m transmission, until they verify.",
  "BC Hydro: fallen line or contact — 10 m, call 911. Downed transmission or manhole — 33 m.",
];

export const LIGHTNING_RULE: DocTable = {
  caption: "LIGHTNING — STOP. THUNDER IS THE TRIGGER. DO NOT COUNT TO 30.",
  columns: ["TRIGGER", "ACTION"],
  rows: [
    ["Thunder heard, or lightning seen", "Stop the lift. Land. Manufacturer shutdown. Shelter. Do not wait for a 30-second count."],
    ["30 minutes after the last rumble", "Resume clock. Then inspect. Manufacturer weather limits still apply."],
    ["Strike, or suspected strike, on the crane", "Misadventure. Crane down until a professional engineer certifies it. 14.16.1."],
  ],
};

export const LIGHTNING_BANG: DocTable = {
  caption: "FLASH-TO-BANG — CITE ONLY. SOUND ~300 m/s. NOT A REASON TO KEEP LIFTING.",
  columns: ["SECONDS AFTER FLASH", "~DISTANCE", "STOP"],
  rows: [
    ["Thunder — any rumble", "Striking distance", "ECCC: if you hear it, you are in range. Stop."],
    ["10 s", "~3 km", "Already too close."],
    ["30 s", "~10 km", "Old 30/30 first number. Environment Canada dropped it in 2010. Do not wait for this."],
  ],
};

export const WIND_TOWER: DocTable = {
  caption: "TOWER CRANE WIND AND COLD — PART 14. OEM STILL WINS IF LOWER.",
  columns: ["RULE", "REG"],
  rows: [
    ["Anemometer on the crown, apex or cab. Readout at the controls.", "14.92(1)(2)"],
    ["Stop when a load cannot be handled safely because of wind.", "14.92(3)"],
    ["No manufacturer wind number: 50 km/h, or less if the load is a sail.", "14.92(4)"],
    ["Erect, operate or dismantle only at or below the manufacturer upper limit.", "14.92(6)"],
    ["Stop below −18 °C, or as the manufacturer or engineer specifies.", "14.93"],
  ],
};

export const LIGHTNING_TABLES: DocTable[] = [LIGHTNING_RULE, LIGHTNING_BANG, WIND_TOWER];

export const LIGHTNING_LINKS: DocLink[] = [
  {
    href: "https://www.canada.ca/en/environment-climate-change/services/lightning/safety/overview.html",
    label: "ECCC — WHEN THUNDER ROARS, GO INDOORS →",
    note: "Official Canada. Wait 30 minutes after the last rumble. The first 30 of 30/30 is not the stop.",
    external: true,
  },
  {
    href: "https://www.ccohs.ca/oshanswers/safety_haz/weather/lightning.html",
    label: "CCOHS — WEATHER, LIGHTNING →",
    note: "If you can hear thunder, you are within striking distance. Shelter 30 minutes after last thunder.",
    external: true,
  },
  {
    href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
    label: "WORKSAFEBC — PART 14 CRANES AND HOISTS →",
    note: "14.2 manufacturer. 14.16.1 misadventure. 14.92 wind. 14.93 temperature.",
    external: true,
  },
  {
    href: "https://www.technicalsafetybc.ca/",
    label: "TECHNICAL SAFETY BC →",
    note: "Electrical Safety Regulation / BC Electrical Code — crane power, earthing, lightning-protection hardware. Owner. Not a 30/30 crane rule.",
    external: true,
  },
];

export const LIGHTNING_REFS = [
  "Environment and Climate Change Canada — When thunder roars, go indoors. If you hear thunder you are within striking distance. Wait at least 30 minutes after the last rumble.",
  "ECCC dropped the first 30 of the 30/30 rule in 2010. People waited until a 30-second flash-to-bang. That is too late. Do not count to 30 before stopping.",
  "CCOHS Weather — Lightning. ~300 m per second flash-to-bang. No safe place outdoors. Fully enclosed building with wiring and plumbing, or a hard-top metal vehicle.",
  "Workers Compensation Act s. 21 — known or reasonably foreseeable hazards. Lightning on a crane is foreseeable.",
  "OHS Regulation 14.2 — operate as specified by the manufacturer or a professional engineer.",
  "14.12 — manufacturer’s manual reasonably accessible. Weather shutdown as that manual.",
  "14.16.1 — misadventure includes any circumstance that may impair safe operation. A lightning strike is that. Crane down until a professional engineer certifies it.",
  "14.34(2) — operator familiar with operating instructions. 14.37.1 — full control while the equipment is in use.",
  "14.48 — atmospheric conditions that make hand signals hazardous. Radios or stop.",
  "14.92 — tower anemometer, stop for wind, 50 km/h if the manufacturer is silent. 14.93 — stop below −18 °C unless the manufacturer or engineer says otherwise.",
  "14.2(5) CSA Z150-1998 / ASME B30.5-2004. 14.2(6) CSA Z248-2004 for tower, hammerhead and self-erect.",
  "Technical Safety BC — Electrical Safety Regulation and BC Electrical Code. Power supply, earthing and lightning-protection hardware on the electrical installation belong to the owner. TSBC does not publish a 30/30 crane rule.",
];

export const FLYTABLE_REFS = [
  "WorkSafeBC Flytable Safety (Jul 2025) — drop, roll, fly, land. Critical lift.",
  "BC Crane Safety, 14 Aug 2025 — New WorkSafeBC Video: Flytable Lift Safety",
  "OHS Regulation Part 20 — formwork and falsework. Host / prime duty. This procedure does not write the cycling carpentry.",
  "Manufacturer cycle and shop drawing for this table system — at the lift. Pick points only as the drawing names.",
];

export const FLYTABLE_LINKS: DocLink[] = [
  {
    href: "https://www.worksafebc.com/en/resources/health-safety/videos/flytable-safety",
    label: "WORKSAFEBC — FLYTABLE SAFETY VIDEO →",
    external: true,
  },
  {
    href: "https://bccranesafety.ca/new-worksafebc-video-flytable-lift-safety/",
    label: "BC CRANE SAFETY — FLYTABLE LIFT SAFETY →",
    external: true,
  },
  {
    href: "https://www.efcoforms.com/products/shoring/e-z-fly-tables/",
    label: "EFCO E-Z FLY (OEM PAGE) →",
    note: "Cite. The drawing on this table wins.",
    external: true,
  },
  {
    href: "https://www.doka.com/us/system-groups/doka-floor-systems/tableforms/dokatrusstable/DokaTruss_table",
    label: "DOKA DOKATRUSS TABLE (OEM PAGE) →",
    external: true,
  },
  {
    href: "https://aluma.com/aluma-truss-table-shoring",
    label: "ALUMA TRUSS (OEM PAGE) →",
    note: "User manuals from the manufacturer. Do not copy a hire-yard note as this site’s method.",
    external: true,
  },
];

export const FLYTABLE_ROLES: RoleLine[] = [
  ...CREW_ROLES,
  {
    title: "Formwork supervisor (host)",
    body: "Drops, rolls and lands the table to the manufacturer cycle and the engineered drawing. The crane crew does not lower jacks or invent a cycling sequence.",
  },
  {
    title: "Prime contractor",
    body: "Coordinates floors, drawings, inspections and exclusion. Not a spectator. WorkSafeBC names this duty on flytable work.",
  },
];

export const PLATFORM_REFS = [
  "Doka loading platform User Information — four welded lifting points, Doka 4-part chain 3.20 m, empty only, no persons, sling angle β ≤ 30°, reposition wind 72 km/h, one platform at a time.",
  "Conquip CantiDeck User Guide — four lifting points, 4-leg chain, tag lines opposite corners, do not lift until props are released, disconnect after screw jacks tight, WLL on the type plate.",
  "Preston SuperDeck — retractable drawer. Install is a licensed crane lift. Daily extend / retract is host operation. No crane licence to roll it. 604 817 DECK.",
  "PERI RCS MP material platform — crane-set. Anchors or MULTIPROP between slabs. Host. User information for this serial.",
  "DOC loading platform — powered retractable drawer. Install / relocate by crane. Daily extend / retract is host, including the 110 V supply.",
  "14.36 load weight · 14.44 loads over work areas · 14.47–14.49 signals · Part 11 at the slab edge",
  "Manufacturer user information for this serial at the lift. Pick points only as the OEM names. Fly weight is empty dead weight plus rigging — not the service WLL.",
];

export const PLATFORM_LINKS: DocLink[] = [
  {
    href: "https://www.doka.com/en/solutions/products/loading-platform/index",
    label: "DOKA LOADING PLATFORM (OEM PAGE) →",
    note: "3.0 t and 5.0 t. Cite. The user information for this serial wins.",
    external: true,
  },
  {
    href: "https://direct.doka.com/_ext/downloads/downloadcenter/999821902_2025_10_online.pdf",
    label: "DOKA LOADING PLATFORM 5.0 t — USER INFORMATION →",
    external: true,
  },
  {
    href: "https://direct.doka.com/_ext/downloads/downloadcenter/999822702_2024_10_online.pdf",
    label: "DOKA LOADING PLATFORM 3.0 t — USER INFORMATION →",
    external: true,
  },
  {
    href: "https://www.prestonrentalsgroup.ca/product-category/superdeck/",
    label: "PRESTON SUPERDECK (CANADA) →",
    note: "Retractable. Op Fam from Preston. Install is a licensed lift.",
    external: true,
  },
  {
    href: "https://www.prestonrentalsgroup.ca/frequently-asked-questions-faqs-about-the-superdeck/",
    label: "SUPERDECK FAQS →",
    external: true,
  },
  {
    href: "https://cqegroup.com/us/cantideck/",
    label: "CONQUIP CANTIDECK (OEM PAGE) →",
    external: true,
  },
  {
    href: "https://cqegroup.com/uk/wp-content/uploads/sites/5/2025/12/CantiDeck-Fixed-Flush-2025-User-Guide-Issue-7.pdf",
    label: "CANTIDECK FIXED FLUSH — USER GUIDE →",
    external: true,
  },
  {
    href: "https://cqegroup.com/uk/wp-content/uploads/sites/5/2025/12/CantiDeck-SUP-User-Guide-Issue-5.pdf",
    label: "CANTIDECK SUPER ROLLER — USER GUIDE →",
    external: true,
  },
  {
    href: "https://cn.peri.com/products/rcs-mp-material-platform.html",
    label: "PERI RCS MP MATERIAL PLATFORM →",
    note: "Crane-set. Anchors or MULTIPROP — host. User information for this serial.",
    external: true,
  },
  {
    href: "https://www.dochoist.com/loading-platforms/",
    label: "DOC LOADING PLATFORMS →",
    note: "Powered retractable. Install is a crane lift. Daily extend is host.",
    external: true,
  },
];

export const PLATFORM_CITE: DocTable = {
  caption: "CITE — TYPICAL SYSTEMS. THIS SERIAL AND THE TYPE PLATE WIN.",
  columns: ["SYSTEM", "KIND", "SERVICE / WLL", "WHAT THE CRANE FLIES"],
  rows: [
    ["Doka 3.0 t — 2.45 × 3.20 m", "Fixed cantilever", "3 000 kg", "Empty. Dead weight ~1 580 kg + rigging. Not the service load."],
    ["Doka 5.0 t — 2.95 × 4.50 m", "Fixed cantilever", "5 000 kg", "Empty. Dead weight ~2 670 kg + rigging."],
    ["Preston SuperDeck 2.2 / 2.6 / 3.2 / 4.2 m", "Retractable drawer", "5 000 kg typical", "Empty. Host extends and retracts. Install is the crane lift."],
    ["Conquip CantiDeck Fixed Flush", "Fixed cantilever", "Type plate — often 5 000 kg", "Empty. Props released before any hoist."],
    ["Conquip CantiDeck Super Roller", "Retractable", "Type plate", "Empty. Stacked floors. Flush when retracted."],
    ["PERI RCS MP 375 / 550", "Material platform", "This serial", "Empty. Host anchors or MULTIPROP."],
    ["DOC", "Powered retractable", "4 t", "Empty. Host 110 V. Install / relocate by crane."],
  ],
};

export const PLATFORM_HITCH: DocTable = {
  caption: "HITCH RULES THAT REPEAT. OEM USER INFORMATION STILL WINS.",
  columns: ["RULE", "WHO SAYS IT"],
  rows: [
    ["Four designated lifting points. No improvised picks.", "Doka. CantiDeck."],
    ["4-leg chain as the OEM. Doka: 3.20 m, β ≤ 30°.", "Doka. CantiDeck."],
    ["Empty only. No material. No persons.", "Doka. CantiDeck. SuperDeck install."],
    ["Do not lift until props / clamps are released.", "CantiDeck. Doka reposition."],
    ["Tag lines. Doka: one. CantiDeck: front and rear, opposite corners.", "Doka. CantiDeck."],
    ["One platform at a time.", "Doka."],
    ["Reposition wind — Doka 72 km/h, or the lower of crane / this SJP.", "Doka. Chart."],
    ["Disconnect only after the host says landed — jacks tight, rails pinned.", "CantiDeck. Doka."],
    ["Daily SuperDeck / Super Roller / DOC extend and retract is host. The crane is not hooked.", "Preston FAQ. CantiDeck. DOC."],
  ],
};

export const PLATFORM_TABLES: DocTable[] = [PLATFORM_CITE, PLATFORM_HITCH];

export const PLATFORM_ROLES: RoleLine[] = [
  ...CREW_ROLES,
  {
    title: "Platform supervisor (host)",
    body: "Rails, props, clamps or through-slab anchors to the OEM and the engineered drawing. The crane crew does not invent a propping sequence. Says when the deck is landed and in service.",
  },
  {
    title: "Prime contractor",
    body: "Coordinates floors, exclusion, and who may land on the deck. Not a spectator.",
  },
];
