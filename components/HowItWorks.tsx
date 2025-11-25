import React, { useState } from 'react';
import { ArrowRightIcon, FireIcon, TrophyIcon } from './Icons';

const battles = [
  {
    id: 1,
    category: 'Burger',
    imageA: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    imageB: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    titleA: 'Truffle Smash',
    titleB: 'Classic BBQ',
    votesA: 68,
    votesB: 32,
    totalVotes: 1240,
  },
  {
    id: 2,
    category: 'Dessert',
    imageA: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    imageB: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    titleA: 'Berry Tart',
    titleB: 'Choco Lava',
    votesA: 42,
    votesB: 58,
    totalVotes: 890,
  },
  {
    id: 3,
    category: 'Asian',
    imageA: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    imageB: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    titleA: 'Spicy Ramen',
    titleB: 'Dim Sum Set',
    votesA: 55,
    votesB: 45,
    totalVotes: 2150,
  }
];

const categories = ['All', 'Burger', 'Asian', 'Dessert', 'Vegan'];

const HowItWorks = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section id="battles" className="py-24 bg-brand-pink/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-red font-bold tracking-wider uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
            Live Battles
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text mt-2 mb-8">
            See What Locals <br/> Are Craving Right Now
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105' 
                    : 'bg-white text-brand-text hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Battles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {battles.map((battle) => (
            <div key={battle.id} className="bg-white rounded-[30px] overflow-hidden shadow-soft group hover:shadow-card transition-all duration-300 border border-gray-100 relative">
              
              {/* Header */}
              <div className="px-6 pt-6 pb-2 flex justify-between items-center">
                  <span className="bg-gray-100 text-brand-gray text-xs font-bold px-3 py-1 rounded-full">{battle.category}</span>
                  <div className="flex items-center gap-1 text-brand-red text-xs font-bold">
                     <FireIcon className="w-4 h-4"/>
                     {battle.totalVotes} votes
                  </div>
              </div>

              {/* VS Images */}
              <div className="relative h-48 flex items-center justify-center px-4 mt-2">
                 {/* Left Image */}
                 <div className="relative w-1/2 h-40 rounded-l-2xl overflow-hidden group-hover:w-[55%] transition-all duration-500 z-0">
                    <img src={battle.imageA} alt={battle.titleA} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    {battle.votesA > battle.votesB && (
                        <div className="absolute top-2 left-2 bg-brand-yellow text-white p-1 rounded-full shadow-md">
                            <TrophyIcon className="w-4 h-4" />
                        </div>
                    )}
                 </div>
                 
                 {/* VS Badge */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-xs italic text-brand-text shadow-lg z-10 border-4 border-white">
                    VS
                 </div>

                 {/* Right Image */}
                 <div className="relative w-1/2 h-40 rounded-r-2xl overflow-hidden group-hover:w-[55%] transition-all duration-500 z-0">
                    <img src={battle.imageB} alt={battle.titleB} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    {battle.votesB > battle.votesA && (
                        <div className="absolute top-2 right-2 bg-brand-yellow text-white p-1 rounded-full shadow-md">
                            <TrophyIcon className="w-4 h-4" />
                        </div>
                    )}
                 </div>
              </div>

              {/* Voting Content */}
              <div className="px-6 pb-8 pt-4">
                 
                 <div className="flex justify-between items-end mb-2">
                    <div>
                        <h3 className="font-bold text-brand-text">{battle.titleA}</h3>
                        <span className={`text-sm font-bold ${battle.votesA > battle.votesB ? 'text-brand-green' : 'text-gray-400'}`}>{battle.votesA}%</span>
                    </div>
                    <div className="text-right">
                        <h3 className="font-bold text-brand-text">{battle.titleB}</h3>
                        <span className={`text-sm font-bold ${battle.votesB > battle.votesA ? 'text-brand-green' : 'text-gray-400'}`}>{battle.votesB}%</span>
                    </div>
                 </div>

                 {/* Progress Bar */}
                 <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex mb-6">
                    <div className={`h-full transition-all duration-1000 ease-out ${battle.votesA > battle.votesB ? 'bg-brand-red' : 'bg-gray-300'}`} style={{width: `${battle.votesA}%`}}></div>
                    <div className="w-1 bg-white h-full"></div>
                    <div className={`h-full transition-all duration-1000 ease-out ${battle.votesB > battle.votesA ? 'bg-brand-red' : 'bg-gray-300'}`} style={{width: `${battle.votesB}%`}}></div>
                 </div>

                 <button className="w-full py-3 rounded-xl border-2 border-brand-text text-brand-text font-bold hover:bg-brand-text hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg">
                    View Analysis <ArrowRightIcon className="w-4 h-4"/>
                 </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
             <button className="text-brand-gray font-medium hover:text-brand-red transition-colors border-b border-brand-gray hover:border-brand-red pb-1">
                View All Active Battles
             </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;