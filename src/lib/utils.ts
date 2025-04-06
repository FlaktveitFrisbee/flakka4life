import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigation = [
  { href: "/", label: "Hjem" },
  { href: "/about", label: "Om oss" },
  { href: "/posts", label: "Innlegg" },
  { href: "/course", label: "Banen" },
  { href: "/membership", label: "Bli medlem" },
  { href: "/tournaments", label: "Turneringer" },
];
