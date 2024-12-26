import {   CoreMessage } from "ai";
import  {Attachment} from "@prisma/client"

export type Chat = {
  id: string;
  title: string;
  path: string;
  messages: CoreMessage[];
  createdAt: Date;
  userId: string;
  updatedAt: Date;
};

type Status = "success" | "error";

export type AuthStatus = {
  status: Status;
  message: string;
};


export type FileState = {
  attachment?: Attachment;
  error?: string;
};
export type GroupedChats={
  today: Chat[];
    yesterday: Chat[];
    lastWeek: Chat[];
    lastMonth: Chat[];
    older: Chat[];
}

