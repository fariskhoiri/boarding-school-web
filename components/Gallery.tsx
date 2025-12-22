import React from 'react';
import { motion } from 'framer-motion';

const images = [
  { url: "https://picsum.photos/600/600?random=10", size: "large", alt: "Science Lab" },
  { url: "https://picsum.photos/600/400?random=11", size: "small", alt: "Sports" },
  { url: "https://picsum.photos/600/400?random=12", size: "small", alt: "Classroom" },
  { url: "https://picsum.photos/600/800?random=13", size: "tall", alt: "Library" },
  { url: "https://picsum.photos/600/600?random=14", size: "medium", alt: "Art Class" },
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Campus Life</span>
                <h2 className="text-4xl font-bold text-gray-900 font-outfit">Life at Tracen</h2>
            </div>
            <button className="hidden md:block text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
                View Gallery &rarr;
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {/* Main Large Image */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={images[0].url} alt={images[0].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-xl">{images[0].alt}</span>
            </div>
          </motion.div>

          {/* Top Right Small */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group"
             initial={{ opacity: 0, y: -50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
          >
            <img src={images[1].url} alt={images[1].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Top Far Right */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <img src={images[2].url} alt={images[2].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Bottom Middle Tall-ish */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
          >
            <img src={images[4].url} alt={images[4].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

           {/* Bottom Right */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
          >
            <img src={images[3].url} alt={images[3].alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

        </div>
        
        <button className="md:hidden w-full mt-6 bg-emerald-100 text-emerald-800 py-3 rounded-lg font-bold">
            View All Photos
        </button>
      </div>
    </section>
  );
};

export default Gallery;