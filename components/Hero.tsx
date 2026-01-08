import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
    title: "Welcome to Tracen",
    subtitle: "Nurturing confident, compassionate, and capable individuals through holistic education.",
    buttonPrimary: "Register Now",
    path: "/admission",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
    title: "State of Art Campus",
    subtitle: "Expansive grounds, modern facilities, and a vibrant learning environment for all.",
    buttonPrimary: null,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    title: "Holistic Development",
    subtitle: "Programs designed to foster intellectual, social, and physical growth in every student.",
    buttonPrimary: null,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Global Curriculum",
    subtitle: "International standards of education preparing students for the challenges of tomorrow.",
    buttonPrimary: null,
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // --- FITUR AUTO SLIDE ---
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // 5000ms = 5 detik

    // Membersihkan interval saat user pindah slide manual atau komponen hilang
    return () => clearInterval(interval);
  }, [currentSlide]); // Dependency array: currentSlide
  // ------------------------

  return (
    <section className="relative h-screen min-h-[600px] bg-emerald-900 overflow-hidden text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          {...({
            initial: { opacity: 0, scale: 1.1 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.8 }
          } as any)}
        >
            {/* Background Image */}
            <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 md:px-20 pt-20">
         <AnimatePresence mode="wait">
            <motion.div
                key={currentSlide}
                className="max-w-4xl"
                {...({
                    initial: { y: 30, opacity: 0 },
                    animate: { y: 0, opacity: 1 },
                    exit: { y: -30, opacity: 0 },
                    transition: { duration: 0.5, delay: 0.2 }
                } as any)}
            >
                <motion.span 
                    className="inline-block py-1 px-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-sm tracking-wider mb-6 backdrop-blur-sm"
                    {...({
                        initial: { scale: 0.9, opacity: 0 },
                        animate: { scale: 1, opacity: 1 },
                        transition: { delay: 0.4 }
                    } as any)}
                >
                    EST. 1995 • EXCELLENCE IN EDUCATION
                </motion.span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 font-outfit leading-tight tracking-tight drop-shadow-2xl">
                    {slides[currentSlide].title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
                    {slides[currentSlide].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                    {/* Primary Button - Conditionally Rendered */}
                    {slides[currentSlide].buttonPrimary && (
                        <button 
                            onClick={() => {
                                if (slides[currentSlide].path) {
                                    navigate(slides[currentSlide].path);
                                }
                            }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            {slides[currentSlide].buttonPrimary} <ArrowRight size={20} />
                        </button>
                    )}

                </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-4">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-12 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
            />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110 hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white transition-all hover:scale-110 hidden md:block"
      >
        <ChevronRight size={32} />
      </button>

    </section>
  );
};

export default Hero;