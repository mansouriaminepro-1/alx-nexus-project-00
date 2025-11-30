"use client";

import React, { useState, useEffect } from 'react';
import { XIcon } from '../ui/icons';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState(initialMode);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
                <>Join the <br /><span className="relative inline-block">Fight. <svg className="absolute bottom-1 left-0 w-full h-2 text-brand-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 15 100 5" fill="currentColor" /></svg></span></>
              )}
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              {mode === 'login' ? 'Log in to manage your battles.' : 'Create an account to start your first battle.'}
            </p>
          </div>

          {/* Form */}
          {mode === 'login' ? <LoginForm /> : <SignupForm />}

          {/* Footer Toggle */}
          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-sm font-medium text-gray-500">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
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