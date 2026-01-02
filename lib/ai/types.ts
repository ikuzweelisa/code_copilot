import { z } from "zod";
import { UIMessage as TUIMessage } from "ai";

export const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
});
export type MessageMetadata = z.infer<typeof messageMetadataSchema>;
export type UIMessage = TUIMessage<MessageMetadata>;
