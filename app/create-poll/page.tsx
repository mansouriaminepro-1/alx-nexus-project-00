
import React, { useState } from 'react';
import PollInfoForm from '../../components/create-poll/PollInfoForm';
import PollItemsForm from '../../components/create-poll/PollItemsForm';
import SubmitButton from '../../components/create-poll/SubmitButton';
import { ArrowRightIcon } from '../../components/ui/icons';
import { createPoll, PollData } from '../../utils/pollManager';

export default function CreatePollPage() {
  // State management lifted to page
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [duration, setDuration] = useState('24h');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [contenderA, setContenderA] = useState({
    id: 'A',
    name: '',
    description: '',
    price: '',
    image: null as string | null
  });

  const [contenderB, setContenderB] = useState({
    id: 'B',
    name: '',
    description: '',
    price: '',
    image: null as string | null
  });

  const handleSubmit = async () => {
    if(!title || !contenderA.name || !contenderB.name) {
        alert("Please fill in the battle title and contender names.");
        return;
    }

    if(!contenderA.image || !contenderB.image) {
        alert("Both contenders need an image to start the battle!");
        return;
    }

    setIsSubmitting(true);
    
    const newPollId = `battle-${Date.now()}`;
    const newPoll: PollData = {
        id: newPollId,
        title: title,
        question: question || 'Which one are you ordering?',
        endsIn: duration === '24h' ? '23h 59m' : duration === '48h' ? '47h 59m' : '6 Days',
        totalVotes: 0,
        createdAt: Date.now(),
        restaurant: {
            name: 'My Awesome Restaurant',
            location: 'Downtown, City',
            description: 'We test our best ideas with you first.',
            avatar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=200&q=80',
            website: 'myrestaurant.com'
        },
        items: [
            {
                id: 'A',
                name: contenderA.name,
                description: contenderA.description,
                image: contenderA.image!,
                price: contenderA.price ? `$${contenderA.price}` : '',
                votes: 0
            },
            {
                id: 'B',
                name: contenderB.name,
                description: contenderB.description,
                image: contenderB.image!,
                price: contenderB.price ? `$${contenderB.price}` : '',
                votes: 0
            }
        ]
    };

    createPoll(newPoll);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const targetUrl = `/poll/${newPollId}`;
    try { window.history.pushState({}, '', targetUrl); } catch (e) {}
    window.dispatchEvent(new CustomEvent('navigate', { detail: targetUrl }));
    window.scrollTo(0, 0);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{
             backgroundImage: 'radial-gradient(#111111 1.5px, transparent 1.5px)',
             backgroundSize: '24px 24px'
           }}>
      </div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-black transition-colors">
                <span className="rotate-180"><ArrowRightIcon className="w-4 h-4" /></span>
                Back to Dashboard
            </a>
        </div>

        <div className="mb-12 text-center md:text-left relative">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm">
             <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
             <span className="font-bold text-brand-black text-[10px] tracking-widest uppercase">New Campaign</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-black tracking-tight mb-4 leading-tight">
            Design your <br className="hidden md:block" />
            <span className="relative inline-block">
                Battle
                <svg className="absolute bottom-2 left-0 w-full h-3 text-brand-yellow -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 15 100 5" fill="currentColor" />
                </svg>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            Upload two photos, set the stage, and let the community decide what makes it to your menu.
          </p>
        </div>

        <div className="space-y-8 pb-12">
            <PollInfoForm title={title} setTitle={setTitle} question={question} setQuestion={setQuestion} />
            <PollItemsForm 
                contenderA={contenderA} 
                contenderB={contenderB} 
                setContenderA={setContenderA} 
                setContenderB={setContenderB} 
            />
            <SubmitButton 
                duration={duration} 
                setDuration={setDuration} 
                onSubmit={handleSubmit} 
                isSubmitting={isSubmitting} 
            />
        </div>
        
      </div>
    </div>
  );
}
