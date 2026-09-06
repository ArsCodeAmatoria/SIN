"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadProgress,
  selectDrillQuestions,
  weakestCategories,
  type DisciplineProgress,
} from "@/lib/redtc/progress";
import type { Question } from "@/lib/redtc/types";

export function PracticeProgress({
  storageKey,
  bank,
  drillHref,
  kicker,
  compact = false,
}: {
  storageKey: string;
  bank: Question[];
  drillHref: string;
  kicker: string;
  compact?: boolean;
}) {
  const [progress, setProgress] = useState<DisciplineProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress(storageKey));
  }, [storageKey]);

  if (!progress || (progress.attempted === 0 && progress.masterAttempts === 0)) {
    return null;
  }

  const pct = progress.attempted
    ? Math.round((progress.correct / progress.attempted) * 100)
    : 0;
  const weak = weakestCategories(progress, 3);
  const drill = selectDrillQuestions(bank, progress);

  return (
    <section className={compact ? "practice-progress mt-2" : "section wrap"}>
      <p className="mono kicker">{kicker}</p>
      {compact ? null : <p className="lede mt-2">Stored on this device only.</p>}
      <div className="place mt-2">
        <article>
          <span className="mono steel">Attempted</span>
          <h3 className="display">{progress.attempted}</h3>
        </article>
        <article>
          <span className="mono steel">Correct</span>
          <h3 className="display">{progress.correct}</h3>
        </article>
        <article>
          <span className="mono steel">Percent</span>
          <h3 className="display">{pct}%</h3>
        </article>
        <article>
          <span className="mono steel">Master best</span>
          <h3 className="display">
            {progress.masterBest == null ? "—" : `${progress.masterBest}%`}
          </h3>
        </article>
      </div>
      {weak.length > 0 ? (
        <ul className="std-list mt-2">
          {weak.map((item) => (
            <li key={item.name}>
              <h3 className="display">{item.name}</h3>
              <p>
                {item.pct}% · {item.correct}/{item.attempted} · study this
              </p>
            </li>
          ))}
        </ul>
      ) : null}
      {drill.length > 0 ? (
        <div className="inline-cta">
          <Link className="btn btn-solid" href={drillHref}>
            Drill misses ({drill.length})
          </Link>
        </div>
      ) : null}
    </section>
  );
}
