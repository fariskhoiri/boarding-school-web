import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { NewsItem } from '../types';
import { FloatingShape } from './Decorations';

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "National Robotics Championship Winners",
    category: "Achievement",
    date: "March 15, 2024",
    image: "https://picsum.photos/600/400?random=20",
    description: "Our senior robotics team secured first place in the national level competition held in the capital."
  },
  {
    id: 2,
    title: "Annual Sports Meet 2024",
    category: "Sports",
    date: "February 28, 2024",
    image: "https://picsum.photos/600/400?random=21",
    description: "A day filled with energy and enthusiasm as students displayed true sportsmanship."
  },
  {
    id: 3,
    title: "Science & Art Exhibition",
    category: "Academics",
    date: "January 10, 2024",
    image: "https://picsum.photos/600/400?random=22",
    description: "Showcasing the creative and analytical talents of our students across all grades."
  }
];

const News: React.FC = () => {
  return (
    <section className="relative py-24 bg-stone-50 overflow-hidden" id="news">
      <FloatingShape type="triangle" className="top-10 right-10 text-emerald-500 opacity-10 rotate-12" />
      <FloatingShape type="squiggle" className="bottom-20 left-10 text-emerald-500 opacity-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-950 font-outfit mb-4">News & Events</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {item.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={16} className="mr-2" />
                    {item.date}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 font-outfit leading-tight">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{item.description}</p>
                <button className="self-start text-emerald-600 font-bold text-sm flex items-center hover:text-emerald-800 transition-colors">
                    Read More <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;