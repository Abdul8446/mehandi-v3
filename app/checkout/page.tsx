'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/ProtectedRoute';

const CheckoutPage = () => {
  const { items, totalPrice, shippingCost, grandTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    // email: user?.email || '',
    email: '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'razorpay'
  });
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
  if (!isAuthenticated) {
    toast.error('Please login to place an order');
    router.push('/auth');
    return;
  }
  
  try {
    // Show loading state
    const loadingToast = toast.loading('Processing your order...');
   
    const orderData = {
      userId: user?.id,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      items: items.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shippingCost: shippingCost,
      totalAmount: grandTotal,
      paymentMethod: formData.paymentMethod,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      }
      // No need to include orderId or statuses - they'll be set by the API
    };

    // Call your API to create the order
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const createdOrder = await response.json();
    
    // Clear cart only after successful order creation
    clearCart();
    
    // Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success('Order placed successfully!');
    
    // Redirect to order confirmation with the real order ID
    router.push(`/order-confirmation/${createdOrder.orderId}`);
  } catch (error: any) {
    toast.error(error.message || 'Failed to place order');
    console.error('Order error:', error);
  }
};

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`ml-2 ${step >= 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Shipping
                </div>
              </div>
              <div className={`flex-1 mx-4 h-1 ${step >= 2 ? 'bg-red-900' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <div className={`ml-2 ${step >= 2 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Payment
                </div>
              </div>
              <div className={`flex-1 mx-4 h-1 ${step >= 3 ? 'bg-red-900' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <div className={`ml-2 ${step >= 3 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  Review
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Shipping Information</h2>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handleShippingSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input 
                            type="text" 
                            name="name" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input 
                            type="email" 
                            name="email" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                          //   value='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Street Address
                          </label>
                          <input 
                            type="text" 
                            name="address" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input 
                            type="text" 
                            name="city" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                          </label>
                          <input 
                            type="text" 
                            name="state" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                          </label>
                          <input 
                            type="text" 
                            name="postalCode" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <select 
                            name="country" 
                            className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="India">India</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button 
                          type="button" 
                          variant='outline'
                          className="flex items-center text-red-900 hover:text-red-700"
                          onClick={() => router.push('/cart')}
                        >
                          <ArrowLeft size={16} className="mr-1" />
                          Back to Cart
                        </Button>
                        <Button 
                          variant='primary'
                          type="submit" 
                          className="btn-primary"
                        >
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-md p-4">
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="razorpay" 
                              checked={formData.paymentMethod === 'razorpay'}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-red-900 focus:ring-red-500"
                            />
                            <div className="ml-3">
                              <span className="block text-sm font-medium text-gray-700">Razorpay (Credit/Debit Card, UPI, Netbanking)</span>
                              <span className="block text-xs text-gray-500">Secure payment via Razorpay</span>
                            </div>
                            <div className="ml-auto">
                              <CreditCard size={24} className="text-gray-400" />
                            </div>
                          </label>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md p-4">
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="cod" 
                              checked={formData.paymentMethod === 'cod'}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-red-900 focus:ring-red-500"
                            />
                            <div className="ml-3">
                              <span className="block text-sm font-medium text-gray-700">Cash on Delivery</span>
                              <span className="block text-xs text-gray-500">Pay when you receive your order</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-between">
                        <Button
                          variant='outline' 
                          type="button" 
                          className="flex items-center text-red-900 hover:text-red-700"
                          onClick={() => setStep(1)}
                        >
                          <ArrowLeft size={16} className="mr-1" />
                          Back to Shipping
                        </Button>
                        <Button
                          variant='primary' 
                          type="submit" 
                          className="btn-primary"
                        >
                          Continue to Review
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Review Your Order</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="mb-1"><span className="font-medium">Name:</span> {formData.name}</p>
                        <p className="mb-1"><span className="font-medium">Email:</span> email</p>
                        <p className="mb-1"><span className="font-medium">Phone:</span> {formData.phone}</p>
                        <p className="mb-1">
                          <span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state}, {formData.postalCode}, {formData.country}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>
                          {formData.paymentMethod === 'razorpay' ? 
                            'Razorpay (Credit/Debit Card, UPI, Netbanking)' : 
                            'Cash on Delivery'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-3">Order Items</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="divide-y divide-gray-200">
                          {items.map(item => (
                            <div key={item._id} className="py-3 flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded-md mr-4"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                              </div>
                              <div className="font-semibold">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-md font-medium mb-3">Order Summary</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span>Included</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span className="text-red-900">₹{grandTotal.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>   
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant='outline'
                        type="button" 
                        className="flex items-center text-red-900 hover:text-red-700"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft size={16} className="mr-1" />
                        Back to Payment
                      </Button>
                      <Button 
                        variant='primary'
                        type="button" 
                        className="btn-primary"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                </div>
                
                <div className="p-4">
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {items.map(item => (
                      <div key={item._id} className="flex items-center py-2 border-b border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>Included</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-red-900">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Truck size={16} className="mr-2 text-green-600" />
                      <span>{shippingCost === 0 ? 'Free shipping on orders above ₹999' : `Standard shipping: ₹${shippingCost}`}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ShieldCheck size={16} className="mr-2 text-green-600" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPage;