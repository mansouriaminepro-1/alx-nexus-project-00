import React from 'react';
import { ArrowRightIcon } from '../ui/icons';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif italic text-gray-400">Feedback</h2>
            <div className="flex gap-2">
                 <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-brand-black hover:text-white transition-colors rotate-180"><ArrowRightIcon /></button>
                 <button className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-brand-black hover:text-white transition-colors"><ArrowRightIcon /></button>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 - Active */}
            <div className="bg-brand-lightGray/50 rounded-r-[4rem] rounded-bl-[4rem] rounded-tl-3xl p-10 relative hover:bg-brand-yellow/10 transition-colors duration-300 cursor-pointer group">
                <div className="flex items-center gap-4 mb-6">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" className="w-16 h-16 rounded-full border-4 border-white shadow-sm object-cover" alt="Omar" />
                    <div>
                        <p className="font-bold text-brand-black text-lg">Omar Rahman</p>
                        <p className="text-xs text-brand-black/50 uppercase tracking-wide font-bold">Owner, The Burger Joint</p>
                    </div>
                </div>
                <p className="text-brand-black/70 font-medium text-lg leading-relaxed">
                    "MenuFight completely changed how we launch seasonal menus. We used to guess. Now we know. The ROI on a single month covers the subscription for a year."
                </p>
            </div>

             {/* Testimonial 2 - Passive */}
             <div className="hidden md:block bg-white border border-gray-100 rounded-l-[4rem] rounded-br-[4rem] rounded-tr-3xl p-10 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-4 mb-6">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" className="w-16 h-16 rounded-full border-4 border-white shadow-sm object-cover" alt="Sarah" />
                    <div>
                        <p className="font-bold text-brand-black text-lg">Sarah Jenkins</p>
                        <p className="text-xs text-brand-black/50 uppercase tracking-wide font-bold">Marketing, Fresh Eats</p>
                    </div>
                </div>
                <p className="text-brand-black/70 font-medium text-lg leading-relaxed">
                    "I never thought data could be this tasty. Our food waste dropped by 20% simply because we stopped cooking things people didn't actually want to buy."
                </p>
            </div>
        </div>

        {/* Big Quote Decoration */}
        <div className="mt-24 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] text-brand-yellow/10 font-serif font-bold z-0">“</div>
            <p className="text-3xl md:text-5xl font-bold text-brand-black max-w-3xl mx-auto relative z-10 tracking-tight">
                Validate your menu. <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-black">Grow your business.</span>
            </p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;