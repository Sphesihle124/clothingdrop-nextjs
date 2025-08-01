import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock the AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  }),
}))

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    
    expect(screen.getByText(/Fashion Delivered in/)).toBeInTheDocument()
    expect(screen.getByText(/Minutes/)).toBeInTheDocument()
  })

  it('renders the hero description', () => {
    render(<Home />)
    
    expect(screen.getByText(/Get the latest clothing trends delivered to your doorstep/)).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<Home />)
    
    expect(screen.getByText('Fast Delivery')).toBeInTheDocument()
    expect(screen.getByText('Real-time Tracking')).toBeInTheDocument()
    expect(screen.getByText('Quality Guaranteed')).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Home />)
    
    const startShoppingButtons = screen.getAllByText('Start Shopping')
    expect(startShoppingButtons.length).toBeGreaterThan(0)
    
    expect(screen.getByText('Browse Collection')).toBeInTheDocument()
  })

  it('has proper navigation links', () => {
    render(<Home />)
    
    const startShoppingLink = screen.getAllByText('Start Shopping')[0].closest('a')
    expect(startShoppingLink).toHaveAttribute('href', '/products')
    
    const browseCollectionLink = screen.getByText('Browse Collection').closest('a')
    expect(browseCollectionLink).toHaveAttribute('href', '/products')
  })
})
