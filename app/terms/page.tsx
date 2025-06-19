// import Button from '@/components/ui/Button';
// import Head from 'next/head';
// import Link from 'next/link';

// const TermsAndConditions = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Terms & Conditions | Mehandi Mansion</title>
//         <meta name="description" content="Mehandi Mansion Terms and Conditions" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <main className="container mx-auto px-4 py-8 max-w-4xl">
//         <h1 className="text-3xl md:text-4xl font-bold text-center text-brown-800 mb-8">
//           Terms & Conditions
//         </h1>

//         <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
//           {/* Section 1: Services */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">1. Services</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>We provide <strong>Mehandi (Henna) application services</strong> for bridal, events, and other occasions.</li>
//               <li>We also sell <strong>henna cones and Mehandi-related products</strong> online.</li>
//             </ul>
//           </section>

//           {/* Section 2: Account & Authentication */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">2. Account & Authentication</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li><strong>Login is required</strong> to purchase products, add to cart, or use wishlist features.</li>
//               <li>We use <strong>phone number OTP authentication</strong> for secure login.</li>
//               <li>You must provide a valid Indian mobile number to create an account.</li>
//             </ul>
//           </section>

//           {/* Section 3: Booking & Payments */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">3. Booking & Payments</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>Bookings are confirmed only after <strong>receipt of payment</strong> (full or partial, as agreed).</li>
//               <li><strong>Payment for services must be made via offline methods</strong> (e.g., bank transfer, UPI, cash, or other agreed modes).</li>
//               <li>Prices may vary based on design complexity, duration, and location.</li>
//             </ul>
//           </section>

//           {/* Section 4: Product Orders & Shipping */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">4. Product Orders & Shipping</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>Orders for <strong>Mehandi products</strong> are processed within <strong>1-2 business days</strong> after payment confirmation.</li>
//               <li>All shipments are sent via <strong>India Post with tracking</strong>.</li>
//               <li>Tracking ID will be available in your <strong>"My Orders"</strong> page once shipped.</li>
//               <li>Shipping notifications with tracking details will be sent via <strong>WhatsApp and SMS</strong> to your registered mobile number.</li>
//               <li>Delivery times may vary based on location (typically 5-10 business days after dispatch).</li>
//             </ul>
//           </section>

//           {/* Section 5: Returns & Refunds */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">5. Returns & Refunds</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>Due to the perishable nature of henna products, we <strong>do not accept returns</strong> unless the product is damaged or defective.</li>
//               <li>For damaged products, please contact us within <strong>48 hours</strong> of delivery with photos of the damaged items.</li>
//             </ul>
//           </section>

//           {/* Section 6: Usage Restrictions */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">6. Usage Restrictions</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>All content (images, designs, text) on this website is the <strong>property of Mehandi Mansion</strong> and may not be copied or reused without permission.</li>
//               <li>You may not use our products for commercial resale without written authorization.</li>
//             </ul>
//           </section>

//           {/* Section 7: Modifications */}
//           <section className="mb-8">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">7. Modifications</h2>
//             <ul className="list-disc pl-5 space-y-2 text-gray-700">
//               <li>We reserve the right to <strong>update these terms</strong> at any time. Changes will be posted on this page.</li>
//               <li>Continued use of our services after changes constitutes acceptance of the modified terms.</li>
//             </ul>
//           </section>

//           {/* Contact Section */}
//           <section className="mt-10 pt-6 border-t border-gray-200">
//             <h2 className="text-xl md:text-2xl font-semibold text-brown-700 mb-4">Contact Us</h2>
//             <p className="text-gray-700 mb-4">For any questions regarding orders, shipping, or terms:</p>
//             <Button variant='primary'>
//                 <Link 
//                 href="/contact" 
//                 //   className="inline-block px-4 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-700 transition-colors"
//                 >
//                 Visit Contact Page
//                 </Link>
//             </Button>
//           </section>
//         </div>

//         {/* Back to Home Link */}
//         <div className="mt-8 text-center">
//             <Button variant='outline'>
//                 <Link href="/" >
//                     ← Back to Home
//                 </Link>
//             </Button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TermsAndConditions;

import Head from 'next/head';
import AnimatedSection from '../../components/AnimatedSection';

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Mehandi Mansion</title>
        <meta name="description" content="Review the terms and conditions for using Mehandi Mansion's services and products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow pt-20">
          <AnimatedSection className="bg-brown-900 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Terms & Conditions</h1>
              <p className="max-w-2xl mx-auto">
                Please read these terms carefully before using our services or purchasing our products.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto prose prose-brown">
                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">1. Services</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>We provide Mehandi (Henna) application services for bridal, events, and other occasions.</li>
                    <li>We also sell henna cones and Mehandi-related products online.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">2. Account & Authentication</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Login is required to purchase products, add to cart, or use wishlist features.</li>
                    <li>We use phone number OTP authentication for secure login.</li>
                    <li>You must provide a valid Indian mobile number to create an account.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">3. Booking & Payments</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Bookings are confirmed only after receipt of payment (full or partial, as agreed).</li>
                    <li>Payment for services must be made via offline methods (e.g., bank transfer, UPI, cash, or other agreed modes).</li>
                    <li>Prices may vary based on design complexity, duration, and location.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">4. Product Orders & Shipping</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Orders for Mehandi products are processed within 1-2 business days after payment confirmation.</li>
                    <li>All shipments are sent via India Post with tracking.</li>
                    <li>Tracking ID will be available in your "My Orders" page once shipped.</li>
                    <li>Shipping notifications with tracking details will be sent via WhatsApp and SMS to your registered mobile number.</li>
                    <li>Delivery times may vary based on location (typically 5-10 business days after dispatch).</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">5. Returns & Refunds</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Due to the perishable nature of henna products, we do not accept returns unless the product is damaged or defective.</li>
                    <li>For damaged products, please contact us within 48 hours of delivery with photos of the damaged items.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">6. Usage Restrictions</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All content (images, designs, text) on this website is the property of Mehandi Mansion and may not be copied or reused without permission.</li>
                    <li>You may not use our products for commercial resale without written authorization.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-serif text-brown-900 mb-4">7. Modifications</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>We reserve the right to update these terms at any time. Changes will be posted on this page.</li>
                    <li>Continued use of our services after changes constitutes acceptance of the modified terms.</li>
                  </ul>
                </section>
              </div>
            </div>
          </AnimatedSection>
        </main>
      </div>
    </>
  );
};

export default Terms;