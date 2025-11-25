
import React, { useEffect, useState } from 'react';
import { ShareIcon } from '../../../../components/ui/icons';
import { getPollData } from '../../../../utils/pollManager';
import { PollData } from '../../../../types/poll';
import ResultsHeader from '../../../../components/results/ResultsHeader';
import ResultsChart from '../../../../components/results/ResultsChart';
import StatsCards from '../../../../components/results/StatsCards';

export default function ResultsPage() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[2];

    const loadData = () => {
        const data = getPollData(id);
        if (data) {
            setPoll(data);
            setLoading(false);
        }
    };

    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !poll) {
      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-brand-black font-bold animate-pulse">Calculating Live Results...</p>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 font-sans selection:bg-brand-yellow selection:text-brand-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ResultsHeader title={poll.title} />
        
        <ResultsChart 
            itemA={poll.items[0]} 
            itemB={poll.items[1]} 
            totalVotes={poll.totalVotes} 
        />
        
        <StatsCards 
            itemA={poll.items[0]} 
            itemB={poll.items[1]} 
            totalVotes={poll.totalVotes} 
        />

        <div className="text-center pb-12">
            <h3 className="font-bold text-brand-black mb-6">Get your friends involved</h3>
            <div className="flex justify-center gap-4">
                <button className="bg-brand-black text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                    <ShareIcon className="w-5 h-5" /> Share Results
                </button>
                <a href="/" className="bg-white border border-gray-200 text-brand-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    Back to Home
                </a>
            </div>
        </div>

      </div>
    </div>
  );
}
