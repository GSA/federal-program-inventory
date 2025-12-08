import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBasePath(path: string) {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path if present to avoid double slashes if base ends with slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If base is just '/', return path with leading slash
  if (base === '/') {
    return `/${cleanPath}`;
  }

  // Ensure base ends with slash for consistency or handle joining
  // Astro's BASE_URL usually includes the slash if configured, or we can just join.
  // Let's be safe:
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
