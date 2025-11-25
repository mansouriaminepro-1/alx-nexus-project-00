
import React from 'react';

// Placeholder for Shadcn/UI Button
export const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`px-4 py-2 rounded-md font-bold ${className}`} {...props}>
    {children}
  </button>
);
