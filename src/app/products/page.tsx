'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Filter, Search, ShoppingCart, Expand } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'
import SizeSelectionModal from '@/components/SizeSelectionModal'
import ProductImageModal from '@/components/ProductImageModal'

// South African Traditional Clothing (prices in South African Rand)
const products = [
  {
    id: 1,
    name: "Traditional Shweshwe Dress",
    price: 899.99,
    image: "https://picsum.photos/400/400?random=1",
    category: "Traditional Dresses",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Ndebele Beaded Necklace",
    price: 649.99,
    image: "https://picsum.photos/400/400?random=2",
    category: "Accessories",
    sizes: ["One Size"]
  },
  {
    id: 3,
    name: "Xhosa Traditional Shirt",
    price: 1299.99,
    image: "https://picsum.photos/400/400?random=3",
    category: "Traditional Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 4,
    name: "Zulu Isicholo Hat",
    price: 1599.99,
    image: "https://picsum.photos/400/400?random=4",
    category: "Traditional Headwear",
    sizes: ["One Size"]
  },
  {
    id: 5,
    name: "Sotho Traditional Blanket",
    price: 2299.99,
    image: "https://picsum.photos/400/400?random=5",
    category: "Traditional Blankets",
    sizes: ["Standard"]
  },
  {
    id: 6,
    name: "Venda Traditional Sandals",
    price: 799.99,
    image: "https://picsum.photos/400/400?random=6",
    category: "Traditional Footwear",
    sizes: ["5", "6", "7", "8", "9", "10", "11"]
  }
]

const categories = ["All", "Traditional Dresses", "Accessories", "Traditional Shirts", "Traditional Headwear", "Traditional Blankets", "Traditional Footwear"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, name: string} | null>(null)

  const { addToCart } = useCart()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSizeSelected = (product: any, size: string) => {
    addToCart(product, size, true) // true = navigate to cart
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleImageClick = (product: any) => {
    setSelectedImage({
      src: product.image,
      alt: product.name,
      name: product.name
    })
    setIsImageModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div
              className="relative h-64 cursor-pointer group"
              onClick={() => handleImageClick(product)}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Expand Icon Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
                  <Expand className="h-5 w-5 text-gray-700" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-2xl font-bold text-primary-600 mb-4">{formatPrice(product.price)}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
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
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}

      {/* Size Selection Modal */}
      <SizeSelectionModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleSizeSelected}
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
