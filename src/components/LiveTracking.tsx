'use client'

import { useState, useEffect } from 'react'
import { MapPin, Truck, Clock, Phone } from 'lucide-react'

interface LiveTrackingProps {
  orderId: string
  initialData?: any
}

export default function LiveTracking({ orderId, initialData }: LiveTrackingProps) {
  const [trackingData, setTrackingData] = useState(initialData)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would be a WebSocket connection or Server-Sent Events
      setLastUpdate(new Date())
      
      // Simulate location updates for in-transit orders
      if (trackingData?.order?.status === 'in_transit') {
        setTrackingData((prev: any) => ({
          ...prev,
          tracking: {
            ...prev.tracking,
            currentLocation: {
              lat: 40.7128 + (Math.random() - 0.5) * 0.01,
              lng: -74.0060 + (Math.random() - 0.5) * 0.01
            }
          }
        }))
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [trackingData?.order?.status])

  if (!trackingData) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    )
  }

  const { order, tracking } = trackingData

  return (
    <div className="space-y-6">
      {/* Live Status Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live Tracking</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>

        {order.status === 'in_transit' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Your order is on the way!</p>
                <p className="text-blue-700 text-sm">
                  Driver {order.driver_name} is heading to your location
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700 text-sm">
                  Estimated arrival: {tracking.estimatedDelivery}
                </span>
              </div>
              <a 
                href={`tel:${order.driver_phone}`}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>Call Driver</span>
              </a>
            </div>
          </div>
        )}

        {/* Map Placeholder */}
        {order.status === 'in_transit' && tracking.currentLocation && (
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Interactive map would show here</p>
              <p className="text-gray-500 text-xs">
                Current location: {tracking.currentLocation.lat.toFixed(4)}, {tracking.currentLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {/* Progress Timeline */}
        <div className="space-y-4">
          <h4 className="font-semibold">Order Progress</h4>
          {tracking.timeline.map((step: any, index: number) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {step.completed ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : step.current ? (
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center animate-pulse">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${step.completed ? 'text-gray-900' : step.current ? 'text-primary-600' : 'text-gray-500'}`}>
                  {step.status}
                </p>
                <p className="text-sm text-gray-500">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="font-semibold mb-4">Delivery Details</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Delivery Address</p>
            <p className="font-medium">{order.delivery_address}</p>
          </div>
          {order.driver_name && (
            <div>
              <p className="text-sm text-gray-600">Driver</p>
              <p className="font-medium">{order.driver_name}</p>
              <p className="text-sm text-gray-500">{order.driver_phone}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">Order Total</p>
            <p className="font-medium">${order.total}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">Need Help?</h4>
        <p className="text-yellow-800 text-sm mb-3">
          If you have any issues with your delivery, contact our support team immediately.
        </p>
        <div className="flex space-x-3">
          <a
            href="tel:+27117845623"
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
          >
            Call Support
          </a>
          <button className="bg-white text-yellow-700 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  )
}
