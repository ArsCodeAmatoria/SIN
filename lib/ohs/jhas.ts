import type { Jha, JhaRow } from "./types";
import { FLYTABLE_REFS, LIFT_PPE, LIFT_REFS, LIGHTNING_REFS, MAD_REFS, PLATFORM_REFS } from "./meta";

const JHA_REFS = [
  "Workers Compensation Act s. 21(2)(b) — workers made aware of known or reasonably foreseeable hazards",
  "Workers Compensation Act s. 21(2)(e) — information, instruction, training and supervision",
  "OHS Regulation B.C. Reg. 296/97 (in force 15 Apr 1998) Part 3 — program, instruction, inspections (ss. 3.1–3.12)",
  "CCOHS Job Safety Analysis — JSA and JHA are the same method: break the job, name the hazards, select controls",
  ...LIFT_REFS,
];

function jha(
  number: string,
  slug: string,
  title: string,
  summary: string,
  fields: {
    job: string;
    people: string[];
    rows: JhaRow[];
    residual: string;
    stop: string[];
    swpHref?: string;
    swpLabel?: string;
    references?: string[];
  }
): Jha {
  const { references: extraRefs, ...rest } = fields;
  return {
    slug,
    title,
    number,
    summary,
    ppe: LIFT_PPE,
    references: extraRefs ? [...JHA_REFS, ...extraRefs] : JHA_REFS,
    ...rest,
  };
}

export const JHAS: Jha[] = [
  jha(
    "PROVEN-JHA-001",
    "rigging-a-load",
    "RIGGING A LOAD",
    "Dropped load, crush, cut sling, people in the fall line.",
    {
      job: "Making a hitch and taking a load off the ground. The steps live in PROVEN-SWP-011. This page is what can go wrong while you do them.",
      people: ["Rigger at the piece", "Operator on the crane", "Signalperson", "Anyone who can walk into the fall zone"],
      swpHref: "/safety/swp/slinging-loads",
      swpLabel: "SWP — SLINGING LOADS →",
      residual:
        "After blocking, inspection, a known hitch and a test lift, residual risk is a load that still moves when it should not — wind, a missed COG, a person entering the zone. That residual is held by the exclusion zone and by stop-work. It is not held by hoping.",
      stop: [
        "Weight or centre of gravity unknown",
        "Gear fails inspection (Part 15)",
        "Angle or hitch not understood",
        "People in the fall line (14.44)",
      ],
      rows: [
        {
          task: "Plan the hitch",
          level: "high",
          hazard: "Unknown weight or COG",
          risk: "Overload, tip, or the piece rolling onto the rigger. High severity.",
          control: "Eliminate the guess. Shipping data, scale, or engineer. 14.36 — load weight determined. No plan, no hook.",
        },
        {
          task: "Inspect the gear",
          level: "high",
          hazard: "Cut, birdcaged, opened, or unidentified sling or hardware",
          risk: "Hitch fails under load. Dropped load. Fatal if anyone is under it.",
          control: "Inspect before use (Part 15). Failed gear tagged and isolated — PROVEN-SWP-025. No one-more-lift.",
        },
        {
          task: "Connect the hitch",
          level: "high",
          hazard: "Sharp edge, twisted sling, hardware not seated, piece not blocked",
          risk: "Sling cut, load shifts onto the rigger, fingers in the pinch.",
          control: "Block the piece first. Softeners. Pins fully in. Hands off before weight. Engineer if there are no lifting points.",
        },
        {
          task: "Clear the zone",
          level: "extreme",
          hazard: "People under or in the fall line",
          risk: "Struck-by or crush. 14.44 — loads over work areas.",
          control: "Exclusion zone held before the load leaves the ground. Signalperson owns the zone, not traffic.",
        },
        {
          task: "Test, then lift",
          level: "high",
          hazard: "Unbalanced hitch, shock load, lost signal",
          risk: "Load dumps, crane shock, second hitch failure.",
          control: "Inch off the ground. Re-rig if it tilts. Smooth hoist. Stop on any lost signal (14.47).",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-002",
    "signalling-a-crane",
    "SIGNALLING A CRANE",
    "Two voices, a blind operator, a person in the path.",
    {
      job: "Directing the crane so the operator moves only on a signal they can trust. Method: PROVEN-SWP-005 / 007.",
      people: ["Signalperson", "Operator", "Riggers in the zone", "Other trades who can enter the path"],
      swpHref: "/safety/swp/crane-communication",
      swpLabel: "SWP — CRANE COMMUNICATION →",
      residual:
        "Radios fail and hands get lost in glare. Residual risk is a crane that moves on silence or on the wrong person. Held by a hard STOP and by not moving until the crew is reset. 14.47–14.49.",
      stop: [
        "Two people signalling",
        "Cannot see load, path or operator — and no dedicated radio protocol",
        "Radio untested or garbage",
        "Zone lost",
      ],
      rows: [
        {
          task: "Name one signalperson",
          level: "high",
          hazard: "Two people signalling",
          risk: "Operator picks the convenient instruction. Load into a person or a structure.",
          control: "One voice. Transfer spoken and acknowledged. 14.47.",
        },
        {
          task: "Agree the system",
          level: "moderate",
          hazard: "Non-standard hands, wrong channel, private dialect",
          risk: "Operator translates. Translation is a guess. Guess is a collision.",
          control: "Standard signals. Channel and STOP in the brief. Dedicated radio where 14.49 requires it.",
        },
        {
          task: "See the load, path and operator",
          level: "high",
          hazard: "Blind corner, glare, signalperson also rigging",
          risk: "Boom or load into steel, lines or people the operator cannot see.",
          control: "If you cannot see, you are not signalling. Dedicated spotter or stop. Blind lifts: PROVEN-JHA-005.",
        },
        {
          task: "Hold the zone",
          level: "extreme",
          hazard: "Trades walking the fall line while the signalperson is busy",
          risk: "Struck-by. 14.44.",
          control: "Hands are for the crane. Zone is a control, not a courtesy. Anyone may STOP.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-003",
    "connecting-a-load",
    "CONNECTING A LOAD",
    "Pinch, roll, cut sling, hands on a live hitch.",
    {
      job: "Putting the hitch on the piece before the crane takes weight. Method: PROVEN-SWP-011 / 012.",
      people: ["Rigger on or beside the load", "Operator waiting on the hook", "Anyone reaching in to ‘help’"],
      swpHref: "/safety/swp/slinging-loads",
      swpLabel: "SWP — SLINGING LOADS →",
      residual:
        "A blocked, inspected hitch still pinches when the piece settles. Residual is fingers and feet. Held by hands and feet out before weight, and by a test lift before anyone believes the connection.",
      stop: [
        "Wrong shackle or missing pin",
        "Sling on a sharp edge with no protection",
        "Load not blocked",
        "No rated lifting point and no engineered method",
      ],
      rows: [
        {
          task: "Block the piece",
          level: "high",
          hazard: "Unstable load, roll, stack shift",
          risk: "Crush of the rigger against the piece or the ground.",
          control: "Shore or block so the piece cannot roll onto a person. Do not crawl a live stack.",
        },
        {
          task: "Choose the points",
          level: "high",
          hazard: "Choking a mystery flange, shop-welded eye",
          risk: "Point tears out. Dropped load.",
          control: "Designed lifting points. Homemade gear is out unless a professional engineer owns it (14.2, 14.15).",
        },
        {
          task: "Seat hardware",
          level: "high",
          hazard: "Pin not engaged, side-loaded shackle, sling on the hook tip",
          risk: "Hardware opens under load. Dropped load.",
          control: "Match pin to body. Load bow and pin as designed. Sling in the saddle. Part 15.",
        },
        {
          task: "Protect the sling",
          level: "high",
          hazard: "Sharp edge, heat, chemical",
          risk: "Sling cut or burned through. Dropped load delayed, not prevented.",
          control: "Softeners, pads, or a different hitch. Change the method — do not wrap tape as WLL.",
        },
        {
          task: "Clear hands",
          level: "high",
          hazard: "Fingers, gloves, clothing in the hitch as the crane takes weight",
          risk: "Amputation, pull-in.",
          control: "Hands and feet out. Operator does not take weight until the rigger is clear and the signal is given.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-004",
    "landing-a-load",
    "LANDING A LOAD",
    "Pinch against a wall, unprepared set, tag line wrapped on a wrist.",
    {
      job: "Putting the piece down so it stays put and nobody is trapped. Method: PROVEN-SWP-015.",
      people: ["Rigger at the set", "Tag-line hands", "Operator", "Anyone between the load and a structure"],
      swpHref: "/safety/swp/load-control",
      swpLabel: "SWP — LOAD CONTROL →",
      residual:
        "A prepared set still pinches when the piece rotates on the last inch. Residual is the gap between load and wall. Held by tag lines, a slow land, and nobody in that gap. 14.50 — unhook only when landed and stable.",
      stop: [
        "Landing not prepared",
        "People between load and structure",
        "Tag line wrapped on a wrist or belt",
        "Signal lost on the last foot",
      ],
      rows: [
        {
          task: "Prepare the set",
          level: "moderate",
          hazard: "No blocking, bolts, dunnage or clearance",
          risk: "Load set on nothing. Collapse, roll, second lift in a panic.",
          control: "Set ready before the load arrives. If the set is not ready, the load does not come in.",
        },
        {
          task: "Control rotation",
          level: "high",
          hazard: "Spin into people or plant; tag line on the body",
          risk: "Struck-by, pull-in, person used as an anchor.",
          control: "Tag lines, not shoulders. Hold so you can let go. PROVEN-JHA-008.",
        },
        {
          task: "Keep the pinch clear",
          level: "extreme",
          hazard: "Person between load and wall, column, truck or another piece",
          risk: "Crush. Often fatal. Often ‘just guiding it’.",
          control: "Nobody in the pinch. Push with a tag line or a pike pole — not a hip.",
        },
        {
          task: "Land, then disconnect",
          level: "high",
          hazard: "Unhooking a load that is still live",
          risk: "Load shifts onto the rigger. 14.50.",
          control: "Fully landed and stable. Slack confirmed. Then hardware off. Then inspect the gear.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-005",
    "blind-lift",
    "BLIND LIFT",
    "Operator cannot see. Radio dies. Boom into what nobody called.",
    {
      job: "Moving a load when the operator cannot see the load, the set, or part of the path. Method: PROVEN-SWP-008. 14.47–14.49.",
      people: ["Operator", "Dedicated signalperson", "Anyone in a hole, on a floor, or around a corner the boom can reach"],
      swpHref: "/safety/swp/blind-lifts",
      swpLabel: "SWP — BLIND LIFTS →",
      residual:
        "Even with named eyes and a radio check, a radio can die mid-swing. Residual is a crane that still has momentum. Held by inching, by a written lost-comms rule, and by stopping — not completing the last guessed instruction.",
      stop: [
        "No dedicated signalperson",
        "Radio not tested",
        "Relay chain with no protocol",
        "Path not walked",
      ],
      rows: [
        {
          task: "Declare it blind",
          level: "moderate",
          hazard: "Discovering the operator cannot see once the load is at radius",
          risk: "Improvised signalling. Collision.",
          control: "Say it in the brief. If it is blind, it is planned as blind. 14.47.",
        },
        {
          task: "Name the eyes",
          level: "high",
          hazard: "Relay chain, two voices, operator guessing",
          risk: "Delayed or inverted instruction. Load into a person.",
          control: "One voice the operator listens to. Relays only with a protocol. Dedicated radio system where 14.49 applies.",
        },
        {
          task: "Walk the path",
          level: "high",
          hazard: "Lines, steel, people, other cranes out of sight",
          risk: "Contact. 14.40 swing hazards. 14.52.1 high voltage.",
          control: "Walk it before the hook is loaded. Spotter on lines. MAD is a wall.",
        },
        {
          task: "Lost communications",
          level: "high",
          hazard: "Dead radio, stepped-on channel, silence",
          risk: "Operator completes a swing into a floor.",
          control: "Stop. Hold or land as the brief said. Do not finish the last instruction you think you heard.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-006",
    "mobile-crane-setup",
    "MOBILE CRANE SETUP",
    "Punch-through, short-rig, tail swing, overhead lines, wrong chart.",
    {
      job: "Putting a mobile crane or boom truck on the ground the chart requires. Method: PROVEN-SWP-001, 021, 022. 14.2(5) CSA Z150-1998 or ASME B30.5-2004 or B30.22-2005.",
      people: ["Operator", "Oiler / second", "People in the jack line or tail-swing arc", "Anyone under a boom being raised into lines"],
      swpHref: "/safety/swp/mobile-crane-setup",
      swpLabel: "SWP — MOBILE CRANE SETUP →",
      residual:
        "Ground that looked competent can still give on the first load. Residual is settlement and a crane that is no longer the crane on the chart. Held by mats sized for the reaction, a level check, and treating the first load as a test of the pad. 14.11 support structure. 14.35 pre-use.",
      stop: [
        "Wrong configuration for the chart in the cab",
        "Ground will not hold the reaction",
        "Outriggers not in the charted position",
        "Overhead lines inside MAD",
      ],
      rows: [
        {
          task: "Confirm the machine",
          level: "high",
          hazard: "Counterweight, boom, software or tyres not as assigned",
          risk: "Chart does not apply. Overload without an alarm that matches reality. 14.2, 14.12.",
          control: "Serial, configuration and chart are the same machine. Manufacturer instructions in the cab.",
        },
        {
          task: "Walk the pad",
          level: "extreme",
          hazard: "Backfill, vaults, slope, buried services, other cranes",
          risk: "Punch-through, overturn, contact with a main. High severity.",
          control: "Look and ask. Locates. Engineer when the surface is a guess. Mats spread load — they do not invent bearing.",
        },
        {
          task: "Outriggers and mats",
          level: "extreme",
          hazard: "Short-rig without that chart; undersized cribbing; people in the jack line",
          risk: "Overturn. Crush beside a jack. 14.2 to the manufacturer.",
          control: "Fully extended unless the short-rig chart is in the cab and in use. People clear while jacking. Level within manufacturer limit.",
        },
        {
          task: "Swing and lines",
          level: "extreme",
          hazard: "Tail swing, boom into plant, overhead electrical",
          risk: "Struck-by, arc, step potential. 14.40, 14.52.1.",
          control: "Swing check before the hook. MAD as a wall. Spotter when the boom can encroach.",
        },
        {
          task: "Inspect, then lift",
          level: "moderate",
          hazard: "Defect that affects lifting, skipped pre-use",
          risk: "Function failure on the first pick. 14.35.",
          control: "Pre-use this shift, this configuration. Lifting defects: crane down.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-007",
    "suspended-load",
    "SUSPENDED LOAD",
    "Someone under it. Nobody on the crane. Wind on a hanging piece.",
    {
      job: "Any time a load is off the ground on a lift under this program. Method: PROVEN-SWP-017. 14.44, 14.45.",
      people: ["Everyone who can walk under the hook", "Operator", "Tag-line hands", "Trades using the shadow as a shortcut"],
      swpHref: "/safety/swp/suspended-loads",
      swpLabel: "SWP — SUSPENDED LOADS →",
      residual:
        "A held zone still fails when a labourer cuts through. Residual is a person where the load can fall. Held by a live exclusion and by not leaving a load hanging for convenience. 14.45 unattended loads.",
      stop: [
        "Person in the fall zone",
        "Unattended suspended load",
        "Riding the load (14.51)",
        "Wind above the plan or the manufacturer",
      ],
      rows: [
        {
          task: "Hoist",
          level: "extreme",
          hazard: "People still in the fall zone",
          risk: "Struck-by. 14.44 loads over work areas.",
          control: "Zone cleared and held before the load leaves the ground. Not after.",
        },
        {
          task: "Hold in the air",
          level: "high",
          hazard: "Drift, wind sail, pendulum",
          risk: "Contact with plant or people. Side load on the crane.",
          control: "Tag lines. Smooth motions. Manufacturer and plan wind limits — the lower number wins.",
        },
        {
          task: "Leave the seat",
          level: "high",
          hazard: "Load left hanging, crane unattended",
          risk: "Drift into a walkway. Unauthorized operation. 14.45.",
          control: "Land it, or a named operator stays with the crane under a written hold. Convenience is not a reason.",
        },
        {
          task: "Ride or walk under",
          level: "extreme",
          hazard: "Person on the hook or in the shadow",
          risk: "Fall from the load, or crush. 14.51 riding hook or load — prohibited.",
          control: "Eliminate. Nobody rides. Nobody uses the shadow as a path.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-008",
    "tag-line",
    "TAG LINE",
    "Wrap on a wrist. Standing in the bight. Pulled under the load.",
    {
      job: "Using a line to control rotation of a live load. Method: PROVEN-SWP-016.",
      people: ["Tag-line hands", "Anyone in the bight", "Rigger who grabbed the load instead"],
      swpHref: "/safety/swp/tag-lines",
      swpLabel: "SWP — TAG LINES →",
      residual:
        "A correct hold still loses when the load takes a gust. Residual is a person who becomes an anchor. Held by being able to let go, by standing out of the fall zone, and by stopping the crane instead of winning a tug-of-war.",
      stop: [
        "Line wrapped on a wrist, belt or ankle",
        "Standing in the bight",
        "Pulling the load under the boom",
        "Line that can blow into a powerline",
      ],
      rows: [
        {
          task: "Select and attach",
          level: "moderate",
          hazard: "Frayed line, snag, attach point that slips",
          risk: "Sudden release. Load spins. Person stumbles under it.",
          control: "Serviceable length for this load. Attach where it will not slip off or cut.",
        },
        {
          task: "Hold the line",
          level: "high",
          hazard: "Turn around the body; gloves that will not release",
          risk: "Pull-in, amputation, person dragged under the load.",
          control: "Hold so you can let go. Never a wrap on flesh or belt. You are not an anchor.",
        },
        {
          task: "Stand",
          level: "high",
          hazard: "Fall zone, pinch, bight, under the boom",
          risk: "Struck-by or crush when the load or the line takes you.",
          control: "Out of the fall zone, out of the pinch, out of the bight. Guide — do not fight.",
        },
        {
          task: "Near lines",
          level: "high",
          hazard: "Tag line as a conductor into MAD",
          risk: "Arc, shock. 14.52.1.",
          control: "If the line can blow into a conductor, this is not a tag-line job until the utility or the plan says it is.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-009",
    "rigging-inspection",
    "RIGGING INSPECTION",
    "Unidentified gear. A cut that the next rigger will use.",
    {
      job: "Deciding whether a sling or fitting may take load. Method: PROVEN-SWP-009. Part 15.",
      people: ["Rigger doing the inspection", "The next rigger if failed gear is left on the pile", "Anyone under a hitch made of that gear"],
      swpHref: "/safety/swp/rigging-inspection",
      swpLabel: "SWP — RIGGING INSPECTION →",
      residual:
        "Inspection catches what can be seen. Residual is internal damage, a tag that lied, or gear that fails between inspect and use. Held by inspecting again after the lift, and by destroying or quarantining anything that failed — not by leaving it ‘so nobody trips.’",
      stop: [
        "No identification or illegible rating",
        "Cut, birdcage, opened hook, wrong pin",
        "Heat or chemical damage the material is not rated for",
        "Homemade modification",
      ],
      rows: [
        {
          task: "Identify",
          level: "moderate",
          hazard: "Unmarked sling, mystery fitting, homemade eye",
          risk: "WLL is a rumour. Overload. Dropped load. Part 15.",
          control: "No ID — out of service. Engineer for modifications (14.15). Shop specials are out.",
        },
        {
          task: "Inspect body and hardware",
          level: "high",
          hazard: "Broken wires, cuts, stretch, opened throat, missing latch",
          risk: "Hitch fails at load. People in the zone take the consequence.",
          control: "Rejection criteria in the SWP. Fail = tag, isolate, report the same shift. PROVEN-SWP-025.",
        },
        {
          task: "Leave it for the next person",
          level: "moderate",
          hazard: "Failed gear on the working pile",
          risk: "The next hitch is the incident. Delayed, not avoided.",
          control: "Physical isolation. Not beside the good slings. Not ‘we’ll deal with it later.’",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-010",
    "critical-lift",
    "CRITICAL LIFT",
    "Capacity, tandem, public, plant — and a brief that was theatre.",
    {
      job: "A lift the site or this program calls critical. Method: PROVEN-SWP-019. 14.42 tandem. 14.42.1 critical lift.",
      people: ["Named supervisor", "Operator", "Rigger and signalperson", "People under the path — plant operators, public, other trades"],
      swpHref: "/safety/swp/critical-lifts",
      swpLabel: "SWP — CRITICAL LIFTS →",
      residual:
        "A written plan still fails when a hold point is skipped because the crane is waiting. Residual is overconfidence. Held by named people who can repeat the abort, and by stopping when a condition is unmet — not by adapting on the fly. 14.42.1.",
      stop: [
        "No written critical lift plan at the lift",
        "No named supervisor",
        "Anyone on the crew cannot repeat the abort",
        "Tandem without a single lead and a plan (14.42)",
      ],
      rows: [
        {
          task: "Declare why it is critical",
          level: "high",
          hazard: "Calling it routine when it is capacity, tandem, public or shifting COG",
          risk: "Controls that belong to a grocery pick. Multiple fatalities or plant loss.",
          control: "Say it out loud. Write it. 14.42.1. If it meets the definition, it is critical.",
        },
        {
          task: "Plan and people",
          level: "high",
          hazard: "Implied roles, missing engineer, plan left in the office",
          risk: "Nobody owns the abort. Tandem mismatch. 14.42.",
          control: "Plan at the lift. Named operator, rigger, signal, supervisor. Engineer when required.",
        },
        {
          task: "Brief",
          level: "moderate",
          hazard: "Signatures without understanding",
          risk: "Crew cannot stop what they cannot name.",
          control: "Everyone repeats the plan, the signals, who stops it. If they cannot, the brief failed. Act s. 21(2)(e).",
        },
        {
          task: "Hold points",
          level: "high",
          hazard: "Skipping a hold to keep the crane moving",
          risk: "The condition you were going to check is the one that fails.",
          control: "Holds are the control. Abort is a success. Rewrite — do not improvise.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-011",
    "flytable-cycling",
    "FLYTABLE CYCLING",
    "Critical lift. Changing COG. Edge. Wind. Four floors of radio.",
    {
      job: "Cycling a flytable / flyform floor to floor. Method: PROVEN-SWP-028. Fill PROVEN-SJP-001 / FRM-052 for this cycle. This page is what can go wrong in drop, roll, fly and land. Formwork carpentry is the host’s hazard analysis, not this one.",
      people: [
        "Operator",
        "Rigger and signalperson",
        "Formwork crew at the drop and the landing",
        "Spotters on both floors",
        "Anyone below the path",
        "Prime — not a spectator",
      ],
      swpHref: "/safety/swp/flytable-cycling",
      swpLabel: "SWP — FLYTABLE CYCLING →",
      residual:
        "A table still moves when a pin is missed, a radio is lost, or the COG is not the drawing. Residual is held by the gate, by confirmation loops, and by stop-work — not by having flown this building yesterday. 14.42.1.",
      stop: [
        "No engineered drawing or manufacturer cycle at the lift",
        "Weight or COG unknown (14.36)",
        "This is a corner or nontypical table without PROVEN-SWP-029",
        "Crane being asked to pull the table out",
        "People or loose gear on the table",
        "Radios not confirmed on both floors",
        "Wind above the lower limit",
      ],
      references: FLYTABLE_REFS,
      rows: [
        {
          task: "Gate / plan",
          level: "high",
          hazard: "Last floor’s SJP, missing drawing, no pre-lift meeting",
          risk: "Critical lift run as a grocery pick. The incidents WorkSafeBC filmed.",
          control: "This-cycle SJP. Drawing revision. Meeting close to the lift. PROVEN-SWP-019 and 028.",
        },
        {
          task: "Drop",
          level: "high",
          hazard: "Table still snagged. Crane used to strip. People under the table.",
          risk: "Sudden load, structural damage, crush. Host duty under Part 20 — the crane does not take load to drop jacks.",
          control: "Formwork drops per OEM. Crane on standby. Zone clear. Confirm free of the slab before any hoist.",
        },
        {
          task: "Roll to the edge",
          level: "extreme",
          hazard: "Runaway table. Fall from the unguarded slab. Crane pulling the table out.",
          risk: "Table over the edge. Person over the edge. Side-load on the crane. Fatal.",
          control: "Curb stops, kicker blocks, brake lines as the drawing. Part 11 at the edge. Crane does not pull. Aluma / Doka: guide out, do not drag.",
        },
        {
          task: "Attach",
          level: "extreme",
          hazard: "Wrong pick, missing pin or cotter, two points on a four-point table, people still on it",
          risk: "Table dumps when it leaves the slab. Dropped load. 14.44.",
          control: "Every designated point, pins in as the OEM, before the table leaves the building. Doka: four designed points before travel outside. People and loose material off.",
        },
        {
          task: "Fly",
          level: "high",
          hazard: "Wind on a panel. Lost radio. Shifting COG. Falling objects.",
          risk: "Uncontrolled swing, contact, struck-by on the floors below.",
          control: "Lower wind number wins. Confirmation-loop radios. Tag lines. Tethered tools, exclusion, catch nets as the site plan. Stop on change.",
        },
        {
          task: "Land",
          level: "high",
          hazard: "Disconnect before the table is stable. Crush at the set.",
          risk: "Table walks, tips, or drops a bay. Hands in the pinch.",
          control: "Jacks or landing dollies as the OEM. Tiebacks and curbs as the drawing. Formwork supervisor says landed. Then release.",
        },
        {
          task: "Change",
          level: "high",
          hazard: "Sequence drift, different table, weather pickup, new person on the radio",
          risk: "The unbriefed change is the incident.",
          control: "Stop and discuss. Engineer if the drawing no longer matches. Rewrite the SJP. Do not adapt on the fly.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-012",
    "corner-nontypical-flytables",
    "CORNER AND NONTIPICAL FLYTABLES",
    "Asymmetric COG. Reduced stability. Typical plan will not hold it.",
    {
      job: "Flying a corner, infill or nontypical table. Method: PROVEN-SWP-029 plus 028. BC Crane Safety: special handling plan.",
      people: [
        "Same as a typical cycle",
        "Whoever the special plan names as extra tag line or spotter",
        "The engineer if the plan is missing or the table changed",
      ],
      swpHref: "/safety/swp/corner-nontypical-flytables",
      swpLabel: "SWP — CORNER AND NONTIPICAL FLYTABLES →",
      residual:
        "Even with a special plan, a nontypical table can spin when it leaves the slab. Residual is held by slower holds and by refusing the typical SJP — not by ‘we’ve flown corners on this job.’",
      stop: [
        "No special engineered handling plan at the lift",
        "Crew cannot say why this table is not typical",
        "Sling geometry copied from a typical table",
        "Anyone calling it close enough to typical",
      ],
      references: FLYTABLE_REFS,
      rows: [
        {
          task: "Declare nontypical",
          level: "high",
          hazard: "Corner table on the typical SJP",
          risk: "Wrong COG, wrong hang, dump at the edge.",
          control: "Said on PROVEN-SJP-002. Brief repeats it. If they cannot, the brief failed.",
        },
        {
          task: "Special plan",
          level: "high",
          hazard: "Margin note, memory, or a photocopy of last tower’s corner",
          risk: "This building’s table is not that one. Structural failure or spin.",
          control: "Engineered handling plan for this table, this floor, this drawing revision — at the lift.",
        },
        {
          task: "Leave the slab",
          level: "extreme",
          hazard: "Asymmetric COG, reduced bearing, missing extra tag line",
          risk: "Table rotates into the structure or over the street. High severity.",
          control: "Sling geometry only as the special plan. Extra tag line and spotter if named. Slower. PROVEN-SWP-028 still applies — crane does not pull.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-013",
    "working-near-powerlines",
    "WORKING NEAR POWERLINES",
    "Arc, contact, step potential. MAD is a wall. Guessing voltage is the incident.",
    {
      job: "Any lift where overhead or buried electrical lines exist or might. Method: PROVEN-SWP-018. Distances: WorkSafeBC Table 19-1A, the same numbers BC Hydro publishes.",
      people: [
        "Operator",
        "Rigger and tag-line hands",
        "Spotter on the line",
        "Anyone who can walk up to a crane in contact",
      ],
      swpHref: "/safety/swp/working-near-powerlines",
      swpLabel: "SWP — WORKING NEAR POWERLINES →",
      residual:
        "A verified voltage still arcs across a gap. Residual is a boom that drifts, a tag line that sails, or a person who approaches a crane in contact. Held by MAD as a wall, a dedicated spotter, and 10 m / 911 on contact — not by the line looking dead.",
      stop: [
        "Voltage not verified by the utility",
        "MAD for this voltage cannot be held and there is no signed 30M33",
        "No dedicated spotter when the boom or load can encroach",
        "Tag line that can blow into the line",
      ],
      references: MAD_REFS,
      rows: [
        {
          task: "Find the lines",
          level: "high",
          hazard: "Service drop, distribution or transmission missed on the drawing",
          risk: "Contact or arc. Fatal. 14.52.1.",
          control: "Look up. Look down. Ask the site. Do not trust a single drawing.",
        },
        {
          task: "Name the voltage",
          level: "high",
          hazard: "Guessing kV. Treating transmission as distribution.",
          risk: "MAD too short. Arc across the gap you thought was enough.",
          control: "BC Hydro Express Connect 1 877 520 1355. Unknown: 3 m distribution, 6 m transmission, until they verify.",
        },
        {
          task: "Hold MAD",
          level: "extreme",
          hazard: "Boom, load or tag line inside Table 19-1A",
          risk: "Arc or contact. Operator and ground crew both exposed.",
          control: "1 m under 750 V. 3 m to 75 kV. 4.5 m to 250 kV. 6 m to 550 kV. All of boom, load, people, tools. 19.24.1.",
        },
        {
          task: "Work inside MAD",
          level: "extreme",
          hazard: "Entering the limits without assurance in writing",
          risk: "Unplanned contact. No utility control of the line.",
          control: "Stop. Coded 30M33 signed by the power-system owner. PROVEN-FRM-037 is the schematic, not the assurance.",
        },
        {
          task: "Contact",
          level: "extreme",
          hazard: "People approaching a live crane. Operator jumping into step potential.",
          risk: "Second electrocution. Fatal.",
          control: "Stay on unless fire or shock. People back 10 m — 33 m if transmission or a manhole. 911. Jump clear, feet together, shuffle. Briefed before the lift.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-014",
    "loading-platform-reposition",
    "LOADING PLATFORM INSTALL AND REPOSITION",
    "Empty deck. Four points. Props out. Edge. The service WLL is not the fly weight.",
    {
      job: "Installing, repositioning or striking a cantilever loading platform by crane. Method: PROVEN-SWP-030. Fill PROVEN-SJP-003 / FRM-053 for this deck. Rails, props, clamps and daily SuperDeck extend / retract are the host’s hazard analysis, not this one.",
      people: [
        "Operator",
        "Rigger and signalperson",
        "Tag-line hands",
        "Platform supervisor (host)",
        "Anyone below the path",
        "Prime — not a spectator",
      ],
      swpHref: "/safety/swp/loading-platform-reposition",
      swpLabel: "SWP — LOADING PLATFORM INSTALL AND REPOSITION →",
      residual:
        "A deck still dumps when a prop is left in, a pick is improvised, or someone is still on it. Residual is held by the empty-only gate and by stop-work — not by having moved this brand yesterday.",
      stop: [
        "No OEM user information or type plate at the lift",
        "Dead weight unknown — or anyone treating service WLL as the fly weight (14.36)",
        "People or material on the deck",
        "Props or clamps still in",
        "Fewer than the designated lifting points",
        "Wind above the lower limit",
        "Host asking the crane to retract or extend a SuperDeck",
      ],
      references: PLATFORM_REFS,
      rows: [
        {
          task: "Gate / plan",
          level: "high",
          hazard: "Last floor’s SJP. Missing user information. Service WLL written as the pick.",
          risk: "Critical lift run as a grocery pick. Overload or a surprise hang.",
          control: "This-deck SJP. Type plate. Empty dead weight plus rigging. Meeting close to the lift. PROVEN-SWP-019 and 030.",
        },
        {
          task: "Hitch",
          level: "high",
          hazard: "Improvised picks. Two legs on a four-point deck. Wrong chain length or sling angle.",
          risk: "Deck dumps when it leaves the slab. Dropped load. 14.44.",
          control: "Four designated points. 4-leg chain as the OEM. Doka: 3.20 m, β ≤ 30°. Inspect. Tag lines on.",
        },
        {
          task: "Empty",
          level: "extreme",
          hazard: "People or material still on the deck. Loose gear.",
          risk: "Dump at the edge. Person over. Fatal.",
          control: "Empty only. Doka: no persons, no material. SuperDeck install empty. One platform at a time. Zone clear.",
        },
        {
          task: "Release / hoist",
          level: "extreme",
          hazard: "Hoisting with props or clamps still in. Crane used to strip.",
          risk: "Side-load. Structural damage. Deck over the edge. Fatal.",
          control: "Host releases to the OEM. CantiDeck: do not lift until props are released. Confirm free. Then hoist. Part 11 at the edge.",
        },
        {
          task: "Fly",
          level: "high",
          hazard: "Wind on a sail. Lost radio. Path over people.",
          risk: "Uncontrolled swing. Struck-by below.",
          control: "Lower wind number wins. Doka 72 km/h is a ceiling, not a target. Tag lines. Exclusion. Stop on change.",
        },
        {
          task: "Land / disconnect",
          level: "high",
          hazard: "Disconnect before rails, props and clamps are in. Crush at the set.",
          risk: "Deck walks or dumps. Hands in the pinch.",
          control: "Host pins rails and props, clamps or anchors as the OEM. Supervisor says landed. Then release.",
        },
        {
          task: "Using the deck",
          level: "high",
          hazard: "Landing more than remaining WLL. Unsupervised load. Treating deck WLL as a second chart.",
          risk: "Deck collapse or a pick the crane cannot hold.",
          control: "Separate lift. Chart and remaining platform WLL both take it. Unsupervised load prohibited.",
        },
        {
          task: "Retractable daily",
          level: "high",
          hazard: "Crane still hooked while SuperDeck / Super Roller / DOC rolls. The crew asked to retract it.",
          risk: "Side-load. Snag. Dump.",
          control: "Daily extend and retract is host. Preston: no licence to roll it. The crane hooks only for install, reposition, strike — empty.",
        },
      ],
    }
  ),
  jha(
    "PROVEN-JHA-015",
    "weather-and-wind",
    "WEATHER AND WIND",
    "Thunder is striking distance. A crane is a rod. The first 30 of 30/30 is not a reason to keep lifting.",
    {
      job: "Outdoor crane and rigging when wind, lightning, ice or visibility can take the plan. Method: PROVEN-SWP-023. Environment Canada: when thunder roars, go indoors. Wait 30 minutes after the last rumble.",
      people: [
        "Operator",
        "Rigger and tag-line hands",
        "Signalperson",
        "Anyone who can touch the crane or the load",
        "Anyone under the boom",
      ],
      swpHref: "/safety/swp/weather-and-wind",
      swpLabel: "SWP — WEATHER AND WIND →",
      residual:
        "Lightning still strikes after the rain stops. Residual is a second cell, a crane used as a rod, or a restart after a hit. Held by the 30-minute clock and by 14.16.1 — not by blue sky.",
      stop: [
        "Thunder heard or lightning seen",
        "Wind at or above the lower of manufacturer and plan",
        "Tower anemometer unread or dead (14.92)",
        "Visibility gone and no radio protocol (14.48)",
        "Anyone treating 30-second flash-to-bang as permission to finish the pick",
        "Strike or suspected strike without an engineer",
      ],
      references: LIGHTNING_REFS,
      rows: [
        {
          task: "Watch the sky",
          level: "high",
          hazard: "Forecast ignored. Dark cell treated as rain.",
          risk: "Storm arrives with a load in the air and no time to land.",
          control: "Forecast before the shift. Named abort. Leave time to land and get down. Act s. 21.",
        },
        {
          task: "Thunder / lightning",
          level: "extreme",
          hazard: "Crane as a rod. People on the machine, on the load, or counting to 30.",
          risk: "Direct strike, side flash, ground current. Fatal.",
          control: "Thunder = stop. Land. Manufacturer shutdown. Shelter in a building or hard-top vehicle. ECCC and CCOHS. Do not wait for 30 seconds of flash-to-bang.",
        },
        {
          task: "Touching the crane",
          level: "extreme",
          hazard: "Hands on the crane, the line or the load during thunder",
          risk: "Current through the person. Fatal.",
          control: "Nobody touches it. If the operator cannot get down: stay in the cab, hands off metal. Ground crew clear.",
        },
        {
          task: "Wind",
          level: "high",
          hazard: "Sail load, gust over the number, no anemometer",
          risk: "Side-load, overturn, lost load. Tower: 14.92.",
          control: "Lower number wins. Tower: 50 km/h if the OEM is silent, or less if the load cannot be handled safely.",
        },
        {
          task: "Resume",
          level: "high",
          hazard: "Back on the hook when the rain stops. Struck crane restarted to check the LMI.",
          risk: "Second cell. Hidden damage. Collapse or control failure.",
          control: "30 minutes after last rumble. Then inspect. Strike: 14.16.1 engineer. Electrical hit: owner / Technical Safety BC electrical — not a restart under this procedure.",
        },
      ],
    }
  ),
];

export function getJha(slug: string) {
  return JHAS.find((item) => item.slug === slug);
}
