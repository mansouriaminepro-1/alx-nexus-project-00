import React, { useState, useEffect } from 'react';
import AuthModal from './auth/AuthModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Listen for custom events to open auth modal from other components (like Hero)
    const handleAuthEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const mode = customEvent.detail === 'login' ? 'login' : 'signup';
      setAuthMode(mode);
      setIsAuthOpen(true);
      setIsMenuOpen(false);
    };

    window.addEventListener('open-auth-modal', handleAuthEvent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-auth-modal', handleAuthEvent);
    };
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 cursor-pointer">
              <span className="font-extrabold text-2xl tracking-tight text-brand-black relative">
                MenuFight<span className="text-brand-yellow">.</span>
                {/* Decorative underline curve */}
                <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="#FDD835" strokeWidth="3" />
                </svg>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              {['Product', 'About us', 'Live Battles', 'Contacts'].map((item) => (
                  <a key={item} href={`/#${item.replace(' ', '-').toLowerCase()}`} className="text-sm font-bold uppercase tracking-wide text-brand-black hover:text-brand-black/70 transition-colors relative group">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
                  </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => openAuth('login')}
                className="text-sm font-bold text-brand-black px-4 py-2 hover:text-brand-black/70 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="text-sm font-bold text-brand-black border-2 border-brand-black rounded-full px-6 py-2 hover:bg-brand-black hover:text-brand-yellow transition-all"
              >
                Sign Up
              </button>
              <a href="/create-poll" className="w-8 h-8 flex items-center justify-center text-brand-black hover:scale-110 transition-transform" title="Create Battle">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-black p-2">
                <div className="space-y-1.5">
                    <span className={`block w-6 h-0.5 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl p-4 flex flex-col gap-4">
             {['Product', 'About us', 'Live Battles', 'Contacts'].map((item) => (
                  <a key={item} href={`/#${item.replace(' ', '-').toLowerCase()}`} className="text-lg font-bold text-brand-black py-2" onClick={() => setIsMenuOpen(false)}>
                      {item}
                  </a>
              ))}
              <hr className="border-gray-100"/>
              <button onClick={() => openAuth('login')} className="text-left font-bold text-brand-black py-2">Log in</button>
              <button onClick={() => openAuth('signup')} className="text-left font-bold text-brand-yellow bg-brand-black px-4 py-2 rounded-full w-fit">Sign Up</button>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
};

export default Navbar;