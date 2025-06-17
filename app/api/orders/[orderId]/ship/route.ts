// app/api/orders/[id]/ship/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';

export async function PATCH(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  await dbConnect();

  try {
    const { trackingNumber } = await request.json();
    
    const updatedOrder = await Order.findOneAndUpdate(
      {orderId:params.orderId},
      {
        status: 'Shipped',
        trackingId: trackingNumber,
        shippedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}