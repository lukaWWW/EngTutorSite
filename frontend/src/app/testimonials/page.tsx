'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiService, Testimonial } from '@/services/api';

interface ExtendedTestimonial extends Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  role: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<ExtendedTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            location: role.includes('from') ? role.split('from')[1].trim() : 'Student',
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-slate-400">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error || "No testimonials available"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-primary-50 dark:bg-primary-900/20 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
              Success Stories from Our Students
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300">
              Hear directly from learners who have achieved their English goals with our personalized tutoring.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {testimonials.map((testimonial: ExtendedTestimonial) => (
            <motion.div
              key={testimonial.id}
              variants={item}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/50 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-grow">
                <blockquote className="flex flex-col h-full">
                  <p className="text-gray-600 dark:text-slate-300 italic mb-4 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className="mt-auto">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-12 w-12 rounded-full border-2 border-primary-200 dark:border-primary-700"
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-500 dark:text-slate-400">{testimonial.role}, {testimonial.location}</div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ready to Start Your Own Success Story?</h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Join hundreds of satisfied students who have improved their English fluency and confidence with our expert tutoring.
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3">
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}