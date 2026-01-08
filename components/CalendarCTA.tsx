import React, { useEffect, useState } from 'react';
import { Download, Loader2, Calendar } from 'lucide-react';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';

// Definition for the 'schoolAsset' content model
interface SchoolAssetFields {
  title: string;
  slug: string;
  file: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

type SchoolAssetEntry = EntrySkeletonType<SchoolAssetFields, 'schoolAsset'>;

const CalendarCTA: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        // Fetch the asset with slug 'calendar'
        const response = await contentfulClient.getEntries<SchoolAssetEntry>({
          content_type: 'schoolAsset',
          'fields.slug': 'calendar',
          limit: 1,
        } as any);

        if (response.items.length > 0) {
          const asset = response.items[0];
          const rawUrl = (asset.fields.file as any)?.fields?.file?.url;
          
          if (rawUrl) {
            // Ensure protocol is present
            const finalUrl = rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
            setPdfUrl(finalUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching academic calendar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  return (
    <section className="bg-emerald-700 py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
             <Calendar className="text-emerald-300" size={28} />
             <h2 className="text-2xl md:text-3xl font-bold text-white font-outfit">Looking for the Academic Calendar?</h2>
          </div>
          <p className="text-emerald-100 text-lg">Plan your year ahead with our detailed schedule of exams, holidays, and events.</p>
        </div>

        <div>
          {loading ? (
            <button disabled className="bg-emerald-800 text-emerald-200 px-8 py-3 rounded-lg font-bold flex items-center gap-2 cursor-wait">
              <Loader2 size={20} className="animate-spin" /> Loading...
            </button>
          ) : pdfUrl ? (
            <a 
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2 transform hover:scale-105 duration-200"
            >
              <Download size={20} /> Download PDF
            </a>
          ) : (
             <button disabled className="bg-emerald-600/50 text-white/50 px-8 py-3 rounded-lg font-bold cursor-not-allowed border border-emerald-500">
               Calendar Unavailable
             </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarCTA;