import type { MobileQuestion } from "../types";
import { assertMobileBank } from "../to-quiz";
import { BATCH_01 } from "./batch-01";
import { BATCH_02 } from "./batch-02";

// Future packs append here. Do not invent questions to fill a count.
// Batch 2 — B.C. Regulations, Provisional Certification & Rigging
// Batch 3 — Rigging
// Batch 4 — Hoisting Calculations
// Batch 5 — Hydraulic Crane Load Charts
// Batch 6 — Lattice Crane Load Charts
// Batch 7 — Assembly / Disassembly
// Batch 8 — Advanced Red Seal Operations
// Batch 9 — Provisional Exam Practice
// Batch 10 — Full 110-question Red Seal Pool Expansion

export const MOBILE_QUESTIONS: MobileQuestion[] = [...BATCH_01, ...BATCH_02];

assertMobileBank(MOBILE_QUESTIONS);
