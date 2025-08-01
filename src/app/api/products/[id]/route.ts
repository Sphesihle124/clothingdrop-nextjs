import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
const isDemoMode = supabaseUrl.includes('demo-project') || serviceRoleKey === 'demo-service-key'

const supabase = isDemoMode ? null : createClient(supabaseUrl, serviceRoleKey)

// Demo products data (same as in route.ts)
const demoProducts = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit. Perfect for casual wear or layering.',
    price: 549.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Vintage Denim Jacket',
    description: 'Timeless denim jacket with a vintage wash. A wardrobe essential that never goes out of style.',
    price: 1649.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Slim Fit Black Jeans',
    description: 'Modern slim-fit jeans in classic black. Comfortable stretch denim for all-day wear.',
    price: 1449.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    category: 'Jeans',
    sizes: ['28', '30', '32', '34', '36'],
    in_stock: true,
    featured: false
  },
  {
    id: 4,
    name: 'Floral Summer Dress',
    description: 'Light and airy summer dress with beautiful floral print. Perfect for warm weather.',
    price: 1099.99,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    in_stock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Cozy Pullover Hoodie',
    description: 'Soft and comfortable hoodie made from premium cotton blend. Great for lounging or casual outings.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    in_stock: true,
    featured: false
  },
  {
    id: 6,
    name: 'Running Sneakers',
    description: 'Lightweight running shoes with excellent cushioning and support. Perfect for workouts or casual wear.',
    price: 2399.99,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11', '12'],
    in_stock: true,
    featured: true
  }
]

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (isDemoMode) {
      // Use demo data
      const product = demoProducts.find(p => p.id === parseInt(params.id))

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }

      return NextResponse.json({ product })
    }

    // Use Supabase for production
    const { data: product, error } = await supabase!
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      console.error('Error fetching product:', error)
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error in product GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/products/[id] - Update a product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, price, image, category, sizes, in_stock } = body

    const { data: product, error } = await supabase
      .from('products')
      .update({
        name,
        description,
        price,
        image,
        category,
        sizes,
        in_stock,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      console.error('Error updating product:', error)
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error in product PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Delete a product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting product:', error)
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error in product DELETE API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
