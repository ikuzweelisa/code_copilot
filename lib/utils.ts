import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const sleep = (ms: number) =>{
 return new Promise(resolve => setTimeout(resolve, ms))
}


export function capitalize(text:string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}