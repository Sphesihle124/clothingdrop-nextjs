'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { useAuth } from '@/contexts/AuthContext'
import { formatPrice } from '@/lib/utils'

interface CheckoutFormProps {
  clientSecret: string
  orderTotal: number
  cartItems: any[]
}

export default function CheckoutForm({ clientSecret, orderTotal, cartItems }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      // Create the order first
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            size: item.size,
            quantity: item.quantity
          })),
          total: orderTotal,
          deliveryAddress: {
            street: '45 Nelson Mandela Square',
            city: 'Sandton, Johannesburg',
            state: 'Gauteng',
            zipCode: '2196',
            country: 'ZA'
          }
        }),
      })

      const orderData = await orderResponse.json()
      
      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation?order_id=${orderData.order.id}`,
        },
        redirect: 'if_required'
      })

      if (error) {
        setMessage(error.message || 'An unexpected error occurred.')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, redirect to confirmation page
        router.push(`/order-confirmation?order_id=${orderData.order.id}&payment_intent=${paymentIntent.id}`)
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {message && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Delivery Information</h3>
          <p className="text-blue-800 text-sm">
            Your order will be delivered to: 45 Nelson Mandela Square, Sandton, Johannesburg, 2196
          </p>
          <p className="text-blue-700 text-sm mt-1">
            Estimated delivery time: 30-45 minutes
          </p>
        </div>

        <button
          disabled={isLoading || !stripe || !elements}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : `Pay ${formatPrice(orderTotal)}`}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your payment information is secure and encrypted. We never store your card details.
      </p>
    </form>
  )
}
