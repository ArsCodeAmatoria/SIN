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
}: {
  items: MobileQuestion[];
  showSourceSplit?: boolean;
  compact?: boolean;
}) {
  const stats = mobileBankStats(items);
  const countLabel = `${stats.total.toLocaleString("en-CA")} Mobile Crane Questions`;

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

      <p className="mono kicker mt-2">By exam level</p>
      <div className="place mt">
        {MOBILE_EXAM_LEVELS.map((level) => (
          <article key={level}>
            <span className="mono steel">{EXAM_LABEL[level]}</span>
            <h3 className="display">{stats.byExamLevel[level]}</h3>
          </article>
        ))}
      </div>

      <p className="mono kicker mt-2">By Red Seal MWA</p>
      <div>
        {MOBILE_MWA.map((block) => (
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
            {REDMC_CATEGORIES.map((name, i) => (
              <li key={name}>
                <p className="mono steel">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="display">{name}</h3>
                <p>
                  {stats.byCategory[name]
                    ? `${stats.byCategory[name]} question${stats.byCategory[name] === 1 ? "" : "s"}`
                    : "Ready for questions"}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
