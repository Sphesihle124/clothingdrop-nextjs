import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
const isDemoMode = supabaseUrl.includes('demo-project') || serviceRoleKey === 'demo-service-key'

const supabase = isDemoMode ? null : createClient(supabaseUrl, serviceRoleKey)

// Demo products data for development - ZAR pricing with discounts
const demoProducts = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for casual wear or layering.',
    price: 449.99,
    originalPrice: 599.99,
    discount: 25,
    onSale: true,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    featured: true,
    saleTag: 'SUMMER SALE'
  },
  {
    id: 2,
    name: 'Vintage Denim Jacket',
    description: 'Timeless denim jacket with a vintage wash. A wardrobe essential that never goes out of style.',
    price: 1299.99,
    originalPrice: 1649.99,
    discount: 21,
    onSale: true,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    featured: true,
    saleTag: 'LIMITED OFFER'
  },
  {
    id: 3,
    name: 'Slim Fit Black Jeans',
    description: 'Modern slim-fit jeans in classic black. Comfortable stretch denim for all-day wear.',
    price: 1199.99,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36'],
    in_stock: true,
    featured: false,
    onSale: false
  },
  {
    id: 4,
    name: 'Floral Summer Dress',
    description: 'Light and airy summer dress with beautiful floral print. Perfect for warm weather.',
    price: 799.99,
    originalPrice: 1099.99,
    discount: 27,
    onSale: true,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    in_stock: true,
    featured: true,
    saleTag: 'SUMMER SPECIAL'
  },
  {
    id: 5,
    name: 'Cozy Pullover Hoodie',
    description: 'Soft and comfortable hoodie made from premium cotton blend. Great for lounging or casual outings.',
    price: 749.99,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    in_stock: true,
    featured: false,
    onSale: false
  },
  {
    id: 6,
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with excellent cushioning and support. Perfect for workouts or casual wear.',
    price: 1899.99,
    originalPrice: 2399.99,
    discount: 21,
    onSale: true,
    currency: 'ZAR',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    in_stock: true,
    featured: true,
    saleTag: 'BEST SELLER'
  }
]

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (isDemoMode) {
      // Use demo data
      let filteredProducts = [...demoProducts]

      // Apply category filter
      if (category && category !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === category)
      }

      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase()
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        )
      }

      // Apply pagination
      const paginatedProducts = filteredProducts.slice(offset, offset + limit)

      return NextResponse.json({ products: paginatedProducts })
    }

    // Use Supabase for production
    let query = supabase!
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .range(offset, offset + limit - 1)

    // Apply category filter
    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data: products, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error in products API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, image, category, sizes } = body

    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      )
    }

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          image,
          category,
          sizes,
          in_stock: true
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error in products POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
