import { describe, expect, it } from "vitest";
import { assetDestination, validateAssetResponse } from "../../scripts/cloudflare-assets.mjs";

describe("Cloudflare asset packaging", () => {
  it("keeps official media at the same local URL on Cloudflare", () => {
    expect(assetDestination({ url: "/__l5e/assets-v1/approved/svu-logo.png" })).toBe("__l5e/assets-v1/approved/svu-logo.png");
  });
  it("rejects destinations outside the approved asset directory", () => {
    expect(() => assetDestination({ url: "https://other.example/logo.png" })).toThrow();
    expect(() => assetDestination({ url: "/__l5e/assets-v1/%2fetc/file" })).toThrow();
  });
  it("rejects a successful HTML fallback instead of a brochure", () => {
    expect(() => validateAssetResponse({ size: 3 }, new Response("abc", { headers: { "content-type": "text/html" } }), new Uint8Array(3))).toThrow();
  });
  it("requires the approved file size", () => {
    const response = new Response(null, { headers: { "content-type": "image/png" } });
    expect(() => validateAssetResponse({ size: 3 }, response, new Uint8Array(2))).toThrow();
    expect(() => validateAssetResponse({ size: 3 }, response, new Uint8Array(3))).not.toThrow();
  });
});