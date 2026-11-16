import { z } from "zod";

export const programmeIds = [
  "ms-quantum-computing",
  "ms-data-science",
  "pg-diploma-data-science",
  "diploma-python-ai-ml-generative-ai",
  "diploma-data-visualization",
  "diploma-cloud-technologies",
] as const;

export const preferredSpells = ["January", "July"] as const;
export const spellProgrammeIds = [
  "pg-diploma-data-science",
  "diploma-python-ai-ml-generative-ai",
  "diploma-data-visualization",
  "diploma-cloud-technologies",
] as const;

export const programmeNames: Record<(typeof programmeIds)[number], string> = {
  "ms-quantum-computing": "M.S. Quantum Computing",
  "ms-data-science": "M.S. Data Science",
  "pg-diploma-data-science": "PG Diploma in Data Science",
  "diploma-python-ai-ml-generative-ai": "Diploma in Python for AI, ML & Gen AI",
  "diploma-data-visualization": "Diploma in Data Visualization",
  "diploma-cloud-technologies": "Diploma in Cloud Technologies",
};

export function requiresPreferredSpell(programmeId: (typeof programmeIds)[number]) {
  return (spellProgrammeIds as readonly string[]).includes(programmeId);
}

export const programmeEnquirySchema = z.object({
  programme_id: z.enum(programmeIds),
  full_name: z.string().trim().min(1, "Full name is required.").max(100, "Full name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or fewer.").transform((value) => value.toLowerCase()),
  phone: z.string().min(1, "Phone number is required.").regex(/^[0-9]{1,15}$/, "Phone number must be 1 to 15 digits (0-9 only)."),
  preferred_spell: z.enum(preferredSpells).nullable().optional(),
  enquiry: z.string().trim().min(1, "Please enter your enquiry.").max(2000, "Enquiry must be 2,000 characters or fewer."),
  consent: z.literal(true, { error: "Please agree to be contacted about this enquiry." }),
}).strict().superRefine((data, context) => {
  const needsSpell = requiresPreferredSpell(data.programme_id);
  if (needsSpell && !data.preferred_spell) {
    context.addIssue({ code: "custom", path: ["preferred_spell"], message: "Select a preferred admission spell." });
  }
  if (!needsSpell && data.preferred_spell) {
    context.addIssue({ code: "custom", path: ["preferred_spell"], message: "An admission spell does not apply to this programme." });
  }
});

export type ProgrammeEnquiryInput = z.infer<typeof programmeEnquirySchema>;
