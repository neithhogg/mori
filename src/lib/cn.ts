import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merges Tailwind classes safely — resolves conflicts (e.g. rounded-md + rounded-lg → rounded-lg).
// Products call cn() whenever composing component classNames with consumer overrides.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
