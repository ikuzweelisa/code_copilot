import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  
  dialect: "postgresql",
  out: "./lib/drizzle/migrations",
  schema: "./lib/drizzle/schema.ts",
  strict: true,
  verbose: true,
});
