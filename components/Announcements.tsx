import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Download, Eye, X, Calendar, Loader2, FileText } from 'lucide-react';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';

// 1. Contentful Types
interface ContentfulAnnouncementFields {
  title: string;
  date: string;
  content: string; // Long text
  file?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

type ContentfulAnnouncementEntry = EntrySkeletonType<ContentfulAnnouncementFields, 'announcement'>;

// 2. Local App Type
interface Announcement {
  id: string;
  title: string;
  date: string;
  rawDate: string; // For sorting if needed locally, though API sorts too
  content: string;
  fileUrl?: string;
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // 3. Data Fetching
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await contentfulClient.getEntries<ContentfulAnnouncementEntry>({
          content_type: 'announcement',
          order: ['-fields.date'] as any, // Newest first
        });

        const mappedItems: Announcement[] = response.items.map((item) => {
          // Handle File URL
          const rawFileUrl = (item.fields.file as any)?.fields?.file?.url;
          const fileUrl = rawFileUrl 
            ? (rawFileUrl.startsWith('//') ? `https:${rawFileUrl}` : rawFileUrl)
            : undefined;

          // Date Formatting
          const dateObj = new Date(item.fields.date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return {
            id: item.sys.id,
            title: item.fields.title,
            date: formattedDate,
            rawDate: item.fields.date,
            content: item.fields.content || 'No additional details provided.',
            fileUrl: fileUrl,
          };
        });

        setAnnouncements(mappedItems);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Modal Handlers
  const openModal = (item: Announcement) => setSelectedAnnouncement(item);
  const closeModal = () => setSelectedAnnouncement(null);

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-950 font-outfit mb-2">Announcements</h2>
            <p className="text-gray-500">Stay updated with the latest notices and circulars</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
             <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
             <p className="text-sm text-gray-500">Loading notices...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && announcements.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-100">
             <p className="text-gray-500">No announcements at this time.</p>
          </div>
        )}

        {/* List of Announcements */}
        {!loading && (
          <div className="max-w-4xl mx-auto space-y-4">
            {announcements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-emerald-50 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow border border-emerald-100"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Bell size={14} className="text-emerald-500" /> {item.date}
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  {/* View Button -> Opens Modal */}
                  <button 
                    onClick={() => openModal(item)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                  >
                      <Eye size={16} /> View
                  </button>

                  {/* PDF Button -> Only if fileUrl exists */}
                  {item.fileUrl && (
                    <a 
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                    >
                        <Download size={16} /> PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && announcements.length > 0 && (
            <div className="text-center mt-10">
                <button className="text-emerald-600 font-bold hover:underline"></button>
            </div>
        )}
      </div>

      {/* Modal / Overlay */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl relative z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                 <div>
                    <h3 className="text-2xl font-bold text-gray-900 font-outfit pr-8">{selectedAnnouncement.title}</h3>
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mt-2">
                        <Calendar size={16} /> {selectedAnnouncement.date}
                    </div>
                 </div>
                 <button 
                    onClick={closeModal}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 <div className="prose prose-emerald max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedAnnouncement.content}
                 </div>
              </div>

              {/* Modal Footer (Optional Actions) */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                 <button 
                    onClick={closeModal}
                    className="px-5 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                 >
                    Close
                 </button>
                 {selectedAnnouncement.fileUrl && (
                    <a 
                      href={selectedAnnouncement.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                       <Download size={16} /> Download Attachment
                    </a>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Announcements;