import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentfulClient } from '../lib/contentful';
import { FloatingShape } from './Decorations';
import { EntrySkeletonType } from 'contentful';

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

type ContentfulNewsEntry = EntrySkeletonType<ContentfulNewsFields, 'news'>;

interface NewsDetailItem {
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
}

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsDetailItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await contentfulClient.getEntries<ContentfulNewsEntry>({
          content_type: 'news',
          'fields.slug': slug,
          limit: 1,
        } as any);

        if (response.items.length > 0) {
          const item = response.items[0];
          const rawImageUrl = (item.fields.image as any)?.fields?.file?.url;
          const imageUrl = rawImageUrl 
            ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl)
            : 'https://picsum.photos/1200/600';

          const formattedDate = new Date(item.fields.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          setArticle({
            title: item.fields.title,
            category: item.fields.category,
            date: formattedDate,
            image: imageUrl,
            description: item.fields.description,
          });
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load the article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center pt-24">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center pt-24">
        <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col items-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
            <p className="text-red-700 font-medium mb-4">{error || 'Article not found'}</p>
            <Link to="/" className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Home
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 relative overflow-hidden">
        <FloatingShape type="circle" className="top-40 left-10 text-emerald-500 opacity-10" />
        <FloatingShape type="squiggle" className="bottom-40 right-10 text-emerald-500 opacity-10" />

        <article className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
            <Link to="/#news" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:text-emerald-800 transition-colors">
                <div className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                Back to News
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6 flex gap-4 items-center">
                     <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {article.category}
                     </span>
                     <span className="text-gray-500 text-sm font-medium flex items-center gap-2">
                        <Calendar size={14} className="text-emerald-500" /> {article.date}
                     </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 shadow-lg relative">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-lg prose-emerald max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {article.description}
                </div>
            </motion.div>
        </article>
    </div>
  );
};

export default NewsDetail;