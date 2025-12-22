import React from 'react';
import { motion } from 'framer-motion';
import { Mail, BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FloatingShape } from './Decorations';

const teachers = [
  {
    id: 1,
    name: "Dr. Alan Grant",
    subject: "Mathematics",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop",
    email: "a.grant@tracen.edu",
    bio: "Ph.D. in Computational Mathematics with 15 years of teaching experience. Passionate about making calculus accessible to everyone."
  },
  {
    id: 2,
    name: "Mrs. Marie Curie",
    subject: "Chemistry",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    email: "m.curie@tracen.edu",
    bio: "Specializes in organic chemistry and laboratory safety. Leads the annual science fair and student research initiatives."
  },
  {
    id: 3,
    name: "Mr. Isaac Newton",
    subject: "Physics",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    email: "i.newton@tracen.edu",
    bio: "Bringing the laws of motion to life. Focuses on practical experiments and astronomical observations."
  },
  {
    id: 4,
    name: "Dr. Jane Goodall",
    subject: "Biology",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    email: "j.goodall@tracen.edu",
    bio: "Expert in environmental science and genetics. coordinates the school's eco-club and outdoor biology excursions."
  },
  {
    id: 5,
    name: "Mr. Ada Lovelace",
    subject: "Informatics",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop",
    email: "a.lovelace@tracen.edu",
    bio: "Teaching the next generation of coders. Syllabus covers Python, Java, and ethical hacking fundamentals."
  }
];

interface TeachersListProps {
  onBack?: () => void;
}

const TeachersList: React.FC<TeachersListProps> = ({ onBack }) => {
  return (
    <section className="min-h-screen bg-stone-50 py-32 relative overflow-hidden">
      <FloatingShape type="circle" className="top-40 left-10 text-emerald-500 opacity-10" />
      <FloatingShape type="hexagon" className="bottom-40 right-10 text-emerald-500 opacity-10" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Link 
            to="/"
            className="group inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:text-emerald-800 transition-colors"
            onClick={(e) => {
                if(onBack) {
                    onBack();
                }
            }}
        >
            <div className="p-2 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                <ArrowLeft size={20} />
            </div>
            Back to Home
        </Link>

        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-outfit mb-4">Our Faculty</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated educators shaping the minds of tomorrow in Mathematics, Sciences, and Technology.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
                <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                >
                    <div className="relative h-64 overflow-hidden">
                        <img 
                            src={teacher.image} 
                            alt={teacher.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <span className="bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                                {teacher.subject}
                            </span>
                            <h3 className="text-2xl font-bold font-outfit">{teacher.name}</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                            <Mail size={16} className="text-emerald-500" />
                            {teacher.email}
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {teacher.bio}
                        </p>
                        <button className="w-full py-3 rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
                            <BookOpen size={18} /> View Profile
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersList;