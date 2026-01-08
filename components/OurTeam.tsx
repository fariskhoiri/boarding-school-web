import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { FloatingShape } from './Decorations';
import { contentfulClient } from '../lib/contentful';
import { EntrySkeletonType } from 'contentful';
import { Teacher } from '../types';

// Contentful Entry Definition
interface ContentfulTeacherFields {
  name: string;
  role: string;
  subRole: string;
  subject: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  email: string;
  bio: string;
  isLeadership: boolean;
}

type ContentfulTeacherEntry = EntrySkeletonType<ContentfulTeacherFields, 'teacher'>;

interface OurTeamProps {
    onReadMore?: () => void; // Made optional as we are using Link internally now
}

const OurTeam: React.FC<OurTeamProps> = () => {
  const [leaders, setLeaders] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        // Fetch only leadership members, limit to 3 for the grid
        const response = await contentfulClient.getEntries<ContentfulTeacherEntry>({
          content_type: 'teacher',
          'fields.isLeadership': true,
          limit: 3,
          order: ['sys.createdAt'] as any
        } as any);

        const mappedLeaders: Teacher[] = response.items.map((item) => {
          const rawImageUrl = (item.fields.image as any)?.fields?.file?.url;
          const imageUrl = rawImageUrl 
            ? (rawImageUrl.startsWith('//') ? `https:${rawImageUrl}` : rawImageUrl)
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop';

          return {
            id: item.sys.id,
            name: item.fields.name,
            role: item.fields.role,
            subRole: item.fields.subRole,
            subject: item.fields.subject,
            image: imageUrl,
            email: item.fields.email,
            bio: item.fields.bio,
            isLeadership: item.fields.isLeadership
          };
        });

        setLeaders(mappedLeaders);
      } catch (error) {
        console.error("Error fetching leadership team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100 relative overflow-hidden">
      {/* Background decoration number */}
      <span className="absolute -top-10 -left-10 text-[20rem] font-bold text-emerald-50 opacity-50 font-outfit select-none pointer-events-none z-0">
        04
      </span>

      {/* Background Animations */}
      <FloatingShape type="triangle" className="top-20 right-10 text-emerald-500 opacity-10 rotate-12" />
      <FloatingShape type="squiggle" className="bottom-20 left-10 text-emerald-500 opacity-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8" id="our-team">
            <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                     <span className="text-emerald-200 text-3xl font-bold font-outfit select-none"></span>
                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit">Our Leadership</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                    Guided by visionary leadership, our faculty and administrative staff work tirelessly to foster an environment of academic excellence and personal growth. We craft educational experiences that balance tradition with innovation.
                </p>
            </div>
            
            <Link 
                to="/teachers"
                className="hidden md:inline-flex items-center px-8 py-3 rounded-full border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 transition-all font-semibold text-sm bg-transparent hover:bg-emerald-50 whitespace-nowrap"
            >
                Read more
            </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
             <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
          </div>
        )}

        {/* Team Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {leaders.map((member, index) => (
                  <motion.div 
                      key={member.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      className="group flex flex-col"
                  >
                      <div className="mb-6 overflow-hidden rounded-[2rem] bg-gray-200 aspect-[3/4] relative shadow-sm hover:shadow-xl transition-all duration-500">
                          <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-colors duration-300" />
                      </div>
                      <div className="mt-auto">
                          <h3 className="text-2xl font-bold text-gray-900 font-outfit mb-1">{member.name}</h3>
                          <p className="text-gray-500 text-sm font-medium tracking-wide uppercase mb-1">{member.role}</p>
                          <p className="text-emerald-600 text-xs font-mono opacity-80">{member.subRole}</p>
                      </div>
                  </motion.div>
              ))}
          </div>
        )}
        
         <div className="mt-12 md:hidden text-center">
            <Link 
                to="/teachers"
                className="inline-flex items-center px-8 py-3 rounded-full border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 transition-all font-semibold text-sm hover:bg-emerald-50 bg-white"
            >
                Read more
            </Link>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;