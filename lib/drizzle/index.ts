import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

type Chat = typeof schema.chats.$inferSelect;
type User = typeof schema.users.$inferSelect;
type Account = typeof schema.accounts.$inferSelect;

export { db, type Chat, type User, type Account };
