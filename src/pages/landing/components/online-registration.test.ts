import { describe, it, expect } from "vitest";
import { onlineRegistrationSchema, courses } from "../../../../supabase/functions/_shared/registration-schema";
const valid = { full_name: "Test Applicant", phone: "+91 9876543210", email: "test@example.com", courses: [courses[0]], occupation: "Employed", college: "SVU", education_qualification: "B.Sc", location: "Tirupati" };
describe("PDF-matching online registration", () => {
  for (const field of ["full_name", "phone", "email", "courses", "occupation", "college", "education_qualification", "location"]) {
    it(`requires ${field}`, () => expect(onlineRegistrationSchema.safeParse({ ...valid, [field]: undefined }).success).toBe(false));
  }
  it("accepts multiple PDF courses", () => expect(onlineRegistrationSchema.parse({ ...valid, courses: [courses[0], courses[4]] }).courses).toHaveLength(2));
  it("rejects no course", () => expect(onlineRegistrationSchema.safeParse({ ...valid, courses: [] }).success).toBe(false));
  it("accepts blank optional PDF fields", () => expect(onlineRegistrationSchema.safeParse({ ...valid, gender: "", passed_out_year: "", address: "" }).success).toBe(true));
  it("rejects an invalid email", () => expect(onlineRegistrationSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false));
  it("rejects an invalid phone", () => expect(onlineRegistrationSchema.safeParse({ ...valid, phone: "123" }).success).toBe(false));
  it("restricts years to PDF options", () => expect(onlineRegistrationSchema.safeParse({ ...valid, passed_out_year: "2028" }).success).toBe(false));
});