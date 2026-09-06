"use client";

import { useMemo, useState } from "react";
import { formatTension, twoLegTension } from "@/lib/sling-math";

export function SlingSinCalc() {
  const [load, setLoad] = useState("4000");
  const [angle, setAngle] = useState("60");
  const w = Number(load);
  const theta = Number(angle);

  const result = useMemo(() => twoLegTension(w, theta), [w, theta]);

  return (
    <div className="wire-calc">
      <p className="mono steel">T = W / (2 × SIN θ)</p>
      <div className="wire-calc-fields">
        <label className="field">
          <span className="mono steel">LOAD W</span>
          <input
            type="number"
            min="1"
            step="any"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            inputMode="decimal"
          />
        </label>
        <label className="field">
          <span className="mono steel">ANGLE θ FROM HORIZONTAL</span>
          <input
            type="number"
            min="1"
            max="90"
            step="1"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            inputMode="decimal"
          />
        </label>
      </div>
      {result.ok ? (
        <dl className="wire-calc-out">
          <div>
            <dt className="mono">sin(θ)</dt>
            <dd className="display">{result.sin.toFixed(3)}</dd>
          </div>
          <div>
            <dt className="mono">1 / sin(θ)</dt>
            <dd className="display">{result.factor.toFixed(3)}</dd>
          </div>
          <div>
            <dt className="mono">T PER LEG</dt>
            <dd className="display">{formatTension(result.tension)}</dd>
          </div>
        </dl>
      ) : (
        <p className="steel mt">Enter a load and an angle between 1° and 90°.</p>
      )}
      {result.ok && result.low ? (
        <p className="wire-calc-warn mono">
          BELOW 30° WE DO NOT RIG THIS WAY UNLESS AN ENGINEER OWNS THE NUMBERS.
        </p>
      ) : null}
      <p className="mono steel wire-calc-note">
        Two equal legs. Centre of gravity in the middle. Vertical lift. Units of
        T match units of W.
      </p>
    </div>
  );
}
