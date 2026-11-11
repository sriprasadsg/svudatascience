import { z } from "zod";

export const programmeOptions = [
  "M.S. Data Science",
  "PG Diploma in Data Science",
  "Specialist Diploma – Python for AI, ML & Generative AI",
  "Specialist Diploma – Data Visualization",
  "Specialist Diploma – Cloud Technologies",
] as const;

export const occupationOptions = ["Student", "Working Professional"] as const;
export const educationOptions = ["B.Sc.", "B.Tech.", "M.Sc.", "M.Tech."] as const;

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} is required.`).max(100, `${label} must be 100 characters or fewer.`);

export const registrationSchema = z.object({
  full_name: requiredText("Name"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(255, "Email must be 255 characters or fewer.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Please enter a valid email address."),
  education_qualification: z.enum(educationOptions, { error: "Please select your education qualification." }),
  programme: z.enum(programmeOptions, { error: "Please select a programme." }),
  location: requiredText("Location"),
  occupation: z.enum(occupationOptions, { error: "Please select your occupation." }),
  phone: z.string().trim().min(1, "Phone number is required.").max(20)
    .regex(/^\+?[0-9 ()-]+$/, "Please enter a valid phone number.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Please enter a valid phone number with 7–15 digits."),
});