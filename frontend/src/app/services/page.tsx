'use client';

import { useState, useEffect, ForwardRefExoticComponent } from 'react';
import {
  UserGroupIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { SVGProps } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Import Link component
import { apiService, Service } from '@/services/api'; // Use Service type consistently

// Icon mapping for dynamic icon selection - Refined type
const iconMap: Record<string, ForwardRefExoticComponent<SVGProps<SVGSVGElement>>> = {
  'globe.svg': GlobeAltIcon,
  'file.svg': DocumentTextIcon,
  'window.svg': AcademicCapIcon,
  'vercel.svg': ChatBubbleBottomCenterTextIcon,
  'default': UserGroupIcon
};

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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-slate-400">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-red-600 dark:text-red-400">{error || "No services available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">My Tutoring Services</h1>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((service) => {
          // Determine which icon to use based on the icon name from the backend
          const IconComponent = iconMap[service.icon] || iconMap.default;
          
          return (
            // Ensure the Link wraps the entire clickable card
            <Link 
              key={service.id} 
              href={`/pricing?service=${service.id}`} 
              passHref 
              className="block h-full" // Make link take full height of grid cell
            > 
              <motion.div
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6 text-center flex flex-col h-full group cursor-pointer" // Ensure full height and add group/cursor
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full inline-block">
                    <IconComponent className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 flex-grow mb-4">{service.description}</p> 
                {/* Add a visual cue for the link instead of a nested Link */}
                <span className="mt-auto text-primary-600 dark:text-primary-400 group-hover:underline font-medium">
                  View Pricing &rarr;
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}