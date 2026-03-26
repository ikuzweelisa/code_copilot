import { clsx, type ClassValue } from "clsx";
import { isToday, isYesterday, subMonths, subWeeks, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

import { GroupedChats } from "~/lib/types";

import { Chat } from "./ai/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
}
export async function fetcher(url: string) {
  const res = await fetch(url);
  return await res.json();
}
export function groupChats(chats: Chat[]): GroupedChats {
  return chats.reduce(
    (acc, chat) => {
      if (chat.status === "PINNED") {
        acc.pinned.push(chat);
        return acc;
      }
      if (chat.status === "ARCHIVED") {
        acc.archived.push(chat);
        return acc;
      }
      const chatDate = new Date(chat.updatedAt);
      if (isToday(chatDate)) {
        acc.today.push(chat);
      } else if (isYesterday(chatDate)) {
        acc.yesterday.push(chat);
      } else if (chatDate > subWeeks(new Date(), 1)) {
        acc.lastWeek.push(chat);
      } else if (chatDate > subMonths(new Date(), 1)) {
        acc.lastMonth.push(chat);
      } else {
        acc.older.push(chat);
      }
      return acc;
    },
    {
      pinned: [],
      archived: [],
      today: [],
      yesterday: [],
      lastWeek: [],
      lastMonth: [],
      older: [],
    } as GroupedChats,
  );
}

export function formatTime(chatDate: Date): string {
  const date = new Date(chatDate);

  const formated = formatDistanceToNow(date);
  return `${formated} ago`;
}

export function formatNumber(num: number | string): string {
  return new Intl.NumberFormat("en-US").format(Number(num));
}
