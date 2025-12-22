import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Globe, CheckCircle2 } from 'lucide-react';

const AboutUs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const contentData = {
        certification: {
            title: "Recognized Excellence & Accreditation",
            description: "Tracen Boarding School maintains the highest standards of education, recognized by global accreditation bodies.",
            points: [
                "ISO 9001:2015 Certified for Educational Management Systems",
                "Authorized IB World School (PYP, MYP, DP)",
                "Accredited by Council of International Schools (CIS)",
                "Member of Boarding Schools Association (BSA)"
            ],
            image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2064&auto=format&fit=crop"
        },
        about: {
            title: "Our Heritage & Mission",
            description: "Founded in 1995, Tracen has grown from a humble initiative to a leading boarding school known for shaping future leaders.",
            points: [
                "Over 25 years of educational excellence",
                "A diverse community representing 30+ nationalities",
                "Focus on holistic development: Academics, Sports, and Arts",
                "50-acre eco-friendly campus with state-of-the-art facilities"
            ],
            image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=2069&auto=format&fit=crop"
        },
        exchange: {
            title: "Global Student Exchange Program",
            description: "We believe in borderless education. Our exchange programs offer students the chance to experience life and learning in a different culture.",
            points: [
                "Partnerships with top schools in UK, USA, Canada, and Australia",
                "Semester-long cultural immersion programs",
                "Language enhancement and global networking opportunities",
                "Scholarships available for meritorious students"
            ],
            image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070&auto=format&fit=crop"
        }
    };

    const tabs = [
        { id: 'certification', label: 'School Certification', icon: <Award size={20} /> },
        { id: 'about', label: 'About School', icon: <BookOpen size={20} /> },
        { id: 'exchange', label: 'Student Exchange Program', icon: <Globe size={20} /> },
    ];

    const activeContent = activeTab ? contentData[activeTab as keyof typeof contentData] : null;

    return (
        <section className="py-24 bg-white" id="about-us">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Discover Tracen</span>
                    <h2 className="text-4xl font-bold text-emerald-950 font-outfit">Who We Are</h2>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 border-2 ${activeTab === tab.id
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 transform scale-105'
                                    : 'bg-white text-gray-600 border-gray-100 hover:border-emerald-400 hover:text-emerald-600'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Expandable Section */}
                <AnimatePresence mode="wait">
                    {activeTab && activeContent && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="bg-emerald-50 rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-inner">
                                <div className="flex flex-col md:flex-row gap-10 items-center">
                                    <div className="flex-1 space-y-6">
                                        <motion.h3
                                            className="text-3xl font-bold text-emerald-900 font-outfit"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {activeContent.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-gray-700 text-lg leading-relaxed"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            {activeContent.description}
                                        </motion.p>
                                        <ul className="space-y-3">
                                            {activeContent.points.map((point, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="flex items-start gap-3 text-gray-800"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                                >
                                                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                                                    <span>{point}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    <motion.div
                                        className="flex-1 w-full"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                                            <img src={activeContent.image} alt={activeContent.title} className="w-full h-80 object-cover" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default AboutUs;