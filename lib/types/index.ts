import { z } from "zod";
import React from "react";
import { CoreMessage } from "ai";

import {
  codeAnalyzerSchema,
  codeExampleSchema,
  conceptsSchema,
  debuggerSchema,
  defineSchema,
  setupGuideSchema,
  tableSchema,
  topicSchema,
  uuidGenSchema,
} from "@/lib/types/schemas";

export type Message = CoreMessage & {
  id: string;
};
type Role = "user" | "assistant";
export type ClientMessage = {
  id: string;
  role: Role;
  display: React.ReactNode;
};

export type Chat = {
  id: string;
  title: string;
  path: string;
  messages: Message[];
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

export type Attachment = {
  id?: string;
  name: string;
  type: string;
  path: string;
  createdAt?: Date;
  chatId?: string;
};
type DataContent = string | Uint8Array | ArrayBuffer | Buffer;

/**
File content part of a prompt. It contains a file.
 */
export type FilePart = {
  type: "file";
  /**

   */
  data: DataContent | URL;
  /**

   */
  mimeType: string;
};

export type CodeAnalyzerProps = z.infer<typeof codeAnalyzerSchema>;
export type TableProps = z.infer<typeof tableSchema>;
export type SetupProps = z.infer<typeof setupGuideSchema>;
export type UuidGenProps = z.infer<typeof uuidGenSchema>;
export type DebuggerProps = z.infer<typeof debuggerSchema>;
export type CodeExampleProps = z.infer<typeof codeExampleSchema>;
export type TopicPros = z.infer<typeof topicSchema>;
export type DefineProps = z.infer<typeof defineSchema>;
export type Concept = z.infer<typeof conceptsSchema>;
