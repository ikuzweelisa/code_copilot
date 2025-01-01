import { Attachment, Chat } from "../drizzle";

type Status = "success" | "error";

export type AuthStatus = {
  status: Status;
  message: string;
};

export type FileState = {
  attachment?: Attachment;
  error?: string;
};
export type GroupedChats = {
  today: Chat[];
  yesterday: Chat[];
  lastWeek: Chat[];
  lastMonth: Chat[];
  older: Chat[];
};
