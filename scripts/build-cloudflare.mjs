import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { loadEnv } from "vite";
import { prepareCloudflareAssets } from "./cloudflare-assets.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...loadEnv("production", root, "VITE_"), ...process.env };
for (const key of ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"]) {
  if (!env[key]?.trim()) throw new Error(`Set ${key} in Cloudflare Pages build variables before building.`);
}
const result = spawnSync(process.execPath, [path.join(root, "node_modules/vite/bin/vite.js"), "build"], {
  cwd: root,
  env,
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await prepareCloudflareAssets(root, process.env.LOVABLE_ASSET_ORIGIN || "https://svudatascience.lovable.app", path.join(root, "dist"));