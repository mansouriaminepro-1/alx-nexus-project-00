
import React from 'react';
import { ClockIcon, ArrowRightIcon } from '../ui/icons';

interface SubmitButtonProps {
  duration: string;
  setDuration: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ duration, setDuration, onSubmit, isSubmitting }) => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-soft border border-gray-100">
      <h3 className="text-xl font-extrabold text-brand-black mb-8 flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-brand-black text-brand-yellow flex items-center justify-center text-lg font-bold">3</span>
        Timing & Launch
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 w-full space-y-3">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Duration</label>
              <div className="grid grid-cols-3 gap-4">
                  {['24h', '48h', '1 Week'].map((d) => (
                      <button 
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 ${
                              duration === d 
                              ? 'bg-brand-black text-brand-yellow border-brand-black shadow-lg transform -translate-y-1' 
                              : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                          {d}
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="flex-1 w-full bg-brand-lightGray/40 p-6 rounded-[2rem] flex items-center gap-5 border border-transparent hover:border-brand-yellow/30 transition-colors">
               <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-black shadow-md">
                  <ClockIcon className="w-7 h-7" />
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Estimated Reach</p>
                  <p className="font-black text-brand-black text-2xl tracking-tight">~1,200 Locals</p>
                  <p className="text-[10px] text-gray-400 font-medium">Based on your location radius</p>
               </div>
          </div>
      </div>
      
      <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
          <button 
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-brand-black hover:bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-4 w-full md:w-auto justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
          >
              {isSubmitting ? (
                  <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-brand-yellow rounded-full animate-spin"></span>
                      Launching...
                  </>
              ) : (
                  <>
                      Launch Battle Now
                      <span className="bg-brand-yellow text-brand-black rounded-full p-1.5 group-hover:rotate-[-45deg] transition-transform duration-300">
                          <ArrowRightIcon className="w-4 h-4" />
                      </span>
                  </>
              )}
          </button>
      </div>
    </div>
  );
};

export default SubmitButton;
