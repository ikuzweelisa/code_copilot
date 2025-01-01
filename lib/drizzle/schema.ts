import { AdapterAccountType } from "@auth/core/adapters";
import { CoreMessage } from "ai";
import { relations } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const users = pgTable("users", {
  id: uuid("users_id").defaultRandom().primaryKey(),
  name: varchar("name"),
  email: varchar("email"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image"),
  ...timestamps,
});

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey(),
  title: varchar("title").notNull(),
  messages: json("messages").$type<CoreMessage[]>().notNull().default([]),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  ...timestamps,
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    ...timestamps,
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const attachments = pgTable("attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chats.id),
  path: varchar("url").notNull(),
  type: varchar("type").notNull(),
  ...timestamps,
});

export const userRelations = relations(users, ({ many }) => {
  return {
    accounts: many(accounts),
    chats: many(chats),
  };
});

export const chatRelations = relations(chats, ({ one }) => ({
  user: one(users, { fields: [chats.userId], references: [users.id] }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const attachmentRelations = relations(attachments, ({ one }) => ({
  chat: one(chats, { fields: [attachments.chatId], references: [chats.id] }),
}));
