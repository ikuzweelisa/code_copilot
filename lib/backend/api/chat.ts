import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { generateChatId } from "~/lib/ai/utils";
import { protectedProcedure, router } from "~/lib/backend/trpc/trpc";
import { chatStatus } from "~/lib/constants/chat";
import { db } from "~/lib/drizzle";
import { chatDocument, chats } from "~/lib/drizzle/schema";
import { getChatById, getChats } from "~/lib/server";

export const chatRouter = router({
  getUserChats: protectedProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().min(1).default(25),
        search: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const limit = input.limit;
      const offset = input.cursor ?? 0;
      const search = input.search;

      const chats = await getChats(auth.user.id, limit, offset, search);

      let nextCursor: number | undefined = undefined;
      if (chats.length === limit) {
        nextCursor = offset + limit;
      }

      return {
        chats,
        nextCursor,
      };
    }),
  getChatById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const { id } = input;
    const chat = await getChatById(id);
    return chat;
  }),
  deleteChat: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id } = input;
      await db.delete(chats).where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
  updateTitle: protectedProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, title } = input;
      await db
        .update(chats)
        .set({ title })
        .where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(chatStatus),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, status } = input;
      await db
        .update(chats)
        .set({ status })
        .where(and(eq(chats.id, id), eq(chats.userId, auth.user.id)));
    }),
  updateDocument: protectedProcedure
    .input(
      z.object({
        id: z.uuid(),
        content: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.update(chatDocument).set({ content: input.content, id: input.id });
    }),

  getDocument: protectedProcedure
    .input(
      z.object({
        id: z.uuid(),
      }),
    )
    .query(async ({ input }) => {
      return db.query.chatDocument.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, input.id);
        },
      });
    }),
  // updateDocumentOutput: protectedProcedure
  //   .input(
  //     z.object({
  //       chatId: z.string(),
  //       messageId: z.string(),
  //       partIndex: z.number().int().nonnegative(),
  //       title: z.string().optional(),
  //       markdown: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const auth = ctx.auth;
  //     const { chatId, messageId, partIndex, title, markdown } = input;
  //
  //     const chat = await getChatById(chatId);
  //     if (!chat || chat.userId !== auth.user.id) {
  //       throw new Error("Chat not found");
  //     }
  //
  //     const messageIndex = chat.messages.findIndex((m) => m.id === messageId);
  //     if (messageIndex === -1) {
  //       throw new Error("Message not found");
  //     }
  //
  //     const message = chat.messages[messageIndex];
  //     const parts = message.parts ?? [];
  //     const part = parts[partIndex] as
  //       | { type?: string; state?: string; output?: { title?: string; markdown?: string } }
  //       | undefined;
  //
  //     if (!part || part.type !== "tool-generate_document" || part.state !== "output-available") {
  //       throw new Error("Document part not found");
  //     }
  //
  //     const nextParts = [...parts];
  //     nextParts[partIndex] = {
  //       ...part,
  //       output: {
  //         ...part.output,
  //         title,
  //         markdown,
  //       },
  //     };
  //
  //     const nextMessages = [...chat.messages];
  //     nextMessages[messageIndex] = {
  //       ...message,
  //       parts: nextParts,
  //     };
  //
  //     await db
  //       .update(chats)
  //       .set({ messages: nextMessages })
  //       .where(and(eq(chats.id, chatId), eq(chats.userId, auth.user.id)));
  //
  //     return { ok: true };
  //   }),
  branchChat: protectedProcedure
    .input(z.object({ id: z.string(), messageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const auth = ctx.auth;
      const { id, messageId } = input;

      const chat = await getChatById(id);
      if (!chat || chat.userId !== auth.user.id) {
        throw new Error("Chat not found");
      }

      const messageIndex = chat.messages.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) {
        throw new Error("Message not found");
      }

      const branchedMessages = chat.messages.slice(0, messageIndex + 1);
      const newChatId = generateChatId();

      await db.insert(chats).values({
        id: newChatId,
        title: chat.title,
        userId: auth.user.id,
        messages: branchedMessages,
        parentChatId: id,
      });

      return { id: newChatId };
    }),
});
