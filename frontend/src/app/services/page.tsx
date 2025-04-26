'use client';

import { useState, useEffect } from 'react';
import {
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  UserIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { apiService, ServiceItem } from '@/services/api';

// Removed metadata export since it can't be used with 'use client'
// export const metadata = {
//   title: 'Services - EnglishTutor',
//   description: 'Explore our range of English tutoring services including group lessons, individual lessons, consultations, and holiday workshops.',
// };

// Icon mapping for dynamic icon selection
const iconMap: Record<string, React.ForwardRefExoticComponent<any>> = {
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

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await apiService.getServices();
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  if (error || services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || "No services available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
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
            <motion.div
              key={service.title}
              variants={item}
              className="bg-white rounded-lg shadow-md p-6 text-center transition-shadow duration-300 hover:shadow-xl flex flex-col items-center"
            >
              <IconComponent className="h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ServicesPage;