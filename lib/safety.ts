import { COR_ELEMENTS, PROGRAM_HIERARCHY, WSBC_33 } from "@/lib/ohs/system";
import { LIGHTNING_RULE, MAD_APPROACH, MAD_DOWN, MAD_UNKNOWN } from "@/lib/ohs/meta";

export type Step = { n: string; title: string; body: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: Step[] }
  | { type: "rules"; items: { title: string; body: string }[] }
  | { type: "cta"; href: string; label: string }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] };

export type SafetyLibraryKind =
  | "swp"
  | "jha"
  | "sjp"
  | "policy"
  | "form"
  | "sds"
  | "report"
  | "crane"
  | "binder";

export type SafetySection = {
  num: string;
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  library?: SafetyLibraryKind;
  blocks: Block[];
};

export const RIGGING_A_LOAD: Step[] = [
  {
    n: "01",
    title: "PLAN THE LIFT",
    body: "Confirm load weight, centre of gravity, lifting points and required capacity. If any of those are unknown, do not rig.",
  },
  {
    n: "02",
    title: "INSPECT THE RIGGING",
    body: "Inspect slings, shackles, hooks and hardware before use. Damaged gear is out of service. No exceptions, no “one more lift.”",
  },
  {
    n: "03",
    title: "CONNECT THE LOAD",
    body: "Install rigging correctly and protect it from sharp edges. Hardware sits straight. Slings are not twisted, knotted or choked off a guess.",
  },
  {
    n: "04",
    title: "CLEAR THE AREA",
    body: "Establish the exclusion zone and confirm communication. Nobody walks under a load. Nobody stands in the fall line.",
  },
  {
    n: "05",
    title: "TEST THE LIFT",
    body: "Take the load just clear of the ground and verify balance. If it tilts, lands or shocks — lower it and re-rig.",
  },
  {
    n: "06",
    title: "MAKE THE LIFT",
    body: "Lift smoothly while maintaining communication and control. Stop on any lost signal, unexpected movement or change in conditions.",
  },
];

export const SAFETY: SafetySection[] = [
  {
    num: "01",
    slug: "company-safety-policy",
    title: "COMPANY SAFETY POLICY",
    kicker: "The standard is not a poster.",
    intro:
      "This site publishes crane safety information. Proven is the occupational health and safety management system — the published standard for how operators, riggers, signalpersons and supervisors plan, rig, signal and lift.",
    blocks: [
      {
        type: "quote",
        text: "If the work cannot be named, it is not a procedure.",
      },
      {
        type: "p",
        text: "Proven is the rulebook for lifting work. It applies to every operator, rigger, signalperson and supervisor working to this program. Anyone on the lift can read it before the gate. That is deliberate.",
      },
      {
        type: "h",
        text: "WHAT PROVEN IS",
      },
      {
        type: "list",
        items: [
          "The minimum standard for how operators, riggers, signalpersons and supervisors plan, rig, signal and lift.",
          "A public document. It is not proprietary. It does not expire. It is not behind a form.",
          "Subordinate to law. Where applicable occupational health and safety law is stricter, the law wins. Where this program is stricter, this program wins.",
          "Written to be used. Procedures are sequenced the way the work actually happens.",
          "Used with the site-specific hazard assessment and the site rules. Where those rules are stricter or required, they apply.",
          "The standard competent people work to. A ticket is not competency.",
        ],
      },
      {
        type: "cta",
        href: "/safety/ohs-policies",
        label: "13 — OH&S POLICIES →",
      },
      {
        type: "h",
        text: "POLICY STATEMENTS",
      },
      {
        type: "rules",
        items: [
          {
            title: "No lift without a plan.",
            body: "Weight, centre of gravity, lifting points, capacity, path, exclusion zone and communication are confirmed before the hook is loaded.",
          },
          {
            title: "No damaged gear.",
            body: "Rigging and personal protective equipment that fails inspection is removed from service immediately.",
          },
          {
            title: "No work under a load.",
            body: "People are not in the fall zone. If the path cannot be cleared, the lift does not proceed.",
          },
          {
            title: "No silent problems.",
            body: "Stop-work authority is real. Workers who refuse unsafe work are backed. Incidents are reported.",
          },
          {
            title: "No silent gaps.",
            body: "A missing plan, a missing ticket or a missing stop is a hazard. If the work as described cannot be done to this program, it does not proceed.",
          },
        ],
      },
      {
        type: "h",
        text: "WHAT THE WORK IS DONE TO",
      },
      {
        type: "p",
        text: "Lifting work under Proven is performed in accordance with the following. Where they conflict, the stricter applicable requirement wins. Law always wins. This program is written to sit on top of that stack, not beside it.",
      },
      {
        type: "list",
        items: [
          "CSA Z150 — Safety Code on Mobile Cranes.",
          "CSA Z248 — Code for Tower Cranes.",
          "WorkSafeBC Occupational Health and Safety Regulation, including Part 14 — Cranes and Hoists.",
          "BC Crane Safety — crane operator certification and competency requirements in British Columbia.",
          "Technical Safety BC — applicable technical safety requirements for regulated equipment.",
          "applicable ASME B30 standards — cranes, derricks, hoists, slings and related lifting equipment.",
          "Manufacturer requirements — load charts, manuals and configuration limits for the machine on site.",
          "Site policies — the site rules, orientations and lift plans. Where they are stricter, they win.",
        ],
      },
      {
        type: "p",
        text: "This program is written for work in Canada. Provincial occupational health and safety statutes, regulations and codes of practice apply on the site where the work is performed.",
      },
    ],
  },
  {
    num: "02",
    slug: "responsibilities",
    title: "RESPONSIBILITIES",
    kicker: "Who owns what.",
    intro:
      "Lifting work fails when everybody assumes somebody else has it. This program names who owns the plan, the stop and the standard. The split in responsibility has to be explicit.",
    blocks: [
      {
        type: "h",
        text: "THIS PROGRAM",
      },
      {
        type: "list",
        items: [
          "Keep this program current and publicly available.",
          "Name the qualifications, experience and practical competency each role requires.",
          "Name when the work as described cannot be done safely.",
          "Investigate incidents reported under this program and share findings as required.",
          "Write procedures that can be followed on a phone at the lift.",
        ],
      },
      {
        type: "h",
        text: "THE WORKER",
      },
      {
        type: "list",
        items: [
          "Show up fit for work, on time, with required tickets and PPE.",
          "Work to this program and to site rules — whichever is stricter.",
          "Inspect rigging, machines (as assigned) and PPE before use.",
          "Use stop-work authority. Do not rig, signal or operate when the lift is not understood.",
          "Report hazards, near misses and incidents before leaving the shift.",
          "Do not accept a role they are not competent to perform.",
        ],
      },
      {
        type: "h",
        text: "THE CLIENT / SITE EMPLOYER",
      },
      {
        type: "list",
        items: [
          "Control the workplace: access, other trades, ground conditions, overhead hazards and site rules.",
          "Provide accurate information: load data, drawings, machine type, site constraints, known hazards.",
          "Provide or confirm engineered lift plans where the lift requires them.",
          "Ensure a prime contractor / site safety system is in place as required by law.",
          "Do not direct anyone working to this program to skip it or applicable law.",
        ],
      },
      {
        type: "h",
        text: "THE SUPERVISOR",
      },
      {
        type: "p",
        text: "Workers Compensation Act s. 23. A supervisor — the person directing the people on the lift — ensures the workers under their direct supervision are made aware of known or reasonably foreseeable health and safety hazards, and comply with the Act, the Regulation, and this program as it applies. They consult and cooperate with the joint committee or worker representative where there is one. They cooperate with WorkSafeBC. They do not own the entire site. They do own whether the people they supervise work to the plan.",
      },
      {
        type: "list",
        items: [
          "Confirm the plan, the crew, the zone and the stop criteria.",
          "Ensure young or new workers have been oriented before they begin. 3.23.",
          "Stop the lift when the plan is broken. Do not send a replacement to do the same unsafe work.",
          "See that inspections, FLHAs and incident reports for this crew are done.",
        ],
      },
      {
        type: "p",
        text: "When this program is used with a named lift supervisor, that person owns the lift sequence: briefing, exclusion zone, communication, stop/start, and the decision to abort. They do not own the entire site. They do own whether the hook moves.",
      },
      {
        type: "quote",
        text: "If it is unclear who can stop the lift, nobody can stop the lift.",
      },
      {
        type: "h",
        text: "DUAL CONTROL",
      },
      {
        type: "p",
        text: "Workers may have more than one party directing their work. That does not dilute this program. A client instruction that conflicts with this program or with law is not followed. The worker stops, states the conflict, and the lift waits until it is resolved.",
      },
    ],
  },
  {
    num: "03",
    slug: "hazard-assessment",
    title: "HAZARD ASSESSMENT",
    kicker: "Before the hook, the paper. Before the paper, the walk.",
    intro:
      "Every lift requires a hazard assessment. A generic form filled in the parking lot is not an assessment. Look at the work. Name the hazards. Control them. Then lift.",
    blocks: [
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "SCOPE THE WORK",
            body: "What is being lifted, from where to where, with what gear, by whom, and under what site rules. If the scope is incomplete, stop.",
          },
          {
            n: "02",
            title: "WALK THE PATH",
            body: "Travel path, pick and set points, swing radius, blind spots, overhead lines, excavations, public interface, other trades.",
          },
          {
            n: "03",
            title: "NAME THE HAZARDS",
            body: "Load unknowns, ground conditions, weather, energy sources, working at height, traffic, fatigue, communication breakdown, proximity to people.",
          },
          {
            n: "04",
            title: "SET THE CONTROLS",
            body: "Exclusion zone, tag lines, mats, spotters, PPE, engineered plan if required, stop criteria (wind, visibility, radio loss).",
          },
          {
            n: "05",
            title: "BRIEF THE CREW",
            body: "Everyone on the lift can repeat: the plan, the signals, who can stop it, and where they stand. If they cannot, the brief failed.",
          },
          {
            n: "06",
            title: "REASSESS WHEN IT CHANGES",
            body: "New load, new weather, new trades in the zone, a damaged sling, a lost signal — the assessment starts again.",
          },
        ],
      },
      {
        type: "h",
        text: "STOP CRITERIA — WRITE THEM DOWN",
      },
      {
        type: "list",
        items: [
          "Load weight or centre of gravity not confirmed.",
          "Ground cannot support the crane or outriggers as configured.",
          "Wind, lightning or visibility outside the plan.",
          "Power lines inside Table 19-1A MAD — 1 m / 3 m / 4.5 m / 6 m by voltage, or unknown 3 m distribution / 6 m transmission.",
          "Exclusion zone cannot be held.",
          "Communication lost or ambiguous.",
          "Anyone on the crew is not competent for the role they are about to perform.",
        ],
      },
      {
        type: "p",
        text: "Field level hazard assessments (FLHA / FLRA) are completed at the start of the shift and when the work changes. They are not a signature collection. They are the last chance to catch what the paperwork missed.",
      },
    ],
  },
  {
    num: "04",
    slug: "safe-work-procedures",
    title: "SAFE WORK PROCEDURES",
    kicker: "A procedure you cannot use is not a procedure.",
    intro:
      "Safe Work Procedures (SWPs) cover types of work the crew perform repeatedly. They are written as sequences because lifting is a sequence. Read them in order. Do them in order. Hazards for that work are in the JHA — not buried in the procedure.",
    blocks: [
      {
        type: "p",
        text: "SWPs live in this program so they can be read on a phone at the gate. They are the default method. A site may impose a stricter method. A site may not impose a looser one on the crew.",
      },
      {
        type: "cta",
        href: "/safety/swp-library",
        label: "14 — SWP LIBRARY — 30 PROCEDURES →",
      },
      {
        type: "h",
        text: "PRACTICES AND PROCEDURES",
      },
      {
        type: "p",
        text: "COR treats safe work practices and safe job procedures as two elements. Practices are the standing rules — no lift without a plan, no damaged gear, no work under a load, one signalperson, STOP means stop. They live in 01, 06, 07 and 12. Procedures are the numbered SWPs in the library. An SJP is this lift, this site, this day, when the SWP is not enough. Do not file a practice as a second procedure.",
      },
      {
        type: "h",
        text: "SWP — RIGGING A LOAD",
      },
      { type: "steps", items: RIGGING_A_LOAD },
      {
        type: "h",
        text: "SWP — SIGNALLING A LIFT",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "ONE SIGNALPERSON",
            body: "One person signals the operator unless a documented transfer is made. Two people signalling is not communication. It is an argument.",
          },
          {
            n: "02",
            title: "AGREE THE SYSTEM",
            body: "Hand signals, radio protocol or both. Standard signals. Channel, call signs and the word for STOP confirmed in the brief.",
          },
          {
            n: "03",
            title: "SEE THE LOAD AND THE PATH",
            body: "If the signalperson cannot see the load, the path or the operator, they are not signalling. Get a dedicated spotter or stop.",
          },
          {
            n: "04",
            title: "HOLD THE ZONE",
            body: "The signalperson does not become a rigger, a traffic controller and a messenger at the same time. The hands are for the crane.",
          },
          {
            n: "05",
            title: "STOP MEANS STOP",
            body: "Any lost visual, any garbled radio, any person entering the zone: emergency stop. Resume only after the crew is reset.",
          },
        ],
      },
      {
        type: "h",
        text: "SWP — INSPECTING RIGGING",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "IDENTIFY THE GEAR",
            body: "Know the type, rated capacity, and whether it is appropriate for the hitch and the environment (heat, chemicals, sharp edges).",
          },
          {
            n: "02",
            title: "CHECK IDENTIFICATION",
            body: "Missing tags, illegible ratings or homemade modifications — out of service.",
          },
          {
            n: "03",
            title: "INSPECT THE BODY",
            body: "Wire rope: broken wires, kinks, birdcaging, crushed strands, heat. Synthetic: cuts, UV, chemical burn, stretched stitches. Chain: nicks, stretch, gouge, seized links.",
          },
          {
            n: "04",
            title: "INSPECT THE HARDWARE",
            body: "Hooks, shackles, rings, spreader points. Latch function, pin engagement, wear at the saddle, opened throat.",
          },
          {
            n: "05",
            title: "REMOVE OR USE",
            body: "If it fails, tag it, isolate it, report it. Do not leave failed gear where someone else can pick it up.",
          },
        ],
      },
    ],
  },
  {
    num: "05",
    slug: "safe-job-procedures",
    title: "SAFE JOB PROCEDURES",
    kicker: "This lift. This site. This day.",
    intro:
      "Safe Job Procedures (SJPs) are built for a specific task when the SWP is not enough. Unusual loads, tight sites, tandem lifts, critical lifts, flytable cycles, loading-platform install and reposition, and anything the hazard assessment flags as non-routine.",
    blocks: [
      {
        type: "p",
        text: "An SJP is not a longer SWP. It is the SWP plus the facts of this job: weights, radii, drawings, engineered requirements, weather limits, names, radios, and the abort criteria. The JHA library is the hazard analysis for the same work — not another set of steps. The filled sheet lives in the SJP library.",
      },
      {
        type: "cta",
        href: "/safety/sjp-library",
        label: "16 — SJP LIBRARY →",
      },
      {
        type: "cta",
        href: "/safety/builder/flytable-cycle-sjp",
        label: "FILL THIS CYCLE — PROVEN-FRM-052 →",
      },
      {
        type: "cta",
        href: "/safety/builder/loading-platform-sjp",
        label: "FILL THIS DECK — PROVEN-FRM-053 →",
      },
      {
        type: "cta",
        href: "/safety/jha-library",
        label: "15 — JHA LIBRARY →",
      },
      {
        type: "h",
        text: "WHEN AN SJP IS REQUIRED",
      },
      {
        type: "list",
        items: [
          "Critical lifts as defined by the site or by this program (see Crane Operations).",
          "Flytable / flyform cycles — every table, every floor. GOSPEL-SJP-001. Corner and nontypical tables: GOSPEL-SJP-002.",
          "Loading-platform install, reposition or strike — every deck, every floor. GOSPEL-SJP-003. Daily SuperDeck extend / retract is host, not this SJP.",
          "Tandem or multiple-crane lifts.",
          "Loads of unknown or shifting centre of gravity.",
          "Lifts over occupied buildings, public space, or process equipment.",
          "Personnel holding / man-baskets (only where legally permitted and engineered).",
          "Any lift the supervisor or operator says is non-routine.",
        ],
      },
      {
        type: "h",
        text: "HOW AN SJP IS BUILT",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "COLLECT THE FACTS",
            body: "Load data, drawings, crane configuration, ground report, nearby energy, other work in the area.",
          },
          {
            n: "02",
            title: "START FROM THE SWP",
            body: "Do not rewrite physics. Add only what this job changes.",
          },
          {
            n: "03",
            title: "NAME THE PEOPLE",
            body: "Operator, rigger, signalperson, supervisor, engineer if required. Roles are named, not implied.",
          },
          {
            n: "04",
            title: "SET HARD LIMITS",
            body: "Wind, radius, boom length, personnel in the zone, radio loss. Limits are numbers, not vibes.",
          },
          {
            n: "05",
            title: "BRIEF AND KEEP IT",
            body: "The SJP is at the lift. If the work drifts from the SJP, stop and rewrite it. Do not “adapt on the fly.”",
          },
        ],
      },
      {
        type: "quote",
        text: "If the lift is special, the paperwork should be as specific as the load.",
      },
    ],
  },
  {
    num: "06",
    slug: "rigging",
    title: "RIGGING",
    kicker: "The gear is the truth. The guess is the hazard.",
    intro:
      "Riggers rig to rated capacity, known weights and inspected hardware. The hitch is not “made to work” with a choker and optimism. Rigging is done to applicable ASME B30 standards, manufacturer instructions for the hardware, and the site.",
    blocks: [
      {
        type: "h",
        text: "NON-NEGOTIABLES",
      },
      {
        type: "rules",
        items: [
          {
            title: "Know the load.",
            body: "Weight and centre of gravity are confirmed from drawings, shipping data, scales or engineering — not from memory of a similar piece.",
          },
          {
            title: "Know the hitch.",
            body: "Vertical, choker and basket hitches have different capacities. Sling angle is calculated, not eyeballed when it matters.",
          },
          {
            title: "Hardware is rated and matched.",
            body: "Shackles, hooks and master links are the correct type and WLL. Pins are fully engaged. Screw pins are moused where required. No mixing mystery steel.",
          },
          {
            title: "Protect the sling.",
            body: "Sharp edges get softeners, pads or a different hitch. A cut sling is a dropped load that has not happened yet.",
          },
          {
            title: "No people under the load.",
            body: "Tag lines control rotation. Hands do not. Pushing a live load with your body is not rigging.",
          },
        ],
      },
      {
        type: "h",
        text: "SLING ANGLES",
      },
      {
        type: "p",
        text: "As the included angle flattens, tension climbs. At 60° the tension is the load share. At 30° it has doubled. Below 30° that hitch is not used unless an engineer owns the numbers. If you cannot explain the angle, you cannot use the angle.",
      },
      {
        type: "h",
        text: "HOOKS AND SHACKLES",
      },
      {
        type: "list",
        items: [
          "Do not point-load a shackle bow unless it is designed for it.",
          "Do not replace a pin with a bolt from the truck.",
          "Hook latches work. If the latch is gone, the hook is out of service unless the hitch does not require it and the manufacturer allows it — default is out of service.",
          "Never wrap a sling around a hook as a makeshift eye.",
        ],
      },
      {
        type: "h",
        text: "TEST LIFT",
      },
      {
        type: "p",
        text: "Every load comes an inch off the ground and waits. Check balance, hitch security, crane reaction, and the zone. A test lift is not optional because the load “looks fine.”",
      },
      { type: "steps", items: RIGGING_A_LOAD },
    ],
  },
  {
    num: "07",
    slug: "crane-operations",
    title: "CRANE OPERATIONS",
    kicker: "The chart is the law of the machine.",
    intro:
      "Operators run cranes they are competent on, to the load chart, on ground that can hold them, with a crew they can hear. The operator works to CSA Z150 or Z248 as the machine requires, applicable ASME B30 standards, the manufacturer, WorkSafeBC, and the site. If those conditions are not present, the crane does not come on load.",
    blocks: [
      {
        type: "h",
        text: "BEFORE THE SHIFT",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "MACHINE AND CONFIGURATION",
            body: "Confirm the crane on site is the crane this lift requires. Counterweight, boom, jib, tyres, tracks, software — as the chart requires.",
          },
          {
            n: "02",
            title: "INSPECTION",
            body: "Complete the operator inspection. Defects that affect lifting are reported and the crane stays down until they are resolved.",
          },
          {
            n: "03",
            title: "GROUND AND SETUP",
            body: "Outriggers fully extended unless the chart allows otherwise. Mats as required. Cribbing is engineered thinking, not scrap lumber theatre. Level within the manufacturer’s limit.",
          },
          {
            n: "04",
            title: "SITE HAZARDS",
            body: "Overhead lines, underground services, excavations, other cranes, public, aircraft if applicable. Approach distances to power lines are treated as hard walls.",
          },
          {
            n: "05",
            title: "BRIEF",
            body: "Signals, radius, known loads, critical lift status, wind limits, who stops the job.",
          },
        ],
      },
      {
        type: "h",
        text: "ON THE HOOK",
      },
      {
        type: "list",
        items: [
          "The operator does not lift a load they cannot account for on the chart, including deductions and rigging weight.",
          "No lifting over people. No riding the load. No using the crane as an elevator unless the operation is a permitted, engineered personnel lift.",
          "Shock loading, side loading and dragging are not operating. They are abuse.",
          "If the signal is unclear, the answer is stop — not interpret.",
          "Leave the seat only when the crane is in a stable, manufacturer-accepted condition.",
        ],
      },
      {
        type: "h",
        text: "CRITICAL LIFTS",
      },
      {
        type: "p",
        text: "Treat as critical unless the site defines a stricter threshold: loads approaching chart capacity, tandem lifts, lifts over operating plant or public space, non-routine paths, loads with shifting COG, a flytable / flyform cycle, or a loading-platform install, reposition or strike. Critical lifts get an SJP, named supervision, and a slower brief. Ego is not a control. Flytables: GOSPEL-SWP-028, GOSPEL-JHA-011, GOSPEL-SJP-001. Loading platforms: GOSPEL-SWP-030, GOSPEL-JHA-014, GOSPEL-SJP-003.",
      },
      {
        type: "cta",
        href: "/safety/swp/flytable-cycling",
        label: "FLYTABLE CYCLING — GOSPEL-SWP-028 →",
      },
      {
        type: "cta",
        href: "/safety/swp/loading-platform-reposition",
        label: "LOADING PLATFORM — GOSPEL-SWP-030 →",
      },
      {
        type: "h",
        text: "WEATHER AND POWER LINES",
      },
      {
        type: "p",
        text: "Wind limits come from the manufacturer and the lift plan — the lower number wins. Tower: 14.92 anemometer, stop when the load cannot be handled safely, 50 km/h if the OEM is silent. Cold: 14.93, stop below −18 °C unless the manufacturer or engineer says otherwise. Lightning: thunder is the stop. Environment Canada — if you hear it, you are in striking distance. Wait 30 minutes after the last rumble. Do not count flash-to-bang to 30 before stopping. Technical Safety BC does not write a 30/30 crane rule; earthing of the supply is the owner’s electrical work. A strike is a misadventure (14.16.1).",
      },
      {
        type: "table",
        caption: LIGHTNING_RULE.caption,
        columns: LIGHTNING_RULE.columns,
        rows: LIGHTNING_RULE.rows,
      },
      {
        type: "cta",
        href: "/safety/swp/weather-and-wind",
        label: "WEATHER AND WIND — GOSPEL-SWP-023 →",
      },
      {
        type: "p",
        text: "Power lines: assume they are live. MAD is Table 19-1A — the same numbers BC Hydro publishes. If the lift cannot hold that clearance, it is not a crane job until 30M33 is signed.",
      },
      {
        type: "table",
        caption: MAD_APPROACH.caption,
        columns: MAD_APPROACH.columns,
        rows: MAD_APPROACH.rows,
      },
      {
        type: "table",
        caption: MAD_UNKNOWN.caption,
        columns: MAD_UNKNOWN.columns,
        rows: MAD_UNKNOWN.rows,
      },
      {
        type: "p",
        text: "Voltage from the utility — BC Hydro Express Connect 1 877 520 1355. Boom, load, tag line and people all stay outside the number. Tower crane: zone-limiting device if practicable (19.24.1(2)).",
      },
      {
        type: "cta",
        href: "/safety/swp/working-near-powerlines",
        label: "WORKING NEAR POWERLINES — GOSPEL-SWP-018 →",
      },
      {
        type: "h",
        text: "LOCKOUT, ACCESS, ERECTION",
      },
      {
        type: "p",
        text: "Operating the crane is not servicing it. Isolation before a body is in the machine: GOSPEL-SWP-026. Climbing the ladder to the cab to operate is not jumping the tower. Erection, climbing (increasing height) and dismantling are a separate lift under a qualified supervisor, with a Notice of Project as 14.73.3 requires. GOSPEL-SWP-027. Emergency shutdown: people first. GOSPEL-SWP-024.",
      },
      {
        type: "cta",
        href: "/safety/swp/lockout",
        label: "LOCKOUT / ISOLATION — GOSPEL-SWP-026 →",
      },
      {
        type: "cta",
        href: "/safety/swp/tower-erection-climbing",
        label: "TOWER ERECTION, CLIMBING AND DISMANTLING — GOSPEL-SWP-027 →",
      },
      {
        type: "cta",
        href: "/safety/crane-binders",
        label: "22 — CRANE BINDERS / NOP-TC →",
      },
    ],
  },
  {
    num: "08",
    slug: "fall-protection",
    title: "FALL PROTECTION",
    kicker: "Height does not care what you were lifting.",
    intro:
      "Crane and rigging work puts people on decks, loads, machine upperworks and unfinished steel. Fall protection is part of lifting, not a different trade’s problem.",
    blocks: [
      {
        type: "p",
        text: "The crew follows the fall protection law that applies on the site. Where provincial thresholds differ, the site law applies. Where this program is stricter, this program applies. Default posture: if you can fall more than the legal threshold — or onto a hazard below that threshold — you are protected before you go there.",
      },
      {
        type: "h",
        text: "ORDER OF CONTROLS",
      },
      {
        type: "list",
        items: [
          "Eliminate the exposure. Do the work from the ground if the lift can be rigged there.",
          "Guardrails, platforms and travel restraint that physically prevent the fall.",
          "Fall arrest as the last control — with a rescue plan that is real, not theoretical.",
        ],
      },
      {
        type: "h",
        text: "SWP — WORKING AT HEIGHT ON A LIFT",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "DECIDE IF YOU NEED TO GO UP",
            body: "If the hitch can be made at ground level, make it at ground level.",
          },
          {
            n: "02",
            title: "INSPECT THE SYSTEM",
            body: "Harness, lanyard, SRL, connectors, anchor. No unlabelled, damaged or homemade anchors.",
          },
          {
            n: "03",
            title: "CONFIRM THE ANCHOR AND CLEARANCE",
            body: "Rated anchor. Fall clearance calculated. Swing-fall considered. A harness with no clearance is a decoration.",
          },
          {
            n: "04",
            title: "CONNECT BEFORE YOU ARE EXPOSED",
            body: "100% tie-off when required. You are connected before the unguarded edge, not after you notice it.",
          },
          {
            n: "05",
            title: "RESCUE IS PART OF THE PLAN",
            body: "Who gets you down, with what, in how long. Suspension trauma is on the clock. “We’ll figure it out” is not a rescue plan.",
          },
        ],
      },
      {
        type: "p",
        text: "A tower-crane operator who needs to come out of the cab or off the tower is high-angle rope rescue. In B.C. that plan is written with the municipal fire department through BCCSA THARRP. It is not the same document as a Part 11 fall-protection plan, and THARRP will not approve one. See Emergency Response.",
      },
      {
        type: "cta",
        href: "/safety/emergency-response",
        label: "10 — EMERGENCY RESPONSE / THARRP →",
      },
      {
        type: "p",
        text: "Operators accessing upperworks follow the manufacturer’s access method and site fall rules. Jumping down from a carrier or riding a headache ball is not access.",
      },
    ],
  },
  {
    num: "09",
    slug: "incident-reporting",
    title: "INCIDENT REPORTING",
    kicker: "Do not hide the dent.",
    intro:
      "Incidents, injuries, near misses and damaged gear are reported. Quiet jobsites are not always safe jobsites. Sometimes they are just unreported.",
    blocks: [
      {
        type: "h",
        text: "WHAT GETS REPORTED",
      },
      {
        type: "list",
        items: [
          "Any injury, including what someone calls “nothing.”",
          "Dropped loads, failed rigging, crane contact, shock loading, struck plant or structure.",
          "Near misses: someone in the zone, a lost signal that almost mattered, a sling that started to cut.",
          "Property and equipment damage.",
          "A stop-work event that revealed a broken plan.",
          "Bullying or harassment toward a worker — including on a client site.",
        ],
      },
      {
        type: "h",
        text: "SWP — AFTER AN INCIDENT",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "MAKE IT SAFE",
            body: "People first. Energy isolated. Load landed or secured if it can be done without creating a second incident.",
          },
          {
            n: "02",
            title: "GET CARE",
            body: "First aid. Emergency services when needed. Do not move a seriously injured person unless they are in immediate danger.",
          },
          {
            n: "03",
            title: "HOLD THE SCENE",
            body: "As far as it is safe, leave evidence in place. Photographs. Names. Do not start the cleanup story before the facts.",
          },
          {
            n: "04",
            title: "NOTIFY",
            body: "Site supervision, the employer, and the regulator when the law requires it. Immediate for serious events — not after the shift beer.",
          },
          {
            n: "05",
            title: "WRITE IT DOWN",
            body: "What happened, where, when, who, what gear, what was supposed to happen. Facts. Not a defence brief.",
          },
          {
            n: "06",
            title: "LEARN AND CHANGE",
            body: "Events involving the crew are investigated. Collect facts, photographs, gear, witness names. Name causes and contributing factors — not a defence brief. Corrective actions get owners and dates. Close them. The program is updated when the lesson is real. PROVEN-FRM-013.",
          },
        ],
      },
      {
        type: "cta",
        href: "/safety/form/investigation",
        label: "INVESTIGATION — PROVEN-FRM-013 →",
      },
      {
        type: "cta",
        href: "/safety/form/refuse-unsafe-work",
        label: "REFUSAL OF UNSAFE WORK — PROVEN-FRM-035 →",
      },
      {
        type: "quote",
        text: "Reporting a near miss is competence. Hiding one is how the next crew inherits it.",
      },
      {
        type: "p",
        text: "Workers will not be punished for reporting in good faith or for refusing unsafe work. They will be held accountable for lying, tampering with a scene, or continuing a lift after a stop criterion was met.",
      },
      {
        type: "h",
        text: "REPORT NOW",
      },
      {
        type: "cta",
        href: "/safety/report/incident",
        label: "REPORT AN INCIDENT →",
      },
      {
        type: "cta",
        href: "/safety/report/near-miss",
        label: "REPORT A NEAR MISS →",
      },
      {
        type: "cta",
        href: "/safety/report/hazard",
        label: "REPORT A HAZARD →",
      },
      {
        type: "cta",
        href: "/safety/report/damaged-rigging",
        label: "REPORT DAMAGED RIGGING →",
      },
      {
        type: "cta",
        href: "/safety/report/equipment-defect",
        label: "REPORT AN EQUIPMENT DEFECT →",
      },
      {
        type: "cta",
        href: "/safety/report/bullying-harassment",
        label: "REPORT BULLYING OR HARASSMENT →",
      },
    ],
  },
  {
    num: "10",
    slug: "emergency-response",
    title: "EMERGENCY RESPONSE",
    kicker: "The plan has a number, a meeting point and a name.",
    intro:
      "Every lift needs to know how the site calls for help. The client’s emergency plan is not assumed to be obvious. Ask. Then brief it.",
    blocks: [
      {
        type: "h",
        text: "BEFORE WORK STARTS",
      },
      {
        type: "list",
        items: [
          "Site emergency number and how to get an outside line.",
          "Muster point and wind / spill alternatives if applicable.",
          "First aid location and attendant.",
          "How to shut down or land the crane in an emergency.",
          "Rescue for fall arrest if anyone is tied off.",
          "Tower high-angle rescue: which fire department, how to summon them, where the written plan lives.",
          "After-hours contact for the supervisor / employer.",
        ],
      },
      {
        type: "p",
        text: "First aid on a host site is the host’s. First aid on a workplace the employer controls is the employer’s assessment under Part 3 Division 4. GOSPEL-POL-025. Drills are recorded where the employer controls that workplace. PROVEN-FRM-034.",
      },
      {
        type: "cta",
        href: "/safety/form/emergency-drill",
        label: "EMERGENCY DRILL — PROVEN-FRM-034 →",
      },
      {
        type: "cta",
        href: "/safety/policy/first-aid",
        label: "GOSPEL-POL-025 — FIRST AID →",
      },
      {
        type: "h",
        text: "SWP — SITE EMERGENCY",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "STOP THE LIFT",
            body: "If a crane is in operation, bring the load to a safe condition if it can be done immediately. If not, stop and protect people first.",
          },
          {
            n: "02",
            title: "CALL IT",
            body: "Use the site method. Say what, where, how many, what hazards. Do not assume someone else called.",
          },
          {
            n: "03",
            title: "ACCOUNT FOR THE CREW",
            body: "Muster. Names. Who is missing. Tell incident command.",
          },
          {
            n: "04",
            title: "DO NOT BECOME THE SECOND EVENT",
            body: "Stay out of rescue you are not equipped for. Power lines, structural collapse and confined space are specialist work.",
          },
          {
            n: "05",
            title: "NOTIFY THE SUPERVISOR",
            body: "As soon as people are accounted for. The supervisor notifies the client, the families the law requires, and the regulator.",
          },
        ],
      },
      {
        type: "h",
        text: "POWER LINE CONTACT",
      },
      {
        type: "p",
        text: "Stay on the crane unless it is on fire or you are being shocked. Do not let anyone approach — 10 m, call 911. Downed transmission or manhole: 33 m. Call BC Hydro. If you must get off, jump clear with feet together and shuffle away. This is briefed on any site with overhead lines — not discovered during the contact.",
      },
      {
        type: "table",
        caption: MAD_DOWN.caption,
        columns: MAD_DOWN.columns,
        rows: MAD_DOWN.rows,
      },
      {
        type: "h",
        text: "CRANE AND RIGGING EMERGENCIES",
      },
      {
        type: "rules",
        items: [
          {
            title: "Crane incident",
            body: "Stop. People first. Land or hold only if it does not create a second event. Notify the site and the employer. Hold the scene. GOSPEL-SWP-024.",
          },
          {
            title: "Crane overturn",
            body: "Do not jump toward the fall. Get people back. First aid. Utility and emergency services if lines or fuel are involved. Do not right the crane as a hero move.",
          },
          {
            title: "Dropped load",
            body: "Stop. Clear the zone. First aid. Do not rush in to look. Secure if it can be done without entering an unstable pile. Report as an incident.",
          },
          {
            title: "Rigging failure",
            body: "Stop. Isolate the failed gear — tag it, get it off the pile. Check people. Re-rig only with serviceable gear and a reset brief.",
          },
          {
            title: "Serious injury",
            body: "Make it safe. First aid. Emergency services. Do not move the person unless they are in immediate danger. Notify the supervisor immediately.",
          },
          {
            title: "Electrical / powerline contact",
            body: "Stay on the crane unless fire or shock. Nobody approaches. Call the utility. Jump clear, feet together, shuffle away only if you must get off. Brief this before the lift.",
          },
          {
            title: "Fire",
            body: "Small and trained: extinguisher in the cab. Otherwise get off, keep people back, call the site emergency number. Fuel and hydraulics are not a trash-fire.",
          },
          {
            title: "Severe weather",
            body: "Land the load. Manufacturer shutdown. People off the machine. Thunder: stop, shelter 30 minutes after the last rumble. Do not count to 30. Strike: 14.16.1. GOSPEL-SWP-023.",
          },
          {
            title: "Equipment failure",
            body: "Stop. Crane down if it affects lifting. Report the defect. Do not restart to see if it does it again.",
          },
          {
            title: "Emergency shutdown",
            body: "Load landed if possible. Controls isolated. Access secured. Follow the manufacturer for this machine.",
          },
          {
            title: "Worker rescue",
            body: "Fall arrest rescue is part of the plan before anyone ties off. Suspension trauma is on the clock. Do not improvise a crane-as-rescue unless that operation is permitted and planned. A tower operator in the cab or on the tower is THARRP — fire-department rope rescue, not a site rappel.",
          },
        ],
      },
      {
        type: "h",
        text: "THARRP — TOWER HIGH-ANGLE RESCUE",
      },
      {
        type: "p",
        text: "The Technical High Angle Rope Rescue Program is BCCSA’s. It trains municipal fire departments to get a worker down from a tower crane. It is not a site rope team. It is not a fall-protection plan. G4.13(3)(a) still requires a risk assessment and written rescue procedures for high-angle work.",
      },
      {
        type: "list",
        items: [
          "Before a tower operator goes up: name the fire department, the summoning method, and where the written plan sits. If nobody can name them, the operator stays on the ground.",
          "The host or prime requests the crane or site survey in the THARRP Portal. Confirm it exists. A tower expected past 60 days on a changing high-rise needs the formal Site Survey & Site Rescue Procedure Review on site — ADM 2.",
          "If the local department is not THARR-funded, they may have mutual aid with one that is. If the workplace is outside a municipal high-angle service area, or the employer is not in a funding classification unit, high-angle rescue must be provided by other acceptable means. The lift does not invent a rescue on the day.",
          "A fire department can refuse service they cannot provide. Funding does not obligate them to work unsafely. Then the employer finds another acceptable means — or the work at height does not start.",
          "THARRP does not approve Part 11 fall-protection plans. Harness rescue stays a different plan. Lone hoist-operator rescue stays a different pack.",
        ],
      },
      {
        type: "cta",
        href: "https://www.bccsa.ca/tharrp_program.php",
        label: "BCCSA THARR PROGRAM →",
      },
      {
        type: "cta",
        href: "https://www.bccsa.ca/tharrp_faqs.php",
        label: "THARRP FAQ →",
      },
      {
        type: "cta",
        href: "https://bccsa.ca/pdfs/ADM2Responsibility.pdf",
        label: "ADM 2 — FUNDED DEPARTMENTS AND CLASSIFICATION UNITS →",
      },
      {
        type: "cta",
        href: "https://www.bccsa.ca/resources.php?id_catalogue=98",
        label: "BCCSA LONE HOIST OPERATOR RESCUE →",
      },
      {
        type: "cta",
        href: "https://www.bccsa.ca/resources.php?id_catalogue=46",
        label: "BCCSA WORKING AT HEIGHTS / FALL RESCUE →",
      },
    ],
  },
  {
    num: "11",
    slug: "training-competency",
    title: "TRAINING + COMPETENCY",
    kicker: "A ticket is not competency.",
    intro:
      "A ticket is not competency. This program names what each role must hold, verify and refuse before the hook is loaded.",
    blocks: [
      {
        type: "quote",
        text: "The person has to be able to do the work the card implies.",
      },
      {
        type: "h",
        text: "WHAT TO VERIFY BEFORE THE LIFT",
      },
      {
        type: "rules",
        items: [
          {
            title: "Qualifications",
            body: "Trade tickets, operator certifications through the BC Crane Safety system where the work requires it, signalperson and rigger credentials, and any site-required training. Originals or verifiable records. Expired means the work does not start.",
          },
          {
            title: "Experience",
            body: "Machine class, boom type, tonnage, sector (industrial, civil, tower, shutdown). Years on a résumé are not the same as years on that crane.",
          },
          {
            title: "Practical competency",
            body: "How they inspect, how they brief, how they rig, how they refuse a bad lift. The supervisor checks this. A certificate cannot speak.",
          },
          {
            title: "Site requirements",
            body: "Orientations, owner standards, union rules, security, drug and alcohol programs where lawfully required. The worker does not start until those requirements are met.",
          },
        ],
      },
      {
        type: "h",
        text: "FIT TO THE JOB",
      },
      {
        type: "p",
        text: "A competent mobile operator is not automatically a competent tower operator. A structural rigger is not automatically a plant rigger. Match the person to the work. The closest body is not a match.",
      },
      {
        type: "h",
        text: "QUALIFIED FOR THE ROLE",
      },
      {
        type: "p",
        text: "Workers must be qualified for the role. Where a site requires a specific orientation, that orientation is completed first. Where a worker needs a new qualification, that gap is named before the lift.",
      },
      {
        type: "h",
        text: "YOUNG OR NEW WORKER",
      },
      {
        type: "p",
        text: "A young worker is under 25. A new worker is new to that workplace, returning to changed hazards, or relocated to different hazards. 3.22. Before they begin, they get the orientation in 3.23 — recorded on PROVEN-FRM-015. Extra orientation if they cannot do the work safely or they ask. 3.24. Keep the record. 3.25.",
      },
      {
        type: "cta",
        href: "/safety/form/orientation",
        label: "ORIENTATION — PROVEN-FRM-015 →",
      },
      {
        type: "h",
        text: "SUPERVISION AND MENTORING",
      },
      {
        type: "p",
        text: "Junior personnel, when placed, are placed under named supervision with a defined scope. They are not “figured out on site.” Competency is not contagious.",
      },
      {
        type: "h",
        text: "CRANE OPERATORS",
      },
      {
        type: "list",
        items: [
          "Qualification — BC Crane Safety certificate for the class, current.",
          "Equipment-specific competency — this boom type, this tonnage, this configuration.",
          "Load charts — deductions, radius, outrigger position, jib. If they cannot read this chart, they do not run this crane.",
          "Inspections — pre-use as the manufacturer and Part 14 require.",
          "Operating procedures — this program, the site, the plan.",
        ],
      },
      {
        type: "h",
        text: "RIGGERS",
      },
      {
        type: "list",
        items: [
          "Sling selection, hardware, hitch configurations.",
          "Sling angles — sin from the horizontal, WLL after the hitch.",
          "Load weight and centre of gravity — confirmed, not remembered.",
          "Load control and tag lines.",
          "Rigging inspection and rejection.",
          "Communication and lift planning as assigned.",
        ],
      },
      {
        type: "h",
        text: "SIGNALPERSONS",
      },
      {
        type: "list",
        items: [
          "Standard hand signals.",
          "Radio communication and the stop word.",
          "Blind lifts — one voice, tested comms.",
          "Stop signals that the operator will not interpret.",
          "Crane coordination — zone, other cranes, people.",
        ],
      },
      {
        type: "h",
        text: "COMPETENCY MATRIX",
      },
      {
        type: "p",
        text: "This matrix is the check before the lift. It is how this program matches the person to the work.",
      },
      {
        type: "table",
        caption: "GOSPEL crane and rigging competency — pre-lift check. Not a training course.",
        columns: ["ROLE", "QUALIFICATION", "MACHINE / TASK", "VERIFY"],
        rows: [
          ["Crane operator", "BC Crane Safety class, current", "This configuration and chart", "Ticket + experience + practical"],
          ["Tower operator", "Tower class, current", "This tower / self-erecting machine", "Ticket + experience on tower work"],
          ["Rigger", "Rigger credential as required", "Hitch, angle, hardware, inspection", "Practical: inspect, hitch, refuse"],
          ["Signalperson", "Signalperson competency", "Hands and radio, including blind", "Demonstrate signals and STOP"],
          ["Lift supervisor", "Experience on this class of lift", "Brief, zone, abort, critical plan", "Named on the plan"],
        ],
      },
    ],
  },
  {
    num: "12",
    slug: "worker-rights",
    title: "WORKER RIGHTS",
    kicker: "The three rights are not a slogan.",
    intro:
      "Canadian workers have the right to know, the right to participate, and the right to refuse dangerous work. This program treats those rights as operating procedure, not HR wallpaper.",
    blocks: [
      {
        type: "h",
        text: "RIGHT TO KNOW",
      },
      {
        type: "p",
        text: "Workers are told the hazards of the job as they are known, how the work is expected to be done, and where this program lives. This website is part of that. So is the lift brief. A worker who has not been told the load, the site rules or the stop criteria has not been briefed.",
      },
      {
        type: "h",
        text: "RIGHT TO PARTICIPATE",
      },
      {
        type: "p",
        text: "Crews speak in the brief. Hazard assessments are not signed in silence. If a rigger sees a bad hitch, they say it. If an operator does not like the ground, they say it. Participation is expected. It is not “attitude.”",
      },
      {
        type: "h",
        text: "JOINT COMMITTEE / WORKER REPRESENTATIVE",
      },
      {
        type: "p",
        text: "The Act sets this by workplace, not by a company’s total headcount. Twenty or more workers regularly employed at a workplace: joint committee. Nine to nineteen: worker health and safety representative. GOSPEL-POL-026. On a host site, workers participate in that workplace’s system. Worker recommendations get a response and enter the corrective-action log.",
      },
      {
        type: "cta",
        href: "/safety/policy/joint-committee",
        label: "GOSPEL-POL-026 — JOINT COMMITTEE / WORKER REPRESENTATIVE →",
      },
      {
        type: "h",
        text: "RIGHT TO REFUSE",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "STOP THE WORK",
            body: "If you have reasonable cause to believe the work is dangerous to you or another person, you stop. You do not need permission to stop.",
          },
          {
            n: "02",
            title: "SAY WHY",
            body: "State the danger to the supervisor / site contact. Be specific: the line, the ground, the load, the missing gear, the missing plan.",
          },
          {
            n: "03",
            title: "IT GETS INVESTIGATED",
            body: "The site deals with the condition. The employer must not send a worker home as punishment for a good-faith refusal.",
          },
          {
            n: "04",
            title: "IT STAYS STOPPED UNTIL IT IS FIXED",
            body: "Work resumes when the danger is controlled. Not when someone is impatient.",
          },
        ],
      },
      {
        type: "quote",
        text: "The employer must not punish a worker for a good-faith refusal. A replacement must not be sent into the same uncontrolled condition.",
      },
      {
        type: "cta",
        href: "/safety/form/refuse-unsafe-work",
        label: "REFUSAL OF UNSAFE WORK — PROVEN-FRM-035 →",
      },
      {
        type: "h",
        text: "RESPECT",
      },
      {
        type: "p",
        text: "Workers are not units. Harassment, violence, racism, and “that’s just the trade” behaviour are not tolerated on the lift. Report it. It is acted on.",
      },
      {
        type: "cta",
        href: "/safety/policy/bullying-and-harassment",
        label: "BULLYING AND HARASSMENT POLICY →",
      },
      {
        type: "p",
        text: "This section states the rights. It does not replace the occupational health and safety law of the province you are standing in. If you need the regulator, you can call them. You do not owe anyone a courtesy call if you are in danger.",
      },
    ],
  },
  {
    num: "13",
    slug: "ohs-policies",
    title: "OH&S POLICIES",
    kicker: "The rules for crane and rigging work. Short enough to use.",
    intro:
      "These policies apply to crane operators, riggers, signalpersons, crane supervisors and safety support on the lift. They are not a general construction manual.",
    library: "policy",
    blocks: [
      {
        type: "p",
        text: "Each policy is a controlled document: number, revision 01, effective 2026-09-01, owner GOSPEL Safety. The current version is the one on this site.",
      },
      {
        type: "p",
        text: "The set includes the OH&S policy, violence, workplace conduct, fitness for work, PPE, impairment, working alone, incident reporting, injury management, return to work, bullying and harassment, and discrimination — plus competency, training, crane operations, rigging, first aid, joint committee, contractors, occupational health, and the rest of the lifting rules.",
      },
      {
        type: "cta",
        href: "/safety/policy/bullying-and-harassment",
        label: "GOSPEL-POL-017 — BULLYING AND HARASSMENT →",
      },
    ],
  },
  {
    num: "14",
    slug: "swp-library",
    title: "SWP LIBRARY",
    kicker: "Search the procedure. Do it in order.",
    intro:
      "Safe Work Procedures for mobile crane setup, operation, communication, rigging, powerlines, critical lifts and taking damaged gear out of service. They are the method — numbered steps. Hazards and residual risk live in the JHA library.",
    library: "swp",
    blocks: [
      {
        type: "p",
        text: "WorkSafeBC requires written procedures for specified high-risk work (OHS Regulation B.C. Reg. 296/97). CCOHS describes an SWP as the step-by-step method. GOSPEL SWPs are purpose, scope, procedure, competency, equipment, PPE, prohibited practices, emergency, documentation and the editions the Regulation names — CSA Z150-1998, CSA Z248-2004, ASME B30.5-2004, B30.22-2005. The matching JHA is the hazard analysis, not a second procedure.",
      },
      {
        type: "cta",
        href: "/safety/jha-library",
        label: "15 — JHA LIBRARY →",
      },
      {
        type: "cta",
        href: "/safety/sjp-library",
        label: "16 — SJP LIBRARY →",
      },
    ],
  },
  {
    num: "15",
    slug: "jha-library",
    title: "JHA LIBRARY",
    kicker: "What can hurt you. What holds the risk.",
    intro:
      "Job Hazard Analyses name the hazards, the consequence, and the control. They are not procedures. Do the work to the SWP. WorkSafeBC does not mandate a JHA form — the Act requires workers to know the hazards. This is that document for crane and rigging work.",
    library: "jha",
    blocks: [
      {
        type: "p",
        text: "CCOHS treats JHA and JSA as the same method: break the job into tasks, identify hazards at each task, select controls in hierarchy order — eliminate, substitute, engineer, administer, PPE last. Residual risk is named. If a stop condition exists, the job does not proceed. Each row carries a severity badge. Extreme is reserved for the no-recovery killers — people under the load, MAD, overturn, a table over the edge. High is serious injury or a dropped load. Moderate is lost time or a failed plan. A tag line wrap is high. A boom in the MAD is extreme. They are not the same badge. Workers Compensation Act s. 21(2)(b) and (e). OHS Regulation Parts 3, 4, 8, 11, 14 and 15.",
      },
      {
        type: "cta",
        href: "/safety/swp-library",
        label: "14 — SWP LIBRARY →",
      },
      {
        type: "cta",
        href: "/safety/sjp-library",
        label: "16 — SJP LIBRARY →",
      },
    ],
  },
  {
    num: "16",
    slug: "sjp-library",
    title: "SJP LIBRARY",
    kicker: "This lift. This site. This day. Search it.",
    intro:
      "Safe Job Procedures for work the SWP cannot finish until this morning’s facts are named. Flytable cycles and loading-platform installs. The SWP is the method. The SJP is the instance. Fill the sheet for this table or this deck, this floor, this serial.",
    library: "sjp",
    blocks: [
      {
        type: "p",
        text: "An SJP is not a longer SWP and it is not a JHA. Do the work to the SWP. Name the hazards in the JHA. Fill this SJP with weights, pick points, sling lengths, wind number, named crew, holds and abort. If the instance contradicts the method, stop and fix one of them before the hook moves.",
      },
      {
        type: "cta",
        href: "/safety/builder/flytable-cycle-sjp",
        label: "FILL THIS CYCLE — PROVEN-FRM-052 →",
      },
      {
        type: "cta",
        href: "/safety/builder/loading-platform-sjp",
        label: "FILL THIS DECK — PROVEN-FRM-053 →",
      },
      {
        type: "cta",
        href: "/safety/safe-job-procedures",
        label: "05 — HOW AN SJP IS BUILT →",
      },
      {
        type: "cta",
        href: "/safety/swp-library",
        label: "14 — SWP LIBRARY →",
      },
      {
        type: "cta",
        href: "/safety/jha-library",
        label: "15 — JHA LIBRARY →",
      },
    ],
  },
  {
    num: "17",
    slug: "safety-forms",
    title: "SAFETY FORMS",
    kicker: "The record of the lift.",
    intro:
      "Daily, lifting, incident, worker and inspection forms for crane and rigging work. Complete them in the field. They are the required record.",
    library: "form",
    blocks: [
      {
        type: "p",
        text: "Do not invent a form on the tailgate. Use these. Site forms that are stricter or required by the client are used as well — not instead of the facts these forms capture.",
      },
      {
        type: "cta",
        href: "/safety/builder",
        label: "FORM BUILDER — ASSEMBLE, FILL, PDF →",
      },
      {
        type: "cta",
        href: "/safety/binder",
        label: "CRANE BINDER WIZARD →",
      },
      {
        type: "cta",
        href: "https://www.bccsa.ca/resources.php?id_catalogue=1",
        label: "BCCSA TOOLBOX TALKS →",
      },
    ],
  },
  {
    num: "18",
    slug: "whmis-sds",
    title: "WHMIS + SDS",
    kicker: "Only what crews actually meet.",
    intro:
      "The SDS library is diesel, hydraulic oil, grease, penetrating oil, wire rope dressing, battery electrolyte and hand cleaner — products operators and riggers actually touch on a lift.",
    library: "sds",
    blocks: [
      {
        type: "h",
        text: "WHMIS PROGRAM",
      },
      {
        type: "list",
        items: [
          "Workers have the right to know about products they use on the lift and on the carrier.",
          "Labels stay on. If a product is decanted, it is identified.",
          "SDS for the products below are in this library — no login, no expiring link.",
          "A product the site introduces is the site’s SDS. Ask before you use it.",
          "Spill, fire and first aid follow the SDS and the site emergency plan.",
        ],
      },
      {
        type: "p",
        text: "This is not a catalogue of construction chemicals. If the work does not use it, it is not in this library.",
      },
    ],
  },
  {
    num: "19",
    slug: "inspections",
    title: "INSPECTIONS + CORRECTIVE ACTIONS",
    kicker: "Finding → action → person → date → done → verified.",
    intro:
      "Inspections and actions for cranes, rigging, ground, zone and lifting PPE. Potain, WOLFFKRAN, Liebherr, Zoomlion, Raimondi, Terex, JASO and Pecco tower charts and maintenance forms live here.",
    library: "crane",
    blocks: [
      {
        type: "h",
        text: "WHAT GETS INSPECTED",
      },
      {
        type: "list",
        items: [
          "Crane pre-use and defects that affect lifting",
          "Tower, hammerhead, luffing jib and self-erecting machines — OEM charts below",
          "Rigging and below-the-hook gear",
          "Outriggers, mats, mast ties and supporting surface",
          "Exclusion zone and access",
          "Communication equipment",
          "PPE used on the lift",
          "Corrective actions from incidents and near misses on lifting work",
        ],
      },
      {
        type: "h",
        text: "FREQUENCY",
      },
      {
        type: "list",
        items: [
          "Crane pre-use — each shift before the hook is loaded. 14.35.",
          "Rigging — before it takes load.",
          "Lift area — at setup. At least weekly on a standing tower. After a change to the pad, the zone or the access.",
          "Employer-controlled gear, tools and vehicles — recorded interval. Out of service when they fail.",
          "Workplace the employer controls — monthly, with worker participation where a committee or representative exists. 3.5.",
        ],
      },
      {
        type: "h",
        text: "DEFICIENCY CLASS",
      },
      {
        type: "list",
        items: [
          "Immediate / out of service — affects lifting, access, or a safety device. The crane or the gear stays down.",
          "Before next shift — does not affect this lift. Will affect the next.",
          "Scheduled — named person, named date. Not a parking lot.",
        ],
      },
      {
        type: "h",
        text: "POTAIN TOWER CRANES",
      },
      {
        type: "p",
        text: "MDT 219 topless. MRH 125 hydraulic luffer. MR rope luffers. Hup, Igo and Igo T self-erects. Published load charts download from Manitowoc. Serial manuals stay in the cab and on Crane Care. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/mdt-219",
        label: "POTAIN MDT 219 — GOSPEL-CRN-001 →",
      },
      {
        type: "cta",
        href: "/safety/crane/mrh-125",
        label: "POTAIN MRH 125 — GOSPEL-CRN-002 →",
      },
      {
        type: "h",
        text: "WOLFFKRAN TOWER CRANES",
      },
      {
        type: "p",
        text: "Clear flat-top. Compact and Cross saddle jib. 166 B hydraulic luffer. B-series rope luffers. Published data sheets download from wolffkran.com Canada. Serial manuals stay in the cab. Calgary service and WOLFF Assist support the interval. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/wolff-clear",
        label: "WOLFF CLEAR — GOSPEL-CRN-005 →",
      },
      {
        type: "cta",
        href: "/safety/crane/wolff-166-b",
        label: "WOLFF 166 B — GOSPEL-CRN-007 →",
      },
      {
        type: "h",
        text: "LIEBHERR TOWER CRANES",
      },
      {
        type: "p",
        text: "EC-B flat-top. HC-L rope luffers and 195 HC-LH hydraulic. K-series fast-erect. Published data sheets download from liebherr.com Canada. Serial manuals stay in the cab, on the Tower Crane Portal and on MyLiebherr. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/liebherr-ec-b",
        label: "LIEBHERR EC-B — GOSPEL-CRN-009 →",
      },
      {
        type: "cta",
        href: "/safety/crane/liebherr-hc-l",
        label: "LIEBHERR HC-L — GOSPEL-CRN-010 →",
      },
      {
        type: "cta",
        href: "/safety/crane/liebherr-k-series",
        label: "LIEBHERR K-SERIES — GOSPEL-CRN-011 →",
      },
      {
        type: "h",
        text: "ZOOMLION TOWER CRANES",
      },
      {
        type: "p",
        text: "R-generation and WA flat-top. RL hydraulic luffers. L / LW / LH rope luffers. Published product pages and Manual Download PDFs from en-product.zoomlion.com. Serial manuals stay in the cab. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/zoomlion-flat-top",
        label: "ZOOMLION FLAT-TOP — GOSPEL-CRN-012 →",
      },
      {
        type: "cta",
        href: "/safety/crane/zoomlion-rl",
        label: "ZOOMLION RL — GOSPEL-CRN-013 →",
      },
      {
        type: "h",
        text: "RAIMONDI + TEREX TOWER CRANES",
      },
      {
        type: "p",
        text: "Raimondi MRT and T-series flat-top. LR rope luffers and LRH174 hydraulic. Terex CTT flat-top, CTL / CTLH luffers, CBR and CSE self-erects. Terex tower and self-erect now sit under Raimondi. Data sheets download from each product page on raimondi.com. Serial manuals stay in the cab. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/raimondi-flat-top",
        label: "RAIMONDI FLAT-TOP — GOSPEL-CRN-015 →",
      },
      {
        type: "cta",
        href: "/safety/crane/terex-ctt",
        label: "TEREX CTT — GOSPEL-CRN-017 →",
      },
      {
        type: "cta",
        href: "/safety/crane/terex-self-erect",
        label: "TEREX SELF-ERECTING — GOSPEL-CRN-019 →",
      },
      {
        type: "h",
        text: "JASO TOWER CRANES",
      },
      {
        type: "p",
        text: "Flat-top J165 / J235. HPA hydraulic luffers. PA rope luffers. Published EN 14439 C25 and FEM 1001 sheets download from jaso.com/tower. Serial manuals stay in the cab. Smartlink and Eco Mode where fitted. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/jaso-flat-top",
        label: "JASO FLAT TOP — GOSPEL-CRN-020 →",
      },
      {
        type: "cta",
        href: "/safety/crane/jaso-hpa",
        label: "JASO HPA — GOSPEL-CRN-021 →",
      },
      {
        type: "h",
        text: "PECCO / PEINER TOWER CRANES",
      },
      {
        type: "p",
        text: "SK hammerhead. SN rope luffers. SKK 140 articulated jib. Morrow published the North American range sheets. Peiner built them. Terex took Peiner in 1998. Current Terex SK sits under Raimondi. Serial manuals stay in the cab. Complete the GOSPEL form for this class.",
      },
      {
        type: "cta",
        href: "/safety/crane/pecco-sk",
        label: "PECCO SK — GOSPEL-CRN-023 →",
      },
      {
        type: "cta",
        href: "/safety/crane/pecco-sn",
        label: "PECCO SN — GOSPEL-CRN-024 →",
      },
      {
        type: "cta",
        href: "/safety/form/tower-pre-use",
        label: "TOWER PRE-USE — PROVEN-FRM-027 →",
      },
      {
        type: "cta",
        href: "/safety/form/luffing-jib-inspection",
        label: "LUFFING JIB INSPECTION — PROVEN-FRM-028 →",
      },
      {
        type: "cta",
        href: "/safety/form/self-erect-inspection",
        label: "SELF-ERECT INSPECTION — PROVEN-FRM-029 →",
      },
      {
        type: "cta",
        href: "/safety/form/tower-weekly-maintenance",
        label: "TOWER WEEKLY MAINTENANCE — PROVEN-FRM-030 →",
      },
      {
        type: "cta",
        href: "/safety/form/tower-monthly-maintenance",
        label: "TOWER MONTHLY MAINTENANCE — PROVEN-FRM-031 →",
      },
      {
        type: "h",
        text: "THE LOOP",
      },
      {
        type: "steps",
        items: [
          { n: "01", title: "FINDING", body: "Name the defect, the missing control, or the broken plan." },
          { n: "02", title: "ACTION", body: "Repair, replace, isolate, rewrite the plan, add a spotter, stop the lift." },
          { n: "03", title: "RESPONSIBLE PERSON", body: "A named person. Not “the site.”" },
          { n: "04", title: "DUE DATE", body: "Out-of-service gear is immediate, not next Tuesday." },
          { n: "05", title: "COMPLETION", body: "Done, with evidence. Not a promise." },
          { n: "06", title: "VERIFICATION", body: "A second set of eyes. Closed only when it is proven." },
        ],
      },
      {
        type: "cta",
        href: "/safety/safety-forms",
        label: "ALL INSPECTION FORMS →",
      },
      {
        type: "p",
        text: "An orphan recommendation is not a control. Close the loop.",
      },
    ],
  },
  {
    num: "20",
    slug: "document-control",
    title: "DOCUMENT CONTROL",
    kicker: "The current version is the one on this site.",
    intro:
      "Controlled safety documents show number, revision, effective date, owner, approver and review date. This program is not behind an expiring link.",
    blocks: [
      {
        type: "h",
        text: "NUMBERING",
      },
      {
        type: "list",
        items: [
          "GOSPEL-POL — policies",
          "GOSPEL-SWP — safe work procedures",
          "GOSPEL-JHA — job hazard analyses",
          "GOSPEL-SJP — this lift, this site, this day",
          "PROVEN-FRM — forms",
          "GOSPEL-BND — crane site binders",
          "GOSPEL-SDS — safety data sheets in this library",
          "GOSPEL-CRN — crane charts and inspection packs",
          "GOSPEL-RPT — field reports",
        ],
      },
      {
        type: "h",
        text: "CURRENT VERSION",
      },
      {
        type: "p",
        text: "Revision 01. Effective 2026-09-01. Owner: GOSPEL Safety. Approved by: GOSPEL. Review by: 2027-09-01. Documents on this website are the current version. Printed copies are uncontrolled the moment they leave the screen — check the number and revision before you use a photocopy.",
      },
      {
        type: "h",
        text: "RECORDS",
      },
      {
        type: "p",
        text: "Inspection, incident, investigation, training, meeting and first-aid records are kept at least three years, or longer if a claim or order requires it. First aid: 3.19. They are available to the joint committee or worker health and safety representative, as applicable, and on request to an officer, the union representing the workers, or the workers. 3.3(f).",
      },
      {
        type: "quote",
        text: "If you cannot name the revision, you are not following the revision. You are following a printout.",
      },
    ],
  },
  {
    num: "21",
    slug: "ohs-management-system",
    title: "OHS MANAGEMENT SYSTEM",
    kicker: "Documentation is not implementation.",
    intro:
      "Proven is GOSPEL’s occupational health and safety management system for crane and rigging work. WorkSafeBC s. 3.3 names what a formal program must contain. BCCSA COR® measures the CFCSA 14 elements. The tables below map those requirements to the documents, forms, records, owners and frequencies that already live in this system.",
    blocks: [
      {
        type: "quote",
        text: "A policy on a website is documentation. A completed form with an owner and a date is evidence.",
      },
      {
        type: "h",
        text: "HOW PROVEN IS BUILT",
      },
      {
        type: "rules",
        items: PROGRAM_HIERARCHY.map((item) => ({
          title: item.title,
          body: item.body,
        })),
      },
      {
        type: "h",
        text: "WHEN A FORMAL PROGRAM IS REQUIRED",
      },
      {
        type: "p",
        text: "OHS Regulation 3.1: a 3.3 program is required if the employer has 20 or more workers and at least one workplace with a moderate or high hazard rating under Schedule 3-A, or 50 or more workers. An officer can also require one. Crane and rigging work is high-hazard work. This written program exists because the work requires it. The COR® table below is a document map for that framework. If a workplace the employer controls is below the 3.1 threshold, 3.2 still requires monthly meetings with workers and a record of what was discussed — PROVEN-FRM-033. This program is not an excuse to skip that.",
      },
      {
        type: "h",
        text: "WORKSAFEBC 3.3",
      },
      {
        type: "p",
        text: "Each row is a 3.3 element. Documentation is the rule. The form collects evidence. The record is what an auditor or an officer can be shown.",
      },
      {
        type: "table",
        caption: "WorkSafeBC OHS Regulation s. 3.3 — mapped to this program.",
        columns: ["ELEMENT", "DOCUMENTATION", "FORM", "RECORD", "OWNER", "FREQUENCY"],
        rows: WSBC_33.map((row) => [
          `${row.id} ${row.title}`,
          row.documentation,
          row.form,
          row.record,
          row.owner,
          row.frequency,
        ]),
      },
      {
        type: "h",
        text: "BCCSA COR® — 14 ELEMENTS",
      },
      {
        type: "p",
        text: "BCCSA uses the COR® OHS National Audit Document. The CFCSA Accreditation Standard names 14 elements. Passing scores (80% overall, 50% per element) are for the audit, not for this page. This table is the document map. Implementation is the completed record.",
      },
      {
        type: "table",
        caption: "CFCSA / BCCSA COR® elements — mapped to this program.",
        columns: ["ELEMENT", "DOCUMENTATION", "FORM", "RECORD", "OWNER", "FREQUENCY"],
        rows: COR_ELEMENTS.map((row) => [
          `${row.id} ${row.title}`,
          row.documentation,
          row.form,
          row.record,
          row.owner,
          row.frequency,
        ]),
      },
      {
        type: "h",
        text: "SIZE AND HOST SITE",
      },
      {
        type: "list",
        items: [
          "Joint committee or worker representative — Act Part 2 Division 5, per workplace. GOSPEL-POL-026.",
          "First aid — Part 3 Division 4 and Schedule 3-A, per workplace. Host site: host’s first aid. Employer-controlled workplace: the employer’s assessment. GOSPEL-POL-025.",
          "Prime contractor — multiple-employer workplaces as the Act requires. GOSPEL-POL-027.",
          "Young or new worker orientation — 3.23 before they begin, every workplace. PROVEN-FRM-015.",
        ],
      },
      {
        type: "cta",
        href: "/safety/form/management-review",
        label: "MANAGEMENT OHS REVIEW — PROVEN-FRM-032 →",
      },
      {
        type: "cta",
        href: "/safety/policy/continuous-improvement",
        label: "GOSPEL-POL-016 — CONTINUOUS IMPROVEMENT →",
      },
      {
        type: "cta",
        href: "/safety/policy/contractors",
        label: "GOSPEL-POL-027 — CONTRACTORS AND MULTI-EMPLOYER SITES →",
      },
    ],
  },
  {
    num: "22",
    slug: "crane-binders",
    title: "CRANE BINDERS",
    kicker: "The file that goes with the NOP-TC.",
    intro:
      "A tower or self-erect on a B.C. construction site needs a site binder. BC Crane Safety wrote the checklists. WorkSafeBC requires the Notice of Project — Tower Crane. The wizard builds the GOSPEL copy: numbered items, who holds them, and the downloadable forms.",
    library: "binder",
    blocks: [
      {
        type: "quote",
        text: "The checklist is a mandatory component when you submit the NOP-TC. An empty binder is not due diligence.",
      },
      {
        type: "h",
        text: "TWO BINDERS",
      },
      {
        type: "p",
        text: "Tower Crane Site Binder — hammerhead, topless, luffing jib. Self-Erect Tower Crane Site Binder — Hup, Igo, K-series, CBR, CSE and the rest of that class. Pick the one that matches the machine. Do not run a top-slewing tower on the self-erect list.",
      },
      {
        type: "cta",
        href: "/safety/binder",
        label: "BINDER WIZARD — TOWER OR SELF-ERECT →",
      },
      {
        type: "h",
        text: "WHAT THE WIZARD DOES",
      },
      {
        type: "list",
        items: [
          "Walks the numbered BC Crane Safety items for that class.",
          "Marks each item in binder, missing, or N/A — and who holds it.",
          "Opens the GOSPEL form and the official download (30M33, 52E73C, NOP-TC, tower crane report, NAV CANADA).",
          "Downloads a GOSPEL checklist PDF for this site. Saved on this device.",
        ],
      },
      {
        type: "h",
        text: "NOTICE OF PROJECT",
      },
      {
        type: "p",
        text: "14.73.3. Employer responsible for erecting, climbing, repositioning or dismantling — and the owner or prime — submit a written NOP-TC at least two weeks before the activity. Project type: Tower Crane. Post the notice on site for the duration. Self-erecting tower cranes are still tower cranes.",
      },
      {
        type: "cta",
        href: "https://www.worksafebc.com/en/for-employers/just-for-you/submit-notice-project",
        label: "SUBMIT NOP-TC →",
      },
      {
        type: "cta",
        href: "/safety/form/nop-tc-notice",
        label: "NOP-TC POSTING NOTICE — PROVEN-FRM-039 →",
      },
      {
        type: "h",
        text: "FORMS ON THE CHECKLIST",
      },
      {
        type: "p",
        text: "Official paper stays official. GOSPEL sheets are the working copy and the cover. Form 30M33 is coded by WorkSafeBC — order it; the GOSPEL record is the schematic and the discussion. Radio coordination is 52E73C. The tower crane report is WorkSafeBC’s checklist after erect, climb or reposition.",
      },
      {
        type: "cta",
        href: "/safety/form/powerline-30m33",
        label: "30M33 / POWERLINE RECORD — PROVEN-FRM-037 →",
      },
      {
        type: "cta",
        href: "/safety/form/radio-frequency",
        label: "RADIO FREQUENCY — PROVEN-FRM-038 →",
      },
      {
        type: "cta",
        href: "/safety/form/tower-crane-report",
        label: "TOWER CRANE REPORT — PROVEN-FRM-041 →",
      },
      {
        type: "h",
        text: "OFFICIAL TEMPLATES",
      },
      {
        type: "p",
        text: "Table of contents, notes, and OHSR / CSA info files live on BC Crane Safety. Use them. This program does not host their PDFs as if they were GOSPEL documents.",
      },
      {
        type: "cta",
        href: "https://bccranesafety.ca/resources/tower-crane-site-binder/",
        label: "BC CRANE SAFETY — TOWER CRANE SITE BINDERS →",
      },
    ],
  },
];

export const SAFETY_GROUPS = [
  {
    id: "system",
    label: "THE SYSTEM",
    slugs: ["ohs-management-system"],
  },
  {
    id: "work",
    label: "THE METHOD",
    slugs: [
      "company-safety-policy",
      "responsibilities",
      "training-competency",
      "worker-rights",
    ],
  },
  {
    id: "lift",
    label: "THE LIFT",
    slugs: [
      "hazard-assessment",
      "crane-operations",
      "crane-binders",
      "rigging",
      "fall-protection",
      "safe-work-procedures",
      "safe-job-procedures",
    ],
  },
  {
    id: "wrong",
    label: "WHEN IT GOES WRONG",
    slugs: ["incident-reporting", "emergency-response"],
  },
  {
    id: "library",
    label: "THE LIBRARY",
    slugs: [
      "ohs-policies",
      "swp-library",
      "jha-library",
      "sjp-library",
      "safety-forms",
      "whmis-sds",
      "inspections",
      "document-control",
    ],
  },
] as const;

/** Documents people actually open at the gate. */
export const FIND_NOW = [
  { href: "/safety/form/flha", label: "FLHA", hint: "This shift" },
  { href: "/safety/form/crane-pre-use", label: "CRANE PRE-USE", hint: "This machine" },
  { href: "/safety/form/tower-pre-use", label: "TOWER PRE-USE", hint: "Tower / luffer / Z248" },
  { href: "/safety/form/lift-plan", label: "LIFT PLAN", hint: "This lift" },
  { href: "/safety/sjp/flytable-cycle", label: "FLYTABLE SJP", hint: "This cycle" },
  { href: "/safety/sjp/loading-platform", label: "LOADING PLATFORM SJP", hint: "This deck" },
  { href: "/safety/sjp-library", label: "SJP LIBRARY", hint: "This lift" },
  { href: "/safety/form/toolbox-meeting", label: "TOOLBOX", hint: "The brief" },
  { href: "/safety/policy/right-to-refuse", label: "STOP WORK", hint: "Refuse unsafe" },
  { href: "/safety/report/incident", label: "INCIDENT", hint: "Report it" },
  { href: "/safety/swp/working-near-powerlines", label: "MAD / POWERLINES", hint: "Table 19-1A" },
  { href: "/safety/swp/weather-and-wind", label: "LIGHTNING / WIND", hint: "Thunder is the stop" },
  { href: "/safety/emergency-response", label: "EMERGENCY", hint: "The plan" },
  { href: "/safety/binder", label: "CRANE BINDER", hint: "Tower / self-erect" },
  { href: "/safety/builder", label: "FORM BUILDER", hint: "Fill + PDF" },
] as const;

export function safetyByGroup() {
  return SAFETY_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    sections: group.slugs
      .map((slug) => SAFETY.find((s) => s.slug === slug))
      .filter((s): s is SafetySection => Boolean(s)),
  }));
}

export function getSafety(slug: string) {
  return SAFETY.find((s) => s.slug === slug);
}

export function getSafetyIndex() {
  return SAFETY.map(({ num, slug, title, kicker }) => ({
    num,
    slug,
    title,
    kicker,
  }));
}
