'use client'

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Calendar, 
  DollarSign, 
  Package, 
  UserCheck, 
  BookOpen,    
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  { 
    title: 'Total Revenue', 
    value: '₹1,25,430', 
    change: '+12.5%', 
    isPositive: true,
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  { 
    title: 'Total Orders', 
    value: '256', 
    change: '+8.2%', 
    isPositive: true,
    icon: ShoppingBag,
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    title: 'Total Customers', 
    value: '1,245', 
    change: '+15.3%', 
    isPositive: true,
    icon: Users,
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    title: 'Total Bookings', 
    value: '89', 
    change: '-2.4%', 
    isPositive: false,
    icon: Calendar,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Priya Sharma', date: '2023-06-15', amount: '₹1,299', status: 'Delivered' },
  { id: 'ORD-002', customer: 'Rahul Patel', date: '2023-06-14', amount: '₹899', status: 'Processing' },
  { id: 'ORD-003', customer: 'Aisha Khan', date: '2023-06-14', amount: '₹2,499', status: 'Shipped' },
  { id: 'ORD-004', customer: 'Vikram Singh', date: '2023-06-13', amount: '₹599', status: 'Pending' },
  { id: 'ORD-005', customer: 'Neha Gupta', date: '2023-06-12', amount: '₹1,799', status: 'Delivered' }
];

const recentBookings = [
  { id: 'BKG-001', customer: 'Meera Joshi', type: 'Artist', date: '2023-06-18', amount: '₹3,500', status: 'Confirmed' },
  { id: 'BKG-002', customer: 'Arjun Kapoor', type: 'Class', date: '2023-06-20', amount: '₹999', status: 'Pending' },
  { id: 'BKG-003', customer: 'Sanya Malhotra', type: 'Artist', date: '2023-06-19', amount: '₹4,500', status: 'Confirmed' },
  { id: 'BKG-004', customer: 'Karan Mehta', type: 'Class', date: '2023-06-22', amount: '₹1,499', status: 'Pending' }
];

const topProducts = [
  { id: 1, name: 'Premium Natural Henna Powder', sales: 78, revenue: '₹23,322' },
  { id: 2, name: 'Bridal Mehandi Stencil Kit', sales: 65, revenue: '₹32,435' },
  { id: 3, name: 'Organic Henna Cones (Pack of 12)', sales: 54, revenue: '₹21,546' },
  { id: 4, name: 'Professional Mehandi Application Kit', sales: 42, revenue: '₹33,558' }
];

import { useAdminAuth } from '@/contexts/AdminAuthContext';


const DashboardPage = () => {
  const { admin, isAdminAuthenticated, adminLoading, adminLogout } = useAdminAuth();

  // if (loading || !user || !isAdmin) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {isAdminAuthenticated && <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <div className={`flex items-center mt-2 text-sm ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? 
                    <ArrowUpRight size={16} className="mr-1" /> : 
                    <ArrowDownRight size={16} className="mr-1" />
                  }
                  <span>{stat.change} from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Category Chart Placeholder</p>
          </div>
        </div>
      </div>
      
      {/* Recent Orders & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <a href="/admin/orders" className="text-sm text-red-900 hover:text-red-700">View All</a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
              <a href="/admin/bookings" className="text-sm text-red-900 hover:text-red-700">View All</a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{booking.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6">Quick Stats</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Products</span>
                <span className="text-sm font-medium">24</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-900 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Artists</span>
                <span className="text-sm font-medium">8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Classes</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Inventory Status</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <Package size={20} className="text-red-900" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Low Stock</p>
                  <p className="font-semibold">3 Products</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-full mr-3">
                  <Calendar size={20} className="text-yellow-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Today's Bookings</p>
                  <p className="font-semibold">5 Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>}
    </>
  );
};

export default DashboardPage;
