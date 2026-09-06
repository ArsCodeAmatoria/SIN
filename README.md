```
sin()
CRANE SAFETY
```

[![Next.js](https://img.shields.io/badge/Next.js-15-111111?logo=nextdotjs&logoColor=white)](https://sin.ae.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![COR®](https://img.shields.io/badge/COR®-Certified-ffd500)](https://www.bccsa.ca/)
[![WorkSafeBC](https://img.shields.io/badge/WorkSafeBC-Part_14-111111)](https://www.worksafebc.com/)
[![BC Crane Safety](https://img.shields.io/badge/BC_Crane_Safety-Ticket-6c6861)](https://bccranesafety.ca/)
[![British Columbia](https://img.shields.io/badge/British_Columbia-Canada-111111)](https://sin.ae.org)

<p align="center">
  <img width="1024" height="1024" alt="sin() — crane safety" src="https://github.com/user-attachments/assets/641d7133-5fc9-4b26-a012-c67becf143d8" />
</p>

# sin()

Public crane safety information for lifting work in British Columbia.

[sin.ae.org](https://sin.ae.org) is exam practice, a public OHS program, and writing about the work. No portal. No request form. No expiry date.

If a procedure cannot be followed on a jobsite, it is not a procedure. It is theatre.

---

## What’s on the site

- **[REDTC](https://sin.ae.org/redtc)** — Tower Crane Red Seal practice. Fulford Level B, SkilledTradesBC Level 1 and 2, Interprovincial IP, manufacturer load charts, BCACS sling charts. 70% to pass.
- **[REDMC](https://sin.ae.org/redmc)** — Mobile Crane practice. Separate bank. Manufacturer PDFs and BCACS rigging figures as verified questions exist. Capacities are never invented.
- **[Proven](https://sin.ae.org/safety)** — the occupational health and safety program: policies, SWPs, JHAs, SJPs, forms and crane binders. Readable on a phone before the hook is loaded.
- **[The Wire](https://sin.ae.org/wire)** — writing about safety, rigging, cranes and people.
- **[About](https://sin.ae.org/about)** — Kojin Fox. Sources, corrections, `info@sin.ae.org`.

## Proven

[Proven](https://sin.ae.org/safety) is open. Operators, riggers, supervisors, contractors and clients can read how the work is expected to be performed before the gate.

Working documents, not a poster:

- **OH&S policies** — the rules of the work. Named, public, written to be used.
- **SWP library** — numbered steps for the lift. Crane, signals, rigging, the plan.
- **JHA library** — hazards, consequence, residual risk.
- **SJP library** — this lift, this site, this day.
- **[Forms](https://sin.ae.org/safety/builder)** — FLHA, lift plans, inspections, incident reports. Fill on the device. Download a PDF.
- **[Crane binders](https://sin.ae.org/safety/binder)** — Tower and Self-Erect site binders.

The work is done to CSA Z150 / Z248 as named, WorkSafeBC (including Part 14, Part 15 and Part 19 Table 19-1A), BC Crane Safety, Technical Safety BC, applicable ASME B30 standards, manufacturer requirements and site policies. The stricter applicable requirement wins. Law always wins.

Proven is COR® Certified through the BC Construction Safety Alliance. That certification is of this occupational health and safety management system — not a claim that incidents will never occur.

## This site

Next.js (App Router) and TypeScript. No database in this version. Form definitions live as TypeScript. Completed forms stay on the device until someone downloads or emails a PDF.

```bash
npm install
npm run dev
```

Optional server env:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send completed-form PDFs. Without it, the PDF downloads instead. |
| `PROVEN_FORM_FROM` | From address for those emails. `WHOOP_FORM_FROM` still works. |
| `MAPBOX_ACCESS_TOKEN` | Tighter Canadian address lookup. Without it, OpenStreetMap is used. |
| `GOOGLE_SITE_VERIFICATION` | Search Console meta tag, if you are not using the value already in the layout. |

Do not put those keys in client code.
