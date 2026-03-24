import { ExaSearchResult } from "@exalabs/ai-sdk";
import type { UIDataTypes, UIMessage as TUIMessage, InferUITool } from "ai";
import { z } from "zod";

import { chatStatus } from "../constants/chat";

import { generateDocumentTool } from "./tools/generate-document";
import { generateImageTool } from "./tools/generate-image";

export const messageMetadataSchema = z.object({
  createdAt: z.number().optional(),
  model: z.string().optional(),
  totalTokens: z.number().optional(),
});
export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type WebSearchToolOutput = {
  results: ExaSearchResult[];
};

export type ChatTools = {
  web_search: {
    input: {
      query: string;
    };
    output: WebSearchToolOutput;
  };
  generate_image: {
    input: InferUITool<typeof generateImageTool>["input"];
    output: InferUITool<typeof generateImageTool>["output"];
  };
  generate_document: {
    input: InferUITool<typeof generateDocumentTool>["input"];
    output: InferUITool<typeof generateDocumentTool>["output"];
  };
};

export type UIMessage = TUIMessage<MessageMetadata, UIDataTypes, ChatTools>;
export type Chat = {
  title: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  status: (typeof chatStatus)[number] | null;
  isPending?: boolean;
  parentChatId?: string | null;
  parentChatTitle?: string | null;
};
