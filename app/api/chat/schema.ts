import { z } from "zod";
import { models } from "~/lib/ai/models";

export const chatSchema = z.object({
  id: z.string(),
  messages: z.array(z.any()),
  model: z.enum(models.map((m) => m.name) as [string, ...string[]]),
});
