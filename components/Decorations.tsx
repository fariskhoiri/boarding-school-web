import React from 'react';
import { motion } from 'framer-motion';

export const FloatingShape: React.FC<{ type: 'circle' | 'triangle' | 'squiggle' | 'hexagon'; className?: string; delay?: number }> = ({ type, className = "", delay = 0 }) => {
  
  const drawShape = () => {
    switch (type) {
      case 'circle':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="3" />
          </svg>
        );
      case 'triangle':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L36 36H4L20 4Z" stroke="currentColor" strokeWidth="3" />
          </svg>
        );
      case 'squiggle':
        return (
          <svg width="50" height="20" viewBox="0 0 50 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 10C8 2 12 2 18 10C24 18 28 18 34 10C40 2 44 2 48 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'hexagon':
         return (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L30 4L40 20L30 36H10L0 20L10 4Z" stroke="currentColor" strokeWidth="3"/>
            </svg>
         );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute opacity-30 text-emerald-500 ${className}`}
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {drawShape()}
    </motion.div>
  );
};