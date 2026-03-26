import { UIToolInvocation, tool } from "ai";
import { z } from "zod";

import { db } from "~/lib/drizzle";
import { chatDocument } from "~/lib/drizzle/schema";

export const generateDocumentTool = tool({
  description: "Generate a document",
  strict: true,
  inputSchema: z.object({
    title: z.string().describe("The title of the document"),
    markdown: z.string().min(1).describe("The content of the document"),
  }),
  async execute({ title, markdown }) {
    const [document] = await db
      .insert(chatDocument)
      .values({ content: markdown, title })
      .returning({ id: chatDocument.id });
    return {
      documentId: document.id,
    };
  },
});

export type GenerateDocumentUIToolInvocation = UIToolInvocation<typeof generateDocumentTool>;
