'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, ShoppingCart, X } from 'lucide-react'
import Link from 'next/link'

interface CartNotificationProps {
  show: boolean
  productName: string
  onClose: () => void
}

export default function CartNotification({ show, productName, onClose }: CartNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 4000)
      
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show && !isVisible) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Added to Cart!</h4>
            <p className="text-sm text-gray-600 mt-1">{productName}</p>
            <div className="flex space-x-2 mt-3">
              <Link
                href="/cart"
                className="inline-flex items-center space-x-1 text-sm bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>View Cart</span>
              </Link>
              <button
                onClick={() => setIsVisible(false)}
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                Continue Shopping
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
