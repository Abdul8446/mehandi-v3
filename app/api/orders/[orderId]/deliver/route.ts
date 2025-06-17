// app/api/orders/[id]/ship/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';

export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ orderId: string }> }
) {
  await dbConnect();

  try {
    const { orderId } = await params;
    const { status } = await request.json();

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

// import type { NextRequest } from "next/server"

// export async function PATCH(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
//   // Await the params Promise
//   const { orderId } = await params

//   try {
//     // Your delivery logic here
//     console.log(`Delivering order: ${orderId}`)

//     // Example response
//     return Response.json({
//       success: true,
//       message: `Order ${orderId} marked as delivered`,
//     })
//   } catch (error) {
//     return Response.json({ error: "Failed to deliver order" }, { status: 500 })
//   }
// }