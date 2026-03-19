import { ChatRequestOptions } from "ai";

import { Chat } from "../ai/types";

type Status = "success" | "error";

export type Plan = "FREE" | "PRO" | "PRO_PLUS";
export type AuthStatus = {
  status: Status;
  message: string;
};
export type GroupedChats = {
  pinned: Chat[];
  archived: Chat[];
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

export type ChatData = {
  id: string;
  createdAt: number;
  activeStreamId: string | null;
};

export type Attachment = {
  contentType: string;
  mediaType: string;
  name: string;
  type: string;
  url: string;
};

export type RegenerateFunc = ({
  messageId,
  ...options
}?: {
  messageId?: string | undefined;
} & ChatRequestOptions) => Promise<void>;

export type ModelMeta = {
  input: string;
  output: string;
  reasoning: boolean;
};
