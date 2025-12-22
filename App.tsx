import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutUs from './components/AboutUs';
import OurTeam from './components/OurTeam';
import Gallery from './components/Gallery';
import News from './components/News';
import Announcements from './components/Announcements';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingSocialMenu from './components/FloatingSocialMenu';
import TeachersList from './components/TeacherList';

function App() {

  const [currentPage, setCurrentPage] = useState<'home' | 'teachers'>('home');

  const handleNavigate = (page: 'home' | 'teachers') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 relative">
      <Navbar onNavigate={handleNavigate} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Stats />
            <AboutUs />
            <OurTeam onReadMore={() => handleNavigate('teachers')} />
            <Gallery />
            <News />
            {/* Calendar CTA Strip */}
            <section className="bg-emerald-700 py-12 px-4 md:px-8">
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-outfit">Looking for the Academic Calendar?</h2>
                  <p className="text-emerald-100 mt-1">Plan your year ahead with our detailed schedule.</p>
                </div>
                <button className="bg-white text-emerald-800 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-50 transition-colors">
                  Download PDF
                </button>
              </div>
            </section>
            <Announcements />
            <FAQ />
          </>
        ) : (
          <TeachersList onBack={() => handleNavigate('home')} />
        )}
      </main>
      <Footer />
      <FloatingSocialMenu />
    </div>
  );
}

export default App;