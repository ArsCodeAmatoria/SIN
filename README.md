```
 ██╗██╗  ██╗ ██╗███████╗
███║██║  ██║███║██╔════╝
╚██║███████║╚██║███████╗
 ██║╚════██║ ██║╚════██║
 ██║     ██║ ██║███████║
 ╚═╝     ╚═╝ ╚═╝╚══════╝
        CRANE SAFETY
```

[![Next.js](https://img.shields.io/badge/Next.js-15-111111?logo=nextdotjs&logoColor=white)](https://whoop.ca)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![COR®](https://img.shields.io/badge/COR®-Certified-ffd500)](https://www.bccsa.ca/)
[![WorkSafeBC](https://img.shields.io/badge/WorkSafeBC-Part_14-111111)](https://www.worksafebc.com/)
[![BC Crane Safety](https://img.shields.io/badge/BC_Crane_Safety-Ticket-6c6861)](https://bccranesafety.ca/)
[![British Columbia](https://img.shields.io/badge/British_Columbia-Canada-111111)](https://whoop.ca)

<p align="center">
  <img width="1024" height="1024" alt="Image" src="https://github.com/user-attachments/assets/641d7133-5fc9-4b26-a012-c67becf143d8" />
</p>

# GOSPEL

This site is crane safety information for lifting work.

[Proven](https://whoop.ca/safety) is the occupational health and safety management system behind the lift — policies, safe work procedures, JHAs, site-specific plans, forms and crane binders. Written the way the work actually happens. Public so anyone on the lift can read it before the hook is loaded.

If a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.

---

## The program

- **OH&S policies** — the rules of the work. Named, public, written to be used.
- **Safe work procedures** — numbered steps for the lift. Crane, signals, rigging, the plan.
- **Hazard assessment** — JHAs and site-specific plans. Hazards, consequence, residual risk.
- **Forms and binders** — FLHA, lift plans, inspections, incident reports. Tower and self-erect site binders.
- **Competency** — a ticket is not competency. The program names what each role must hold, verify and refuse.

## How we operate

Write it down. Make it usable. Work safe. Mean it.

The standard should be in writing. Workers should be treated with respect. Stop-work is real.

## Proven

[Proven](https://whoop.ca/safety) is GOSPEL’s safety system. It is open. Operators, riggers, supervisors, contractors and clients can read how the work is expected to be performed before the gate. No portal. No request form. No expiry date.

The program is grouped the way the work runs — how we work, the lift, when it goes wrong, the library. Search finds a policy, SWP, JHA, SJP, form or SDS. The documents used at the gate sit at the top: FLHA, crane pre-use, lift plan, flytable SJP, toolbox, stop work, incident, MAD / powerlines, heat and wind, emergency.

Working documents, not a poster:

- **OH&S policies** — OH&S, violence, workplace conduct, fitness for work, PPE, impairment, working alone, incident reporting, injury management, return to work, [bullying and harassment](https://whoop.ca/safety/policy/bullying-and-harassment), and discrimination. Plus competency, crane operations and rigging.
- **SWP library** — numbered steps for the lift. Grouped: crane, signals, rigging, the plan. Includes flytable cycling and working near powerlines.
- **JHA library** — hazards, consequence, residual risk. Rows carry a severity badge. The steps live in the SWP.

  ![LOW](https://img.shields.io/badge/LOW-6c6861)
  ![MODERATE](https://img.shields.io/badge/MODERATE-2c2a27)
  ![HIGH](https://img.shields.io/badge/HIGH-111111)
  ![EXTREME](https://img.shields.io/badge/EXTREME-ffd500)

  Extreme is the no-recovery killer (people under the load, MAD, overturn, a table over the edge). High is serious injury. Moderate is lost time or a failed plan. Low is first aid.
- **SJP library** — this lift, this site, this day. The SWP is the method. The SJP is the instance. Flytable cycles first — fill [GOSPEL-FRM-052](https://whoop.ca/safety/builder/flytable-cycle-sjp) before drop.
- **Safety forms** — FLHA, inspections, lift plans, incident reports, operator and rigger logs, weekly and monthly maintenance. Binder forms (30M33 record, radio 52E73C, NOP-TC posting, tower crane report) fill and download as PDF.
- **[Crane binders](https://whoop.ca/safety/crane-binders)** — Tower and Self-Erect site binders numbered to the BC Crane Safety checklists. Wizard at `/safety/binder`. Official templates stay on bccranesafety.ca and WorkSafeBC.
- **[Form Builder](https://whoop.ca/safety/builder)** — assemble GOSPEL forms from reusable Safety Blocks. Fill them on the device. Download a PDF. Email it. Nothing is stored on a server unless you send it.

Minimum approach distances are WorkSafeBC Table 19-1A — the same numbers [BC Hydro](https://www.bchydro.com/safety-outages/electrical-safety/worker-training.html) publishes. 1 m / 3 m / 4.5 m / 6 m by voltage. Unknown: 3 m off distribution, 6 m off transmission, until they verify. If the lift cannot hold MAD, coded 30M33. [GOSPEL-SWP-018](https://whoop.ca/safety/swp/working-near-powerlines).

Where BCCSA already wrote the construction template, this site uses it. Injury-management and COR packs download from this site. Heat and sun, lone hoist-operator rescue, fall-protection rescue and crane-relevant toolbox talks are linked to the BCCSA catalogues — sign in on bccsa.ca to get the PDFs. Those guides are not rewritten here.

Proven is COR® Certified through the BC Construction Safety Alliance. That certification is of this occupational health and safety management system — not a claim that incidents will never occur.

The work is done to:

- CSA Z150-1998 / Z248-2004 as named in the Regulation
- WorkSafeBC Occupational Health and Safety Regulation, including Part 14, Part 15 and Part 19 Table 19-1A
- BC Crane Safety
- Technical Safety BC
- ASME B30 as named (B30.5-2004, B30.22-2005)
- Manufacturer requirements — load charts, manuals, configuration limits
- Site policies — where they are stricter, they win

Where those conflict, the stricter applicable requirement wins. Law always wins.

## GOSPELWIRE

[GOSPELWIRE](https://whoop.ca/whoopwire) is the program paper. Standards, the lift, and how the work is actually done. Not marketing copy.

---

## This site

Next.js (App Router) and TypeScript. No database in this version. Form definitions live as TypeScript. Completed forms stay on the device until someone downloads or emails a PDF. The homepage leads with the program, then Proven.

```bash
npm install
npm run dev
```

Optional server env:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send completed-form PDFs. Without it, the PDF downloads instead. |
| `WHOOP_FORM_FROM` | From address for those emails. |
| `MAPBOX_ACCESS_TOKEN` | Tighter Canadian address lookup. Without it, OpenStreetMap is used. |

Do not put those keys in client code.
