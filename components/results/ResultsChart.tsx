
import React from 'react';
import { TrophyIcon, FireIcon } from '../ui/icons';
import { PollItem } from '../../types/poll';

interface ResultsChartProps {
  itemA: PollItem;
  itemB: PollItem;
  totalVotes: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ itemA, itemB, totalVotes }) => {
  const percentA = totalVotes === 0 ? 50 : Math.round((itemA.votes / totalVotes) * 100);
  const percentB = 100 - percentA;
  const hasWinner = totalVotes > 0 && percentA !== percentB;
  const winner = percentA > percentB ? itemA : itemB;

  return (
    <div className="bg-white rounded-[3rem] p-6 md:p-12 shadow-card border border-gray-100 mb-12 animate-in zoom-in-95 duration-700">
        
        {/* Vote Count */}
        <div className="text-center mb-10">
            <p className="text-5xl md:text-7xl font-black text-brand-black tracking-tight">{totalVotes.toLocaleString()}</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Total Votes Verified</p>
        </div>

        {/* The Bars */}
        <div className="relative mb-12">
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 h-auto md:h-40 rounded-[2rem] overflow-hidden md:relative">
                
                {/* Bar A */}
                <div 
                    className="bg-brand-black text-white p-6 flex flex-col justify-center relative transition-all duration-1000 ease-out md:rounded-r-none rounded-[2rem] md:rounded-l-[2rem]"
                    style={{ width: `${window.innerWidth > 768 ? percentA : 100}%`, flex: window.innerWidth > 768 ? 'none' : '1' }}
                >
                    <div className="relative z-10">
                        <h3 className="text-lg md:text-2xl font-bold truncate pr-4">{itemA.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-4xl md:text-5xl font-black text-brand-yellow">{percentA}%</span>
                        </div>
                    </div>
                    {totalVotes > 0 && percentA > percentB && (
                        <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black p-2 rounded-full shadow-lg animate-bounce">
                            <TrophyIcon className="w-6 h-6" />
                        </div>
                    )}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                        <img src={itemA.image} className="w-full h-full object-cover" alt="" />
                    </div>
                </div>

                {/* VS Divider (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center font-black italic text-brand-black shadow-lg">VS</div>

                {/* Bar B */}
                <div 
                    className="bg-gray-100 text-brand-black p-6 flex flex-col justify-center relative transition-all duration-1000 ease-out md:rounded-l-none rounded-[2rem] md:rounded-r-[2rem]"
                    style={{ width: `${window.innerWidth > 768 ? percentB : 100}%`, flex: window.innerWidth > 768 ? 'none' : '1' }}
                >
                    <div className="relative z-10 text-right">
                         <h3 className="text-lg md:text-2xl font-bold truncate pl-4">{itemB.name}</h3>
                         <div className="flex items-center justify-end gap-2 mt-1">
                            <span className="text-4xl md:text-5xl font-black text-brand-black">{percentB}%</span>
                        </div>
                    </div>
                    {totalVotes > 0 && percentB > percentA && (
                        <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black p-2 rounded-full shadow-lg animate-bounce">
                            <TrophyIcon className="w-6 h-6" />
                        </div>
                    )}
                    <div className="absolute inset-0 opacity-10 grayscale">
                        <img src={itemB.image} className="w-full h-full object-cover" alt="" />
                    </div>
                </div>
            </div>

            {/* Mobile VS Divider */}
            <div className="md:hidden flex justify-center -my-6 relative z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black italic text-brand-black shadow-md border border-gray-100">VS</div>
            </div>

        </div>

        {/* Insight */}
        <div className="bg-brand-yellow/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-brand-yellow text-brand-black p-2 rounded-full shrink-0">
                <FireIcon className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-brand-black text-lg">Trending Insight</h4>
                <p className="text-brand-text/80 font-medium mt-1">
                    {totalVotes === 0 
                        ? "Waiting for the first vote! Be the tastemaker."
                        : hasWinner 
                            ? `${winner.name} is currently dominating with ${Math.max(percentA, percentB)}% of the votes.`
                            : "It's a dead heat! Every vote counts right now."
                    }
                </p>
            </div>
        </div>

    </div>
  );
};

export default ResultsChart;
