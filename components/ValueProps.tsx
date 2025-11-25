import React from 'react';
import { ArrowRightIcon } from './Icons';

const ValueProps = () => {
  return (
    <section id="about-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Side - Organic Composition */}
            <div className="relative order-2 lg:order-1">
                <div className="relative z-10 pl-8">
                     {/* Main Image - Rotating plate/bowl concept */}
                     <div className="relative">
                         <img 
                            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Chef Cooking" 
                            className="rounded-[3rem] rotate-[-3deg] shadow-plate w-full max-w-md mx-auto lg:mx-0 relative z-10 border-4 border-white"
                         />
                         {/* Decorative Back Shape */}
                         <div className="absolute top-4 -left-4 w-full h-full bg-brand-yellow rounded-[3rem] rotate-[-6deg] -z-10"></div>
                     </div>
                     
                     {/* Overlapping Badge Image */}
                     <div className="absolute -bottom-10 -right-4 md:right-10 w-48 h-48 bg-white p-3 rounded-full shadow-xl hidden md:block z-20">
                        <img 
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                            alt="Healthy Ingredients" 
                            className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-brand-black text-white text-xs font-bold px-3 py-1 rounded-full">Real Data</div>
                     </div>
                </div>
            </div>

            {/* Text Side */}
            <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                     <div className="h-px w-12 bg-brand-black"></div>
                     <span className="text-brand-black/60 text-sm font-bold uppercase tracking-widest">Our Methodology</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-8 leading-tight">
                    We turned "gut feel" into a <br/> 
                    <span className="text-brand-yellow inline-block bg-brand-black px-2 transform -rotate-1">science.</span>
                </h2>

                <p className="text-brand-text/70 mb-6 text-lg leading-relaxed">
                    Just like a family shop knows its regulars, MenuFight helps you know your customers before they even walk in. 
                    We simulate the "regular" experience at scale by putting your menu concepts in front of real local voters.
                </p>
                
                <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-bold text-xs">1</div>
                        <span className="text-brand-black font-medium">Create 1-vs-1 image polls</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-bold text-xs">2</div>
                        <span className="text-brand-black font-medium">Share with your local audience</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-bold text-xs">3</div>
                        <span className="text-brand-black font-medium">Launch the winner with confidence</span>
                    </li>
                </ul>

                <button className="bg-brand-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-black transition-colors">
                    How it works
                </button>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ValueProps;