'use client';

import React from 'react';
import { createClient } from '../../src/lib/supabase';
import { LayoutIcon, UsersIcon } from '../ui/icons';

interface DashboardNavbarProps {
    restaurantName?: string;
    ownerName?: string;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ restaurantName, ownerName }) => {
    const handleLogout = async () => {
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <a href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <span className="font-extrabold text-2xl tracking-tight text-brand-black relative">
                            MenuFight<span className="text-brand-yellow">.</span>
                            {/* Decorative underline curve */}
                            <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="#FDD835" strokeWidth="3" />
                            </svg>
                        </span>
                    </a>

                    {/* Center - Restaurant Info */}
                    <div className="hidden md:flex items-center gap-2">
                        <div className="text-center">
                            <p className="text-sm font-bold text-brand-black">{restaurantName || 'My Restaurant'}</p>
                            <p className="text-xs text-gray-500">{ownerName || 'Owner'}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <a
                            href="/dashboard"
                            className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-black hover:text-brand-yellow transition-colors px-4 py-2"
                        >
                            <LayoutIcon className="w-4 h-4" />
                            Dashboard
                        </a>
                        <a
                            href="/dashboard#settings"
                            className="hidden sm:flex items-center gap-2 text-sm font-bold text-brand-black hover:text-brand-yellow transition-colors px-4 py-2"
                        >
                            <UsersIcon className="w-4 h-4" />
                            Profile
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-bold text-gray-600 hover:text-red-500 transition-colors px-4 py-2"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
