'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TestimonialCarousel from '@/components/TestimonialCarousel'; // Import the carousel

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-black overflow-hidden"> {/* Changed dark bg to black */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Unlock Your <span className="text-primary-600 dark:text-primary-400">English Potential</span> with Ksenia
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8"> {/* Changed dark text */}
                Personalized English tutoring designed around your goals. Achieve fluency and confidence with lessons tailored just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/contact" className="btn-primary text-center px-6 py-3">
                  Book a Free Consultation
                </Link>
                <Link href="/services" className="btn-secondary text-center px-6 py-3">
                  Explore Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl dark:shadow-lg dark:shadow-gray-800/50"> {/* Changed dark shadow */}
                <div className="aspect-w-1 aspect-h-1 w-full">
                  <Image 
                    src="/images/tutor-headshot.jpg" // Replace with Ksenia's actual headshot path
                    alt="Ksenia Zarubina, English Tutor" 
                    width={500} 
                    height={500}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Ksenia Zarubina</h2>
                <p className="text-gray-600 dark:text-gray-300">Experienced English Tutor | UGE 93/100 | TOEFL B2 | Studying in Austria</p> {/* Changed dark text */}
                
                <div className="flex justify-center mt-4 space-x-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="mailto:info@englishtutorsite.com" className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                    <span className="sr-only">Email</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24"> {/* Changed dark bg */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Learn English with Me?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"> {/* Changed dark text */}
              My tutoring approach is designed to meet your specific goals through personalized instruction based on my own learning journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50" /* Changed dark bg/shadow */
            >
              <div className="bg-primary-100 dark:bg-primary-900/50 inline-block p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Curriculum</h3>
              <p className="text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
                Lessons tailored to your specific needs, goals (like UGE/TOEFL), and learning style for maximum progress.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50" /* Changed dark bg/shadow */
            >
              <div className="bg-primary-100 dark:bg-primary-900/50 inline-block p-3 rounded-full mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                 </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-World Experience</h3>
              <p className="text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
                Benefit from my experience studying and living in an English-speaking environment in Austria.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50" /* Changed dark bg/shadow */
            >
              <div className="bg-primary-100 dark:bg-primary-900/50 inline-block p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300"> {/* Changed dark text */}
                Book lessons online at times that work for your schedule.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/about" className="btn-secondary">
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialCarousel /> 
    </>
  );
}
