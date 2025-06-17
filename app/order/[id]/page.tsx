'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronDown, Search, Filter, Copy, Truck, ArrowLeft, Check, X, Clock, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { IOrder } from '@/models/Order';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import { fetchOrder } from '@/lib/api/orders';

const OrderDetailsPage = () => {
    
//   const { id } = useParams();
  const { id: orderId } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!user || !id) return;

//     const fetchOrder = async () => {
//       try {
//         setLoadingOrder(true);
//         const response = await fetch(`/api/orders/${id}?userId=${user.id}`);
        
//         if (!response.ok) {
//           if (response.status === 404) {
//             throw new Error('Order not found');
//           }
//           throw new Error('Failed to fetch order');
//         }
        
//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         console.error('Error fetching order:', err);
//         setError(err instanceof Error ? err.message : 'Failed to load order');
//       } finally {
//         setLoadingOrder(false);
//       }
//     };
    
//     fetchOrder();
//   }, [user, id]);

  useEffect(() => {
    const loadOrder = async () => {
    if (typeof orderId !== 'string') return;
    
    try {
        const fetchedOrder = await fetchOrder(orderId);
        console.log(fetchedOrder, 'fetchedOrder');
        console.log(user, 'user');
        console.log(orderId, 'orderId');
        // Check if the order belongs to the current user
        if (!loading && fetchedOrder?.userId !== user?.id) {
            toast.error('Invalid user');
            // router.push('/my-orders');
            // return;
        }else{
            setOrder(fetchedOrder);
        }
    } catch (error) {
        console.error('Error loading order:', error);
    } finally {
        if(!loading) setOrderLoading(false);
    }
    };

    loadOrder();
}, [orderId, user, loading]);  

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const redirectToPostOfficeTracking = (trackingId: string) => {
    window.open(`https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx?LT=${trackingId}`, '_blank');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Check className="text-green-500" size={20} />;
      case 'Shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'Confirmed':
        return <Clock className="text-yellow-500" size={20} />;
      case 'Cancelled':
        return <X className="text-red-500" size={20} />;
      default:
        return <Loader2 className="animate-spin text-gray-500" size={20} />;
    }
  };

  const formatDate = (dateString?: Date) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || orderLoading) {
    return (
      <ProtectedRoute>
        <div className="bg-gray-50 min-h-screen py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-500"></div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="bg-gray-50 min-h-screen py-20">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Package size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link href="/orders" className="btn-primary inline-flex items-center">
                <Button variant='primary'>
                  Back to My Orders
                </Button>  
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Orders
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Order Details */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-800">Order #{order.orderId}</h2>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Confirmed' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                        <img 
                          src={item.image[0]} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Price: ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{(order.totalAmount - order.shippingCost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>₹{order.shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className={`font-medium ${
                        order.paymentStatus === 'Paid' ? 'text-green-600' :
                        order.paymentStatus === 'Refunded' ? 'text-blue-600' :
                        'text-red-600'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                      <p className="mt-1 text-gray-900">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Customer Details</h4>
                      <p className="mt-1 text-gray-900">
                        {order.customer.name}<br />
                        {order.customer.email}<br />
                        {order.customer.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tracking Information */}
                {order.trackingId && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking Information</h3>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Tracking Number</h4>
                        <div className="flex items-center">
                          <span className="font-mono bg-gray-200 px-3 py-1.5 rounded text-sm">
                            {order.trackingId}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(order.trackingId!)}
                            className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-200"
                            title="Copy Tracking ID"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Status</h4>
                        <p className="text-gray-900">
                          {order.status === 'Shipped' && 'Shipped on ' + formatDate(order.shippedAt)}
                          {order.status === 'Delivered' && 'Delivered on ' + formatDate(order.deliveredAt)}
                          {order.status === 'Confirmed' && 'Preparing for shipment'}
                        </p>
                      </div>
                      <button
                        onClick={() => redirectToPostOfficeTracking(order.trackingId!)}
                        className="flex items-center justify-center gap-1 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded whitespace-nowrap"
                      >
                        <Truck size={16} />
                        Track Package
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Timeline */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-6">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Order Status</h3>
                </div>
                <div className="p-6">
                  <div className="relative">
                    {/* Timeline */}
                    <div className="space-y-6">
                      {/* Timeline item - Order placed */}
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            ['Confirmed', 'Shipped', 'Delivered', 'Cancelled'].includes(order.status) ? 
                            'bg-green-500 text-white' : 'bg-gray-200'
                          }`}>
                            <Check size={14} />
                          </div>
                          {order.status !== 'Confirmed' && (
                            <div className="w-px h-1/3 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Order Confirmed</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Timeline item - Processing */}
                      {order.status !== 'Cancelled' && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              ['Shipped', 'Delivered'].includes(order.status) ? 
                              'bg-green-500 text-white' : 
                              order.status === 'Confirmed' ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                            }`}>
                              {['Shipped', 'Delivered'].includes(order.status) ? (
                                <Check size={14} />
                              ) : order.status === 'Confirmed' ? (
                                <Loader2 className="animate-spin" size={14} />
                              ) : (
                                <Clock size={14} />
                              )}
                            </div>
                            {order.status !== 'Shipped' && order.status !== 'Confirmed' && (
                              <div className="w-px h-1/3 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {order.status === 'Confirmed' ? 'Processing' : 'Processed'}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.status === 'Confirmed' ? 
                                'Your order is being prepared' : 
                                `Processed on ${formatDate(order.shippedAt || order.updatedAt)}`
                              }
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Timeline item - Shipped */}
                      {order.status !== 'Cancelled' && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              order.status === 'Delivered' ? 
                              'bg-green-500 text-white' : 
                              order.status === 'Shipped' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}>
                              {order.status === 'Delivered' ? (
                                <Check size={14} />
                              ) : order.status === 'Shipped' ? (
                                <Truck size={14} />
                              ) : (
                                <Clock size={14} />
                              )}
                            </div>
                            {order.status !== 'Delivered' && order.status !== 'Shipped' && (
                              <div className="w-px h-1/3 bg-gray-200 mt-2"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {order.status === 'Shipped' || order.status === 'Delivered' ? 'Shipped' : 'Shipping'}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {order.status === 'Shipped' || order.status === 'Delivered' ? 
                                `Shipped on ${formatDate(order.shippedAt)}` : 
                                'Will be shipped soon'
                              }
                            </p>
                            {order.trackingId && (order.status === 'Shipped' || order.status === 'Delivered') && (
                              <button
                                onClick={() => redirectToPostOfficeTracking(order.trackingId!)}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                              >
                                <Truck size={14} />
                                Track Package
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Timeline item - Delivered */}
                      {order.status === 'Delivered' && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                              <Check size={14} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">Delivered</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(order.deliveredAt)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Timeline item - Cancelled */}
                      {order.status === 'Cancelled' && (
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                              <X size={14} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium">Order Cancelled</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatDate(order.updatedAt)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about your order, please contact our customer support.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrderDetailsPage;