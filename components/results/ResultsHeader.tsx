
import React from 'react';

interface ResultsHeaderProps {
  title: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-12 animate-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-brand-black text-white shadow-lg">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span className="font-bold text-[10px] tracking-widest uppercase">Live Results</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-4">The People Have Spoken</h1>
        <p className="text-gray-500 font-medium text-lg">Current standings for "{title}"</p>
    </div>
  );
};

export default ResultsHeader;
