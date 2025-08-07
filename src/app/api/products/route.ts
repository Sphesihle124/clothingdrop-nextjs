import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
const isDemoMode = supabaseUrl.includes('demo-project') || serviceRoleKey === 'demo-service-key'

const supabase = isDemoMode ? null : createClient(supabaseUrl, serviceRoleKey)

// Demo products data for development - South African Traditional Clothing with ZAR pricing
const demoProducts = [
  {
    id: 1,
    name: 'Traditional Shweshwe Dress',
    description: 'Authentic Shweshwe fabric dress with intricate geometric patterns. Handcrafted by local artisans in the Eastern Cape. Perfect for cultural celebrations and special occasions.',
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    onSale: true,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=1',
    category: 'Traditional Dresses',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    in_stock: true,
    featured: true,
    saleTag: 'HERITAGE SALE'
  },
  {
    id: 2,
    name: 'Ndebele Beaded Necklace',
    description: 'Stunning handcrafted Ndebele beaded necklace featuring traditional geometric patterns in vibrant colors. Each piece tells a unique cultural story.',
    price: 649.99,
    originalPrice: 849.99,
    discount: 24,
    onSale: true,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=2',
    category: 'Accessories',
    sizes: ['One Size'],
    in_stock: true,
    featured: true,
    saleTag: 'ARTISAN SPECIAL'
  },
  {
    id: 3,
    name: 'Xhosa Traditional Shirt',
    description: 'Elegant Xhosa traditional shirt with beautiful embroidered patterns. Made from high-quality cotton and perfect for cultural events and formal occasions.',
    price: 1299.99,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=3',
    category: 'Traditional Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    in_stock: true,
    featured: false,
    onSale: false
  },
  {
    id: 4,
    name: 'Zulu Isicholo Hat',
    description: 'Traditional Zulu married woman\'s hat (isicholo) made with authentic materials. A symbol of respect and cultural pride, handcrafted by skilled artisans.',
    price: 1599.99,
    originalPrice: 1999.99,
    discount: 20,
    onSale: true,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=4',
    category: 'Traditional Headwear',
    sizes: ['One Size'],
    in_stock: true,
    featured: true,
    saleTag: 'CULTURAL HERITAGE'
  },
  {
    id: 5,
    name: 'Sotho Traditional Blanket',
    description: 'Authentic Basotho blanket with traditional patterns and colors. A symbol of identity and warmth, perfect for ceremonies or as a cultural statement piece.',
    price: 2299.99,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=5',
    category: 'Traditional Blankets',
    sizes: ['Standard'],
    in_stock: true,
    featured: false,
    onSale: false
  },
  {
    id: 6,
    name: 'Venda Traditional Sandals',
    description: 'Handcrafted Venda traditional leather sandals with beaded decorations. Comfortable and durable, perfect for cultural events or everyday wear with traditional attire.',
    price: 799.99,
    originalPrice: 999.99,
    discount: 20,
    onSale: true,
    currency: 'ZAR',
    image: 'https://picsum.photos/400/400?random=6',
    category: 'Traditional Footwear',
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    in_stock: true,
    featured: true,
    saleTag: 'HANDCRAFTED'
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
