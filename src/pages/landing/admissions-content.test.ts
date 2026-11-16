import { describe, expect, it } from "vitest";
import { domesticQuantumAdmissions as quantum } from "./admissions-content";

describe("domestic Quantum admissions", () => {
  it("allows only the approved B.Sc. subject combination", () => {
    expect(quantum.eligibility[0]).toBe("B.Sc. with Mathematics as the main subject and any two of Physics, Chemistry, Statistics, Electronics or Computer Science.");
  });
  it("limits B.Tech. eligibility to CSE, IT or Electronics", () => {
    expect(quantum.eligibility[1]).toBe("B.Tech. in CSE, IT or Electronics.");
  });
  it("includes BCA", () => {
    expect(quantum.eligibility[2]).toBe("Bachelor of Computer Applications (BCA).");
    expect(quantum.eligibility).toHaveLength(3);
  });
  it("requires a UGC-recognised qualifying university", () => {
    expect(quantum.recognition).toBe("Qualifying degree from a university recognised by the University Grants Commission.");
  });
  it("uses an online exam with 50 questions, 50 marks and no negative marking", () => {
    expect(quantum.entrance).toEqual({ format: "online", questions: 50, marks: 50, negativeMarking: false });
  });
  it("requires DOA counselling and certificate verification after qualification or shortlisting", () => {
    expect(quantum.selection).toBe("Qualified/shortlisted candidates proceed to counselling and certificate verification through Directorate of Admissions (DOA), SVU.");
  });
  it("uses only the notified SVU spell", () => {
    expect(quantum.spell).toBe("As notified by SVU");
  });
});