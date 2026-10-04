import { z } from "zod";

const email = z.email({ error: "Enter a valid email address" });

export const passwordRule = z
  .string()
  .min(8, { error: "Use at least 8 characters" })
  .regex(/[A-Za-z]/, { error: "Include at least one letter" })
  .regex(/[0-9]/, { error: "Include at least one number" });

export const loginSchema = z.object({
  email,
  password: z.string().min(1, { error: "Enter your password" }),
  rememberMe: z.boolean(),
});

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, { error: "Enter your full name" }).max(120),
  email,
  password: passwordRule,
  companyName: z.string().trim().max(120, { error: "Keep it under 120 characters" }),
  consent: z.boolean().refine((value) => value, { error: "Please accept the Terms and Privacy Policy" }),
});

export const forgotPasswordSchema = z.object({ email });

export const resetPasswordSchema = z
  .object({
    password: passwordRule,
    confirmPassword: z.string().min(1, { error: "Confirm your new password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
