import FAQAccordion from '@/components/FAQAccordion';

export default function FAQPage() {
  return (
    <section className="py-16 md:py-24 bg-primary-50 dark:bg-primary-900/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-12 text-center">
          Frequently Asked Questions
        </h1>
        <FAQAccordion />
      </div>
    </section>
  );
}
