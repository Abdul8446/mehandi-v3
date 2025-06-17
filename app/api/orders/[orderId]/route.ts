// app/api/orders/[orderId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Order from '@/models/Order';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  await dbConnect();

  const { orderId } = await params; 
  console.log(orderId, 'orderId');
  
  try {
    const order = await Order.findOne({ orderId: orderId }).lean();
    
    if (!order) {
      console.log(order, 'no order');
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.log(error, 'error')
    return NextResponse.json(
      { message: 'Failed to fetch order', error: error.message },
      { status: 500 }
    );
  }
}

// export async function PATCH(request: NextRequest) {
//   await dbConnect();

//   try {
//     // Extract orderId from URL path
//     const pathSegments = request.nextUrl.pathname.split('/');
//     const orderId = pathSegments[pathSegments.length - 1];

//     const { status } = await request.json();
    
//     const updateData: any = { status };
    
//     if (status === 'Delivered') {
//       updateData.deliveredAt = new Date();
//     }

//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: orderId },
//       updateData,
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return NextResponse.json(
//         { message: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedOrder);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: 'Failed to update order', error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   request: Request,
//   { params }: { params: { orderId: string } }
// ) {
//   await dbConnect();

//   try {
//     const { status } = await request.json();
    
//     const updateData: any = { status };
    
//     if (status === 'Delivered') {
//       updateData.deliveredAt = new Date();
//     }

//     const { orderId } = params; // No await needed in older versions

//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: orderId },
//       updateData,
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return NextResponse.json(
//         { message: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedOrder);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: 'Failed to update order', error: error.message },
//       { status: 500 }
//     );
//   }
// }