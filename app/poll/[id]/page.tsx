
import React, { useState, useEffect } from 'react';
import { TrophyIcon, FireIcon, ShareIcon, CheckIcon, ArrowRightIcon, MapPinIcon, GlobeIcon, XIcon } from '../../../components/ui/icons';
import { getPollData, castVote, getUserVote, PollData } from '../../../utils/pollManager';

export default function VotePage() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [pollId, setPollId] = useState<string>('');

  useEffect(() => {
    // Extract ID from URL manually since we are using a custom router in index.tsx
    const pathSegments = window.location.pathname.split('/');
    // Expected format: /poll/[id]
    const id = pathSegments[2]; 
    setPollId(id);

    // Load initial data for this ID
    const data = getPollData(id);
    if (data) {
        setPoll(data);
    } else {
        // Fallback or 404 handling could go here
        console.log("Poll not found, using defaults or loading state");
    }

    // Check if user already voted for this specific poll
    if (id) {
        const existingVote = getUserVote(id);
        if (existingVote) {
          setSelectedId(existingVote);
          setHasVoted(true);
        }
    }
  }, []);

  const handleVote = (itemId: string) => {
    if (hasVoted || !pollId) return;

    // Execute Logic
    castVote(pollId, itemId);
    
    // Update UI State
    setSelectedId(itemId);
    setHasVoted(true);
    setShowThankYouModal(true);
  };

  if (!poll) return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold">Loading Battle Arena...</p>
      </div>
  );

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
                <span className="font-bold text-[10px] tracking-widest uppercase">Voting Ends in {poll.endsIn}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-4 tracking-tight">
                {poll.title}
            </h1>
            <p className="text-lg text-gray-500 font-medium">
                {poll.question}
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
                
                {poll.items.map((item) => {
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
                                {item.price && (
                                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-brand-black shadow-lg">
                                        {item.price}
                                    </div>
                                )}

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
                                src={poll.restaurant.avatar} 
                                alt={poll.restaurant.name} 
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center md:text-left flex-1">
                        <div className="inline-block px-3 py-1 bg-brand-yellow/20 text-brand-yellow rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
                            The Creator
                        </div>
                        <h2 className="text-3xl font-extrabold text-white mb-3">{poll.restaurant.name}</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {poll.restaurant.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm font-medium text-gray-300">
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-brand-yellow" />
                                {poll.restaurant.location}
                            </div>
                             <div className="flex items-center gap-2">
                                <GlobeIcon className="w-5 h-5 text-brand-yellow" />
                                {poll.restaurant.website}
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

      {/* THANK YOU POPUP MODAL */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowThankYouModal(false)}></div>
            
            {/* Content */}
            <div className="relative w-full max-w-lg bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300 text-center overflow-hidden">
                 
                 {/* Decor */}
                 <div className="absolute top-0 left-0 w-full h-2 bg-brand-yellow"></div>
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-2xl"></div>

                 <div className="relative z-10">
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                         <CheckIcon className="w-10 h-10" />
                     </div>
                     
                     <h2 className="text-3xl font-extrabold text-brand-black mb-3">Vote Counted!</h2>
                     <p className="text-gray-500 font-medium mb-8">
                         Thanks for helping {poll.restaurant.name} decide. The battle is heating up!
                     </p>

                     <div className="space-y-4">
                         <a href={`/poll/${poll.id}/results`} className="block w-full bg-brand-black text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-yellow hover:text-brand-black transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                             See Live Results <ArrowRightIcon className="w-5 h-5" />
                         </a>
                         
                         <button className="block w-full bg-white border-2 border-gray-100 text-brand-black py-4 rounded-xl font-bold text-lg hover:border-brand-black transition-colors flex items-center justify-center gap-2">
                             Share with Friends <ShareIcon className="w-5 h-5" />
                         </button>
                     </div>

                     <button 
                        onClick={() => setShowThankYouModal(false)}
                        className="mt-6 text-sm text-gray-400 font-bold hover:text-brand-black transition-colors"
                     >
                        Close Window
                     </button>
                 </div>
            </div>
        </div>
      )}

    </div>
  );
}
