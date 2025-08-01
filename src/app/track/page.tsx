'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, Package, Truck, CheckCircle, Clock } from 'lucide-react'

// Mock order data
const mockOrder = {
  id: "CD-2024-001",
  status: "in_transit",
  estimatedDelivery: "15-20 minutes",
  items: [
    { name: "Classic White T-Shirt", quantity: 2, size: "M" },
    { name: "Denim Jacket", quantity: 1, size: "L" }
  ],
  total: 2849.97,
  deliveryAddress: "45 Nelson Mandela Square, Sandton, Johannesburg, 2196",
  driverName: "Thabo Mthembu",
  driverPhone: "+27 (11) 784-5623",
  timeline: [
    { status: "Order Placed", time: "2:30 PM", completed: true },
    { status: "Order Confirmed", time: "2:32 PM", completed: true },
    { status: "Preparing Order", time: "2:35 PM", completed: true },
    { status: "Out for Delivery", time: "2:45 PM", completed: true, current: true },
    { status: "Delivered", time: "Est. 3:05 PM", completed: false }
  ]
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [showOrder, setShowOrder] = useState(false)

  const handleSearch = async () => {
    if (orderNumber.trim()) {
      setShowOrder(false)
      try {
        const response = await fetch(`/api/tracking/${orderNumber}`)
        if (response.ok) {
          const data = await response.json()
          // Update mockOrder with real data if available
          setShowOrder(true)
        } else {
          setShowOrder(true) // Show mock data for demo
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        setShowOrder(true) // Show mock data for demo
      }
    }
  }

  const getStatusIcon = (status: string, completed: boolean, current: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-500" />
    } else if (current) {
      return <Clock className="h-6 w-6 text-primary-600 animate-pulse" />
    } else {
      return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Track Your Order</h2>

        {/* Order Search */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter your order number (e.g., CD-2024-001)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Track</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You can find your order number in your confirmation email
          </p>
        </div>

        {/* Order Details */}
        {showOrder && (
          <div className="space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Order #{mockOrder.id}</h3>
                  <p className="text-gray-600">Total: ${mockOrder.total}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-primary-600">
                    <Truck className="h-5 w-5" />
                    <span className="font-semibold">Out for Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">ETA: {mockOrder.estimatedDelivery}</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Your order is on the way!</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Driver {mockOrder.driverName} is heading to your location
                </p>
                <p className="text-blue-600 text-sm">Contact: {mockOrder.driverPhone}</p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Delivery Address:</h4>
                <p className="text-gray-600">{mockOrder.deliveryAddress}</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
              <div className="space-y-4">
                {mockOrder.timeline.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    {getStatusIcon(step.status, step.completed, step.current || false)}
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Order Items</h3>
              <div className="space-y-3">
                {mockOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                    </div>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions about your order, our support team is here to help.
              </p>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Demo Note */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Demo:</strong> Try entering "CD-2024-001" to see a sample order tracking
          </p>
        </div>
      </div>
    </div>
  )
}
