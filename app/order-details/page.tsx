'use client'

import { useParams } from 'next/navigation';
import Head from 'next/head';
import AnimatedSection from '../../components/AnimatedSection';
import { Package, CheckCircle } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface TimelineEvent {
  date: string;
  status: string;
  description: string;
  completed: boolean;
}

interface OrderDetails {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
  items: OrderItem[];
  timeline: TimelineEvent[];
}

const OrderDetails = () => {
  const params = useParams();
  const orderId = params.orderId as string;

  // Mock data - replace with API call in production
  const orderDetails: OrderDetails = {
    orderNumber: orderId,
    status: 'In Transit',
    estimatedDelivery: 'March 15, 2025',
    trackingNumber: 'MM123456789IN',
    items: [
      {
        name: 'Natural Rajasthani Henna Powder',
        quantity: 2,
        price: 12.99
      },
      {
        name: 'Ready-to-Use Bridal Henna Cones',
        quantity: 1,
        price: 24.99
      }
    ],
    timeline: [
      {
        date: 'March 12, 2025 9:30 AM',
        status: 'Order Placed',
        description: 'Your order has been confirmed',
        completed: true
      },
      {
        date: 'March 13, 2025 2:15 PM',
        status: 'Processing',
        description: 'Order is being prepared for shipping',
        completed: true
      },
      {
        date: 'March 14, 2025 10:45 AM',
        status: 'In Transit',
        description: 'Package has left our warehouse',
        completed: true
      },
      {
        date: 'March 15, 2025',
        status: 'Out for Delivery',
        description: 'Package will be delivered today',
        completed: false
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Order #{orderDetails.orderNumber} | Mehandi Mansion</title>
        <meta name="description" content={`Track your order #${orderDetails.orderNumber} status and details`} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-20">
          <AnimatedSection className="bg-brown-900 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Order Status</h1>
              <p className="max-w-2xl mx-auto">
                Track the status of your order #{orderDetails.orderNumber}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium text-gray-900">Order Summary</h2>
                    <span className="px-4 py-2 bg-brown-100 text-brown-800 rounded-full text-sm font-medium">
                      {orderDetails.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Order Number</p>
                      <p className="font-medium">{orderDetails.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tracking Number</p>
                      <p className="font-medium">{orderDetails.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Estimated Delivery</p>
                      <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Tracking Timeline</h2>
                  <div className="space-y-8">
                    {orderDetails.timeline.map((event, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="flex items-center h-full absolute left-0">
                          <div className={`w-6 h-6 rounded-full ${
                            event.completed ? 'bg-green-500' : 'bg-gray-200'
                          } flex items-center justify-center`}>
                            {event.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            )}
                          </div>
                          {index < orderDetails.timeline.length - 1 && (
                            <div className={`w-0.5 h-16 ${
                              event.completed ? 'bg-green-500' : 'bg-gray-200'
                            } absolute top-6 left-3 -translate-x-1/2`} />
                          )}
                        </div>
                        <div className="ml-10">
                          <p className="font-medium text-gray-900">{event.status}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                        <div className="flex items-center">
                          <Package className="w-8 h-8 text-brown-700 mr-4" />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </>
  );
};

export default OrderDetails;