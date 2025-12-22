import React from 'react';
import { motion } from 'framer-motion';
import { FloatingShape } from './Decorations';

const teamMembers = [
    {
        id: 1,
        name: "Mr. James Caldwell",
        role: "Vice Principal",
        subRole: "Academic Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Dr. Eleanor Vance",
        role: "Principal",
        subRole: "Chief Educator",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Mrs. Sarah Jenkins",
        role: "Head of Admin",
        subRole: "Operations Lead",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    }
];

interface OurTeamProps {
    onReadMore: () => void;
}

const OurTeam: React.FC<OurTeamProps> = ({ onReadMore }) => {
    return (
        <section id="our-team" className="py-24 bg-stone-50 border-t border-stone-100 relative overflow-hidden">

            {/* Background Animations */}
            <FloatingShape type="triangle" className="top-20 right-10 text-emerald-500 opacity-10 rotate-12" />
            <FloatingShape type="squiggle" className="bottom-20 left-10 text-emerald-500 opacity-10" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-outfit">Our Leadership</h2>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                            Guided by visionary leadership, our faculty and administrative staff work tirelessly to foster an environment of academic excellence and personal growth. We craft educational experiences that balance tradition with innovation.
                        </p>
                    </div>
                    <button onClick={onReadMore}
                    className="hidden md:inline-flex items-center px-8 py-3 rounded-full border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 transition-all font-semibold text-sm bg-transparent hover:bg-emerald-50 whitespace-nowrap">
                        Read more
                    </button>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {teamMembers.map((member, index) => (
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

                <div className="mt-12 md:hidden text-center">
                    <button onClick={onReadMore}
                        className="inline-flex items-center px-8 py-3 rounded-full border border-gray-300 hover:border-emerald-600 text-gray-800 hover:text-emerald-700 transition-all font-semibold text-sm hover:bg-emerald-50 bg-white">
                        Read more
                    </button>
                </div>
            </div>
        </section>
    );
};

export default OurTeam;