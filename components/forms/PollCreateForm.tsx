"use client";

import React, { useState, useRef } from 'react';
import { UploadIcon, PhotoIcon, TrashIcon, CalendarIcon, ClockIcon, ArrowRightIcon } from '../ui/icons';

interface Contender {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string | null;
}

const PollCreateForm = () => {
    // Pre-filled data for better UX/Demo flow
    const [title, setTitle] = useState('The Ultimate Burger Battle');
    const [question, setQuestion] = useState('Which one makes you hungrier?');
    const [duration, setDuration] = useState('24h');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [contenderA, setContenderA] = useState<Contender>({
        id: 'A',
        name: 'Truffle Smash',
        description: 'Double wagyu patty, black truffle mayo, caramelized onions, aged swiss cheese on brioche.',
        price: '18.00',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    });

    const [contenderB, setContenderB] = useState<Contender>({
        id: 'B',
        name: 'Classic BBQ',
        description: 'Slow-smoked brisket topper, crispy onion rings, house bourbon BBQ sauce, cheddar melt.',
        price: '16.50',
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    });

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

    const handleSubmit = async () => {
        if (!title || !contenderA.name || !contenderB.name) {
            alert("Please fill in the battle title and contender names.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call with shorter delay for snappier feel
        await new Promise(resolve => setTimeout(resolve, 800));

        // Simulate navigation to the Vote Page (SPA routing)
        const targetUrl = '/poll/battle-123';

        try {
            // Try standard history push
            window.history.pushState({}, '', targetUrl);
        } catch (e) {
            // Fallback for sandboxed environments where pushState is restricted
            console.warn('History API restricted, using internal event routing', e);
        }

        // Dispatch custom event to ensure Router picks up the change regardless of history API success
        const navEvent = new CustomEvent('navigate', { detail: targetUrl });
        window.dispatchEvent(navEvent);

        window.scrollTo(0, 0);
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-8 pb-12">

            {/* 1. Poll Information Card */}
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
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-brand-yellow focus:outline-none transition-all font-medium text-xl md:text-2xl text-brand-black placeholder-gray-300"
                        />
                    </div>
                </div>
            </div>

            {/* 2. The Arena (Contenders) */}
            <div className="relative">
                <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-xl font-extrabold text-brand-black flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-brand-black text-brand-yellow flex items-center justify-center text-lg font-bold">2</span>
                        The Contenders
                    </h3>
                    <span className="text-sm font-bold text-gray-400 hidden sm:block">Upload high-res photos for best results</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 relative">

                    {/* Contender A Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-plate overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                        {/* Image Area */}
                        <div className="relative h-72 w-full p-4">
                            <div className={`relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${contenderA.image ? 'bg-gray-100' : 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-yellow group-hover:bg-brand-yellow/5'}`}>
                                {contenderA.image ? (
                                    <>
                                        <img src={contenderA.image} alt="Contender A" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                                        <div className="absolute top-4 right-4 z-10">
                                            <button
                                                onClick={() => handleRemoveImage('A')}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-black shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title="Remove Image"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-brand-black px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
                                            Contender A
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="text-center cursor-pointer w-full h-full flex flex-col items-center justify-center p-6"
                                        onClick={() => fileInputARef.current?.click()}
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
                                ref={fileInputARef}
                                onChange={(e) => handleImageUpload(e, 'A')}
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
                                    placeholder="e.g. Truffle Smash"
                                    value={contenderA.name}
                                    onChange={(e) => setContenderA({ ...contenderA, name: e.target.value })}
                                    className="w-full text-2xl font-black text-brand-black placeholder-gray-200 focus:outline-none border-b border-transparent focus:border-brand-yellow transition-all bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Description</label>
                                <textarea
                                    rows={2}
                                    placeholder="Double patty, truffle mayo, brioche bun..."
                                    value={contenderA.description}
                                    onChange={(e) => setContenderA({ ...contenderA, description: e.target.value })}
                                    className="w-full text-brand-text/80 font-medium placeholder-gray-300 focus:outline-none resize-none bg-transparent leading-relaxed"
                                />
                            </div>
                            <div className="pt-5 border-t border-dashed border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-bold">$</span>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        value={contenderA.price}
                                        onChange={(e) => setContenderA({ ...contenderA, price: e.target.value })}
                                        className="w-24 font-bold text-brand-black focus:outline-none bg-transparent"
                                    />
                                </div>
                                <div className="text-xs font-bold text-gray-300 uppercase">Item A</div>
                            </div>
                        </div>
                    </div>

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

                    {/* Contender B Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-plate overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                        {/* Image Area */}
                        <div className="relative h-72 w-full p-4">
                            <div className={`relative w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${contenderB.image ? 'bg-gray-100' : 'bg-gray-50 border-2 border-dashed border-gray-200 hover:border-brand-yellow group-hover:bg-brand-yellow/5'}`}>
                                {contenderB.image ? (
                                    <>
                                        <img src={contenderB.image} alt="Contender B" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                                        <div className="absolute top-4 right-4 z-10">
                                            <button
                                                onClick={() => handleRemoveImage('B')}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-black shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title="Remove Image"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm text-brand-black px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-sm">
                                            Contender B
                                        </div>
                                    </>
                                ) : (
                                    <div
                                        className="text-center cursor-pointer w-full h-full flex flex-col items-center justify-center p-6"
                                        onClick={() => fileInputBRef.current?.click()}
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
                                ref={fileInputBRef}
                                onChange={(e) => handleImageUpload(e, 'B')}
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
                                    placeholder="e.g. Classic BBQ"
                                    value={contenderB.name}
                                    onChange={(e) => setContenderB({ ...contenderB, name: e.target.value })}
                                    className="w-full text-2xl font-black text-brand-black placeholder-gray-200 focus:outline-none border-b border-transparent focus:border-brand-yellow transition-all bg-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Description</label>
                                <textarea
                                    rows={2}
                                    placeholder="Onion rings, BBQ sauce, cheddar cheese..."
                                    value={contenderB.description}
                                    onChange={(e) => setContenderB({ ...contenderB, description: e.target.value })}
                                    className="w-full text-brand-text/80 font-medium placeholder-gray-300 focus:outline-none resize-none bg-transparent leading-relaxed"
                                />
                            </div>
                            <div className="pt-5 border-t border-dashed border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-bold">$</span>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        value={contenderB.price}
                                        onChange={(e) => setContenderB({ ...contenderB, price: e.target.value })}
                                        className="w-24 font-bold text-brand-black focus:outline-none bg-transparent"
                                    />
                                </div>
                                <div className="text-xs font-bold text-gray-300 uppercase">Item B</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Settings & Launch */}
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
                                    className={`py-4 rounded-2xl text-sm font-bold transition-all border-2 ${duration === d
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
                        onClick={handleSubmit}
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

        </div>
    );
};

export default PollCreateForm;