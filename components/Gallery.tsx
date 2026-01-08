import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';
import { Loader2 } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// 1. Definisikan Tipe Data Contentful
interface ContentfulGalleryFields {
  title: string;
  order: number;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

type ContentfulGalleryEntry = EntrySkeletonType<ContentfulGalleryFields, 'galleryPhoto'>;

// 2. Tipe Data Internal untuk Aplikasi
interface GalleryItem {
  id: string;
  url: string;
  title: string;
}

// 3. Data Placeholder (Fallback jika CMS kosong/kurang dari 5 item)
const PLACEHOLDERS: GalleryItem[] = [
  { id: 'p1', url: "https://picsum.photos/800/800?random=1", title: "Campus Grounds" },
  { id: 'p2', url: "https://picsum.photos/600/400?random=2", title: "Sports Academy" },
  { id: 'p3', url: "https://picsum.photos/600/400?random=3", title: "Science Laboratory" },
  { id: 'p4', url: "https://picsum.photos/600/600?random=4", title: "Art & Culture" },
  { id: 'p5', url: "https://picsum.photos/600/800?random=5", title: "Library Reading Corner" },
];

const Gallery: React.FC = () => {
  // A. State Management
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(PLACEHOLDERS);
  const [loading, setLoading] = useState<boolean>(true);
  
  // B. Lightbox State
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // C. Fetch Data from Contentful
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        // Fetch entry dengan content_type 'galleryPhoto'
        const response = await contentfulClient.getEntries<ContentfulGalleryEntry>({
          content_type: 'galleryPhoto',
          order: ['fields.order'] as any, // Ascending 1, 2, 3 dst
          limit: 5,
        });

        // Mapping Data
        const fetchedItems: GalleryItem[] = response.items.map((item) => {
          const rawImageUrl = (item.fields.image as any)?.fields?.file?.url;
          // Handle URL yang diawali '//'
          const imageUrl = rawImageUrl 
            ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl)
            : '';

          return {
            id: item.sys.id,
            title: item.fields.title || 'Untitled', // Caption diambil dari title
            url: imageUrl,
          };
        }).filter(item => item.url !== '');

        // Logika Fallback: Jika data kurang dari 5, isi sisanya dengan placeholder
        const finalItems = [...fetchedItems];
        if (finalItems.length < 5) {
            for (let i = finalItems.length; i < 5; i++) {
                finalItems.push(PLACEHOLDERS[i]);
            }
        }

        setGalleryItems(finalItems);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        // Jika error, tetap gunakan placeholder default yang sudah diset di useState
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Helper untuk membuka Lightbox
  const handleOpenLightbox = (idx: number) => {
    setIndex(idx);
    setOpen(true);
  };

  // Mapping data untuk props Lightbox
  const slides = galleryItems.map(item => ({
    src: item.url,
    title: item.title,       // Judul di atas (opsional tergantung plugin)
    description: item.title, // Caption di bawah (plugin Captions membacanya dari sini)
    alt: item.title,
  }));

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Campus Life</span>
                <h2 className="text-4xl font-bold text-gray-900 font-outfit">Life at Tracen</h2>
            </div>
            <button 
                onClick={() => handleOpenLightbox(0)}
                disabled={loading}
                className="hidden md:flex items-center text-emerald-600 font-bold hover:text-emerald-800 transition-colors"
            >
                {loading ? <Loader2 className="animate-spin mr-2" size={16}/> : 'View Gallery'} 
                {!loading && <span className="ml-1">&rarr;</span>}
            </button>
        </div>

        {/* D. Tampilan Bento Grid (5 Items) */}
        {/* Layout: Grid 4 kolom, 2 baris. Item pertama besar (2x2), sisanya 1x1 */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          
          {/* Item 0: Main Large (Left) */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => handleOpenLightbox(0)}
          >
            <img 
                src={galleryItems[0]?.url} 
                alt={galleryItems[0]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold text-xl">{galleryItems[0]?.title}</p>
            </div>
          </motion.div>

          {/* Item 1: Top Middle */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer"
             initial={{ opacity: 0, y: -50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             onClick={() => handleOpenLightbox(1)}
          >
            <img src={galleryItems[1]?.url} alt={galleryItems[1]?.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

          {/* Item 2: Top Right */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             onClick={() => handleOpenLightbox(2)}
          >
            <img src={galleryItems[2]?.url} alt={galleryItems[2]?.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Item 3: Bottom Right (Far Right) */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             onClick={() => handleOpenLightbox(3)}
          >
            <img src={galleryItems[3]?.url} alt={galleryItems[3]?.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

          {/* Item 4: Bottom Middle (Tall/Wide slot in mobile, standard in desktop) */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100 cursor-pointer"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             onClick={() => handleOpenLightbox(4)}
          >
            <img src={galleryItems[4]?.url} alt={galleryItems[4]?.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>

        </div>
        
        {/* Mobile Button */}
        <button 
            onClick={() => handleOpenLightbox(0)}
            className="md:hidden w-full mt-6 bg-emerald-100 text-emerald-800 py-3 rounded-lg font-bold hover:bg-emerald-200 transition-colors"
        >
            View All Photos
        </button>

        {/* E. Lightbox Component */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Captions]}
          // Konfigurasi Captions agar selalu terlihat atau sesuai kebutuhan
          captions={{ showToggle: true, descriptionTextAlign: 'center' }}
          on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }} // Corrected property name
          //styles={{ container: { background: "rgba(0, 0, 0, .9)" } }}
        />
      </div>
    </section>
  );
};

export default Gallery;