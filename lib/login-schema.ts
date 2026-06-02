import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email(
      "Please enter a valid email address"
    ),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .max(
      15,
      "Password must not exceed 100 characters"
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      {
        message:
          "Password must contain at least one uppercase letter",
      }
    )
    .refine(
      (value) => /[a-z]/.test(value),
      {
        message:
          "Password must contain at least one lowercase letter",
      }
    )
    .refine(
      (value) => /[0-9]/.test(value),
      {
        message:
          "Password must contain at least one number",
      }
    )
    .refine(
      (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(
          value
        ),
      {
        message:
          "Password must contain at least one special character",
      }
    ),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;