import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface RootLayoutProps {
  children?: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function RootLayout({
  children,
  showNavbar = true,
  showFooter = true,
}: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden font-sans antialiased selection:bg-brand-yellow selection:text-brand-black">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}