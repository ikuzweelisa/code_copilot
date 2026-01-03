import { z } from "zod";

export const chatSchema = z.object({
  id: z.string(),
  message: z.any(),
  trigger: z.enum(["regenerate-message", "submit-message"]),
  messageId: z.string().optional(),
});
