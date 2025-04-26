'use client';

import { useState, useEffect } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Image from 'next/image';
import { apiService } from '@/services/api';

function CustomH1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>;
}

function CustomH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-primary-600 mt-8 mb-4">{children}</h2>;
}

function CustomP({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-gray-700 mb-4">{children}</p>;
}

function CustomUl({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 mb-4 text-gray-700">{children}</ul>;
}

function CustomLi({ children }: { children: React.ReactNode }) {
  return <li className="mb-2">{children}</li>;
}

const components = {
  h1: CustomH1,
  h2: CustomH2,
  p: CustomP,
  ul: CustomUl,
  li: CustomLi,
};

export default function AboutPage() {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        // Fetch about content from API
        const response = await apiService.getAbout();
        
        // Serialize the markdown content for MDX
        const mdxContent = await serialize(response.content);
        setMdxSource(mdxContent);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError('Failed to load about page content');
        setIsLoading(false);
      }
    }

    fetchAboutContent();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg">Loading about content...</p>
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About Sarah Johnson</h1>
              <p className="text-xl text-gray-700 mb-6">
                Certified English language tutor with over 10 years of experience helping students around the world.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-sm font-medium text-primary-700">
                  TEFL Certified
                </span>
                <span className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-sm font-medium text-primary-700">
                  MA Applied Linguistics
                </span>
                <span className="inline-flex items-center rounded-md bg-primary-100 px-2 py-1 text-sm font-medium text-primary-700">
                  10+ Years Experience
                </span>
              </div>
            </div>
            
            <div className="md:ml-auto">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src="/images/tutor-headshot.jpg" 
                  alt="Sarah Johnson, English Tutor" 
                  width={500} 
                  height={600}
                  className="object-cover w-full h-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {mdxSource && <MDXRemote {...mdxSource} components={components} />}
        </div>
      </section>
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to improve your English?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact me today to schedule a free consultation and discuss how I can help you achieve your language goals.
          </p>
          <a href="/contact" className="btn-primary text-center px-6 py-3">
            Book a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}