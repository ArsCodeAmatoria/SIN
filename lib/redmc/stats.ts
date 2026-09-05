import type { MobileExamLevel, MobileMwa, MobileQuestion } from "./types";
import { MOBILE_EXAM_LEVELS, MOBILE_MWA } from "./types";

export function countByCategory(items: MobileQuestion[]) {
  const counts: Record<string, number> = {};
  for (const q of items) {
    counts[q.category] = (counts[q.category] || 0) + 1;
  }
  return counts;
}

export function countByExamLevel(items: MobileQuestion[]) {
  return Object.fromEntries(
    MOBILE_EXAM_LEVELS.map((level) => [
      level,
      items.filter((q) => q.examLevels.includes(level)).length,
    ]),
  ) as Record<MobileExamLevel, number>;
}

export function countByMwa(items: MobileQuestion[]) {
  return Object.fromEntries(
    MOBILE_MWA.map((block) => [
      block.letter,
      items.filter((q) => q.redSealMWA === block.letter).length,
    ]),
  ) as Record<MobileMwa, number>;
}

export function mobileBankStats(items: MobileQuestion[]) {
  const verified = items.filter((q) => q.sourceVerified).length;
  return {
    total: items.length,
    byCategory: countByCategory(items),
    byExamLevel: countByExamLevel(items),
    byMwa: countByMwa(items),
    verified,
    unverified: items.length - verified,
    calculations: items.filter((q) => q.calculation).length,
  };
}
