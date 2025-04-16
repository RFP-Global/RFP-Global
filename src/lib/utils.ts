import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for conditionally joining CSS class names together
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
