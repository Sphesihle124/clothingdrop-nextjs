'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  size: string
  quantity: number
  category: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: any, size: string, navigateToCart?: boolean) => void
  removeFromCart: (id: number, size: string) => void
  updateQuantity: (id: number, size: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number
  isInCart: (id: number, size: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const router = useRouter()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('clothingdrop-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('clothingdrop-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: any, size: string, navigateToCart: boolean = true) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.size === size
    )

    if (existingItemIndex >= 0) {
      // Item already exists, increase quantity
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += 1
      setCartItems(updatedItems)
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        quantity: 1,
        category: product.category
      }
      setCartItems([...cartItems, newItem])
    }

    // Navigate to cart if requested
    if (navigateToCart) {
      setTimeout(() => {
        router.push('/cart')
      }, 300) // Small delay for better UX
    }
  }

  const removeFromCart = (id: number, size: string) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.size === size)))
  }

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }

    setCartItems(cartItems.map(item => 
      item.id === id && item.size === size 
        ? { ...item, quantity } 
        : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  const isInCart = (id: number, size: string) => {
    return cartItems.some(item => item.id === id && item.size === size)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
