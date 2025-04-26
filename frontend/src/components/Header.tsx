'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggleButton from './ThemeToggleButton'; // Import the toggle button

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Testimonials', href: '/testimonials' }, // Added Testimonials link
  { name: 'FAQ', href: '/faq' },
  { name: 'Lessons', href: '/lessons' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black shadow-sm transition-colors duration-200"> {/* Changed dark bg to black */}
      {/* Removed duplicate lg:px-8 */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Ksenia Zarubina - English Tutor</span>
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Ksenia Zarubina</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <ThemeToggleButton /> {/* Add toggle button for mobile */}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300 ml-2" /* Changed dark text to gray */
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors" /* Changed dark text to gray */
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggleButton /> {/* Add toggle button for desktop */}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/contact" className="btn-primary">
            Book a Lesson
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10 transition-colors duration-200"> {/* Changed dark bg to black, dark ring to gray */} 
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Ksenia Zarubina - English Tutor</span>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">Ksenia Zarubina</div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300" /* Changed dark text to gray */
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-100/10"> {/* Changed dark divide to gray */} 
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800" /* Changed dark text/hover bg */
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a Lesson
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}