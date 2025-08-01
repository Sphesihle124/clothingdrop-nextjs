'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'

interface HeaderProps {
  cartItemCount?: number
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const { user, signOut } = useAuth()
  const user = null // Temporary: disable auth for initial setup

  const handleSignOut = async () => {
    // await signOut()
    console.log('Sign out clicked')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">ClothingDrop</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-primary-600 transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-primary-600 transition-colors">
              Categories
            </Link>
            <Link href="/track" className="text-gray-600 hover:text-primary-600 transition-colors">
              Track Order
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user.user_metadata?.name || user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/products" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/track" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link 
                  href="/cart" 
                  className="flex items-center space-x-2 text-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
                
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="h-5 w-5" />
                      <span className="text-sm">{user.user_metadata?.name || user.email}</span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="text-red-600 hover:text-red-700 transition-colors text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
