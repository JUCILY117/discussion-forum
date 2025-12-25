import { z } from "zod";

const emptyToUndefined = z.literal("").transform(() => undefined);

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100)
    .optional()
    .transform(v => v?.trim()),

  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(30)
    .optional()
    .transform(v => v?.trim()),

  email: z
    .string()
    .email("Invalid email format")
    .optional()
    .transform(v => v?.trim().toLowerCase()),

  avatar: z
    .union([z.string().url(), emptyToUndefined])
    .optional(),

  bannerImage: z
    .union([z.string().url(), emptyToUndefined])
    .optional(),

  website: z
    .union([z.string().url(), emptyToUndefined])
    .optional(),

  bio: z
    .string()
    .max(160, "Bio must be 160 characters or less")
    .optional()
    .transform(v => v?.trim()),

  location: z
    .string()
    .max(100, "Location must be 100 characters or less")
    .optional()
    .transform(v => v?.trim()),
});
