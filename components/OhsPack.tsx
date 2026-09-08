import { SAFETY, SAFETY_GROUPS } from "@/lib/safety";
import { SDS } from "@/lib/ohs/sds";
import { MANUFACTURER_SDS } from "@/lib/ohs/sds-manufacturer";
import { PACK_FILENAME, ohsPackOutline, type PackNode } from "@/lib/ohs/pack-outline";

function Tree({ nodes }: { nodes: PackNode[] }) {
  return (
    <ul className="ohs-pack-tree">
      {nodes.map((node) => (
        <li key={node.name}>
          <span>{node.name}</span>
          {node.note ? <em> {node.note}</em> : null}
          {node.children?.length ? <Tree nodes={node.children} /> : null}
        </li>
      ))}
    </ul>
  );
}

export function PackOutline() {
  return <Tree nodes={ohsPackOutline()} />;
}

export function PackTabs() {
  return (
    <ol className="ohs-pack-tabs">
      {SAFETY_GROUPS.map((group) => (
        <li key={group.id}>
          <p className="mono steel">{group.label}</p>
          <ol>
            {group.slugs.map((slug) => {
              const section = SAFETY.find((item) => item.slug === slug);
              if (!section) return null;
              return (
                <li key={slug}>
                  <strong>{section.num}</strong>
                  <span>{section.title}</span>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export function PackSdsIndex() {
  return (
    <table className="wire-table">
      <thead>
        <tr>
          <th className="mono">FIELD CARD</th>
          <th className="mono">PRODUCT</th>
          <th className="mono">MAKER</th>
        </tr>
      </thead>
      <tbody>
        {MANUFACTURER_SDS.map((item) => {
          const field = SDS.find((doc) => doc.slug === item.fieldSlug);
          return (
            <tr key={item.file}>
              <td>{field?.title ?? item.fieldSlug}</td>
              <td>
                <a href={`/downloads/sds/${item.file}`}>{item.product}</a>
              </td>
              <td>{item.maker}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function PackDownload() {
  return (
    <p className="mt-2">
      <a className="btn btn-solid" href="/safety/pack/download" download={PACK_FILENAME}>
        DOWNLOAD THE OH&S ZIP
      </a>
    </p>
  );
}
