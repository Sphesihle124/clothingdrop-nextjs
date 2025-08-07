'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from './CartContext'

export interface OrderItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
  category: string
}

export interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  total: number
  subtotal: number
  deliveryFee: number
  status: 'pending' | 'confirmed' | 'preparing' | 'in_transit' | 'delivered' | 'cancelled'
  createdAt: string
  estimatedDelivery: string
  deliveryAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  timeline: Array<{
    status: string
    time: string
    completed: boolean
    current?: boolean
  }>
}

interface OrderContextType {
  orders: Order[]
  createOrder: (cartItems: CartItem[], deliveryAddress?: any) => string
  getOrder: (orderNumber: string) => Order | null
  updateOrderStatus: (orderNumber: string, status: Order['status']) => void
  getLatestOrder: () => Order | null
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('clothingdrop-orders')
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (error) {
        console.error('Error loading orders from localStorage:', error)
      }
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('clothingdrop-orders', JSON.stringify(orders))
  }, [orders])

  const generateOrderNumber = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const orderCount = orders.length + 1
    return `CD-${year}${month}${day}-${String(orderCount).padStart(3, '0')}`
  }

  const generateTimeline = (status: Order['status'], createdAt: Date) => {
    const timeline = [
      {
        status: 'Order Placed',
        time: createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true
      }
    ]

    if (['confirmed', 'preparing', 'in_transit', 'delivered'].includes(status)) {
      timeline.push({
        status: 'Order Confirmed',
        time: new Date(createdAt.getTime() + 2 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true
      })
    }

    if (['preparing', 'in_transit', 'delivered'].includes(status)) {
      timeline.push({
        status: 'Preparing Order',
        time: new Date(createdAt.getTime() + 5 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true
      })
    }

    if (['in_transit', 'delivered'].includes(status)) {
      timeline.push({
        status: 'Out for Delivery',
        time: new Date(createdAt.getTime() + 15 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: status === 'delivered',
        current: status === 'in_transit'
      })
    }

    if (status === 'delivered') {
      timeline.push({
        status: 'Delivered',
        time: new Date(createdAt.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        completed: true
      })
    } else {
      timeline.push({
        status: 'Delivered',
        time: `Est. ${new Date(createdAt.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        completed: false
      })
    }

    return timeline
  }

  const createOrder = (cartItems: CartItem[], deliveryAddress?: any): string => {
    const orderNumber = generateOrderNumber()
    const createdAt = new Date()
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const deliveryFee = 99.99
    const total = subtotal + deliveryFee

    // Simulate order progression for demo
    const statuses: Order['status'][] = ['confirmed', 'preparing', 'in_transit']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      orderNumber,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        category: item.category
      })),
      total,
      subtotal,
      deliveryFee,
      status: randomStatus,
      createdAt: createdAt.toISOString(),
      estimatedDelivery: '30-45 minutes',
      deliveryAddress: deliveryAddress || {
        street: '45 Nelson Mandela Square',
        city: 'Sandton, Johannesburg',
        state: 'Gauteng',
        zipCode: '2196',
        country: 'South Africa'
      },
      timeline: generateTimeline(randomStatus, createdAt)
    }

    setOrders(prev => [newOrder, ...prev])
    return orderNumber
  }

  const getOrder = (orderNumber: string): Order | null => {
    return orders.find(order => order.orderNumber === orderNumber) || null
  }

  const updateOrderStatus = (orderNumber: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.orderNumber === orderNumber) {
        const createdAt = new Date(order.createdAt)
        return {
          ...order,
          status,
          timeline: generateTimeline(status, createdAt)
        }
      }
      return order
    }))
  }

  const getLatestOrder = (): Order | null => {
    return orders.length > 0 ? orders[0] : null
  }

  const value = {
    orders,
    createOrder,
    getOrder,
    updateOrderStatus,
    getLatestOrder
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
