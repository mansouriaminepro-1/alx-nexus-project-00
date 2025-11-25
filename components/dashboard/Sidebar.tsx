
import React from 'react';
import { LayoutIcon, ClockIcon, PieChartIcon, SettingsIcon, UsersIcon, LogoutIcon } from '../ui/icons';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: <LayoutIcon className="w-5 h-5" /> },
    { id: 'history', label: 'Battle History', icon: <ClockIcon className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChartIcon className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-full h-full flex flex-col justify-between bg-white/50 backdrop-blur-xl border-r border-gray-100/50 md:bg-white md:border-r md:border-gray-100 pt-8 pb-6 px-4">
      
      {/* Top Section */}
      <div>
        {/* Brand */}
        <div className="flex items-center gap-2 mb-10 px-4">
            <div className="w-10 h-10 bg-brand-black text-brand-yellow rounded-xl flex items-center justify-center font-extrabold text-xl shadow-lg">M</div>
            <span className="font-extrabold text-2xl tracking-tight text-brand-black hidden lg:block">
              MenuFight<span className="text-brand-yellow">.</span>
            </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
            {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`
                            w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm
                            ${isActive 
                                ? 'bg-brand-yellow text-brand-black shadow-lg shadow-brand-yellow/20 translate-x-1' 
                                : 'text-gray-400 hover:text-brand-black hover:bg-gray-50'
                            }
                        `}
                    >
                        <span className={`${isActive ? 'text-brand-black' : ''}`}>{item.icon}</span>
                        <span className="hidden lg:block">{item.label}</span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 bg-black rounded-full hidden lg:block"></span>}
                    </button>
                );
            })}
        </nav>
      </div>

      {/* Bottom Section: Profile & Logout */}
      <div className="space-y-4">
          
          <div className="px-4">
             <div className="p-4 rounded-3xl bg-brand-black text-white shadow-xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-brand-yellow rounded-full blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                 
                 <div className="flex items-center gap-3 relative z-10 mb-3">
                     <div className="w-10 h-10 rounded-full border-2 border-brand-yellow bg-gray-800 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-full h-full object-cover" />
                     </div>
                     <div className="hidden lg:block">
                         <p className="font-bold text-sm">Gotham Burgers</p>
                         <p className="text-[10px] text-gray-400 uppercase tracking-widest">Premium</p>
                     </div>
                 </div>

                 <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-bold text-gray-300 hover:text-white">
                     <UsersIcon className="w-3 h-3" />
                     <span className="hidden lg:block">My Profile</span>
                 </button>
             </div>
          </div>

          <button className="w-full flex items-center gap-4 px-8 py-3 text-gray-400 hover:text-red-500 transition-colors text-sm font-bold group">
              <LogoutIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="hidden lg:block">Log Out</span>
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;
