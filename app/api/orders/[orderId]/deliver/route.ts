// app/api/orders/[id]/deliver/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';
import { use } from 'react';


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await dbConnect();

  try {
    // const { orderId } = use(params);
    const { status } = await request.json();
    const { orderId } = await params;

    const updateData: any = { status };
    
    if (status === 'Delivered') {
      updateData.deliveredAt = new Date();
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      updateData,
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: 'Order not found' },
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


