import { NextRequest, NextResponse } from 'next/server';
import { getOrders, addOrder } from '@/lib/storage/orders';

// NOTE: In serverless environments, in-memory storage doesn't persist
// between function invocations. For production, use a database.

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    const newOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    return NextResponse.json({ 
      orderId: newOrder.id,
      message: 'Order placed successfully' 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    let filteredOrders = [...getOrders()];

    if (date) {
      filteredOrders = filteredOrders.filter((order) => order.pickupDate === date);
    }

    // Sort by creation time, newest first
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ orders: filteredOrders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

