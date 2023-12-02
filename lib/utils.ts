import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLinkActive(currentPath: string, itemPath: string) {
  if (currentPath === "/warga" || currentPath === "/admin") {
    return currentPath === itemPath;
  }

  currentPath = currentPath.slice(7, currentPath.length);

  const currentPathArray = currentPath.split("/");

  if (itemPath.includes(currentPathArray[0] ?? "")) {
    return true;
  }

  return;
}

export function formatEnumValue(input: string): string {
  // Replace underscores with spaces
  const formatted = input.replace(/_/g, " ");

  // Capitalize the first letter of each word
  const words = formatted.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return capitalizedWords.join(" ");
}
