import React, { useState } from 'react';
import { TrophyIcon, FireIcon, ShareIcon, CheckIcon, ArrowRightIcon, MapPinIcon, GlobeIcon, ClockIcon } from '../../../components/ui/icons';

// Mock Data for the Poll
const pollData = {
  id: 'battle-123',
  title: 'The Ultimate Cheat Day Burger',
  question: 'Which one are you ordering this Friday?',
  endsIn: '14h 32m',
  totalVotes: 843,
  restaurant: {
    name: 'Gotham Burgers',
    location: '123 Flavor St, New York',
    description: 'We craft the juiciest, most insane burgers in the city using premium wagyu blends.',
    avatar: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    website: 'gothamburgers.com'
  },
  items: [
    {
      id: 'A',
      name: 'The Truffle Smash',
      description: 'Double wagyu patty, black truffle mayo, caramelized onions, aged swiss cheese on brioche.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '$18.00',
    },
    {
      id: 'B',
      name: 'Classic BBQ Stack',
      description: 'Slow-smoked brisket topper, crispy onion rings, house bourbon BBQ sauce, cheddar melt.',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: '$16.50',
    }
  ]
};

export default function VotePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleVote = (id: string) => {
    setSelectedId(id);
    setHasVoted(true);
    // In a real app, this would trigger a server action
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 font-sans relative overflow-x-hidden selection:bg-brand-yellow selection:text-brand-black">
      
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{
             backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
             backgroundSize: '24px 24px'
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-brand-red shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-brand-red"></span>
                <span className="font-bold text-[10px] tracking-widest uppercase">Voting Ends in {pollData.endsIn}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-4 tracking-tight">
                {pollData.title}
            </h1>
            <p className="text-lg text-gray-500 font-medium">
                {pollData.question}
            </p>
        </div>

        {/* BATTLE ARENA */}
        <div className="relative mb-24">
            
            {/* The VS Badge (Center Desktop / Top Mobile) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center justify-center">
                 <div className="w-24 h-24 bg-brand-yellow rounded-full border-[6px] border-white shadow-plate flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                    <span className="font-serif italic font-black text-4xl text-brand-black pr-1 pt-1">VS</span>
                 </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 relative">
                
                {pollData.items.map((item) => {
                    const isSelected = selectedId === item.id;
                    const isOtherSelected = hasVoted && !isSelected;
                    const isHovered = hoveredId === item.id;
                    const isDimmed = (hoveredId && hoveredId !== item.id) || isOtherSelected;

                    return (
                        <div 
                           key={item.id}
                           onMouseEnter={() => !hasVoted && setHoveredId(item.id)}
                           onMouseLeave={() => !hasVoted && setHoveredId(null)}
                           className={`
                                relative group rounded-[2.5rem] bg-white shadow-card overflow-hidden transition-all duration-500 border-2
                                ${isSelected ? 'ring-4 ring-brand-yellow border-transparent scale-[1.02] shadow-2xl z-20' : 'border-transparent'}
                                ${isDimmed ? 'opacity-50 blur-[1px] scale-95 grayscale-[30%]' : 'opacity-100'}
                                ${!hasVoted ? 'hover:shadow-plate cursor-pointer' : ''}
                           `}
                           onClick={() => !hasVoted && handleVote(item.id)}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 md:h-96 w-full overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                
                                {/* Price Badge */}
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-brand-black shadow-lg">
                                    {item.price}
                                </div>

                                {/* Selection Overlay */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
                                        <div className="bg-brand-yellow text-brand-black w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                                            <CheckIcon className="w-10 h-10" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:p-10 relative">
                                <h3 className="text-2xl md:text-4xl font-extrabold text-brand-black mb-3 leading-tight">{item.name}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-8 text-base md:text-lg">
                                    {item.description}
                                </p>

                                {/* Action Button */}
                                <button 
                                    className={`
                                        w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-2
                                        ${isSelected 
                                            ? 'bg-brand-green text-white shadow-lg pointer-events-none' 
                                            : 'bg-brand-black text-white hover:bg-brand-yellow hover:text-brand-black shadow-md hover:shadow-xl'
                                        }
                                    `}
                                    disabled={hasVoted}
                                >
                                    {isSelected ? (
                                        <>Voted <CheckIcon className="w-5 h-5"/></>
                                    ) : hasVoted ? (
                                        "Option Not Selected"
                                    ) : (
                                        <>Taste This One <FireIcon className="w-5 h-5"/></>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* POST VOTE ACTIONS */}
        <div className={`transition-all duration-700 transform ${hasVoted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
            <div className="max-w-xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-brand-black mb-6">Thanks for voting!</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={`/poll/${pollData.id}/results`} className="flex-1 bg-white border-2 border-brand-black text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-black hover:text-brand-yellow transition-all shadow-soft flex items-center justify-center gap-2">
                        View Live Results <ArrowRightIcon className="w-5 h-5" />
                    </a>
                    <button className="flex-1 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:brightness-105 transition-all shadow-soft flex items-center justify-center gap-2">
                        Share Poll <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-400 font-medium">Votes are anonymous. Results update in real-time.</p>
            </div>
        </div>

        {/* RESTAURANT INFO CARD */}
        <div className="mt-32 max-w-4xl mx-auto">
            <div className="bg-[#111111] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-yellow/20 transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    
                    {/* Avatar */}
                    <div className="shrink-0">
                        <div className="w-32 h-32 rounded-full border-4 border-brand-yellow/20 p-1">
                            <img 
                                src={pollData.restaurant.avatar} 
                                alt={pollData.restaurant.name} 
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                        <div className="inline-block px-3 py-1 bg-brand-yellow/20 text-brand-yellow rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
                            The Creator
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-3">{pollData.restaurant.name}</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {pollData.restaurant.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-brand-yellow" />
                                {pollData.restaurant.location}
                            </div>
                             <div className="flex items-center gap-2">
                                <GlobeIcon className="w-5 h-5 text-brand-yellow" />
                                {pollData.restaurant.website}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="shrink-0">
                         <button className="bg-white text-brand-black px-8 py-4 rounded-full font-bold hover:bg-brand-yellow transition-colors shadow-lg shadow-white/5">
                             Book a Table
                         </button>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
