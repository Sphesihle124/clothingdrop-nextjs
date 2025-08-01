export interface Product {
  id: number
  name: string
  description?: string
  price: number
  image: string
  category: string
  sizes: string[]
  inStock: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: Address
  createdAt: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  deliveryAddress: Address
  estimatedDelivery?: string
  driverName?: string
  driverPhone?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: number
  name: string
  price: number
  size: string
  quantity: number
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'

export interface DeliveryTracking {
  orderId: string
  status: OrderStatus
  timeline: TrackingEvent[]
  currentLocation?: {
    lat: number
    lng: number
  }
  estimatedArrival?: string
}

export interface TrackingEvent {
  status: string
  time: string
  completed: boolean
  current?: boolean
  description?: string
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
}
