import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getHours } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLocaleLowerCase();
}

export const getFileIcon = (type: string): string => {
  switch (type) {
    case "pdf":
      return "FileText";
    case "image":
      return "Image";
    default:
      return "Paperclip";
  }
};

export async function greet() {
  const date=new Date();
  const hour = getHours(date);
  if (hour >= 5 && hour <= 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour <= 17) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
