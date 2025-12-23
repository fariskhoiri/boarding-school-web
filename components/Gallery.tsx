import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';
import { Loader2 } from 'lucide-react';

// Define the shape of Contentful Gallery fields
interface ContentfulGalleryFields {
  title: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

type ContentfulGalleryEntry = EntrySkeletonType<ContentfulGalleryFields, 'galleryPhoto'>;

interface GalleryItem {
  id: string;
  url: string;
  title: string;
}

// Fallback images to ensure the grid always has 5 items
const PLACEHOLDERS: GalleryItem[] = [
  { id: 'p1', url: "https://picsum.photos/600/600?random=10", title: "Science Lab" },
  { id: 'p2', url: "https://picsum.photos/600/400?random=11", title: "Sports Complex" },
  { id: 'p3', url: "https://picsum.photos/600/400?random=12", title: "Modern Classroom" },
  { id: 'p4', url: "https://picsum.photos/600/800?random=13", title: "Library" }, // Index 3 in array, but used as "tall" item often
  { id: 'p5', url: "https://picsum.photos/600/600?random=14", title: "Art Studio" },
];

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(PLACEHOLDERS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await contentfulClient.getEntries<ContentfulGalleryEntry>({
          content_type: 'galleryPhoto',
          order: ['-sys.createdAt'] as any,
          limit: 5,
        });

        const fetchedItems: GalleryItem[] = response.items.map((item) => {
          const rawImageUrl = (item.fields.image as any)?.fields?.file?.url;
          const imageUrl = rawImageUrl 
            ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl)
            : '';

          return {
            id: item.sys.id,
            title: item.fields.title || 'Gallery Image',
            url: imageUrl,
          };
        }).filter(item => item.url !== ''); // Remove items with broken images

        // Combine fetched items with placeholders if we have fewer than 5
        const finalItems = [...fetchedItems];
        if (finalItems.length < 5) {
            for (let i = finalItems.length; i < 5; i++) {
                finalItems.push(PLACEHOLDERS[i]);
            }
        }

        setGalleryItems(finalItems);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        // Fallback to placeholders is already initial state, so just stop loading
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-emerald-600 font-bold tracking-wider uppercase mb-2 block">Campus Life</span>
                <h2 className="text-4xl font-bold text-gray-900 font-outfit">Life at Tracen</h2>
            </div>
            <button className="hidden md:block text-emerald-600 font-bold hover:text-emerald-800 transition-colors">
                {loading ? <Loader2 className="animate-spin inline mr-2" size={16}/> : 'View Gallery'} &rarr;
            </button>
        </div>

        {/* Bento Grid Layout - Requires exactly 5 items to look perfect */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          
          {/* Main Large Image (Index 0) */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group bg-gray-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
                src={galleryItems[0]?.url} 
                alt={galleryItems[0]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-bold text-xl">{galleryItems[0]?.title}</span>
            </div>
          </motion.div>

          {/* Top Right Small (Index 1) */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100"
             initial={{ opacity: 0, y: -50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
          >
            <img 
                src={galleryItems[1]?.url} 
                alt={galleryItems[1]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          </motion.div>

          {/* Top Far Right (Index 2) */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <img 
                src={galleryItems[2]?.url} 
                alt={galleryItems[2]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </motion.div>

          {/* Bottom Middle Tall-ish/Wide (Index 4 in original array logic, let's use Index 4 from our flat array) */}
          <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
          >
            <img 
                src={galleryItems[4]?.url} 
                alt={galleryItems[4]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </motion.div>

           {/* Bottom Right (Index 3) */}
           <motion.div 
            className="md:col-span-1 md:row-span-1 relative rounded-2xl overflow-hidden group bg-gray-100"
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
          >
            <img 
                src={galleryItems[3]?.url} 
                alt={galleryItems[3]?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
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