import { describe, expect, it } from "vitest";
import { yearPages } from "./year-picker";

describe("registration year grid", () => {
  it("shows 12 years per page", () => {
    expect(yearPages.map(page => page.length)).toEqual([12, 12, 12, 12]);
  });
  it("covers exactly 1980 through 2027 without gaps or duplicates", () => {
    expect(yearPages.flat()).toEqual(Array.from({ length: 48 }, (_, i) => 1980 + i));
    expect(yearPages[0]?.[0]).toBe(1980);
    expect(yearPages[3]?.[11]).toBe(2027);
  });
});