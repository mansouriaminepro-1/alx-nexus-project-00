import React from 'react';
import { CheckIcon, FireIcon } from '../ui/icons';

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
                <h2 className="text-4xl font-bold text-brand-black mb-4">See the battle unfold.</h2>
                <p className="text-brand-gray text-lg">
                    Your dashboard gives you real-time insight into what the community is craving. 
                    Watch votes pour in and make decisions backed by data, not gut feel.
                </p>
            </div>
            <div className="hidden md:block">
                <button className="text-brand-blue font-bold hover:underline">View full case study</button>
            </div>
        </div>

        {/* The "Card" Visual */}
        <div className="relative w-full bg-brand-lightGray/20 rounded-5xl p-6 md:p-12 overflow-hidden border border-brand-lightGray shadow-soft">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(#0066FF 0.5px, transparent 0.5px)', backgroundSize: '24px 24px'}}></div>

            {/* The Dashboard UI Container */}
            <div className="relative bg-white rounded-4xl shadow-card border border-brand-lightGray overflow-hidden max-w-5xl mx-auto">
                
                {/* Window Controls (Decoration) */}
                <div className="h-12 border-b border-brand-lightGray flex items-center px-6 gap-2 bg-white sticky top-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 px-3 py-1 bg-brand-lightGray/30 rounded-md text-xs font-medium text-brand-text flex-1 text-center">
                        menufight.com/dashboard/campaign-2025
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8 grid md:grid-cols-3 gap-8">
                    
                    {/* Sidebar */}
                    <div className="col-span-1 space-y-6 hidden md:block">
                        <div className="space-y-2">
                            <div className="h-2 w-24 bg-brand-lightGray rounded-full"></div>
                            <div className="h-8 w-full bg-brand-lightGray/50 rounded-lg"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-32 bg-brand-lightGray rounded-full"></div>
                            <div className="h-32 w-full bg-brand-blue/5 rounded-xl border-2 border-brand-blue border-dashed flex items-center justify-center text-brand-blue text-sm font-bold">
                                + New Battle
                            </div>
                        </div>
                    </div>

                    {/* Main Content - The Battle */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-brand-black">Summer Menu A/B Test</h3>
                            <span className="flex items-center gap-1 text-xs font-bold text-brand-green bg-green-100 px-3 py-1 rounded-full">
                                <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
                                Live
                            </span>
                        </div>

                        {/* Battle Card */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Option A - Winner */}
                            <div className="group relative rounded-2xl overflow-hidden border-2 border-brand-blue shadow-lg transition-transform hover:scale-[1.02]">
                                <div className="absolute top-3 left-3 z-10 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold">Leading</div>
                                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="w-full h-40 object-cover" />
                                <div className="p-4 bg-white">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="font-bold text-sm text-brand-black">Wagyu Smash</h4>
                                        <span className="text-xl font-bold text-brand-blue">62%</span>
                                    </div>
                                    <div className="w-full bg-brand-lightGray h-2 rounded-full overflow-hidden">
                                        <div className="w-[62%] h-full bg-brand-blue"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Option B */}
                            <div className="group relative rounded-2xl overflow-hidden border border-brand-lightGray opacity-70 transition-opacity hover:opacity-100">
                                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" className="w-full h-40 object-cover grayscale" />
                                <div className="p-4 bg-white">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="font-bold text-sm text-brand-black">Classic Single</h4>
                                        <span className="text-xl font-bold text-gray-400">38%</span>
                                    </div>
                                    <div className="w-full bg-brand-lightGray h-2 rounded-full overflow-hidden">
                                        <div className="w-[38%] h-full bg-gray-400"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Insights */}
                        <div className="mt-6 p-4 bg-brand-yellow/10 rounded-xl flex items-start gap-3">
                            <div className="bg-white p-2 rounded-full shadow-sm text-brand-red">
                                <FireIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-black">Insight Alert</p>
                                <p className="text-xs text-brand-text/70 mt-1">The Wagyu Smash is performing 3x better with the 18-24 demographic in your area.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;