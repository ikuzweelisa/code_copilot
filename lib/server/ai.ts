import "server-only";

import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";

import { UIMessage } from "../ai/types";
import { db, Model } from "../drizzle";
import { chatDocument, model as modelSchema } from "../drizzle/schema";

import { getChatById } from ".";

export async function getModels() {
  "use cache";
  cacheTag("models");
  const models = await db.query.model.findMany();
  return models;
}
export async function getModelByIdOrDefault(id: string | undefined) {
  let model: Model | undefined;
  if (id) {
    model = await db.query.model.findFirst({
      where: eq(modelSchema.id, id),
    });
  }
  if (!model) {
    model = await db.query.model.findFirst({
      where: eq(modelSchema.isDefault, true),
    });
  }
  return model;
}
export async function getUpdatedChatMessages({
  id,
  message,
  trigger,
  messageId,
}: {
  id: string;
  message: UIMessage;
  trigger: "submit-message" | "regenerate-message";
  messageId?: string;
}) {
  const chat = await getChatById(id);
  let messages = chat?.messages ?? [];

  if (trigger === "submit-message") {
    messages = [...messages, message];
  }
  if (trigger === "regenerate-message") {
    const messageIndex =
      messageId == null
        ? messages.length - 1
        : messages.findIndex((message) => message.id === messageId);

    if (messageIndex === -1) {
      throw new Error(`message ${messageId} not found`);
    }
    messages = messages.slice(
      0,
      messages[messageIndex].role === "assistant" ? messageIndex : messageIndex + 1,
    );
  }
  return messages;
}
