import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const FloatingSocialMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { id: 1, icon: <Linkedin size={20} />, href: '#', color: 'bg-[#0077b5]', label: 'LinkedIn' },
    { id: 2, icon: <Twitter size={20} />, href: '#', color: 'bg-[#1da1f2]', label: 'Twitter' },
    { id: 3, icon: <Instagram size={20} />, href: '#', color: 'bg-[#e1306c]', label: 'Instagram' },
    { id: 4, icon: <Facebook size={20} />, href: '#', color: 'bg-[#1877f2]', label: 'Facebook' },
    { id: 5, icon: <Youtube size={20} />, href: '#', color: 'bg-[#ff0000]', label: 'YouTube' },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-3 pb-2">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.href}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.5 }}
                transition={{ 
                  duration: 0.3, 
                  delay: (socialLinks.length - 1 - index) * 0.05, 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-transform ${link.color}`}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors duration-300 z-50 ${
          isOpen ? 'bg-gray-800' : 'bg-emerald-600 hover:bg-emerald-500'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {isOpen ? <X size={28} /> : <Share2 size={26} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingSocialMenu;