import { NextRequest, NextResponse } from 'next/server'

// GET /api/tracking/[orderId] - Get real-time tracking information
export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // Demo mode - return demo tracking data
    // Check if this is a legacy demo order
    if (params.orderId === 'CD-2024-001') {
      return NextResponse.json({
        success: true,
        order: {
          id: params.orderId,
          status: 'in_transit',
          total: 2849.97,
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
              name: 'Traditional Shweshwe Dress',
              price: 899.99,
              size: 'M',
              quantity: 1,
              category: 'Traditional Dresses'
            },
            {
              id: 4,
              name: 'Zulu Isicholo Hat',
              price: 1599.99,
              size: 'One Size',
              quantity: 1,
              category: 'Traditional Headwear'
            }
          ],
          driver_name: 'Thabo Mthembu',
          driver_phone: '+27 82 123 4567',
          estimated_delivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          tracking_updates: [
            {
              status: 'confirmed',
              message: 'Order confirmed and being prepared',
              timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
            },
            {
              status: 'preparing',
              message: 'Items being packed for delivery',
              timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
            },
            {
              status: 'out_for_delivery',
              message: 'Out for delivery with Thabo',
              timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
            }
          ]
        }
      })
    }
    
    // For any other order number, return a generic demo response
    return NextResponse.json({
      success: true,
      order: {
        id: params.orderId,
        status: 'confirmed',
        total: 1299.99,
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
            name: 'Traditional Item',
            price: 1299.99,
            size: 'M',
            quantity: 1,
            category: 'Traditional Clothing'
          }
        ],
        driver_name: 'Thabo Mthembu',
        driver_phone: '+27 82 123 4567',
        estimated_delivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        tracking_updates: [
          {
            status: 'confirmed',
            message: 'Order confirmed and being prepared',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
          }
        ]
      }
    })
    
  } catch (error) {
    console.error('Error in tracking API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
