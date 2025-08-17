import { z } from "zod";

export const voteSchema = z.object({
  threadId: z.number().int().optional(),
  replyId: z.number().int().optional(),
  value: z.union([z.literal(1), z.literal(-1)], {
    errorMap: () => ({ message: "Vote value must be 1 or -1" }),
  }),
}).refine(data => data.threadId || data.replyId, {
  message: "Either threadId or replyId is required",
});
