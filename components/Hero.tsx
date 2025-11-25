import React from 'react';
import { ArrowRightIcon, TrophyIcon, FireIcon } from './Icons';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-48 overflow-hidden bg-[#FDD835]">
      
      {/* Background: Dot Pattern for Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{
             backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
             backgroundSize: '32px 32px'
           }}>
      </div>

      {/* Background: Catchy Animated Gradient Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/20 rounded-full blur-3xl animate-pulse pointer-events-none mix-blend-overlay"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content - Typography */}
            <div className="text-left relative z-20">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-black/10 bg-white/40 backdrop-blur-sm shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="font-bold text-brand-black text-xs tracking-wide uppercase">For Restaurants & Cafes</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-brand-black mb-8 leading-[0.95] tracking-tight">
                    Launch <br/>
                    <span className="relative inline-block z-10">
                        Bestsellers
                        {/* Underline SVG */}
                        <svg className="absolute bottom-2 left-0 w-full h-4 text-white -z-10 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 15 100 5" fill="currentColor" />
                        </svg>
                    </span>
                </h1>
                <p className="text-xl text-brand-black/80 mb-10 max-w-lg leading-relaxed font-medium">
                    Don't guess what your customers want. Validate menu changes with 1-vs-1 polls before you buy the ingredients.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <button className="group bg-brand-black text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:bg-gray-900">
                        <span className="bg-brand-yellow text-brand-black rounded-full p-1 w-6 h-6 flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-300"><ArrowRightIcon className="w-4 h-4"/></span>
                        Start a Battle
                    </button>
                    
                    <div className="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group">
                        <div className="flex -space-x-3">
                             {[1,2,3].map(i => (
                                 <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-yellow bg-gray-200 overflow-hidden relative z-0 group-hover:z-10 hover:scale-110 transition-all duration-300">
                                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover"/>
                                 </div>
                             ))}
                        </div>
                        <div className="text-xs font-bold text-brand-black leading-tight">
                            Trusted by<br/>2,000+ Kitchens
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Content - The "Card Battle" Visual */}
            <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
                
                {/* Glow behind composition */}
                 <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-75 animate-pulse"></div>

                 {/* Card Container - Perspective wrapper */}
                 <div className="relative w-[300px] md:w-[360px] h-[420px] md:h-[500px] perspective-1000">
                    
                    {/* CARD B (Loser) - Background Layer */}
                    <div className="absolute top-6 right-[-16px] w-full h-full rounded-[2rem] bg-white shadow-xl transform rotate-6 transition-all duration-500 hover:rotate-12 hover:translate-x-6 group cursor-pointer overflow-hidden border-4 border-white/50">
                         <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors"></div>
                         <img 
                            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Classic Burger" 
                            className="w-full h-full object-cover"
                         />
                         {/* Stats Overlay B */}
                         <div className="absolute bottom-6 left-6 right-6 z-20">
                             <div className="flex justify-between items-end">
                                 <div>
                                     <p className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">Challenger</p>
                                     <h3 className="text-white font-bold text-xl">Classic BBQ</h3>
                                 </div>
                                 <span className="text-white/80 font-bold text-2xl">32%</span>
                             </div>
                         </div>
                    </div>

                    {/* CARD A (Winner) - Foreground Layer */}
                    <div className="absolute top-0 left-[-16px] w-full h-full rounded-[2rem] bg-brand-black shadow-2xl transform -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden border-4 border-white z-20">
                         <img 
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                            alt="Truffle Smash" 
                            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                         />
                         
                         {/* Gradient Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>

                         {/* Winner Badge */}
                         <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                             <TrophyIcon className="w-4 h-4" />
                             <span className="text-xs font-extrabold uppercase tracking-wider">Winner</span>
                         </div>

                         {/* Stats Overlay A */}
                         <div className="absolute bottom-8 left-8 right-8 text-white">
                             <div className="flex justify-between items-end">
                                 <div>
                                     <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-1">Champion</p>
                                     <h3 className="text-white font-extrabold text-3xl leading-none">Truffle Smash</h3>
                                 </div>
                                 <div className="text-right">
                                     <span className="block text-4xl font-black text-brand-yellow">68%</span>
                                     <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Votes</span>
                                 </div>
                             </div>
                             {/* Progress Bar Visual */}
                             <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                                 <div className="w-[68%] h-full bg-brand-yellow"></div>
                             </div>
                         </div>
                    </div>

                    {/* VS Badge - Floating Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <div className="w-20 h-20 bg-brand-yellow rounded-full border-4 border-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                            <span className="font-black italic text-3xl text-brand-black">VS</span>
                        </div>
                    </div>

                    {/* Insight Pop-up - Floating */}
                    <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-2xl shadow-xl z-30 max-w-[200px] animate-[float_5s_ease-in-out_infinite] hidden md:block border border-gray-100">
                         <div className="flex items-start gap-3">
                             <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                                 <FireIcon className="w-4 h-4" />
                             </div>
                             <div>
                                 <p className="text-xs font-bold text-brand-black leading-tight">Gen Z prefers the Truffle Smash by 40%</p>
                                 <p className="text-[10px] text-gray-400 mt-1 font-medium">Real-time Insight</p>
                             </div>
                         </div>
                    </div>

                 </div>
            </div>
        </div>
      </div>

      {/* Dynamic Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
      </div>
    </section>
  );
};

export default Hero;