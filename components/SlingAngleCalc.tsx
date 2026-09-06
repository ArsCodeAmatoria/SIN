"use client";

import { useMemo, useState } from "react";
import { slingAngleFromHL } from "@/lib/sling-math";

export function SlingAngleCalc() {
  const [height, setHeight] = useState("2");
  const [length, setLength] = useState("4");
  const h = Number(height);
  const l = Number(length);

  const result = useMemo(() => slingAngleFromHL(h, l), [h, l]);

  return (
    <div className="wire-calc">
      <p className="mono steel">θ = SIN⁻¹ (H / L)</p>
      <div className="wire-calc-fields">
        <label className="field">
          <span className="mono steel">HEIGHT H</span>
          <input
            type="number"
            min="0"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            inputMode="decimal"
          />
        </label>
        <label className="field">
          <span className="mono steel">SLING LENGTH L</span>
          <input
            type="number"
            min="0"
            step="any"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            inputMode="decimal"
          />
        </label>
      </div>
      {!result.ok && result.reason === "impossible" ? (
        <p className="wire-calc-warn mono">
          HEIGHT CANNOT BE LONGER THAN THE SLING. MEASURE AGAIN.
        </p>
      ) : result.ok ? (
        <dl className="wire-calc-out">
          <div>
            <dt className="mono">H / L</dt>
            <dd className="display">{result.ratio.toFixed(3)}</dd>
          </div>
          <div>
            <dt className="mono">sin(θ)</dt>
            <dd className="display">{result.ratio.toFixed(3)}</dd>
          </div>
          <div>
            <dt className="mono">θ FROM HORIZONTAL</dt>
            <dd className="display">{result.theta.toFixed(1)}°</dd>
          </div>
        </dl>
      ) : (
        <p className="steel mt">Enter height and sling length in the same unit.</p>
      )}
      {result.ok && result.low ? (
        <p className="wire-calc-warn mono">
          BELOW 30° WE DO NOT RIG THIS WAY UNLESS AN ENGINEER OWNS THE NUMBERS.
        </p>
      ) : null}
      <p className="mono steel wire-calc-note">
        H is vertical from hook centreline to the load connection. L is along the
        sling, hook to connection. Same units. θ is from the horizontal.
      </p>
    </div>
  );
}
