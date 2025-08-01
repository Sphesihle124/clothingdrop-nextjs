'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'

// Mock cart data (prices in South African Rand)
const initialCartItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    size: "M",
    quantity: 2
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 1649.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    size: "L",
    quantity: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id))
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = 99.99
  const total = subtotal + deliveryFee

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Shopping Link */}
      <div className="mb-8">
        <Link href="/products" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <Link 
                href="/products" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-primary-600 font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Estimated delivery time:</p>
                <p className="font-semibold text-green-600">30-45 minutes</p>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mb-3 block text-center"
              >
                Proceed to Checkout
              </Link>
              
              <p className="text-xs text-gray-500 text-center">
                Free delivery on orders over R900
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
