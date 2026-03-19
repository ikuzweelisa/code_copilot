import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { UIMessage } from "../ai/types";
import { chatStatus } from "../constants/chat";
import { modelTypes, providers } from "../constants/models";
import { ModelMeta } from "../types";

const timestamps = {
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date().toISOString()),
};

export const plan = pgEnum("plan", ["FREE", "PRO", "PRO_PLUS"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  plan: plan("plan").notNull().default("FREE"),
  polarCustomerId: text("polar_customer_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  nickName: text("nick_name"),
  occupation: text("occupation"),
  bio: text("bio"),
  customInstructions: text("custom_instructions"),
  ...timestamps,
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);
export const status = pgEnum("status", chatStatus);

export const chats = pgTable(
  "chats",
  {
    id: text("id").primaryKey(),
    title: varchar("title"),
    messages: json("messages").$type<UIMessage[]>().notNull().default([]),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    activeStreamId: text("active_stream_id"),
    status: status(),
    parentChatId: text("parent_chat_id"),
    ...timestamps,
  },
  (chats) => [
    {
      userIndex: index("user_index").on(chats.userId),
    },
  ],
);
// for ai inference
export const provider = pgEnum("provider", providers);
// for icons
export const type = pgEnum("type", modelTypes);

export const model = pgTable("model", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid(9)),
  name: text("name").notNull(),
  model: text("model").notNull(),
  type: type().notNull(),
  provider: provider().notNull(),
  isPremium: boolean("is_premium").default(true),
  isDefault: boolean().default(false),
  meta: json("meta").$type<ModelMeta>(),
  ...timestamps,
});

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(user, {
    fields: [userPreferences.userId],
    references: [user.id],
  }),
}));
export const userRelations = relations(user, ({ many, one }) => {
  return {
    accounts: many(account),
    chats: many(chats),
    sessions: many(session),
    userPreferences: one(userPreferences, {
      fields: [user.id],
      references: [userPreferences.userId],
    }),
  };
});

export const chatRelations = relations(chats, ({ one, many }) => ({
  user: one(user, { fields: [chats.userId], references: [user.id] }),
  parentChat: one(chats, {
    fields: [chats.parentChatId],
    references: [chats.id],
    relationName: "parentChat",
  }),
  branchedChats: many(chats, { relationName: "parentChat" }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
