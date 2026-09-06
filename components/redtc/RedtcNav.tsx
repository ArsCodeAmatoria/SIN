"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { REDTC_NAV } from "@/lib/redtc/bank";
import { REDMC_NAV } from "@/lib/redmc/bank";

function peerPath(path: string, to: "tower" | "mobile") {
  const from = to === "mobile" ? "/redtc" : "/redmc";
  const dest = to === "mobile" ? "/redmc" : "/redtc";
  if (path.startsWith(`${from}/test/master`)) return `${dest}/test/master`;
  if (path.startsWith(`${from}/test/review`)) return `${dest}/test/review`;
  if (path.startsWith(`${from}/load-charts`)) return `${dest}/load-charts`;
  if (path.startsWith(`${from}/rigging-charts`)) return `${dest}/rigging-charts`;
  if (path.startsWith(`${from}/test`)) return `${dest}/test`;
  return dest;
}

export function RedtcNav() {
  const path = usePathname();
  const mobile = path.startsWith("/redmc");
  const items = mobile ? REDMC_NAV : REDTC_NAV;

  return (
    <>
      <nav className="redtc-crane" aria-label="Crane discipline">
        <Link
          href={peerPath(path, "tower")}
          className={!mobile ? "active" : undefined}
        >
          Tower Crane
        </Link>
        <Link
          href={peerPath(path, "mobile")}
          className={mobile ? "active" : undefined}
        >
          Mobile Crane
        </Link>
      </nav>
      <nav className="redtc-strip" aria-label={mobile ? "REDMC" : "REDTC"}>
        {items.map((item) => {
          const active =
            item.href === (mobile ? "/redmc" : "/redtc")
              ? path === item.href
              : item.href.endsWith("/test")
                ? path === item.href
                : path === item.href || path.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : undefined}>
              <span className="mono">{item.num}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
