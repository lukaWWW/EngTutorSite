'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSubscriptionDiscount } from '@/components/useSubscriptionDiscount';
import { motion } from 'framer-motion';
import { apiService, PricingPlan } from '@/services/api';

export default function PricingPage() {
  const [lessonCount, setLessonCount] = useState<number>(4);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load pricing data from the backend API
  useEffect(() => {
    async function fetchPricingPlans() {
      try {
        const data = await apiService.getPricing();
        setPricingPlans(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching pricing plans:', err);
        setError('Failed to load pricing data');
        setIsLoading(false);
      }
    }
    
    fetchPricingPlans();
  }, []);
  
  // Base prices for different types of lessons - we'll set defaults or use data from API
  const individualLessonPrice = pricingPlans.length > 0 ? 
    pricingPlans[0].price / pricingPlans[0].lessons : 45;
  const groupLessonPrice = pricingPlans.length > 0 ? 
    (pricingPlans[0].price / pricingPlans[0].lessons) * 0.6 : 25; // Group lessons at 60% of individual price
  
  // Use our custom hook to calculate the discount
  const individualSubscription = useSubscriptionDiscount(individualLessonPrice, lessonCount);
  const groupSubscription = useSubscriptionDiscount(groupLessonPrice, lessonCount);

  // Format prices to local currency
  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading pricing information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Transparent and Flexible Pricing
            </h1>
            <p className="text-xl text-gray-600">
              Choose the option that works best for your budget and learning goals.
              Subscribe to a package for the best value.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Standard Pricing Plans */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Standard Pricing</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Individual Lessons</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">
                  {formatCurrency(individualLessonPrice)} <span className="text-lg text-gray-500 font-normal">/ lesson</span>
                </p>
                <p className="text-gray-600 mb-4">
                  One-on-one personalized lessons tailored to your specific goals.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Personalized curriculum
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Full attention of the tutor
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Flexible scheduling
                  </li>
                </ul>
                <Link href="/contact?service=individual" className="btn-primary w-full text-center">
                  Book Individual Lessons
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">Group Lessons</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">
                  {formatCurrency(groupLessonPrice)} <span className="text-lg text-gray-500 font-normal">/ lesson</span>
                </p>
                <p className="text-gray-600 mb-4">
                  Learn with peers in a collaborative environment. Small groups of 3-5 students.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    More affordable option
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Group conversation practice
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Set weekly schedule
                  </li>
                </ul>
                <Link href="/contact?service=group" className="btn-primary w-full text-center">
                  Join a Group
                </Link>
              </div>
            </div>
            
            {/* API Pricing Plans */}
            {pricingPlans.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Package Options</h3>
                <div className="space-y-4">
                  {pricingPlans.map((plan, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-lg">{plan.name} Package</h4>
                        <p className="text-sm text-gray-600">{plan.lessons} lessons</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-600 font-bold text-lg">{formatCurrency(plan.price)}</p>
                        {plan.discount_pct > 0 && (
                          <p className="text-green-600 text-sm">Save {plan.discount_pct}%</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subscription Calculator */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Subscription Packages</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="mb-6 text-gray-600">
                Save more when you subscribe to a package of lessons. Use the slider below to calculate your discount.
              </p>
              
              <div className="mb-8">
                <label htmlFor="lesson-count" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Lessons: <span className="font-bold">{lessonCount}</span>
                </label>
                <input
                  id="lesson-count"
                  type="range"
                  min="1"
                  max="24"
                  value={lessonCount}
                  onChange={(e) => setLessonCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>6</span>
                  <span>12</span>
                  <span>18</span>
                  <span>24</span>
                </div>
              </div>

              {/* Individual lessons subscription */}
              <motion.div 
                key={`individual-${lessonCount}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 border rounded-lg p-4 bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2">Individual Lessons Package</h3>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Original price:</span>
                  <span>{formatCurrency(individualSubscription.originalPrice)}</span>
                </div>
                
                {individualSubscription.discountPercentage > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount ({individualSubscription.discountPercentage}%):</span>
                    <span>-{formatCurrency(individualSubscription.savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatCurrency(individualSubscription.discountedPrice)}</span>
                </div>
                
                <div className="text-sm text-gray-500 mt-1">
                  {formatCurrency(individualSubscription.pricePerLesson)} per lesson
                </div>
                
                <button className="btn-primary w-full mt-4">
                  Subscribe to Individual Package
                </button>
              </motion.div>

              {/* Group lessons subscription */}
              <motion.div 
                key={`group-${lessonCount}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 border rounded-lg p-4 bg-gray-50"
              >
                <h3 className="text-lg font-semibold mb-2">Group Lessons Package</h3>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Original price:</span>
                  <span>{formatCurrency(groupSubscription.originalPrice)}</span>
                </div>
                
                {groupSubscription.discountPercentage > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount ({groupSubscription.discountPercentage}%):</span>
                    <span>-{formatCurrency(groupSubscription.savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatCurrency(groupSubscription.discountedPrice)}</span>
                </div>
                
                <div className="text-sm text-gray-500 mt-1">
                  {formatCurrency(groupSubscription.pricePerLesson)} per lesson
                </div>
                
                <button className="btn-primary w-full mt-4">
                  Subscribe to Group Package
                </button>
              </motion.div>

              <div className="text-sm text-gray-500">
                <p>* Subscriptions are valid for 3 months from purchase date.</p>
                <p>* Discounts apply automatically based on number of lessons purchased.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">How long is each lesson?</h3>
              <p className="text-gray-600">Each lesson is 50 minutes long, allowing time for a short break between consecutive lessons.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Do unused lessons expire?</h3>
              <p className="text-gray-600">Lesson packages are valid for 3 months from the purchase date. Any unused lessons after this period will expire.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">How do I schedule my lessons?</h3>
              <p className="text-gray-600">After purchasing a package, you&apos;ll receive access to our online booking system where you can schedule lessons based on available time slots.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Can I change my lesson type after purchasing?</h3>
              <p className="text-gray-600">You can switch between individual and group lessons, but price differences will apply. Contact us for assistance with this process.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Not sure which option is right for you?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book a free 30-minute consultation to discuss your goals and receive personalized recommendations.
          </p>
          <Link href="/contact?service=consultation" className="btn-primary px-8 py-3">
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}