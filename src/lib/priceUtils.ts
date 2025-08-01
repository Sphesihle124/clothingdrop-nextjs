// Price formatting utilities for South African Rand (ZAR)

export interface ProductPrice {
  price: number
  originalPrice?: number
  discount?: number
  onSale?: boolean
  currency?: string
  saleTag?: string
}

/**
 * Format price in South African Rand
 */
export function formatPrice(amount: number, currency: string = 'ZAR'): string {
  if (currency === 'ZAR') {
    return `R${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }
  
  // Fallback for other currencies
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Calculate savings amount
 */
export function calculateSavings(originalPrice: number, salePrice: number): number {
  return originalPrice - salePrice
}

/**
 * Get price display object with all formatting
 */
export function getPriceDisplay(product: ProductPrice) {
  const { price, originalPrice, discount, onSale, currency = 'ZAR', saleTag } = product
  
  const formattedPrice = formatPrice(price, currency)
  
  if (onSale && originalPrice) {
    const formattedOriginalPrice = formatPrice(originalPrice, currency)
    const calculatedDiscount = discount || calculateDiscount(originalPrice, price)
    const savings = calculateSavings(originalPrice, price)
    const formattedSavings = formatPrice(savings, currency)
    
    return {
      currentPrice: formattedPrice,
      originalPrice: formattedOriginalPrice,
      discount: calculatedDiscount,
      savings: formattedSavings,
      onSale: true,
      saleTag: saleTag || 'SALE',
      currency
    }
  }
  
  return {
    currentPrice: formattedPrice,
    originalPrice: null,
    discount: 0,
    savings: null,
    onSale: false,
    saleTag: null,
    currency
  }
}

/**
 * Get price range for multiple products
 */
export function getPriceRange(products: ProductPrice[], currency: string = 'ZAR') {
  if (products.length === 0) return null
  
  const prices = products.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, currency)
  }
  
  return `${formatPrice(minPrice, currency)} - ${formatPrice(maxPrice, currency)}`
}

/**
 * Check if product is on sale
 */
export function isOnSale(product: ProductPrice): boolean {
  return Boolean(product.onSale && product.originalPrice && product.originalPrice > product.price)
}

/**
 * Get sale badge text
 */
export function getSaleBadge(product: ProductPrice): string | null {
  if (!isOnSale(product)) return null
  
  if (product.saleTag) return product.saleTag
  if (product.discount) return `${product.discount}% OFF`
  
  return 'SALE'
}

/**
 * Sort products by price
 */
export function sortProductsByPrice(products: ProductPrice[], direction: 'asc' | 'desc' = 'asc') {
  return [...products].sort((a, b) => {
    return direction === 'asc' ? a.price - b.price : b.price - a.price
  })
}

/**
 * Filter products by price range
 */
export function filterProductsByPriceRange(
  products: ProductPrice[], 
  minPrice: number, 
  maxPrice: number
) {
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice)
}

/**
 * Get products on sale
 */
export function getProductsOnSale(products: ProductPrice[]) {
  return products.filter(isOnSale)
}

/**
 * Calculate total cart value
 */
export function calculateCartTotal(items: Array<{ product: ProductPrice; quantity: number }>, currency: string = 'ZAR') {
  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  const totalSavings = items.reduce((savings, item) => {
    if (item.product.onSale && item.product.originalPrice) {
      const itemSavings = calculateSavings(item.product.originalPrice, item.product.price)
      return savings + (itemSavings * item.quantity)
    }
    return savings
  }, 0)
  
  return {
    subtotal: formatPrice(subtotal, currency),
    subtotalRaw: subtotal,
    totalSavings: formatPrice(totalSavings, currency),
    totalSavingsRaw: totalSavings,
    itemCount: items.reduce((count, item) => count + item.quantity, 0)
  }
}

/**
 * South African specific price ranges for filtering
 */
export const ZAR_PRICE_RANGES = [
  { label: 'Under R500', min: 0, max: 500 },
  { label: 'R500 - R1,000', min: 500, max: 1000 },
  { label: 'R1,000 - R1,500', min: 1000, max: 1500 },
  { label: 'R1,500 - R2,000', min: 1500, max: 2000 },
  { label: 'Over R2,000', min: 2000, max: Infinity }
]

/**
 * Common South African discount percentages
 */
export const COMMON_DISCOUNTS = [10, 15, 20, 25, 30, 40, 50]

/**
 * Seasonal sale tags for South Africa
 */
export const SEASONAL_SALE_TAGS = [
  'SUMMER SALE',
  'WINTER SPECIAL',
  'HERITAGE DAY SALE',
  'BLACK FRIDAY',
  'CYBER MONDAY',
  'YEAR END SALE',
  'BACK TO SCHOOL',
  'MOTHERS DAY',
  'FATHERS DAY',
  'VALENTINES SPECIAL'
]
