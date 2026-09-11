import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True for values that already address a location on their own — absolute
 *  URLs, protocol-relative URLs, and data/blob URIs. */
const isAbsolute = (path: string) => /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i.test(path);

export const getPublicPath = (path: string) => {
  // Assets hosted elsewhere (e.g. the resume on S3) are already complete URLs —
  // prefixing BASE_URL would produce "/portfolio/https://...".
  if (isAbsolute(path)) return path;

  // Remove leading "/" and prepend BASE_URL
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
};
