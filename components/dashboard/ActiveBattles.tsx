import React from 'react';
import { ClockIcon, FireIcon, ArrowRightIcon } from '../ui/icons';

const activePolls = [
  {
    id: 'battle-123',
    title: 'Summer Menu Test',
    endsIn: '4h 12m',
    totalVotes: 342,
    itemA: {
      name: 'Wagyu Smash',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      percentage: 65
    },
    itemB: {
      name: 'Classic Single',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      percentage: 35
    }
  },
  {
    id: 'battle-456',
    title: 'Vegan Option',
    endsIn: '22h 05m',
    totalVotes: 128,
    itemA: {
      name: 'Jackfruit Taco',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      percentage: 48
    },
    itemB: {
      name: 'Tofu Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      percentage: 52
    }
  }
];

const ActiveBattles = () => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-end mb-6">
        <h3 className="text-xl font-bold text-brand-black flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
          Live Now
        </h3>
        <button className="text-sm font-bold text-gray-400 hover:text-brand-black transition-colors">View All</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {activePolls.map((poll) => (
          <a key={poll.id} href={`/poll/${poll.id}/results`} className="bg-white rounded-[2rem] p-6 border border-brand-yellow/30 shadow-soft hover:shadow-card transition-all duration-300 group relative overflow-hidden block">
            
            {/* Live Indicator Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-bl-[4rem] pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h4 className="font-extrabold text-lg text-brand-black">{poll.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                   <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      <ClockIcon className="w-3 h-3" /> {poll.endsIn}
                   </div>
                   <div className="text-xs font-bold text-gray-400 flex items-center gap-1">
                      <FireIcon className="w-3 h-3" /> {poll.totalVotes} votes
                   </div>
                </div>
              </div>
              <div className="bg-brand-black text-white rounded-full p-2 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors">
                  <ArrowRightIcon className="w-4 h-4" />
              </div>
            </div>

            {/* Visual Bar */}
            <div className="relative h-24 rounded-2xl overflow-hidden flex">
                {/* Side A */}
                <div className="relative h-full transition-all duration-500" style={{ width: `${poll.itemA.percentage}%` }}>
                    <img src={poll.itemA.image} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all" alt="Option A" />
                    <div className="absolute inset-0 bg-brand-black/20"></div>
                    <div className="absolute bottom-2 left-3 text-white">
                        <p className="text-[10px] font-bold uppercase opacity-80">Leading</p>
                        <p className="font-bold text-lg leading-none">{poll.itemA.percentage}%</p>
                    </div>
                </div>

                {/* VS Line */}
                <div className="w-1 bg-white relative z-10"></div>

                {/* Side B */}
                <div className="relative h-full transition-all duration-500" style={{ width: `${poll.itemB.percentage}%` }}>
                    <img src={poll.itemB.image} className="w-full h-full object-cover filter brightness-50 group-hover:brightness-75 transition-all" alt="Option B" />
                    <div className="absolute inset-0 bg-brand-black/40"></div>
                    <div className="absolute bottom-2 right-3 text-white text-right">
                         <p className="text-[10px] font-bold uppercase opacity-60">{poll.itemB.name}</p>
                         <p className="font-bold text-lg leading-none opacity-80">{poll.itemB.percentage}%</p>
                    </div>
                </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ActiveBattles;
