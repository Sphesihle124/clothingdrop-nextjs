'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, Expand } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import { useOrders } from '@/contexts/OrderContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import OrderSuccessModal from '@/components/OrderSuccessModal'
import ProductImageModal from '@/components/ProductImageModal'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemCount, clearCart } = useCart()
  const { createOrder } = useOrders()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [lastOrderNumber, setLastOrderNumber] = useState('')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, name: string} | null>(null)

  const subtotal = getCartTotal()
  const deliveryFee = 99.99
  const total = subtotal + deliveryFee
  const itemCount = getCartItemCount()

  const handleCheckout = async () => {
    if (cartItems.length === 0) return

    setIsCheckingOut(true)

    // Create order from cart items
    const orderNumber = createOrder(cartItems)
    setLastOrderNumber(orderNumber)

    // Clear the cart
    clearCart()

    // Show success modal
    setTimeout(() => {
      setIsCheckingOut(false)
      setShowSuccessModal(true)
    }, 1000)
  }

  const handleImageClick = (item: any) => {
    setSelectedImage({
      src: item.image,
      alt: item.name,
      name: item.name
    })
    setIsImageModalOpen(true)
  }

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
          <h2 className="text-2xl font-bold mb-6">Shopping Cart ({itemCount} items)</h2>
          
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
                    <div
                      className="relative w-20 h-20 cursor-pointer group"
                      onClick={() => handleImageClick(item)}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Expand Icon Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-lg">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-1">
                          <Expand className="h-3 w-3 text-gray-700" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-primary-600 font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
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
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Estimated delivery time:</p>
                <p className="font-semibold text-green-600">30-45 minutes</p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-3"
              >
                {isCheckingOut ? 'Creating Order...' : 'Place Order & Track'}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Free delivery on orders over R900
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        orderNumber={lastOrderNumber}
        total={total}
        itemCount={itemCount}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Full-screen Image Modal */}
      {selectedImage && (
        <ProductImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          productName={selectedImage.name}
        />
      )}
    </div>
  )
}
