'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiService, LessonPreview } from '@/services/api';

interface ExtendedLesson extends LessonPreview {
  id: number;
  title: string;
  description: string;
  methods: string[];
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<ExtendedLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const apiLessons = await apiService.getLessons();
        
        // Transform API lessons to match the expected format
        const extendedLessons: ExtendedLesson[] = apiLessons.map((lesson, index) => {
          // Extract a title from the caption
          const title = lesson.caption.split(' for ')[0].trim();
          
          // Generate placeholder methods and description
          const methods = lesson.chips.length > 0 ? 
            lesson.chips.map(chip => `${chip} Focus`) : 
            ['Interactive Learning', 'Practical Application', 'Personalized Feedback'];
          
          return {
            ...lesson,
            id: index + 1,
            title,
            description: `${lesson.caption} with personalized instruction and practical exercises.`,
            methods
          };
        });
        
        setLessons(extendedLessons);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError('Failed to load lessons');
        setIsLoading(false);
      }
    }
    
    fetchLessons();
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
          <p className="text-lg text-gray-600 dark:text-slate-400">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error || lessons.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error || "No lessons available"}</p>
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
              Explore Our Lesson Styles
            </h1>
            <p className="text-xl text-gray-600 dark:text-slate-300">
              Get a glimpse into our teaching methods and the types of materials we use to help you learn effectively.
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
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              variants={item}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:shadow-slate-900/50 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={lesson.image_url}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                  />
                  {/* Fallback in case image fails to load */}
                  <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-slate-400">
                    <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                </motion.div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{lesson.title}</h2>
                <p className="text-gray-600 dark:text-slate-300 mb-4 text-sm">{lesson.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.chips.map((chip, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/50 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                  Inquire about this lesson &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Find the Right Lesson for You</h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Our lessons are tailored to your individual needs. Contact us to discuss your goals and find the perfect learning path.
          </p>
          <Link href="/contact" className="btn-primary px-8 py-3">
            Get Personalized Recommendations
          </Link>
        </div>
      </section>
    </>
  );
}