import React from 'react';
import { FireIcon, TrophyIcon, UsersIcon, TrendingUpIcon } from '../ui/icons';

const StatsOverview = () => {
  const stats = [
    {
      label: 'Total Votes',
      value: '12,450',
      trend: '+12%',
      trendUp: true,
      icon: <FireIcon className="w-6 h-6 text-white" />,
      color: 'bg-brand-red'
    },
    {
      label: 'Menu Wins',
      value: '8',
      trend: '+2',
      trendUp: true,
      icon: <TrophyIcon className="w-6 h-6 text-brand-black" />,
      color: 'bg-brand-yellow'
    },
    {
      label: 'Active Reach',
      value: '3.2k',
      trend: '+5%',
      trendUp: true,
      icon: <UsersIcon className="w-6 h-6 text-white" />,
      color: 'bg-brand-black'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-soft hover:shadow-plate transition-all duration-300 group">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${stat.color} transition-transform group-hover:scale-110`}>
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <TrendingUpIcon className="w-3 h-3" />
              {stat.trend}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-brand-black">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
