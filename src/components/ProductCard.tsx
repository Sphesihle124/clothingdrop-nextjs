import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { getPriceDisplay, getSaleBadge } from '@/lib/priceUtils'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleFavorite?: (productId: number) => void
  isFavorite?: boolean
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}: ProductCardProps) {
  const priceDisplay = getPriceDisplay(product)
  const saleBadge = getSaleBadge(product)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-64 overflow-hidden">
        {/* Sale Badge */}
        {saleBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {saleBadge}
            </span>
          </div>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.category}</p>
        </div>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-2xl font-bold text-primary-600">
              {priceDisplay.currentPrice}
            </p>
            {priceDisplay.originalPrice && (
              <p className="text-lg text-gray-500 line-through">
                {priceDisplay.originalPrice}
              </p>
            )}
          </div>

          {priceDisplay.onSale && priceDisplay.savings && (
            <div className="text-sm text-green-600 font-medium">
              Save {priceDisplay.savings} ({priceDisplay.discount}% off)
            </div>
          )}

          <div className="flex gap-1 mt-2">
            {product.sizes.slice(0, 3).map(size => (
              <span key={size} className="px-2 py-1 bg-gray-100 text-xs rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  )
}
