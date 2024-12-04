"use client";;
import { BotMessage } from "./bot-message";

export default function ErrorMessage() {
  return <BotMessage className="text-red-500">Unable to generate response. Please try again</BotMessage>;
}
