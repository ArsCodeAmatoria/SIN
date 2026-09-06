import type { WireArticle } from "@/lib/whoopwire";

/**
 * THE WIRE stories.
 *
 * To publish a story: copy an object in this array, give it a unique slug,
 * and set featured: true on at most one story. Optional fields: updated,
 * image, imageAlt. Related slugs must exist. Safety slugs map to /safety/[slug].
 */
export const ARTICLES: WireArticle[] = [
  {
    slug: "the-hardest-questions-on-the-tower-crane-red-seal-exam",
    title: "THE HARDEST RED SEAL QUESTIONS.",
    titleLines: ["THE HARDEST", "RED SEAL", "QUESTIONS."],
    category: "CRANES",
    excerpt:
      "Memorizing definitions is not enough. The difficult Tower Crane Red Seal questions give you several answers that appear correct — and ask you to find the limiting factor.",
    author: "Kojin Fox",
    published: "2026-09-05",
    updated: "2026-09-05",
    seoTitle: "The Hardest Questions on the Tower Crane Red Seal Exam",
    seoDescription:
      "The hardest Tower Crane Red Seal questions aren’t math. Several answers look right. The exam tests whether you can find the limiting factor — capacity, configuration, rigging, conditions and procedure.",
    related: [
      "tower-crane-climbing-sequence",
      "six-things-to-check-before-you-take-the-load",
      "sling-tension-is-sin",
    ],
    safety: ["crane-operations", "rigging", "training-competency"],
    sources: [
      {
        name: "Red Seal Occupational Standard — Tower Crane Operator (2023)",
        href: "https://www.red-seal.ca/eng/trades/tower-crane-op.shtml",
      },
      {
        name: "SkilledTradesBC — Tower Crane Operator",
        href: "https://skilledtradesbc.ca/tower-crane-operator",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "If you are preparing for the Tower Crane Operator Red Seal exam, memorizing definitions is not enough.",
      },
      {
        type: "p",
        text: "The difficult questions are the ones that give you several answers that appear correct and require you to determine which is best based on crane capacity, configuration, rigging, operating conditions, manufacturer requirements and safe operating procedure.",
      },
      {
        type: "p",
        text: "The actual Red Seal examination questions are confidential. However, the Red Seal Occupational Standard tells us the competencies candidates are expected to know.",
      },
      {
        type: "p",
        text: "Based on those competencies, these are some of the areas where candidates should expect the greatest challenge.",
      },
      {
        type: "h",
        text: "1. LOAD CHARTS AND CRANE CAPACITY",
      },
      {
        type: "p",
        text: "Reading a capacity directly from a load chart is the easy part.",
      },
      {
        type: "p",
        text: "The harder questions require you to determine whether that capacity actually applies.",
      },
      {
        type: "p",
        text: "You may need to consider:",
      },
      {
        type: "list",
        items: [
          "Actual operating radius",
          "Jib length and crane configuration",
          "Parts of line",
          "Maximum permissible line pull",
          "Gross versus net capacity",
          "Hook block and rigging weight",
          "Load-line weight",
          "Structural limitations",
          "Hoist limitations",
          "Crane deflection",
          "Changing radius after the load is picked",
        ],
      },
      {
        type: "p",
        text: "A crane may have enough structural capacity at a particular radius while another limitation prevents the lift.",
      },
      {
        type: "p",
        text: "That is an important Red Seal concept:",
      },
      {
        type: "quote",
        text: "The biggest number on the chart is not necessarily the amount you can lift.",
      },
      {
        type: "p",
        text: "The candidate has to identify the limiting factor.",
      },
      {
        type: "h",
        text: "2. RADIUS AND CRANE DEFLECTION",
      },
      {
        type: "p",
        text: "Tower cranes are not perfectly rigid structures.",
      },
      {
        type: "p",
        text: "When a heavy load is taken, the crane structure can deflect. This can cause the hook to move outward and increase the operating radius.",
      },
      {
        type: "p",
        text: "That matters because tower-crane capacity generally decreases as radius increases.",
      },
      {
        type: "p",
        text: "A difficult exam question may therefore give you a load that appears acceptable at the original radius but then ask what happens as the crane takes the load.",
      },
      {
        type: "p",
        text: "The operator needs to understand the relationship between:",
      },
      {
        type: "quote",
        text: "LOAD → DEFLECTION → INCREASED RADIUS → REDUCED CAPACITY",
      },
      {
        type: "p",
        text: "The Red Seal standard also expects operators to understand compensating for deflection while controlling the load.",
      },
      {
        type: "p",
        text: "This is crane physics, not simply chart reading.",
      },
      {
        type: "h",
        text: "3. MAXIMUM LINE PULL AND REEVING",
      },
      {
        type: "p",
        text: "Another difficult area is understanding the difference between what the crane structure can support and what the hoisting system can actually lift.",
      },
      {
        type: "p",
        text: "Imagine the load chart indicates sufficient structural capacity.",
      },
      {
        type: "p",
        text: "Can you automatically make the lift?",
      },
      {
        type: "p",
        text: "No.",
      },
      {
        type: "p",
        text: "The current reeving, parts of line, hoist configuration and permissible line pull must also support the load.",
      },
      {
        type: "p",
        text: "A question might deliberately provide enough structural capacity while exceeding another limitation.",
      },
      {
        type: "quote",
        text: "The correct answer is determined by the most restrictive applicable limit.",
      },
      {
        type: "h",
        text: "4. RIGGING AND CENTRE OF GRAVITY",
      },
      {
        type: "p",
        text: "Rigging questions become considerably harder when the load is not symmetrical.",
      },
      {
        type: "p",
        text: "Two sling legs do not automatically mean that each leg carries 50% of the load.",
      },
      {
        type: "p",
        text: "Candidates should understand:",
      },
      {
        type: "list",
        items: [
          "Centre of gravity",
          "Load distribution",
          "Sling angles",
          "Hitch configurations",
          "Sling capacity",
          "Hardware capacity",
          "Unequal loading",
          "Pick-point location",
          "Effect of sling angle on tension",
        ],
      },
      {
        type: "p",
        text: "If the centre of gravity is closer to one pick point, the load carried by the sling legs can be unequal.",
      },
      {
        type: "p",
        text: "Then sling angle can increase the tension even further.",
      },
      {
        type: "p",
        text: "A Red Seal candidate needs to understand the forces involved, not just memorize sling capacities.",
      },
      {
        type: "h",
        text: "5. GROSS CAPACITY VS. NET LOAD",
      },
      {
        type: "p",
        text: "This is one of the easiest places to make a mistake.",
      },
      {
        type: "p",
        text: "Suppose a chart indicates that the crane can lift 5,000 kg at the required radius.",
      },
      {
        type: "p",
        text: "That does not necessarily mean you can pick up a 5,000 kg object.",
      },
      {
        type: "p",
        text: "Depending on the manufacturer's load-chart instructions and configuration, deductions may be required for items such as:",
      },
      {
        type: "list",
        items: [
          "Hook block",
          "Slings",
          "Shackles",
          "Lifting beams",
          "Spreader bars",
          "Specialized lifting devices",
          "Other suspended equipment",
        ],
      },
      {
        type: "p",
        text: "The question may give you a capacity that looks adequate until all applicable deductions are considered.",
      },
      {
        type: "p",
        text: "The exam is testing whether you understand what the chart number actually represents.",
      },
      {
        type: "h",
        text: "6. CLIMBING AND RECONFIGURATION",
      },
      {
        type: "p",
        text: "Climbing questions can be difficult because they combine structural knowledge, procedures, communication, weather, configuration and manufacturer requirements.",
      },
      {
        type: "p",
        text: "Candidates should understand both:",
      },
      {
        type: "list",
        items: ["Top climbing", "Bottom climbing"],
      },
      {
        type: "p",
        text: "They should also understand the principles surrounding crane reconfiguration.",
      },
      {
        type: "p",
        text: "Important subjects include:",
      },
      {
        type: "list",
        items: [
          "Manufacturer climbing procedures",
          "Required documentation",
          "Climbing components",
          "Crane balance",
          "Trolley/load position",
          "Structural connections",
          "Supports and collars",
          "Hydraulic climbing systems",
          "Communication",
          "Weather limitations",
          "Tower-section installation",
          "Configuration changes",
          "Required inspections",
          "Safety and limiting systems",
          "Return-to-service requirements",
        ],
      },
      {
        type: "p",
        text: "The most important principle is simple:",
      },
      {
        type: "quote",
        text: "Do not improvise a climbing procedure.",
      },
      {
        type: "p",
        text: "If the manufacturer's required climbing condition cannot be achieved, the answer is not to find a field shortcut.",
      },
      {
        type: "p",
        text: "Stop and determine why.",
      },
      {
        type: "h",
        text: "7. LIMITS AFTER RECONFIGURATION",
      },
      {
        type: "p",
        text: "Changing the physical crane can also change the information the crane's systems need.",
      },
      {
        type: "p",
        text: "After certain configuration changes, applicable systems may need to be correctly configured, adjusted, verified or tested before the crane returns to normal operation.",
      },
      {
        type: "p",
        text: "A difficult question might tell you:",
      },
      {
        type: "p",
        text: "The crane has been successfully climbed. Everything physically appears correct. But the crane's configured information or limiting system does not correspond with the new configuration.",
      },
      {
        type: "p",
        text: "Can you operate at reduced capacity?",
      },
      {
        type: "p",
        text: "The safe answer is not simply:",
      },
      {
        type: "quote",
        text: "Stay under 50%.",
      },
      {
        type: "p",
        text: "An arbitrary reduction does not correct an incorrectly configured safety or limiting system.",
      },
      {
        type: "p",
        text: "The discrepancy needs to be addressed and the required verification completed before normal operation resumes.",
      },
      {
        type: "h",
        text: "8. INSPECTION AND TROUBLESHOOTING",
      },
      {
        type: "p",
        text: "Red Seal questions do not necessarily ask:",
      },
      {
        type: "quote",
        text: "What is a sheave?",
      },
      {
        type: "p",
        text: "A harder question gives you a condition involving the sheave and asks what it means.",
      },
      {
        type: "p",
        text: "Candidates need to understand inspection of:",
      },
      {
        type: "list",
        items: [
          "Wire rope",
          "Sheaves",
          "Drums",
          "Brakes",
          "Pins and connections",
          "Structural members",
          "Hydraulic systems",
          "Electrical systems",
          "Supports",
          "Access systems",
          "Safety devices",
        ],
      },
      {
        type: "p",
        text: "Then comes the difficult part:",
      },
      {
        type: "quote",
        text: "What do you do when something is wrong?",
      },
      {
        type: "p",
        text: "Continue operating? Monitor it? Report it? Adjust it? Remove the equipment from service? Stop the crane?",
      },
      {
        type: "p",
        text: "The ability to make that decision is much more important than simply knowing the name of the component.",
      },
      {
        type: "h",
        text: "9. WIND AND CHANGING SITE CONDITIONS",
      },
      {
        type: "p",
        text: "Wind questions can also be deceptive.",
      },
      {
        type: "p",
        text: "The answer is not always one universal wind-speed number.",
      },
      {
        type: "p",
        text: "The applicable limitation can depend on:",
      },
      {
        type: "list",
        items: [
          "Manufacturer requirements",
          "Crane configuration",
          "Type of operation",
          "Load characteristics",
          "Wind direction",
          "Gusts",
          "Sail area",
          "Site conditions",
        ],
      },
      {
        type: "p",
        text: "A large lightweight panel can behave very differently from a compact load of the same weight.",
      },
      {
        type: "p",
        text: "Candidates should understand that staying below a numerical wind limit does not eliminate the operator's responsibility to assess whether the load can actually be controlled safely.",
      },
      {
        type: "h",
        text: "10. MULTI-CRANE AND SPECIALTY OPERATIONS",
      },
      {
        type: "p",
        text: "The Red Seal standard also includes specialty tower-crane operations.",
      },
      {
        type: "p",
        text: "These can include:",
      },
      {
        type: "list",
        items: [
          "Multi-crane lifts",
          "Operating on multi-crane sites",
          "Personnel hoisting",
        ],
      },
      {
        type: "p",
        text: "These operations introduce additional planning, communication and coordination requirements.",
      },
      {
        type: "p",
        text: "Questions in this area are likely to test whether the candidate recognizes when an operation requires additional controls rather than treating it as an ordinary lift.",
      },
      {
        type: "h",
        text: "WHAT MAKES A RED SEAL QUESTION DIFFICULT?",
      },
      {
        type: "p",
        text: "The hardest questions usually aren't difficult because of complicated mathematics.",
      },
      {
        type: "p",
        text: "They are difficult because several facts must be considered at the same time.",
      },
      {
        type: "p",
        text: "A question might give you:",
      },
      {
        type: "quote",
        text: "Load weight + radius + rigging weight + crane configuration + line pull + changing conditions",
      },
      {
        type: "p",
        text: "Every individual number may look acceptable.",
      },
      {
        type: "p",
        text: "But one condition makes the lift unacceptable.",
      },
      {
        type: "p",
        text: "Your job is to find it.",
      },
      {
        type: "p",
        text: "That is the mindset to develop when studying for the Tower Crane Red Seal examination.",
      },
      {
        type: "p",
        text: "Don't only ask:",
      },
      {
        type: "quote",
        text: "What is the answer?",
      },
      {
        type: "p",
        text: "Ask:",
      },
      {
        type: "quote",
        text: "What is the limiting factor?",
      },
      {
        type: "p",
        text: "And when two answers both seem reasonable, go back to the fundamentals:",
      },
      {
        type: "list",
        items: [
          "Manufacturer requirements",
          "Actual crane configuration",
          "Actual operating radius",
          "Capacity limitations",
          "Rigging forces",
          "Site conditions",
          "Required procedures",
        ],
      },
      {
        type: "p",
        text: "The Red Seal exam is ultimately testing whether you can take technical knowledge and apply it to the decisions a competent Tower Crane Operator is expected to make.",
      },
      {
        type: "p",
        text: "That is why the best preparation isn't memorizing hundreds of answers.",
      },
      {
        type: "quote",
        text: "Learn how the crane works, learn how to read the information you're given, and learn how to identify what controls the operation.",
      },
      {
        type: "cta",
        href: "/redtc",
        label: "Tower Crane Red Seal practice tests →",
      },
      {
        type: "cta",
        href: "/redtc/load-charts",
        label: "Tower crane load chart practice →",
      },
      {
        type: "cta",
        href: "/wire/tower-crane-climbing-sequence",
        label: "Tower crane climbing sequence →",
      },
      {
        type: "cta",
        href: "/safety/crane-operations",
        label: "Crane operations procedures →",
      },
    ],
  },
  {
    slug: "tower-crane-climbing-sequence",
    title: "PREPARE. INSPECT. BRIEF. BALANCE. CLIMB.",
    titleLines: ["PREPARE.", "INSPECT.", "BRIEF.", "BALANCE.", "CLIMB."],
    category: "CRANES",
    excerpt:
      "Climbing is not adding another tower section. It temporarily changes the crane. Prepare, inspect, brief, balance, climb, then verify before the hook moves again.",
    author: "Kojin Fox",
    published: "2026-09-05",
    updated: "2026-09-05",
    seoTitle:
      "Tower Crane Climbing Sequence: Prepare, Inspect, Brief, Balance, Climb",
    seoDescription:
      "Tower crane climbing is not adding another section. Prepare, inspect, brief, balance, climb, then verify. The manufacturer’s sequence is the sequence. Do not improvise the climb.",
    related: [
      "what-part-14-actually-names",
      "six-things-to-check-before-you-take-the-load",
      "what-your-crane-crew-should-know-before-they-arrive",
    ],
    safety: ["crane-operations", "safe-work-procedures", "inspections"],
    sources: [
      {
        name: "WorkSafeBC OHS Regulation Part 14 — Cranes and Hoists",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
      },
      {
        name: "CSA Z248 — Code for tower cranes",
        href: "https://www.csagroup.org/",
      },
      {
        name: "Manufacturer climbing and erection instructions for the serial crane on site",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Tower crane climbing is one of the most specialized operations performed during the life of a tower crane.",
      },
      {
        type: "p",
        text: "Unlike normal lifting, climbing temporarily changes the crane’s structural configuration while tower sections are added, removed or repositioned. The climbing system, the crane structure, the supporting structure, the crew, the weather and the sequence of operations all have to work together exactly as intended.",
      },
      {
        type: "p",
        text: "For that reason, climbing should never be treated as simply “adding another tower section.”",
      },
      {
        type: "quote",
        text: "PREPARE → INSPECT → BRIEF → BALANCE → CLIMB → VERIFY",
      },
      {
        type: "p",
        text: "The exact procedure, limits and sequence must always come from the crane manufacturer’s instructions, applicable engineering documentation and the requirements governing the specific installation.",
      },
      {
        type: "h",
        text: "1. PREPARE",
      },
      {
        type: "p",
        text: "A successful climb begins before anyone operates the climbing system.",
      },
      {
        type: "p",
        text: "The climbing configuration and required documentation should be established in advance. The crew needs to know what configuration is being created, which tower sections and climbing components are being used, what supporting or shoring arrangements are required, and what limitations apply.",
      },
      {
        type: "p",
        text: "Preparation should include confirming that the required manufacturer information, engineering documentation, climbing equipment, tools, communications and qualified personnel are available.",
      },
      {
        type: "p",
        text: "Weather is also part of the planning. Climbing must be performed within the manufacturer’s specified environmental and wind limitations. Gusting winds, lightning, freezing rain, snow, ice, poor visibility or extreme temperatures may make a climb unsafe even when other preparations are complete.",
      },
      {
        type: "quote",
        text: "If the required procedure, configuration or limitations cannot be verified, the climbing operation should not begin.",
      },
      {
        type: "h",
        text: "2. INSPECT",
      },
      {
        type: "p",
        text: "The crane and climbing system must be inspected before climbing begins.",
      },
      {
        type: "p",
        text: "This is more than a general crane inspection. Components directly involved in the climbing operation need particular attention, including the climbing frame or cage, hydraulic equipment, structural connections, tower sections, pins, bolts, supports and other components identified by the manufacturer.",
      },
      {
        type: "p",
        text: "The intended climbing path and supporting structure must also be ready. A component that is damaged, incorrectly installed, incompatible with the intended configuration or otherwise questionable should be resolved before the climb proceeds.",
      },
      {
        type: "p",
        text: "Climbing is not the time to discover that a required component does not fit, or that the actual installation differs from the approved arrangement.",
      },
      {
        type: "h",
        text: "3. BRIEF",
      },
      {
        type: "p",
        text: "Everyone involved in the climb needs to understand the plan before movement begins.",
      },
      {
        type: "p",
        text: "The climbing supervisor should conduct a pre-climb briefing covering the intended sequence, individual responsibilities, communication method, weather limitations, stop-work conditions and emergency considerations.",
      },
      {
        type: "p",
        text: "Communication is particularly important. Depending on the crane and climbing system, crew members may be positioned where they cannot all maintain direct visual contact. The required communication system must remain reliable throughout the operation.",
      },
      {
        type: "p",
        text: "If required communication is lost, the climbing operation should be brought to a safe stop until communication is restored.",
      },
      {
        type: "quote",
        text: "If something does not look, sound or feel right, stop.",
      },
      {
        type: "p",
        text: "Climbing operations should not continue simply because the crew has already started the sequence.",
      },
      {
        type: "h",
        text: "4. BALANCE",
      },
      {
        type: "p",
        text: "Balance is one of the most critical parts of many tower crane climbing procedures.",
      },
      {
        type: "p",
        text: "The crane must be placed in the condition specified by the manufacturer before the climbing movement is performed. Depending on the crane design, this can involve a specified trolley position, load, hook condition, jib orientation or other manufacturer-defined arrangement.",
      },
      {
        type: "p",
        text: "The purpose is to establish the required forces and alignment through the climbing system and tower structure.",
      },
      {
        type: "p",
        text: "Balance should never be based on guesswork, or on a position that “worked on the last crane.” Different models, jib configurations, counterweights, tower arrangements and climbing systems can require different procedures.",
      },
      {
        type: "quote",
        text: "The manufacturer’s balancing procedure controls.",
      },
      {
        type: "p",
        text: "If the crane cannot be placed into the required balanced condition, the crew should stop and determine why rather than attempting to compensate by improvising the climbing sequence.",
      },
      {
        type: "h",
        text: "5. CLIMB",
      },
      {
        type: "p",
        text: "Only after preparation, inspection, briefing and balancing are complete should the physical climbing sequence proceed.",
      },
      {
        type: "p",
        text: "The crew must follow the manufacturer’s specified sequence and remain under the direction of the qualified person responsible for the climbing operation.",
      },
      {
        type: "p",
        text: "During the climb, attention should remain on alignment, structural connections, climbing equipment, hydraulic behaviour, communication and changing environmental conditions.",
      },
      {
        type: "p",
        text: "Unexpected resistance, movement, misalignment, hydraulic problems, abnormal sounds, an unverified connection or any other departure from the expected sequence is a reason to stop and assess the situation.",
      },
      {
        type: "p",
        text: "A climbing sequence should not be changed simply to make the operation faster or easier. If the manufacturer’s procedure does not address the actual condition encountered, the solution may require consultation with the manufacturer or a professional engineer rather than a field modification to the sequence.",
      },
      {
        type: "h",
        text: "6. VERIFY BEFORE RETURNING THE CRANE TO SERVICE",
      },
      {
        type: "p",
        text: "The climbing movement being finished does not automatically mean the crane is ready to resume lifting.",
      },
      {
        type: "p",
        text: "After the climb, the completed crane configuration must be verified. Required structural connections, tower components, climbing equipment and other affected systems should be inspected and confirmed in accordance with the applicable procedure.",
      },
      {
        type: "p",
        text: "Systems affected by the change in crane configuration may also require adjustment, configuration or testing. This can include the crane’s load moment or rated capacity system, operational limiting devices, anti-collision or zoning equipment where applicable, and other safety systems affected by the new crane configuration.",
      },
      {
        type: "p",
        text: "Required inspections, certifications and documentation must also be completed. Only after the required post-climb verification has been completed should the crane be returned to normal lifting operations.",
      },
      {
        type: "h",
        text: "THE SEQUENCE IS DELIBERATE",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "PREPARE",
            body: "Configuration, documentation, equipment, qualified people and weather limits named before anyone operates the climbing system.",
          },
          {
            n: "02",
            title: "INSPECT",
            body: "Climbing frame, hydraulics, connections, tower sections, pins, bolts, supports and the path. Resolve what does not fit before you start.",
          },
          {
            n: "03",
            title: "BRIEF",
            body: "Sequence, responsibilities, communication, weather, stop-work and emergency. If communication is lost, stop.",
          },
          {
            n: "04",
            title: "BALANCE",
            body: "The manufacturer’s balancing procedure. Not the last crane. Not a guess.",
          },
          {
            n: "05",
            title: "CLIMB",
            body: "The specified sequence, under the qualified person. Unexpected resistance, misalignment or an unverified connection is a stop.",
          },
          {
            n: "06",
            title: "VERIFY",
            body: "Configuration, connections, LMI / rated-capacity system, limits, zoning and the paperwork. Then the crane may lift.",
          },
        ],
      },
      {
        type: "p",
        text: "Tower crane climbing is not a procedure that should be learned from a generic checklist or performed from memory alone. Different manufacturers and crane models use different climbing systems, configurations, sequences and limitations.",
      },
      {
        type: "p",
        text: "The manufacturer’s instructions and the engineering requirements for the specific crane installation remain the controlling documents.",
      },
      {
        type: "quote",
        text: "Do not improvise the climb.",
      },
      {
        type: "p",
        text: "If the configuration, procedure, balance condition, structural connection, communication system, weather limitation or post-climb requirement cannot be verified, stop the operation until it can be.",
      },
      {
        type: "p",
        text: "That discipline is what turns a climbing sequence from a series of movements into a controlled crane operation.",
      },
      {
        type: "cta",
        href: "/safety/swp/tower-erection-climbing",
        label: "Tower crane climbing procedure →",
      },
      {
        type: "cta",
        href: "/safety/crane-operations",
        label: "Crane operations procedures →",
      },
      {
        type: "cta",
        href: "/safety/binder/tower",
        label: "Tower crane binder and checklists →",
      },
      {
        type: "cta",
        href: "/tower-crane-level-2-practice-test",
        label: "Tower Crane Level 2 exam practice →",
      },
      {
        type: "cta",
        href: "/redtc",
        label: "Tower Crane Red Seal practice tests →",
      },
    ],
  },
  {
    slug: "height-over-length-is-the-angle",
    title: "HEIGHT OVER LENGTH IS THE ANGLE.",
    titleLines: ["HEIGHT OVER", "LENGTH IS", "THE ANGLE."],
    category: "RIGGING",
    excerpt:
      "You do not need a protractor on the hook. Measure sling length and vertical height. sin θ = H / L. Then you can use the tension formula.",
    author: "Kojin Fox",
    published: "2026-08-18",
    updated: "2026-09-05",
    image: "/wire/rigging-triangle.jpg",
    imageAlt:
      "Rigging triangle: two-leg bridle on a concrete block. Sling length L is the hypotenuse. Vertical height H is opposite θ from the horizontal. sin θ = H / L.",
    imageContain: true,
    seoTitle: "How to Calculate Sling Angle for Rigging | Height ÷ Length — sin()",
    seoDescription:
      "How to find sling angle from the horizontal using sine. Measure height H and sling length L. θ = sin⁻¹(H/L). Worked numbers, the 30° floor, and the tension formula that follows.",
    related: [
      "sling-tension-is-sin",
      "sin-the-height-cos-the-radius",
      "six-things-to-check-before-you-take-the-load",
    ],
    safety: ["rigging", "safe-work-procedures"],
    sources: [
      {
        name: "WorkSafeBC OHS Regulation Part 15 — Rigging",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging",
      },
      {
        name: "ASME B30.9 — Slings",
        href: "https://www.asme.org/",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "A rigger who cannot name the angle will still set one. The sling will still do the math. The way to get θ on the ground is not a guess and not a phone photo of a protractor. Measure two lengths. Divide. Take arcsine.",
      },
      {
        type: "p",
        text: "This is a two-leg bridle. Equal legs. Load hanging plumb. θ is the angle between the sling and the horizontal — the same θ the tension formula uses. It is not the angle between the two legs at the hook.",
      },
      {
        type: "h",
        text: "WHAT YOU MEASURE",
      },
      {
        type: "p",
        text: "L is sling length — along the sling, from the hook saddle to the load connection. Not the tag. Not a memory of last job’s 12-footers if you just choked shorter.",
      },
      {
        type: "p",
        text: "H is vertical height — from the hook centreline down to the load connection. A tape or a known stick. Not ‘it looks about a metre.’ The horizontal run under the sling is the adjacent side. You do not need it for this calculation.",
      },
      {
        type: "quote",
        text: "The sling is the hypotenuse. The drop is opposite θ. That is the whole trick.",
      },
      {
        type: "h",
        text: "THE FORMULA",
      },
      {
        type: "p",
        text: "Sine is opposite over hypotenuse. Opposite is H. Hypotenuse is L.",
      },
      {
        type: "formula",
        expr: "SIN θ = H / L",
        note: "θ from the horizontal. H and L in the same unit.",
      },
      {
        type: "formula",
        expr: "θ = SIN⁻¹ (H / L)",
        note: "Phone calculator. Degree mode. arcsin, asin, or sin⁻¹.",
      },
      {
        type: "p",
        text: "If H is half of L, sin θ is 0.5, and θ is 30°. That is the graphic’s worked lift — 12 ft sling, 6 ft drop, or 4 m and 2 m. Same ratio. Same angle.",
      },
      {
        type: "h",
        text: "WORKED BRIDLE",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "H / L = 0.500    θ = 30°",
            body: "H is half of L. This is the floor the procedure still allows without an engineer. Tension in each leg equals the whole load.",
          },
          {
            n: "02",
            title: "H / L = 0.707    θ = 45°",
            body: "A working bridle. Height is about seven-tenths of the sling. Tension factor 1.41 on each half-share.",
          },
          {
            n: "03",
            title: "H / L = 0.866    θ = 60°",
            body: "Steeper. Safer on the hardware. About 15% more than a vertical share. This is where most bridles want to live.",
          },
          {
            n: "04",
            title: "H / L = 1.000    θ = 90°",
            body: "Straight up. H equals L. That is a vertical hitch, not a spread. If you needed spread, you do not have it.",
          },
        ],
      },
      {
        type: "h",
        text: "THE TABLE YOU SHOULD KNOW COLD",
      },
      {
        type: "table",
        caption: "Find θ from H / L. Then take that θ into T = W / (2 × sin θ).",
        columns: ["H / L", "θ FROM HORIZONTAL", "WHAT IT MEANS"],
        rows: [
          ["0.500", "30°", "Procedure floor. Each leg sees W."],
          ["0.707", "45°", "Working bridle."],
          ["0.866", "60°", "Steep. Lower tension."],
          ["0.966", "75°", "Almost vertical."],
          ["1.000", "90°", "No spread. Vertical hitch."],
        ],
      },
      {
        type: "p",
        text: "Keep the angle as large as the lift allows. Larger θ, smaller tension. Flattening the bridle to reach pick points is how a tagged sling gets overloaded without the load changing.",
      },
      {
        type: "h",
        text: "USE IT",
      },
      {
        type: "p",
        text: "Phone calculator. Degree mode. H divided by L. Then sin⁻¹. Check: sin⁻¹(0.5) is 30°. If that is not what you get, you are in radians, or you inverted the fraction.",
      },
      {
        type: "calc",
        name: "sling-angle",
      },
      {
        type: "p",
        text: "You now have θ. The next number is tension. Two equal legs: T = W / (2 × sin θ). That is the other Wire story. Do not stop at a pretty angle.",
      },
      {
        type: "h",
        text: "WHAT THIS TRIANGLE DOES NOT DO",
      },
      {
        type: "list",
        items: [
          "It does not replace a measured weight. Garbage W still wrecks T.",
          "It does not split a 3-leg or 4-leg hitch into equal shares. If the load can tilt, design as if two legs are carrying.",
          "It does not make a hitch under 30° acceptable because the tape said 29°.",
          "It does not replace the sling WLL, the hitch factor, or Part 15.",
          "It does not survive a guess at L. If you shortened the sling in a choke, measure the working length.",
        ],
      },
      {
        type: "quote",
        text: "If you cannot explain the angle, you cannot use the angle.",
      },
      {
        type: "p",
        text: "That line is already in Proven. This is how you get the angle without lying to yourself. Measure H. Measure L. sin⁻¹(H/L). Then run the tension. If it does not fit the tag, change the hitch.",
      },
      {
        type: "cta",
        href: "/wire/sling-tension-is-sin",
        label: "How sling tension uses sin() →",
      },
      {
        type: "cta",
        href: "/safety/swp/sling-selection",
        label: "Sling selection procedure →",
      },
      {
        type: "cta",
        href: "/safety/rigging",
        label: "Rigging procedures →",
      },
    ],
  },
  {
    slug: "what-part-14-actually-names",
    title: "WHAT PART 14 ACTUALLY NAMES.",
    titleLines: ["WHAT PART 14", "ACTUALLY NAMES."],
    category: "SAFETY",
    excerpt:
      "In B.C., WorkSafeBC enforces the Regulation — not a vibe called CSA, and not ASME B30 as one book. Mobile is Z150. Tower is Z248. B30 is a series, and only the volumes written into the Regulation are law.",
    author: "Kojin Fox",
    published: "2026-08-15",
    updated: "2026-09-05",
    seoTitle: "What WorkSafeBC Part 14 Actually Names — Z150, Z248, ASME B30",
    seoDescription:
      "What WorkSafeBC actually enforces for cranes in B.C.: OHS Regulation Part 14, CSA Z150-1998 for mobile cranes, CSA Z248-2004 for tower cranes, and which ASME B30 volumes are named in the Regulation.",
    related: [
      "sin-the-height-cos-the-radius",
      "sling-tension-is-sin",
      "why-we-made-our-safety-program-public",
    ],
    safety: ["crane-operations", "rigging", "company-safety-policy"],
    sources: [
      {
        name: "WorkSafeBC OHS Regulation Part 14 — Cranes and Hoists",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
      },
      {
        name: "WorkSafeBC OHS Regulation Part 15 — Rigging",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging",
      },
      {
        name: "CSA Group — Z150 / Z248",
        href: "https://www.csagroup.org/",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "People say they follow CSA. They say they follow ASME. They say it as if those were one book, and as if saying the letters were the same thing as the law. In British Columbia they are not.",
      },
      {
        type: "p",
        text: "WorkSafeBC enforces the Workers Compensation Act and the Occupational Health and Safety Regulation. For cranes and hoists that is Part 14. For rigging that is Part 15. The Regulation names standards by title and by edition. WorkSafeBC's own note on access to standards is blunt: when a specific edition is referenced, that edition must be followed unless an OHS Guideline accepts another edition as a standard acceptable to the Board.",
      },
      {
        type: "quote",
        text: "The Regulation names the book. The edition in the Regulation is the one you can be held to.",
      },
      {
        type: "h",
        text: "WHAT WORKSAFEBC ENFORCES",
      },
      {
        type: "p",
        text: "WorkSafeBC is the Board. It does not sell cranes and it does not write CSA or ASME. It writes and enforces the Regulation. Officers inspect, issue orders, and can stop work. The duties sit on the employer, the supervisor, the owner, the prime contractor where there is one, and the worker. The crane belonging to someone else does not get anyone a free pass.",
      },
      {
        type: "p",
        text: "Section 14.2(1) is the hinge. A crane or hoist must be designed, constructed, assembled, erected, climbed, repositioned, adjusted, disassembled, dismantled, inspected, maintained and operated as specified by the manufacturer or a professional engineer — and it must meet the applicable standard listed in 14.2(2) through (15). Manufacturer or engineer. Named standard as well. If the Regulation is stricter, the Regulation wins.",
      },
      {
        type: "p",
        text: "Part 14 also has its own rules that do not live inside CSA or ASME: rated capacity indication, boom angle and radius indicators, inspection and maintenance records, modifications, certification after a misadventure, operator qualifications, operator certification, pre-use inspection, determining load weight, signals, loads over work areas, tandem and critical lifts, annual inspection of mobile cranes, and the tower-crane sections. Those are WorkSafeBC whether or not you own the CSA PDF.",
      },
      {
        type: "list",
        items: [
          "14.34 — only a qualified person who has been instructed, and who can demonstrate competency, operates the crane.",
          "14.34.1 — a mobile crane, tower crane or boom truck is operated only by a person with a valid operator's certificate issued by a person acceptable to the Board. In B.C. that is BC Crane Safety.",
          "14.35 — pre-use inspection and testing each shift, in the manner specified by the manufacturer, the named 14.2 standard, and the Regulation.",
          "14.73.2 and 14.73.3 — since 1 October 2024, tower-crane erection, climbing, repositioning and dismantling under a qualified supervisor, with a Notice of Project to WorkSafeBC at least two weeks before the work.",
        ],
      },
      {
        type: "h",
        text: "CSA Z150 — MOBILE",
      },
      {
        type: "p",
        text: "Section 14.2(5) says a mobile crane, telescoping or articulating boom truck or sign truck must meet the requirements of CSA Standard Z150-1998, Safety Code for Mobile Cranes — or one of the two ASME alternatives named in the same subsection.",
      },
      {
        type: "p",
        text: "CSA Z150 is the Canadian safety code on mobile cranes. It is written for lattice and telescopic boom machines on a crawler or wheel-mounted base whose job is hoisting: crawler cranes, truck-mounted cranes, boom trucks, rough-terrain and all-terrain carriers, railway and locomotive cranes. It is about design, construction, load rating, inspection, maintenance, repair, modification, test and operation. It is not a tower-crane code. CSA itself points tower machines to Z248.",
      },
      {
        type: "p",
        text: "CSA has published later editions. Z150-11, Z150-16, Z150:20. The Regulation still names Z150-1998. A newer book on the truck is not automatically the legal edition in B.C. unless WorkSafeBC has accepted it in a guideline. WorkSafeBC does use that power — G14.2(3)(c) accepts CMAA No. 74 (2015) in place of the 2004 overhead-crane specification named in 14.2(3). As of August 2026 there is no equivalent guideline substituting Z150:20 for Z150-1998. Follow the named edition. If the manufacturer or a professional engineer requires a later edition on top of that, that is 14.2(1) talking. It does not erase the Regulation.",
      },
      {
        type: "h",
        text: "CSA Z248 — TOWER",
      },
      {
        type: "p",
        text: "Section 14.2(6) says a tower, hammerhead crane or self-erecting tower crane must meet CSA Standard Z248-2004, Code for Tower Cranes. There is no 'or ASME' in that subsection. For construction tower cranes in B.C., Z248 is the named code.",
      },
      {
        type: "p",
        text: "CSA Z248 covers design, construction, installation, dismantling, operation, inspection, testing and maintenance of tower cranes — including self-erecting machines, fixed or travelling bases, and climbing or increasing-height arrangements. WorkSafeBC guideline G14.2-1 is the sentence most crews skip: the scope of Z248-2004 makes it applicable to all tower cranes, irrespective of use or industry service.",
      },
      {
        type: "p",
        text: "That same guideline is why people get ASME B30.4 wrong. Section 14.2(7) names ASME B30.4-2003 for a portal, tower or pillar crane. G14.2-1 says the scope of B30.4, as it applies to tower cranes, is limited to a tower crane not used in construction. Construction tower, hammerhead, self-erecting: 14.2(6) and Z248-2004. Do not run a high-rise erection on a B30.4 loophole.",
      },
      {
        type: "p",
        text: "CSA has later tower editions too — Z248-17, and a 2026 edition exists. The Regulation still names Z248-2004. Same rule as mobile: the edition in Part 14 is the one WorkSafeBC can hold you to unless a guideline says otherwise. Using a newer CSA as extra discipline is not the same thing as the Regulation having moved.",
      },
      {
        type: "h",
        text: "WHAT ASME B30 ACTUALLY IS",
      },
      {
        type: "p",
        text: "ASME B30 is not one standard. It is a series written by the ASME B30 committee on cranes and related equipment: construction, installation, operation, inspection, testing and maintenance. Each volume is a different machine or a different piece of gear. B30.5 is mobile and locomotive cranes. B30.3 is construction tower cranes in the ASME system. B30.4 is portal, tower and pedestal cranes. B30.9 is slings. B30.22 is articulating boom cranes. There are more.",
      },
      {
        type: "p",
        text: "In B.C., ASME B30 is law only where the Regulation names a volume and an edition. It is not imported wholesale because a superintendent likes American charts. The Standards Council of Canada has mapped which B30 volumes show up in provincial regulations. None of them are federal OHS law. In B.C. the named volumes in Part 14 and Part 15 are the ones that count.",
      },
      {
        type: "h",
        text: "WHICH B30 VOLUMES PART 14 NAMES",
      },
      {
        type: "p",
        text: "For the machines GOSPEL actually supplies people onto, this is the map in section 14.2 as it stood in August 2026.",
      },
      {
        type: "table",
        caption:
          "OHS Regulation Part 14, section 14.2. Named editions. Not the latest CSA or ASME reprint on a vendor site.",
        columns: ["MACHINE", "NAMED STANDARD", "SECTION"],
        rows: [
          ["Mobile crane, boom truck, sign truck", "CSA Z150-1998 or ASME B30.5-2004", "14.2(5)"],
          ["Articulating boom crane", "ASME B30.22-2005 (or Z150-1998 / B30.5-2004)", "14.2(5)"],
          ["Tower, hammerhead, self-erecting", "CSA Z248-2004", "14.2(6)"],
          ["Portal / tower / pillar — not construction", "ASME B30.4-2003", "14.2(7)"],
          ["Overhead, gantry, monorail, underhung", "CSA B167-96 or ASME B30.2 / B30.11 / B30.16 / B30.17 (2003–2005)", "14.2(4)"],
          ["Derricks", "ASME B30.6-2003", "14.2(11)"],
          ["Base-mounted drum hoist", "ASME B30.7-2001", "14.2(10)"],
          ["Side boom tractor", "ASME B30.14-2004", "14.2(12)"],
          ["Lever-operated hoist", "ASME B30.21-2005", "14.2(13)"],
        ],
      },
      {
        type: "p",
        text: "Read 14.2(5) as written. It is or, not and. A mobile crane must meet Z150-1998, or B30.5-2004, or — if it is an articulating boom — B30.22-2005. Meeting B30.5 does not mean you can ignore the rest of Part 14. It means that is one of the design-and-safety codes the subsection accepts for that machine type.",
      },
      {
        type: "p",
        text: "ASME B30.3, the ASME construction-tower volume, is not named in 14.2(6). Construction tower cranes in B.C. are Z248-2004. If someone tells you the site is 'on B30.3' for a hammerhead in British Columbia, ask them to show you the section. G14.2-1 is the WorkSafeBC answer.",
      },
      {
        type: "h",
        text: "B30.9 — SLINGS, IN PART 15",
      },
      {
        type: "p",
        text: "Rigging is a different part. Section 15.30 says that unless otherwise required by the Regulation, wire rope, alloy steel chain, metal mesh, synthetic fibre rope, synthetic roundslings and synthetic fibre web slings must meet ASME B30.9-2006, Slings. That is the B30 volume most riggers actually live in. Part 15 still adds its own rules on top: qualified riggers, design factors in Table 15-1, inspection before use, sling angles, identification, rejection criteria. B30.9 does not cancel 15.2.",
      },
      {
        type: "h",
        text: "WHAT THIS DOES NOT MEAN",
      },
      {
        type: "list",
        items: [
          "It does not mean a later CSA or ASME edition is illegal to use. It means the edition named in the Regulation is the compliance edition unless a guideline accepts another.",
          "It does not mean manufacturer instructions are optional. 14.2(1) puts them in the same sentence as the standard.",
          "It does not mean ASME B30 as a series is 'enforced in B.C.' Only named volumes and named years are.",
          "It does not mean Technical Safety BC replaced WorkSafeBC on a construction tower. Part 14 is a WorkSafeBC file.",
          "It does not replace the load chart, the LMI, or the site. Those still win the lift.",
          "It is not legal advice. Read the current Part 14 and Part 15. They move.",
        ],
      },
      {
        type: "quote",
        text: "If you cannot name the section, you are not following the section. You are following a rumour.",
      },
      {
        type: "p",
        text: "The work is done to the Regulation, to the standards the Regulation names, to the manufacturer, and to the site. Where they conflict, the stricter applicable requirement wins. Law always wins. That is already on the homepage. This is what those letters actually point at.",
      },
      {
        type: "cta",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-14-cranes-and-hoists",
        label: "WORKSAFEBC — PART 14 CRANES AND HOISTS →",
      },
      {
        type: "cta",
        href: "https://www.worksafebc.com/en/law-policy/occupational-health-safety/searchable-ohs-regulation/ohs-regulation/part-15-rigging",
        label: "WORKSAFEBC — PART 15 RIGGING →",
      },
      {
        type: "cta",
        href: "/safety/crane-operations",
        label: "07 — CRANE OPERATIONS →",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "sin-the-height-cos-the-radius",
    title: "SIN THE HEIGHT. COS THE RADIUS.",
    titleLines: ["SIN THE HEIGHT.", "COS THE RADIUS."],
    category: "CRANES",
    excerpt:
      "A mobile crane boom is a right triangle. Height is L × sin θ. Radius from the pin is L × cos θ. That is boom geometry — not a load chart.",
    author: "Kojin Fox",
    published: "2026-08-15",
    seoTitle: "Sin the Height. Cos the Radius. — Boom Geometry",
    seoDescription:
      "How to use sine and cosine for mobile crane boom height and radius. H = L × sin θ, R = L × cos θ, worked numbers, and why this is not a substitute for the load chart.",
    related: [
      "sling-tension-is-sin",
      "height-over-length-is-the-angle",
      "six-things-to-check-before-you-take-the-load",
      "what-your-crane-crew-should-know-before-they-arrive",
    ],
    safety: ["crane-operations", "rigging"],
    blocks: [
      {
        type: "p",
        text: "The boom is a right triangle whether anyone on the crew admits it. The hypotenuse is the boom length you have out. The angle at the pin, from the horizontal, is on the indicator. Opposite that angle is height. Adjacent is radius. Sin and cos. That is the whole trick.",
      },
      {
        type: "p",
        text: "This is a straight main boom on a mobile crane. No luffing jib. No lattice fly until you treat that as a different triangle. If the boom is not a straight stick from pin to sheave, stop using this and get the range diagram for the configuration you actually have.",
      },
      {
        type: "diagram",
        name: "boom-trig",
      },
      {
        type: "h",
        text: "WHAT θ IS",
      },
      {
        type: "p",
        text: "θ is boom angle from the horizontal. That is how CSA Z150 and ASME B30.5 charts talk, and it is what most angle indicators read. Straight up is 90°. Laid over is toward 0°. Do not invent a second convention on the radio.",
      },
      {
        type: "p",
        text: "If someone gives you the angle from vertical, it is the same triangle with the names swapped: height becomes L × cos of that angle, radius becomes L × sin of that angle. Do not use both and average them.",
      },
      {
        type: "quote",
        text: "The boom is doing sin() and cos() whether you are or not.",
      },
      {
        type: "h",
        text: "THE FORMULAS",
      },
      {
        type: "p",
        text: "L is the boom length in use — the telescoped length, not the stowed length. H is tip height above the boom foot pin. R is horizontal from the pin to the sheave, along the ground.",
      },
      {
        type: "formula",
        expr: "H = L × SIN θ",
        note: "Tip height above the boom pin. θ from the horizontal.",
      },
      {
        type: "formula",
        expr: "R = L × COS θ",
        note: "Horizontal from the boom pin. Not yet the chart radius.",
      },
      {
        type: "p",
        text: "Load-chart radius is measured from the centre of rotation, not from the pin. The pin sits a distance D in front of the slew centre. That D is on the range diagram for that crane — not in your head.",
      },
      {
        type: "formula",
        expr: "R CHART ≈ D + L × COS θ",
        note: "D from the range diagram. Still a check — not a substitute for the LMI.",
      },
      {
        type: "p",
        text: "Hook height above ground is another correction: pin height above the pads, minus the block hanging under the sheave, minus whatever parts of line you have reeved. Do not tell a rigger 'the boom is 28 metres' when the hook is 25. They are rigging to the hook.",
      },
      {
        type: "h",
        text: "WORKED BOOM — 30 m",
      },
      {
        type: "p",
        text: "Keep L, H and R in the same unit. Metres in, metres out. The sine does not care about tonnes. Capacity lives on the chart, at the radius you actually have.",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "70°    SIN 70° = 0.940    COS 70° = 0.342",
            body: "H = 30 × 0.940 = 28.2 m above the pin. R = 30 × 0.342 = 10.3 m from the pin. Steep. Short radius. This is where most charts still have muscle.",
          },
          {
            n: "02",
            title: "60°    SIN 60° = 0.866    COS 60° = 0.500",
            body: "H = 26.0 m. R = 15.0 m. You gave away 2.2 m of height and bought 4.7 m of radius. The load did not get heavier. The moment did.",
          },
          {
            n: "03",
            title: "45°    SIN 45° = 0.707    COS 45° = 0.707",
            body: "H = 21.2 m. R = 21.2 m. Height and radius from the pin are the same number. If you needed 26 m of height, you no longer have it.",
          },
          {
            n: "04",
            title: "30°    SIN 30° = 0.500    COS 30° = 0.866",
            body: "H = 15.0 m. R = 26.0 m. You are long, low, and usually out of the fat part of the chart. Booming down is not 'making it easier.'",
          },
        ],
      },
      {
        type: "p",
        text: "Add D and those radii grow. A 1.5 m pin offset at 60° turns 15.0 m from the pin into about 16.5 m from the slew. Charts are picky about that metre. Guessing D is how you pick a radius you do not have.",
      },
      {
        type: "h",
        text: "THE TABLE YOU SHOULD KNOW COLD",
      },
      {
        type: "table",
        caption: "Straight 30 m main boom. H and R from the pin. Add D for chart radius.",
        columns: ["θ FROM HORIZONTAL", "SIN θ", "COS θ", "H", "R FROM PIN"],
        rows: [
          ["70°", "0.940", "0.342", "28.2", "10.3"],
          ["60°", "0.866", "0.500", "26.0", "15.0"],
          ["45°", "0.707", "0.707", "21.2", "21.2"],
          ["30°", "0.500", "0.866", "15.0", "26.0"],
        ],
      },
      {
        type: "p",
        text: "Boom down: sin falls, cos rises. Height comes off, radius goes on. The LMI is watching radius. If you boom down to clear a pick and you have not re-checked the chart at the new radius, you are hoping. Hope is not a control.",
      },
      {
        type: "h",
        text: "USE IT",
      },
      {
        type: "p",
        text: "Phone calculator. Degree mode. sin() for height. cos() for radius. Check: sin(30) is 0.5. cos(60) is 0.5. If those are not true, you are in radians and every number you read out will sound official and be wrong.",
      },
      {
        type: "calc",
        name: "boom-trig",
      },
      {
        type: "h",
        text: "WHAT THIS TRIANGLE DOES NOT DO",
      },
      {
        type: "list",
        items: [
          "It does not replace the load chart, the range diagram, or the LMI. Those already did this math for this machine.",
          "It does not include a jib, an offset, a stowed-jib deduction, or a sheave that does not sit on the boom centreline.",
          "It does not give hook height. Subtract the block. Subtract the reeving. Measure if you do not know.",
          "It does not make a long-radius pick legal because the height still 'looks like enough.'",
          "It does not fix an unknown boom length. If you do not know L, you do not have a triangle. You have a guess.",
        ],
      },
      {
        type: "quote",
        text: "If you cannot explain the radius, you cannot use the radius.",
      },
      {
        type: "p",
        text: "Use this to see the shape of the lift before you argue with the chart. Then open the chart at the radius you actually have. The operator works to the chart, CSA Z150, ASME B30, the manufacturer, and the site. The triangle is so you are not surprised when booming down eats the capacity.",
      },
      {
        type: "cta",
        href: "/safety/crane-operations",
        label: "07 — CRANE OPERATIONS →",
      },
      {
        type: "cta",
        href: "/wire/sling-tension-is-sin",
        label: "SIN() FOR SLING TENSION →",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "sling-tension-is-sin",
    title: "IF YOU CAN'T USE SIN(), DON'T RIG THE ANGLE.",
    titleLines: ["IF YOU CAN'T", "USE SIN(),", "DON'T RIG", "THE ANGLE."],
    category: "RIGGING",
    excerpt:
      "Sling tension is not a feeling. For a two-leg bridle, T = W / (2 × sin θ). If you cannot do that, you cannot claim the angle is safe.",
    author: "Kojin Fox",
    published: "2026-08-15",
    updated: "2026-09-05",
    seoTitle: "Sling Tension Is Sin() — Rigging Math",
    seoDescription:
      "How to use sine for two-leg sling tension. T = W / (2 × sin θ), worked numbers, and why 30° from horizontal doubles the load in each leg.",
    related: [
      "height-over-length-is-the-angle",
      "sin-the-height-cos-the-radius",
      "six-things-to-check-before-you-take-the-load",
      "what-a-good-rigger-actually-looks-like",
      "a-ticket-isnt-competency",
    ],
    safety: ["rigging", "safe-work-procedures"],
    blocks: [
      {
        type: "p",
        text: "A rigger who cannot use sin() will still set an angle. The sling will still do the math. The hardware will still see the tension. The only person not in the equation is the one who was supposed to check it.",
      },
      {
        type: "p",
        text: "This is the two-leg bridle. Equal legs. Centre of gravity in the middle. Load hanging plumb. If those are not true, stop and get a different method — or an engineer.",
      },
      {
        type: "diagram",
        name: "sling-sin",
      },
      {
        type: "h",
        text: "WHAT θ IS",
      },
      {
        type: "p",
        text: "θ is the sling angle: the angle between the sling and the horizontal. ASME talks about it that way. This program talks about it that way. It is not the angle between the two legs at the hook. Mix those up and your number is for a different lift than the one in front of you.",
      },
      {
        type: "p",
        text: "When the bridle flattens, θ gets smaller. sin(θ) gets smaller. Tension goes up. The load did not get heavier. The angle did.",
      },
      {
        type: "quote",
        text: "The sling is doing sin() whether you are or not.",
      },
      {
        type: "h",
        text: "THE FORMULA",
      },
      {
        type: "p",
        text: "Each leg holds half the weight vertically. That vertical share is T × sin(θ). Solve for tension along the sling:",
      },
      {
        type: "formula",
        expr: "T = W / (2 × SIN θ)",
        note: "Two equal legs. θ from the horizontal. T and W in the same units.",
      },
      {
        type: "p",
        text: "Same thing written as a factor on the load share: T = (W / 2) × (1 / sin θ). The factor is 1 / sin(θ). At 90° it is 1. At 30° it is 2.",
      },
      {
        type: "p",
        text: "If someone gave you the angle from vertical instead, use cosine of that angle. It is the same triangle: cos(from vertical) = sin(from horizontal). Do not use both and average them.",
      },
      {
        type: "h",
        text: "WORKED LIFT — 4000 kg",
      },
      {
        type: "p",
        text: "On site, kilograms of tension are compared to a WLL in kilograms. The sine does not care. Keep W and T in the same unit.",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "60°    SIN 60° = 0.866",
            body: "T = 4000 / (2 × 0.866) = 2309 kg per leg. About 15% more than a straight vertical share. This is a working bridle.",
          },
          {
            n: "02",
            title: "45°    SIN 45° = 0.707",
            body: "T = 4000 / (2 × 0.707) = 2829 kg per leg. The load is still 4000. Each sling is already carrying 2829.",
          },
          {
            n: "03",
            title: "30°    SIN 30° = 0.500",
            body: "T = 4000 / (2 × 0.500) = 4000 kg per leg. Each sling sees the whole load. That is what 'it doubled' means in Proven.",
          },
        ],
      },
      {
        type: "p",
        text: "If those 4000 kg slings were picked because 'half the load is 2000,' they were already over at 30°. The ticket on the sling did not change. The angle did.",
      },
      {
        type: "h",
        text: "THE TABLE YOU SHOULD KNOW COLD",
      },
      {
        type: "table",
        caption: "Two-leg bridle. Tension factor = 1 / sin(θ). Multiply by W/2.",
        columns: ["θ FROM HORIZONTAL", "SIN θ", "FACTOR", "T IF W = 4000"],
        rows: [
          ["90°", "1.000", "1.00", "2000"],
          ["60°", "0.866", "1.15", "2309"],
          ["45°", "0.707", "1.41", "2829"],
          ["30°", "0.500", "2.00", "4000"],
        ],
      },
      {
        type: "p",
        text: "Below 30° that hitch is not used unless an engineer owns the numbers. sin(20°) is 0.342. The factor is 2.92. You are no longer 'spreading the slings a bit.' You are multiplying the load.",
      },
      {
        type: "h",
        text: "USE IT",
      },
      {
        type: "p",
        text: "Phone calculator. Degree mode. sin(). Then divide. If your calculator is in radians you will get a number that looks official and is wrong. Check: sin(30) must be 0.5. If it is not, you are in the wrong mode.",
      },
      {
        type: "calc",
        name: "sling-sin",
      },
      {
        type: "h",
        text: "WHAT THIS FORMULA DOES NOT DO",
      },
      {
        type: "list",
        items: [
          "It does not split a 3-leg or 4-leg bridle into three or four equal shares. If the load can tilt, design as if two legs are carrying.",
          "It does not fix an unknown weight. Garbage W in, garbage T out.",
          "It does not replace a load chart, a sling WLL, or a hitch factor (choker, basket).",
          "It does not make a flattened bridle acceptable because the crane still has capacity.",
        ],
      },
      {
        type: "quote",
        text: "If you cannot explain the angle, you cannot use the angle.",
      },
      {
        type: "p",
        text: "That line is already in Proven. This is what it means in numbers. Measure θ from the horizontal. Run sin(). Compare T to the WLL of the sling and the hardware. If it does not fit, change the hitch — do not hope the steel is in a generous mood.",
      },
      {
        type: "cta",
        href: "/wire/height-over-length-is-the-angle",
        label: "FIND θ FROM HEIGHT AND SLING LENGTH →",
      },
      {
        type: "cta",
        href: "/redmc/rigging-charts",
        label: "SLING CHARTS — REDMC →",
      },
      {
        type: "cta",
        href: "/redtc",
        label: "RIGGING PRACTICE — REDTC →",
      },
      {
        type: "cta",
        href: "/safety/rigging",
        label: "06 — RIGGING →",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "a-ticket-isnt-competency",
    title: "A TICKET ISN'T COMPETENCY.",
    titleLines: ["A TICKET", "ISN'T", "COMPETENCY."],
    category: "RIGGING",
    excerpt:
      "A qualification tells you what someone has been trained to do. Competency tells you whether they can actually do it.",
    author: "Kojin Fox",
    published: "2026-08-06",
    featured: true,
    seoTitle: "A Ticket Isn't Competency",
    seoDescription:
      "A crane or rigging ticket is a starting point. Competency is whether the person can do this lift, on this site, today.",
    related: [
      "sling-tension-is-sin",
      "what-a-good-rigger-actually-looks-like",
      "the-difference-between-a-crew-and-a-bunch-of-people",
    ],
    safety: ["training-competency", "rigging"],
    blocks: [
      {
        type: "p",
        text: "A ticket is not a personality. It is not a guarantee. It is a record that someone sat a course, passed an exam, or holds a trade credential. That matters. It is also the beginning of the conversation, not the end of it.",
      },
      {
        type: "p",
        text: "On a lift, nobody is asking whether the rigger once passed a written test. They are asking whether this person can look at this load, this hardware, this crane and this exclusion zone — and make a decision that holds.",
      },
      {
        type: "quote",
        text: "A ticket tells you what someone has been trained to do. Competency tells you whether they can actually do it.",
      },
      {
        type: "h",
        text: "WHAT A TICKET IS FOR",
      },
      {
        type: "p",
        text: "Tickets keep people who have never been trained off the hook. They give a client, a prime contractor and a supervisor a first filter. A rigger without the paper the work requires does not take the hook. That is the floor.",
      },
      {
        type: "p",
        text: "The mistake is treating the floor as the building. Two people can hold the same ticket and not be interchangeable. One has spent years on steel and knows when a sling is lying to you. The other passed the course last spring and has not yet been in a bad setup.",
      },
      {
        type: "h",
        text: "WHAT COMPETENCY LOOKS LIKE",
      },
      {
        type: "p",
        text: "Competency is specific. It is this machine class, this kind of load, this site condition. A person can be competent on a mobile crane and not ready for a tower. They can be a good rigger on precast and lost on a pick that needs engineered lifting points.",
      },
      {
        type: "list",
        items: [
          "They ask for the weight before they touch the gear.",
          "They inspect hardware as if they own the consequence.",
          "They will say no when the information is missing.",
          "They can explain the rigging in a sentence a supervisor can check.",
          "They do not fill silence with guessing.",
        ],
      },
      {
        type: "p",
        text: "None of that is printed on a ticket. You find it by asking what they have actually done, by watching how they set up, and by putting them with people who will not cover for a bad lift.",
      },
      {
        type: "h",
        text: "THE STANDARD",
      },
      {
        type: "p",
        text: "Qualifications are verified first. Then experience against the work. Then the brief. If the person cannot be stood behind for this lift, they do not take the hook. A name and a photocopy of a ticket is not the same as competency.",
      },
      {
        type: "p",
        text: "If you are supervising a crew, ask what was checked besides the ticket. If the answer is nothing, competency was not checked. Paper was.",
      },
      {
        type: "cta",
        href: "/safety/training-competency",
        label: "11 — TRAINING + COMPETENCY →",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "why-we-made-our-safety-program-public",
    title: "WHY PROVEN IS PUBLIC.",
    titleLines: ["WHY PROVEN", "IS", "PUBLIC."],
    category: "SAFETY",
    excerpt:
      "If people have to ask permission to see how you expect the work to be done, you do not have a safety program. You have a filing cabinet.",
    author: "Kojin Fox",
    published: "2026-08-13",
    seoTitle: "Why Proven Is Public",
    seoDescription:
      "Proven is public. No portal, no request form, no expiring link. Here is why.",
    related: [
      "when-a-swp-isnt-really-a-swp",
      "why-documentation-should-be-easy-to-find",
    ],
    safety: ["company-safety-policy", "safe-work-procedures"],
    blocks: [
      {
        type: "p",
        text: "Most company safety programs live in a PDF on a shared drive, a binder in a trailer, or a portal that expires in seven days. The people who need them most — the operator on nights, the rigger at the hook, the supervisor at the gate — cannot read them when it counts.",
      },
      {
        type: "p",
        text: "Proven is on this website. Not a summary. The system. If a procedure cannot be followed on site, it is not a procedure.",
      },
      {
        type: "quote",
        text: "Safety should not be hidden behind a login or an expiring link.",
      },
      {
        type: "h",
        text: "THE USUAL EXCUSES",
      },
      {
        type: "p",
        text: "People say the program is proprietary. It is not. The physics of a lift is not a trade secret. People say workers will steal procedures. Good. If another crew uses a better method because they read these procedures, the site is safer. People say lawyers want it locked down. Lawyers do not rig the load.",
      },
      {
        type: "p",
        text: "A public program also has a cost: you have to mean it. You cannot publish a procedure and then put people on a lift who have never seen it. You cannot write a right to refuse and then punish the person who uses it. Publication is a commitment, not a marketing page.",
      },
      {
        type: "h",
        text: "WHO IT IS FOR",
      },
      {
        type: "list",
        items: [
          "Workers, before they start the lift.",
          "Supervisors, on the day, on a phone, at the gate.",
          "Contractors and clients who want to know the standard.",
          "Anyone who has to live with the consequence if the lift goes wrong.",
        ],
      },
      {
        type: "p",
        text: "COR certification is a separate layer. It is an independent look at whether an occupational health and safety management system is maintained. It is not a substitute for letting people read the actual rules of the work.",
      },
      {
        type: "p",
        text: "If your safety program cannot survive being read by a stranger, it was not written for the people doing the lift.",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
      {
        type: "cta",
        href: "/#cor",
        label: "WHAT COR IS →",
      },
    ],
  },
  {
    slug: "what-a-good-rigger-actually-looks-like",
    title: "WHAT A GOOD RIGGER ACTUALLY LOOKS LIKE.",
    titleLines: ["WHAT A GOOD", "RIGGER ACTUALLY", "LOOKS LIKE."],
    category: "RIGGING",
    excerpt:
      "It is not the loudest person on the steel. It is the one who finds the centre of gravity before anyone finds the radio.",
    author: "Kojin Fox",
    published: "2026-05-20",
    seoTitle: "What a Good Rigger Actually Looks Like",
    seoDescription:
      "How to tell a competent rigger from someone who only holds the ticket. What to watch before the hook is loaded.",
    related: [
      "sling-tension-is-sin",
      "a-ticket-isnt-competency",
      "six-things-to-check-before-you-take-the-load",
    ],
    safety: ["rigging", "training-competency"],
    blocks: [
      {
        type: "p",
        text: "A good rigger is often quiet at the wrong time for people who confuse confidence with competence. They are looking at the load. They are looking at the hardware. They are not performing for the pickup truck.",
      },
      {
        type: "p",
        text: "You can see it in the first five minutes. They want the weight, the drawings if they exist, and a walk around the piece. They do not grab the first sling that looks long enough.",
      },
      {
        type: "quote",
        text: "The gear is the truth. The guess is the hazard.",
      },
      {
        type: "h",
        text: "THINGS THEY DO WITHOUT BEING ASKED",
      },
      {
        type: "list",
        items: [
          "Inspect slings, shackles and hooks as if the last person might have missed a cut.",
          "Protect gear from sharp edges instead of hoping the wrap holds.",
          "Set hardware so it sits straight under load.",
          "Keep people out of the fall line before the test lift, not after someone gets nervous.",
          "Stop the job when the information is incomplete.",
        ],
      },
      {
        type: "h",
        text: "THINGS THEY DO NOT DO",
      },
      {
        type: "p",
        text: "They do not choke a sling off a guess. They do not stand under the load to 'keep an eye on it.' They do not tell the operator to take it because the superintendent is watching. They do not treat a signalperson as optional because the lift is small.",
      },
      {
        type: "p",
        text: "Watch the setup. Ask what they would refuse. A rigger who cannot name a refusal has not been in enough real work — or has been in the wrong rooms.",
      },
      {
        type: "cta",
        href: "/safety/rigging",
        label: "06 — RIGGING →",
      },
    ],
  },
  {
    slug: "the-lift-looked-simple-it-wasnt",
    title: "THE LIFT LOOKED SIMPLE. IT WASN'T.",
    titleLines: ["THE LIFT LOOKED", "SIMPLE.", "IT WASN'T."],
    category: "CRANES",
    excerpt:
      "The lifts that go badly are often the ones nobody bothered to treat as a lift. Small, familiar, 'we've done this.'",
    author: "Kojin Fox",
    published: "2026-06-25",
    seoTitle: "The Lift Looked Simple. It Wasn't.",
    seoDescription:
      "Simple-looking crane lifts fail when people skip the plan. Weight, radius, wind and the path still count on a familiar pick.",
    related: [
      "six-things-to-check-before-you-take-the-load",
      "what-your-crane-crew-should-know-before-they-arrive",
    ],
    safety: ["crane-operations", "hazard-assessment"],
    blocks: [
      {
        type: "p",
        text: "A lot of bad lifts start with the same sentence: it should only take a minute. A pump. A panel. A piece that has been sitting there all week. Nobody writes a plan because the plan is assumed to be obvious.",
      },
      {
        type: "p",
        text: "Then the radius is longer than memory. The load is heavier than the last one that looked like it. The wind picked up. The tag line is in the wrong hands. The path over the work deck was never walked.",
      },
      {
        type: "quote",
        text: "Familiar is not the same as known.",
      },
      {
        type: "h",
        text: "WHAT 'SIMPLE' HIDES",
      },
      {
        type: "p",
        text: "Simple is a feeling. A lift is numbers and a path. If you cannot say the weight, the radius, the capacity at that radius, and where people will not stand, you do not have a simple lift. You have an unexamined one.",
      },
      {
        type: "p",
        text: "Operators get put in this position constantly. The site wants movement. The last pick went fine. The chart is in the cab and nobody wants to hear about it. A competent operator will still open the chart. That is not fussiness. That is the job.",
      },
      {
        type: "h",
        text: "THE RULE",
      },
      {
        type: "p",
        text: "If it hangs from a crane, it is a lift. It gets a weight, a plan, a path and an exclusion zone. The paperwork can be short. The thinking cannot be skipped. A two-minute brief is cheaper than a two-week investigation.",
      },
      {
        type: "p",
        text: "When someone calls a lift simple, that is a request for speed, not a fact about the load. The questions still get asked. A lift that skips the questions is not a planned lift.",
      },
      {
        type: "cta",
        href: "/safety/crane-operations",
        label: "07 — CRANE OPERATIONS →",
      },
    ],
  },
  {
    slug: "six-things-to-check-before-you-take-the-load",
    title: "SIX THINGS TO CHECK BEFORE YOU TAKE THE LOAD.",
    titleLines: ["SIX THINGS TO CHECK", "BEFORE YOU", "TAKE THE LOAD."],
    category: "SAFETY",
    excerpt:
      "Not a poster. Six things that, if they are wrong, the hook should not leave the ground.",
    author: "Kojin Fox",
    published: "2026-07-08",
    seoTitle: "Six Things to Check Before You Take the Load",
    seoDescription:
      "A usable checklist before a crane takes the load: weight, gear, connection, people, test lift, communication.",
    related: [
      "sling-tension-is-sin",
      "the-lift-looked-simple-it-wasnt",
      "when-a-swp-isnt-really-a-swp",
    ],
    safety: ["safe-work-procedures", "rigging"],
    blocks: [
      {
        type: "p",
        text: "Checklists die when they are written for an audit instead of a hook. This one is short on purpose. If you cannot do these six things, do not take the load.",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "KNOW THE WEIGHT",
            body: "Confirm load weight, centre of gravity and lifting points. If any of those are unknown, do not rig. Guessing the weight is not planning.",
          },
          {
            n: "02",
            title: "INSPECT THE GEAR",
            body: "Slings, shackles, hooks and hardware. Cuts, birdcaging, bent pins, missing latches — out of service. No 'one more lift.'",
          },
          {
            n: "03",
            title: "CONNECT IT PROPERLY",
            body: "Hardware sits straight. Slings are protected from sharp edges. Nothing is twisted, knotted or choked off a guess.",
          },
          {
            n: "04",
            title: "CLEAR THE AREA",
            body: "Exclusion zone set. Fall line empty. Tag lines where they can actually control the piece. Nobody walking through for a better view.",
          },
          {
            n: "05",
            title: "TEST THE LIFT",
            body: "Take it just clear of the ground. Check balance, brakes, and whether the rigging is doing what you thought. If it tilts, lands or shocks — lower it and re-rig.",
          },
          {
            n: "06",
            title: "KEEP THE SIGNAL",
            body: "One signalperson. One operator. Radios or hand signals agreed. If the signal is lost, the lift stops. No interpreting silence.",
          },
        ],
      },
      {
        type: "quote",
        text: "If a procedure cannot be followed on a jobsite, it is not a procedure.",
      },
      {
        type: "p",
        text: "Print this if you want it in a pocket. Better: read the full sequence in Proven and use it the way the work actually happens.",
      },
      {
        type: "cta",
        href: "/safety/safe-work-procedures",
        label: "04 — SAFE WORK PROCEDURES →",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "when-a-swp-isnt-really-a-swp",
    title: "WHEN A SWP ISN'T REALLY A SWP.",
    titleLines: ["WHEN A SWP", "ISN'T REALLY", "A SWP."],
    category: "SAFETY",
    excerpt:
      "A safe work procedure that cannot be used on the day is theatre. It exists to be shown, not followed.",
    author: "Kojin Fox",
    published: "2026-06-10",
    seoTitle: "When a SWP Isn't Really a SWP",
    seoDescription:
      "If a safe work procedure cannot be followed on a jobsite, it is not a procedure. How to tell a usable SWP from paperwork.",
    related: [
      "why-we-made-our-safety-program-public",
      "six-things-to-check-before-you-take-the-load",
    ],
    safety: ["safe-work-procedures", "safe-job-procedures"],
    blocks: [
      {
        type: "p",
        text: "You can tell a fake SWP by how it reads. It is long. It is written in the voice of a binder. It tells you to 'ensure all applicable regulations are followed' and then never says who does what when the load is on the hook.",
      },
      {
        type: "p",
        text: "A real SWP is a sequence. Plan. Inspect. Connect. Clear. Test. Lift. Someone can follow it with gloves on. Someone can argue with a step because the step is specific enough to be wrong.",
      },
      {
        type: "quote",
        text: "If a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.",
      },
      {
        type: "h",
        text: "SIGNS YOU ARE LOOKING AT THEATRE",
      },
      {
        type: "list",
        items: [
          "It could apply to any trade in any province with the names swapped.",
          "The only verb is 'ensure.'",
          "There is no order of operations.",
          "Nobody on the crew has ever opened it except at orientation.",
          "It lives in a portal. The lift lives in the dirt.",
        ],
      },
      {
        type: "h",
        text: "WHAT WE WRITE INSTEAD",
      },
      {
        type: "p",
        text: "GOSPEL procedures are public and short enough to use. A site-specific job procedure still has to be written for this lift, this day. The SWP is the method. The SJP is the instance. If the instance contradicts the method, stop and fix one of them before the hook moves.",
      },
      {
        type: "p",
        text: "If your SWP cannot survive a rigger reading it out loud, rewrite it. Do not add a cover page.",
      },
      {
        type: "cta",
        href: "/safety/safe-work-procedures",
        label: "04 — SAFE WORK PROCEDURES →",
      },
    ],
  },
  {
    slug: "why-documentation-should-be-easy-to-find",
    title: "WHY DOCUMENTATION SHOULD BE EASY TO FIND.",
    titleLines: ["WHY DOCUMENTATION", "SHOULD BE", "EASY TO FIND."],
    category: "INDUSTRY",
    excerpt:
      "A procedure nobody can find at 6:40 a.m. does not exist. Access is part of the control.",
    author: "Kojin Fox",
    published: "2026-04-08",
    seoTitle: "Why Documentation Should Be Easy to Find",
    seoDescription:
      "Safety documentation that hides behind logins and shared drives does not get used. Access is part of doing the work.",
    related: [
      "why-we-made-our-safety-program-public",
      "when-a-swp-isnt-really-a-swp",
    ],
    safety: ["company-safety-policy"],
    blocks: [
      {
        type: "p",
        text: "The industry is good at writing documents and bad at putting them where work happens. The lift is on a slab. The procedure is behind a password, a request form, or a person who is not on shift.",
      },
      {
        type: "p",
        text: "Then people act surprised when others improvise. They did not ignore the system. They could not reach it.",
      },
      {
        type: "quote",
        text: "If you cannot find it on a phone at the gate, you do not have a program. You have an archive.",
      },
      {
        type: "h",
        text: "WHAT EASY MEANS",
      },
      {
        type: "p",
        text: "Easy is not 'available on request.' Easy is a URL that does not expire. Easy is a section you can open without an account. Easy is type large enough to read in sun. Easy is a procedure that starts at the first real action, not a page of definitions.",
      },
      {
        type: "p",
        text: "This is not a technology problem. It is a willingness problem. Companies hide documents because they are embarrassed by them, because they change every month and nobody wants the old one circulating, or because they were written for a certificate wall. None of those reasons help the person on the hook.",
      },
      {
        type: "p",
        text: "The answer is blunt. Proven is public. COR is stated in public. If a document matters to the work, it should survive daylight.",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "the-difference-between-a-crew-and-a-bunch-of-people",
    title: "THE DIFFERENCE BETWEEN A CREW AND A BUNCH OF PEOPLE.",
    titleLines: ["THE DIFFERENCE", "BETWEEN A CREW", "AND A BUNCH OF PEOPLE."],
    category: "PEOPLE",
    excerpt:
      "A crew shares a brief, a standard and a way of stopping the work. A bunch of people share a start time.",
    author: "Kojin Fox",
    published: "2026-04-29",
    seoTitle: "The Difference Between a Crew and a Bunch of People",
    seoDescription:
      "A lifting crew is not four tickets on a site. It is a brief, a standard, and people who already know how the others work.",
    related: [
      "what-your-crane-crew-should-know-before-they-arrive",
      "a-ticket-isnt-competency",
    ],
    safety: ["responsibilities", "training-competency"],
    blocks: [
      {
        type: "p",
        text: "You can put an operator, a rigger, a signalperson and a supervisor on the same dirt and still not have a crew. You have a collection of tickets. The lift will expose the difference.",
      },
      {
        type: "p",
        text: "A crew has already agreed how they talk. Who signals. When they stop. What 'ready' means. A bunch of people will negotiate that while the load is in the air, or worse, they will each assume the other already did.",
      },
      {
        type: "quote",
        text: "One brief. One standard. One crew that already knows how the other works.",
      },
      {
        type: "h",
        text: "WHAT A CREW SHARES",
      },
      {
        type: "list",
        items: [
          "The plan for this lift, not a vibe about being careful.",
          "The same exclusion zone. Not four personal versions of it.",
          "Permission to stop the work without a speech.",
          "Names. Not 'the operator' and 'the new guy.'",
        ],
      },
      {
        type: "p",
        text: "A lift needs a crew that already shares a standard. That is more than a list of names. It means the operator is not meeting the rigger for the first time under a load that 'should only take a minute.'",
      },
      {
        type: "p",
        text: "If you are counting heads, say that. If the lift has to go right, you need a crew that already knows how the other works.",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
    ],
  },
  {
    slug: "what-your-crane-crew-should-know-before-they-arrive",
    title: "WHAT YOUR CRANE CREW SHOULD KNOW BEFORE THEY ARRIVE.",
    titleLines: ["WHAT YOUR CRANE CREW", "SHOULD KNOW", "BEFORE THEY ARRIVE."],
    category: "CRANES",
    excerpt:
      "If the first time they see the machine, the load and the site is when they park, you have already spent the briefing.",
    author: "Kojin Fox",
    published: "2026-08-04",
    seoTitle: "What Your Crane Crew Should Know Before They Arrive",
    seoDescription:
      "Brief a crane crew before they arrive: machine, load, site, signals, exclusions, and what will stop the lift.",
    related: [
      "tower-crane-climbing-sequence",
      "the-difference-between-a-crew-and-a-bunch-of-people",
      "the-lift-looked-simple-it-wasnt",
    ],
    safety: ["hazard-assessment", "crane-operations"],
    blocks: [
      {
        type: "p",
        text: "A note that says 'crane and rigger, Tuesday, downtown' is not a brief. It is a calendar entry. The crew will invent the rest on site, and you will not like some of the inventions.",
      },
      {
        type: "p",
        text: "Before anyone starts, they need the work, the site, the machines and the dates. Before they arrive, they get the hazards and the procedure. Guessing is not a brief.",
      },
      {
        type: "h",
        text: "SEND THIS BEFORE THE GATE",
      },
      {
        type: "list",
        items: [
          "Machine: make, model, configuration, and who owns it.",
          "Load: weight, dimensions, lifting points, and whether any of that is still a guess.",
          "Site: access, ground, overhead, public interface, other trades.",
          "Signals: radio or hand, who has the right to stop.",
          "Hours, PPE, site rules, and the person who actually owns the lift.",
        ],
      },
      {
        type: "quote",
        text: "If you cannot tell who is coming and what they are walking into, you are not ready to start.",
      },
      {
        type: "p",
        text: "A good crew will still walk the lift when they arrive. The brief does not replace eyes. It means they are not using the walk to discover that the crane is a different class, the load is double, or the pick is over a live sidewalk.",
      },
      {
        type: "p",
        text: "If you want people at 7:00, send the facts the day before. If the facts change at 6:15, say so. Silence is not a plan.",
      },
      {
        type: "cta",
        href: "/safety",
        label: "Crane safety program →",
      },
      {
        type: "cta",
        href: "/safety/hazard-assessment",
        label: "03 — HAZARD ASSESSMENT →",
      },
    ],
  },
];
