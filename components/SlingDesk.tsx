"use client";

import { useMemo, useState } from "react";
import { SlingAngleDiagram } from "@/components/SlingAngleDiagram";
import {
  compareWll,
  formatTension,
  slingAngleFromHL,
  SLING_ANGLE_ROWS,
  twoLegTension,
} from "@/lib/sling-math";

export function SlingDesk() {
  const [height, setHeight] = useState("2");
  const [length, setLength] = useState("4");
  const [angle, setAngle] = useState("60");
  const [load, setLoad] = useState("4000");
  const [wll, setWll] = useState("");

  const measured = useMemo(
    () => slingAngleFromHL(Number(height), Number(length)),
    [height, length],
  );
  const theta = measured.ok ? measured.theta : Number(angle);
  const tension = useMemo(() => twoLegTension(Number(load), theta), [load, theta]);
  const tag = useMemo(
    () => (tension.ok ? compareWll(tension.tension, Number(wll)) : { ok: false as const }),
    [tension, wll],
  );

  return (
    <div className="desk">
      <SlingAngleDiagram />

      <section className="desk-block" aria-labelledby="desk-tape">
        <p className="mono kicker" id="desk-tape">
          01 — θ FROM THE TAPE
        </p>
        <p className="display desk-formula">θ = SIN⁻¹ (H / L)</p>
        <div className="desk-fields">
          <label className="field">
            <span>HEIGHT H</span>
            <input
              type="number"
              min="0"
              step="any"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              inputMode="decimal"
              enterKeyHint="next"
            />
          </label>
          <label className="field">
            <span>SLING LENGTH L</span>
            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              inputMode="decimal"
              enterKeyHint="next"
            />
          </label>
        </div>
        {!measured.ok && measured.reason === "impossible" ? (
          <p className="wire-calc-warn mono">
            HEIGHT CANNOT BE LONGER THAN THE SLING. MEASURE AGAIN.
          </p>
        ) : measured.ok ? (
          <dl className="wire-calc-out" aria-live="polite">
            <div>
              <dt className="mono">H / L</dt>
              <dd className="display">{measured.ratio.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="mono">sin(θ)</dt>
              <dd className="display">{measured.ratio.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="mono">θ FROM HORIZONTAL</dt>
              <dd className="display">{measured.theta.toFixed(1)}°</dd>
            </div>
          </dl>
        ) : (
          <p className="steel mt">
            Same units. Leave blank and type θ below if you already have the angle.
          </p>
        )}
      </section>

      <section className="desk-block" aria-labelledby="desk-tension">
        <p className="mono kicker" id="desk-tension">
          02 — T FROM SIN()
        </p>
        <p className="display desk-formula">T = W / (2 × SIN θ)</p>
        <div className="desk-fields">
          <label className="field">
            <span>LOAD W</span>
            <input
              type="number"
              min="1"
              step="any"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              inputMode="decimal"
              enterKeyHint="next"
            />
          </label>
          {measured.ok ? (
            <p className="desk-locked">
              <span className="mono steel">θ FROM THE TAPE</span>
              <strong className="display">{measured.theta.toFixed(1)}°</strong>
            </p>
          ) : (
            <label className="field">
              <span>ANGLE θ FROM HORIZONTAL</span>
              <input
                type="number"
                min="1"
                max="90"
                step="any"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                inputMode="decimal"
                enterKeyHint="next"
              />
            </label>
          )}
        </div>
        {tension.ok ? (
          <dl className="wire-calc-out" aria-live="polite">
            <div>
              <dt className="mono">sin(θ)</dt>
              <dd className="display">{tension.sin.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="mono">1 / sin(θ)</dt>
              <dd className="display">{tension.factor.toFixed(3)}</dd>
            </div>
            <div>
              <dt className="mono">T PER LEG</dt>
              <dd className="display">{formatTension(tension.tension)}</dd>
            </div>
          </dl>
        ) : (
          <p className="steel mt">Enter a load and an angle between 1° and 90°.</p>
        )}
      </section>

      <section className="desk-block" aria-labelledby="desk-wll">
        <p className="mono kicker" id="desk-wll">
          03 — COMPARE TO THE TAG
        </p>
        <p className="display desk-formula">T ≤ WLL</p>
        <div className="desk-fields">
          <label className="field">
            <span>WLL PER LEG</span>
            <input
              type="number"
              min="1"
              step="any"
              value={wll}
              onChange={(e) => setWll(e.target.value)}
              inputMode="decimal"
              enterKeyHint="done"
            />
          </label>
          <p className="desk-locked">
            <span className="mono steel">SAME UNITS AS W</span>
            <strong className="display">TAG</strong>
          </p>
        </div>
        {tag.ok && tension.ok ? (
          <dl className="wire-calc-out" aria-live="polite">
            <div>
              <dt className="mono">T / WLL</dt>
              <dd className="display">{Math.round(tag.ratio * 100)}%</dd>
            </div>
            <div>
              <dt className="mono">LEFT ON THE TAG</dt>
              <dd className="display">
                {tag.fit ? formatTension(Number(wll) - tension.tension) : "—"}
              </dd>
            </div>
            <div>
              <dt className="mono">RESULT</dt>
              <dd className={`display${tag.fit ? "" : " desk-over"}`}>
                {tag.fit ? "FITS" : "OVER"}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="steel mt">
            Optional. Read the sling tag after hitch and angle — not before.
          </p>
        )}
        {tag.ok && !tag.fit ? (
          <p className="wire-calc-warn mono">
            T IS OVER THE TAG. CHANGE THE HITCH. DO NOT HOPE THE STEEL IS GENEROUS.
          </p>
        ) : null}
      </section>

      {((measured.ok && measured.low) || (tension.ok && tension.low)) ? (
        <p className="wire-calc-warn mono">
          BELOW 30° WE DO NOT RIG THIS WAY UNLESS AN ENGINEER OWNS THE NUMBERS.
        </p>
      ) : null}

      <p className="mono steel desk-note">
        Two equal legs. Centre of gravity in the middle. Vertical lift. θ from the
        horizontal — not the angle between the legs. H is hook centreline to the
        load connection. L is along the sling. This is the tag WLL. Choker and
        basket still apply. Three- and four-leg: if the load can tilt, design as
        two legs carrying.
      </p>

      <figure className="wire-table-wrap desk-table">
        <figcaption className="mono">
          Two-leg bridle. Factor = 1 / sin(θ). T is for W = 4000 in the same unit.
        </figcaption>
        <table className="wire-table">
          <thead>
            <tr>
              <th className="mono">H / L</th>
              <th className="mono">θ</th>
              <th className="mono">SIN θ</th>
              <th className="mono">FACTOR</th>
              <th className="mono">T IF W = 4000</th>
              <th className="mono">WHAT IT MEANS</th>
            </tr>
          </thead>
          <tbody>
            {SLING_ANGLE_ROWS.map((row) => (
              <tr key={row.theta}>
                <td className="mono">{row.hl}</td>
                <td className="display">{row.theta}</td>
                <td>{row.sin}</td>
                <td>{row.factor}</td>
                <td className="display">{row.t4000}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </div>
  );
}

export function DeskPrintButton() {
  return (
    <button type="button" className="btn btn-ghost desk-print" onClick={() => window.print()}>
      Print this desk
    </button>
  );
}
