'use client';

import React from 'react';
import { LayoutIcon, ClockIcon, PieChartIcon, SettingsIcon } from '../ui/icons';

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
    <aside className="w-full h-full flex flex-col bg-white border-r border-gray-100 pt-8 pb-6 px-4">
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
    </aside>
  );
};

export default Sidebar;
