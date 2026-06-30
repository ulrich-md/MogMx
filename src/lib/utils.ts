import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Standard shadcn/ui helper; required by primitives copied from 21st.dev.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
