import { formatPrice, validateEmail, validatePhone, generateOrderId, calculateDeliveryTime } from '@/lib/utils'

describe('Utils', () => {
  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(formatPrice(29.99)).toBe('$29.99')
      expect(formatPrice(100)).toBe('$100.00')
      expect(formatPrice(0.99)).toBe('$0.99')
    })
  })

  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
      expect(validateEmail('user+tag@example.org')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
      expect(validateEmail('')).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('validates correct phone numbers', () => {
      expect(validatePhone('+1234567890')).toBe(true)
      expect(validatePhone('123-456-7890')).toBe(true)
      expect(validatePhone('(123) 456-7890')).toBe(true)
    })

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false)
      expect(validatePhone('abc-def-ghij')).toBe(false)
      expect(validatePhone('')).toBe(false)
    })
  })

  describe('generateOrderId', () => {
    it('generates unique order IDs', () => {
      const id1 = generateOrderId()
      const id2 = generateOrderId()
      
      expect(id1).toMatch(/^CD-/)
      expect(id2).toMatch(/^CD-/)
      expect(id1).not.toBe(id2)
    })
  })

  describe('calculateDeliveryTime', () => {
    it('calculates delivery time based on distance', () => {
      expect(calculateDeliveryTime(1)).toBe('20-30 minutes')
      expect(calculateDeliveryTime(5)).toBe('20-30 minutes')
      expect(calculateDeliveryTime(10)).toBe('30-45 minutes')
      expect(calculateDeliveryTime(20)).toBe('45-60 minutes')
      expect(calculateDeliveryTime(30)).toBe('60+ minutes')
    })
  })
})
