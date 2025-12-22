import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top CTA Strip */}
        <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden -mt-32 shadow-2xl mb-16">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 font-outfit">Ready to join our community?</h2>
                <p className="text-emerald-100">Admissions open for the Academic Year 2025-2026</p>
            </div>
            <button className="relative z-10 bg-white text-emerald-900 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                Apply Now
            </button>
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <GraduationCap size={150} color="white" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-500 p-2 rounded-lg text-white">
                    <GraduationCap size={24} />
                </div>
                <span className="text-2xl font-bold text-white font-outfit">TRACEN</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 opacity-80">
                Tracen Boarding School provides a rigorous, globally-focused education that fosters intellectual curiosity and personal growth in a supportive environment.
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-outfit">Quick Links</h3>
            <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News & Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

           {/* Campus */}
           <div>
            <h3 className="text-white font-bold text-lg mb-6 font-outfit">Campus Life</h3>
            <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Boarding Facilities</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports & Games</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Art & Culture</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Laboratories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-outfit">Contact Us</h3>
            <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>7/8, Block-D, Lalmatia,<br />Dhaka-1207, Bangladesh</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone size={18} className="text-emerald-500 shrink-0" />
                    <span>+123 456 7890</span>
                </li>
                <li className="flex items-center gap-3">
                    <Mail size={18} className="text-emerald-500 shrink-0" />
                    <span>admissions@tracen.edu</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
            <p>&copy; 2025 Tracen Boarding School. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Sitemap</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;