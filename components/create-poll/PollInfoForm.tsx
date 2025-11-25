
import React from 'react';

interface PollInfoFormProps {
  title: string;
  question: string;
  setTitle: (val: string) => void;
  setQuestion: (val: string) => void;
}

const PollInfoForm: React.FC<PollInfoFormProps> = ({ title, question, setTitle, setQuestion }) => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-card border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-[4rem] -mr-8 -mt-8 pointer-events-none"></div>
      
      <h3 className="text-xl font-extrabold text-brand-black mb-8 flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-brand-black text-brand-yellow flex items-center justify-center text-lg font-bold">1</span>
        Battle Details
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-3 group">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-brand-black transition-colors">Battle Title</label>
          <input 
            type="text" 
            placeholder="e.g. The Burger Showdown" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-all font-bold text-2xl md:text-3xl text-brand-black placeholder-gray-300"
          />
        </div>

        <div className="space-y-3 group">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-brand-black transition-colors">Question for Voters</label>
          <input 
            type="text" 
            placeholder="Which one makes you hungrier?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-all font-medium text-xl md:text-2xl text-brand-black placeholder-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default PollInfoForm;
