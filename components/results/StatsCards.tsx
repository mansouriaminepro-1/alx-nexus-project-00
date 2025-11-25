
import React from 'react';
import { PollItem } from '../../types/poll';

interface StatsCardsProps {
  itemA: PollItem;
  itemB: PollItem;
  totalVotes: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({ itemA, itemB, totalVotes }) => {
  const percentA = totalVotes === 0 ? 50 : Math.round((itemA.votes / totalVotes) * 100);
  const percentB = 100 - percentA;

  const renderCard = (item: PollItem, isLeading: boolean) => (
    <div className={`bg-white p-8 rounded-[2.5rem] border ${isLeading ? 'border-brand-yellow shadow-plate' : 'border-gray-100 shadow-sm'} transition-all`}>
        <div className="flex items-center gap-4 mb-6">
            <img src={item.image} className={`w-16 h-16 rounded-2xl object-cover ${!isLeading && totalVotes > 0 ? 'grayscale' : ''}`} alt={item.name} />
            <div>
                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.votes} Votes</p>
            </div>
        </div>
        <div className="space-y-4 opacity-70">
            <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                    <span>Gen Z Approval</span>
                    <span className="text-brand-black">--</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${isLeading ? 'bg-brand-black' : 'bg-gray-400'} w-[0%]`}></div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
        {renderCard(itemA, totalVotes > 0 && percentA > percentB)}
        {renderCard(itemB, totalVotes > 0 && percentB > percentA)}
    </div>
  );
};

export default StatsCards;
