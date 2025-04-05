import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date object to a readable string format
 * @param date The date to format
 * @returns Formatted date string (e.g., "April 15, 2025")
 */
export function formatDate(date: Date): string {
  return format(date, 'MMMM d, yyyy')
}
