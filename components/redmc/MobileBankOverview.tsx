import { REDMC_CATEGORIES } from "@/lib/redmc/copy";
import { mobileBankStats } from "@/lib/redmc/stats";
import { MOBILE_EXAM_LEVELS, MOBILE_MWA, type MobileQuestion } from "@/lib/redmc/types";

const EXAM_LABEL: Record<(typeof MOBILE_EXAM_LEVELS)[number], string> = {
  provisional: "Provisional",
  level1: "Level 1",
  level2: "Level 2",
  level3: "Level 3",
  redseal: "Red Seal",
};

export function MobileBankOverview({
  items,
  showSourceSplit = false,
  compact = false,
  extraBankNote,
}: {
  items: MobileQuestion[];
  showSourceSplit?: boolean;
  compact?: boolean;
  extraBankNote?: string;
}) {
  const stats = mobileBankStats(items);
  const countLabel = `${stats.total.toLocaleString("en-CA")} Mobile Crane Questions`;
  const categoriesWithQuestions = REDMC_CATEGORIES.filter((name) => stats.byCategory[name]);
  const mwaWithQuestions = MOBILE_MWA.filter((block) => stats.byMwa[block.letter]);

  return (
    <>
      <div className="place mt-2">
        <article>
          <span className="mono steel">Bank</span>
          <h3 className="display">{stats.total.toLocaleString("en-CA")}</h3>
          <p>{countLabel}</p>
        </article>
        <article>
          <span className="mono steel">Calculations</span>
          <h3 className="display">{stats.calculations}</h3>
        </article>
        {showSourceSplit ? (
          <>
            <article>
              <span className="mono steel">Verified</span>
              <h3 className="display">{stats.verified}</h3>
            </article>
            <article>
              <span className="mono steel">Unchecked</span>
              <h3 className="display">{stats.unverified}</h3>
            </article>
          </>
        ) : null}
      </div>
      {extraBankNote ? <p className="steel mt">{extraBankNote}</p> : null}
      <p className="steel mt">
        Questions may be tagged to more than one exam level; level counts therefore overlap.
      </p>

      <p className="mono kicker mt-2">By exam level</p>
      <div className="place mt">
        {MOBILE_EXAM_LEVELS.map((level) => {
          if (level === "level2") {
            return (
              <article key={level}>
                <span className="mono steel">{EXAM_LABEL[level]}</span>
                <h3 className="display">—</h3>
                <p>Technical training. No separate SLE.</p>
              </article>
            );
          }
          const count = stats.byExamLevel[level];
          if (!count) return null;
          return (
            <article key={level}>
              <span className="mono steel">{EXAM_LABEL[level]}</span>
              <h3 className="display">{count}</h3>
            </article>
          );
        })}
      </div>

      <p className="mono kicker mt-2">By Red Seal MWA</p>
      <div>
        {mwaWithQuestions.map((block) => (
          <article className="service" key={block.letter}>
            <span className="mono steel">{block.letter}</span>
            <h3 className="display">{stats.byMwa[block.letter]}</h3>
            <p>{block.name}</p>
          </article>
        ))}
      </div>

      {compact ? null : (
        <>
          <p className="mono kicker mt-2">By category</p>
          <ul className="std-list mt">
            {categoriesWithQuestions.map((name, i) => (
              <li key={name}>
                <p className="mono steel">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display">{name}</h3>
                <p>
                  {`${stats.byCategory[name]} question${stats.byCategory[name] === 1 ? "" : "s"}`}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
