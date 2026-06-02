import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(5, "Name is required"),

  email: z
    .string()
    .email("Enter the email address"),

  phone: z
    .string()
    .min(10, "Phone number must be 10 digits"),

  status: z.enum([
    "email",
    "phone",
    "sim",
  ]),
});

export type ContactFormValues =
  z.infer<typeof contactSchema>;