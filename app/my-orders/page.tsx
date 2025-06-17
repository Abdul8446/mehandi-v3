'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ChevronDown, Search, Filter, Copy, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { IOrder } from '@/models/Order';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

const MyOrdersPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [allOrders, setAllOrders] = useState<IOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const response = await fetch(`/api/orders?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const data = await response.json();
        setAllOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  useEffect(() => {
    // Apply filters and search whenever they change
    let result = [...allOrders];
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(order => order.status === filterStatus);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.orderId.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query)))
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'total') {
        return b.totalAmount - a.totalAmount;
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
    
    setFilteredOrders(result);
  }, [allOrders, searchQuery, filterStatus, sortBy]);

  const copyToClipboard = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId);
    toast.success('Tracking ID copied to clipboard!');
  };

  const redirectToPostOfficeTracking = (trackingId: string) => {
    window.open(`https://www.indiapost.gov.in/_layouts/15/DOP.Portal.Tracking/TrackConsignment.aspx?LT=${trackingId}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ProtectedRoute>
        <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-brown-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
                
                <div className="flex gap-4">
                <select 
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                
                <select 
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="date">Sort by Date</option>
                    <option value="total">Sort by Total</option>
                    <option value="status">Sort by Status</option>
                </select>
                </div>
            </div>
            </div>

            {/* Orders List */}
            {loading || ordersLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-500"></div>
            </div>
            ) : (
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
            >
                {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                    <motion.div 
                    key={order.orderId}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex flex-wrap justify-between items-center">
                        <div>
                            <span className="text-sm text-gray-500">Order ID:</span>
                            <span className="ml-2 font-medium">{order.orderId}</span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Date:</span>
                            <span className="ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Total:</span>
                            <span className="ml-2 font-medium">₹{order.totalAmount}</span>
                        </div>
                        <div>
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
                    </div>
                    
                    <div className="p-4">
                        {order.items.map((item, index) => (
                        <div key={index} className="flex items-center py-2">
                            <img 
                            src={item.image[0]} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="ml-4 flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-600">
                                Quantity: {item.quantity} × ₹{item.price}
                            </p>
                            </div>
                            <div className="text-right">
                            <p className="font-medium">₹{item.quantity * item.price}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    
                    {/* Tracking Section - Only show if status is not 'Confirmed' and trackingId exists */}
                    {order.status !== 'Confirmed' && order.trackingId && (
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-700 mr-2">Tracking ID:</span>
                            <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">{order.trackingId}</span>
                            <button 
                              onClick={() => copyToClipboard(order.trackingId!)}
                              className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                              title="Copy Tracking ID"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => redirectToPostOfficeTracking(order.trackingId!)}
                            className="flex items-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                          >
                            <Truck size={16} className="mr-1" />
                            Track on India Post
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 bg-gray-50 flex justify-between items-center">
                        <Link 
                            href={`/order/${order.orderId}`}
                            // href={{
                            //     pathname: `/order/${order._id}`,
                            //     query: { order: JSON.stringify(order) }
                            // }}
                            className="text-brown-900 hover:text-brown-700 font-medium text-sm"
                        >
                            View Order Details
                        </Link>
                        <button className="btn-outline text-sm">
                        Download Invoice
                        </button>
                    </div>
                    </motion.div>
                ))
                ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
                    <p className="text-gray-600 mb-4">We couldn't find any orders matching your criteria.</p>
                    <Link href="/shop" className="btn-primary inline-flex items-center">
                      <Button variant='primary'>
                        Start Shopping
                      </Button>  
                    </Link>
                </div>
                )}
            </motion.div>
            )}
        </div>
        </div>
    </ProtectedRoute>
  );
};

export default MyOrdersPage;