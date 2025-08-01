import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'A test product description',
  price: 29.99,
  image: 'https://example.com/image.jpg',
  category: 'T-Shirts',
  sizes: ['S', 'M', 'L'],
  inStock: true
}

const mockAddToCart = jest.fn()

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddToCart.mockClear()
  })

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('T-Shirts')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('A test product description')).toBeInTheDocument()
  })

  it('displays available sizes', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    )

    expect(screen.getByText('S')).toBeInTheDocument()
    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
  })

  it('calls onAddToCart when add to cart button is clicked', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockAddToCart} 
      />
    )

    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('disables add to cart button when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    
    render(
      <ProductCard 
        product={outOfStockProduct} 
        onAddToCart={mockAddToCart} 
      />
    )

    const addToCartButton = screen.getByText('Out of Stock')
    expect(addToCartButton).toBeDisabled()
  })

  it('shows out of stock overlay when product is not in stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false }
    
    render(
      <ProductCard 
        product={outOfStockProduct} 
        onAddToCart={mockAddToCart} 
      />
    )

    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
  })
})
