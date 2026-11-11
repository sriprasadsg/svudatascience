import { describe, expect, it } from "vitest";
import navigation from "./svu-navigation.json";

describe("official SVU navigation destinations", () => {
  it("routes the College of Arts principal to the university, not the data science site", () => {
    const colleges = navigation.find((item) => item.label === "Colleges");
    const arts = colleges?.children.find((item) => item.label === "SVU College of Arts");
    expect(arts?.children.find((item) => item.label === "Principal")?.href).toBe("https://svuniversity.edu.in/college-principal-cfa/");
  });

  it("does not turn unavailable source destinations into homepage links", () => {
    expect(navigation.find((item) => item.label === "Antiragging")?.href).toBeNull();
    const naac = navigation.find((item) => item.label === "NAAC");
    expect(naac?.children.find((item) => item.label === "Best Practices")?.href).toBeNull();
    expect(naac?.children.find((item) => item.label === "Institution Distinctiveness")?.href).toBeNull();
  });
});