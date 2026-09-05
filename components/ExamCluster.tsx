import Link from "next/link";

const TOWER = [
  { href: "/tower-crane-red-seal-practice-test", label: "Red Seal IP" },
  { href: "/tower-crane-level-b-practice-test", label: "Level B" },
  { href: "/tower-crane-level-1-practice-test", label: "Level 1" },
  { href: "/tower-crane-level-2-practice-test", label: "Level 2" },
  { href: "/tower-crane-load-chart-practice", label: "Load charts" },
  { href: "/bc-tower-crane-certification", label: "Certification" },
] as const;

const MOBILE = [
  { href: "/mobile-crane-red-seal-practice-test", label: "Red Seal IP" },
  { href: "/bc-mobile-crane-certification", label: "Certification" },
  { href: "/mobile-crane-load-chart-practice", label: "Load charts" },
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
