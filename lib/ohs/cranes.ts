import type { Crane } from "./types";

/** Official Manitowoc / Potain data-sheet downloads. Serial chart in the cab wins. */
function mw(id: number) {
  return `https://www.manitowoc.com/media/${id}/download`;
}

/** Official WOLFFKRAN data sheets on the Canada site. Serial chart in the cab wins. */
function wk(id: number) {
  return `https://www.wolffkran.com/resources/ecics_${id}.pdf`;
}

/** Official Liebherr data sheets on assets-cdn. Serial chart in the cab wins. */
function lh(id: string) {
  return `https://assets-cdn.liebherr.com/versions/${id}/original/`;
}

/** Official Zoomlion English product pages. Serial chart in the cab wins. */
function zl(id: number) {
  return `https://en-product.zoomlion.com/product/pro-detail-${id}.htm`;
}

/** Zoomlion Manual Download PDFs on the English product site. */
function zlFile(id: string) {
  return `https://en-product.zoomlion.com/upload/file/2025/06/27/${id}.pdf`;
}

/** Official Raimondi / Terex product pages. Serial chart in the cab wins. */
function rm(slug: string) {
  return `https://raimondi.com/en/product/${slug}/`;
}

/** Official JASO technical sheets on the English tower site. Serial chart in the cab wins. */
function jaso(path: string) {
  return `https://jaso.com/tower/wp-content/uploads/${path}`;
}

/** Morrow published Pecco / Peiner NA range sheets. Serial chart in the cab wins. */
function pecco(file: string) {
  return `https://public.morrow.com/wp-content/uploads/2021/04/${file}.pdf`;
}

export const CRANE_GROUP_ORDER = [
  "TOPLESS",
  "HAMMERHEAD",
  "LUFFING JIB",
  "SELF-ERECTING",
] as const;

export const CRANES: Crane[] = [
  {
    slug: "mdt-219",
    title: "POTAIN MDT 219",
    number: "GOSPEL-CRN-001",
    family: "TOPLESS",
    maker: "Potain",
    summary:
      "Topless city crane. J8 and J10. CCS. The published range is below. Lift to the serial chart in the cab.",
    productUrl: "https://www.manitowoc.com/potain/top-slewing-cranes/mdt-219-j10",
    specs: [
      {
        title: "J10",
        body: "10 t (11 USt) max. 65 m (213.3 ft) jib. 1.9 t (2.1 USt) at max radius. 70.4 m (231 ft) hook height on the published base.",
      },
      {
        title: "J8",
        body: "8 t (8.8 USt) max. Same 65 m jib. 1.95 t (2.1 USt) at max radius. Same published hook height on base.",
      },
      {
        title: "Control",
        body: "Manitowoc CCS. Cab configuration from the display: jib length, trolley limits, sensors. Top Tracing 3 where fitted. Cab-IN operator lift where fitted.",
      },
      {
        title: "Mast",
        body: "K-mast and climbing gear shared with other Potain top-slewing models. Confirm this mast, this tie-in, this climbing frame against the configuration in the cab.",
      },
    ],
    charts: [
      {
        href: mw(13461),
        label: "MDT 219 J10 — ASCE LOAD CHART →",
        note: "Imperial. North American wind. 02D_ASCEUSt_MDT219J10.",
      },
      {
        href: mw(13453),
        label: "MDT 219 J8 — ASCE LOAD CHART →",
        note: "Imperial. 02D_ASCEUSt_MDT219J8.",
      },
      {
        href: mw(13462),
        label: "MDT 219 J10 — EN 14439 C25 DATA SHEET →",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mdt-219-j8",
        label: "MDT 219 J8 — PRODUCT PAGE →",
      },
      {
        href: mw(13432),
        label: "MDT CCS CITY RANGE BROCHURE →",
      },
    ],
    manuals: [
      {
        href: "https://www.manitowoc.com/manuals",
        label: "MANITOWOC MANUALS — BRAND POTAIN →",
        note: "Operator, service, inspection and lubrication. Filter brand Potain. Use the serial on the builder’s plate.",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mdt-219-j10#documentation",
        label: "MDT 219 J10 DOCUMENTATION ON MANITOWOC →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "CCS display: configuration, limits, no bypass, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "Access, platforms, Cab-IN if fitted",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "CCS maintenance screen — items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "Electrical, earthing, aviation lights",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "mrh-125",
    title: "POTAIN MRH 125",
    number: "GOSPEL-CRN-002",
    family: "LUFFING JIB",
    maker: "Potain",
    summary:
      "Hydraulic luffing jib on a topless upper. VVH rams, no luffing rope. Built for tight urban sites. Lift to the serial chart in the cab.",
    productUrl: "https://www.manitowoc.com/potain/top-slewing-cranes/mrh-125",
    specs: [
      {
        title: "Capacity",
        body: "8 t (8.8 USt) max. 50 m (164 ft) jib. 2 t (2.2 USt) at 50 m. Jib in 5 m steps from 30 m to 50 m.",
      },
      {
        title: "Footprint",
        body: "Counter-jib 7 m. Weathervane radius about 10 m on the 50 m jib. Cab can sit left or right of the jib.",
      },
      {
        title: "Luffing",
        body: "VVH hydraulic. Jib can be fully raised in about two minutes. Oil tank and retention tank with level gauges. 2-fall / 4-fall reeving.",
      },
      {
        title: "Mast",
        body: "K-mast 1.6 m and 2.0 m. Cab-IN where fitted. Upper transports as a short package — four containers or four trucks for the 50 m jib upper.",
      },
    ],
    charts: [
      {
        href: mw(13899),
        label: "MRH 125 — ASCE LOAD CHART →",
        note: "Imperial. 02D_ASCEUSt_MRH125.",
      },
      {
        href: mw(13900),
        label: "MRH 125 — EN 14439 C25 DATA SHEET →",
        note: "Metric load curves, ballast, mechanisms.",
      },
      {
        href: mw(13901),
        label: "MRH 125 — EN 14439 C50 DATA SHEET →",
      },
      {
        href: mw(13898),
        label: "MRH 125 FLYER →",
      },
    ],
    manuals: [
      {
        href: "https://www.manitowoc.com/manuals",
        label: "MANITOWOC MANUALS — BRAND POTAIN →",
        note: "Operator, service, inspection and lubrication for this serial. Hydraulic luffing lives in the maintenance manual — follow that interval.",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mrh-125#documentation",
        label: "MRH 125 DOCUMENTATION ON MANITOWOC →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Hydraulic luffing: rams, hoses, tank, retention tank, leaks, level",
      "Jib pins, keepers, luffing geometry. Jib can go near-vertical — check clearance",
      "Hoist rope, hook block, anti-two-block",
      "Slew, weathervaning at the published short radius for this jib",
      "Mast bolts, pins, ties. Cab side (left or right) as installed",
      "Limit devices and overload. Anemometer",
      "Out-of-service jib position per the OEM for this wind",
    ],
    maint: [
      "Hydraulic oil, filters, ram glands, hoses — OEM interval",
      "Luffing pins and greasing",
      "Hoist winch oil, brakes, rope",
      "Slew grease and bolts",
      "Electrical and earthing",
      "CCS or cab maintenance screen where fitted",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "luffing-jib",
    title: "POTAIN LUFFING JIB",
    number: "GOSPEL-CRN-003",
    family: "LUFFING JIB",
    maker: "Potain",
    summary:
      "MRH hydraulic luffers and MR rope luffers. Same job: a jib that luffs so the crane can work tight to the building. Match the machine on site to the right chart.",
    productUrl: "https://www.manitowoc.com/potain/top-slewing-cranes/mrh-125",
    specs: [
      {
        title: "MRH 125",
        body: "Hydraulic topless luffer. 8 t, 50 m jib. See GOSPEL-CRN-002.",
      },
      {
        title: "MRH 175",
        body: "Hydraulic topless luffer. 10 t (11 USt), 55 m (180 ft) jib. 1.5 t (1.65 USt) at 55 m. Weathervane about 10 m.",
      },
      {
        title: "MR 229",
        body: "Current rope-luffing jib with CCS. 14 t (15.4 USt), 55 m (180 ft) jib. 2.7 t (2.95 USt) at max jib. Out-of-service radius from about 10.25 m.",
      },
      {
        title: "MR 225 A",
        body: "Earlier rope luffer still on sites. 55 m jib. Cathead and luffing rope. Confirm the serial chart — this is a non-current product.",
      },
    ],
    charts: [
      {
        href: "/safety/crane/mrh-125",
        label: "MRH 125 — CHARTS AND FORMS →",
      },
      {
        href: mw(14214),
        label: "MRH 175 — ASCE LOAD CHART →",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mrh-175",
        label: "MRH 175 — PRODUCT PAGE →",
      },
      {
        href: mw(16824),
        label: "MR 229 — ASCE LOAD CHART →",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mr-229",
        label: "MR 229 — PRODUCT PAGE →",
      },
      {
        href: "https://www.manitowoc.com/sites/default/files/media/divers/file/2023-03/02D_EN14439C25D25_MR225A_2009_36-15.pdf",
        label: "MR 225 A — EN 14439 C25 DATA SHEET →",
      },
      {
        href: "https://www.manitowoc.com/potain/top-slewing-cranes/mr-225",
        label: "MR 225 A — PRODUCT PAGE →",
      },
    ],
    manuals: [
      {
        href: "https://www.manitowoc.com/manuals",
        label: "MANITOWOC MANUALS — BRAND POTAIN →",
        note: "Rope luffers: luffing rope, cathead, luffing winch. Hydraulic luffers: VVH rams and tank. The serial manual names the interval.",
      },
    ],
    inspect: [
      "Which luffer: hydraulic (MRH) or rope (MR). Inspection follows that machine",
      "Jib angle against the chart for this radius and this reeving",
      "Out-of-service / weathervane radius for this jib length",
      "Rope luffer: luffing rope, cathead sheaves, luffing winch, dead ends",
      "Hydraulic luffer: rams, hoses, tank, pins — see MRH 125",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, mast, ties, access",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on MR machines, luffing line",
      "Structure: jib, cathead or ram attachments, mast",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "self-erecting",
    title: "POTAIN SELF-ERECTING",
    number: "GOSPEL-CRN-004",
    family: "SELF-ERECTING",
    maker: "Potain",
    summary:
      "Hup, Igo and Igo T. Unfold, lift, fold. CSA Z248 still applies. Lift to the serial chart for this jib position and this ballast.",
    productUrl: "https://www.manitowoc.com/potain/self-erecting-cranes",
    specs: [
      {
        title: "Hup 32-27",
        body: "4 t (4.4 USt). 32 m (105 ft) jib. 1 t (1.1 USt) at max radius. 27 m (89 ft) hook height on base, up to about 40 m with raised jib. Multiple mast and jib configurations.",
      },
      {
        title: "Hup 40-30",
        body: "4 t (4.4 USt). 40 m (131 ft) jib. 1 t (1.1 USt) at max radius. 30 m (98 ft) hook height on base.",
      },
      {
        title: "Igo T 85",
        body: "Trolley self-erect with a tower. Published product guide and ASME / metric data sheets. Confirm jib and ballast on the plate.",
      },
      {
        title: "Igo T 130",
        body: "Larger Igo T. ASME and metric data sheets on Manitowoc. 8 t class on the published range leaflet.",
      },
      {
        title: "Igo 50",
        body: "Folding Igo. Metric data sheet and product guide. Confirm the imperial chart in the cab for North American machines.",
      },
    ],
    charts: [
      {
        href: mw(12966),
        label: "HUP 32-27 — ASME LOAD CHART →",
      },
      {
        href: mw(12967),
        label: "HUP 32-27 — METRIC DATA SHEET →",
      },
      {
        href: "https://www.manitowoc.com/potain/self-erecting-cranes/hup-32-27",
        label: "HUP 32-27 — PRODUCT PAGE →",
      },
      {
        href: mw(12984),
        label: "HUP 40-30 — ASME LOAD CHART →",
      },
      {
        href: "https://www.manitowoc.com/potain/self-erecting-cranes/hup-40-30",
        label: "HUP 40-30 — PRODUCT PAGE →",
      },
      {
        href: mw(13108),
        label: "IGO T 85 A — ASME LOAD CHART →",
      },
      {
        href: mw(13106),
        label: "IGO T 85 A — PRODUCT GUIDE →",
      },
      {
        href: "https://www.manitowoc.com/potain/self-erecting-cranes/igo-t-85",
        label: "IGO T 85 — PRODUCT PAGE →",
      },
      {
        href: mw(13119),
        label: "IGO T 130 — ASME LOAD CHART →",
      },
      {
        href: "https://www.manitowoc.com/potain/self-erecting-cranes/igo-t-130",
        label: "IGO T 130 — PRODUCT PAGE →",
      },
      {
        href: mw(13044),
        label: "IGO 50 — METRIC DATA SHEET →",
      },
      {
        href: mw(13043),
        label: "IGO 50 — PRODUCT GUIDE →",
      },
      {
        href: "https://www.manitowoc.com/potain/self-erecting-cranes",
        label: "POTAIN SELF-ERECTING RANGE →",
      },
    ],
    manuals: [
      {
        href: "https://www.manitowoc.com/manuals",
        label: "MANITOWOC MANUALS — BRAND POTAIN →",
        note: "Unfold / fold sequence, ballast, outriggers, remote, lubrication. Smart Set-up on Hup is in the serial manual — follow it.",
      },
    ],
    inspect: [
      "Chassis, outriggers, jacks, pads, slope within the OEM limit",
      "Ballast complete and locked as the chart for this jib",
      "Unfold complete. Transport locks off. Pins and keepers in",
      "Jib position (horizontal / raised / short) matches the chart in use",
      "Remote or cab: function, E-stop, no uncleared alarm",
      "Hoist rope, hook, trolley or luffing as fitted, limits",
      "Power: voltage, phase, earthing as the plate",
      "Weathervane / out-of-service as the OEM for this wind",
    ],
    maint: [
      "Unfold / fold mechanisms, pins, hydraulic rams where fitted",
      "Outrigger beams, jacks, holding valves",
      "Hoist, slew, trolley — OEM lubrication",
      "Electrical panel, remote batteries, cables",
      "Wire rope and hook block",
      "Transport axles and locks when the crane will travel",
    ],
    forms: [
      {
        href: "/safety/form/self-erect-inspection",
        label: "SELF-ERECT INSPECTION — PROVEN-FRM-029 →",
      },
      { href: "/safety/builder/self-erect-inspection", label: "FILL SELF-ERECT INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "wolff-clear",
    title: "WOLFF CLEAR",
    number: "GOSPEL-CRN-005",
    family: "TOPLESS",
    maker: "WOLFFKRAN",
    summary:
      "Flat-top saddle jib. 80 tm to 315 tm. US charts where WOLFF published them. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.wolffkran.com/website/en/ca/products/tower-cranes/clear-cranes",
    specs: [
      {
        title: "Range",
        body: "Clear cranes from 80 tm to 315 tm. Hoisting winches 28 kW to 75 kW. Flat-top. Components sized for container transport. Uniform hung counterweights.",
      },
      {
        title: "6523.8 Clear",
        body: "8.5 t max. 65 m jib. 2-fall. Hw 845 FU. Lower-chord connection for low-tool assembly.",
      },
      {
        title: "7534.16 Clear US",
        body: "16.5 t (36,380 lb) max. 75 m (246 ft) jib. 2- or 4-fall with automatic re-reeving. 480 V / 60 Hz. WOLFF Boost, working-space limiter, anti-collision interface.",
      },
      {
        title: "Tower",
        body: "WOLFF system tower elements. Slug-bolt connection. External climber KWH 20.3 / 20.6 or internal KSH. Stationary KR / KRE or travelling UW / KRF.",
      },
    ],
    charts: [
      {
        href: wk(1139),
        label: "6523.8 CLEAR — DATA SHEET →",
      },
      {
        href: wk(1141),
        label: "6523.12 CLEAR — DATA SHEET →",
      },
      {
        href: wk(1198),
        label: "6523 CLEAR — BROCHURE →",
      },
      {
        href: wk(251),
        label: "7534.16 CLEAR US — DATA SHEET →",
        note: "Imperial. North American machine.",
      },
      {
        href: wk(247),
        label: "6031.12 CLEAR US — DATA SHEET →",
      },
      {
        href: wk(1420),
        label: "8038 CLEAR US — DATA SHEET →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/clear-cranes/wolff-6523-clear",
        label: "6523 CLEAR — PRODUCT PAGE →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/clear-cranes/wolff-7534-clear/wolff-7534-16-i-clear-i-us",
        label: "7534.16 CLEAR US — PRODUCT PAGE →",
      },
    ],
    manuals: [
      {
        href: "https://www.wolffkran.com/website/en/ca/downloads",
        label: "WOLFFKRAN CANADA DOWNLOADS →",
        note: "Data sheets and technical information by model. Serial operator and maintenance manuals stay in the cab.",
      },
      {
        href: wk(289),
        label: "WOLFF BOOST →",
        note: "10 % extra on the published curve when hoist and trolley (or luff) move one at a time. Confirm it is enabled for this serial.",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca",
        label: "WOLFFKRAN CANADA — CALGARY →",
      },
    ],
    inspect: [
      "Serial, jib, reeving, tower and ballast match the chart in the cab",
      "WOLFF slug-bolt tower, ties, climber if fitted",
      "Slew bearing, central lubrication, weathervaning",
      "Jib, trolley, trolley-rope breakage device, counter-jib, hung counterweights",
      "Hoist rope, hook block, 2-fall / 4-fall as configured",
      "Overload, WOLFF Boost setting, working-space limiter, anti-collision",
      "Anemometer, cabin display, no uncleared alarm",
      "Out-of-service / weathervane for this jib",
    ],
    maint: [
      "Slew bearing central lubrication",
      "Hoist and trolley winches — oil, brakes, spooling",
      "Tower slug bolts per the serial interval",
      "Trolley rope and jib connections",
      "Electrical, earthing, WOLFF Link if fitted",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "wolff-compact-cross",
    title: "WOLFF COMPACT + CROSS",
    number: "GOSPEL-CRN-006",
    family: "TOPLESS",
    maker: "WOLFFKRAN",
    summary:
      "High-capacity saddle jib. Compact 900 tm class and Cross with a tower top. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.wolffkran.com/website/en/ca/products/tower-cranes/cross-cranes",
    specs: [
      {
        title: "Cross",
        body: "Saddle jib with a regular tower top. 250 tm to 630 tm. Heavier loads and longer jibs than Clear.",
      },
      {
        title: "8095.25 Compact",
        body: "25 t max. 80 m jib. 900 tm class. Three slew drives. Hw 25110.1 FU. Hook path 400 m in 2-fall.",
      },
      {
        title: "8095.40 Compact",
        body: "40 t class Compact. Same 80 m jib family. Confirm reeving and the chart in the cab.",
      },
      {
        title: "8033.20 Cross US",
        body: "US data sheet published. North American wind and 480 V machines — use the US sheet when that is the plate.",
      },
    ],
    charts: [
      {
        href: wk(1294),
        label: "8095.25 COMPACT — DATA SHEET →",
      },
      {
        href: wk(1295),
        label: "8095.40 COMPACT — DATA SHEET →",
      },
      {
        href: wk(1269),
        label: "8076 COMPACT — DATA SHEET →",
      },
      {
        href: wk(252),
        label: "8033.20 CROSS US — DATA SHEET →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/cross-cranes/wolff-8095-compact",
        label: "8095 COMPACT — PRODUCT PAGE →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/cross-cranes/wolff-8033-cross",
        label: "8033 CROSS — PRODUCT PAGE →",
      },
    ],
    manuals: [
      {
        href: "https://www.wolffkran.com/website/en/ca/downloads",
        label: "WOLFFKRAN CANADA DOWNLOADS →",
        note: "Serial operator and maintenance manuals stay in the cab. Tower system, climbing and ties have their own sheets on the same downloads page.",
      },
      {
        href: wk(289),
        label: "WOLFF BOOST →",
      },
    ],
    inspect: [
      "Serial, jib, reeving, tower and ballast match the chart in the cab",
      "Tower top or Compact upper as fitted — pins, access, aviation lights",
      "WOLFF slug-bolt tower, ties, climber",
      "Slew drives, central lubrication, weathervaning",
      "Jib, trolley, trolley-rope depot, counter-jib, ballast",
      "Hoist rope, hook, second hoist brake if fitted",
      "Overload, WOLFF Boost, working-space limiter, anti-collision",
      "Out-of-service / weathervane for this jib",
    ],
    maint: [
      "Slew bearing lubrication — three-drive Compact included",
      "Hoist winch oil, brakes, performance-reduction setting",
      "Tower slug bolts and climbing gear",
      "Trolley rope and jib sections",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "wolff-166-b",
    title: "WOLFF 166 B",
    number: "GOSPEL-CRN-007",
    family: "LUFFING JIB",
    maker: "WOLFFKRAN",
    summary:
      "Hydraulic luffer. No tower top. Hoist on the jib. Compact 160 tm class. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.wolffkran.com/website/en/ca/products/tower-cranes/luffing-jib-cranes/wolff-166-b",
    specs: [
      {
        title: "Capacity",
        body: "12 t max. 55 m jib. 1- or 2-fall. 25 m basic jib, extensions in 5 m steps.",
      },
      {
        title: "Luffing",
        body: "Hydraulic cylinder on the connecting frame. Power pack 22 kW. Level luffing — the load holds height as the jib luffs.",
      },
      {
        title: "Upper",
        body: "Hoist winch Hw 1260 FU on the jib. Jib can be reeved on the ground. Slewing frame with cabin, slip ring, central lubrication. Counter-jib with platform and ballast.",
      },
      {
        title: "Tower",
        body: "WOLFF system tower. Slug bolts. External climber KWH 20.3 or internal KSH 20 M. Travelling UW / KRF 6–8 m or stationary KR / anchors.",
      },
    ],
    charts: [
      {
        href: wk(245),
        label: "166 B US — DATA SHEET →",
        note: "Imperial. North American machine.",
      },
      {
        href: wk(243),
        label: "166 B — METRIC DATA SHEET →",
      },
      {
        href: wk(144),
        label: "166 B — TECHNICAL INFORMATION →",
        note: "Full load tables, foundation loads, out-of-service positions.",
      },
      {
        href: wk(585),
        label: "166 B — BROCHURE →",
      },
    ],
    manuals: [
      {
        href: "https://www.wolffkran.com/website/en/ca/downloads",
        label: "WOLFFKRAN CANADA DOWNLOADS →",
        note: "Hydraulic luffing lives in the serial maintenance manual — follow that interval.",
      },
      {
        href: wk(289),
        label: "WOLFF BOOST →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, ballast match the chart in the cab",
      "Hydraulic luffing: cylinder, hoses, power pack, leaks, level",
      "Jib pins, connecting frame, near-vertical clearance",
      "Hoist on the jib — winch, rope, reeving, hook",
      "Slew, weathervaning, central lubrication",
      "Level luffing function. Overload. Working-space limiter",
      "Tower slug bolts, climber if fitted",
      "Out-of-service jib position for this wind",
    ],
    maint: [
      "Hydraulic oil, filters, cylinder glands — OEM interval",
      "Luffing pins and greasing",
      "Hoist winch oil, brakes, rope",
      "Slew grease and slug bolts",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "wolff-luffing-jib",
    title: "WOLFF LUFFING JIB",
    number: "GOSPEL-CRN-008",
    family: "LUFFING JIB",
    maker: "WOLFFKRAN",
    summary:
      "B-series luffers. 125 tm to 1250 tm. Rope luffing, plus the 166 B hydraulic. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.wolffkran.com/website/en/ca/products/tower-cranes/luffing-jib-cranes",
    specs: [
      {
        title: "166 B",
        body: "Hydraulic. 12 t, 55 m. See GOSPEL-CRN-007.",
      },
      {
        title: "235 B / 275 B / 355 B",
        body: "Rope luffers in the middle of the pack. US data sheets published for 235, 275 and 355.",
      },
      {
        title: "700 B",
        body: "50 t max. 70 m jib. 1-, 2- or 3-fall. Luffing winch Ew 12110 FU. Hoist Hw 40132 FU. Level luffing.",
      },
      {
        title: "1250 B",
        body: "60 t (132,280 lb) max. 80 m (263 ft) jib. 1500 tm class. Luffing winch Ew 16110 FU. US sheet published.",
      },
      {
        title: "Geometry",
        body: "Patented tower-top / counter-jib / jib on a central connecting frame. Short tail swing. Level luffing holds hook height as the jib moves.",
      },
    ],
    charts: [
      {
        href: "/safety/crane/wolff-166-b",
        label: "166 B — CHARTS AND FORMS →",
      },
      {
        href: wk(918),
        label: "235 B US — DATA SHEET →",
      },
      {
        href: wk(246),
        label: "275 B US — DATA SHEET →",
      },
      {
        href: wk(248),
        label: "355 B US — DATA SHEET →",
      },
      {
        href: wk(250),
        label: "700 B US — DATA SHEET →",
      },
      {
        href: wk(120),
        label: "700 B — TECHNICAL INFORMATION →",
      },
      {
        href: wk(249),
        label: "1250 B US — DATA SHEET →",
      },
      {
        href: wk(140),
        label: "1250 B — TECHNICAL INFORMATION →",
        note: "Full load tables, foundation loads, out-of-service positions.",
      },
      {
        href: wk(586),
        label: "1250 B — BROCHURE →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/luffing-jib-cranes/wolff-700-b",
        label: "700 B — PRODUCT PAGE →",
      },
      {
        href: "https://www.wolffkran.com/website/en/ca/products/tower-cranes/luffing-jib-cranes/wolff-1250-b",
        label: "1250 B — PRODUCT PAGE →",
      },
    ],
    manuals: [
      {
        href: "https://www.wolffkran.com/website/en/ca/downloads",
        label: "WOLFFKRAN CANADA DOWNLOADS →",
        note: "Rope luffers: luffing winch, luffing rope, cathead. Hydraulic 166 B: cylinder and power pack. The serial manual names the interval.",
      },
      {
        href: wk(289),
        label: "WOLFF BOOST →",
        note: "On a luffer, Boost allows 10 % over the published moment when hoist and luff move one at a time.",
      },
    ],
    inspect: [
      "Which luffer: hydraulic 166 B or rope B-series. Inspection follows that machine",
      "Jib angle against the chart for this radius and this reeving",
      "Level luffing — hook height holds as the jib moves",
      "Rope luffer: luffing rope, winch, tower top, connecting frame",
      "Hydraulic 166 B: cylinder, hoses, power pack — see GOSPEL-CRN-007",
      "Hoist, slew, weathervane, overload, anemometer",
      "WOLFF slug-bolt tower, ties, climber",
      "Out-of-service jib position for this wind",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
      "Connecting frame, tower top or ram attachments, slug bolts",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "liebherr-ec-b",
    title: "LIEBHERR EC-B",
    number: "GOSPEL-CRN-009",
    family: "TOPLESS",
    maker: "Liebherr",
    summary:
      "Flat-top EC-B. Litronic. Load Plus where fitted. Fibre jibs on the upper end of the range. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.liebherr.com/en-ca/tower-cranes/products/top-slewing-cranes/flat-top-ec-b-6569160",
    specs: [
      {
        title: "Range",
        body: "Canada listing runs 85 EC-B through 520 EC-B Fibre. Compact head. Shared tower system with other Liebherr top-slewing machines. Confirm this mast, this tie-in, this climbing frame against the configuration in the cab.",
      },
      {
        title: "150 EC-B 8 Litronic",
        body: "8 t (8,000 kg) max. 62.5 m (205 ft) jib. 1.4 t (1,400 kg) at max radius. 67.5 m (221 ft) hook height on the published base.",
      },
      {
        title: "125 EC-B 6",
        body: "6 t (6,000 kg) max. 58 m (190 ft) jib. 1.6 t (1,600 kg) at max radius. 61.5 m (202 ft) hook height on the published base.",
      },
      {
        title: "Control",
        body: "Litronic. LiCAB where fitted. Load Plus extra on the published curve when the function is enabled for this serial. SPEED 2 LIFT on the hoist where fitted. Fibre jib: treat it as the Fibre chart, not the steel sister.",
      },
    ],
    charts: [
      {
        href: lh("0558bdb2-5632-4454-83ff-bb08a1e36d76"),
        label: "150 EC-B 8 LITRONIC — LN DATA SHEET →",
        note: "Metric load tables, ballast, mechanisms.",
      },
      {
        href: "https://www.liebherr.com/en-ca/p/72308-4020294",
        label: "150 EC-B 8 LITRONIC — PRODUCT PAGE →",
      },
      {
        href: lh("9a89d7bc-c5ad-489e-a165-e5f7452d7a10"),
        label: "125 EC-B 6 — LN DATA SHEET →",
      },
      {
        href: "https://www.liebherr.com/en-ca/p/297237-4020294",
        label: "125 EC-B 6 — PRODUCT PAGE →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/products/top-slewing-cranes/flat-top-ec-b-6569160",
        label: "EC-B RANGE — CANADA →",
      },
    ],
    manuals: [
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/digital-solutions/tower-crane-portal-4020349",
        label: "TOWER CRANE PORTAL →",
        note: "Operator, service and lubrication for this serial. Use the builder’s plate.",
      },
      {
        href: "https://www.liebherr.com/en-ca/group/about-liebherr/services/myliebherr/myliebherr-3721088",
        label: "MYLIEBHERR →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/services-4020333",
        label: "LIEBHERR CANADA TOWER SERVICE →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Litronic / LiCAB: configuration, limits, Load Plus setting, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Fibre jib where fitted — Fibre chart, Fibre inspection points",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "Access, platforms, LiCAB if fitted",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "Litronic maintenance screen — items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "Electrical, earthing, aviation lights",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "liebherr-hc-l",
    title: "LIEBHERR HC-L",
    number: "GOSPEL-CRN-010",
    family: "LUFFING JIB",
    maker: "Liebherr",
    summary:
      "HC-L rope luffers and the 195 HC-LH hydraulic. Same job: a jib that luffs so the crane can work tight to the building. Lift to the serial chart in the cab.",
    productUrl:
      "https://www.liebherr.com/en-ca/tower-cranes/products/top-slewing-cranes/luffing-hc-l-4020302",
    specs: [
      {
        title: "195 HC-LH 6/12",
        body: "Hydraulic luffer. 12 t (26,455 lb) max. 55 m (180 ft) jib. 2.55 t (5,600 lb) at max radius. Full luff in under 90 seconds. Out-of-service about 10 m (33 ft). Minimum working radius about 3 m (10 ft).",
      },
      {
        title: "230 HC-L 8/16 Litronic",
        body: "Rope luffer. 16 t (16,000 kg) max. 60 m (197 ft) jib. 1.9 t (1,900 kg) at max radius. 70.7 m (232 ft) hook height on the published base.",
      },
      {
        title: "280 HC-L 12/24 Litronic",
        body: "24 t (24,000 kg) max. 60 m (197 ft) jib. 3.2 t (3,200 kg) at max radius. 64.9 m (213 ft) hook height on the published base.",
      },
      {
        title: "280 HC-L 16/28 Litronic",
        body: "28 t (28,000 kg) max. Same 60 m jib. 3.0 t (3,000 kg) at max radius. Same published hook height on base.",
      },
      {
        title: "Heavier HC-L",
        body: "258 Fibre, 440, 620 and 710 live on the Canada HC-L family page. Fibre jib: Fibre chart. Level luffing where fitted — hook height holds as the jib moves.",
      },
    ],
    charts: [
      {
        href: lh("c30861f0-4f77-4232-8947-bb63a740345b"),
        label: "195 HC-LH 6/12 — DATA SHEET →",
        note: "Hydraulic luffer. FEM load tables.",
      },
      {
        href: "https://www.liebherr.com/en-int/tower-cranes/products/top-slewing-cranes/luffing-hc-l/195-hc-lh-fem-5378438",
        label: "195 HC-LH — PRODUCT PAGE →",
      },
      {
        href: lh("3aff7c98-17b2-49ac-b12e-8c75f4368588"),
        label: "230 HC-L 8/16 LITRONIC — LN DATA SHEET →",
      },
      {
        href: "https://www.liebherr.com/en-ca/p/96170-4020303",
        label: "230 HC-L 8/16 — PRODUCT PAGE →",
      },
      {
        href: lh("97aa8d36-1338-45cb-aeee-b4d761976962"),
        label: "280 HC-L 12/24 LITRONIC — DATA SHEET →",
      },
      {
        href: lh("8a48a261-ac1b-4a10-9c72-e78a76f2d773"),
        label: "280 HC-L 16/28 LITRONIC — LN DATA SHEET →",
      },
      {
        href: "https://www-assets.liebherr.com/media/bu-media/lhbu-lbc/brochures/top-slewing-cranes/luffing-hc-l/liebherr-towercranes-hc-l-series-2025-en.pdf",
        label: "HC-L SERIES BROCHURE →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/products/top-slewing-cranes/luffing-hc-l-4020302",
        label: "HC-L RANGE — CANADA →",
      },
    ],
    manuals: [
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/digital-solutions/tower-crane-portal-4020349",
        label: "TOWER CRANE PORTAL →",
        note: "Rope luffers: luffing winch, luffing rope, cathead. Hydraulic HC-LH: cylinder and power pack. The serial manual names the interval.",
      },
      {
        href: "https://www.liebherr.com/en-ca/group/about-liebherr/services/myliebherr/myliebherr-3721088",
        label: "MYLIEBHERR →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/services-4020333",
        label: "LIEBHERR CANADA TOWER SERVICE →",
      },
    ],
    inspect: [
      "Which luffer: hydraulic HC-LH or rope HC-L. Inspection follows that machine",
      "Serial, jib length, reeving, ballast match the chart in the cab",
      "Jib angle against the chart for this radius and this reeving",
      "Hydraulic HC-LH: cylinder, hoses, power pack, leaks, level. Sensors on the luff",
      "Rope HC-L: luffing rope, winch, cathead, dead ends",
      "Level luffing where fitted — hook height holds as the jib moves",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, weathervaning, mast, ties, climbing frame",
      "Out-of-service jib position for this wind",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hydraulic HC-LH: oil, filters, cylinder glands — OEM interval",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
      "Structure: jib, cathead or ram attachments, mast",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "liebherr-k-series",
    title: "LIEBHERR K-SERIES",
    number: "GOSPEL-CRN-011",
    family: "SELF-ERECTING",
    maker: "Liebherr",
    summary:
      "K-series fast-erect. Unfold, lift, fold. CSA Z248 still applies. Lift to the serial chart for this jib position and this ballast.",
    productUrl:
      "https://www.liebherr.com/en-ca/tower-cranes/products/fast-erecting-cranes/k-cranes-6569159",
    specs: [
      {
        title: "91 K",
        body: "Current Canada sheet. 6 t (13,227 lb) max. 48 m (157 ft) jib. 1.38 t (3,042 lb) at max radius. 40.4 m (132.5 ft) hook height on the published base. 2-fall.",
      },
      {
        title: "81 K.1",
        body: "Still on sites. Liebherr published 6 t max, 48 m jib, 1.35 t at max radius, 38.9 m hook height. Load Plus where fitted. Use the 81 K.1 chart for that serial.",
      },
      {
        title: "125 K",
        body: "8 t (8,000 kg) max. 55 m (180 ft) jib. 1.3 t (1,300 kg) at max radius. 41.5 m (136 ft) hook height on the published base. Imperial data sheet on the product page.",
      },
      {
        title: "61 K / 43 K",
        body: "61 K: 4 t, 43 m jib, 1.1 t at max radius, 33.4 m hook. 43 K: 4 t, 35 m jib, 1.1 t at max radius, 30.2 m hook. Both 2-fall on the published EN 14439 sheet.",
      },
    ],
    charts: [
      {
        href: lh("1632409c-cc91-4953-922f-bd2e7805b378"),
        label: "91 K — US DATA SHEET →",
        note: "Imperial. North American machine.",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/products/k-cranes/91-k-7105383",
        label: "91 K — PRODUCT PAGE →",
      },
      {
        href: lh("7b7e122e-4cb7-4240-af0e-fab6c01112f7"),
        label: "125 K — IMPERIAL DATA SHEET →",
      },
      {
        href: "https://www.liebherr.com/en-ca/p/253430-4020281",
        label: "125 K — PRODUCT PAGE →",
      },
      {
        href: lh("aad02ec0-5713-4f75-9a91-2a8a0fc23f3d"),
        label: "61 K — DATA SHEET →",
      },
      {
        href: lh("864eafaa-ccca-43ef-9d4b-0b1680bd99ed"),
        label: "43 K — DATA SHEET →",
      },
      {
        href: "https://www-assets.liebherr.com/media/bu-media/lhbu-lbc/brochures/fast-erecting-cranes/k-cranes/k-series_2025-en.pdf",
        label: "K-SERIES BROCHURE →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/products/fast-erecting-cranes/k-cranes-6569159",
        label: "K-SERIES RANGE — CANADA →",
      },
    ],
    manuals: [
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/digital-solutions/tower-crane-portal-4020349",
        label: "TOWER CRANE PORTAL →",
        note: "Unfold / fold sequence, ballast, outriggers, remote, lubrication. Load Plus is in the serial manual — follow it.",
      },
      {
        href: "https://www.liebherr.com/en-ca/group/about-liebherr/services/myliebherr/myliebherr-3721088",
        label: "MYLIEBHERR →",
      },
      {
        href: "https://www.liebherr.com/en-ca/tower-cranes/services/services-4020333",
        label: "LIEBHERR CANADA TOWER SERVICE →",
      },
    ],
    inspect: [
      "Chassis, outriggers, jacks, pads, slope within the OEM limit",
      "Ballast complete and locked as the chart for this jib",
      "Unfold complete. Transport locks off. Pins and keepers in",
      "Jib position (horizontal / raised / short) matches the chart in use",
      "Remote or cab: function, E-stop, Load Plus setting, no uncleared alarm",
      "Hoist rope, hook, trolley or luffed jib as fitted, limits",
      "Power: voltage, phase, earthing as the plate",
      "Weathervane / out-of-service as the OEM for this wind",
    ],
    maint: [
      "Unfold / fold mechanisms, pins, hydraulic rams where fitted",
      "Outrigger beams, jacks, holding valves",
      "Hoist, slew, trolley — OEM lubrication",
      "Electrical panel, remote batteries, cables",
      "Wire rope and hook block",
      "Transport axles and locks when the crane will travel",
    ],
    forms: [
      {
        href: "/safety/form/self-erect-inspection",
        label: "SELF-ERECT INSPECTION — PROVEN-FRM-029 →",
      },
      { href: "/safety/builder/self-erect-inspection", label: "FILL SELF-ERECT INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "zoomlion-flat-top",
    title: "ZOOMLION FLAT-TOP",
    number: "GOSPEL-CRN-012",
    family: "TOPLESS",
    maker: "Zoomlion",
    summary:
      "R-generation and WA flat-top. Round-tenon mast on R-series. Lift to the serial chart in the cab.",
    productUrl:
      "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=82",
    specs: [
      {
        title: "Range",
        body: "English listing runs R70-3 through R20000-720, plus WA and W city models. Round-tenon R-generation mast. Confirm this mast, this tie-in, this climbing frame against the configuration in the cab.",
      },
      {
        title: "R165-8/10",
        body: "8/10 t max. 65 m jib. 1.7 t at max radius. 73 m free-standing height on the published sheet.",
      },
      {
        title: "R220-10",
        body: "10 t max. 65 m jib. 2.2 t at max radius. 46.1 m free-standing height on the published sheet.",
      },
      {
        title: "R275-10/12",
        body: "10/12 t max. 70 m jib. 2.7 t at max radius. 70 m free-standing height. R275 is the published upgrade of WA7025.",
      },
      {
        title: "Control",
        body: "R-generation intelligent control where fitted. Remote and cab. Anti-collision, anti-skid hook, sensors. 2-fall / 4-fall as configured.",
      },
    ],
    charts: [
      {
        href: zlFile("52fe86b11a3e4aa6a11630c42e814e52"),
        label: "R165-8/10 — MANUAL DOWNLOAD →",
        note: "Zoomlion published file on the English product page.",
      },
      {
        href: zl(1057),
        label: "R165-8/10 — PRODUCT PAGE →",
      },
      {
        href: zlFile("446c73b029cb4b399f8e9e1a35c7cb6a"),
        label: "R220-10 — MANUAL DOWNLOAD →",
      },
      {
        href: zl(1058),
        label: "R220-10 — PRODUCT PAGE →",
      },
      {
        href: zlFile("5548f2380a4b4001bc57e456a211a206"),
        label: "R275-10/12 — MANUAL DOWNLOAD →",
      },
      {
        href: zl(1060),
        label: "R275-10/12 — PRODUCT PAGE →",
      },
      {
        href: zlFile("237e5481a1494da2911880ac6cf7b6db"),
        label: "R135-8 — MANUAL DOWNLOAD →",
      },
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=82",
        label: "FLAT-TOP RANGE — ZOOMLION →",
      },
    ],
    manuals: [
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=82",
        label: "ZOOMLION FLAT-TOP LISTING →",
        note: "Manual Download on the current R-series product pages. Serial operator and lubrication manuals stay in the cab.",
      },
      {
        href: "https://en.zoomlion.com/",
        label: "ZOOMLION ENGLISH →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "R-generation control: configuration, limits, anti-collision, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Anti-skid hook function where fitted",
      "Round-tenon mast, pins, ties, climbing frame if fitted",
      "Slew ring bolts, weathervaning, anemometer",
      "Access, platforms, cab or remote as installed",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "Control and sensor checks — items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "Mast tenons and pins per the serial interval",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "zoomlion-rl",
    title: "ZOOMLION RL",
    number: "GOSPEL-CRN-013",
    family: "LUFFING JIB",
    maker: "Zoomlion",
    summary:
      "Topless hydraulic luffing jib. RL165, RL205, RL250. Built for tight urban sites. Lift to the serial chart in the cab.",
    productUrl:
      "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=229",
    specs: [
      {
        title: "RL250-12/16",
        body: "12/16 t max. 60 m working radius. Free-standing height 52.65 m on L69, 62.85 m on RB.",
      },
      {
        title: "RL205-10/12",
        body: "10/12 t max. 55 m working radius. Free-standing height 49.65 m on L68, 62.85 m on RB.",
      },
      {
        title: "RL165-10",
        body: "10 t max. 50 m working radius. Free-standing height 41.25 m on RA, 46.65 m on L68.",
      },
      {
        title: "Luffing",
        body: "Hydraulic. Topless upper. Match this mast and this jib to the chart in the cab.",
      },
    ],
    charts: [
      {
        href: zl(855),
        label: "RL250-12/16 — PRODUCT PAGE →",
        note: "Published range on the English product site. Serial chart in the cab wins.",
      },
      {
        href: zl(854),
        label: "RL205-10/12 — PRODUCT PAGE →",
      },
      {
        href: zl(833),
        label: "RL165-10 — PRODUCT PAGE →",
      },
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=229",
        label: "RL RANGE — ZOOMLION →",
      },
    ],
    manuals: [
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=229",
        label: "ZOOMLION RL LISTING →",
        note: "Hydraulic luffing lives in the serial maintenance manual — follow that interval.",
      },
      {
        href: "https://en.zoomlion.com/",
        label: "ZOOMLION ENGLISH →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Hydraulic luffing: rams, hoses, tank, leaks, level",
      "Jib pins, keepers, luffing geometry. Jib can go near-vertical — check clearance",
      "Hoist rope, hook block, anti-two-block",
      "Slew, weathervaning at the published short radius for this jib",
      "Mast bolts, pins, ties. Topless upper as installed",
      "Limit devices and overload. Anemometer",
      "Out-of-service jib position per the OEM for this wind",
    ],
    maint: [
      "Hydraulic oil, filters, ram glands, hoses — OEM interval",
      "Luffing pins and greasing",
      "Hoist winch oil, brakes, rope",
      "Slew grease and bolts",
      "Electrical and earthing",
      "Control and sensor checks where fitted",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "zoomlion-luffing",
    title: "ZOOMLION LUFFING JIB",
    number: "GOSPEL-CRN-014",
    family: "LUFFING JIB",
    maker: "Zoomlion",
    summary:
      "L, LW and LH rope luffers, plus the RL hydraulic. Same job: a jib that luffs so the crane can work tight to the building. Match the machine on site to the right chart.",
    productUrl:
      "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=81",
    specs: [
      {
        title: "RL hydraulic",
        body: "Topless hydraulic. RL165, RL205, RL250. See GOSPEL-CRN-013.",
      },
      {
        title: "L125-8RA",
        body: "8 t max. 50 m jib. 1.5 t at max radius. 35.65 m free-standing height on the published sheet.",
      },
      {
        title: "L200-12RB",
        body: "12 t max. 55 m jib. 2.2 t at max radius. 57.15 m free-standing height on the published sheet.",
      },
      {
        title: "L400-25U",
        body: "25 t max. 60 m jib. 4.71 t at max radius. 51.65 m free-standing height on the published sheet.",
      },
      {
        title: "Heavier L / LW / LH",
        body: "L500 through L1600, LH650 / LH3350, LW2340 through LW3600 live on the English luffing listing. Match the plate to that page.",
      },
    ],
    charts: [
      {
        href: "/safety/crane/zoomlion-rl",
        label: "RL HYDRAULIC — CHARTS AND FORMS →",
      },
      {
        href: zl(155),
        label: "L125-8RA — PRODUCT PAGE →",
      },
      {
        href: zl(158),
        label: "L200-12RB — PRODUCT PAGE →",
      },
      {
        href: zl(162),
        label: "L400-25U — PRODUCT PAGE →",
      },
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=81",
        label: "LUFFING RANGE — ZOOMLION →",
      },
    ],
    manuals: [
      {
        href: "https://en-product.zoomlion.com/product/pro_list.htm?sCat=56&fCat=81",
        label: "ZOOMLION LUFFING LISTING →",
        note: "Rope luffers: luffing rope, cathead, luffing winch. Hydraulic RL: rams and tank. The serial manual names the interval.",
      },
      {
        href: "https://en.zoomlion.com/",
        label: "ZOOMLION ENGLISH →",
      },
    ],
    inspect: [
      "Which luffer: hydraulic RL or rope L / LW / LH. Inspection follows that machine",
      "Jib angle against the chart for this radius and this reeving",
      "Out-of-service / weathervane radius for this jib length",
      "Rope luffer: luffing rope, cathead sheaves, luffing winch, dead ends",
      "Hydraulic RL: rams, hoses, tank, pins — see GOSPEL-CRN-013",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, mast, ties, access",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
      "Structure: jib, cathead or ram attachments, mast",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "raimondi-flat-top",
    title: "RAIMONDI FLAT-TOP",
    number: "GOSPEL-CRN-015",
    family: "TOPLESS",
    maker: "Raimondi",
    summary:
      "MRT heritage flat-top and T-series. Data sheets sit on the product page. Lift to the serial chart in the cab.",
    productUrl: "https://raimondi.com/en/product_cat/flat-top-cranes/t-series/",
    specs: [
      {
        title: "T-series",
        body: "Current Raimondi flat-top. T87 5 t / 51 m through T577 24 t / 80 m. T187 and T207: 10 t, 67.5 m jib. Modular parts. Raimondi control and cab on this series.",
      },
      {
        title: "MRT159",
        body: "Heritage MRT. 8 t max. 65 m jib. 45 kW hoist. Still on sites — use the MRT chart for that serial.",
      },
      {
        title: "MRT294",
        body: "16 t max. 76 m jib. 75 kW hoist. Top of the published MRT pack.",
      },
      {
        title: "MRT range",
        body: "MRT84 5 t / 51 m, MRT167 8 t / 65 m, MRT189 10 t / 65 m, MRT234 12 t / 70 m. Match the plate to the MRT page.",
      },
    ],
    charts: [
      {
        href: rm("raimondi-t187-topless-tower-crane"),
        label: "T187 — PRODUCT PAGE + DATA SHEET →",
        note: "Downloads on the page: T187-10 and T187-8 technical data sheets.",
      },
      {
        href: rm("raimondi-t207-topless-tower-crane-2"),
        label: "T207 — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: rm("raimondi-mrt159-topless-tower-crane-10"),
        label: "MRT159 — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: rm("raimondi-mrt294-topless-tower-crane-8"),
        label: "MRT294 — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: "https://raimondi.com/en/product_cat/flat-top-cranes/t-series/",
        label: "T-SERIES RANGE →",
      },
      {
        href: "https://raimondi.com/en/product_cat/flat-top-cranes/mrt-series/",
        label: "MRT SERIES RANGE →",
      },
    ],
    manuals: [
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI →",
        note: "Serial operator and maintenance manuals stay in the cab. T-series uses Raimondi’s in-house control — follow that interval.",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Raimondi control: configuration, limits, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "Access, platforms, cab as installed",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "Control and sensor checks — items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "raimondi-luffing",
    title: "RAIMONDI LUFFING JIB",
    number: "GOSPEL-CRN-016",
    family: "LUFFING JIB",
    maker: "Raimondi",
    summary:
      "LR rope luffers and the LRH174 hydraulic. Same job: a jib that luffs so the crane can work tight to the building. Lift to the serial chart in the cab.",
    productUrl: "https://raimondi.com/en/product_cat/luffing-jib-cranes/lr-series/",
    specs: [
      {
        title: "LRH174",
        body: "Hydraulic. 10 t max. 50 m jib. 2.25 t at max radius in Ultra-lift, two falls. Out-of-service about 10 m. Jib to 85° in about 1.8 minutes. No A-frame — jib and hoist assembled at ground level.",
      },
      {
        title: "LR213",
        body: "Rope luffer. 14 t max. 55 m jib. 73.5 kW hoist.",
      },
      {
        title: "LR273",
        body: "18 t max. 60 m jib. 67/86 kW hoist.",
      },
      {
        title: "LR372 / LR60",
        body: "LR372: 20 t, 60 m, 110 kW. LR60: 5 t, 36 m, 22 kW. Match the plate to that page.",
      },
    ],
    charts: [
      {
        href: rm("raimondi-lrh174-luffing-jib-crane"),
        label: "LRH174 — PRODUCT PAGE + DATA SHEET →",
        note: "Hydraulic luffer. Downloads on the page.",
      },
      {
        href: rm("raimondi-lr273-luffing-jib-crane"),
        label: "LR273 — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: rm("raimondi-lr213-luffing-jib-crane"),
        label: "LR213 — PRODUCT PAGE →",
      },
      {
        href: rm("raimondi-lr372-luffing-jib-crane"),
        label: "LR372 — PRODUCT PAGE →",
      },
      {
        href: "https://raimondi.com/en/product_cat/luffing-jib-cranes/lr-series/",
        label: "LR SERIES RANGE →",
      },
    ],
    manuals: [
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI →",
        note: "Rope LR: luffing rope, cathead, luffing winch. Hydraulic LRH: rams and tank. The serial manual names the interval.",
      },
    ],
    inspect: [
      "Which luffer: hydraulic LRH or rope LR. Inspection follows that machine",
      "Serial, jib length, reeving, ballast match the chart in the cab",
      "Jib angle against the chart for this radius and this reeving",
      "Hydraulic LRH: cylinder, hoses, power pack, leaks, level. Near-vertical clearance",
      "Rope LR: luffing rope, winch, cathead, dead ends",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, weathervaning, mast, ties",
      "Out-of-service jib position for this wind",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hydraulic LRH: oil, filters, cylinder glands — OEM interval",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "terex-ctt",
    title: "TEREX CTT",
    number: "GOSPEL-CRN-017",
    family: "TOPLESS",
    maker: "Terex",
    summary:
      "CTT flat-top. Now on raimondi.com. Terex Power Plus where fitted. Lift to the serial chart in the cab.",
    productUrl: "https://raimondi.com/en/product_cat/flat-top-cranes/ctt-series/",
    specs: [
      {
        title: "CTT 172-8",
        body: "8 t max. 65 m (213 ft) jib. 1.71 t at max radius.",
      },
      {
        title: "CTT 202-10 / 222-10",
        body: "10 t max. 65 m jib. 2.3 t at max radius on the 202. 2.58 t on the 222.",
      },
      {
        title: "CTT 472-20",
        body: "20 t (22 USt) max. 80 m (262 ft) jib. 4 t (4.4 USt) at max radius, 4.5 t with Terex Power Plus. II–IV falls. S-Pace cab.",
      },
      {
        title: "Range",
        body: "CTT 91-5 through CTT 722-40 on the Raimondi CTT listing, plus FC 6.24H. T-Link, T-Torque, T-Lift where fitted.",
      },
    ],
    charts: [
      {
        href: rm("terex-ctt-172-8-flat-top-tower-crane"),
        label: "CTT 172-8 — PRODUCT PAGE + DATA SHEET →",
        note: "Metric data sheet and city-class brochure in Downloads.",
      },
      {
        href: rm("terex-ctt-202-10-flat-top-tower-crane"),
        label: "CTT 202-10 — PRODUCT PAGE →",
      },
      {
        href: rm("terex-ctt-472-20-flat-top-tower-crane"),
        label: "CTT 472-20 — PRODUCT PAGE + DATA SHEET →",
        note: "Metric and imperial sheets. TPP extra is on the published curve when enabled.",
      },
      {
        href: "https://raimondi.com/en/product_cat/flat-top-cranes/ctt-series/",
        label: "CTT SERIES RANGE →",
      },
    ],
    manuals: [
      {
        href: rm("t-link"),
        label: "T-LINK →",
        note: "Telematics where fitted. Serial operator and maintenance manuals stay in the cab.",
      },
      {
        href: rm("t-torque-slewing-technology"),
        label: "T-TORQUE →",
      },
      {
        href: rm("teos-operating-system"),
        label: "TEOS →",
      },
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI / TEREX TOWER →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "TEOS / T-Link: configuration, limits, Terex Power Plus setting, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "T-Torque slew where fitted",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "S-Pace cab if fitted. Access, platforms",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "TEOS maintenance items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, T-Torque, weathervane",
      "Trolley: wheels, rope, limits",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "terex-ctl",
    title: "TEREX CTL",
    number: "GOSPEL-CRN-018",
    family: "LUFFING JIB",
    maker: "Terex",
    summary:
      "CTL rope luffers and the CTLH 192-12 hydraulic. Now on raimondi.com. Lift to the serial chart in the cab.",
    productUrl: "https://raimondi.com/en/product_cat/luffing-jib-cranes/ctl-series/",
    specs: [
      {
        title: "CTLH 192-12",
        body: "Hydraulic. 12 t (26,455 lb) max. 55 m (180 ft) jib. 2.35 t (5,181 lb) at max radius. 67 kW hoist. I–II–III falls.",
      },
      {
        title: "CTL 180-16",
        body: "Rope luffer. 16 t max. 55 m jib. 2 t at max radius.",
      },
      {
        title: "CTL 712-45",
        body: "45 t max. 70 m jib. 5.8 t at max radius. T-Line auto-levelling. T-Torque. Ground-level assembly on the published sheet.",
      },
      {
        title: "Range",
        body: "CTL 140-10 through CTL 1600-66 on the Raimondi CTL listing. Match the plate to that page.",
      },
    ],
    charts: [
      {
        href: rm("terex-ctlh-192-12-hydraulic-luffing-jib-crane"),
        label: "CTLH 192-12 — PRODUCT PAGE + DATA SHEET →",
        note: "Hydraulic luffer. Metric sheet and brochure in Downloads.",
      },
      {
        href: rm("terex-ctl-180-16-luffing-jib-crane"),
        label: "CTL 180-16 — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: rm("terex-ctl-712-45-luffing-jib-crane"),
        label: "CTL 712-45 — PRODUCT PAGE + DATA SHEET →",
        note: "Metric and imperial sheets.",
      },
      {
        href: "https://raimondi.com/en/product_cat/luffing-jib-cranes/ctl-series/",
        label: "CTL SERIES RANGE →",
      },
    ],
    manuals: [
      {
        href: rm("t-link"),
        label: "T-LINK →",
        note: "Rope CTL: luffing winch, luffing rope, cathead. Hydraulic CTLH: cylinder and power pack. The serial manual names the interval.",
      },
      {
        href: rm("t-torque-slewing-technology"),
        label: "T-TORQUE →",
      },
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI / TEREX TOWER →",
      },
    ],
    inspect: [
      "Which luffer: hydraulic CTLH or rope CTL. Inspection follows that machine",
      "Serial, jib length, reeving, ballast match the chart in the cab",
      "Jib angle against the chart for this radius and this reeving",
      "T-Line auto-levelling where fitted — hook height holds as the jib moves",
      "Hydraulic CTLH: cylinder, hoses, power pack, leaks, level",
      "Rope CTL: luffing rope, winch, cathead, dead ends",
      "T-Torque slew. Overload. Anemometer",
      "Out-of-service jib position for this wind",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hydraulic CTLH: oil, filters, cylinder glands — OEM interval",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "terex-self-erect",
    title: "TEREX SELF-ERECTING",
    number: "GOSPEL-CRN-019",
    family: "SELF-ERECTING",
    maker: "Terex",
    summary:
      "CBR and CSE. Unfold, lift, fold. CSA Z248 still applies. Now on raimondi.com. Lift to the serial chart for this jib position and this ballast.",
    productUrl: "https://raimondi.com/en/product_cat/self-erecting-cranes/",
    specs: [
      {
        title: "CSE 40",
        body: "4.4 t (4.85 USt) max. 40 m (131 ft) jib. 1.15 t (1.27 USt) at max radius with Terex Power Plus. Hook height 25.6 m to 32.2 m. Swing radius 2.8 m. TPP and Power Match.",
      },
      {
        title: "CSE 32",
        body: "4.4 t max. 32 m jib. 1.15 t at max radius on the published listing.",
      },
      {
        title: "CBR 32 PLUS / CBR 40H",
        body: "4 t max. 32 m or 40 m jib. 1 t at max radius.",
      },
      {
        title: "CBR 21H / 24 PLUS / 28 PLUS",
        body: "1.6 t / 21 m, 2 t / 24 m, 2.5 t / 28 m. Match the plate to that page.",
      },
    ],
    charts: [
      {
        href: rm("terex-cse-40-self-erecting-crane"),
        label: "CSE 40 — PRODUCT PAGE + DATA SHEET →",
        note: "Metric sheet and CSE series brochure in Downloads.",
      },
      {
        href: rm("terex-cse-32-self-erecting-crane"),
        label: "CSE 32 — PRODUCT PAGE →",
      },
      {
        href: rm("terex-cbr-32-plus-self-erecting-crane"),
        label: "CBR 32 PLUS — PRODUCT PAGE + DATA SHEET →",
        note: "Metric and imperial sheets.",
      },
      {
        href: rm("terex-cbr-40h-self-erecting-crane"),
        label: "CBR 40H — PRODUCT PAGE + DATA SHEET →",
      },
      {
        href: "https://raimondi.com/en/product_cat/self-erecting-cranes/",
        label: "SELF-ERECTING RANGE →",
      },
    ],
    manuals: [
      {
        href: "https://raimondi.com/en/product_cat/self-erecting-cranes/",
        label: "TEREX SELF-ERECTING ON RAIMONDI →",
        note: "Unfold / fold sequence, ballast, outriggers, remote, lubrication. TPP and Power Match are in the serial manual — follow it.",
      },
    ],
    inspect: [
      "Chassis, outriggers, jacks, pads, slope within the OEM limit",
      "Ballast complete and locked as the chart for this jib",
      "Unfold complete. Transport locks off. Pins and keepers in",
      "Jib position (horizontal / raised / short) matches the chart in use",
      "Remote or cab: function, E-stop, Terex Power Plus setting, no uncleared alarm",
      "Hoist rope, hook, trolley or luffed jib as fitted, limits",
      "Power: voltage, phase, earthing as the plate",
      "Weathervane / out-of-service as the OEM for this wind",
    ],
    maint: [
      "Unfold / fold mechanisms, pins, hydraulic rams where fitted",
      "Outrigger beams, jacks, holding valves",
      "Hoist, slew, trolley — OEM lubrication",
      "Electrical panel, remote batteries, cables",
      "Wire rope and hook block",
      "Transport axles and locks when the crane will travel",
    ],
    forms: [
      {
        href: "/safety/form/self-erect-inspection",
        label: "SELF-ERECT INSPECTION — PROVEN-FRM-029 →",
      },
      { href: "/safety/builder/self-erect-inspection", label: "FILL SELF-ERECT INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "jaso-flat-top",
    title: "JASO FLAT TOP",
    number: "GOSPEL-CRN-020",
    family: "TOPLESS",
    maker: "Jaso",
    summary:
      "Flat-top city crane. Eco Mode. Smartlink. Extra Lift where fitted. Lift to the serial chart in the cab.",
    productUrl: "https://jaso.com/tower/en/crane_category/flat-top-en/",
    specs: [
      {
        title: "J165.8",
        body: "8 t (17,600 lb) max. 60 m (197 ft) jib. 1.75 t (3,900 lb) at max radius.",
      },
      {
        title: "J235.10",
        body: "10 t (22,000 lb) max. 65 m (213 ft) jib. 2.7 t (6,000 lb) at max radius.",
      },
      {
        title: "J235.12",
        body: "12 t (26,500 lb) max. 65 m (213 ft) jib. 2.6 t (5,700 lb) at max radius.",
      },
      {
        title: "Control",
        body: "Eco Mode. Smartlink. Microspeed. Progressive slewing. Extra Lift where fitted. Tower sections interchange with other JASO series — confirm this mast against the configuration in the cab.",
      },
    ],
    charts: [
      {
        href: jaso("2024/10/J165.8_EN-14439-C25_LB-FT_HT17301101-1.pdf"),
        label: "J165.8 — EN 14439 C25 IMPERIAL →",
        note: "LB / FT. Serial chart in the cab wins.",
      },
      {
        href: jaso("2024/10/J165.8_EN-14439-C25_ES-GB_HT17300101-1.pdf"),
        label: "J165.8 — EN 14439 C25 METRIC →",
      },
      {
        href: jaso("2025/10/J235.10_EN-14439-C25_ES-GB_HT17100105-3.pdf"),
        label: "J235.10 — EN 14439 C25 METRIC →",
      },
      {
        href: jaso("2023/02/J235.12_EN-14439-C25_LB-FT_HT17101104-2.pdf"),
        label: "J235.12 — EN 14439 C25 IMPERIAL →",
      },
      {
        href: jaso("2023/02/J235.12_EN-14439-C25_ES-GB_HT17100104-2.pdf"),
        label: "J235.12 — EN 14439 C25 METRIC →",
      },
      {
        href: "https://jaso.com/tower/en/crane_category/flat-top-en/",
        label: "FLAT TOP RANGE — JASO →",
      },
    ],
    manuals: [
      {
        href: "https://jaso.com/tower/en/we-are-jaso/technology/",
        label: "JASO TECHNOLOGY — SMARTLINK / ECO MODE →",
        note: "Serial operator and lubrication manuals stay in the cab. Extra Lift, Opticube and TC Diagnostic live here.",
      },
      {
        href: "https://jaso.com/tower/en/we-are-jaso/service/",
        label: "JASO SERVICE →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Smartlink / Eco Mode: configuration, limits, Extra Lift setting, no uncleared alarm",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "Access, platforms, JL25 lift if fitted",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "Smartlink / TC Diagnostic — items due this interval",
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "jaso-hpa",
    title: "JASO HPA",
    number: "GOSPEL-CRN-021",
    family: "LUFFING JIB",
    maker: "Jaso",
    summary:
      "Hydraulic luffing jib. Ram at the back of the tower. Built for tight urban sites. Lift to the serial chart in the cab.",
    productUrl: "https://jaso.com/tower/en/crane_category/hydraulic-luffing-en/",
    specs: [
      {
        title: "J118HPA",
        body: "6 t (13,200 lb) max. 45 m (148 ft) jib. 1.6 t (3,500 lb) at max radius.",
      },
      {
        title: "J168HPA",
        body: "6 t (13,200 lb) max. 50 m (164 ft) jib. 2.5 t (5,500 lb) at max radius.",
      },
      {
        title: "J198HPA",
        body: "18 t (39,700 lb) max. 55 m (180 ft) jib. 1.8 t (4,000 lb) at max radius.",
      },
      {
        title: "Luffing",
        body: "Hydraulic ram behind the tower. Lower energy draw than a rope luffer. Same tower sections as the rest of the JASO pack.",
      },
    ],
    charts: [
      {
        href: jaso("2023/02/J118HPA_EN-14439-C25_ES-GB_HT21300101.pdf"),
        label: "J118HPA — EN 14439 C25 METRIC →",
      },
      {
        href: jaso("2023/02/J168HPA_EN-14439-C25_ES-GB_HT20800101.pdf"),
        label: "J168HPA — EN 14439 C25 METRIC →",
      },
      {
        href: jaso("2023/02/J168HPA_HT208.01.0.01.pdf"),
        label: "J168HPA — IMPERIAL SHEET →",
      },
      {
        href: jaso("2023/02/J198HPA_EN-14439-C25_ES-GB_HT21500101.pdf"),
        label: "J198HPA — EN 14439 C25 METRIC →",
      },
      {
        href: "https://jaso.com/tower/en/crane_category/hydraulic-luffing-en/",
        label: "HPA RANGE — JASO →",
      },
    ],
    manuals: [
      {
        href: "https://jaso.com/tower/en/we-are-jaso/technology/",
        label: "JASO TECHNOLOGY →",
        note: "Hydraulic luffing lives in the serial maintenance manual — follow that interval.",
      },
      {
        href: "https://jaso.com/tower/en/we-are-jaso/service/",
        label: "JASO SERVICE →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Hydraulic luffing: ram at the rear of the tower, hoses, tank, leaks, level",
      "Jib pins, keepers, luffing geometry. Jib can go near-vertical — check clearance",
      "Hoist rope, hook block, anti-two-block",
      "Slew, weathervaning at the published short radius for this jib",
      "Mast bolts, pins, ties. Same sections as the flat-top pack",
      "Limit devices and overload. Anemometer. Eco Mode",
      "Out-of-service jib position per the OEM for this wind",
    ],
    maint: [
      "Hydraulic oil, filters, ram glands, hoses — OEM interval",
      "Luffing pins and greasing",
      "Hoist winch oil, brakes, rope",
      "Slew grease and bolts",
      "Smartlink / TC Diagnostic where fitted",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "jaso-luffing",
    title: "JASO LUFFING",
    number: "GOSPEL-CRN-022",
    family: "LUFFING JIB",
    maker: "Jaso",
    summary:
      "PA rope luffers. Same job: a jib that luffs so the crane can work tight to the building. Match the machine on site to the right chart.",
    productUrl: "https://jaso.com/tower/en/crane_category/luffing-en/",
    specs: [
      {
        title: "HPA hydraulic",
        body: "J118HPA, J168HPA, J198HPA. See GOSPEL-CRN-021.",
      },
      {
        title: "J138PA.A",
        body: "8 t (17,600 lb) max. 45 m (148 ft) jib. 2.25 t (5,000 lb) at max radius.",
      },
      {
        title: "J208PA / J265PA",
        body: "18 t max. 60 m jib. 1.7 t at tip on the 208. 2.2 t on the 265.",
      },
      {
        title: "Heavier PA",
        body: "J280PA through J780PA on the English luffing listing. J780PA: 75 t, 70 m, 5.7 t at tip. Match the plate to that sheet.",
      },
    ],
    charts: [
      {
        href: "/safety/crane/jaso-hpa",
        label: "HPA HYDRAULIC — CHARTS AND FORMS →",
      },
      {
        href: jaso("2022/11/J138PA.A_EN-14439-C25_LB-FT_HT20101101.pdf"),
        label: "J138PA.A — EN 14439 C25 IMPERIAL →",
      },
      {
        href: jaso("2022/11/J138PA.A_EN-14439-C25_ES-GB_HT20100101-1.pdf"),
        label: "J138PA.A — EN 14439 C25 METRIC →",
      },
      {
        href: jaso("2022/11/J208PA_EN-14439-C25_LB-FT_HT20001105-2.pdf"),
        label: "J208PA — EN 14439 C25 IMPERIAL →",
      },
      {
        href: jaso("2022/11/J265PA_EN-14439-C25_LB-FT_HT21101101.pdf"),
        label: "J265PA — EN 14439 C25 IMPERIAL →",
      },
      {
        href: "https://jaso.com/tower/en/crane_category/luffing-en/",
        label: "PA RANGE — JASO →",
      },
    ],
    manuals: [
      {
        href: "https://jaso.com/tower/en/we-are-jaso/technology/",
        label: "JASO TECHNOLOGY →",
        note: "Rope PA: luffing rope, cathead, luffing winch. Hydraulic HPA: ram and tank. The serial manual names the interval.",
      },
      {
        href: "https://jaso.com/tower/en/we-are-jaso/service/",
        label: "JASO SERVICE →",
      },
    ],
    inspect: [
      "Which luffer: hydraulic HPA or rope PA. Inspection follows that machine",
      "Jib angle against the chart for this radius and this reeving",
      "Out-of-service / weathervane radius for this jib length",
      "Rope PA: luffing rope, cathead sheaves, luffing winch, dead ends",
      "Hydraulic HPA: ram, hoses, tank, pins — see GOSPEL-CRN-021",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, mast, ties, access. Same sections as the flat-top pack",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and, on rope luffers, the luffing line",
      "Structure: jib, cathead or ram attachments, mast",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "pecco-sk",
    title: "PECCO SK",
    number: "GOSPEL-CRN-023",
    family: "HAMMERHEAD",
    maker: "Pecco",
    summary:
      "Hammerhead. Tower top. Peiner built them. Pecco was the North American name. Lift to the serial chart in the cab.",
    productUrl: "https://www.morrow.com/equipment/hammerhead/",
    specs: [
      {
        title: "SK 225-10/20",
        body: "20 t (44,100 lb) max. 61 m (200 ft) jib. 3.2 t (7,100 lb) at max radius.",
      },
      {
        title: "SK 355-20",
        body: "20 t (44,100 lb) max. 66 m (218 ft) jib. 4.4 t (9,700 lb) at max radius.",
      },
      {
        title: "Range",
        body: "SK 180 through SK 500 on the Morrow hammerhead listing. SK 180: 12.3 t, 60 m, 2.2 t at tip. SK 280-16: 16 t, 69 m, 2.6 t at tip. SK 500-10: 10 t, 67 m, 5.2 t at tip. Match the plate to that sheet.",
      },
      {
        title: "Line",
        body: "Peiner, Germany. Pecco in North America. Terex took Peiner in 1998. Morrow published these NA range sheets. Current Terex SK hammerheads sit under Raimondi. Peiner SMK self-erects ran in the same fleet — no Morrow public sheet. Serial chart in the cab. Current Terex self-erects: GOSPEL-CRN-019.",
      },
    ],
    charts: [
      {
        href: pecco("SK-180"),
        label: "SK 180 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SK-200"),
        label: "SK 200 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SK-225"),
        label: "SK 225 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SK-280-16"),
        label: "SK 280-16 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SK-355-20"),
        label: "SK 355-20 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SK-500-10"),
        label: "SK 500-10 — MORROW RANGE SHEET →",
      },
      {
        href: "https://www.morrow.com/equipment/hammerhead/",
        label: "HAMMERHEAD RANGE — MORROW →",
      },
    ],
    manuals: [
      {
        href: "https://www.morrow.com/equipment/datasheets/",
        label: "MORROW DATASHEETS — PECCO / PEINER →",
        note: "Serial operator and maintenance manuals stay in the cab. Use the serial on the builder’s plate. Current Peiner-line SK support sits with Terex under Raimondi.",
      },
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI — TEREX TOWER →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Tower top, pendants, jib pins, keepers",
      "Hoist rope, trolley rope, hook block, trolley, jib and counter-jib",
      "Slew ring bolts, weathervaning, anemometer",
      "Mast bolts, pins, ties, climbing frame if fitted",
      "Access, platforms, cab",
      "Limit switches: hoist, trolley, slew. Anti-two-block",
      "Out-of-service / weathervane set for this jib",
    ],
    maint: [
      "Hoist and trolley winches: oil, brakes, rope spooling",
      "Slew: grease, bolts, weathervane function",
      "Trolley: wheels, rope, limits",
      "Tower top and pendant hardware",
      "OEM lubrication chart for this serial",
    ],
    forms: [
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      { href: "/safety/builder/tower-pre-use", label: "FILL TOWER PRE-USE →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
  {
    slug: "pecco-sn",
    title: "PECCO SN",
    number: "GOSPEL-CRN-024",
    family: "LUFFING JIB",
    maker: "Pecco",
    summary:
      "Rope luffing jib. Short tail-swing. SN 160 and SN 355. SKK 140 articulated jib on the same NA sheets. Lift to the serial chart in the cab.",
    productUrl: "https://www.morrow.com/equipment/luffing-boom/",
    specs: [
      {
        title: "SN 160-16",
        body: "16 t (35,300 lb) max. 50 m (164 ft) jib. 2,585 kg (5,700 lb) at max radius. Morrow sheet names the serials it covers.",
      },
      {
        title: "SN 355-8/16",
        body: "16 t (35,300 lb) max. 60 m (197 ft) jib. 3,490 kg (7,700 lb) at max radius.",
      },
      {
        title: "SKK 140",
        body: "Articulated jib. 12.5 t (27,600 lb) max. 50 m (164 ft). 3 t (6,600 lb) at max radius.",
      },
    ],
    charts: [
      {
        href: pecco("SN-160-16"),
        label: "SN 160-16 — MORROW RANGE SHEET →",
        note: "Covers the serials named on that PDF. Serial chart in the cab wins.",
      },
      {
        href: pecco("SN-355"),
        label: "SN 355 — MORROW RANGE SHEET →",
      },
      {
        href: pecco("SKK-140"),
        label: "SKK 140 — MORROW RANGE SHEET →",
      },
      {
        href: "https://www.morrow.com/equipment/luffing-boom/",
        label: "LUFFING RANGE — MORROW →",
      },
    ],
    manuals: [
      {
        href: "https://www.morrow.com/equipment/datasheets/",
        label: "MORROW DATASHEETS — PECCO / PEINER →",
        note: "Rope luffing: luffing rope, cathead, luffing winch. SKK: articulated knuckle. The serial manual names the interval.",
      },
      {
        href: "https://raimondi.com/en/",
        label: "RAIMONDI — TEREX TOWER →",
      },
    ],
    inspect: [
      "Serial, jib length, reeving, counterweight and mast match the chart in the cab",
      "Jib angle against the chart for this radius and this reeving",
      "Out-of-service / weathervane radius for this jib length",
      "Rope SN: luffing rope, cathead sheaves, luffing winch, dead ends",
      "SKK articulated: knuckle pins, keepers, geometry",
      "Hoist rope, hook, limits, overload, anemometer",
      "Slew, mast, ties, access",
    ],
    maint: [
      "Luffing system on the OEM interval for this serial",
      "Hoist and slew as the lubrication chart",
      "Wire rope: hoist and the luffing line",
      "Structure: jib, cathead, mast. SKK knuckle if fitted",
    ],
    forms: [
      {
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      { href: "/safety/builder/luffing-jib-inspection", label: "FILL LUFFING JIB INSPECTION →" },
      { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE — PROVEN-FRM-027 →" },
      {
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
    ],
  },
];

export function getCrane(slug: string) {
  return CRANES.find((item) => item.slug === slug);
}
