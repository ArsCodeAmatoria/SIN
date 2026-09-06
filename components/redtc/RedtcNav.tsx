"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { REDTC_NAV } from "@/lib/redtc/bank";

export function RedtcNav() {
  const path = usePathname();

  return (
    <nav className="redtc-strip" aria-label="REDTC">
      {REDTC_NAV.map((item) => {
        const active =
          item.href === "/redtc"
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
  );
}
