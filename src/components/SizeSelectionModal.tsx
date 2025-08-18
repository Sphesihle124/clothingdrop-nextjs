'use client'

import { useState } from 'react'
import { X, ShoppingCart, Expand } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import ProductImageModal from './ProductImageModal'

interface Product {
  id: number
  name: string
  price: number
  image: string
  sizes: string[]
  category: string
}

interface SizeSelectionModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product, size: string) => void
}

export default function SizeSelectionModal({
  product,
  isOpen,
  onClose,
  onAddToCart
}: SizeSelectionModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (!isOpen || !product) return null

  const handleAddToCart = async () => {
    if (!selectedSize) return
    
    setIsAdding(true)
    onAddToCart(product, selectedSize)
    
    // Show success feedback
    setTimeout(() => {
      setIsAdding(false)
      setSelectedSize('')
      onClose()
    }, 500)
  }

  const handleClose = () => {
    setSelectedSize('')
    onClose()
  }

  const handleImageClick = () => {
    setIsImageModalOpen(true)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Select Size</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <div
              className="relative w-20 h-20 flex-shrink-0 cursor-pointer group"
              onClick={handleImageClick}
            >
              <Image
                src={product.image}
                alt={product.name}
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
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-primary-600 font-bold text-lg">{formatPrice(product.price)}</p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Available Sizes:</h4>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 border rounded-lg text-center font-medium transition-colors ${
                    selectedSize === size
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-sm text-gray-500 mt-2">Please select a size to continue</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize || isAdding}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${
              selectedSize && !isAdding
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>
              {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
            </span>
          </button>

          {/* Size Guide */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-sm mb-2">Size Guide:</h5>
            <div className="text-xs text-gray-600 space-y-1">
              {product.category.includes('Traditional Dresses') && (
                <>
                  <p><strong>S:</strong> Bust 32-34", Waist 26-28"</p>
                  <p><strong>M:</strong> Bust 36-38", Waist 30-32"</p>
                  <p><strong>L:</strong> Bust 40-42", Waist 34-36"</p>
                </>
              )}
              {product.category.includes('Traditional Shirts') && (
                <>
                  <p><strong>S:</strong> Chest 36-38"</p>
                  <p><strong>M:</strong> Chest 40-42"</p>
                  <p><strong>L:</strong> Chest 44-46"</p>
                </>
              )}
              {product.category.includes('Traditional Footwear') && (
                <p>Standard South African shoe sizes</p>
              )}
              {(product.category.includes('Headwear') || product.category.includes('Accessories')) && (
                <p>One size fits most adults</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Image Modal */}
      <ProductImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={product.image}
        imageAlt={product.name}
        productName={product.name}
      />
    </div>
  )
}
