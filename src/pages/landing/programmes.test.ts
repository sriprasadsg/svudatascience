import { describe, expect, it } from "vitest";
import { programmes, programmePath } from "./programmes";

describe("programme catalogue", () => {
  it("lists six distinct routes with Quantum Computing first", () => {
    expect(programmes).toHaveLength(6);
    expect(programmes[0].name).toBe("M.S. Quantum Computing");
    expect(new Set(programmes.map(programmePath)).size).toBe(6);
    expect(programmePath(programmes[0])).toBe("/programmes/ms-quantum-computing");
  });

  it("preserves the owner's final programme order", () => {
    expect(programmes.map((programme) => programme.name)).toEqual([
      "M.S. Quantum Computing",
      "M.S. Data Science",
      "PG Diploma in Data Science",
      "Diploma in Python for AI, ML & Gen AI",
      "Diploma in Data Visualization",
      "Diploma in Cloud Technologies",
    ]);
  });

  it("preserves Quantum's approved duration and hybrid mode", () => {
    expect(programmes[0].duration).toBe("2 years / 4 semesters");
    expect(programmes[0].mode).toBe("Hybrid (online / offline)");
  });

  it("uses January and July spells only for the four diplomas", () => {
    expect(programmes.filter((programme) => programme.hasPreferredSpell)).toHaveLength(4);
    expect(programmes[0].hasPreferredSpell).toBe(false);
    expect(programmes[1].hasPreferredSpell).toBe(false);
  });

  it("does not assign a January or July spell to Quantum", () => {
    expect(programmes[0].admissionSummary).toBe("As notified by SVU");
    expect(programmes[0].admissionType).toBe("quantum");
  });

  it("asks applicants to confirm specialist diploma delivery", () => {
    for (const programme of programmes.slice(3)) {
      expect(programme.mode).toContain("Confirm with the admissions team");
    }
  });
});
