import { describe, expect, it } from "vitest";
import { programmeEnquirySchema, spellProgrammeIds } from "../../../../supabase/functions/_shared/programme-enquiry-schema";

const base = {
  programme_id: "ms-quantum-computing",
  full_name: "Example Applicant",
  email: "applicant@example.com",
  phone: "9876543210",
  preferred_spell: null,
  enquiry: "Please share the admission process.",
  consent: true,
} as const;

const valid = (phone: string) => programmeEnquirySchema.safeParse({ ...base, phone }).success;

describe("programme enquiry phone rule", () => {
  it("rejects an empty phone", () => expect(valid("")).toBe(false));
  it("rejects letters", () => expect(valid("98765abc")).toBe(false));
  it("rejects plus signs, spaces, hyphens and parentheses", () => {
    for (const phone of ["+919876543210", "98765 43210", "98765-43210", "(0877)2289545"]) expect(valid(phone)).toBe(false);
  });
  it("accepts one digit", () => expect(valid("7")).toBe(true));
  it("accepts fifteen digits", () => expect(valid("123456789012345")).toBe(true));
  it("rejects sixteen digits", () => expect(valid("1234567890123456")).toBe(false));
});

describe("programme-specific enquiry fields", () => {
  it("accepts Quantum without a preferred spell", () => {
    expect(programmeEnquirySchema.safeParse(base).success).toBe(true);
  });

  it("rejects a preferred spell for Quantum and M.S. Data Science", () => {
    for (const programme_id of ["ms-quantum-computing", "ms-data-science"]) {
      expect(programmeEnquirySchema.safeParse({ ...base, programme_id, preferred_spell: "January" }).success).toBe(false);
    }
  });

  it("requires January or July for every diploma", () => {
    for (const programme_id of spellProgrammeIds) {
      expect(programmeEnquirySchema.safeParse({ ...base, programme_id, preferred_spell: null }).success).toBe(false);
      expect(programmeEnquirySchema.safeParse({ ...base, programme_id, preferred_spell: "January" }).success).toBe(true);
      expect(programmeEnquirySchema.safeParse({ ...base, programme_id, preferred_spell: "July" }).success).toBe(true);
    }
  });

  it("requires consent and an enquiry", () => {
    expect(programmeEnquirySchema.safeParse({ ...base, consent: false }).success).toBe(false);
    expect(programmeEnquirySchema.safeParse({ ...base, enquiry: " " }).success).toBe(false);
  });
});
