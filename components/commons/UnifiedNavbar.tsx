'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '../../src/lib/supabase';
import Navbar from './Navbar';
import DashboardNavbar from '../dashboard/DashboardNavbar';

interface UnifiedNavbarProps {
    pollId?: string;
}

const UnifiedNavbar: React.FC<UnifiedNavbarProps> = ({ pollId }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<{
        restaurantName?: string;
        ownerName?: string;
    }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const supabase = createClient();
                const { data: { session }, error } = await supabase.auth.getSession();

                if (session && !error) {
                    setIsAuthenticated(true);

                    // Fetch user data from the owners table
                    const { data: ownerData, error: ownerError } = await supabase
                        .from('owners')
                        .select('name, restaurant_name')
                        .eq('id', session.user.id)
                        .single();

                    if (ownerData && !ownerError) {
                        setUserData({
                            restaurantName: ownerData.restaurant_name,
                            ownerName: ownerData.name,
                        });
                    }
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Show nothing while loading to prevent flash
    if (loading) {
        return (
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md py-4 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <a href="/" className="flex items-center gap-2 cursor-pointer">
                            <span className="font-extrabold text-2xl tracking-tight text-brand-black relative">
                                MenuFight<span className="text-brand-yellow">.</span>
                            </span>
                        </a>
                    </div>
                </div>
            </nav>
        );
    }

    // Render appropriate navbar based on auth status
    if (isAuthenticated) {
        return (
            <DashboardNavbar
                restaurantName={userData.restaurantName}
                ownerName={userData.ownerName}
            />
        );
    }

    return <Navbar />;
};

export default UnifiedNavbar;
