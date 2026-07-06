import { z } from "zod";
import type { WardSlug } from "@/data/wards";

// Accepts 07xx/01xx local format or +254/254 international format.
const KENYAN_PHONE_REGEX = /^(?:\+254|254|0)(7\d{8}|1\d{8})$/;

export const helpOptions = [
  "Vote",
  "Volunteer",
  "Ward Captain",
  "Donate-interest",
] as const;

export const wardSlugs: [WardSlug, ...WardSlug[]] = [
  "kilimani",
  "gatina",
  "kabiro",
  "kawangware",
  "kileleshwa",
];

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "That name looks too long"),
  phone: z
    .string()
    .trim()
    .regex(
      KENYAN_PHONE_REGEX,
      "Enter a valid Kenyan number, e.g. 07XX XXX XXX or +2547XX XXX XXX"
    ),
  ward: z.enum(wardSlugs, {
    errorMap: () => ({ message: "Select your ward" }),
  }),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  helpType: z.enum(helpOptions, {
    errorMap: () => ({ message: "Select how you'd like to help" }),
  }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(100, "That name looks too long"),
  phone: z
    .string()
    .trim()
    .regex(
      KENYAN_PHONE_REGEX,
      "Enter a valid Kenyan number, e.g. 07XX XXX XXX or +2547XX XXX XXX"
    ),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  ward: z.enum(wardSlugs, {
    errorMap: () => ({ message: "Select your ward" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more — at least 10 characters")
    .max(2000, "That message is too long"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
