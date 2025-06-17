import { Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../ui/Button';
import { useEffect, useState } from 'react';

interface BookingDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  occasion: string;
  numberOfPeople: number;
  specialRequirements: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface BookingDetailsStepProps {
  plan: Plan;
  date: Date;
  // timeSlot: string;
  bookingDetails: BookingDetails;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const PLAN_PRICING: Record<string, number> = {
  'Bridal Mehandi': 2500,
  'Guest Mehandi': 250,
  Discussion: 0,
};

const BookingDetailsStep: React.FC<BookingDetailsStepProps> = ({
  plan,
  date,
  // timeSlot,
  bookingDetails,
  onInputChange,
  onSubmit,
  onBack
}) => {

  const basePrice = PLAN_PRICING[plan.name as keyof typeof PLAN_PRICING] ?? 0;
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + serviceFee;

  console.log(plan,basePrice,'plan ......')


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Booking Details</h3>
          </div>
          
          <div className="p-6">
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    value={bookingDetails.name}
                    onChange={onInputChange}
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
                    pattern="[0-9]{10}"
                    className={`input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent`}
                    value={bookingDetails.phone}
                    onChange={onInputChange}
                    title="Please enter exactly 10 digits (numbers only)"
                    maxLength={10}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    value={bookingDetails.email}
                    onChange={onInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occasion
                  </label>
                  <select 
                    name="occasion" 
                    className="input-field w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    value={bookingDetails.occasion}
                    onChange={onInputChange}
                    required
                  >
                    <option value="">Select Occasion</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Festival">Festival</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of People
                  </label>
                  <input 
                    type="number" 
                    name="numberOfPeople" 
                    min="1" 
                    className="input-field border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    value={bookingDetails.numberOfPeople}
                    onChange={onInputChange}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input 
                    type="text" 
                    name="address" 
                    className="input-field mb-3 w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    placeholder="Street Address"
                    value={bookingDetails.address}
                    onChange={onInputChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      name="city" 
                      placeholder="City"
                      className="input-field border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                      value={bookingDetails.city}
                      onChange={onInputChange}
                      required
                    />
                    <input 
                      type="text" 
                      name="state" 
                      placeholder="State"
                      className="input-field border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                      value={bookingDetails.state}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <input 
                      type="text" 
                      name="postalCode" 
                      placeholder="Postal Code"
                      className="input-field border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                      value={bookingDetails.postalCode}
                      onChange={onInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements (Optional)
                  </label>
                  <textarea 
                    name="specialRequirements" 
                    className="input-field min-h-[100px] w-full border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-brown-600 focus:outline-none focus:border-transparent"
                    placeholder="Any specific design preferences or requirements..."
                    value={bookingDetails.specialRequirements}
                    onChange={onInputChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant='outline'
                  type="button" 
                  className="btn-outline"
                  onClick={onBack}
                >
                  Back
                </Button>
                <Button 
                  variant='primary'
                  type="submit" 
                  className="btn-primary"
                >
                  Reserve Slot (Payment Offline)
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-medium text-base">{plan.name}</h4>
              <p className="text-sm text-gray-600">{basePrice > 0 ? 'Professional Mehandi Service' : 'Initial Discussion'}</p>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-start">
                <Calendar size={18} className="text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                </div>
              </div>
              
              {/* <div className="flex items-start">
                <Clock size={18} className="text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">{timeSlot}</p>
                </div>
              </div> */}
              
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">Your provided address</p>
                </div>
              </div>
            </div>
            
            {/* <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Price</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service Fee</span>
                <span>₹{serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span className="text-red-900">₹{total}</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsStep;
