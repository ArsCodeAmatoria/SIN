"use client";

import { useEffect, useRef, useState } from "react";
import type { SignatureValue } from "@/lib/form-builder/types";

export function SignatureField({
  value,
  onChange,
  fill,
}: {
  value?: SignatureValue;
  onChange: (v: SignatureValue) => void;
  fill: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [kind, setKind] = useState<"typed" | "drawn">(value?.kind ?? "typed");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || kind !== "drawn") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#101010";
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    if (value?.dataUrl) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      img.src = value.dataUrl;
    }
  }, [kind, value?.dataUrl]);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    };
  }

  function commitDrawn() {
    const c = canvasRef.current;
    if (!c) return;
    onChange({
      kind: "drawn",
      printed: value?.printed ?? "",
      date: value?.date ?? new Date().toISOString().slice(0, 10),
      dataUrl: c.toDataURL("image/png"),
    });
  }

  if (!fill) {
    return (
      <p className="fb-sig-line">
        {value?.typed || value?.printed || "Signature"}
      </p>
    );
  }

  return (
    <div className="fb-sig">
      <div className="tabs fb-sig-tabs">
        <button
          type="button"
          className={kind === "typed" ? "is-on" : undefined}
          onClick={() => setKind("typed")}
        >
          TYPED
        </button>
        <button
          type="button"
          className={kind === "drawn" ? "is-on" : undefined}
          onClick={() => setKind("drawn")}
        >
          DRAWN
        </button>
      </div>
      {kind === "typed" ? (
        <input
          className="fb-sig-typed"
          placeholder="Type your name"
          value={value?.typed ?? ""}
          onChange={(e) =>
            onChange({
              kind: "typed",
              printed: value?.printed ?? e.target.value,
              date: value?.date ?? new Date().toISOString().slice(0, 10),
              typed: e.target.value,
            })
          }
        />
      ) : (
        <div>
          <canvas
            ref={canvasRef}
            className="fb-sig-pad"
            width={560}
            height={140}
            onPointerDown={(e) => {
              drawing.current = true;
              const ctx = canvasRef.current?.getContext("2d");
              const p = pos(e);
              ctx?.beginPath();
              ctx?.moveTo(p.x, p.y);
            }}
            onPointerMove={(e) => {
              if (!drawing.current) return;
              const ctx = canvasRef.current?.getContext("2d");
              const p = pos(e);
              ctx?.lineTo(p.x, p.y);
              ctx?.stroke();
            }}
            onPointerUp={() => {
              drawing.current = false;
              commitDrawn();
            }}
          />
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              const c = canvasRef.current;
              c?.getContext("2d")?.clearRect(0, 0, c.width, c.height);
              onChange({
                kind: "drawn",
                printed: value?.printed ?? "",
                date: value?.date ?? "",
                dataUrl: undefined,
              });
            }}
          >
            CLEAR
          </button>
        </div>
      )}
    </div>
  );
}
