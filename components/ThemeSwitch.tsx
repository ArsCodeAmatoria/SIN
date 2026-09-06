"use client";

import { useEffect, useState } from "react";

function readTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next = readTheme() === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("wire-theme", next);
      localStorage.removeItem("whoop-theme");
    } catch {
      /* ignore */
    }
  }

  if (!theme) {
    return <div className="switch-shell switch-pending" aria-hidden />;
  }

  const lightsOn = theme === "light";

  return (
    <button
      type="button"
      className={`switch-shell${lightsOn ? " is-on" : ""}`}
      role="switch"
      aria-checked={lightsOn}
      aria-label={
        lightsOn
          ? "Light mode. Switch to dark."
          : "Dark mode. Switch to light."
      }
      onClick={toggle}
    >
      <span className="switch-housing">
        <span className="switch-track">
          <span className="switch-mark switch-mark-on">LIGHT</span>
          <span className="switch-mark switch-mark-off">DARK</span>
        </span>
        <span className="switch-knob" aria-hidden>
          <span className="switch-knob-face">
            <span className="switch-knob-dot" />
            <span className="switch-grips">
              <span />
              <span />
              <span />
            </span>
          </span>
        </span>
        <span className="switch-led" aria-hidden />
      </span>
    </button>
  );
}
