import { describe, expect, it } from "vitest";
import { registrationSchema } from "./registration-validation";

const valid = {
  full_name: "Test Applicant",
  education_qualification: "Graduate",
  programme: "M.S. Data Science",
  location: "Tirupati",
  occupation: "Student",
  phone: "+91 98765 43210",
};

describe("required registration fields", () => {
  for (const education_qualification of ["Undergraduate", "Graduate", "Postgraduate", "Working Professional"]) {
    it(`accepts the ${education_qualification} qualification option`, () => {
      expect(registrationSchema.safeParse({ ...valid, education_qualification }).success).toBe(true);
    });
  }
  it("rejects qualifications outside the dropdown options", () => {
    expect(registrationSchema.safeParse({ ...valid, education_qualification: "Other" }).success).toBe(false);
  });
  for (const field of Object.keys(valid)) {
    it(`rejects an empty ${field}`, () => {
      expect(registrationSchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
      expect(registrationSchema.safeParse({ ...valid, [field]: undefined }).success).toBe(false);
    });
  }
  it("accepts a complete registration including phone", () => {
    expect(registrationSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects invalid phone numbers", () => {
    for (const phone of ["abc1234567", "123", "1234567890123456"]) {
      expect(registrationSchema.safeParse({ ...valid, phone }).success).toBe(false);
    }
  });
  it("rejects whitespace-only required text", () => {
    for (const field of ["full_name", "education_qualification", "location", "phone"]) {
      expect(registrationSchema.safeParse({ ...valid, [field]: "   " }).success).toBe(false);
    }
  });
});