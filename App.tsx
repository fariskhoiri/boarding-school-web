import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import TeachersList from './components/TeachersList';
import NewsDetail from './components/NewsDetail';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const handleNavigate = (page: 'home' | 'teachers') => {
    if (page === 'home') {
      navigate('/');
    } else if (page === 'teachers') {
      navigate('/teachers');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 relative">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Stats />
              <AboutUs />
              <OurTeam onReadMore={() => navigate('/teachers')} />
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
          } />
          
          <Route path="/teachers" element={<TeachersList onBack={() => navigate('/')} />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
        </Routes>
      </main>
      <Footer />
      <FloatingSocialMenu />
    </div>
  );
}

export default App;