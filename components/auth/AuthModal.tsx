import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, XIcon } from '../ui/icons';
import { supabase } from '@/lib/supabase/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Form state
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      // Reset form when modal opens
      setRestaurantName('');
      setEmail('');
      setPassword('');
      setError('');
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Navigation helper (similar to PollCreateForm)
  const navigateToDashboard = () => {
    const targetUrl = '/dashboard';
    
    try {
      window.history.pushState({}, '', targetUrl);
    } catch (e) {
      console.warn('History API restricted, using internal event routing', e);
    }

    // Dispatch custom event to ensure Router picks up the change
    const navEvent = new CustomEvent('navigate', { detail: targetUrl });
    window.dispatchEvent(navEvent);
    
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        // Validate signup fields
        if (!restaurantName.trim()) {
          setError('Restaurant name is required');
          setIsSubmitting(false);
          return;
        }
        if (!email.trim()) {
          setError('Email is required');
          setIsSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsSubmitting(false);
          return;
        }

        // Sign up with Supabase
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              restaurant_name: restaurantName.trim(),
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setIsSubmitting(false);
          return;
        }

        // Close modal and navigate to dashboard
        onClose();
        navigateToDashboard();
      } else {
        // Login logic
        if (!email.trim()) {
          setError('Email is required');
          setIsSubmitting(false);
          return;
        }
        if (!password) {
          setError('Password is required');
          setIsSubmitting(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (signInError) {
          setError(signInError.message);
          setIsSubmitting(false);
          return;
        }

        // Close modal and navigate to dashboard
        onClose();
        navigateToDashboard();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-[4rem] -mr-8 -mt-8 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-black/5 rounded-tr-[3rem] -ml-8 -mb-8 pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-brand-lightGray/50 rounded-full flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-white transition-colors z-20"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 relative z-10">
          
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-brand-yellow/20 text-brand-black rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
              {mode === 'login' ? 'Welcome Back' : 'Get Started'}
            </span>
            <h2 className="text-3xl font-extrabold text-brand-black leading-tight">
              {mode === 'login' ? (
                <>Ready to <span className="text-brand-yellow bg-brand-black px-2 transform -rotate-2 inline-block rounded-sm">Validate?</span></>
              ) : (
                <>Join the <br/><span className="relative inline-block">Fight. <svg className="absolute bottom-1 left-0 w-full h-2 text-brand-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" fill="currentColor" /></svg></span></>
              )}
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              {mode === 'login' ? 'Log in to manage your battles.' : 'Create an account to start your first battle.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {mode === 'signup' && (
               <div className="group">
                 <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Restaurant Name</label>
                 <input 
                   type="text" 
                   placeholder="e.g. Gotham Burgers" 
                   value={restaurantName}
                   onChange={(e) => setRestaurantName(e.target.value)}
                   className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
                   disabled={isSubmitting}
                />
               </div>
            )}

            <div className="group">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Email Address</label>
              <input 
                type="email" 
                placeholder="chef@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
                disabled={isSubmitting}
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (mode === 'login' ? 'Logging in...' : 'Creating Account...') : (mode === 'login' ? 'Log In' : 'Create Account')}
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Toggle */}
          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm font-medium text-gray-500">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                }}
                className="ml-2 font-bold text-brand-black border-b-2 border-brand-yellow hover:text-brand-yellow transition-colors"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthModal;