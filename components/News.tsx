import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../types';
import { FloatingShape } from './Decorations';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';

// Define the shape of your Contentful Content Type fields
interface ContentfulNewsFields {
  title: string;
  category: string;
  date: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  description: string;
  slug: string;
}

// Define the Entry Skeleton
type ContentfulNewsEntry = EntrySkeletonType<ContentfulNewsFields, 'news'>;

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Fetch entries from Contentful
        const response = await contentfulClient.getEntries<ContentfulNewsEntry>({
          content_type: 'news',
          order: ['-fields.date'] as any, // Sort by date descending (newest first)
          limit: 3, // Limit to 3 items for the grid
        });

        // Map Contentful entries to our NewsItem interface
        const mappedNews: NewsItem[] = response.items.map((item) => {
          // Contentful image URLs often come as "//images.ctfassets.net/...", so we prepend https:
          // Cast image to any to avoid strict type checking on nested fields of EntrySkeletonType
          const rawImageUrl = (item.fields.image as any)?.fields?.file?.url;
          const imageUrl = rawImageUrl
            ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl)
            : 'https://picsum.photos/600/400'; // Fallback image

          // Format ISO date string to readable format
          const formattedDate = new Date(item.fields.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return {
            id: item.sys.id,
            title: item.fields.title,
            category: item.fields.category,
            date: formattedDate,
            image: imageUrl,
            description: item.fields.description,
            slug: item.fields.slug,
          };
        });

        setNewsItems(mappedNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="relative py-24 bg-stone-50 overflow-hidden" id="news">
      <FloatingShape type="triangle" className="top-10 right-10 text-emerald-500 opacity-10 rotate-12" />
      <FloatingShape type="squiggle" className="bottom-20 left-10 text-emerald-500 opacity-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-emerald-950 font-outfit mb-4">News & Events</h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium animate-pulse">Fetching latest updates...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-xl border border-red-100 max-w-md mx-auto">
            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
            <p className="text-red-700 font-medium text-center px-4">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && newsItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <p className="text-gray-500 text-lg">No news articles found at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later for updates.</p>
          </div>
        )}

        {/* Success State - Grid */}
        {!loading && !error && newsItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} // Slightly faster stagger
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-gray-400 text-xs font-medium mb-3 uppercase tracking-wider">
                    <Calendar size={14} className="mr-2 text-emerald-500" />
                    {item.date}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3 font-outfit leading-tight group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {item.description}
                  </p>

                  <Link
                    to={`/news/${item.slug}`}
                    className="self-start text-emerald-600 font-bold text-sm flex items-center group-hover:text-emerald-800 transition-colors mt-auto"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;