import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateImageUrl(image: string) {
  if (!image) return "/fallback-placeholder.webp";
  return `https://xqijijyabnvlwpednmpf.supabase.co/storage/v1/object/public/pms/${image}`;
}

