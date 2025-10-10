import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").trim(),
  email: z.email("Invalid email format").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  emailOrUsername: z.string().min(2, "Must enter a valid username or email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});