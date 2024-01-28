import { type Status, type Prisma } from "@prisma/client";
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

export function getBadgeVariant(status: Status) {
  switch (status) {
    case "DITOLAK":
      return "destructive";
    case "PENDING":
      return "outline";
    case "SELESAI":
      return "default";
  }
}

export function generateTotalFromSuratStatusGroup(
  data: (Prisma.PickEnumerable<Prisma.SuratGroupByOutputType, "status"[]> & {
    _count: number;
  })[]
) {
  const total = data.reduce((acc, curr) => {
    return acc + curr._count;
  }, 0);

  const pending = data.reduce((acc, curr) => {
    return curr.status === "PENDING" ? acc + curr._count : acc;
  }, 0);

  const selesai = data.reduce((acc, curr) => {
    return curr.status === "SELESAI" ? acc + curr._count : acc;
  }, 0);

  const ditolak = data.reduce((acc, curr) => {
    return curr.status === "DITOLAK" ? acc + curr._count : acc;
  }, 0);

  const diambil = data.reduce((acc, curr) => {
    return curr.status === "DIAMBIL" ? acc + curr._count : acc;
  }, 0);

  return {
    total,
    pending,
    selesai,
    ditolak,
    diambil,
  };
}
