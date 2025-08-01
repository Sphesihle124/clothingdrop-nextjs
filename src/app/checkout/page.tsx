'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import CheckoutForm from '@/components/CheckoutForm'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

// Mock cart data - in a real app, this would come from context or state management (prices in ZAR)
const mockCartItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 549.99,
    size: "M",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 1649.99,
    size: "L",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop"
  }
]

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 99.99
  const total = subtotal + deliveryFee

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            metadata: {
              userId: user.id,
              itemCount: mockCartItems.length,
            },
          }),
        })

        const data = await response.json()
        if (data.clientSecret) {
          setClientSecret(data.clientSecret)
        }
      } catch (error) {
        console.error('Error creating payment intent:', error)
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [user, total])

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  if (!user) {
    return null // Will redirect to login
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Setting up secure payment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Cart Link */}
      <div className="mb-8">
        <Link href="/cart" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {mockCartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Estimated delivery:</strong> 30-45 minutes
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Payment Details</h2>
          
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm 
                clientSecret={clientSecret}
                orderTotal={total}
                cartItems={mockCartItems}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  )
}
