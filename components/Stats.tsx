import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, GraduationCap, Building2 } from 'lucide-react';
import { StatItem } from '../types';
import { FloatingShape } from './Decorations';

const stats: StatItem[] = [
  { id: 1, value: "25+", label: "Years of Excellence", icon: <Trophy size={48} /> },
  { id: 2, value: "350+", label: "Expert Faculty", icon: <Users size={48} /> },
  { id: 3, value: "5000+", label: "Students Enrolled", icon: <Building2 size={48} /> },
  { id: 4, value: "99.8%", label: "University Placement", icon: <GraduationCap size={48} /> },
];

const Stats: React.FC = () => {
  return (
    <section className="relative py-24 bg-emerald-600 text-white overflow-hidden">
      {/* Decorative background elements */}
      <FloatingShape type="circle" className="top-10 left-10 text-emerald-400 opacity-20" />
      <FloatingShape type="triangle" className="bottom-10 right-10 text-emerald-400 opacity-20" delay={1} />
      <FloatingShape type="squiggle" className="top-1/2 left-1/4 text-emerald-400 opacity-20" delay={2} />
      <FloatingShape type="hexagon" className="top-10 right-1/4 text-emerald-400 opacity-20" delay={0.5} />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-outfit">Tracen Statistics at a Glance</h2>
            <p className="text-emerald-100 text-lg">Consistently ranked among the top boarding schools.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 bg-emerald-500 rounded-full bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300 group-hover:scale-110">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-2 font-outfit tracking-tight">{stat.value}</h3>
              <p className="text-emerald-100 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;