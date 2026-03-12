// src/lib/utils.ts
// Shared utility functions used throughout the app.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() — merges Tailwind class names intelligently
// Usage: className={cn("base-class", condition && "conditional-class")}
// PHP equivalent: implode(' ', array_filter(['class1', $condition ? 'class2' : '']))
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Capitalize first letter of each word
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Format a date to readable string
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
