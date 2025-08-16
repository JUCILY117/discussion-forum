import { z } from "zod";

export const createReplySchema = z.object({
  threadId: z.number().int("Thread ID must be an integer"),
  content: z.string().min(1, "Reply content is required"),
  parentReplyId: z.number().int().nullable().optional(),
});

export const deleteReplySchema = z.object({
  id: z.string().regex(/^\d+$/, "Reply ID must be a number"),
});
