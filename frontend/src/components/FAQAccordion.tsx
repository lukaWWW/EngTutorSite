'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService, FAQItem } from '@/services/api';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFAQ() {
      try {
        const data = await apiService.getFAQ();
        setFaqData(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching FAQ:', err);
        setError('Failed to load FAQ data');
        setIsLoading(false);
      }
    }

    fetchFAQ();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading FAQ data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
      {faqData.map((faq, index) => (
        <div key={index} className="px-4 py-6">
          <button
            className="flex w-full items-start justify-between text-left"
            onClick={() => toggleAccordion(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="text-lg font-medium text-gray-900">{faq.question}</span>
            <span className="ml-6 flex h-7 items-center">
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </button>
          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  exit={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mt-4 text-base text-gray-600">{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}