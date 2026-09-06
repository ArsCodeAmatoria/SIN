import type { Policy } from "./types";

export const POLICIES: Policy[] = [
  {
    slug: "health-and-safety",
    title: "OH&S POLICY",
    number: "PROVEN-POL-001",
    summary:
      "This is the occupational health and safety policy for this program. The work is done to this program, to the law, and to the machine.",
    statements: [
      {
        title: "Aims",
        body: "Prevent injury and occupational disease on crane and rigging work done to this program. Competent people on the machine. Back stop-work. Keep this program public so anyone on the lift can read it before the gate. OHS Regulation 3.3(a).",
      },
      {
        title: "Commitment",
        body: "This program names the instruction, supervision and backing. Production does not outrank the chart, the hitch, or the three rights.",
      },
      {
        title: "Objectives",
        body: "Every lift has a named competent person and a plan. Defects that affect lifting take the crane down the same hour. Incidents and near misses are reported the same shift. This program is reviewed at least annually.",
      },
      {
        title: "Scope",
        body: "Applies to every crane operator, rigger, signalperson and lifting supervisor working to this program, and to every lift done under it.",
      },
      {
        title: "Standard",
        body: "Work is performed to Proven, applicable OHS law, CSA Z150 / Z248 as named, ASME B30 as named, the manufacturer, and the site. The stricter applicable requirement wins. Law always wins.",
      },
      {
        title: "Review",
        body: "This policy and this program are reviewed at least annually, and after a serious incident or a change in the named law. Next scheduled review 2027-09-01. The current version is the one on this site.",
      },
      {
        title: "Open book",
        body: "This program is public. It does not expire behind a form. Workers and clients can read it before the lift.",
      },
    ],
  },
  {
    slug: "competency",
    title: "COMPETENCY",
    number: "PROVEN-POL-002",
    summary:
      "A ticket is not competency. This program names what the person must hold for the machine, the lift and the site.",
    statements: [
      {
        title: "Verify before the lift",
        body: "Qualifications, experience and practical competency are checked against the work. Expired means that person does not take the role.",
      },
      {
        title: "Fit to the job",
        body: "A mobile operator is not a tower operator by default. A structural rigger is not a plant rigger by default. The closest body is not a match.",
      },
      {
        title: "Already qualified",
        body: "Workers arrive already qualified for the role. Site orientations are arranged. A missing qualification is named before the lift.",
      },
    ],
  },
  {
    slug: "training",
    title: "TRAINING",
    number: "PROVEN-POL-003",
    summary:
      "Site orientations and briefings are arranged. Workers hold the qualification for the role before they start.",
    statements: [
      {
        title: "Before the gate",
        body: "Workers are briefed on this program and the known scope. Site orientations required by the client are completed before the hook is loaded.",
      },
      {
        title: "Young or new worker",
        body: "A young worker is under 25. A new worker is new to that workplace, returning to changed hazards, or relocated to different hazards. 3.22. Before they begin, they get the orientation topics in 3.23 — supervisor name, rights including refusal, rules, hazards, working alone, violence, PPE, first aid, emergency, the task, this program, WHMIS as it applies, committee or worker-rep contact. Extra orientation if they cannot do the work safely or they ask. 3.24. Record it. 3.25. PROVEN-FRM-015.",
      },
      {
        title: "Site orientation",
        body: "The host’s site orientation is the host’s. The supervisor or the employer at the workplace arranges it. The worker does not start the lift without it when the site requires it.",
      },
      {
        title: "Supervisor instruction",
        body: "People who supervise a lift are instructed in this program, in stop-work, and in the supervisor duties under the Workers Compensation Act s. 23. A ticket is not that instruction.",
      },
      {
        title: "Refresher",
        body: "Competency is re-checked when the machine class changes, after a serious incident involving that person, or when observation says the work is not being done to this program. Expired tickets mean that person does not take the role.",
      },
      {
        title: "Records",
        body: "Training, orientations and competency assessments are recorded. Keep them with the worker file.",
      },
      {
        title: "Gap",
        body: "A worker who needs a new qualification does not take that role until they hold it.",
      },
    ],
  },
  {
    slug: "hazard-identification",
    title: "HAZARD IDENTIFICATION",
    number: "PROVEN-POL-004",
    summary:
      "Name the hazards of this lift, this site, this day. A parking-lot form is not identification.",
    statements: [
      {
        title: "Walk the path",
        body: "Pick, set, swing, travel, overhead lines, ground, other cranes, public, other trades.",
      },
      {
        title: "Name it",
        body: "Load unknowns, wind, energy, height, communication, fatigue, proximity to people. Unnamed hazards are uncontrolled hazards.",
      },
      {
        title: "When it changes",
        body: "New load, new weather, new trades in the zone — identification starts again.",
      },
    ],
  },
  {
    slug: "risk-assessment",
    title: "RISK ASSESSMENT",
    number: "PROVEN-POL-005",
    summary:
      "Every lift requires a hazard assessment. FLHA at the shift. Reassess when the work changes.",
    statements: [
      {
        title: "Controls before the hook",
        body: "Exclusion zone, mats, tag lines, spotters, PPE, engineered plan if required, written stop criteria.",
      },
      {
        title: "FLHA",
        body: "Field level hazard assessment at the start of the shift and when the work changes. Not a signature collection.",
      },
      {
        title: "Stop criteria",
        body: "Unknown weight, bad ground, wind out of plan, lines inside MAD, lost signal, incompetent role — the lift does not proceed.",
      },
    ],
  },
  {
    slug: "incident-reporting",
    title: "INCIDENT REPORTING",
    number: "PROVEN-POL-006",
    summary:
      "Injuries, dropped loads, crane contact, failed rigging and stop-work events are reported. Quiet is not always safe.",
    statements: [
      {
        title: "Report it",
        body: "Any injury, any equipment or property damage, any event that required the lift to stop for safety. Immediate for serious events.",
      },
      {
        title: "No punishment for good faith",
        body: "Workers are not punished for reporting in good faith. They are held accountable for lying or continuing after a stop criterion.",
      },
      {
        title: "Learn",
        body: "The employer at the workplace investigates events involving the crew. Controls change. This program is updated when the lesson is real. Injuries also follow Injury Management and Return to Work.",
      },
    ],
  },
  {
    slug: "near-miss-reporting",
    title: "NEAR-MISS REPORTING",
    number: "PROVEN-POL-007",
    summary:
      "Someone in the zone, a lost signal that almost mattered, a sling that started to cut — that is a report, not a story for later.",
    statements: [
      {
        title: "What counts",
        body: "Anything that could have injured a person, dropped a load, or contacted plant, lines or the public — and did not, this time.",
      },
      {
        title: "Same day",
        body: "Report before leaving the shift. A near miss that waits until Monday is a rumour.",
      },
      {
        title: "Competence",
        body: "Reporting a near miss is competence. Hiding one is how the next crew inherits it.",
      },
    ],
  },
  {
    slug: "right-to-refuse",
    title: "RIGHT TO REFUSE UNSAFE WORK",
    number: "PROVEN-POL-008",
    summary:
      "The three rights are operating procedure. A replacement is not sent to do the same unsafe work.",
    statements: [
      {
        title: "Stop",
        body: "If you have reasonable cause to believe the work is dangerous to you or another person, you stop. You do not need permission.",
      },
      {
        title: "Say why",
        body: "State the danger to the supervisor and to the employer at the workplace. Be specific: the line, the ground, the load, the missing plan.",
      },
      {
        title: "It stays stopped",
        body: "Work resumes when the danger is controlled. A good-faith refusal is not punished. A replacement is not sent into the same uncontrolled condition.",
      },
    ],
  },
  {
    slug: "violence-and-harassment",
    title: "VIOLENCE / HARASSMENT",
    number: "PROVEN-POL-009",
    summary:
      "Threats and physical violence are not part of a lift. Harassment is PROVEN-POL-017. Report them. They are acted on. OHS Regulation Part 4.",
    statements: [
      {
        title: "Zero for violence",
        body: "Physical violence, threats and intimidation toward a worker — or by a worker — are reported and acted on. Immediate danger: get out and call for help.",
      },
      {
        title: "The lift is not an excuse",
        body: "Yelling a stop is communication. A threat is not. The brief can be blunt. It cannot be violent.",
      },
      {
        title: "Bullying and harassment",
        body: "Humiliation, racism, sexual harassment and “that’s just the trade” are covered by PROVEN-POL-017 Bullying and Harassment — Workers Compensation Act s. 21, WorkSafeBC P2-21-2.",
      },
    ],
  },
  {
    slug: "ppe",
    title: "PPE",
    number: "PROVEN-POL-010",
    summary:
      "Minimum PPE for lifting work. Site rules that are stricter win. Damaged PPE is out of service.",
    statements: [
      {
        title: "Minimum",
        body: "Hard hat, CSA footwear, high-visibility clothing, eye protection. Gloves, hearing protection and fall protection as the task requires.",
      },
      {
        title: "Selection",
        body: "PPE follows the hazard on this lift — not a one-box kit for every site. Fall protection where the work exposes a fall. Hearing protection where noise requires it. Site rules that are stricter win.",
      },
      {
        title: "Inspect",
        body: "PPE is inspected before use. Cracked hats, dead lanyards and homemade alterations are out of service.",
      },
      {
        title: "Issue and replace",
        body: "The employer or the supervisor issues or confirms required PPE for the lift. Failed PPE is replaced or the worker does not start. Record issue and replacement on PROVEN-FRM-018. Workers do not start the lift waiting on a hat.",
      },
      {
        title: "Instruction",
        body: "Workers are shown how to use, inspect and store the PPE this lift requires — including fall-arrest connection if they will tie off. A issued harness is not instruction.",
      },
    ],
  },
  {
    slug: "crane-operations",
    title: "CRANE OPERATIONS",
    number: "PROVEN-POL-011",
    summary:
      "The chart is the law of the machine. No lift without a plan. No unclear signal.",
    statements: [
      {
        title: "Chart and configuration",
        body: "Operators run the crane they will operate, in the configuration the chart requires. Counterweight, boom, jib, software — as written.",
      },
      {
        title: "Ground and setup",
        body: "Outriggers, mats, level, and supporting surface as the manufacturer and the plan require. Scrap lumber is not engineering.",
      },
      {
        title: "Stop",
        body: "Unclear signal, unknown load, wind out of plan, lines inside MAD — the crane does not come on load.",
      },
    ],
  },
  {
    slug: "rigging",
    title: "RIGGING",
    number: "PROVEN-POL-012",
    summary:
      "Know the load. Know the hitch. Protect the sling. No people under the load.",
    statements: [
      {
        title: "Rated gear",
        body: "Slings and hardware are identified, inspected and used within WLL, including angle and hitch derates. ASME B30.9 as named in Part 15.",
      },
      {
        title: "No guess",
        body: "Weight and centre of gravity are confirmed. Sling angle is calculated when it matters. Below 30° from horizontal is not a hitch this program allows unless an engineer owns the numbers.",
      },
      {
        title: "Out of service",
        body: "Damaged rigging is tagged, isolated and reported. No “one more lift.”",
      },
    ],
  },
  {
    slug: "equipment-inspection",
    title: "EQUIPMENT INSPECTION",
    number: "PROVEN-POL-013",
    summary:
      "Pre-use inspection of the crane as assigned, and of every sling and piece of hardware before it takes load.",
    statements: [
      {
        title: "Crane",
        body: "Operator inspection each shift as the manufacturer, the named 14.2 standard, and Part 14 require. Defects that affect lifting keep the crane down. Tower, hammerhead, luffing jib and self-erecting machines: see Inspections — OEM charts and PROVEN-FRM-027 through 031.",
      },
      {
        title: "Rigging",
        body: "Inspect before use. Missing tags, cuts, birdcaging, opened hooks, wrong pins — out of service.",
      },
      {
        title: "Who owns the PM",
        body: "Preventive maintenance of a crane belongs to the owner of that crane — OEM interval, logbook, annual certification. If the crew does not own the machine, the operator still completes pre-use and reports defects. The crane does not lift with a known defect that affects lifting.",
      },
      {
        title: "Gear on the lift",
        body: "Rigging, PPE, tools and vehicles used on the lift are inspected, maintained and taken out of service when they fail. Weekly and monthly maintenance forms apply to machines the crew is assigned to maintain. Return to service only after the repair is verified.",
      },
      {
        title: "Deficiency class",
        body: "Immediate / out of service — anything that affects lifting, access, or a safety device. Before next shift — does not affect this lift, will affect the next. Scheduled — with a named person and a date. Immediate findings are not parked on a list.",
      },
      {
        title: "Records",
        body: "Inspections are recorded. Findings get an action, an owner and a due date. See Inspections and Corrective Actions.",
      },
    ],
  },
  {
    slug: "environmental-conditions",
    title: "ENVIRONMENTAL CONDITIONS",
    number: "PROVEN-POL-014",
    summary:
      "Wind, lightning, ice, heat and visibility are stop criteria, not atmosphere.",
    download: {
      href: "https://www.bccsa.ca/resources.php?id_catalogue=84",
      label: "BCCSA HEAT STRESS AND SUN SAFETY →",
      note: "BCCSA heat ECP, managing heat at work, and sun-safety ECP. Sign in on bccsa.ca to download the PDFs. Use them. They do not replace this policy. Wildfire smoke sits in the same outdoor-exposure problem — BCCSA catalogue Fire Safety and Wildfire Smoke.",
      external: true,
    },
    statements: [
      {
        title: "Wind",
        body: "Limits come from the manufacturer and the lift plan. The lower number wins. A “light breeze” is not a number.",
      },
      {
        title: "Lightning and storms",
        body: "Thunder is the stop. Environment Canada: if you hear it, you are in striking distance. Land. Manufacturer shutdown. People off. Shelter 30 minutes after the last rumble. Do not count flash-to-bang to 30 before stopping — ECCC dropped that in 2010. A strike is a misadventure (14.16.1). Technical Safety BC does not write a 30/30 crane rule; earthing of the supply is the owner’s electrical work.",
      },
      {
        title: "Ground and ice",
        body: "Supporting surface, frost, thaw and drainage are part of setup. If the ground cannot hold the crane as configured, it is not a crane job yet.",
      },
      {
        title: "Heat and sun",
        body: "Cabs cook. Steel radiates. Signalpersons and riggers work in the open. Heat and UV are named on the FLHA. Water, shade, rest and stop criteria are set before the hook is loaded. If a worker is going down from heat, the lift is already over. BCCSA wrote the exposure-control guides — do not rewrite them.",
      },
      {
        title: "Cold",
        body: "Cold reduces grip, feeling and judgment. Ice on the crane, the load and the pads is a lifting control. Warm-up, extra layers that still fit the harness, and a stop when the work cannot be done with feeling in the hands. Named on the FLHA.",
      },
      {
        title: "Wildfire smoke",
        body: "Smoke is an exposure, not weather small-talk. If air quality makes the work unsafe — cab or open — stop. The supervisor and the employer at the workplace are told. Resume only when the plan says so.",
      },
    ],
  },
  {
    slug: "emergency-response",
    title: "EMERGENCY RESPONSE",
    number: "PROVEN-POL-015",
    summary:
      "Every lift names how the site calls for help, where to muster, and how to put the crane in a safe condition.",
    download: {
      href: "https://www.bccsa.ca/resources.php?id_catalogue=98",
      label: "BCCSA LONE HOIST OPERATOR RESCUE →",
      note: "BCCSA templates for a construction hoist operator down in the car — ERP, lockout, access options, drill. Sign in on bccsa.ca to download. Fall-arrest rescue is a different pack: BCCSA Working at Heights. Tower-crane high-angle rescue is THARRP — fire departments, not this pack. None of them replace this policy or the site plan.",
      external: true,
    },
    statements: [
      {
        title: "Before work",
        body: "Emergency number, muster, first aid, crane shutdown, fall-rescue if anyone is tied off, high-angle rope rescue for a tower operator, after-hours contact this program names.",
      },
      {
        title: "People first",
        body: "Make it safe. Get care. Hold the scene. Do not become the second event.",
      },
      {
        title: "Power line contact",
        body: "Stay on the crane unless fire or shock forces you off. Nobody approaches. Call the utility. Brief this on any site with overhead lines.",
      },
      {
        title: "Construction hoist operator",
        body: "A hoist car is working alone. The site uses a written rescue procedure before the car runs. BCCSA already wrote the templates. Use them. Do not invent a hoist rescue on the day.",
      },
      {
        title: "Fall arrest",
        body: "Nobody ties off without a rescue plan that can get them down. BCCSA’s fall-protection rescue guide is the construction template. The crane is not the rescue plan unless that operation is permitted and planned. THARRP does not approve fall-protection plans. Part 11 stays the employer’s.",
      },
      {
        title: "THARRP — tower high-angle rescue",
        body: "WorkSafeBC G4.13(3)(a): risk assessment where rescue or evacuation may arise, and written procedures for high-angle work. BCCSA’s Technical High Angle Rope Rescue Program connects construction employers with funded municipal fire departments to write a rope-rescue plan for a tower-crane operator in distress. This program does not run that rescue. The fire department does. A tower operator does not go up until the host or prime can name the plan, the fire department, and how to summon them. If the local department is not THARR-funded, mutual aid or another acceptable means is required — the lift does not invent it. Portal requests: bccsa.ca/tharrp_program.php.",
      },
      {
        title: "Who requests the survey",
        body: "The employer at that workplace requests the crane or site survey in the THARRP Portal — WorkSafeBC account number and legal name. On a host site that is usually the prime or the crane owner. The supervisor or the employer at the workplace confirms the survey and the written agreement exist before the lift. A tower on a high-rise expected past 60 days needs the formal Site Survey & Site Rescue Procedure Review on site. ADM 2.",
      },
    ],
  },
  {
    slug: "continuous-improvement",
    title: "CONTINUOUS IMPROVEMENT",
    number: "PROVEN-POL-016",
    summary:
      "Findings become actions. Actions get owners and dates. Management reviews the system. This program is revised when the lesson is real.",
    statements: [
      {
        title: "Close the loop",
        body: "Finding → action → responsible person → due date → completion → verification. No orphan recommendations.",
      },
      {
        title: "Management review",
        body: "This program requires a periodic management OHS meeting to review safety activities and incident trends and to decide what changes. 3.3(d). At least quarterly, and after a serious incident. Agenda: incidents, inspections, outstanding corrective actions, training, worker concerns and refusals, objectives. PROVEN-FRM-032.",
      },
      {
        title: "Records and statistics",
        body: "Inspection, incident, investigation, training, meeting and first-aid records are kept at least three years, or longer if a claim or order requires it. First aid: 3.19. The information is available to the joint committee or worker health and safety representative, as applicable, and on request to an officer, the union representing the workers, or the workers. 3.3(f).",
      },
      {
        title: "This program",
        body: "Controlled documents show number, revision, effective date, owner, approver and review date. The current version is the one on this site.",
      },
    ],
  },
  {
    slug: "bullying-and-harassment",
    title: "BULLYING AND HARASSMENT",
    number: "PROVEN-POL-017",
    summary:
      "Not acceptable. Not “the trade.” Report it. The employer at the workplace deals with it. WorkSafeBC P2-21-2, P2-22-1, P2-23-2.",
    statements: [
      {
        title: "Policy statement",
        body: "Workplace bullying and harassment is not acceptable or tolerated on a lift, on a host site, or toward a worker. This is the policy statement required of an employer under WorkSafeBC P2-21-2(a). The employer at the workplace does not engage in bullying and harassment of workers or supervisors.",
      },
      {
        title: "What it is",
        body: "Any inappropriate conduct or comment toward a worker that the person knew, or reasonably ought to have known, would humiliate or intimidate that worker. It includes sexual harassment, racism, isolation, sabotage of someone’s work, and “that’s just the trade.” The person can be anyone on the job — a supervisor, a host, another contractor’s crew.",
      },
      {
        title: "What it is not",
        body: "Reasonable action taken to manage the work: correcting an unsafe hitch, stopping a lift, checking competency, holding a person to the chart, or speaking plainly in a brief. Yelling STOP is communication. Humiliating a rigger in front of the crew is not.",
      },
      {
        title: "Scope",
        body: "Applies to every crane operator, rigger, signalperson and lifting supervisor working to this program, and to supervisors. It applies on host sites. A multiple-employer workplace does not cancel the employer’s duty to its workers.",
      },
      {
        title: "The employer",
        body: "Takes all reasonable steps to prevent where possible, or otherwise minimize, workplace bullying and harassment. Workers Compensation Act s. 21. Informs workers of this policy. Trains workers and supervisors to recognize it, report it, and apply these procedures. Reviews this policy and these procedures at least annually — next review 2027-09-01.",
      },
      {
        title: "Supervisors",
        body: "Do not engage in bullying and harassment. Apply this policy. P2-23-2. A supervisor who uses the brief to humiliate is not supervising.",
      },
      {
        title: "Workers",
        body: "Do not engage in bullying and harassment of other workers, supervisors, the employer, or persons acting on behalf of the employer. Report it if you experience it or see it. Apply this policy. P2-22-1.",
      },
      {
        title: "How to report",
        body: "Report as soon as you can. Tell the supervisor or the employer at the workplace. Email info@sin.ae.org with the subject BULLYING AND HARASSMENT, or use Report Bullying or Harassment under Incident Reporting. Say who, when, where, what was said or done, and who saw it. You do not need a form if a call is faster.",
      },
      {
        title: "If the alleged person is the supervisor or the employer",
        body: "If the alleged bully is your supervisor or a person acting for the employer, do not report only to that person. Report to the employer at the workplace, or email info@sin.ae.org. If the alleged person is the employer itself and you cannot use the internal route, call the WorkSafeBC Prevention Information Line: 1 888 621 7233.",
      },
      {
        title: "How it is dealt with",
        body: "The employer at the workplace, or a person who is not the alleged bully, investigates promptly and fairly. The investigation covers what happened, who was involved, when and where, witnesses, and any record. The people involved are heard. Confidentiality is kept as far as the investigation allows. Follow-up includes corrective action and a timeline. Records are kept by the employer at the workplace. They are not sent to WorkSafeBC unless asked for.",
      },
      {
        title: "No punishment for good faith",
        body: "Workers are not punished for reporting in good faith, for being a witness, or for refusing to join in. A false report made to injure someone is a separate matter.",
      },
      {
        title: "Immediate danger",
        body: "If you are in immediate danger, get out and call for help. This policy does not ask you to stay in a cab, a zone, or a parking lot to be abused.",
      },
    ],
  },
  {
    slug: "workplace-conduct",
    title: "WORKPLACE CONDUCT",
    number: "PROVEN-POL-018",
    summary:
      "You are a guest on a host site. Show up. Be competent. Do not make the lift about you.",
    statements: [
      {
        title: "On the lift",
        body: "Workers arrive on time, briefed, and fit for the work. If you cannot make the lift, the supervisor hears it first — not the gate.",
      },
      {
        title: "On the host site",
        body: "Follow this program and the site’s rules — whichever is stricter. You are a guest with a job. You are not the prime contractor.",
      },
      {
        title: "The brief",
        body: "The brief can be blunt. It cannot be abusive, violent, or a joke at someone’s expense. See Violence, Bullying and Harassment, and Discrimination.",
      },
      {
        title: "The work",
        body: "No fighting. No theft. No vandalism. A phone does not run a crane. Photographs of a client’s plant or people are not posted unless the site has said so.",
      },
      {
        title: "Report it",
        body: "Hazards, near misses, incidents, damaged gear and unfit-for-work are reported the same shift. Silence is not a rule.",
      },
      {
        title: "PPE",
        body: "Minimum PPE in POL-010 is a rule on every lift. Site PPE that is stricter wins.",
      },
      {
        title: "Who you answer to",
        body: "The host owns the site. The employer of each worker remains that worker’s employer. Site direction that is unsafe is refused under the three rights. Site direction that is lawful and stricter than this program is followed.",
      },
    ],
  },
  {
    slug: "fitness-for-work",
    title: "FITNESS FOR WORK",
    number: "PROVEN-POL-019",
    summary:
      "Fit for this lift, today. Fatigue, illness and injury are named before the gate — not after the hook.",
    statements: [
      {
        title: "This shift",
        body: "A crane operator, rigger or signalperson must be able to do this work safely today. Rest, illness, injury, vision and hearing as the role requires. If you are not fit, you say so before you travel or before you start.",
      },
      {
        title: "Tell the supervisor",
        body: "OHS Regulation 4.19. A worker with an impairment that may affect safe work informs the supervisor or employer and does not knowingly do work where that impairment creates an undue risk to anyone.",
      },
      {
        title: "Unfit is not assigned",
        body: "A person who is not fit is not put onto a crane, a hitch, or a set of signals. A replacement is found, or the lift waits. Covering with hope is not a lift.",
      },
      {
        title: "Medical information",
        body: "The employer asks only what is needed to match the person to the work and to accommodate where the law requires it. It is not a fishing trip. See Impairment and Return to Work.",
      },
    ],
  },
  {
    slug: "impairment",
    title: "IMPAIRMENT",
    number: "PROVEN-POL-020",
    summary:
      "Unfit to lift is unfit to lift. Alcohol, cannabis, other drugs, medication and fatigue. OHS Regulation 4.19 and 4.20.",
    statements: [
      {
        title: "The rule",
        body: "A person must not enter or remain at a workplace while their ability to work is affected by alcohol, a drug or another substance so as to endanger anyone. The employer must not knowingly permit it. 4.20. Crane operation, rigging and signalling are safety-sensitive. There is no ‘a little bit’ on a hook.",
      },
      {
        title: "What counts",
        body: "Alcohol. Cannabis — legal possession is not permission to operate impaired. Illegal drugs. Prescription and over-the-counter medication that affects the work. Fatigue and illness. If it makes you unfit to run the machine, make the hitch, or hold the zone, it is impairment.",
      },
      {
        title: "Report it",
        body: "Workers report impairment to the supervisor or the employer at the workplace before they attend, start, or continue. Observed impairment is treated the same as reported impairment. The person comes off the lift. They are not left in the cab to ‘sleep it off.’",
      },
      {
        title: "Testing",
        body: "This program does not run random drug or alcohol testing as a default. Testing happens only where the law allows and the situation requires it. Host or prime-contractor programs that are lawful are followed for that site. A test is not a substitute for taking an impaired person off the work.",
      },
      {
        title: "Disability",
        body: "Addiction and other disabilities are protected under the Human Rights Code. The employer accommodates to the point of undue hardship when it is told. Accommodation is not a licence to lift impaired. See Discrimination and Fitness for Work.",
      },
    ],
  },
  {
    slug: "working-alone",
    title: "WORKING ALONE",
    number: "PROVEN-POL-021",
    summary:
      "A lift is not a one-person job. If assistance would not be readily available, there is a written check-in. 4.21–4.23.",
    statements: [
      {
        title: "No solo lift",
        body: "A worker is not assigned to make a lift alone. Operator, rigger and signals are a crew. If the site will leave one person to lift, the work does not start.",
      },
      {
        title: "When this policy applies",
        body: "Working alone or in isolation means assistance would not be readily available in an emergency, injury or illness. Visual or verbal contact with other people is readily available. A phone or radio is not. Travel, waiting on a machine, a remote plant, night work, or a crew that left can put a worker in isolation even when the lift itself was crewed.",
      },
      {
        title: "Before that work",
        body: "Hazards are identified. A written procedure is set: who checks in, how, and how often — matching the risk. The worker is trained on it. If the site cannot support that, the work does not start.",
      },
      {
        title: "Check-in",
        body: "A named person on site or named in this procedure receives the check-in at the set times. Missed check-in is not a voicemail. The designated person calls, then escalates, then sends help or emergency services. A spouse is not the check-in system.",
      },
      {
        title: "Say it",
        body: "If you will be out of visual and verbal contact, you tell the supervisor before the hook. The check-in is set or the work does not start.",
      },
    ],
  },
  {
    slug: "injury-management",
    title: "INJURY MANAGEMENT",
    number: "PROVEN-POL-022",
    summary:
      "First aid first. Report it. Care, not a cover-up. The claim is not a rumour.",
    download: {
      href: "/downloads/injury-management.zip",
      label: "DOWNLOAD INJURY MANAGEMENT PACK →",
      note: "BCCSA employer guide, employee bulletin, sample forms and supplementary materials. Use them. Do not replace PROVEN-POL-022.",
    },
    statements: [
      {
        title: "Care",
        body: "Injured people get first aid and further care as required. Make the lift safe. Do not become the second event. Site first aid and the supervisor are both told.",
      },
      {
        title: "Report",
        body: "Injuries are reported the same shift — including what someone calls nothing. First aid report PROVEN-FRM-012. Incident report as required. WorkSafeBC is notified as the law requires. Hiding an injury to finish a pick is how it becomes a worse injury.",
      },
      {
        title: "Stay at work",
        body: "A worker stays on shift only if the remaining work is safe given the injury. Sitting in a cab in pain is not modified work. See Return to Work.",
      },
      {
        title: "Cooperate",
        body: "The employer, the worker and the host cooperate on treatment, reporting and suitable duties. The file is not a defence brief. It is how the person gets care and the work gets safer. The downloadable pack on this page is BCCSA injury-management material — guides, sample forms, supplementary notes. Use it. It does not replace this policy.",
      },
    ],
  },
  {
    slug: "return-to-work",
    title: "RETURN TO WORK",
    number: "PROVEN-POL-023",
    summary:
      "Restrictions named. Work matched. Not a paper promise. Workers Compensation Act duty to maintain employment where it applies.",
    statements: [
      {
        title: "Suitable work",
        body: "Return-to-work is work the person can do within named restrictions. An operator, rigger or signalperson is not put into a role that violates those restrictions. The form is PROVEN-FRM-RTW.",
      },
      {
        title: "Plan",
        body: "Restrictions, duties, hours, review date, and who owns the plan. Gradual return if that is what the restriction requires. A signature without duties is not a plan.",
      },
      {
        title: "Duty",
        body: "Where the Workers Compensation Act duty to maintain employment applies, the employer maintains employment and offers suitable or pre-injury work to the point of undue hardship. Inconvenience is not undue hardship.",
      },
      {
        title: "Cooperate",
        body: "The worker, the employer, the clinician and WorkSafeBC share what is needed to match the work. Medical detail beyond the restriction is not a gossip file. See Fitness for Work and Injury Management.",
      },
    ],
  },
  {
    slug: "discrimination",
    title: "DISCRIMINATION",
    number: "PROVEN-POL-024",
    summary:
      "Assignment to a lift is about the work. Human Rights Code s. 13. Not a vibe, and not a pretext.",
    statements: [
      {
        title: "The Code",
        body: "The employer does not refuse to employ, refuse to continue to employ, or discriminate in any term of employment — including who is assigned to the lift — because of Indigenous identity, race, colour, ancestry, place of origin, political belief, religion, marital status, family status, physical or mental disability, sex, sexual orientation, gender identity or expression, age, or a conviction unrelated to the work. Human Rights Code s. 13. The employer does not refuse to assign a person for those reasons.",
      },
      {
        title: "This work",
        body: "Matching a person to a class of crane, a hitch, or a set of signals is a bona fide occupational requirement when it is real. A ticket, this machine, this site. It is not a pretext for a protected ground. ‘Not the right fit’ without the work named is not a reason.",
      },
      {
        title: "Accommodate",
        body: "The employer accommodates protected characteristics to the point of undue hardship. Accommodation does not put an impaired or restricted person onto a hook that the restriction forbids. See Fitness for Work, Impairment and Return to Work.",
      },
      {
        title: "Report",
        body: "Report to the supervisor or the employer at the workplace, or email info@sin.ae.org. If the alleged person is the supervisor or the employer, use that route anyway and name it. A complaint may also be filed with the BC Human Rights Tribunal. Bullying and harassment under WorkSafeBC is a separate file — PROVEN-POL-017 — and both can apply.",
      },
    ],
  },
  {
    slug: "first-aid",
    title: "FIRST AID",
    number: "PROVEN-POL-025",
    summary:
      "First aid follows the workplace. On a host site that is usually the host. On a workplace the employer controls, that employer does the assessment.",
    statements: [
      {
        title: "Which workplace",
        body: "OHS Regulation Part 3 Division 4 and Schedule 3-A set first aid by workplace — hazard rating, number of workers, surface travel time. They are not the same at every lift.",
      },
      {
        title: "Client / host site",
        body: "On a host construction or industrial site, first aid is the host’s or the prime contractor’s. Before work, the crew knows where it is, who the attendant is, and how to summon it. That goes on the FLHA. PROVEN-FRM-012 is still completed for a worker on the lift.",
      },
      {
        title: "Workplace the employer controls",
        body: "If the employer controls the workplace — office, yard, shop — that employer conducts the first-aid assessment, posts it, and provides the equipment, attendants and procedures that assessment requires. Review when the work or the number of workers changes.",
      },
      {
        title: "Records",
        body: "First aid records are kept at least three years. 3.19. They are available as that section requires — not as a lunch-room story.",
      },
    ],
  },
  {
    slug: "joint-committee",
    title: "JOINT COMMITTEE / WORKER REPRESENTATIVE",
    number: "PROVEN-POL-026",
    summary:
      "Committee or worker representative follows the Act for that workplace. It is not a poster this program invents for every site.",
    statements: [
      {
        title: "The threshold",
        body: "Workers Compensation Act Part 2 Division 5. A joint health and safety committee is required at a workplace where 20 or more workers are regularly employed. A worker health and safety representative is required where 9 to 19 workers are regularly employed. Other orders can apply. This is per workplace — not a headcount of everyone who has ever worked to this program.",
      },
      {
        title: "Workplace the employer controls",
        body: "At a workplace the employer regularly employs people and controls, that employer establishes the committee or representative the Act requires. New members get the training in OHS Regulation 3.27. A joint committee is evaluated annually where 3.26 applies.",
      },
      {
        title: "Client / host site",
        body: "Workers on a host site participate in that workplace’s committee or representative system as the host and the Act require. The employer of each worker remains that worker’s employer. A multiple-employer workplace does not erase that.",
      },
      {
        title: "Below the threshold",
        body: "If an employer-controlled workplace is below the committee and representative thresholds, 3.2 still requires regular monthly meetings with workers on health and safety, and a record of what was discussed. PROVEN-FRM-033.",
      },
      {
        title: "Recommendations",
        body: "Written recommendations from a committee or representative get a written response as the Act requires. They enter the corrective-action log. They are not ignored.",
      },
    ],
  },
  {
    slug: "contractors",
    title: "CONTRACTORS AND MULTI-EMPLOYER SITES",
    number: "PROVEN-POL-027",
    summary:
      "The contractor brings the crew and this program. The host owns the site. The prime contractor owns coordination where the Act requires one. Subcontractors are selected and watched.",
    statements: [
      {
        title: "The contractor",
        body: "Brings competent people, this program, and stop-work. Does not own the host’s site. Does not become the prime contractor by showing up with a crew.",
      },
      {
        title: "Workers",
        body: "Work to this program and to site rules — whichever is stricter. Report to the supervisor and to site supervision. Refuse unsafe work.",
      },
      {
        title: "Host employer / client",
        body: "Controls the workplace: access, other trades, ground, overhead hazards, site rules, first aid and the site emergency plan. Gives accurate load and machine information. Names the prime contractor when the workplace requires one.",
      },
      {
        title: "Site supervisor",
        body: "When lift supervision is provided under this program, that person owns whether the hook moves. They do not own the entire site.",
      },
      {
        title: "Prime contractor",
        body: "On a multiple-employer workplace the Act requires a prime contractor to coordinate. The supervisor or the contractor asks who that is before the crew starts. If nobody can name them, that is a hazard. It is named. The lift waits until coordination is real.",
      },
      {
        title: "Subcontractors",
        body: "If another company is hired — a rigger shop, a signal crew, a carrier — selection includes their ability to identify, communicate and control hazards that affect their people, the crew, and anyone else. They get this program and the host’s rules. The work they were hired for is monitored. A certificate is not a substitute for watching the hitch.",
      },
      {
        title: "Orientation and communication",
        body: "Host orientation is completed as the site requires. The crew shares what the host needs: FLHA, inspections, incidents involving the crew. The host shares what the crew needs: known hazards, other cranes, lines, first aid, muster.",
      },
    ],
  },
  {
    slug: "occupational-health",
    title: "OCCUPATIONAL HEALTH",
    number: "PROVEN-POL-028",
    summary:
      "Noise, MSI, heat, cold, WHMIS and smoke as they actually hit crane and rigging work. Not a silica program this work does not include.",
    statements: [
      {
        title: "What this covers",
        body: "Hazards that show up on crane and rigging work: noise at the machine and in the cab, musculoskeletal injury from sitting a crane or handling gear, heat and cold, hazardous products actually used on the lift, wildfire smoke. Silica, asbestos and confined-space programs are not added because they are not the work. If a lift actually includes that exposure, it is named on the FLHA and the host’s procedure is followed — or the work does not start.",
      },
      {
        title: "Noise",
        body: "Hearing protection where the work requires it. Cab doors and windows used as they were designed. If a worker cannot hear a radio or a shouted STOP, the control failed — change the method, not the volume of the brief.",
      },
      {
        title: "MSI / ergonomics",
        body: "Part 4 musculoskeletal injury. Operators: seat, mirrors, access, not twisting for a whole shift to see a blind pick. Riggers: block the piece before the hitch, do not become the tag line, do not muscle a load that needs a different hitch. Report pain the same shift. It is an occupational health report, not toughness.",
      },
      {
        title: "Hazardous products",
        body: "WHMIS for products workers use — diesel, hydraulic oil, grease, rope dressing. SDS library 18. The host’s products stay on the host’s SDS.",
      },
      {
        title: "Heat, cold, smoke",
        body: "POL-014. Named on the FLHA. Stop criteria are numbers and symptoms, not atmosphere.",
      },
    ],
  },
];

export function getPolicy(slug: string) {
  return POLICIES.find((item) => item.slug === slug);
}
