import React from 'react';
import { ArrowRightIcon, TrophyIcon } from './Icons';

const battles = [
    {
        title: "Burger Battle",
        winner: "Truffle Smash",
        loser: "Classic BBQ",
        stats: "1,240 Votes",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        winRate: "68%"
    },
    {
        title: "Summer Refresh",
        winner: "Mango Tango",
        loser: "Berry Blast",
        stats: "85 Votes",
        status: "Live Now",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        winRate: "Leading"
    },
    {
        title: "Vegan Special",
        winner: "Jackfruit Taco",
        loser: "Tofu Bowl",
        stats: "890 Votes",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        winRate: "72%"
    },
    {
        title: "Dessert Wars",
        winner: "Lava Cake",
        loser: "Cheesecake",
        stats: "412 Votes",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        winRate: "55%"
    }
];

const BattlesGrid = () => {
  return (
    <section id="live-battles" className="py-24 bg-brand-lightGray/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
                <h2 className="text-4xl font-bold text-brand-black mb-2">Recent Battles</h2>
                <p className="text-gray-500">See what other restaurants are validating today.</p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
                {['All', 'Live', 'Completed', 'Trending'].map(cat => (
                    <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wide text-brand-text hover:bg-brand-black hover:text-white transition-colors">
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {battles.map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-6 pt-0 shadow-sm hover:shadow-plate transition-all duration-500 group text-center relative mt-16 border border-gray-50">
                    
                    {/* Floating Circular Image (Popping out) */}
                    <div className="w-40 h-40 mx-auto -mt-12 rounded-full p-1 bg-white shadow-lg mb-4 relative z-10 group-hover:scale-105 transition-transform">
                        <img src={item.image} className="w-full h-full rounded-full object-cover" alt={item.title}/>
                        
                        {/* Status Badge */}
                        <div className={`absolute top-0 right-0 px-2 py-1 rounded-full text-[10px] font-bold border-2 border-white shadow-sm uppercase tracking-tight ${item.status === 'Live Now' ? 'bg-brand-red text-white animate-pulse' : 'bg-brand-yellow text-brand-black'}`}>
                            {item.status}
                        </div>
                    </div>

                    <div className="relative z-0">
                        <h3 className="font-bold text-lg text-brand-black mb-1">{item.title}</h3>
                        <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-widest">{item.winner}</p>
                        
                        {/* Win Rate Visual */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <TrophyIcon className="w-4 h-4 text-brand-yellow" />
                            <span className="font-extrabold text-2xl text-brand-black">{item.winRate}</span>
                        </div>

                        <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-4">
                            <div className="text-left">
                                <span className="block text-[10px] text-gray-400 font-bold uppercase">Total Votes</span>
                                <span className="font-bold text-brand-black text-sm">{item.stats}</span>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-brand-lightGray flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-white transition-colors">
                                <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 text-center">
            <a href="#" className="inline-block border-b-2 border-brand-black pb-1 text-brand-black font-bold hover:text-brand-yellow hover:border-brand-yellow transition-colors">View Full Dashboard</a>
        </div>

      </div>
    </section>
  );
};

export default BattlesGrid;