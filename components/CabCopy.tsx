"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type CabState = {
  state: "off" | "warming" | "ready";
  done: number;
  total: number;
  net: boolean;
};

function isCabPath(path: string) {
  return path === "/sling" || path.startsWith("/sling/") || path === "/safety" || path.startsWith("/safety/");
}

function shouldWarm() {
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return false;
  return true;
}

/** Registers the cab-copy worker. Warms Proven + sling only on those paths. */
export function CabCopy() {
  const path = usePathname();

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "development") {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        for (const reg of regs) void reg.unregister();
      });
      if ("caches" in window) {
        caches.keys().then((keys) => {
          for (const key of keys) void caches.delete(key);
        });
      }
      return;
    }

    let alive = true;
    navigator.serviceWorker
      .register("/sw.js", { updateViaCache: "none" })
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => {
        if (!alive || !reg.active) return;
        if (isCabPath(path) && shouldWarm()) {
          reg.active.postMessage({ type: "cab-warm" });
        }
      });

    function onClick(e: MouseEvent) {
      if (navigator.onLine) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(a.href, location.origin);
      } catch {
        return;
      }
      if (url.origin !== location.origin) return;
      if (!isCabPath(url.pathname)) return;
      e.preventDefault();
      location.href = url.pathname + url.search + url.hash;
    }

    document.addEventListener("click", onClick, true);
    return () => {
      alive = false;
      document.removeEventListener("click", onClick, true);
    };
  }, [path]);

  return null;
}

export function CabLine({ where }: { where: "proven" | "sling" }) {
  const [cab, setCab] = useState<CabState>({
    state: "off",
    done: 0,
    total: 0,
    net: true,
  });

  useEffect(() => {
    const syncNet = () => setCab((c) => ({ ...c, net: navigator.onLine }));
    syncNet();
    window.addEventListener("online", syncNet);
    window.addEventListener("offline", syncNet);

    if (!("serviceWorker" in navigator)) return undefined;
    const onMsg = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.type !== "cab") return;
      setCab((c) => ({
        ...c,
        state: data.state === "ready" ? "ready" : "warming",
        done: Number(data.done) || 0,
        total: Number(data.total) || 0,
      }));
    };
    navigator.serviceWorker.addEventListener("message", onMsg);
    return () => {
      window.removeEventListener("online", syncNet);
      window.removeEventListener("offline", syncNet);
      navigator.serviceWorker.removeEventListener("message", onMsg);
    };
  }, []);

  if (!cab.net) {
    return (
      <p className="mono steel mt">
        Offline. Using the copy on this device. Official files still need a line.
      </p>
    );
  }
  if (cab.state === "warming" && cab.total > 0) {
    return (
      <p className="mono steel mt">
        Cab copy — keeping {cab.done} / {cab.total} pages on this device.
      </p>
    );
  }
  if (cab.state === "ready") {
    return (
      <p className="mono steel mt">
        Cab copy on this device. Readable when the trailer Wi-Fi is dead.
      </p>
    );
  }
  return (
    <p className="mono steel mt">
      {where === "sling"
        ? "Open once on a network. This desk stays on the device after that."
        : "Open once on a network. The program stays on this device after that. Filled forms already do."}
    </p>
  );
}
