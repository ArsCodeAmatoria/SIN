import { SITE } from "@/lib/site";

/** Lucide quote — https://lucide.dev/icons/quote */
export const QUOTE_MARK_PATHS = [
  "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
  "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
] as const;

export function QuoteMark({ className = "quote-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {QUOTE_MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function SiteName({ className }: { className?: string }) {
  return (
    <span className={["site-name", className].filter(Boolean).join(" ")}>
      {SITE.name.replace("()", "")}
      <QuoteMark />
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="brand">
      <span className="brand-name">
        <SiteName />
      </span>
    </span>
  );
}
