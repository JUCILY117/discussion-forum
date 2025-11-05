import { z } from "zod";

export const createThreadTagSchema = z.object({
  threadId: z.number().int("Thread ID must be an integer"),
  tagId: z.number().int("Tag ID must be an integer"),
});
