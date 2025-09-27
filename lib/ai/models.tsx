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
  provider: {
    name: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
  };
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
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek R1",
    model: withMiddleware(openrouter.chat("deepseek/deepseek-r1:free")),
    icon: DeepSeek,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "deepseek/deepseek-r1-distill-llama-70b:free",
    name: "DeepSeek R1 Llama Distilled",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-llama-70b:free"),
    ),
    icon: DeepSeek,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "deepseek/deepseek-r1-distill-qwen-14b:free",
    name: "DeepSeek R1 Qwen  Distilled",
    model: withMiddleware(
      openrouter.chat("deepseek/deepseek-r1-distill-qwen-14b:free"),
    ),
    icon: DeepSeek,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "qwen/qwen3-4b:free",
    name: "Qwen 2.5 32B",
    model: withMiddleware(openrouter.chat("qwen/qwen3-4b:free")),
    icon: Qwen,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "moonshotai/kimi-k2:free",
    name: "Kimi K2",
    model: withMiddleware(openrouter.chat("moonshotai/kimi-k2:free")),
    icon: Kimi,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "meta-llama/llama-3.1-405b-instruct:free",
    name: "Llama 3.1 405B",
    model: withMiddleware(
      openrouter.chat("meta-llama/llama-3.1-405b-instruct:free"),
    ),
    icon: Meta,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "x-ai/grok-4-fast:free",
    icon: XAIGrok,
    model: openrouter.chat("x-ai/grok-4-fast:free"),
    name: "Grok 4 Fast Non-Reasoning",
    isDefault: true,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT OSS 20B 128k",
    model: openrouter.chat("openai/gpt-oss-20b:free"),
    icon: OpenAI,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "openai/gpt-oss-120b:free",
    name: "GPT OSS 120B 128k",
    model: openrouter.chat("openai/gpt-oss-120b:free"),
    icon: OpenAI,
    provider: {
      name: "OpenRouter",
      icon: OpenRouter,
    },
  },
  {
    id: "anthropic/claude-sonnet-4",
    icon: Anthropic,
    model: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "anthropic/claude-3.5-sonnet",
    icon: Anthropic,
    model: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "anthropic/claude-3.7-sonnet",
    icon: Anthropic,
    model: "anthropic/claude-3.7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "anthropic/claude-3.5-haiku",
    icon: Anthropic,
    model: "anthropic/claude-3.5-haiku",
    name: "Claude 3.5 haiku",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "openai/gpt-5",
    icon: OpenAI,
    model: "openai/gpt-5",
    name: "GPT-5",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "google/gemini-2.5-pro",
    icon: Google,
    model: "google/gemini-2.5-pro",
    name: "GEMINI 2.5 pro",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "xai/grok-4-fast-non-reasoning",
    icon: XAIGrok,
    model: "xai/grok-4-fast-non-reasoning",
    name: "Grok 4 Fast Non-Reasoning",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "xai/grok-4-fast-reasoning",
    icon: XAIGrok,
    model: "xai/grok-4-fast-reasoning",
    name: "Grok 4 Fast Reasoning",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "openai/gpt-4o",
    icon: OpenAI,
    model: "openai/gpt-4o",
    name: "GPT-4o",
    provider: {
      name: "Vercel",
      icon: Vercel,
    },
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Maverick 17B",
    model: withMiddleware(groq("meta-llama/llama-4-scout-17b-16e-instruct")),
    icon: Meta,
    provider: {
      name: "Groq",
      icon: Groq,
    },
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Llama Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-llama-70b")),
    icon: DeepSeek,
    provider: {
      name: "Groq",
      icon: Groq,
    },
  },
  {
    id: "deepseek-r1-distill-qwen-14b",
    name: "DeepSeek R1 Qwen Distilled",
    model: withMiddleware(groq("deepseek-r1-distill-qwen-14b")),
    icon: DeepSeek,
    provider: {
      name: "Groq",
      icon: Groq,
    },
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B 128k",
    model: withMiddleware(groq("openai/gpt-oss-20b")),
    icon: OpenAI,
    provider: {
      name: "Groq",
      icon: Groq,
    },
  },
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B 128k",
    model: withMiddleware(groq("openai/gpt-oss-120b")),
    icon: OpenAI,
    provider: {
      name: "Groq",
      icon: Groq,
    },
  },
  {
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    model: withMiddleware(google("gemini-1.5-flash")),
    icon: Gemini,
    provider: {
      name: "Google",
      icon: Google,
    },
  },
];
