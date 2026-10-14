import { describe, expect, it } from "vitest";
import { unlockedBrochureIds } from "./brochure-unlock";

describe("brochure unlocking", () => {
  it("opens nothing before a contact form is submitted", () => {
    expect(unlockedBrochureIds([])).toEqual([]);
  });

  it("opens only the M.S. card for an M.S. enquiry", () => {
    expect(unlockedBrochureIds(["M.S. Data Science"])).toEqual(["ms"]);
  });

  it("opens only the PG Diploma card for a PG Diploma enquiry", () => {
    expect(unlockedBrochureIds(["PG Diploma in Data Science"])).toEqual(["pg"]);
  });

  it("opens only the Specialist Diplomas card for any specialist diploma", () => {
    expect(unlockedBrochureIds(["Specialist Diploma – Data Visualization"])).toEqual(["specialist"]);
    expect(unlockedBrochureIds(["Specialist Diploma – Cloud Technologies"])).toEqual(["specialist"]);
    expect(unlockedBrochureIds(["Specialist Diploma – Python for AI, ML & Generative AI"])).toEqual(["specialist"]);
  });

  it("keeps opening further cards as more programmes are submitted", () => {
    expect(unlockedBrochureIds(["M.S. Data Science", "PG Diploma in Data Science"])).toEqual(["ms", "pg"]);
    expect(unlockedBrochureIds(["PG Diploma in Data Science", "Specialist Diploma – Cloud Technologies"])).toEqual(["pg", "specialist"]);
  });

  it("opens nothing for the empty placeholder option", () => {
    expect(unlockedBrochureIds([""])).toEqual([]);
  });
});
