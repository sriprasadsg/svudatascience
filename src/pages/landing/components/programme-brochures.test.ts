import { expect, it } from "vitest";
import { brochureForProgramme } from "./programme-brochures";

it("offers only the submitted programme's brochure", () => {
  expect(brochureForProgramme("M.S. Data Science")?.id).toBe("ms");
  expect(brochureForProgramme("PG Diploma in Data Science")?.id).toBe("pg");
  for (const programme of ["Specialist Diploma – Python for AI, ML & Generative AI", "Specialist Diploma – Data Visualization", "Specialist Diploma – Cloud Technologies"]) {
    expect(brochureForProgramme(programme)?.id).toBe("specialist");
  }
  expect(brochureForProgramme("")).toBeUndefined();
});