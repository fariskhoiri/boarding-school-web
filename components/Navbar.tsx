import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (page: 'home' | 'teachers') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Switch to home view whenever a nav link is clicked
    if (onNavigate) {
      onNavigate('home');
    }

    // Small timeout to allow DOM to update if we were on a different page
    setTimeout(() => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        const navHeight = 85; // Approx height of fixed navbar including padding
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Academics', href: '#our-team' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'News', href: '#news' },
    { name: 'FAQ', href: '#faq' },
  ];

  const textColor = isScrolled ? 'text-gray-800' : 'text-white';
  const logoColor = isScrolled ? 'text-emerald-900' : 'text-white';
  const subTextColor = isScrolled ? 'text-emerald-600' : 'text-emerald-200';
  const topBarColor = isScrolled ? 'text-gray-500' : 'text-white/80';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0  cursor-pointer" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100); }}>
          <div className={`p-2 rounded-lg ${isScrolled ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}>
            <GraduationCap size={28} />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold leading-none font-outfit ${logoColor}`}>
              TRACEN
            </span>
            <span className={`text-xs font-semibold tracking-widest uppercase ${subTextColor}`}>Boarding School</span>
          </div>
        </div>

        {/* Center Nav Group */}
        <div className="hidden md:flex flex-col items-center flex-grow mx-8">
          {/* Top Utility Bar 
            <div className={`flex items-center gap-8 text-xs font-semibold mb-2 tracking-wide ${topBarColor}`}>
                <a href="#admissions" onClick={(e) => handleNavClick(e, '#admissions')} className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                    Admission Open <ArrowRight size={12} />
                </a>
                <a href="#tour" onClick={(e) => handleNavClick(e, '#tour')} className="hover:text-emerald-400 transition-colors">
                    Virtual Tour
                </a>
            </div> */}

          {/* Main Nav Links */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium text-sm hover:text-emerald-400 transition-colors relative group ${textColor}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block flex-shrink-0">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)] border-2 border-emerald-400/50">
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden ${textColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t absolute top-full left-0 w-full shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-800 font-medium text-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a href="#admissions" onClick={(e) => handleNavClick(e, '#admissions')} className="text-emerald-600 text-sm font-semibold flex items-center gap-2">
                  Admission Open <ArrowRight size={14} />
                </a>
                <a href="#tour" onClick={(e) => handleNavClick(e, '#tour')} className="text-gray-500 text-sm font-semibold">
                  Virtual Tour
                </a>
              </div>
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold w-full mt-2">
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;