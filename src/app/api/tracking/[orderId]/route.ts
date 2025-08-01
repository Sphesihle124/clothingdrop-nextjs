import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/tracking/[orderId] - Get real-time tracking information
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // First, try to find by order ID
    let { data: order, error } = await supabase
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
      .eq('id', params.orderId)
      .single()

    // If not found by UUID, try to find by a custom order number format
    if (error && error.code === 'PGRST116') {
      // For demo purposes, handle order numbers like "CD-2024-001"
      if (params.orderId === 'CD-2024-001') {
        // Return mock data for demo
        return NextResponse.json({
          order: {
            id: 'CD-2024-001',
            status: 'in_transit',
            total: 2849.97,
            delivery_address: {
              street: '45 Nelson Mandela Square',
              city: 'Sandton, Johannesburg',
              state: 'Gauteng',
              zipCode: '2196'
            },
            driver_name: 'Thabo Mthembu',
            driver_phone: '+27 (11) 784-5623',
            estimated_delivery: new Date(Date.now() + 20 * 60000).toISOString(),
            created_at: new Date(Date.now() - 25 * 60000).toISOString(),
            order_items: [
              { name: 'Classic White T-Shirt', quantity: 2, size: 'M' },
              { name: 'Denim Jacket', quantity: 1, size: 'L' }
            ]
          },
          tracking: {
            estimatedDelivery: '15-20 minutes',
            currentLocation: {
              lat: 40.7128,
              lng: -74.0060
            },
            timeline: [
              { status: 'Order Placed', time: '2:30 PM', completed: true },
              { status: 'Order Confirmed', time: '2:32 PM', completed: true },
              { status: 'Preparing Order', time: '2:35 PM', completed: true },
              { status: 'Out for Delivery', time: '2:45 PM', completed: true, current: true },
              { status: 'Delivered', time: 'Est. 3:05 PM', completed: false }
            ]
          }
        })
      }
      
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (error) {
      console.error('Error fetching order for tracking:', error)
      return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
    }

    // Calculate estimated delivery time based on current status
    const estimatedDelivery = calculateEstimatedDelivery(order)
    
    // Generate tracking timeline
    const timeline = generateTrackingTimeline(order)

    // Mock current location (in a real app, this would come from the driver's GPS)
    const currentLocation = order.status === 'in_transit' ? {
      lat: 40.7128 + (Math.random() - 0.5) * 0.01,
      lng: -74.0060 + (Math.random() - 0.5) * 0.01
    } : null

    return NextResponse.json({
      order,
      tracking: {
        estimatedDelivery,
        currentLocation,
        timeline
      }
    })
  } catch (error) {
    console.error('Error in tracking API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function calculateEstimatedDelivery(order: any): string {
  const now = new Date()
  const estimatedDeliveryTime = new Date(order.estimated_delivery)
  const diffMinutes = Math.ceil((estimatedDeliveryTime.getTime() - now.getTime()) / (1000 * 60))

  if (diffMinutes <= 0) {
    return 'Arriving now'
  } else if (diffMinutes <= 15) {
    return `${diffMinutes} minutes`
  } else if (diffMinutes <= 30) {
    return '15-30 minutes'
  } else if (diffMinutes <= 45) {
    return '30-45 minutes'
  } else {
    return '45+ minutes'
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
        'Est. ' + new Date(order.estimated_delivery).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
        'Est. ' + new Date(createdAt.getTime() + 45 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      completed: false
    })
  }

  return timeline
}
