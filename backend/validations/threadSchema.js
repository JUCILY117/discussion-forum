import { z } from "zod";

export const createThreadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  categoryId: z.number().int("Category ID must be an integer"),
  tagNames: z.array(z.string()).optional(),
});

export const getThreadByIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "Thread ID must be a number"),
});

export const deleteThreadSchema = z.object({
  id: z.string().regex(/^\d+$/, "Thread ID must be a number"),
});
