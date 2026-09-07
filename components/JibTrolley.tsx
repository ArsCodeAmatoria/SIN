"use client";

import { useId, useMemo, useState } from "react";
import { EC_B, clampRadius, ecBAt } from "@/lib/liebherr-470-ec-b";

const START = 40;
const SLEW_C = 50;
const SLEW_MAX = 42;

function fmt(n: number, digits = 0) {
  return n.toLocaleString("en-CA", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

function snap(m: number) {
  return Math.round(clampRadius(m) * 10) / 10;
}

function radiusFromSlew(svg: SVGSVGElement, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / Math.max(rect.width, 1)) * 100 - SLEW_C;
  const y = ((clientY - rect.top) / Math.max(rect.height, 1)) * 100 - SLEW_C;
  return snap((Math.hypot(x, y) / SLEW_MAX) * EC_B.jibM);
}

export function JibTrolley() {
  const id = useId();
  const [radius, setRadius] = useState(START);
  const read = useMemo(() => ecBAt(radius), [radius]);
  const rSvg = SLEW_MAX * (read.radiusM / EC_B.jibM);
  const carX = SLEW_C + rSvg;
  const carY = SLEW_C;

  function onSlewPointer(e: React.PointerEvent<SVGSVGElement>) {
    setRadius(radiusFromSlew(e.currentTarget, e.clientX, e.clientY));
  }

  return (
    <figure className="jib-dash">
      <p className="mono jib-name">
        {EC_B.name} · {EC_B.jibM.toFixed(1)} m jib · {EC_B.mode}
      </p>
      <div className="jib-dash-graphs">
        <div className="jib-plot">
          <label className="visually-hidden" htmlFor={id}>
            Trolley radius, metres
          </label>
          <input
            id={id}
            className="jib-range"
            type="range"
            min={EC_B.minRadiusM}
            max={EC_B.jibM}
            step={0.1}
            value={read.radiusM}
            onChange={(e) => setRadius(Number(e.target.value))}
            aria-valuetext={`${fmt(read.radiusM, 1)} metres, ${fmt(read.circM, 1)} metres around, ${fmt(read.kg)} kilograms`}
          />
          <p className="jib-ends mono steel" aria-hidden>
            <span>{EC_B.minRadiusM.toFixed(1)} m</span>
            <span>{EC_B.jibM.toFixed(1)} m</span>
          </p>
        </div>
        <svg
          className="slew"
          viewBox="0 0 100 100"
          aria-hidden
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            onSlewPointer(e);
          }}
          onPointerMove={(e) => {
            if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
            onSlewPointer(e);
          }}
        >
          <circle className="slew-max" cx={SLEW_C} cy={SLEW_C} r={SLEW_MAX} />
          <circle className="slew-path" cx={SLEW_C} cy={SLEW_C} r={rSvg} />
          <line className="slew-jib" x1={SLEW_C} y1={SLEW_C} x2={carX} y2={carY} />
          <rect className="slew-mast" x={SLEW_C - 1.4} y={SLEW_C - 1.4} width={2.8} height={2.8} />
          <circle className="slew-car" cx={carX} cy={carY} r={2.4} />
        </svg>
      </div>
      <div className="jib-out">
        <div>
          <p className="mono">RADIUS</p>
          <p>
            <span className="display">{fmt(read.radiusM, 1)} m</span>
            <span className="jib-alt">{fmt(read.radiusFt, 1)} ft</span>
          </p>
        </div>
        <div>
          <p className="mono">CAPACITY</p>
          <p>
            <span className="display">{fmt(read.kg)} kg</span>
            <span className="jib-alt">{fmt(read.lb)} lb</span>
          </p>
        </div>
        <div>
          <p className="mono">PERIMETER</p>
          <p>
            <span className="display">{fmt(read.circM, 1)} m</span>
            <span className="jib-alt">{fmt(read.circFt, 1)} ft</span>
          </p>
        </div>
      </div>
    </figure>
  );
}
