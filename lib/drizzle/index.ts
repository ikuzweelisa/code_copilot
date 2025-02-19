import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, {
  schema,
});

type Chat = typeof schema.chats.$inferSelect;
type User = typeof schema.users.$inferSelect;
type Account = typeof schema.accounts.$inferSelect;

export { db, type Chat, type User, type Account };
