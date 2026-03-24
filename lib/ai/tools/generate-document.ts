import { UIToolInvocation, tool } from "ai";
import { z } from "zod";

export const generateDocumentTool = tool({
  description: "Generate a document",
  inputSchema: z.object({
    title: z.string().optional().describe("The title of the document"),
    markdown: z.string().min(1),
  }),
  async execute({ title, markdown }) {
    return {
      title,
      markdown,
    };
  },
});

export type GenerateDocumentUIToolInvocation = UIToolInvocation<typeof generateDocumentTool>;
