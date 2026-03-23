import { relations } from "drizzle-orm/relations";

import { user, chats, session, account, userPreferences } from "./schema";

export const chatsRelations = relations(chats, ({ one }) => ({
  user: one(user, {
    fields: [chats.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  chats: many(chats),
  sessions: many(session),
  accounts: many(account),
  userPreferences: many(userPreferences),
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

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(user, {
    fields: [userPreferences.userId],
    references: [user.id],
  }),
}));
