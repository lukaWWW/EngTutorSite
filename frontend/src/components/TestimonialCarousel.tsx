'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService, Testimonial } from '@/services/api';

interface ExtendedTestimonial extends Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  role: string;
}

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [testimonials, setTestimonials] = useState<ExtendedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch testimonials from API
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const apiTestimonials = await apiService.getTestimonials();
        
        // Transform the API testimonials to match the expected format with additional fields
        const extendedTestimonials: ExtendedTestimonial[] = apiTestimonials.map((item, index) => {
          // Parse author field to extract name and role
          const authorParts = item.author.split(',').map(part => part.trim());
          const name = authorParts[0] || '';
          const role = authorParts[1] || '';
          
          return {
            ...item,
            id: index + 1,
            name,
            role,
            location: role.includes('from') ? role : 'Student',
            image: `/images/testimonial-${index + 1}.jpg` // Default image path
          };
        });
        
        setTestimonials(extendedTestimonials);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        setIsLoading(false);
      }
    }
    
    fetchTestimonials();
  }, []);
  
  // Navigation functions
  const nextTestimonial = useCallback(() => {
    if (testimonials.length === 0) return;
    
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  // Set up autoplay interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isAutoPlaying, nextTestimonial, testimonials.length]);
  
  // Handlers for mouse interactions
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);
  
  const prevTestimonial = useCallback(() => {
    if (testimonials.length === 0) return;
    
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  // Animation variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  if (isLoading) {
    return (
      <div className="relative overflow-hidden bg-white dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-8 shadow-lg dark:shadow-slate-900/50 rounded-lg">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-slate-400">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="relative overflow-hidden bg-white dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-8 shadow-lg dark:shadow-slate-900/50 rounded-lg">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error || "No testimonials available"}</p>
        </div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div 
      className="relative overflow-hidden bg-white dark:bg-slate-800 py-16 px-4 sm:px-6 lg:px-8 shadow-lg dark:shadow-slate-900/50 rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-roledescription="carousel"
      aria-label="Testimonials carousel"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 dark:bg-slate-800/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Students Say
          </h2>
          
          <div className="relative h-64 sm:h-72" aria-live="polite">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 flex items-center"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 w-full">
                  <div className="flex-shrink-0">
                    <div className="mx-auto h-20 w-20 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-primary-500 dark:border-primary-600">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <blockquote>
                      <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-slate-300 italic">
                        &ldquo;{currentTestimonial.quote}&rdquo;
                      </p>
                      <footer className="mt-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start">
                          <div className="text-base font-semibold text-gray-900 dark:text-white">
                            {currentTestimonial.name}
                          </div>
                          <div className="sm:ml-2 text-base text-gray-500 dark:text-slate-400">
                            {currentTestimonial.role}, {currentTestimonial.location}
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 -mt-6 z-10">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}