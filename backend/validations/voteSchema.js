import { z } from "zod";

export const voteSchema = z.object({
  threadId: z.number().int().optional(),
  replyId: z.number().int().optional(),
  value: z.enum([1, -1], {
    errorMap: () => ({ message: "Vote value must be 1 or -1" }),
  }),
}).refine(data => data.threadId || data.replyId, {
  message: "Either threadId or replyId is required",
});
