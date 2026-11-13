import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const config = JSON.parse(readFileSync(`${process.cwd()}/wrangler.workers.jsonc`, "utf8"));

describe("Cloudflare Workers frontend hosting", () => {
  it("serves the built frontend as static assets", () => {
    expect(config.assets.directory).toBe("./dist");
    expect(config.main).toBeUndefined();
  });

  it("serves direct registration navigation through the application instead of a Worker handler", () => {
    expect(config.assets.not_found_handling).toBe("single-page-application");
    expect(config.assets.run_worker_first).toBe(false);
  });
});