import React from 'react';
import { ChartIcon, ArrowRightIcon } from '../../../../components/ui/icons';

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-white pt-32 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-brand-yellow/20 text-brand-black rounded-3xl flex items-center justify-center mb-6">
        <ChartIcon className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-extrabold text-brand-black mb-4">Live Results</h1>
      <p className="text-gray-500 max-w-md mb-8">
        The community has spoken! Real-time analytics and demographic breakdowns are loading...
      </p>
      <a href="/" className="inline-flex items-center gap-2 font-bold text-brand-black border-b-2 border-brand-black pb-1 hover:text-brand-yellow hover:border-brand-yellow transition-colors">
        Back to Home <ArrowRightIcon className="w-4 h-4"/>
      </a>
    </div>
  );
}
