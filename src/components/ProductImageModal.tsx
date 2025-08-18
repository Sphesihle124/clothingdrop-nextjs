'use client'

import { useState, useEffect } from 'react'
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'
import Image from 'next/image'

interface ProductImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  productName: string
}

export default function ProductImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  productName
}: ProductImageModalProps) {
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setZoom(1)
      setRotation(0)
      setPosition({ x: 0, y: 0 })
      setIsDragging(false)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case '+':
        case '=':
          e.preventDefault()
          handleZoomIn()
          break
        case '-':
          e.preventDefault()
          handleZoomOut()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          handleRotate()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleReset = () => {
    setZoom(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm p-4 z-10">
        <div className="flex items-center justify-between text-white">
          <h2 className="text-lg font-semibold truncate">{productName}</h2>
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Zoom Out (-)"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-sm min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Zoom In (+)"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            
            {/* Rotate */}
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Rotate (R)"
            >
              <RotateCw className="h-5 w-5" />
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-3 py-1 text-sm hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              title="Reset View"
            >
              Reset
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              title="Close (Esc)"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Container */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div
          className="relative transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={800}
            height={800}
            className="object-contain max-w-full max-h-full"
            priority
            draggable={false}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-lg">
        <div className="flex items-center space-x-4 text-xs opacity-75">
          <span>ESC: Close</span>
          <span>+/-: Zoom</span>
          <span>R: Rotate</span>
          {zoom > 1 && <span>Drag: Pan</span>}
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  )
}
