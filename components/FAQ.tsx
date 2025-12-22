import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "What is the admission procedure for international students?",
        answer: "International students must submit their academic records from the last two years, a copy of their passport, and a recommendation letter. An online interview will be scheduled after document verification."
    },
    {
        question: "What boarding facilities are available?",
        answer: "We offer separate, secure hostels for boys and girls with air-conditioned rooms, 24/7 security, medical support, laundry services, and nutritious buffet-style meals."
    },
    {
        question: "Is there a scholarship program?",
        answer: "Yes, Tracen offers merit-based scholarships and financial aid for deserving students. The scholarship test is conducted annually in March."
    },
    {
        question: "What curriculum does the school follow?",
        answer: "We follow a global curriculum integrating the Cambridge International (IGCSE & A-Levels) and IB Diploma Programme, ensuring our students are prepared for universities worldwide."
    },
    {
        question: "How often can parents visit?",
        answer: "Parents can visit their children on designated visiting weekends (usually the last weekend of every month). Special permissions can be granted for emergencies or family events."
    }
];

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-emerald-50">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Common Queries</span>
                    <h2 className="text-4xl font-bold text-emerald-950 font-outfit">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
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
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;