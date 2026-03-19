import "dotenv/config";

import { inArray } from "drizzle-orm";

import { model } from "./schema";

import { db, Model } from ".";

const models: Omit<Model, "createdAt" | "updatedAt">[] = [
  {
    id: "9qNtUJVPn",
    name: "Gemini 2.5 flash",
    model: "gemini-2.5-flash",
    type: "google",
    provider: "google",
    isPremium: false,
    isDefault: true,
    meta: null,
  },
  {
    id: "aHsUPI0-f",
    name: "GLM 4.5 AIR",
    model: "z-ai/glm-4.5-air:free",
    type: "zai",
    provider: "open_router",
    isPremium: false,
    isDefault: false,
    meta: null,
  },
  {
    id: "U-BQ25MA0",
    name: "GPT OSS 20B 128k",
    model: "openai/gpt-oss-20b",
    type: "open_ai",
    provider: "qrok",
    isPremium: false,
    isDefault: false,
    meta: null,
  },
  {
    id: "J5jPjDVuG",
    name: "GPT OSS 120B 128k",
    model: "openai/gpt-oss-120b",
    type: "open_ai",
    provider: "qroq",
    isPremium: false,
    isDefault: false,
    meta: null,
  },
];

async function main() {
  const ids = models.map((m) => m.id);
  await db.transaction(async (tx) => {
    await tx.delete(model).where(inArray(model.id, ids));
    await tx.insert(model).values(models.map((m) => m));
  });
}

main().catch(async (err) => {
  console.error(err);
  process.exitCode = 1;
});
