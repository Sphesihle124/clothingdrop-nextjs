'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Package, Clock, X } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

interface OrderSuccessModalProps {
  isOpen: boolean
  orderNumber: string
  total: number
  itemCount: number
  onClose: () => void
}

export default function OrderSuccessModal({ 
  isOpen, 
  orderNumber, 
  total, 
  itemCount, 
  onClose 
}: OrderSuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  if (!isOpen && !isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl max-w-md w-full transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Order Placed!</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Thank you for your order!</h3>
            <p className="text-gray-600">Your traditional clothing is being prepared</p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Order Number:</span>
              <span className="font-mono font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Items:</span>
              <span className="font-semibold">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Estimated Delivery</p>
              <p className="text-sm text-blue-600">30-45 minutes</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href={`/track?order=${orderNumber}`}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block text-center"
              onClick={handleClose}
            >
              Track Your Order
            </Link>
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a href="tel:+27117845623" className="text-primary-600 hover:underline">
                +27 (11) 784-5623
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
