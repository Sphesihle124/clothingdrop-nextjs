'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Filter, Search, ShoppingCart } from 'lucide-react'

// Mock product data (prices in South African Rand)
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 549.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 1649.99,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Black Jeans",
    price: 1449.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Jeans",
    sizes: ["28", "30", "32", "34", "36"]
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 5,
    name: "Hoodie",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 6,
    name: "Sneakers",
    price: 2399.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11", "12"]
  }
]

const categories = ["All", "T-Shirts", "Jackets", "Jeans", "Dresses", "Hoodies", "Shoes"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<any[]>([])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: any) => {
    setCart([...cart, { ...product, quantity: 1 }])
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
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-2xl font-bold text-primary-600 mb-4">${product.price}</p>
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
                  onClick={() => addToCart(product)}
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
    </div>
  )
}
