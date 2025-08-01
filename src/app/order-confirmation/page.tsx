'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Clock, MapPin } from 'lucide-react'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const paymentIntentId = searchParams.get('payment_intent')
  
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      // In a real app, fetch the order details
      // For now, we'll use mock data
      setTimeout(() => {
        setOrder({
          id: orderId,
          status: 'confirmed',
          total: 2849.97,
          estimatedDelivery: '30-45 minutes',
          deliveryAddress: '45 Nelson Mandela Square, Sandton, Johannesburg, 2196',
          items: [
            { name: 'Classic White T-Shirt', quantity: 2, size: 'M', price: 549.99 },
            { name: 'Denim Jacket', quantity: 1, size: 'L', price: 1649.99 }
          ]
        })
        setLoading(false)
      }, 1000)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link 
            href="/products" 
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order is being prepared.</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">Order #{order.id}</h2>
              <p className="text-gray-600">Status: <span className="text-green-600 font-medium">Confirmed</span></p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">${order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Total paid</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Estimated Delivery</span>
            </div>
            <p className="text-blue-700 font-medium">{order.estimatedDelivery}</p>
            <div className="flex items-center space-x-2 mt-3">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700 text-sm">{order.deliveryAddress}</span>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">What happens next?</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-gray-700">We're preparing your order</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-gray-700">Your order will be picked up by our delivery partner</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-gray-700">You'll receive real-time tracking updates</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href={`/track?order=${order.id}`}
            className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-primary-700 transition-colors"
          >
            Track Your Order
          </Link>
          <Link 
            href="/products"
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-center font-semibold hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Need help with your order? <Link href="/contact" className="font-medium underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
