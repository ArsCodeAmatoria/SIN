import {
  nid,
  type BlockType,
  type FormField,
  type SafetyBlock,
} from "./types";

const RISK = ["Low", "Medium", "High"];
const HITCH = ["Vertical", "Choker", "Basket", "Other"];
const SLING = ["Wire rope", "Synthetic", "Chain", "Other"];
const POSITION = [
  "Crane operator",
  "Rigger",
  "Signalperson",
  "Supervisor",
  "Other",
];

function fields(
  blockId: string,
  defs: Omit<FormField, "id">[]
): FormField[] {
  return defs.map((d) => ({ ...d, id: `${blockId}_${d.key}` }));
}

export const BLOCK_CATALOG: { type: BlockType; title: string; blurb: string }[] =
  [
    { type: "worker", title: "Worker", blurb: "Name, ID, position, supervisor" },
    { type: "project", title: "Project", blurb: "Client, site, date, time" },
    { type: "task", title: "Task", blurb: "What the lift is" },
    { type: "crane", title: "Crane", blurb: "Machine, chart, radius" },
    { type: "load", title: "Load", blurb: "Weight, COG, pick points" },
    { type: "rigging", title: "Rigging", blurb: "Slings, hitch, WLL" },
    { type: "hazard", title: "Hazard", blurb: "Hazard, consequence, risk" },
    { type: "control", title: "Control", blurb: "Control, owner, residual" },
    { type: "inspection", title: "Inspection", blurb: "Pass / fail / N/A table" },
    { type: "ppe", title: "PPE", blurb: "Hard hat through fall protection" },
    { type: "communication", title: "Communication", blurb: "Hands, radio, spotter" },
    { type: "weather", title: "Weather", blurb: "Wind, visibility, limits" },
    { type: "powerlines", title: "Powerlines", blurb: "Voltage, MAD, utility" },
    { type: "emergency", title: "Emergency", blurb: "First aid, muster, rescue" },
    { type: "corrective", title: "Corrective Action", blurb: "Finding, owner, date" },
    { type: "log", title: "Shift Log", blurb: "Hours, lifts, work, defects" },
    { type: "incident", title: "Incident", blurb: "What happened, who was told" },
    { type: "comments", title: "Comments", blurb: "Free text" },
    { type: "signature", title: "Signature", blurb: "Typed or drawn" },
    { type: "photo", title: "Photo", blurb: "Attach to the record" },
  ];

export const CRANE_INSPECT_ITEMS = [
  "Structure, welds, pins",
  "Wire rope / hoist line",
  "Hook and latch",
  "Sheaves",
  "Outriggers / crawlers",
  "LMI / RCI",
  "Anti-two-block",
  "Brakes",
  "Tires / tracks",
  "Cab glass and wipers",
  "Horn / audible warning",
  "Fire extinguisher",
  "Load chart in cab",
  "Configuration matches chart",
];

export const RIGGING_INSPECT_ITEMS = [
  "Identification / WLL tag",
  "Wire rope slings",
  "Synthetic slings",
  "Chain slings",
  "Shackles and pins",
  "Hooks and latches",
  "Master links / rings",
  "Softeners / edge protection",
  "Below-the-hook devices",
  "Rejected gear isolated",
];

/** Lift area only. Part 3 workplace inspection, scoped to the crane. */
export const SITE_INSPECT_ITEMS = [
  "Supporting surface / bearing known",
  "Mats and outrigger pads",
  "Slope, washout or excavation nearby",
  "Overhead hazards (structures, lines)",
  "Exclusion zone established and held",
  "Access and egress to the crane",
  "Travel and swing path clear",
  "Other trades or public in the zone",
  "Signage and barriers",
  "Housekeeping in the lift area",
  "First aid and muster known",
  "Communication tested",
];

/** Frequent inspection. BC Crane Safety weekly; items that change with use. 14.13. */
export const WEEKLY_MAINT_ITEMS = [
  "Wire rope / hoist line (wires, kinks, birdcage, corrosion)",
  "Hook, latch, swivel",
  "Sheaves and guards",
  "Hydraulic leaks and hoses",
  "Pins, keepers, cotters",
  "Visible bolts and fasteners",
  "Outriggers / crawlers / tires",
  "Brakes — function",
  "Limit switches / anti-two-block",
  "LMI / RCI function",
  "Horn, lights, wipers",
  "Load chart and manuals in cab",
  "Fire extinguisher",
  "Fluid levels",
  "Grease / lubrication this interval",
  "Control response",
];

/** Periodic inspection. BC Crane Safety monthly; more thorough than weekly. 14.13. */
export const MONTHLY_MAINT_ITEMS = [
  "All running wire rope (full visible length)",
  "Boom / jib structure, welds, lattice",
  "Boom pins and wear pads",
  "Load block, sheaves, bearings",
  "Swing / slew mechanism",
  "Outrigger beams, jacks, holding valves",
  "Carrier frame, axles, tracks",
  "Brake test recorded",
  "LMI / RCI check per OEM procedure",
  "Safety device tests (ATB, boom up, overload)",
  "Hydraulic cylinders and holding valves",
  "Electrical, battery, grounding",
  "Counterweight locks / pins",
  "Cab, seat, windows, wipers",
  "Engine / power unit (leaks, belts, exhaust)",
  "Annual inspection / certificate current",
  "OEM service items due this month",
];

/** Tower / topless pre-use. CSA Z248, 14.35. Serial chart in the cab. */
export const TOWER_PREUSE_ITEMS = [
  "Serial, jib, reeving, mast, ballast match the chart in the cab",
  "Mast bolts, pins, ties, climbing frame if fitted",
  "Slew ring / weathervaning",
  "Jib, trolley, counter-jib",
  "Hoist rope and hook block",
  "Trolley rope / trolley",
  "Limit switches — hoist, trolley, slew",
  "Anti-two-block / overload / CCS alarms clear",
  "Anemometer",
  "Access, platforms, Cab-IN if fitted",
  "Electrical / earthing / aviation lights",
  "Out-of-service / weathervane set for this jib",
  "Wind against the OEM in-service limit",
  "Load chart and serial manuals in the cab",
];

/** Luffing jib (MRH hydraulic and MR rope). */
export const LUFFER_INSPECT_ITEMS = [
  "Serial, jib length, reeving, ballast match the chart in the cab",
  "Jib angle against this chart",
  "Hydraulic luffing — rams, hoses, tank, leaks, level (MRH)",
  "Luffing rope, cathead, luffing winch (MR)",
  "Jib pins, keepers, near-vertical clearance",
  "Hoist rope, hook block, anti-two-block",
  "Slew and weathervane radius for this jib",
  "Mast bolts, pins, ties",
  "Limits and overload — no bypass",
  "Anemometer",
  "Out-of-service jib position for this wind",
  "Load chart and serial manuals in the cab",
];

/** Self-erecting Hup / Igo / Igo T. */
export const SELF_ERECT_INSPECT_ITEMS = [
  "Serial, jib position, ballast match the chart in the cab",
  "Chassis, outriggers, jacks, pads — slope within OEM",
  "Ballast complete and locked",
  "Unfold complete — transport locks off, pins in",
  "Hoist rope, hook, trolley or luff as fitted",
  "Remote / cab — E-stop, function, alarms clear",
  "Limits and overload",
  "Power — voltage, phase, earthing",
  "Weathervane / out-of-service for this wind",
  "Access and exclusion at the base",
  "Load chart and serial manuals with the crane",
];

/** Frequent tower maintenance. 14.13. OEM interval wins if sooner. */
export const TOWER_WEEKLY_ITEMS = [
  "Hoist rope — visible length, spooling, end connections",
  "Trolley / luffing rope as fitted",
  "Hook, latch, swivel, block",
  "Sheaves and guards",
  "Hydraulic leaks — luffing rams, outriggers, winches",
  "Pins, keepers, visible bolts",
  "Slew function and weathervane",
  "Limits — hoist, trolley, slew, anti-two-block",
  "CCS / overload — function, no bypass",
  "Anemometer",
  "Mast ties and access",
  "Grease / lubrication this interval per OEM chart",
  "Load chart and manuals in the cab",
  "Defects and out-of-service decision",
];

/** Periodic tower maintenance. 14.13. */
export const TOWER_MONTHLY_ITEMS = [
  "All running rope — full visible length, including luffing line on MR",
  "Jib / counter-jib / cathead or ram attachments",
  "Mast structure, bolts, pins, ties, climbing frame",
  "Slew ring bolts — OEM torque / check method",
  "Winches — oil, brakes, spooling",
  "Hydraulic system — oil, filters, hoses, rams",
  "Electrical, earthing, aviation lights, Cab-IN",
  "Brake test recorded",
  "Safety device tests per OEM",
  "Ballast inventory against the chart",
  "Out-of-service / weathervane test",
  "Annual / comprehensive inspection current",
  "OEM lubrication and service items due this month",
  "Logbook complete",
];

export const MANAGEMENT_REVIEW_ITEMS = [
  "Incidents and investigations this period",
  "Inspection findings still open",
  "Corrective actions overdue",
  "Training and competency gaps",
  "Young / new worker orientations complete",
  "Worker concerns and refusals",
  "COR / audit actions",
  "First aid and emergency drills",
  "Objectives this period — met or not",
  "Program revisions required",
];

export const OHS_MEETING_ITEMS = [
  "Unsafe conditions named",
  "Unsafe practices named",
  "Incidents and near misses",
  "Inspection findings",
  "Worker concerns",
  "Actions from last meeting closed",
];

export const EMERGENCY_DRILL_ITEMS = [
  "First aid summoned",
  "Muster accounted for the crew",
  "Crane put in a safe condition",
  "Powerline contact procedure (if in the scenario)",
  "Fall rescue (if anyone is tied off on this workplace)",
  "Communications worked",
];

export const YOUNG_NEW_WORKER_ITEMS = [
  "Supervisor name and contact",
  "Rights and responsibilities, including refusal",
  "Company and workplace rules",
  "Hazards of this workplace",
  "Working alone",
  "Violence / bullying",
  "PPE for this lift",
  "First aid location and how to summon it",
  "Emergency procedures",
  "Task shown, not just told",
  "Proven shown",
  "WHMIS as it applies here",
  "Committee or worker-rep contact (if applicable)",
];

export const PRE_ASSEMBLY_ITEMS = [
  "Activity supervisor named and present",
  "Sequence and hold points agreed",
  "Exclusion zone and public interface",
  "Assist crane / mobile documentation if used",
  "Radios tested",
  "Weather abort named",
  "THARRP / high-angle rescue named",
  "NOP-TC submitted and posting location known",
];

export const POWERLINE_30M33_ITEMS = [
  "Work radius marked on the sketch",
  "Overhead lines in the radius identified",
  "Transformers identified",
  "Cable / buried hazards identified",
  "Voltage verified by the utility — not guessed",
  "Table 19-1A MAD for this voltage named in metres",
  "Unknown voltage treated as 3 m distribution / 6 m transmission",
  "Utility representative present for the discussion",
  "Coded 30M33 signed if limits of approach cannot be held",
  "Sheet posted on the site board",
];

export const RADIO_FREQ_ITEMS = [
  "52E73C submitted to WorkSafeBC",
  "Assigned channel posted in the cab",
  "Dedicated UHF — not a multi-channel construction radio for directing the hook",
  "Tested with the rigger before first load",
  "Spare batteries on site",
];

export const NOP_TC_ITEMS = [
  "Submitted at least two weeks before the activity",
  "Project type: Tower Crane",
  "Binder checklist attached as required",
  "Supervisor qualifications attached or registered",
  "Notice posted at the workplace",
  "Significant changes resubmitted",
];

export const OPERATOR_ORIENT_ITEMS = [
  "Chart in the cab matches this configuration",
  "Access and emergency descent known",
  "Radios and stop word",
  "30M33 / powerlines shown",
  "THARRP / how to summon rescue",
  "Wind and shutdown",
  "Who takes the crane out of service",
];

export const TOWER_REPORT_ITEMS = [
  "Standing configuration matches the chart",
  "Foundation / pads / ties as designed",
  "Limits and overload tested",
  "Anemometer and weathervane tested",
  "Aviation marking / lighting if required",
  "Deficiencies named",
  "Released to operate",
];

export const SUPERVISOR_QUAL_ITEMS = [
  "Qualified for this particular crane",
  "Directing this activity — not remote",
  "Qualifications on the NOP-TC",
  "Lead hand named if used",
];

export const CSA_COMPLIANCE_ITEMS = [
  "Z248-2004 named for this class",
  "Document covers this serial and configuration",
  "Original locatable",
];

export const THARRP_COVER_ITEMS = [
  "Portal request made by host / prime / owner",
  "Fire department named",
  "Operator knows how to summon them",
  "Formal survey on site if high-rise past 60 days",
  "Confirmed before the lift",
];

export const NAVCAN_ITEMS = [
  "Tip height and dates submitted",
  "NAV CANADA file number",
  "Transport Canada AAF if required",
  "Marking / lighting as directed",
  "NOTAM contact known",
];

export const POWER_SOURCE_ITEMS = [
  "Isolation point identified",
  "Lockout applied before bodies in the machine",
  "Earthing complete",
  "Who may make it live — named",
];

export const SITE_LAYOUT_ITEMS = [
  "Drawings match the standing crane",
  "Radius and height correct",
  "Adjacent cranes / anti-collision",
  "Public interface controlled",
];

export const TRAFFIC_PERMIT_ITEMS = [
  "Permit current for these dates",
  "Hours match the work",
  "Traffic control in place as the permit requires",
];

export const NDT_ITEMS = [
  "Report covers the components going up",
  "Still in date",
  "Failed items isolated",
];

export const HOIST_ROPE_ITEMS = [
  "Mill cert attached",
  "Identification matches the drum",
  "Condition this inspection recorded",
];

export const OPERATOR_CERT_ITEMS = [
  "BC Crane Safety certificate current",
  "Class matches this crane",
  "Provisional supervision plan attached if required",
];

export const FLYTABLE_SJP_ITEMS = [
  "Engineered drawing revision matches this table ID",
  "Manufacturer cycle for this system is at the lift",
  "Table is typical — or corner / nontypical plan attached",
  "Weight and COG known (14.36)",
  "Four designated pick points — pins / cotters in as the OEM",
  "Sling lengths as the drawing — not last floor’s memory",
  "Crane will not pull the table out of the slab",
  "Curb stops / kicker blocks at the edge",
  "Brake lines if the drawing requires them",
  "Fall protection at the slab edge (Part 11)",
  "Exclusion below and on the landing floor (14.44)",
  "Wind at or below the lower of crane, manufacturer, this SJP",
  "Radios tested — confirmation loop, both floors",
  "No people or loose material on the table while flying",
  "Pre-lift meeting immediately before this cycle",
];

export const PLATFORM_SJP_ITEMS = [
  "OEM user information for this serial is at the lift",
  "Type plate / WLL read — service load is not the fly weight",
  "Dead weight empty plus rigging known (14.36)",
  "Fixed or retractable — said. Retractable daily extend is host",
  "Four designated pick points — no improvised picks",
  "4-leg chain as the OEM — Doka 3.20 m, β ≤ 30° if that is this serial",
  "Deck empty — no people, no material",
  "Host will release props / clamps before hoist",
  "Tag lines named",
  "Fall protection at the slab edge (Part 11)",
  "Exclusion below (14.44)",
  "Wind at or below the lower of crane, manufacturer, this SJP",
  "Radios tested",
  "Do not disconnect until the host says landed",
  "Pre-lift meeting immediately before this lift",
];

export const REFUSAL_ITEMS = [
  "Work stopped",
  "Reason stated — specific",
  "Site told",
  "Employer told",
  "Danger investigated",
  "Work still stopped until controlled",
  "No replacement sent to do the same unsafe work",
];

export function createBlock(
  type: BlockType,
  inspectionItems?: string[]
): SafetyBlock {
  const id = nid(type);
  const spec = SPECS[type];
  return {
    id,
    type,
    title: spec.title,
    required: spec.required,
    fields: fields(id, spec.fields),
    inspectionItems:
      type === "inspection"
        ? [...(inspectionItems ?? spec.inspectionItems ?? ["Item"])]
        : undefined,
  };
}

export function cloneBlock(block: SafetyBlock): SafetyBlock {
  const id = nid(block.type);
  return {
    ...block,
    id,
    fields: block.fields.map((f) => ({ ...f, id: `${id}_${f.key}` })),
    inspectionItems: block.inspectionItems
      ? [...block.inspectionItems]
      : undefined,
  };
}

type Spec = {
  title: string;
  required?: boolean;
  fields: Omit<FormField, "id">[];
  inspectionItems?: string[];
};

const SPECS: Record<BlockType, Spec> = {
  worker: {
    title: "Worker Information",
    required: true,
    fields: [
      { key: "name", label: "Worker name", type: "text", required: true },
      { key: "employeeId", label: "Employee ID", type: "text" },
      {
        key: "position",
        label: "Position",
        type: "select",
        required: true,
        options: POSITION,
      },
      { key: "supervisor", label: "Supervisor", type: "text", required: true },
    ],
  },
  project: {
    title: "Project Information",
    required: true,
    fields: [
      { key: "project", label: "Project", type: "text", required: true },
      { key: "client", label: "Client", type: "text" },
      { key: "site", label: "Site", type: "text", required: true },
      {
        key: "address",
        label: "Address",
        type: "address",
        placeholder: "Start typing the site address",
      },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "time", label: "Time", type: "time" },
    ],
  },
  task: {
    title: "Task",
    fields: [
      {
        key: "description",
        label: "Task description",
        type: "textarea",
        required: true,
      },
      { key: "activity", label: "Work activity", type: "text" },
    ],
  },
  hazard: {
    title: "Hazard",
    fields: [
      { key: "hazard", label: "Hazard", type: "textarea", required: true },
      {
        key: "consequence",
        label: "Potential consequence",
        type: "textarea",
        required: true,
      },
      {
        key: "risk",
        label: "Risk level",
        type: "select",
        required: true,
        options: RISK,
      },
    ],
  },
  control: {
    title: "Control",
    fields: [
      {
        key: "measure",
        label: "Control measure",
        type: "textarea",
        required: true,
      },
      {
        key: "responsible",
        label: "Responsible person",
        type: "text",
        required: true,
      },
      {
        key: "residual",
        label: "Residual risk",
        type: "select",
        options: RISK,
      },
    ],
  },
  crane: {
    title: "Crane",
    fields: [
      { key: "manufacturer", label: "Crane manufacturer", type: "text" },
      { key: "model", label: "Model", type: "text" },
      { key: "unit", label: "Unit number", type: "text", required: true },
      { key: "capacity", label: "Capacity", type: "text" },
      { key: "configuration", label: "Configuration", type: "text" },
      { key: "boom", label: "Boom length", type: "text" },
      { key: "radius", label: "Radius", type: "text" },
      { key: "chart", label: "Load chart reference", type: "text" },
    ],
  },
  load: {
    title: "Load",
    fields: [
      {
        key: "description",
        label: "Load description",
        type: "text",
        required: true,
      },
      { key: "weight", label: "Load weight", type: "text", required: true },
      { key: "dimensions", label: "Dimensions", type: "text" },
      { key: "cog", label: "Centre of gravity", type: "text" },
      { key: "points", label: "Pick points", type: "text" },
    ],
  },
  rigging: {
    title: "Rigging",
    fields: [
      { key: "slingType", label: "Sling type", type: "select", options: SLING },
      { key: "slingSize", label: "Sling size", type: "text" },
      { key: "wll", label: "WLL", type: "text" },
      { key: "quantity", label: "Quantity", type: "number" },
      { key: "hitch", label: "Hitch", type: "select", options: HITCH },
      { key: "angle", label: "Sling angle", type: "text" },
      { key: "shackles", label: "Shackles", type: "text" },
      { key: "hooks", label: "Hooks", type: "text" },
      { key: "hardware", label: "Hardware", type: "text" },
      {
        key: "status",
        label: "Inspection status",
        type: "select",
        options: ["Pass", "Fail — isolated", "Not inspected"],
      },
    ],
  },
  inspection: {
    title: "Inspection",
    inspectionItems: ["Item"],
    fields: [
      { key: "inspectedBy", label: "Inspected by", type: "text", required: true },
      { key: "inspectedAt", label: "Time", type: "time" },
    ],
  },
  ppe: {
    title: "PPE",
    fields: [
      {
        key: "ppe",
        label: "PPE in use",
        type: "checkboxes",
        options: [
          "Hard hat",
          "Safety footwear",
          "High visibility",
          "Gloves",
          "Eye protection",
          "Hearing protection",
          "Fall protection",
          "Other",
        ],
      },
      { key: "other", label: "Other PPE", type: "text" },
    ],
  },
  communication: {
    title: "Communication",
    fields: [
      {
        key: "method",
        label: "Method",
        type: "checkboxes",
        options: ["Hand signals", "Radio", "Spotter", "Signalperson"],
      },
      {
        key: "tested",
        label: "Communication test",
        type: "yesno",
        required: true,
      },
      { key: "channel", label: "Channel / stop word", type: "text" },
    ],
  },
  weather: {
    title: "Weather",
    fields: [
      { key: "wind", label: "Wind", type: "text" },
      { key: "rain", label: "Rain", type: "text" },
      { key: "snow", label: "Snow", type: "text" },
      { key: "visibility", label: "Visibility", type: "text" },
      { key: "temperature", label: "Temperature", type: "text" },
      {
        key: "restrictions",
        label: "Weather restrictions",
        type: "textarea",
      },
    ],
  },
  powerlines: {
    title: "Powerlines",
    fields: [
      { key: "present", label: "Powerline present", type: "yesno", required: true },
      {
        key: "voltage",
        label: "Voltage (phase to phase)",
        type: "select",
        options: [
          "Under 750 V — MAD 1 m / 4 ft",
          "Over 750 V to 75 kV — MAD 3 m / 10 ft",
          "Over 75 kV to 250 kV — MAD 4.5 m / 15 ft",
          "Over 250 kV to 550 kV — MAD 6 m / 20 ft",
          "Unknown distribution — 3 m until verified",
          "Unknown transmission — 6 m until verified",
        ],
      },
      {
        key: "clearance",
        label: "MAD this lift (m)",
        type: "text",
        placeholder: "Table 19-1A. Boom, load and tag line.",
      },
      { key: "controls", label: "Controls", type: "textarea" },
      {
        key: "utility",
        label: "Utility contact",
        type: "text",
        placeholder: "BC Hydro Express Connect 1 877 520 1355",
      },
    ],
  },
  emergency: {
    title: "Emergency",
    fields: [
      {
        key: "contact",
        label: "Emergency contact",
        type: "text",
        required: true,
      },
      { key: "firstAid", label: "First aid", type: "text" },
      { key: "access", label: "Emergency access", type: "text" },
      { key: "muster", label: "Muster point", type: "text" },
      { key: "rescue", label: "Rescue procedure", type: "textarea" },
    ],
  },
  corrective: {
    title: "Corrective Action",
    fields: [
      { key: "finding", label: "Finding", type: "textarea", required: true },
      {
        key: "action",
        label: "Corrective action",
        type: "textarea",
        required: true,
      },
      {
        key: "responsible",
        label: "Responsible person",
        type: "text",
        required: true,
      },
      { key: "due", label: "Due date", type: "date", required: true },
      { key: "completion", label: "Completion", type: "text" },
    ],
  },
  comments: {
    title: "Comments",
    fields: [{ key: "body", label: "Comments", type: "textarea" }],
  },
  log: {
    title: "Shift Log",
    fields: [
      {
        key: "shift",
        label: "Shift",
        type: "select",
        options: ["Day", "Night", "Split", "Other"],
      },
      { key: "hourStart", label: "Hour meter — start", type: "text" },
      { key: "hourEnd", label: "Hour meter — end", type: "text" },
      { key: "hoursService", label: "Hours in hoisting service", type: "text" },
      { key: "lifts", label: "Number of lifts", type: "number" },
      { key: "maxLoad", label: "Heaviest load this shift", type: "text" },
      {
        key: "work",
        label: "Work performed",
        type: "textarea",
        required: true,
      },
      { key: "fluids", label: "Fluids / fuel checked", type: "yesno" },
      {
        key: "defects",
        label: "Defects this shift",
        type: "textarea",
        placeholder: "None, or name it and who was told.",
      },
    ],
  },
  incident: {
    title: "Incident",
    required: true,
    fields: [
      {
        key: "event",
        label: "What happened",
        type: "textarea",
        required: true,
      },
      { key: "witnesses", label: "Witnesses", type: "text" },
      { key: "injury", label: "Injury", type: "yesno", required: true },
      {
        key: "immediate",
        label: "Immediate actions",
        type: "textarea",
        required: true,
      },
      {
        key: "notifications",
        label: "Who was told",
        type: "textarea",
        required: true,
      },
    ],
  },
  signature: {
    title: "Signature",
    required: true,
    fields: [
      { key: "printed", label: "Printed name", type: "text", required: true },
      { key: "role", label: "Role", type: "text" },
      { key: "date", label: "Date", type: "date", required: true },
    ],
  },
  photo: {
    title: "Photo",
    fields: [{ key: "caption", label: "Caption", type: "text" }],
  },
};
