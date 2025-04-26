'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
// Re-add ReactMarkdown imports
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        // Fetch raw Markdown content
        const data = await apiService.getAbout(); 
        setAboutContent(data.content);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError('Failed to load about content');
        setIsLoading(false);
      }
    }

    fetchAboutContent();
  }, []);

  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center dark:text-slate-400">Loading...</div>;
  }

  if (error) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-red-500 dark:text-red-400">{error}</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Use prose class for Tailwind typography styling */} 
        <div className="prose dark:prose-invert lg:prose-xl mx-auto">
          {aboutContent ? (
            // Render Markdown using ReactMarkdown
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aboutContent}
            </ReactMarkdown>
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </div>
    </section>
  );
}
