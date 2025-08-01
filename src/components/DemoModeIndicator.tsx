'use client'

import { useState } from 'react'
import { X, Info } from 'lucide-react'

export default function DemoModeIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="h-4 w-4" />
          <span className="text-sm font-medium">
            🇿🇦 <strong>ClothingDrop Demo Mode</strong> - Explore all features with sample data
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs opacity-90">
            Ready for full version? Check FULL-VERSION-SETUP.md
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close demo mode indicator"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
