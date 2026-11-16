import { describe, expect, it } from "vitest";
import { programmes, programmePath } from "./programmes";

describe("programme catalogue", () => {
  it("lists six distinct routes with Quantum Computing first", () => {
    expect(programmes).toHaveLength(6);
    expect(programmes[0].name).toBe("M.S. Quantum Computing");
    expect(new Set(programmes.map(programmePath)).size).toBe(6);
    expect(programmePath(programmes[0])).toBe("/programmes/ms-quantum-computing");
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
