
import React, { useRef } from 'react';
import { PhotoIcon, TrashIcon } from '../ui/icons';

interface Contender {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string | null;
}

interface PollItemsFormProps {
  contenderA: Contender;
  contenderB: Contender;
  setContenderA: (c: Contender) => void;
  setContenderB: (c: Contender) => void;
}

const PollItemsForm: React.FC<PollItemsFormProps> = ({ contenderA, contenderB, setContenderA, setContenderB }) => {
  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, contender: 'A' | 'B') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      if (contender === 'A') {
        setContenderA({ ...contenderA, image: imageUrl });
      } else {
        setContenderB({ ...contenderB, image: imageUrl });
      }
    }
  };

  const handleRemoveImage = (contender: 'A' | 'B') => {
    if (contender === 'A') {
      setContenderA({ ...contenderA, image: null });
      if (fileInputARef.current) fileInputARef.current.value = '';
    } else {
      setContenderB({ ...contenderB, image: null });
      if (fileInputBRef.current) fileInputBRef.current.value = '';
    }
  };

  const renderContenderCard = (contender: Contender, label: 'A' | 'B', setter: (c: Contender) => void, fileRef: React.RefObject<HTMLInputElement>) => (
    <div className="bg-white rounded-[2.5rem] shadow-plate overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
        {/* Image Area */}
        <div className="relative h-72 w-full p-4">
            <div className={`relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${contender.image ? 'bg-gray-100' : 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-yellow group-hover:bg-brand-yellow/5'}`}>
                {contender.image ? (
                    <>
                        <img src={contender.image} alt={`Contender ${label}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                        <div className="absolute top-4 right-4 z-10">
                            <button 
                              onClick={() => handleRemoveImage(label)}
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-black shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Remove Image"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-brand-black px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
                            Contender {label}
                        </div>
                    </>
                ) : (
                    <div 
                      className="text-center cursor-pointer w-full h-full flex flex-col items-center justify-center p-6"
                      onClick={() => fileRef.current?.click()}
                    >
                        <div className="w-20 h-20 rounded-full bg-white shadow-sm mb-4 flex items-center justify-center text-brand-black group-hover:scale-110 group-hover:text-brand-yellow transition-all duration-300">
                            <PhotoIcon className="w-8 h-8" />
                        </div>
                        <p className="font-extrabold text-brand-black text-lg">Click to Upload</p>
                        <p className="text-sm text-gray-400 mt-1 font-medium">or drag and drop here</p>
                    </div>
                )}
            </div>
            <input 
                type="file" 
                ref={fileRef}
                onChange={(e) => handleImageUpload(e, label)}
                className="hidden" 
                accept="image/*"
            />
        </div>

        {/* Details Area */}
        <div className="px-8 pb-10 pt-2 space-y-6">
            <div className="group/input">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Name</label>
                <input 
                    type="text" 
                    placeholder={label === 'A' ? "e.g. Truffle Smash" : "e.g. Classic BBQ"}
                    value={contender.name}
                    onChange={(e) => setter({...contender, name: e.target.value})}
                    className="w-full text-2xl font-black text-brand-black placeholder-gray-200 focus:outline-none border-b border-transparent focus:border-brand-yellow transition-all bg-transparent"
                />
            </div>
            <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Description</label>
                <textarea 
                    rows={2}
                    placeholder="Describe ingredients..."
                    value={contender.description}
                    onChange={(e) => setter({...contender, description: e.target.value})}
                    className="w-full text-brand-text/80 font-medium placeholder-gray-300 focus:outline-none resize-none bg-transparent leading-relaxed"
                />
            </div>
            <div className="pt-5 border-t border-dashed border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-bold">$</span>
                    <input 
                        type="text" 
                        placeholder="0.00" 
                        value={contender.price}
                        onChange={(e) => setter({...contender, price: e.target.value})}
                        className="w-24 font-bold text-brand-black focus:outline-none bg-transparent"
                    />
                 </div>
                 <div className="text-xs font-bold text-gray-300 uppercase">Item {label}</div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8 px-2">
           <h3 className="text-xl font-extrabold text-brand-black flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-brand-black text-brand-yellow flex items-center justify-center text-lg font-bold">2</span>
              The Contenders
           </h3>
           <span className="text-sm font-bold text-gray-400 hidden sm:block">Upload high-res photos for best results</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 relative">
          {renderContenderCard(contenderA, 'A', setContenderA, fileInputARef)}
          
          {/* VS Badge Absolute */}
          <div className="absolute top-[40%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block">
              <div className="w-24 h-24 bg-brand-yellow rounded-full border-[6px] border-white shadow-2xl flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                  <span className="font-black italic text-4xl text-brand-black pr-1 pt-1">VS</span>
              </div>
          </div>
          
          {/* Mobile VS Badge */}
          <div className="flex lg:hidden justify-center -my-8 relative z-20 pointer-events-none">
               <div className="w-16 h-16 bg-brand-yellow rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="font-black italic text-2xl text-brand-black pr-0.5 pt-0.5">VS</span>
              </div>
          </div>

          {renderContenderCard(contenderB, 'B', setContenderB, fileInputBRef)}
      </div>
    </div>
  );
};

export default PollItemsForm;
