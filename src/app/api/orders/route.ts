import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateOrderId } from '@/lib/utils'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/orders - Get user's orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const { data: orders, error } = await supabase
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
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error('Error in orders GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, deliveryAddress, total } = body

    // Validate required fields
    if (!userId || !items || !deliveryAddress || !total) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, items, deliveryAddress, total' },
        { status: 400 }
      )
    }

    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          total,
          status: 'pending',
          delivery_address: deliveryAddress,
          estimated_delivery: new Date(Date.now() + 45 * 60 * 1000).toISOString() // 45 minutes from now
        }
      ])
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Insert order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      name: item.name,
      price: item.price,
      size: item.size,
      quantity: item.quantity
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      // Rollback order creation
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
    }

    // Fetch the complete order with items
    const { data: completeOrder, error: fetchError } = await supabase
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
      .eq('id', order.id)
      .single()

    if (fetchError) {
      console.error('Error fetching complete order:', fetchError)
      return NextResponse.json({ error: 'Order created but failed to fetch details' }, { status: 500 })
    }

    return NextResponse.json({ order: completeOrder }, { status: 201 })
  } catch (error) {
    console.error('Error in orders POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
