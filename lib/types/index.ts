import { z } from "zod";
import React from "react";
import { CoreMessage } from "ai";

import {
  codeAnalyzerSchema,
  debuggerSchema,
  setupGuideSchema,
  tableSchema,
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
export type CodeAnalyzerProps = z.infer<typeof codeAnalyzerSchema>;
export type TableProps = z.infer<typeof tableSchema>;
export type SetupProps = z.infer<typeof setupGuideSchema>;
export type UuidGenProps = z.infer<typeof uuidGenSchema>;
export type DebuggerProps = z.infer<typeof debuggerSchema>;