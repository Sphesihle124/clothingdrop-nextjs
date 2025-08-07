import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | undefined | null): string {
  // Handle undefined, null, or invalid price values
  if (price === undefined || price === null || isNaN(price)) {
    return 'R0.00'
  }

  // Ensure price is a number
  const numPrice = typeof price === 'string' ? parseFloat(price) : price

  if (isNaN(numPrice)) {
    return 'R0.00'
  }

  // Format as R1,234.56 (South African Rand format)
  return `R${numPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `CD-${timestamp}-${randomStr}`.toUpperCase()
}

export function calculateDeliveryTime(distance: number): string {
  // Simple calculation: 2 minutes per km + 15 minutes base time
  const baseTime = 15
  const travelTime = Math.ceil(distance * 2)
  const totalTime = baseTime + travelTime
  
  if (totalTime <= 30) {
    return "20-30 minutes"
  } else if (totalTime <= 45) {
    return "30-45 minutes"
  } else if (totalTime <= 60) {
    return "45-60 minutes"
  } else {
    return "60+ minutes"
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
