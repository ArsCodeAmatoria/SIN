import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildOhsPack, PACK_FILENAME } from "../lib/ohs/pack";

async function main() {
  console.log("Building OH&S pack…");
  const started = Date.now();
  const { bytes, files } = await buildOhsPack();
  const outDir = path.join(process.cwd(), "public/downloads");
  mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, PACK_FILENAME);
  writeFileSync(out, bytes);
  console.log(
    `${files.length} files  ${(bytes.byteLength / 1024 / 1024).toFixed(2)} MB  ${Date.now() - started} ms`,
  );
  console.log(out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
