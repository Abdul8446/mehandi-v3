import mongoose, { Document, Schema } from 'mongoose';

export type OrderStatus = 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';

export interface IOrder extends Document {
  orderId: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string[];
  }>;
  totalAmount: number;
  shippingCost: number;
  paymentStatus: 'Paid' | 'Refunded' | 'Failed';
  status: OrderStatus;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  trackingId?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        image: [{ type: String }],
      },
    ],
    shippingCost: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Refunded', 'Failed'], default: 'Paid' },
    status: { type: String, enum: ['Confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'], default: 'Confirmed' },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    trackingId: { type: String },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { 
    collection: 'order',
    timestamps: true 
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);