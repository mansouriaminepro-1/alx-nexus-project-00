
import React from 'react';
import { ArrowRightIcon } from '../ui/icons';

const LoginForm = () => {
  return (
    <div className="space-y-5">
        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Email Address</label>
          <input 
            type="email" 
            placeholder="chef@example.com" 
            className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
          />
        </div>

        <div className="group">
          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider group-focus-within:text-brand-black transition-colors">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full text-lg font-bold text-brand-black placeholder-gray-300 border-b-2 border-gray-100 focus:border-brand-yellow focus:outline-none py-2 bg-transparent transition-colors"
          />
        </div>

        <button className="w-full bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group mt-6">
          Log In
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
  );
};

export default LoginForm;
