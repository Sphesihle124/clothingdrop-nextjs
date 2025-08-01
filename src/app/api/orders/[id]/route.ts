import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
const isDemoMode = supabaseUrl.includes('demo-project') || serviceRoleKey === 'demo-service-key'

const supabase = isDemoMode ? null : createClient(supabaseUrl, serviceRoleKey)

// Demo order data with updated ZAR pricing and discounts
const demoOrder = {
  id: 'CD-2024-001',
  status: 'confirmed',
  total: 2199.97,
  subtotal: 2199.97,
  originalTotal: 2849.97,
  totalSavings: 650.00,
  currency: 'ZAR',
  created_at: new Date().toISOString(),
  delivery_address: {
    street: '45 Nelson Mandela Square',
    city: 'Sandton, Johannesburg',
    state: 'Gauteng',
    zipCode: '2196',
    country: 'ZA'
  },
  items: [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      quantity: 2,
      size: 'M',
      price: 449.99,
      originalPrice: 599.99,
      discount: 25,
      onSale: true,
      saleTag: 'SUMMER SALE',
      total: 899.98,
      originalTotal: 1199.98,
      savings: 300.00
    },
    {
      id: 2,
      name: 'Vintage Denim Jacket',
      quantity: 1,
      size: 'L',
      price: 1299.99,
      originalPrice: 1649.99,
      discount: 21,
      onSale: true,
      saleTag: 'LIMITED OFFER',
      total: 1299.99,
      originalTotal: 1649.99,
      savings: 350.00
    }
  ],
  customer: {
    name: 'Thabo Mthembu',
    email: 'thabo.mthembu@clothingdrop.co.za',
    phone: '+27 (11) 784-5623'
  }
}

// GET /api/orders/[id] - Get a single order with tracking info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (isDemoMode) {
      // Use demo data
      if (params.id !== 'CD-2024-001') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      // Generate tracking timeline for demo order
      const timeline = generateTrackingTimeline(demoOrder)

      return NextResponse.json({
        order: {
          ...demoOrder,
          timeline
        }
      })
    }

    // Use Supabase for production
    const { data: order, error } = await supabase!
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          name,
          price,
          size,
          quantity
        )
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
      console.error('Error fetching order:', error)
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
    }

    // Generate tracking timeline based on order status
    const timeline = generateTrackingTimeline(order)

    return NextResponse.json({ 
      order: {
        ...order,
        timeline
      }
    })
  } catch (error) {
    console.error('Error in order GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/orders/[id] - Update order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, driverName, driverPhone } = body

    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    }

    if (driverName) updateData.driver_name = driverName
    if (driverPhone) updateData.driver_phone = driverPhone

    const { data: order, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }
      console.error('Error updating order:', error)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Error in order PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateTrackingTimeline(order: any) {
  const createdAt = new Date(order.created_at)
  const timeline = [
    {
      status: 'Order Placed',
      time: createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true
    }
  ]

  if (['confirmed', 'preparing', 'in_transit', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'Order Confirmed',
      time: new Date(createdAt.getTime() + 2 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true
    })
  }

  if (['preparing', 'in_transit', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'Preparing Order',
      time: new Date(createdAt.getTime() + 5 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true
    })
  }

  if (['in_transit', 'delivered'].includes(order.status)) {
    timeline.push({
      status: 'Out for Delivery',
      time: new Date(createdAt.getTime() + 15 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true,
      current: order.status === 'in_transit'
    })
  }

  if (order.status === 'delivered') {
    timeline.push({
      status: 'Delivered',
      time: new Date(createdAt.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: true
    })
  } else {
    timeline.push({
      status: 'Delivered',
      time: order.estimated_delivery ? 
        new Date(order.estimated_delivery).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
        'Est. ' + new Date(createdAt.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: false
    })
  }

  return timeline
}
