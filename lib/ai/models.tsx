import {
  Gemini,
  DeepSeek,
  Qwen,
  Kimi,
  Meta,
  OpenAI,
} from "~/components/ui/icons";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { openrouter } from "@openrouter/ai-sdk-provider";
import {
  LanguageModel,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";

export type Model = {
  id: number;
  name: string;
  icon: React.ReactNode;
  model: LanguageModel;
  description?: string;
  isDefault?: boolean;
};

function withMiddleware<T extends Exclude<LanguageModel, string>>(model: T) {
  return model;
  return wrapLanguageModel({
    model: model,
    middleware: [extractReasoningMiddleware({ tagName: "think" })],
  });
}

export const models: Model[] = [
  {
    id: 1,
    name: "Gemini 2.5 Pro",
    icon: <Gemini width={24} height={24} />,
    model: withMiddleware(openrouter.chat("google/gemini-2.5-pro-exp-03-25")),
    description: "OpenRouter",
  },
  {
    id: 2,
    name: "Gemini 2.5 Flash",
    icon: <Gemini width={24} height={24} />,
    model: withMiddleware(openrouter.chat("google/gemini-2.5-flash-exp-03-25")),
    description: "OpenRouter",
  },
  {
    id: 3,
    name: "DeepSeek V3",
    model: withMiddleware(openrouter.chat("DeepSeek: DeepSeek V3")),
    icon: <DeepSeek width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    id: 4,
    name: "DeepSeek R1",
    model: withMiddleware(openrouter.chat("deepseek/deepseek-r1:free")),
    icon: <DeepSeek width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    id: 5,
    name: "DeepSeek R1 Llama",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-llama-70b:free"),
    ),
    icon: <DeepSeek width={24} height={24} />,
    description: "Llama Distilled (OpenRouter)",
  },
  {
    id: 6,
    name: "DeepSeek R1 Qwen",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-qwen-14b:free"),
    ),
    icon: <DeepSeek width={24} height={24} />,
    description: "Qwen Distilled (OpenRouter)",
  },
  {
    id: 7,
    name: "Gemini 1.5 Flash",
    model: withMiddleware(google("gemini-1.5-flash")),
    icon: <Gemini width={24} height={24} />,
    description: "Google AI",
  },
  {
    id: 8,
    name: "Qwen 2.5 32B",
    model: withMiddleware(openrouter.chat("qwen/qwen3-4b:free")),
    icon: <Qwen width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    id: 9,
    name: "Kimi K2",
    model: withMiddleware(openrouter.chat("moonshotai/kimi-k2:free")),
    icon: <Kimi width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    id: 10,
    name: "Llama 3.1 405B",
    model: withMiddleware(
      openrouter.chat("meta-llama/llama-3.1-405b-instruct:free"),
    ),
    icon: <Meta width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    id: 11,
    name: "Llama 4 Maverick 17B",
    model: withMiddleware(groq("meta-llama/llama-4-scout-17b-16e-instruct")),
    icon: <Meta width={24} height={24} />,
    description: "Groq",
  },
  {
    id: 12,
    name: "DeepSeek R1 Llama Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-llama-70b")),
    icon: <DeepSeek width={24} height={24} />,
    description: "Groq",
    isDefault: true,
  },
  {
    id: 13,
    name: "DeepSeek R1 Qwen Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-qwen-14b")),
    icon: <DeepSeek width={24} height={24} />,
    description: "Groq",
  },
  {
    id: 14,
    name: "GPT OSS 20B 128k",
    model: withMiddleware(groq("openai/gpt-oss-20b")),
    icon: <OpenAI width={24} height={24} />,
    description: "Groq",
  },
  {
    id: 15,
    name: "GPT OSS 120B 128k",
    model: withMiddleware(groq("openai/gpt-oss-120b")),
    icon: <OpenAI width={24} height={24} />,
    description: "Groq",
  },
];
