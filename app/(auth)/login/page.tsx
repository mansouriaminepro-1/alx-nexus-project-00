
import React from 'react';
import LoginForm from '../../../components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-32 px-4 flex justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl">
         <h1 className="text-3xl font-extrabold text-brand-black mb-8 text-center">Welcome Back</h1>
         <LoginForm />
         <p className="mt-8 text-center text-sm font-medium text-gray-500">
            Don't have an account? <a href="/signup" className="text-brand-black font-bold border-b border-brand-yellow">Sign Up</a>
         </p>
      </div>
    </div>
  );
}
