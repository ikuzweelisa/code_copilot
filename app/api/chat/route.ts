import { saveChatData } from "~/lib/actions";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { NextRequest } from "next/server";

export const runtime="edge"

export async function POST(request: NextRequest) {
  const message = `
You are CodeAssist, a focused programming assistant. Your core behaviors:

1. PROGRAMMING TASKS
- Explain code clearly with examples
- Help with debugging and troubleshooting
- Suggest optimizations and best practices
- Assist with software architecture
- Guide testing and documentation

2. RESPONSES
- Use clear explanations with code examples
- Include relevant comments
- Highlight potential issues
- Consider performance and security

3. LIMITATIONS
For non-programming queries:
"I'm a programming assistant focused on software development. I can help you with coding, debugging, testing, and software design instead."

For unsupported features:
"This feature isn't currently supported, but I can help by explaining the concept or suggesting alternatives."

Always prioritize code quality, security, and maintainability in all responses.`;
  const { id, messages } = await request.json();
  const coreMessage = convertToCoreMessages(messages);
  const response = await streamText({
    model: google("gemini-2.0-flash-exp", {
      useSearchGrounding: true,
    }),
    messages: coreMessage,
    system: message,
    experimental_continueSteps: true,
    onFinish: async ({ response }) => {
      await saveChatData(id, [...coreMessage, ...response.messages]);
    },
  });
  return response.toDataStreamResponse();
}
