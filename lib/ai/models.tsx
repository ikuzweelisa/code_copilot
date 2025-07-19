import { Gemini, DeepSeek, Qwen, MoonShot, Meta } from "~/components/ui/icons";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import {
  openrouter,
  LanguageModelV2 as OpenRouterLanguageModelV2,
} from "@openrouter/ai-sdk-provider";
import { type LanguageModel } from "ai";

export type Model = {
  name: string;
  icon: React.ReactNode;
  model: LanguageModel | OpenRouterLanguageModelV2;
  description?: string;
  isDefault?: boolean;
};

export const models: Model[] = [
  {
    name: "Gemini 2.5 Pro",
    icon: <Gemini width={24} height={24} />,
    model: openrouter.chat("google/gemini-2.5-pro-exp-03-25"),
    description: "OpenRouter",
    isDefault: true,
  },
  {
    name: "Gemini 2.5 Flash",
    icon: <Gemini width={24} height={24} />,
    model: openrouter.chat("google/gemini-2.5-flash-exp-03-25"),
    description: "OpenRouter",
  },
  {
    name: "DeepSeek V3",
    model: openrouter.chat("DeepSeek: DeepSeek V3"),
    icon: <DeepSeek width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    name: "DeepSeek R1",
    model: openrouter.chat("deepseek/deepseek-r1:free"),
    icon: <DeepSeek width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    name: "DeepSeek R1 Llama",
    model: openrouter.chat("deepseek/deepseek-r1-distill-llama-70b:free"),
    icon: <DeepSeek width={24} height={24} />,
    description: "Llama Distilled (OpenRouter)",
  },
  {
    name: "DeepSeek R1 Qwen",
    model: openrouter.chat("deepseek/deepseek-r1-distill-qwen-14b:free"),
    icon: <DeepSeek width={24} height={24} />,
    description: "Qwen Distilled (OpenRouter)",
  },
  {
    name: "Gemini 1.5 Flash",
    model: google("gemini-1.5-flash"),
    icon: <Gemini width={24} height={24} />,
    description: "Google AI",
  },
  {
    name: "Qwen 2.5 32B",
    model: openrouter.chat("qwen/qwen3-4b:free"),
    icon: <Qwen width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    name: "Kimi K2",
    model: openrouter.chat("moonshotai/kimi-k2:free"),
    icon: <MoonShot width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    name: "Llama 3.1 405B",
    model: openrouter.chat("meta-llama/llama-3.1-405b-instruct:free"),
    icon: <Meta width={24} height={24} />,
    description: "OpenRouter",
  },
  {
    name: "Llama 4 Maverick 17B",
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
    icon: <Meta width={24} height={24} />,
    description: "Groq",
  },
  {
    name: "DeepSeek R1 Llama (Groq)",
    model: groq("deepseek-r1-distill-llama-70b"),
    icon: <DeepSeek width={24} height={24} />,
    description: "Llama Distilled",
  },
  {
    name: "DeepSeek R1 Qwen (Groq)",
    model: groq("deepseek-r1-distill-qwen-14b"),
    icon: <DeepSeek width={24} height={24} />,
    description: "Qwen Distilled",
  },
];
