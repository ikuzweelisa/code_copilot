import { openai } from "@ai-sdk/openai";
import { ToolLoopAgent } from "ai";

const agent = new ToolLoopAgent({
  model: "openai/gpt-5-mini",
  tools: {
    web_search: openai.tools.webSearch({
      searchContextSize: "low",
    }),
  },
});

const { sources, toolResults } = await agent.generate({
  prompt: "What happened in San Francisco last week?",
});

// Access sources directly
console.log("Sources:", sources);

// Or extract query and sources from tool results
for (const toolResult of toolResults) {
  if (toolResult.toolName === "web_search") {
    const { action, sources } = toolResult.output as any;
    console.log("Search query:", action.query);
    console.log("Sources:", sources);
  }
}
