import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPublicPath = (path: string) => {
  // Remove leading "/" and prepend BASE_URL
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
};
