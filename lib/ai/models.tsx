import {
  Gemini,
  DeepSeek,
  Qwen,
  Kimi,
  Meta,
  OpenAI,
  Anthropic,
  XAIGrok,
  Google,
  Groq,
  OpenRouter,
  Vercel,
} from "~/components/ui/icons";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { openrouter } from "@openrouter/ai-sdk-provider";
import {
  LanguageModel,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import React from "react";

export interface Model {
  id: string;
  name: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  model: LanguageModel;
  isDefault?: boolean;
  isPremium?: boolean;
}

function withMiddleware<T extends Exclude<LanguageModel, string>>(model: T) {
  return wrapLanguageModel({
    model: model,
    middleware: [extractReasoningMiddleware({ tagName: "think" })],
  });
}

export const models: Model[] = [
  {
    id: "DeepSeek: DeepSeek V3",
    name: "DeepSeek V3",
    model: withMiddleware(openrouter.chat("DeepSeek: DeepSeek V3")),
    icon: DeepSeek,
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek R1",
    model: withMiddleware(openrouter.chat("deepseek/deepseek-r1:free")),
    icon: DeepSeek,
  },
  {
    id: "deepseek/deepseek-r1-distill-llama-70b:free",
    name: "DeepSeek R1 Llama Distilled",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-llama-70b:free"),
    ),
    icon: DeepSeek,
  },
  {
    id: "deepseek/deepseek-r1-distill-qwen-14b:free",
    name: "DeepSeek R1 Qwen  Distilled",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-qwen-14b:free"),
    ),
    icon: DeepSeek,
  },
  {
    id: "qwen/qwen3-4b:free",
    name: "Qwen 2.5 32B",
    model: withMiddleware(openrouter.chat("qwen/qwen3-4b:free")),
    icon: Qwen,
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "Kimi K2",
    model: withMiddleware(openrouter.chat("moonshotai/kimi-k2:free")),
    icon: Kimi,
    isPremium: true,
  },
  {
    id: "x-ai/grok-4-fast:free",
    icon: XAIGrok,
    model: openrouter.chat("x-ai/grok-4-fast:free"),
    name: "Grok 4 Fast Non-Reasoning",
    isPremium: true,
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT OSS 20B 128k",
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    icon: OpenAI,
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "GPT OSS 120B 128k",
    model: openrouter.chat("openai/gpt-oss-120b:free"),
    icon: OpenAI,
  },
  {
    id: "anthropic/claude-4.5-sonnet",
    icon: Anthropic,
    model: "anthropic/claude-4.5-sonnet",
    name: "Claude 4.5 Sonnet",
    isPremium: true,
  },
  {
    id: "anthropic/claude-4.5-haiku",
    icon: Anthropic,
    model: "anthropic/claude-4.5-haiku",
    name: "Claude 4.5 haiku",
    isPremium: true,
  },
  {
    id: "openai/gpt-5",
    icon: OpenAI,
    model: "openai/gpt-5",
    name: "GPT-5",
    isPremium: true,
  },
  {
    id: "google/gemini-2.5-pro",
    icon: Google,
    name: "GEMINI 2.5 pro",
    model: withMiddleware(google("gemini-2.5-pro")),
    isPremium: true,
  },
  {
    id: "xai/grok-4-fast-non-reasoning",
    icon: XAIGrok,
    model: "xai/grok-4-fast-non-reasoning",
    name: "Grok 4 Fast Non-Reasoning",
    isPremium: true,
  },
  {
    id: "xai/grok-4-fast-reasoning",
    icon: XAIGrok,
    model: "xai/grok-4-fast-reasoning",
    name: "Grok 4 Fast Reasoning",
    isPremium: true,
  },
  {
    id: "openai/gpt-4o",
    icon: OpenAI,
    model: "openai/gpt-4o",
    name: "GPT-4o",
    isPremium: true,
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Llama Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-llama-70b")),
    icon: DeepSeek,
  },
  {
    id: "deepseek-r1-distill-qwen-14b",
    name: "DeepSeek R1 Qwen Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-qwen-14b")),
    icon: DeepSeek,
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B 128k",
    model: withMiddleware(groq("openai/gpt-oss-20b")),
    icon: OpenAI,
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B 128k",
    model: withMiddleware(groq("openai/gpt-oss-120b")),
    icon: OpenAI,
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    model: withMiddleware(google("gemini-2.5-flash")),
    icon: Gemini,
    isDefault: true,
  },
];
