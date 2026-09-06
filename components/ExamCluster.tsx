import Link from "next/link";

const TOWER = [
  { href: "/tower-crane-red-seal-practice-test", label: "Red Seal practice test" },
  { href: "/tower-crane-level-b-exam-bc", label: "Level B exam" },
  { href: "/tower-crane-level-1-practice-test", label: "Level 1 exam" },
  { href: "/tower-crane-level-2-practice-test", label: "Level 2 exam" },
  { href: "/tower-crane-load-chart-practice", label: "Load chart practice" },
  { href: "/redtc/rigging-charts", label: "Rigging charts" },
  { href: "/tower-crane-certification-bc", label: "Certification in B.C." },
] as const;

const MOBILE = [
  { href: "/mobile-crane-red-seal-practice-test", label: "Red Seal practice test" },
  { href: "/bc-mobile-crane-certification", label: "Certification in B.C." },
  { href: "/mobile-crane-load-chart-practice", label: "Load chart practice" },
  { href: "/redmc/rigging-charts", label: "Rigging charts" },
] as const;

export function ExamCluster({
  tone = "both",
}: {
  tone?: "tower" | "mobile" | "both";
}) {
  return (
    <div className="exam-cluster">
      {tone !== "mobile" ? (
        <p className="mono steel">
          Tower{" "}
          {TOWER.map((item, i) => (
            <span key={item.href}>
              {i ? " · " : ""}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </p>
      ) : null}
      {tone !== "tower" ? (
        <p className="mono steel">
          Mobile{" "}
          {MOBILE.map((item, i) => (
            <span key={item.href}>
              {i ? " · " : ""}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}
