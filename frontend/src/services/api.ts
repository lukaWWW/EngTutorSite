'use client';

// Base API URL - set based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Generic fetch function for API requests
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Types for API responses
export interface AboutResponse {
  content: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  lessons: number;
  price: number;
  discount_pct: number;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LessonPreview {
  image_url: string;
  chips: string[];
  caption: string;
}

// API services
export const apiService = {
  // Get about page content
  getAbout: () => fetchFromAPI<AboutResponse>('/about'),
  
  // Get services
  getServices: () => fetchFromAPI<ServiceItem[]>('/services'),
  
  // Get pricing plans
  getPricing: () => fetchFromAPI<PricingPlan[]>('/pricing'),
  
  // Get testimonials
  getTestimonials: () => fetchFromAPI<Testimonial[]>('/testimonials'),
  
  // Get FAQ items
  getFAQ: () => fetchFromAPI<FAQItem[]>('/faq'),
  
  // Get lesson previews
  getLessons: () => fetchFromAPI<LessonPreview[]>('/lessons'),
};