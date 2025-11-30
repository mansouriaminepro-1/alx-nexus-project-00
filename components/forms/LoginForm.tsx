
"use client";

import React, { useState } from 'react';
import { ArrowRightIcon } from '../ui/icons';
import { createClient } from '@/lib/supabase/client';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password.');
        } else {
          setError(authError.message);
        }
      } else {
        // Force full reload to update middleware/session state
        window.location.href = '/dashboard';
      }
    } catch (e: any) {
      console.error('Login error:', e);
      setError(e?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      <div className="group">
        <label htmlFor="email" className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="chef@example.com"
          className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
        />
      </div>

      <div className="group">
        <label htmlFor="password" className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Logging In...' : 'Log In'}
        {!isLoading && <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
      </button>
    </form>
  );
};

export default LoginForm;
