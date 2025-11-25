
import React from 'react';

// Placeholder for Shadcn/UI Input
export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-yellow" {...props} />
);
