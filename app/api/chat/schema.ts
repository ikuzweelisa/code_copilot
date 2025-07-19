import { z } from "zod";

export const chatSchema = z.object({
  id: z.string(),
  messages: z.array(z.any()),
  model: z.string(),
});
