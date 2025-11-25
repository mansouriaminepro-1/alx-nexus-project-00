import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Features from './components/Features';
import BattlesGrid from './components/BattlesGrid';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Features />
        <BattlesGrid />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;