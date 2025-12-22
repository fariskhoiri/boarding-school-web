import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Download, Eye } from 'lucide-react';
import { AnnouncementItem } from '../types';

const announcements: AnnouncementItem[] = [
  { id: 1, title: "Report Card Day - First Monthly Exam 2024-25, Term-1", date: "July 24, 2025" },
  { id: 2, title: "Swimming Club Registration 2024 - Deadline Extended", date: "July 20, 2025" },
  { id: 3, title: "KG to Class 9: Parent – Teacher Meeting Schedule", date: "July 15, 2025" },
  { id: 4, title: "Session with Clinical Psychologist & Consultant of CBT", date: "July 10, 2025" },
];

const Announcements: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-950 font-outfit mb-2">Announcements</h2>
            <p className="text-gray-500">Stay updated with the latest notices and circulars</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-emerald-50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow border border-emerald-100"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Bell size={14} className="text-emerald-500" /> Posted on {item.date}
                </p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                    <Eye size={16} /> View
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors">
                    <Download size={16} /> PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
            <button className="text-emerald-600 font-bold hover:underline">View All Announcements</button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;