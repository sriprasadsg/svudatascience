import { z } from "zod";

export const courses = [
  "M.S. Data Science – 2 Years",
  "PG Diploma in Data Science – 1 Year",
  "Diploma in Python for AI, ML & Generative AI with Internship & Project – 6 Months",
  "Diploma in Data Visualization with Internship & Project – 6 Months",
  "Diploma in Cloud Technologies with Internship & Project – 6 Months",
] as const;
export const qualifications = ["Intermediate / 12th", "B.Sc", "B.Com", "BCA", "B.Tech / B.E", "BBA", "B.A", "M.Sc", "MCA", "M.Tech", "MBA", "Other"] as const;
export const occupations = ["Student", "Employed", "Self-employed", "Unemployed", "Other"] as const;
export const genders = ["Male", "Female", "Other", "Prefer not to say"] as const;
export const years = Array.from({ length: 48 }, (_, i) => String(2027 - i));
const text = (label: string, max = 100) => z.string().trim().min(1, `${label} is required.`).max(max);
export const onlineRegistrationSchema = z.object({
  full_name: text("Name"),
  phone: text("Mobile number", 20).regex(/^\+?[0-9 ()-]+$/, "Enter a valid mobile number.").refine(v => { const n = v.replace(/\D/g, "").length; return n >= 7 && n <= 15; }, "Enter a number with 7–15 digits."),
  email: z.string().trim().email("Enter a valid email address.").max(255).transform(v => v.toLowerCase()),
  courses: z.array(z.enum(courses)).min(1, "Select at least one course.").max(5).refine(v => new Set(v).size === v.length, "Choose each course once."),
  gender: z.union([z.enum(genders), z.literal("")]).optional().default(""),
  occupation: z.enum(occupations, { error: "Select your present occupation." }),
  college: text("Name of the college", 200),
  education_qualification: z.enum(qualifications, { error: "Select your educational qualification." }),
  passed_out_year: z.string().refine(v => v === "" || years.includes(v), "Select a valid year.").optional().default(""),
  location: text("Location"),
  address: z.string().trim().max(1000).optional().default(""),
}).strict();