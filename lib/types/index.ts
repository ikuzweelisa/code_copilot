import { ChatRequestOptions } from "ai";
import { Chat } from "../drizzle";

type Status = "success" | "error";

export type AuthStatus = {
  status: Status;
  message: string;
};
export type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};

export type RegenerateFunc = ({
  messageId,
  ...options
}?: {
  messageId?: string | undefined;
} & ChatRequestOptions) => Promise<void>;
