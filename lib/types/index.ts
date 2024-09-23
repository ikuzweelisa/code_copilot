import { z } from "zod";
import React from "react";
import { CoreMessage } from "ai";

import {
  codeAnalyzerSchema,
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
};
export type CodeAnalyzerProps = z.infer<typeof codeAnalyzerSchema>;
export type TableProps = z.infer<typeof tableSchema>;
export type SetupProps = z.infer<typeof setupGuideSchema>;
export type UuidGenProps = z.infer<typeof uuidGenSchema>;
