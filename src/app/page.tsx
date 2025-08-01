import Link from 'next/link'
import { ShoppingBag, Truck, Clock, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Fashion Delivered in <span className="text-primary-600">Minutes</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest clothing trends delivered to your doorstep with our ultra-fast delivery service. 
          From casual wear to formal attire, we've got you covered.
        </p>
        <Link 
          href="/products" 
          className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Start Shopping
        </Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <Truck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your orders delivered within 30-60 minutes in Johannesburg and Cape Town</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
          <p className="text-gray-600">Track your order from pickup to delivery with live updates</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-sm">
          <Star className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">Premium clothing brands with hassle-free returns</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white rounded-2xl p-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to upgrade your wardrobe?</h3>
        <p className="text-xl mb-6">Join thousands of satisfied customers who trust ClothingDrop</p>
        <Link 
          href="/products" 
          className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Browse Collection
        </Link>
      </section>
    </div>
  )
}
