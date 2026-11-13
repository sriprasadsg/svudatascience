import { describe, expect, it } from "vitest";
import { registrationSchema } from "./registration-validation";
import { onlineRegistrationSchema, courses } from "../../../../supabase/functions/_shared/registration-schema";

const reg = { full_name: "A", email: "a@example.com", education_qualification: "B.Sc.", programme: "M.S. Data Science", location: "Tirupati", occupation: "Student" };
const online = { full_name: "A", email: "a@example.com", courses: [courses[0]], occupation: "Employed", college: "SVU", education_qualification: "B.Sc", location: "Tirupati" };
const schemas = [["registration", registrationSchema, reg], ["online registration", onlineRegistrationSchema, online]] as const;
const ok = (s: any, base: object, phone: string) => s.safeParse({ ...base, phone }).success;

for (const [name, s, base] of schemas) describe(`${name} phone rule`, () => {
  it("rejects empty", () => expect(ok(s, base, "")).toBe(false));
  it("rejects letters", () => expect(ok(s, base, "98765abc")).toBe(false));
  it("rejects + spaces hyphens parentheses", () => { for (const p of ["+919876543210", "98765 43210", "98765-43210", "(0877)2289545"]) expect(ok(s, base, p)).toBe(false); });
  it("accepts 1 digit", () => expect(ok(s, base, "7")).toBe(true));
  it("accepts 15 digits", () => expect(ok(s, base, "123456789012345")).toBe(true));
  it("rejects 16 digits", () => expect(ok(s, base, "1234567890123456")).toBe(false));
});
