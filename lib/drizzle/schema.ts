import { AdapterAccountType } from "@auth/core/adapters";
import { UIMessage } from "ai";
import { relations } from "drizzle-orm";
import {
  index,
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
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name"),
  email: varchar("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  ...timestamps,
});

export const chats = pgTable(
  "chats",
  {
    id: varchar("id").primaryKey(),
    title: varchar("title").notNull(),
    messages: json("messages").$type<UIMessage[]>().notNull().default([]),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (chats) => [
    {
      userIndex: index("user_index").on(chats.userId),
    },
  ]
);

export const accounts = pgTable(
  "accounts",
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
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

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
