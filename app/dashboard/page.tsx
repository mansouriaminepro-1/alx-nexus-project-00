
import React, { useState } from 'react';
import { PlusIcon, ClockIcon, ArrowRightIcon } from '../../components/ui/icons';
import Stats from '../../components/dashboard/Stats';
import RecentPolls from '../../components/dashboard/RecentPolls';
import BattleHistory from '../../components/dashboard/BattleHistory';
import Sidebar from '../../components/dashboard/Sidebar';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
        case 'overview':
            return (
                <div className="space-y-8 animate-in fade-in duration-500">
                     {/* Stats Row */}
                    <Stats />

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Active & Actions */}
                        <div className="lg:col-span-2 space-y-8">
                            <RecentPolls />
                            
                            {/* Quick Tips / Upsell Banner */}
                            <div className="bg-gradient-to-r from-brand-black to-gray-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity translate-x-1/3 -translate-y-1/3"></div>
                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 bg-brand-yellow text-brand-black rounded-lg text-[10px] font-bold uppercase tracking-widest mb-4">Pro Tip</span>
                                    <h3 className="text-2xl font-bold mb-2">Want more local voters?</h3>
                                    <p className="text-gray-400 mb-6 max-w-md">Boost your reach by 500% by enabling geolocation targeting on your next battle.</p>
                                    <button className="text-brand-yellow font-bold border-b border-brand-yellow hover:text-white hover:border-white transition-colors pb-0.5">Upgrade to Premium</button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: History */}
                        <div className="lg:col-span-1">
                            <BattleHistory />
                        </div>
                    </div>
                </div>
            );
        case 'history':
            return (
                <div className="animate-in slide-in-from-right-10 duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-brand-black">Full Battle History</h2>
                        <div className="flex gap-2">
                             <select className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-bold text-gray-500 focus:outline-none focus:border-brand-yellow">
                                <option>Last 30 Days</option>
                                <option>All Time</option>
                             </select>
                        </div>
                    </div>
                    {/* Reusing BattleHistory component but mapping differently or wrapping it would be ideal in a real app. 
                        For now, we display the component in a full-width container style */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-gray-100">
                        {/* Mocking a fuller list for the history view */}
                        {[1,2,3,4,5].map((i) => (
                             <div key={i} className="flex flex-col md:flex-row items-center justify-between py-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-xl px-4 group cursor-pointer">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                                        <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80`} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-black">Menu Experiment #{100+i}</h4>
                                        <span className="text-xs text-gray-400 font-medium">Completed on Oct {10+i}, 2023</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-center">
                                        <span className="block font-bold text-brand-black text-lg">1,20{i}</span>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Votes</span>
                                    </div>
                                    <button className="bg-brand-lightGray text-brand-black px-6 py-2 rounded-full text-xs font-bold hover:bg-brand-black hover:text-white transition-colors">
                                        View Analysis
                                    </button>
                                </div>
                             </div>
                        ))}
                    </div>
                </div>
            );
        case 'analytics':
            return (
                 <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-brand-yellow/10 rounded-full flex items-center justify-center mb-6 text-brand-yellow">
                        <ClockIcon className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-brand-black mb-2">Analytics Deep Dive</h2>
                    <p className="text-gray-500 max-w-md mb-8">Detailed demographic breakdowns and flavor profile trends are coming in the next update.</p>
                    <button onClick={() => setActiveTab('overview')} className="text-brand-black font-bold border-b-2 border-brand-black hover:text-brand-yellow hover:border-brand-yellow transition-colors">
                        Return to Dashboard
                    </button>
                 </div>
            );
        case 'settings':
             return (
                 <div className="max-w-2xl animate-in slide-in-from-bottom-10 duration-500">
                    <h2 className="text-2xl font-bold text-brand-black mb-8">Account Settings</h2>
                    
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-gray-100 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold border-b border-gray-100 pb-2">Profile Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Restaurant Name</label>
                                    <input type="text" defaultValue="Gotham Burgers" className="w-full font-bold text-brand-black border-b border-gray-200 focus:outline-none focus:border-brand-yellow py-1" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email</label>
                                    <input type="text" defaultValue="manager@gothamburgers.com" className="w-full font-bold text-brand-black border-b border-gray-200 focus:outline-none focus:border-brand-yellow py-1" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold border-b border-gray-100 pb-2">Notifications</h3>
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-brand-black">Email me when a battle ends</span>
                                <div className="w-10 h-6 bg-brand-yellow rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-brand-black">Weekly summary reports</span>
                                <div className="w-10 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                            </div>
                        </div>

                        <button className="w-full bg-brand-black text-white py-3 rounded-xl font-bold hover:bg-brand-yellow hover:text-brand-black transition-colors">
                            Save Changes
                        </button>
                    </div>
                 </div>
            );
        default:
            return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans flex flex-col md:flex-row overflow-hidden h-screen">
      
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="w-20 lg:w-72 flex-shrink-0 z-50 h-full hidden md:block">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 relative overflow-y-auto h-full scroll-smooth">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 min-h-full">
            
            {/* Mobile Header (Simulated for small screens since Sidebar is hidden) */}
            <div className="md:hidden mb-8 flex items-center justify-between">
                <div className="font-extrabold text-2xl text-brand-black">MenuFight.</div>
                <button className="text-sm font-bold bg-brand-lightGray px-4 py-2 rounded-full">Menu</button>
            </div>

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
                <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-black mt-1">
                {activeTab === 'overview' ? (
                    <>
                        Welcome, <span className="relative inline-block">
                            Gotham
                            <svg className="absolute bottom-1 left-0 w-full h-3 text-brand-yellow -z-10 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 15 100 5" fill="currentColor" />
                            </svg>
                        </span>
                    </>
                ) : (
                    activeTab === 'history' ? 'Battle History' : activeTab === 'settings' ? 'Settings' : 'Analytics'
                )}
                </h1>
                {activeTab === 'overview' && (
                    <p className="text-gray-500 mt-2 font-medium">Here's what's happening with your menu today.</p>
                )}
            </div>

            {activeTab === 'overview' && (
                <a href="/create-poll" className="group bg-brand-black text-white pl-6 pr-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-black transition-all shadow-lg hover:shadow-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-brand-black/10 flex items-center justify-center">
                        <PlusIcon className="w-5 h-5" />
                    </div>
                    Create Battle
                </a>
            )}
            </div>

            {/* Render Dynamic Content */}
            {renderContent()}

        </div>
      </div>
    </div>
  );
}
