import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export function assetDestination(pointer) {
  const url = new URL(pointer.url, "https://assets.invalid");
  if (url.origin !== "https://assets.invalid" || !url.pathname.startsWith("/__l5e/assets-v1/") || url.search || url.hash) {
    throw new Error("Asset pointer must use a local Lovable Assets path.");
  }
  const segments = url.pathname.slice(1).split("/");
  if (segments.some(segment => /[\\/]/.test(decodeURIComponent(segment)) || [".", ".."].includes(decodeURIComponent(segment)))) {
    throw new Error("Unsafe asset destination.");
  }
  return segments.join("/");
}

export function validateAssetResponse(pointer, response, bytes) {
  if (!response.ok) throw new Error(`Asset download failed: HTTP ${response.status}`);
  const type = response.headers.get("content-type")?.split(";")[0].trim();
  if (!type || type === "text/html") throw new Error("Asset download returned a page instead of media.");
  if (pointer.size !== bytes.byteLength) throw new Error("Asset size differs from its approved pointer.");
}

export async function prepareCloudflareAssets(root, sourceOrigin, outputDirectory = path.join(root, "public")) {
  const origin = new URL(sourceOrigin);
  if (origin.protocol !== "https:" || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) {
    throw new Error("LOVABLE_ASSET_ORIGIN must be a public HTTPS origin without credentials or a path.");
  }
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(file);
      else if (entry.name.endsWith(".asset.json")) {
        const pointer = JSON.parse(await readFile(file, "utf8"));
        const destination = path.join(outputDirectory, assetDestination(pointer));
        const response = await fetch(new URL(pointer.url, origin), { signal: AbortSignal.timeout(60000), redirect: "error" });
        const bytes = new Uint8Array(await response.arrayBuffer());
        validateAssetResponse(pointer, response, bytes);
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, bytes);
        console.log(`Prepared approved media: ${pointer.original_filename}`);
      }
    }
  }
  await visit(path.join(root, "src"));
}