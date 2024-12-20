import {   CoreMessage } from "ai";
import  {Attachment} from "@prisma/client"

export type Chat = {
  id: string;
  title: string;
  path: string;
  messages: CoreMessage[];
  createdAt?: Date;
  userId: string;
  updatedAt?: Date;
};
/**
 * The login Status
 * @property {string} success|error The login status
 */
type Status = "success" | "error";
/**
 * Login status
 * @property {Status} status login status
 * @property {string} message login message
 */
export type AuthStatus = {
  status: Status;
  message: string;
};


export type FileState = {
  attachment?: Attachment;
  error?: string;
};