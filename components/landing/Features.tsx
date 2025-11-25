
import React from 'react';
import { ChartIcon, VoteIcon, FireIcon } from '../ui/icons';

const features = [
    {
        title: "Create",
        description: "Upload two photos. Add descriptions. Set your demographic radius.",
        icon: <span className="text-2xl font-bold">+</span>
    },
    {
        title: "Vote",
        description: "Locals vote on their phones. Fast, visual, and appetite-inducing.",
        icon: <VoteIcon className="w-6 h-6" />
    },
    {
        title: "Analyze",
        description: "See the winner instantly. Understand age, gender, and location data.",
        icon: <ChartIcon className="w-6 h-6" />
    },
    {
        title: "Launch",
        description: "Add the winner to your physical menu. Watch sales align with data.",
        icon: <FireIcon className="w-6 h-6" />
    }
];

const Features = () => {
  return (
    <section id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-black mb-4">The Process</h2>
            <p className="text-brand-black/60 max-w-2xl mx-auto">From concept to kitchen in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 group hover:-translate-y-2">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-brand-lightGray flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-brand-black transition-colors text-brand-black">
                    {feature.icon}
                </div>
                
                <h3 className="text-xl font-extrabold text-brand-black mb-4">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {feature.description}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
