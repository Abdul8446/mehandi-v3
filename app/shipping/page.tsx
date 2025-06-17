import Head from 'next/head';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import { Truck, Package, Clock, Shield } from 'lucide-react';

const Shipping = () => {
  const shippingFeatures = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders above ₹999'
    },
    {
      icon: Package,
      title: 'Secure Packaging',
      description: 'Carefully packed products'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: '2-3 business days'
    },
    {
      icon: Shield,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <>
      <Head>
        <title>Shipping & Returns | Mehandi Mansion</title>
        <meta name="description" content="Learn about our shipping policies, delivery times, and return process" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-20">
          <AnimatedSection className="bg-brown-900 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Shipping & Returns</h1>
              <p className="max-w-2xl mx-auto">
                Learn about our shipping policies, delivery times, and return process
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="py-16">
            <div className="container mx-auto px-4">
              {/* Shipping Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {shippingFeatures.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <item.icon className="w-12 h-12 text-brown-700 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="max-w-3xl mx-auto">
                <div className="space-y-12">
                  {/* Shipping Information */}
                  <section>
                    <h2 className="text-2xl font-serif text-brown-900 mb-6">Shipping Information</h2>
                    <div className="space-y-6">
                      <div className="bg-brown-50 p-6 rounded-lg border border-brown-100">
                        <h3 className="font-medium text-brown-900 mb-3">Domestic Shipping</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Standard Delivery (2-3 business days): ₹99</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Express Delivery (1-2 business days): ₹199</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Free shipping on orders above ₹999</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-brown-50 p-6 rounded-lg border border-brown-100">
                        <h3 className="font-medium text-brown-900 mb-3">International Shipping</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Standard International (7-10 business days): ₹1499</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Express International (3-5 business days): ₹2499</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Free shipping on orders above ₹4999</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Return Policy */}
                  <section>
                    <h2 className="text-2xl font-serif text-brown-900 mb-6">Return Policy</h2>
                    <p className="text-gray-700 mb-6">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery.
                    </p>
                    <div className="bg-brown-50 p-6 rounded-lg border border-brown-100">
                      <h3 className="font-medium text-brown-900 mb-3">Return Process</h3>
                      <ol className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">1.</span>
                          <span>Initiate return from your order history</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">2.</span>
                          <span>Pack the unused product in original packaging</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">3.</span>
                          <span>Attach the return shipping label</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">4.</span>
                          <span>Drop off at nearest courier partner</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">5.</span>
                          <span>Refund will be processed within 5-7 business days</span>
                        </li>
                      </ol>
                    </div>
                  </section>

                  {/* Track Order */}
                  <section>
                    <h2 className="text-2xl font-serif text-brown-900 mb-6">Track Your Order</h2>
                    <p className="text-gray-700 mb-4">
                      You can track your order status at any time:
                    </p>
                    <ol className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start">
                        <span className="mr-2">1.</span>
                        <span>Visit our Track Order page</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">2.</span>
                        <span>Enter your order number and email</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">3.</span>
                        <span>Get real-time updates on your shipment</span>
                      </li>
                    </ol>
                    <div className="mt-4">
                      <Link 
                        href="/track" 
                        className="inline-block px-6 py-3 bg-brown-800 text-white rounded-md hover:bg-brown-700 transition-colors"
                      >
                        Track Your Order
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </>
  );
};

export default Shipping;