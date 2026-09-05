import Link from "next/link";
import { formatWireDate, wirePath, type WireSummary } from "@/lib/whoopwire";

export function WireStoryLink({
  story,
  size = "row",
}: {
  story: WireSummary;
  size?: "row" | "home";
}) {
  return (
    <article className={size === "home" ? "wire-home-story" : "wire-row"}>
      <Link href={wirePath(story.slug)}>
        <div className="wire-row-meta mono">
          <span>{story.category}</span>
          <span>{formatWireDate(story.published)}</span>
        </div>
        <h3 className="display">{story.title}</h3>
        <p>{story.excerpt}</p>
        <span className="mono steel">READ STORY →</span>
      </Link>
    </article>
  );
}
