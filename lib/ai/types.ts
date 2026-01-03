import { z } from "zod";
import { UIMessage as TUIMessage } from "ai";
import { Chat as TChat } from "../drizzle";

export const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
});
export type MessageMetadata = z.infer<typeof messageMetadataSchema>;
export type UIMessage = TUIMessage<MessageMetadata>;
export type Chat = {
  title: string|null;
  createdAt: string | Date;
  updatedAt: string | Date;
  id: string;
  userId: string;
  isPending?: boolean;
};
