import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus as updateOrder } from '@/lib/storage/orders';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = getOrderById(params.id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    const order = updateOrder(params.id, status);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: 'Order updated successfully',
      order
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

