"use client";

import React, { useEffect, useState } from 'react';
import { ShareIcon, CheckIcon, ArrowRightIcon, MapPinIcon, GlobeIcon, TrophyIcon, FireIcon } from '../../../../components/ui/icons';
import { PollData } from '../../../../types/poll';
import UnifiedNavbar from '../../../../components/commons/UnifiedNavbar';

const API_URL = '';

export default function ResultsPage() {
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const id = pathSegments[2];

    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/polls/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPoll(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch poll:', res.status);
          setLoading(false);
        }
      } catch (e) {
        console.error("Fetch error", e);
        setLoading(false);
      }
    };

    if (id) {
      loadData();
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleShare = () => {
    const url = window.location.href.replace('/results', '');
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-brand-black font-bold animate-pulse">Calculating Live Results...</p>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-white pt-32 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-brand-black">Battle not found.</h1>
        <a href="/" className="mt-4 text-brand-yellow underline">Back to Home</a>
      </div>
    );
  }

  const totalVotes = poll.totalVotes || 0;
  const itemsWithStats = poll.items.map(item => {
    const votes = item.votes || 0;
    const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    return { ...item, percentage };
  });

  const leaderId = itemsWithStats.sort((a, b) => b.votes - a.votes)[0]?.id;

  return (
    <>
      <UnifiedNavbar />
      <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 font-sans relative overflow-x-hidden selection:bg-brand-yellow selection:text-brand-black">

        {/* Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px'
          }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Header Section */}
          <div className="text-center mb-12 relative">

            {/* Live Badge & Timer */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-100 bg-green-50 text-green-700 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-bold text-[10px] tracking-widest uppercase">Live Results</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-600 shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="font-bold text-[10px] tracking-widest uppercase">Ends in {poll.endsIn}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-brand-black mb-4 tracking-tight">
              {poll.title}
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Total Votes Verified: <span className="text-brand-black font-bold">{totalVotes}</span>
            </p>
          </div>

          {/* BATTLE ARENA - RESULTS MODE */}
          <div className="relative mb-24">

            {/* The VS Badge (Center Desktop / Top Mobile) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-brand-black rounded-full border-[6px] border-white shadow-plate flex items-center justify-center">
                <span className="font-serif italic font-black text-4xl text-brand-yellow pr-1 pt-1">VS</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 relative">

              {itemsWithStats.map((item) => {
                const isLeader = item.id === leaderId && totalVotes > 0;

                return (
                  <div
                    key={item.id}
                    className={`
                                relative group rounded-[2.5rem] bg-white shadow-card overflow-hidden transition-all duration-500 border-2
                                ${isLeader ? 'ring-4 ring-brand-yellow border-transparent scale-[1.02] shadow-2xl z-20' : 'border-transparent opacity-90'}
                           `}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      {/* Percentage Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-8 flex items-end justify-between">
                        <div>
                          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1 leading-tight">{item.name}</h3>
                          <div className="flex items-center gap-2 text-white/80 font-medium">
                            {isLeader && <TrophyIcon className="w-5 h-5 text-brand-yellow" />}
                            {isLeader ? 'Leading the Battle' : 'Trailing Behind'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-5xl md:text-6xl font-black text-brand-yellow tracking-tighter">
                            {item.percentage}%
                          </div>
                          <div className="text-white/60 font-bold text-sm uppercase tracking-widest">
                            {item.votes} Votes
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 bg-gray-100 w-full relative">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${isLeader ? 'bg-brand-yellow' : 'bg-gray-400'}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 relative">
                      <p className="text-gray-500 font-medium leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {isLeader && (
                        <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl p-4 flex items-start gap-3">
                          <FireIcon className="w-6 h-6 text-brand-yellow shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold text-brand-black text-sm">Crowd Favorite</h4>
                            <p className="text-xs text-gray-600 mt-1">This option is currently winning the hearts (and stomachs) of the voters.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Share Section */}
          <div className="max-w-xl mx-auto text-center mb-24">
            <h3 className="font-bold text-brand-black mb-6 text-xl">Get your friends involved</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleShare}
                className="bg-brand-black text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5 text-green-400" /> Link Copied!
                  </>
                ) : (
                  <>
                    <ShareIcon className="w-5 h-5" /> Share Battle
                  </>
                )}
              </button>
              <a href="/" className="bg-white border-2 border-gray-200 text-brand-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:border-brand-black transition-colors">
                <ArrowRightIcon className="w-4 h-4 rotate-180" /> Back to Home
              </a>
            </div>
          </div>

          {/* RESTAURANT INFO CARD */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-[#111111] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-yellow/20 transition-colors duration-500"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-32 h-32 rounded-full border-4 border-brand-yellow/20 p-1">
                    <img
                      src={poll.restaurant.avatar}
                      alt={poll.restaurant.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <div className="inline-block px-3 py-1 bg-brand-yellow/20 text-brand-yellow rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
                    The Creator
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-3">{poll.restaurant.name}</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {poll.restaurant.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm font-medium text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-brand-yellow" />
                      {poll.restaurant.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <GlobeIcon className="w-5 h-5 text-brand-yellow" />
                      {poll.restaurant.website}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <button className="bg-white text-brand-black px-8 py-4 rounded-full font-bold hover:bg-brand-yellow transition-colors shadow-lg shadow-white/5">
                    Book a Table
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
