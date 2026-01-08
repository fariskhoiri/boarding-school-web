import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Loader2 } from 'lucide-react';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';

// 1. Contentful Types
interface ContentfulFAQFields {
  question: string;
  answer: string;
  order: number;
}

type ContentfulFAQEntry = EntrySkeletonType<ContentfulFAQFields, 'faq'>;

// 2. Local State Type
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 3. Data Fetching
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await contentfulClient.getEntries<ContentfulFAQEntry>({
          content_type: 'faq',
          order: ['fields.order'] as any, // Sort by 'order' field ascending
        });

        const mappedFAQs: FAQItem[] = response.items.map((item) => ({
          id: item.sys.id,
          question: item.fields.question,
          answer: item.fields.answer,
        }));

        setFaqs(mappedFAQs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <section id="faq" className="py-24 bg-emerald-50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Common Queries</span>
          <h2 className="text-4xl font-bold text-emerald-950 font-outfit">Frequently Asked Questions</h2>
        </div>

        {/* Loading State */}
        {loading && (
           <div className="flex flex-col items-center justify-center py-10">
             <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
             <p className="text-sm text-gray-500">Loading questions...</p>
           </div>
        )}

        {/* FAQ List */}
        {!loading && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-emerald-50/50 transition-colors"
                >
                  <span className={`font-bold text-lg font-outfit ${activeIndex === index ? 'text-emerald-600' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                  <span className={`p-2 rounded-full transition-colors ${activeIndex === index ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      {...({
                          initial: { height: 0, opacity: 0 },
                          animate: { height: 'auto', opacity: 1 },
                          exit: { height: 0, opacity: 0 },
                          transition: { duration: 0.3, ease: "easeInOut" }
                      } as any)}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && faqs.length === 0 && (
           <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-500">No questions found at the moment.</p>
           </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;