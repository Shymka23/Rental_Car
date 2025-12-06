import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMileage(value: number | string): string {
  const numericValue =
    typeof value === 'number'
      ? value
      : Number(String(value).replace(/[^\d]/g, ''));

  if (Number.isNaN(numericValue) || numericValue < 0) {
    return '';
  }

  return numericValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

