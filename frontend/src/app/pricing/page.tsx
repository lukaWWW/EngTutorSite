'use client';

import { useState, useEffect, useMemo } from 'react'; // Import useMemo
import Link from 'next/link';
import { useSubscriptionDiscount } from '@/components/useSubscriptionDiscount';
import { motion } from 'framer-motion';
import { apiService, Service } from '@/services/api';
import { useSearchParams } from 'next/navigation'; // Removed unused useRouter

export default function PricingPage() {
  const [lessonCount, setLessonCount] = useState<number>(4);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  // Removed unused router variable

  // Effect 1: Load services data on mount
  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true); // Start loading
      setError(null); // Reset error
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load pricing data. Please try again later.');
        setServices([]); // Clear services on error
      } finally {
        setIsLoading(false); // Finish loading regardless of success/failure
      }
    }
    
    fetchServices();
  }, []); // Empty dependency array: runs only once on mount

  // Effect 2: Set selected service based on query params *after* services are loaded
  useEffect(() => {
    // Only run this effect if services have been loaded and are not empty
    if (services.length > 0) {
      const serviceQueryParam = searchParams.get('service');
      const isValidQueryParam = serviceQueryParam && services.some(s => s.id === serviceQueryParam);

      if (isValidQueryParam) {
        // If valid query param exists and it's different from current, update
        if (selectedServiceId !== serviceQueryParam) {
            setSelectedServiceId(serviceQueryParam);
        }
      } else if (!selectedServiceId) {
        // If no valid query param OR no service is currently selected, default to the first service
        setSelectedServiceId(services[0].id);
      }
      // If an invalid query param is present but a service is already selected (e.g. via dropdown),
      // we don't necessarily want to override it with the default.
      // The current logic handles this implicitly.
    }
    // If services is empty (still loading or error), do nothing here, wait for services to load

  // This effect depends on the query parameters and the loaded services array.
  }, [searchParams, services, selectedServiceId]);

  // Memoize the selected service object to avoid recalculating on every render
  const selectedService = useMemo(() => {
    if (!selectedServiceId || services.length === 0) {
      return null;
    }
    return services.find(s => s.id === selectedServiceId) || null;
  }, [selectedServiceId, services]);

  // Base price - ensure selectedService exists before accessing basePrice
  const individualLessonPrice = selectedService ? selectedService.basePrice : 0;
  
  // Calculate discount using the hook
  const individualSubscription = useSubscriptionDiscount(individualLessonPrice, lessonCount);

  // Format currency
  const formatCurrency = (price: number): string => {
    // Check for NaN or invalid numbers before formatting
    if (isNaN(price)) {
        return 'N/A'; // Or some placeholder
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Handle dropdown change
  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newServiceId = event.target.value;
    setSelectedServiceId(newServiceId);
    // Optional: Update URL without full reload if desired
    // router.push(`/pricing?service=${newServiceId}`, { scroll: false });
  };

  // --- Render Logic ---

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-slate-400">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  // Display error if fetching failed
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Handle case where services loaded but no valid service is selected (e.g., bad query param and no services exist)
  // Corrected JSX structure here
  if (!isLoading && !selectedService && services.length > 0) {
     return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"> 
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">Could not find the specified service type. Please select one from the list.</p>
          {/* Optionally show the dropdown even here */}
        </div>
      </div>
    );
  }
  
  // Handle case where no services could be loaded at all
  if (!isLoading && services.length === 0 && !error) {
     return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-slate-400">No pricing information is currently available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary-50 dark:bg-gray-900/50 py-16 md:py-24"> {/* Changed dark bg */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Corrected H1 structure */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              Transparent and Flexible Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
              Choose the package that works best for your budget and learning goals.
              Save more when you commit to multiple lessons.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Service Selection and Standard Pricing */}
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Select Lesson Type</h2>
            {/* Service Type Dropdown */}
            <div className="mb-8">
              <label htmlFor="service-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> {/* Changed dark text */}
                Lesson Focus:
              </label>
              <select
                id="service-type"
                name="service-type"
                value={selectedServiceId || ''} // Ensure value is controlled
                onChange={handleServiceChange}
                disabled={isLoading || services.length === 0} // Disable while loading or if no services
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md disabled:opacity-50" /* Changed dark border/bg */
              >
                {/* Add a placeholder if nothing is selected yet */}
                {!selectedServiceId && <option value="" disabled>Select a service...</option>}
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Display Individual Lesson Price - Only render if a service is selected */}
            {selectedService && (
              <motion.div
                key={selectedService.id} // Animate when service changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6" /* Changed dark bg/shadow */
              >
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{selectedService.title} - Single Lesson</h3>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {/* Use the safe formatCurrency function */}
                  {formatCurrency(individualLessonPrice)} <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/ 50-min lesson</span> {/* Changed dark text */}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4"> {/* Changed dark text */}
                  {selectedService.description}
                </p>
                 <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300"> {/* Changed dark text */}
                   <li className="flex items-center">
                     <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                     Personalized curriculum
                   </li>
                   <li className="flex items-center">
                     <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                     Full attention of the tutor
                   </li>
                   <li className="flex items-center">
                     <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                     Flexible scheduling
                   </li>
                   <li className="flex items-center">
                     <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                     </svg>
                     Focus on your specific needs
                   </li>
                 </ul>
                <Link href={`/contact?service=${selectedService.id}`} className="btn-primary w-full text-center">
                  Book {selectedService.title} Lesson
                </Link>
              </motion.div>
            )}
            
            {/* Show placeholder if loading or no service selected yet */}
            {!selectedService && !isLoading && services.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6 text-center text-gray-500 dark:text-gray-400"> {/* Changed dark bg/shadow/text */}
                Select a lesson type above to see details.
              </div>
            )}
          </div>

          {/* Subscription Calculator */}
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Calculate Your Package</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6"> {/* Changed dark bg/shadow */}
              <p className="mb-6 text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
                Save more when you purchase a package of lessons. Use the slider below to see the cost.
              </p>
              
              {/* Slider - Disable if no service selected */}
              <div className="mb-8">
                <label htmlFor="lesson-count" className={`block text-sm font-medium mb-1 ${selectedService ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}> {/* Changed dark text */}
                  Number of Lessons {selectedService ? `(${selectedService.title})` : ''}: <span className="font-bold dark:text-white">{lessonCount}</span>
                </label>
                <input
                  id="lesson-count"
                  type="range"
                  min="1"
                  max="24"
                  value={lessonCount}
                  onChange={(e) => setLessonCount(parseInt(e.target.value))}
                  disabled={!selectedService} // Disable slider if no service selected
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer dark:[&::-webkit-slider-thumb]:bg-primary-500 dark:[&::-moz-range-thumb]:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:[&::-webkit-slider-thumb]:disabled:bg-gray-400" /* Changed dark bg */
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"> {/* Changed dark text */}
                  <span>1</span>
                  <span>6</span>
                  <span>12</span>
                  <span>18</span>
                  <span>24</span>
                </div>
              </div>

              {/* Dynamic Package Calculation Display - Only render if service selected */}
              {selectedService && (
                <motion.div 
                  key={`${selectedServiceId}-${lessonCount}`} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700" /* Changed dark border/bg */
                >
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">{selectedService.title} Package</h3>
                  
                  {/* ... price breakdown using formatCurrency ... */}
                  <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
                    <span>Original price ({lessonCount} x {formatCurrency(individualLessonPrice)}):</span>
                    <span>{formatCurrency(individualSubscription.originalPrice)}</span>
                  </div>
                  
                  {individualSubscription.discountPercentage > 0 && (
                    <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
                      <span>Discount ({individualSubscription.discountPercentage}%):</span>
                      <span>-{formatCurrency(individualSubscription.savings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg border-t dark:border-gray-600 pt-2 mt-2 dark:text-white"> {/* Changed dark border */}
                    <span>Total:</span>
                    <span className="text-primary-600 dark:text-primary-400">{formatCurrency(individualSubscription.discountedPrice)}</span>
                  </div>

                  {lessonCount > 0 && ( 
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1"> {/* Changed dark text */}
                      {formatCurrency(individualSubscription.pricePerLesson)} per lesson
                    </div>
                  )}
                  
                  {/* Corrected Button structure */}
                  <button className="btn-primary w-full mt-4">
                    Purchase {lessonCount}-Lesson {selectedService.title} Package
                  </button>
                </motion.div>
              )}
              
              {/* Placeholder for calculator if no service selected */}
              {!selectedService && (
                 <div className="mb-6 border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-400"> {/* Changed dark border/bg/text */}
                   Select a lesson type above to calculate package pricing.
                 </div>
              )}

              {/* Corrected structure for notes */}
              <div className="text-sm text-gray-500 dark:text-gray-400"> {/* Changed dark text */}
                <p>* Subscriptions are valid for 3 months from purchase date.</p>
                <p>* Discounts apply automatically based on number of lessons purchased.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16"> {/* Changed dark bg */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
             {/* FAQ items - Content comes from backend, but structure remains */}
             {/* Corrected wrapping div */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-900/50"> {/* Changed dark bg/shadow */}
              <h3 className="text-lg font-semibold mb-2 dark:text-white">How long is each lesson?</h3>
              <p className="text-gray-600 dark:text-gray-300">My standard lessons are 50 minutes long, allowing time for a short break between consecutive lessons if needed.</p> {/* Changed dark text */}
            </div>
            {/* Corrected wrapping div */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-gray-900/50"> {/* Changed dark bg/shadow */}
              <h3 className="text-lg font-semibold mb-2 dark:text-white">Do you offer group lessons?</h3>
              <p className="text-gray-600 dark:text-gray-300">Currently, I focus on providing personalized one-on-one tutoring to maximize individual progress. If you have a specific request for a small group, please contact me.</p> {/* Changed dark text */}
            </div>
          </div>
        </div>
      </section> {/* Ensured section is closed */}
      
      {/* Consultation Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-8 md:p-12 text-center"> {/* Changed dark bg/shadow */}
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Not sure which option is right for you?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"> {/* Changed dark text */}
            Book a free 30-minute consultation with me to discuss your goals and receive personalized recommendations.
          </p>
          <Link href="/contact?service=consultation" className="btn-primary px-8 py-3">
            Schedule Free Consultation
          </Link>
        </div>
      </section> {/* Ensured section is closed */}
    </> /* Ensured fragment is closed */
  );
}